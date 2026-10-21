import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { Imagery } from "./Imagery";
import { KineticDivider } from "./KineticDivider";
import { IMAGERY } from "@/data/content";

let mockReducedMotion = false;
jest.mock("framer-motion", () => ({ useReducedMotion: () => mockReducedMotion }));
jest.mock("./Reveal", () => ({ Reveal: ({ children }) => children }));

let container;
let root;

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  mockReducedMotion = false;
});

test("gallery pause exposes every original for keyboard scrolling and resume restores its loop", () => {
  act(() => root.render(<Imagery />));
  const button = container.querySelector("button");
  const gallery = container.querySelector("#imagery-gallery");
  const track = container.querySelector('[data-testid="imagery-marquee-track"]');
  expect(container.querySelectorAll('img[alt="AI-generated imagery"]')).toHaveLength(IMAGERY.length);
  expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(IMAGERY.length);

  act(() => button.click());
  expect(button.textContent).toBe("Resume gallery");
  expect(button.getAttribute("aria-pressed")).toBe("true");
  expect(gallery.dataset.paused).toBe("true");
  expect(gallery.tabIndex).toBe(0);
  expect(gallery.classList.contains("overflow-x-auto")).toBe(true);
  expect(track.style.animationPlayState).toBe("paused");
  expect(container.querySelectorAll("img")).toHaveLength(IMAGERY.length);

  act(() => button.click());
  expect(button.textContent).toBe("Pause gallery");
  expect(button.getAttribute("aria-pressed")).toBe("false");
  expect(gallery.dataset.paused).toBe("false");
  expect(gallery.hasAttribute("tabindex")).toBe(false);
  expect(track.style.animationPlayState).toBe("");
  expect(container.querySelectorAll("img")).toHaveLength(IMAGERY.length * 2);
});

test("ticker runs non-stop with no pause control", () => {
  act(() => root.render(<KineticDivider />));
  expect(container.querySelector("button")).toBeNull();
  expect(container.querySelector("#services-ticker").style.animationPlayState).toBe("running");
});

test("reduced motion stops the gallery and ticker and keeps all imagery reachable", () => {
  mockReducedMotion = true;
  act(() => root.render(<><Imagery /><KineticDivider /></>));
  const buttons = container.querySelectorAll("button");
  buttons.forEach((button) => {
    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-pressed")).toBe("true");
  });
  expect(container.querySelector("#imagery-gallery").tabIndex).toBe(0);
  expect(container.querySelectorAll("img")).toHaveLength(IMAGERY.length);
  expect(container.querySelector("#services-ticker").style.animationPlayState).toBe("paused");
});
