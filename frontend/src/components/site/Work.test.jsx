import { act } from "react";
import { createRoot } from "react-dom/client";
import { Work } from "./Work";

jest.mock("framer-motion", () => ({ useReducedMotion: () => false }));
jest.mock("./Reveal", () => ({ Reveal: ({ children }) => children }));

test("the video dialog contains focus, closes with Escape, and returns focus to the selected work", async () => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  try {
    act(() => root.render(<Work />));
    const opener = container.querySelector('[data-testid="work-item-px-necklace"]');
    opener.focus();
    act(() => opener.click());
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog.textContent).toContain("Dhalsim's skull necklace");
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(container.getAttribute("aria-hidden")).toBe("true");
    act(() => dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(opener);
    expect(container.hasAttribute("aria-hidden")).toBe(false);
  } finally {
    act(() => root.unmount());
    container.remove();
  }
});
