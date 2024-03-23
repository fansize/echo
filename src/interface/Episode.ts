export type Episode = {
  slug: string;
  title: string;
  coverEmojis: string[];
  videoSrc: string;
  captionSrc: string;
  startIndex?: number;
  endIndex?: number;
  tag: string;
  topic: string;
};
