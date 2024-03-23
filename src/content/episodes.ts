import { Episode } from "@/interface/Episode";

export const mockEpisodes: Episode[] = [
  {
    id: 1,
    slug: "episode-1",
    title: "示例视频，小谢尔顿",
    coverEmojis: getRandomEmojis(),
    videoSrc: "/assets/videos/ep03.mp4",
    captionSrc: "/assets/captions/ep03.srt",
    tag: "0.2",
    topic: "日常",
  },
  {
    id: 3,
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
    id: 6,
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
    id: 7,
    slug: "episode-7",
    title: "Children's fiction",
    coverEmojis: getRandomEmojis(),
    videoSrc:"https://ia803108.us.archive.org/10/items/a_christmas_miscellany_2018_1807_librivox/christmasmiscellany2018_01_various_64kb.mp3",
    captionSrc:"https://codecat.uk/A%20911%20Call%20full%20video.srt",
    tag: "1.22",
    topic: "日常",
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
