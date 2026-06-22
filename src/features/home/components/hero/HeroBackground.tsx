export default function HeroBackground() {
  return (
    <>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500" />

      {/* Top Glow */}
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-400/30 blur-[150px]" />

      {/* Right Glow */}
      <div className="absolute right-0 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />

      {/* Left Glow */}
      <div className="absolute left-0 top-20 h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-[120px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </>
  );
}