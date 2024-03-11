"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Eye, Languages, Send } from "lucide-react";
import ProcessButton from "@/components/CustomUI/process-button";
import { Video } from "@/components/CustomUI/custom-video";
import { Nav } from "@/components/CustomUI/custom-nav";

export default function Home() {
  const [stepNumber, setStepNumber] = useState(1);

  const buttons = [
    { text: "1.Listen Original", id: 1 },
    { text: "2.Echo", id: 2 },
    { text: "3.Imitate", id: 3 },
  ];

  const [isSubtitleVisible, setSubtitleVisible] = useState(true);
  const [isMuted, setMuted] = useState(false);
  const [currentButton, setCurrentButton] = useState(1);
  const [playFromStart, setPlayFromStart] = useState(true);

  const toggleSubtitle = () => {
    setSubtitleVisible(!isSubtitleVisible);
  };

  // 点击按钮选择第步骤
  const handleButtonClick = (id: number): void => {
    setStepNumber(id);
  };

  // 当视频播放完后，自动增加StepNumber,进行下一步
  const handleVideoEnded = () => {
    if (stepNumber < 3) {
      setStepNumber(stepNumber + 1);
    } else {
      setStepNumber(1);
    }
  };

  // 每当setpNumber改变时，都会触发useEffect, 从而改变isMuted的值
  useEffect(() => {
    if (stepNumber === 2) {
      setMuted(true);
    } else {
      setMuted(false);
    }
    setPlayFromStart(true);
  }, [stepNumber]);

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-10">
      <Nav />
      <div className="p-6 border rounded-xl">
        <div className="flex flex-wrap pb-4 gap-5 font-mono text-sm">
          {buttons.map((button) => (
            <div className="flex-grow items-center" key={button.id}>
              <ProcessButton
                buttonID={button.id}
                text={button.text}
                onClick={() => handleButtonClick(button.id)}
                className={`${button.id === stepNumber ? "bg-blue-400" : ""}`}
              />
            </div>
          ))}
        </div>
        <div className="rounded-xl overflow-hidden">
          <Video
            isMuted={isMuted}
            playFromStart={playFromStart}
            onEnded={handleVideoEnded}
          />
        </div>
        <div className="flex pt-4 gap-2 items-center">
          <Toggle
            variant={"outline"}
            size={"sm"}
            aria-label="Toggle bold"
            onClick={toggleSubtitle}
          >
            <Eye className="h-4 w-4" />
          </Toggle>
          <Toggle variant={"outline"} size={"sm"} aria-label="Toggle bold">
            <Languages className="h-4 w-4" />
          </Toggle>
          {isSubtitleVisible && <p>I wanna play baseball.</p>}
        </div>
        <div className="flex pt-4 gap-2 items-center">
          <Input />
          <Button variant={"outline"} aria-label="Toggle bold">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
}
