import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic button: gently eases toward the cursor on hover (desktop only —
 * touch devices never fire mousemove, so it stays static and light on mobile).
 */
export const MagneticButton = ({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  strength = 0.35,
  "data-testid": testId,
}) => {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  const handleMove = (e) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: reducedMotion ? 0 : sx, y: reducedMotion ? 0 : sy }}
      whileHover={reducedMotion ? undefined : { scale: 1.04 }}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
