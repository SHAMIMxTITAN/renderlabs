import { useEffect, useState } from "react";

// True while the element is on screen. Used to pause looping animations and video
// that would otherwise keep costing main-thread and GPU time while scrolled away.
// Without IntersectionObserver (old browsers, tests) it reports "in view".
export const useInView = (ref) => {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
};
