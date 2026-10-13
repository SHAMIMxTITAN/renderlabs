import { act } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { toast } from "sonner";
import { Contact } from "./Contact";

jest.mock("axios", () => ({ post: jest.fn() }));
jest.mock("sonner", () => ({ toast: { error: jest.fn(), success: jest.fn() } }));
jest.mock("./Reveal", () => ({ Reveal: ({ children }) => children }));
jest.mock("@/data/content", () => ({ CONTACT: {} }), { virtual: true });

let container;
let root;

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root.render(<Contact />));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.clearAllMocks();
});

test("locks pending submissions, keeps a failed draft, and clears only a successful send", async () => {
  const form = container.querySelector("form");
  const name = container.querySelector("#contact-name");
  const email = container.querySelector("#contact-email");
  const message = container.querySelector("#contact-message");
  const button = form.querySelector("button");
  const fields = [name, email, message];
  const change = (field, value) => {
    const prototype = Object.getPrototypeOf(field);
    Object.getOwnPropertyDescriptor(prototype, "value").set.call(field, value);
    field.dispatchEvent(new Event("input", { bubbles: true }));
  };
  const submit = () => form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

  expect(fields.map((field) => field.labels[0].textContent)).toEqual(["Name", "Email", "Message"]);
  expect(fields.every((field) => field.required)).toBe(true);
  expect(name.maxLength).toBe(120);
  expect(message.maxLength).toBe(4000);
  expect(name.autocomplete).toBe("name");
  expect(email.autocomplete).toBe("email");

  act(() => {
    change(name, "   ");
    change(email, "  blake@example.com  ");
    change(message, "  A product film  ");
  });
  act(submit);
  expect(axios.post).not.toHaveBeenCalled();
  expect(toast.error).toHaveBeenCalledWith("Please fill in all fields.");

  let reject;
  axios.post.mockReturnValueOnce(new Promise((resolve, rejectRequest) => { reject = rejectRequest; }));
  act(() => change(name, "  Blake  "));
  act(() => { submit(); submit(); });

  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/\/api\/contact$/), {
    name: "Blake", email: "blake@example.com", message: "A product film",
  });
  expect([...fields, button].every((field) => field.disabled)).toBe(true);

  await act(async () => { reject(new Error("Delivery failed")); });
  expect(fields.map((field) => field.value)).toEqual(["  Blake  ", "blake@example.com", "  A product film  "]);
  expect([...fields, button].every((field) => !field.disabled)).toBe(true);
  expect(toast.success).not.toHaveBeenCalled();

  axios.post.mockResolvedValueOnce({ data: { status: "success", id: "test-inquiry" } });
  await act(async () => { submit(); });
  expect(axios.post).toHaveBeenCalledTimes(2);
  expect(fields.map((field) => field.value)).toEqual(["", "", ""]);
  expect(toast.success).toHaveBeenCalledTimes(1);
});
