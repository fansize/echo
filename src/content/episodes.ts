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
    id: 2,
    slug: "episode-2",
    title: "小谢尔顿EP012",
    coverEmojis: getRandomEmojis(),
    videoSrc:
      "http://salc3dvm1.bkt.gdipper.com/YSheldon.S01E12.mp4?e=1710924602&token=lwIN04iTSZ_s9cmbZO3oE7zDgsM-3M_VGeJj43xl:QWnlxUE-yphgzUNmrI3b8K6R56w=",
    captionSrc:
      "http://salc3dvm1.bkt.gdipper.com/YSheldon.S01E12.srt?e=1710970973&token=lwIN04iTSZ_s9cmbZO3oE7zDgsM-3M_VGeJj43xl:sJ7-JdniUw35wFSsMhz15CEhuS4=",
    tag: "16",
    topic: "美剧",
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
    id: 5,
    slug: "episode-5",
    title: "如何进行 Small Talk",
    coverEmojis: getRandomEmojis(),
    videoSrc:
      "http://salc3dvm1.bkt.gdipper.com/YSheldon.S01E12.mp4?e=1710924602&token=lwIN04iTSZ_s9cmbZO3oE7zDgsM-3M_VGeJj43xl:QWnlxUE-yphgzUNmrI3b8K6R56w=",
    captionSrc:
      "http://salc3dvm1.bkt.gdipper.com/YSheldon.S01E12.srt?e=1710970973&token=lwIN04iTSZ_s9cmbZO3oE7zDgsM-3M_VGeJj43xl:sJ7-JdniUw35wFSsMhz15CEhuS4=",
    tag: "5",
    topic: "雅思",
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
