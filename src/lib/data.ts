import { Episode } from "@/interface/Episode";

export const mockEpisodes: Episode[] = [
  {
    id: 1,
    slug: "episode-1",
    title: "Describing a person",
    coverImage: "/assets/images/coverImage/ep01.png",
    videoSrc: "/assets/videos/ep03.mp4",
    captionSrc: "/assets/captions/ep03.srt",
    tag: "Easy",
    topic: "Life",
  },
  {
    id: 2,
    slug: "episode-2",
    title: "How to call",
    coverImage: "/assets/images/coverImage/ep02.png",
    videoSrc:
      "http://salc3dvm1.bkt.gdipper.com/YSheldon.S01E12.mp4?e=1710924602&token=lwIN04iTSZ_s9cmbZO3oE7zDgsM-3M_VGeJj43xl:QWnlxUE-yphgzUNmrI3b8K6R56w=",
    captionSrc:
      "http://salc3dvm1.bkt.gdipper.com/YSheldon.S01E12.srt?e=1710924656&token=lwIN04iTSZ_s9cmbZO3oE7zDgsM-3M_VGeJj43xl:0dFYAHQuxcz2A4_WAAOU6XTbFvc=",
    tag: "Medium",
    topic: "Travel",
  },

  {
    id: 3,
    slug: "episode-3",
    title: "Store at Vercel",
    coverImage: "/assets/images/coverImage/ep02.png",
    videoSrc:
      "https://ko7uxl8h2z5pmfxi.public.blob.vercel-storage.com/ep02-t9TlvFpSXZCNrg1zAa9c0vDucurG2Q.mp4",
    captionSrc:
      "https://ko7uxl8h2z5pmfxi.public.blob.vercel-storage.com/ep02-jJBRZzYrZo357XEL9FPZNzkQNRXdQX.srt",
    tag: "Medium",
    topic: "Travel",
  },
];
