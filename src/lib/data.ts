import { Episode } from "@/interface/Episode";

export const mockEpisodes: Episode[] = [
  {
    id: 1,
    slug: "episode-1",
    title: "Describing a person",
    coverEmojis: getRandomEmojis(),
    videoSrc: "/assets/videos/ep03.mp4",
    captionSrc: "/assets/captions/ep03.srt",
    tag: "Easy",
    topic: "Life",
  },
  {
    id: 2,
    slug: "episode-2",
    title: "How to call",
    coverEmojis: getRandomEmojis(),
    videoSrc:
      "http://salc3dvm1.bkt.gdipper.com/YSheldon.S01E12.mp4?e=1710924602&token=lwIN04iTSZ_s9cmbZO3oE7zDgsM-3M_VGeJj43xl:QWnlxUE-yphgzUNmrI3b8K6R56w=",
    captionSrc:
      "http://salc3dvm1.bkt.gdipper.com/YSheldon.S01E12.srt?e=1710970973&token=lwIN04iTSZ_s9cmbZO3oE7zDgsM-3M_VGeJj43xl:sJ7-JdniUw35wFSsMhz15CEhuS4=",
    tag: "Medium",
    topic: "Travel",
  },
  {
    id: 3,
    slug: "episode-3",
    title: "How to Describe a Person",
    coverEmojis: getRandomEmojis(),
    videoSrc:
      "http://salc3dvm1.bkt.gdipper.com/YSheldon.S01E12.mp4?e=1710924602&token=lwIN04iTSZ_s9cmbZO3oE7zDgsM-3M_VGeJj43xl:QWnlxUE-yphgzUNmrI3b8K6R56w=",
    captionSrc:
      "http://salc3dvm1.bkt.gdipper.com/YSheldon.S01E12.srt?e=1710924656&token=lwIN04iTSZ_s9cmbZO3oE7zDgsM-3M_VGeJj43xl:0dFYAHQuxcz2A4_WAAOU6XTbFvc=",
    tag: "Medium",
    topic: "Travel",
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
