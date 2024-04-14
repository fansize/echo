import { useEffect, useState } from "react";
import { Caption } from "@/interface/Caption";
import TagAnimate from "@/components/customUI/tag-animation";

type Props = {
  stepNumber: number;
  selectedCaption?: Caption;
};

export default function StepBar({ stepNumber, selectedCaption }: Props) {
  const buttons = [
    { text: "听原声", id: 1 },
    { text: "静音模仿", id: 2 },
    { text: "同步读x1", id: 3 },
    { text: "同步读x2", id: 4 },
  ];

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
    console.log("stepNumber", stepNumber);
    console.log("showAnimation", showAnimation);
  }, [stepNumber, selectedCaption]);

  return (
    <div className="flex flex-row justify-between items-center mt-4 gap-2 sm:gap-2 md:gap-4">
      {buttons.map((button) => (
        <div className="flex flex-auto" key={button.id}>
          <div
            className={`flex relative flex-auto bg-amber-500 rounded-full p-1 overflow-hidden`}
          >
            {button.id === stepNumber ? (
              <TagAnimate showAnimation={showAnimation} />
            ) : button.id < stepNumber ? (
              <div className="bg-white flex flex-auto rounded-full h-10 items-center justify-center" />
            ) : (
              <div className="bg-amber-500 flex flex-auto rounded-full h-10 items-center justify-center" />
            )}
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 text-sm text-gray-800">
              {button.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
