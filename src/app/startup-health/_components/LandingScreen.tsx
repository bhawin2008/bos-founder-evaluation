"use client";

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="animate-fade-in text-center py-10">
      <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5">
        Startup Health
        <br />
        <span className="bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Diagnostic
        </span>
      </h1>
      <p className="text-lg text-gray-400 mb-2">
        20 honest questions. 4 critical areas. One clear diagnosis.
      </p>
      <p className="text-base text-gray-400 mb-10">
        Find out if your business is built to scale — or stuck on you.
      </p>
      <button
        onClick={onStart}
        className="bg-gradient-to-br from-blue-500 to-purple-500 text-white border-none px-12 py-4 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(74,108,247,0.3)]"
      >
        Start Diagnostic
      </button>
      <div className="flex justify-center items-center gap-3 mt-8 text-gray-500 text-sm">
        <span>5 minutes</span>
        <span className="w-1 h-1 rounded-full bg-gray-500" />
        <span>20 questions</span>
        <span className="w-1 h-1 rounded-full bg-gray-500" />
        <span>Instant results</span>
      </div>
    </div>
  );
}
