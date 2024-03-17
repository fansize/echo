"use client";

interface ProcessButtonProps {
  buttonID: number;
  text: string;
  onClick: () => void;
  className: string;
}

export default function ProcessButton({
  buttonID,
  text,
  onClick,
  className,
}: ProcessButtonProps) {
  return (
    <button
      className={`tracking-wide rounded-full px-6 py-2 border hover:border-gray-300 hover:shadow-lg hover:shadow-gray-300/50 cursor-pointer select-none ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
