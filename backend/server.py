from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Email config
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
CONTACT_RECIPIENT = os.environ.get('CONTACT_RECIPIENT', 'blake@renderlabhq.com')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Define Models
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=4000)


def build_email_html(name: str, email: str, message: str) -> str:
    safe_message = message.replace("\n", "<br/>")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, Helvetica, sans-serif; background:#f7f7f7; padding:24px;">
      <tr><td>
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden;">
          <tr><td style="background:#111111; padding:20px 28px; color:#ffffff; font-size:18px; font-weight:bold;">Renderlab — New Inquiry</td></tr>
          <tr><td style="padding:28px;">
            <p style="margin:0 0 12px; color:#111111; font-size:14px;"><strong>Name:</strong> {name}</p>
            <p style="margin:0 0 12px; color:#111111; font-size:14px;"><strong>Email:</strong> <a href="mailto:{email}" style="color:#2563EB;">{email}</a></p>
            <p style="margin:0 0 8px; color:#111111; font-size:14px;"><strong>Message:</strong></p>
            <p style="margin:0; color:#4b5563; font-size:14px; line-height:1.6;">{safe_message}</p>
          </td></tr>
          <tr><td style="padding:16px 28px; border-top:1px solid #e5e7eb; color:#9ca3af; font-size:12px;">Sent from the Renderlab website contact form.</td></tr>
        </table>
      </td></tr>
    </table>
    """


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "email_configured": bool(RESEND_API_KEY)}


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    submission_id = str(uuid.uuid4())
    received_at = datetime.now(timezone.utc).isoformat()

    # Last-resort record: this lands in the Render logs even if the email fails.
    logger.info(
        f"CONTACT {submission_id} at {received_at} | "
        f"name={payload.name!r} email={payload.email!r} message={payload.message!r}"
    )

    if not RESEND_API_KEY:
        logger.error("RESEND_API_KEY not set; cannot deliver contact submission.")
        raise HTTPException(
            status_code=503,
            detail="Contact form is temporarily unavailable.",
        )

    params = {
        "from": SENDER_EMAIL,
        "to": [CONTACT_RECIPIENT],
        "reply_to": payload.email,
        "subject": f"New Renderlab inquiry from {payload.name}",
        "html": build_email_html(payload.name, payload.email, payload.message),
    }

    try:
        await asyncio.to_thread(resend.Emails.send, params)
    except Exception as e:
        logger.error(f"Failed to send contact email {submission_id}: {e}")
        raise HTTPException(
            status_code=502,
            detail="Could not deliver your message. Please email us directly.",
        )

    return {"status": "success", "id": submission_id}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
