import { Episode } from "@/interface/Episode";

function getRandomEmojis(): string[] {
  const emojis = ["😀", "😎", "🌟", "🎉", "🚀", "🌈", "🍕", "🐱", "🌺"];
  let result: string[] = [];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    result.push(emojis[randomIndex]);
  }
  return result;
}

export const tags = {
  daily: { emoji: "🌈", topic: "日常对话" },
  oxford3000: { emoji: "🚀", topic: "牛津常用3000词" },
  series: { emoji: "🎉", topic: "看美剧学英语" },
};

const resources = {
  dailyConversation: {
    videoScr:
      "https://codecat.uk/Everyday%20English%20Listening%20%20Speaking%20%EF%BD%9C%20Listen%20%20Speak%20English%20Like%20a%20Native%20%EF%BD%9C%20English%20Conversation%20%5BDotppT_JH3E%5D.webm",
    captionSrc:
      "https://codecat.uk/ep01_parts%2FEveryday%20English%20Listening%20Speaking.srt",
  },
  oxford3000: {
    videoScr:
      "https://codecat.uk/The%20Oxford%203000%20Words%20-%20English%20Words%20List%20-%20Learn%20English%20Words%20%5B3ccxSPM--os%5D.webm",
    captionSrc:
      "https://codecat.uk/The%20Oxford%203000%20Words%20-%20English%20Words%20List%20-%20Learn%20English%20Words%20%5B3ccxSPM--os%5D.srt",
  },
};

export const mockEpisodes: Episode[] = [
  {
    slug: "episode001",
    title: "日常对话 Day001",
    coverEmojis: tags.daily.emoji,
    videoSrc: resources.dailyConversation.videoScr,
    captionSrc: resources.dailyConversation.captionSrc,
    startIndex: 1,
    endIndex: 100,
    tag: "3:58",
    topic: tags.daily.topic,
  },
  {
    slug: "episode002",
    title: "日常对话 Day002",
    coverEmojis: tags.daily.emoji,
    videoSrc: resources.dailyConversation.videoScr,
    captionSrc: resources.dailyConversation.captionSrc,
    startIndex: 101,
    endIndex: 193,
    tag: "3:00",
    topic: tags.daily.topic,
  },
  {
    slug: "episode003",
    title: "日常对话 Day003",
    coverEmojis: tags.daily.emoji,
    videoSrc: resources.dailyConversation.videoScr,
    captionSrc: resources.dailyConversation.captionSrc,
    startIndex: 195,
    endIndex: 300,
    tag: "3:35",
    topic: tags.daily.topic,
  },
  {
    slug: "episode004",
    title: "日常对话 Day004",
    coverEmojis: tags.daily.emoji,
    videoSrc: resources.dailyConversation.videoScr,
    captionSrc: resources.dailyConversation.captionSrc,
    startIndex: 301,
    endIndex: 400,
    tag: "3:35",
    topic: tags.daily.topic,
  },
  {
    slug: "episode005",
    title: "日常对话 Day005",
    coverEmojis: tags.daily.emoji,
    videoSrc: resources.dailyConversation.videoScr,
    captionSrc: resources.dailyConversation.captionSrc,
    startIndex: 401,
    endIndex: 500,
    tag: "3:35",
    topic: tags.daily.topic,
  },
  {
    slug: "episode006",
    title: "日常对话 Day006",
    coverEmojis: tags.daily.emoji,
    videoSrc: resources.dailyConversation.videoScr,
    captionSrc: resources.dailyConversation.captionSrc,
    startIndex: 501,
    endIndex: 600,
    tag: "3:35",
    topic: tags.daily.topic,
  },
  {
    slug: "episode007",
    title: "日常对话 Day007",
    coverEmojis: tags.daily.emoji,
    videoSrc: resources.dailyConversation.videoScr,
    captionSrc: resources.dailyConversation.captionSrc,
    startIndex: 601,
    endIndex: 700,
    tag: "3:35",
    topic: tags.daily.topic,
  },
  {
    slug: "episode008",
    title: "日常对话 Day008",
    coverEmojis: tags.daily.emoji,
    videoSrc: resources.dailyConversation.videoScr,
    captionSrc: resources.dailyConversation.captionSrc,
    startIndex: 701,
    endIndex: 800,
    tag: "3:35",
    topic: tags.daily.topic,
  },
  {
    slug: "episode009",
    title: "日常对话 Day009",
    coverEmojis: tags.daily.emoji,
    videoSrc: resources.dailyConversation.videoScr,
    captionSrc: resources.dailyConversation.captionSrc,
    startIndex: 801,
    endIndex: 900,
    tag: "3:35",
    topic: tags.daily.topic,
  },
  {
    slug: "episode010",
    title: "日常对话 Day010",
    coverEmojis: tags.daily.emoji,
    videoSrc: resources.dailyConversation.videoScr,
    captionSrc: resources.dailyConversation.captionSrc,
    startIndex: 901,
    endIndex: 1000,
    tag: "3:35",
    topic: tags.daily.topic,
  },

  {
    slug: "oxford3000-001",
    title: "字母 A",
    coverEmojis: tags.oxford3000.emoji,
    videoSrc: resources.oxford3000.videoScr,
    captionSrc: resources.oxford3000.captionSrc,
    startIndex: 1,
    endIndex: 213,
    tag: "8:23",
    topic: tags.oxford3000.topic,
  },
  {
    slug: "oxford3000-002",
    title: "字母 B",
    coverEmojis: tags.oxford3000.emoji,
    videoSrc: resources.oxford3000.videoScr,
    captionSrc: resources.oxford3000.captionSrc,
    startIndex: 214,
    endIndex: 300,
    tag: "4:23",
    topic: tags.oxford3000.topic,
  },
  {
    slug: "oxford3000-003",
    title: "字母 C",
    coverEmojis: tags.oxford3000.emoji,
    videoSrc: resources.oxford3000.videoScr,
    captionSrc: resources.oxford3000.captionSrc,
    startIndex: 301,
    endIndex: 400,
    tag: "3:03",
    topic: tags.oxford3000.topic,
  },
  {
    slug: "oxford3000-004",
    title: "字母 D",
    coverEmojis: tags.oxford3000.emoji,
    videoSrc: resources.oxford3000.videoScr,
    captionSrc: resources.oxford3000.captionSrc,
    startIndex: 401,
    endIndex: 500,
    tag: "3:03",
    topic: tags.oxford3000.topic,
  },
  {
    slug: "oxford3000-005",
    title: "字母 E",
    coverEmojis: tags.oxford3000.emoji,
    videoSrc: resources.oxford3000.videoScr,
    captionSrc: resources.oxford3000.captionSrc,
    startIndex: 501,
    endIndex: 700,
    tag: "3:03",
    topic: tags.oxford3000.topic,
  },
  {
    slug: "YzIbLxApGpc",
    title: "Let's talk about Money in English",
    coverEmojis: tags.oxford3000.emoji,
    videoSrc: "https://www.youtube.com/watch?v=YzIbLxApGpc",
    captionSrc: "",
    startIndex: 1,
    endIndex: 700,
    tag: "3:03",
    topic: "test",
  },
];
