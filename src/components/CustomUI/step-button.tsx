import { Button } from "@/components/ui/button";

type Props = {
  text: string;
  className: string;
};

export default function StepButton({ text, className }: Props) {
  return (
    <Button
      className={`h-9 lg:h-10 px-3 lg:px-6 py-2 text-sm lg:text-base font-normal tracking-wide shadow-md rounded-full ${className}`}
    >
      {text}
    </Button>
  );
}
