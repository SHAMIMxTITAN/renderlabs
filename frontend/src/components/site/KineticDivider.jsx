const PHRASE = ["Editing", "AI Imagery", "Motion Graphics", "Web Design"];

const Track = () => (
  <div className="flex items-center shrink-0" aria-hidden="true">
    {PHRASE.concat(PHRASE).map((word, i) => (
      <span key={i} className="flex items-center">
        <span className="font-display font-extrabold tracking-[-0.02em] text-[#111111] text-3xl md:text-5xl px-6 md:px-10">
          {word}
        </span>
        <span className="text-[#2563eb] text-2xl md:text-4xl">✦</span>
      </span>
    ))}
  </div>
);

export const KineticDivider = () => (
  <div
    data-testid="kinetic-divider"
    className="relative w-full overflow-hidden border-y border-[#ededed] bg-white py-6 md:py-8"
  >
    <div className="rl-ticker flex w-max whitespace-nowrap">
      <Track />
      <Track />
    </div>
  </div>
);

export default KineticDivider;
