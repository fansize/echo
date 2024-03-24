import { Button } from "@/components/ui/button";

type Props = {
  text: string;
  className: string;
};

export default function StepButton({ text, className }: Props) {
  return (
    <div
      className={`text-xs md:text-xs lg:text-sm xl:text-base px-2 py-1.5 md:px-2 md:py-1.5 lg:px-4 lg:py-2 shadow-md rounded-lg md:rounded-full ${className}`}
    >
      {text}
    </div>
  );
}
