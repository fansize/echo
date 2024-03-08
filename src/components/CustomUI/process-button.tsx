"use client";

// export default function ProcessButton({
//   text,
//   id,
// }: {
//   text: string;
//   id: number;
// }) {
//   return (
//     <p
//       className="rounded-full px-6 py-2 border hover:border-gray-300 hover:bg-gray-100 hover:shadow-lg hover:shadow-gray-300/50 cursor-pointer select-none"
//       onClick={() => console.log(id)}
//     >
//       {text}
//     </p>
//   );
// }

interface ProcessButtonProps {
  text: string;
  onClick: () => void;
}

export default function ProcessButton({ text, onClick }: ProcessButtonProps) {
  return (
    <button
      className="rounded-full px-6 py-2 border hover:border-gray-300 hover:bg-gray-100 hover:shadow-lg hover:shadow-gray-300/50 cursor-pointer select-none"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
