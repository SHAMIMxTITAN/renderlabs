import { useEffect, useRef } from "react";

// Fade-and-rise as each block scrolls into view. Pure CSS animation (.rl-reveal in
// index.css), so it runs on the compositor: no per-frame JavaScript, style recalc or
// repaint. The old framer-motion version moved `y` from JS every frame, which made the
// browser re-raster galleries and images during every page switch.
let observer;
const getObserver = () => {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        observer.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -40px 0px" }
  );
  return observer;
};

export const Reveal = ({ children, delay = 0, y = 18, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`rl-reveal ${className}`}
      style={{ "--rl-delay": `${Math.min(delay, 0.15)}s`, "--rl-y": `${y}px` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
