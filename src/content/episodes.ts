import { Episode } from "@/interface/Episode";

export const mockEpisodes: Episode[] = [
  {

    slug: "episode-1",
    title: "示例视频，小谢尔顿",
    coverEmojis: getRandomEmojis(),
    videoSrc: "/assets/videos/ep03.mp4",
    captionSrc: "/assets/captions/ep03.srt",
    tag: "0.2",
    topic: "日常",
  },
  {

    slug: "episode-3",
    title: "小谢尔顿S2E14",
    coverEmojis: getRandomEmojis(),
    videoSrc:
      "https://codecat.uk/Young.Sheldon.S02E14.1080p.BluRay.x265-RARBG.mp4",
    captionSrc:
      "https://codecat.uk/3_English.srt",
    tag: "25",
    topic: "美剧",
  },
  {

    slug: "episode-6",
    title: "如何拨打紧急电话",
    coverEmojis: getRandomEmojis(),
    videoSrc:
      "https://codecat.uk/A%20911%20Call%20full%20video.mp4",
    captionSrc:
      "https://codecat.uk/A%20911%20Call%20full%20video.srt",
    tag: "1.22",
    topic: "日常",
  },
  {

    slug: "episode-7",
    title: "Children's fiction",
    coverEmojis: getRandomEmojis(),
    videoSrc:"https://ia803108.us.archive.org/10/items/a_christmas_miscellany_2018_1807_librivox/christmasmiscellany2018_01_various_64kb.mp3",
    captionSrc:"https://codecat.uk/A%20911%20Call%20full%20video.srt",
    tag: "1.22",
    topic: "日常",
  },
  {

    slug: "episode-8",
    title: "日常对话001",
    coverEmojis: getRandomEmojis(),
    videoSrc:"https://codecat.uk/Everyday%20English%20Listening%20%20Speaking%20%EF%BD%9C%20Listen%20%20Speak%20English%20Like%20a%20Native%20%EF%BD%9C%20English%20Conversation%20%5BDotppT_JH3E%5D.webm",
    captionSrc:"https://codecat.uk/Everyday%20English%20Listening%20%20Speaking%20%EF%BD%9C%20Listen%20%20Speak%20English%20Like%20a%20Native%20%EF%BD%9C%20English%20Conversation%20%5BDotppT_JH3E%5D.srt",
    startIndex: 0,
    endIndex: 100,
    tag: "3",
    topic: "日常对话",
  },
  {

    slug: "episode-9",
    title: "日常对话002",
    coverEmojis: getRandomEmojis(),
    videoSrc:"https://codecat.uk/Everyday%20English%20Listening%20%20Speaking%20%EF%BD%9C%20Listen%20%20Speak%20English%20Like%20a%20Native%20%EF%BD%9C%20English%20Conversation%20%5BDotppT_JH3E%5D.webm",
    captionSrc:"https://codecat.uk/Everyday%20English%20Listening%20%20Speaking%20%EF%BD%9C%20Listen%20%20Speak%20English%20Like%20a%20Native%20%EF%BD%9C%20English%20Conversation%20%5BDotppT_JH3E%5D.srt",
    startIndex: 101,
    endIndex: 200,
    tag: "3",
    topic: "日常对话",
  },
  {

    slug: "episode-10",
    title: "日常对话003",
    coverEmojis: getRandomEmojis(),
    videoSrc:"https://codecat.uk/Everyday%20English%20Listening%20%20Speaking%20%EF%BD%9C%20Listen%20%20Speak%20English%20Like%20a%20Native%20%EF%BD%9C%20English%20Conversation%20%5BDotppT_JH3E%5D.webm",
    captionSrc:"https://codecat.uk/Everyday%20English%20Listening%20%20Speaking%20%EF%BD%9C%20Listen%20%20Speak%20English%20Like%20a%20Native%20%EF%BD%9C%20English%20Conversation%20%5BDotppT_JH3E%5D.srt",
    startIndex: 201,
    endIndex: 300,
    tag: "3",
    topic: "日常对话",
  },
];

function getRandomEmojis(): string[] {
  const emojis = ["😀", "😎", "🌟", "🎉", "🚀", "🌈", "🍕", "🐱", "🌺"];
  let result: string[] = [];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    result.push(emojis[randomIndex]);
  }
  return result;
}
