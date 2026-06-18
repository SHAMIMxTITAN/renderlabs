import { LOGO } from "@/data/content";

export const Logo = ({ size = 36, showWord = true, light = false }) => (
  <a
    href="#home"
    data-testid="nav-logo"
    className="flex items-center gap-3 group"
  >
    <span
      className="overflow-hidden rounded-lg ring-1 ring-black/5 shrink-0"
      style={{ width: size, height: size }}
    >
      <img
        src={LOGO}
        alt="Renderlab logo"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </span>
    {showWord && (
      <span
        className={`font-display font-bold tracking-tight text-lg ${
          light ? "text-white" : "text-[#111111]"
        }`}
      >
        Renderlab
      </span>
    )}
  </a>
);

export default Logo;
