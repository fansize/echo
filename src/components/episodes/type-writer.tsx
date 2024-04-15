"use client";
import React, { useState, useEffect } from "react";

interface Props {
  targetContent: string;
}

export default function TypeWriter({ targetContent: targetText }: Props) {
  const [userInput, setUserInput] = useState("");
  const [correctInput, setCorrectInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const words = targetText
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(" ");

  useEffect(() => {
    setUserInput("");
    setCorrectInput("");
    setWordIndex(0);
  }, [targetText]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        setUserInput((prev) => prev.substring(0, prev.length - 1));
        return;
      }
      if (event.key.length > 1 || !/^[0-9a-zA-Z]+$/.test(event.key)) {
        return;
      }
      if (
        wordIndex >= words.length ||
        userInput.length >= words[wordIndex].length
      ) {
        setUserInput("");
        setCorrectInput("");
        setWordIndex(0);
        return;
      }
      const nextChar = words[wordIndex][userInput.length];
      if (event.key.toLowerCase() === nextChar.toLowerCase()) {
        setUserInput((prev) => prev + nextChar);
        setCorrectInput((prev) => prev + nextChar);
        if (userInput.length + 1 === words[wordIndex].length) {
          setUserInput("");
          setCorrectInput("");
          setWordIndex((prev) => prev + 1);
          if (wordIndex + 1 === words.length) {
            alert("Right!");
          }
        }
      } else {
        setUserInput((prev) => prev + event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userInput, wordIndex, words]);

  return (
    <div className="flex flex-col justify-center items-center rounded-lg p-2 mt-2 bg-neutral-200 backdrop-blur-2xl">
      <p className="font-mono text-3xl">
        {words.slice(0, wordIndex + 1).map((word, wordIdx, arr) => (
          <>
            {word.split("").map((char, charIdx) => {
              let color;
              if (wordIdx < wordIndex) {
                // 对于已经输入完的单词，所有字符都显示为绿色
                color = "green";
              } else {
                // 对于正在输入的单词，根据输入的正确性来决定字符的颜色
                color =
                  charIdx < correctInput.length
                    ? "green"
                    : charIdx < userInput.length
                    ? "red"
                    : "black";
              }
              return (
                <span key={`${wordIdx}-${charIdx}`} style={{ color }}>
                  {char}
                </span>
              );
            })}
            {/* 在每个单词后面添加一个空格，除了最后一个单词 */}
            {wordIdx < arr.length - 1 && " "}
          </>
        ))}
      </p>
    </div>
  );
}
