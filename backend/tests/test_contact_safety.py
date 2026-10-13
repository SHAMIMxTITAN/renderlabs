"""Offline contact validation and email safety checks; Resend is always mocked."""
import unittest
import uuid
from unittest.mock import patch

from fastapi import HTTPException
from pydantic import ValidationError

from backend import server


class ContactValidationTests(unittest.TestCase):
    def test_trim_surrounding_whitespace(self):
        contact = server.ContactCreate(
            name="  Client  ", email=" client@example.com ", message="\n Project inquiry \n"
        )
        self.assertEqual(contact.name, "Client")
        self.assertEqual(contact.email, "client@example.com")
        self.assertEqual(contact.message, "Project inquiry")

    def test_reject_blank_fields_and_invalid_email(self):
        valid = {"name": "Client", "email": "client@example.com", "message": "Inquiry"}
        for field, value in [("name", ""), ("name", " \t\n"), ("message", ""),
                             ("message", " \t\n"), ("email", "invalid")]:
            with self.subTest(field=field, value=value):
                with self.assertRaises(ValidationError):
                    server.ContactCreate(**{**valid, field: value})

    def test_keep_length_limits(self):
        valid = {"name": "N" * 120, "email": "client@example.com", "message": "M" * 4000}
        server.ContactCreate(**valid)
        for field in ("name", "message"):
            with self.subTest(field=field):
                with self.assertRaises(ValidationError):
                    server.ContactCreate(**{**valid, field: valid[field] + "X"})

    def test_escape_all_email_fields_and_keep_line_breaks(self):
        html = server.build_email_html(
            '<b>Client & "name"</b>',
            'client@example.com" onclick="bad',
            '<a href="https://example.invalid">Click</a>\nSecond & final line',
        )
        self.assertIn('&lt;b&gt;Client &amp; &quot;name&quot;&lt;/b&gt;', html)
        self.assertIn('mailto:client@example.com&quot; onclick=&quot;bad', html)
        self.assertIn('&lt;a href=&quot;https://example.invalid&quot;&gt;Click&lt;/a&gt;'
                      '<br/>Second &amp; final line', html)
        self.assertNotIn('<b>Client', html)
        self.assertNotIn('<a href="https://example.invalid">', html)
        self.assertNotIn('" onclick="bad', html)


class ContactDeliveryTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.contact = server.ContactCreate(
            name='Client <b>&</b>', email='client@example.com', message='Project <script>x</script>'
        )
        self.logger = self.enterContext(patch.object(server, "logger"))
        self.send = self.enterContext(patch.object(server.resend.Emails, "send"))

    async def test_missing_configuration_fails_without_sending_and_keeps_fallback(self):
        with patch.object(server, "RESEND_API_KEY", None):
            with self.assertRaises(HTTPException) as raised:
                await server.create_contact(self.contact)
        self.assertEqual(raised.exception.status_code, 503)
        self.send.assert_not_called()
        self.logger.info.assert_called_once()
        self.assertIn(self.contact.message, self.logger.info.call_args.args[0])

    async def test_provider_failure_returns_error_without_leaking_details(self):
        self.send.side_effect = RuntimeError("Private provider detail")
        with patch.object(server, "RESEND_API_KEY", "mock-only"):
            with self.assertRaises(HTTPException) as raised:
                await server.create_contact(self.contact)
        self.assertEqual(raised.exception.status_code, 502)
        self.assertNotIn("Private provider detail", raised.exception.detail)
        self.send.assert_called_once()
        self.logger.info.assert_called_once()

    async def test_success_sends_safe_html_to_fixed_recipient_with_reply_to(self):
        self.send.return_value = {"id": "mock-email-id"}
        with patch.object(server, "RESEND_API_KEY", "mock-only"), \
             patch.object(server, "SENDER_EMAIL", "sender@example.com"), \
             patch.object(server, "CONTACT_RECIPIENT", "owner@example.com"):
            result = await server.create_contact(self.contact)
        self.assertEqual(result["status"], "success")
        uuid.UUID(result["id"])
        self.send.assert_called_once()
        params = self.send.call_args.args[0]
        self.assertEqual(params["from"], "sender@example.com")
        self.assertEqual(params["to"], ["owner@example.com"])
        self.assertEqual(params["reply_to"], self.contact.email)
        self.assertIn("&lt;script&gt;x&lt;/script&gt;", params["html"])
        self.assertNotIn("<script>", params["html"])


if __name__ == "__main__":
    unittest.main()
