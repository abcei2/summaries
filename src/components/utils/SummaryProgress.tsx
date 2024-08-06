import { useState, useEffect, FC } from "react";

interface SummaryProgressProps {
  percentage: number;
  text?: string;
  pulseAnimation?: boolean;
}

const SummaryProgress: FC<SummaryProgressProps> = ({
  percentage,
  text,
  pulseAnimation,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(parseFloat(percentage.toFixed(0)));
  }, [percentage]);

  return (
    <div className="w-64 h-64 rounded-lg flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-secondary stroke-current"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          <circle
            className={`text-primary stroke-current ${
              pulseAnimation ? "animate-pulse" : ""
            }`}
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray={`${progress * 2.51}, 251`}
            transform="rotate(-90 50 50)"
          ></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{`${progress}%`}</span>
        </div>
      </div>
      {text && <p className="mt-4 text-lg font-semibold">{text}</p>}
    </div>
  );
};

export default SummaryProgress;
