"use client";

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="text-center py-10">
      <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5 text-[#f0f0f5]">
        Sales & Marketing
        <br />
        <span className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
          Diagnostic
        </span>
      </h1>
      <p className="text-lg text-[#8888a0] mb-2">
        20 honest questions. 4 critical dimensions. One clear diagnosis.
      </p>
      <p className="text-base text-[#8888a0] mb-10">
        Find out why revenue feels unstable — and what to fix first.
      </p>
      <button
        onClick={onStart}
        className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-12 py-4 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(74,108,247,0.3)]"
      >
        Start Diagnostic
      </button>
      <div className="flex justify-center items-center gap-3 mt-8 text-[#8888a0] text-sm">
        <span>5–7 minutes</span>
        <span className="w-1 h-1 rounded-full bg-[#8888a0]" />
        <span>20 questions</span>
        <span className="w-1 h-1 rounded-full bg-[#8888a0]" />
        <span>Instant clarity report</span>
      </div>
    </div>
  );
}
