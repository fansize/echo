import { Episode } from "@/interface/Episode";

export const tags = {
  daily: { emoji: "🌈", topic: "日常对话" },
  series: { emoji: "🎉", topic: "看美剧学英语" },
};

const dailyConversation = {
  videoScr:
    "https://codecat.uk/Everyday%20English%20Listening%20%20Speaking%20%EF%BD%9C%20Listen%20%20Speak%20English%20Like%20a%20Native%20%EF%BD%9C%20English%20Conversation%20%5BDotppT_JH3E%5D.webm",
  captionSrc:
    "https://codecat.uk/Everyday%20English%20Listening%20%20Speaking%20%EF%BD%9C%20Listen%20%20Speak%20English%20Like%20a%20Native%20%EF%BD%9C%20English%20Conversation%20%5BDotppT_JH3E%5D.srt",
};

export const mockEpisodes: Episode[] = [
  {
    slug: "episode-1",
    title: "日常对话 Day001",
    coverEmojis: tags.daily.emoji,
    videoSrc: dailyConversation.videoScr,
    captionSrc: dailyConversation.captionSrc,
    startIndex: 1,
    endIndex: 100,
    tag: "3:01",
    topic: tags.daily.topic,
  },
  {
    slug: "episode-2",
    title: "日常对话 Day002",
    coverEmojis: tags.daily.emoji,
    videoSrc: dailyConversation.videoScr,
    captionSrc: dailyConversation.captionSrc,
    startIndex: 100,
    endIndex: 200,
    tag: "3:01",
    topic: tags.daily.topic,
  },
  {
    slug: "episode-3",
    title: "小谢尔顿 Day001",
    coverEmojis: tags.daily.emoji,
    videoSrc: dailyConversation.videoScr,
    captionSrc: dailyConversation.captionSrc,
    startIndex: 100,
    endIndex: 200,
    tag: "3:01",
    topic: tags.series.topic,
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
