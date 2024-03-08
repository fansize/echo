"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Eye, Languages } from "lucide-react";
import ProcessButton from "@/components/CustomUI/process-button";
import { Video } from "@/components/CustomUI/custom-video";

export default function Home() {
  const buttons = [
    { text: "1.Listen Original", id: 1 },
    { text: "2.Echo", id: 2 },
    { text: "3.Imitate", id: 3 },
  ];

  const [isSubtitleVisible, setSubtitleVisible] = useState(true);
  const [isMuted, setMuted] = useState(false);
  const [playFromStart, setPlayFromStart] = useState(true);

  const toggleSubtitle = () => {
    setSubtitleVisible(!isSubtitleVisible);
  };
  const handleButtonClick = (id: number): void => {
    if (id === 1) {
      setMuted(false);
      setPlayFromStart(true);
    }
    if (id === 2) {
      setMuted(true);
      setPlayFromStart(true);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 lg:static lg:w-auto  lg:rounded-xl lg:border  lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className="p-6 border rounded-xl">
        <div className="flex flex-wrap pb-4 gap-5 font-mono text-sm">
          {buttons.map((button) => (
            <div className="flex-grow items-center" key={button.id}>
              <ProcessButton
                text={button.text}
                onClick={() => handleButtonClick(button.id)}
              />
            </div>
          ))}
        </div>
        <div className="rounded-xl overflow-hidden">
          <Video isMuted={isMuted} playFromStart={playFromStart} />
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
        </div>
      </div>
    </main>
  );
}
