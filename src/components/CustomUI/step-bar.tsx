import StepButton from "@/components/CustomUI/step-button";

type Props = {
  stepNumber: number;
};

export default function StepBar({ stepNumber }: Props) {
  const buttons = [
    { text: "听原声", id: 1 },
    { text: "静音模仿", id: 2 },
    { text: "同步读x1", id: 3 },
    { text: "同步读x2", id: 4 },
  ];

  return (
    <div className="flex flex-row justify-between items-center mt-4 gap-2 sm:gap-2 md:gap-4">
      {buttons.map((button) => (
        <div className="items-center" key={button.id}>
          <StepButton
            text={button.text}
            className={`${
              button.id === stepNumber
                ? "bg-amber-500 font-extrabold"
                : "bg-neutral-200 dark:bg-slate-700"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
