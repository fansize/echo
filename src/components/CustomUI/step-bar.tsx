import { Button } from "@/components/ui/button";
import StepButton from "@/components/CustomUI/step-button";

type Props = {
  text: string;
  stepNumber: number;
};

export default function StepBar({ text, stepNumber }: Props) {
  const buttons = [
    { text: "听原声", id: 1 },
    { text: "静音模仿", id: 2 },
    { text: "同步读x1", id: 3 },
    { text: "同步读x2", id: 4 },
  ];

  return (
    <div className="absolute flex-col bottom-5 px-2 inset-x-0 flex items-center justify-center">
      <p className="text-base md:text-2xl px-3 py-1 text-amber-500 bg-black/75 rounded-sm">
        {text}
      </p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4 font-mono text-sm">
          {buttons.map((button) => (
            <div className="items-center" key={button.id}>
              <StepButton
                text={button.text}
                className={`${
                  button.id === stepNumber ? "bg-amber-500 font-extrabold" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
