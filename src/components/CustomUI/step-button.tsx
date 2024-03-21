import { Button } from "@/components/ui/button";

type Props = {
  text: string;
  className: string;
};

export default function StepButton({ text, className }: Props) {
  return (
    <Button
      className={`text-xs md:text-xs lg:text-base px-4 py-1 md:px-4 md:py-1 lg:px-6 lg:py-4 tracking-wide shadow-md rounded-full ${className}`}
    >
      {text}
    </Button>
  );
}
