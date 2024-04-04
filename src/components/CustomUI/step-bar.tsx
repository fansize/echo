import StepButton from "@/components/CustomUI/step-button";
import TagAnimate from "@/components/CustomUI/tag-animation";

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
      {/* <TagAnimate stepNumber={stepNumber} /> */}
      {buttons.map((button) => (
        <div className="flex flex-auto" key={button.id}>
          <div className={`flex relative flex-auto bg-amber-500 rounded-full  p-1 overflow-hidden`}>
            <div className={`flex flex-auto rounded-full h-10 items-center justify-center  ${button.id === stepNumber ? 'animate-progress-extend bg-white' : ''}`}></div>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 text-sm text-gray-800">{button.text}</span>
          </div>
          {/* <TagAnimate
            text={button.text}
            className={` ${button.id === stepNumber
              ? "bg-amber-500 font-bold transition duration-4000 "
              : "bg-neutral-200 dark:bg-slate-700"
              }`}
          /> */}
        </div>
      ))}
    </div>
  );
}
