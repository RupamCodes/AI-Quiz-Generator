
import React from 'react';

interface TimerBarProps {
  duration: number;
  timeLeft: number;
}

const TimerBar: React.FC<TimerBarProps> = ({ duration, timeLeft }) => {
  const percentage = (timeLeft / duration) * 100;
  
  const barColor =
    percentage > 50
      ? 'bg-green-500'
      : percentage > 25
      ? 'bg-yellow-500'
      : 'bg-red-500';

  return (
    <div className="w-full bg-slate-600 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full transition-all duration-500 ease-linear ${barColor}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default TimerBar;
