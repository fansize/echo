import Link from "next/link";
import EmojiImage from "@/components/CustomUI/emoji-image";

type Props = {
  slug?: string;
  title: string;
  coverEmojis: string[];
  tag: string;
  topic: string;
};

export function EpisodeCard({ slug, title, coverEmojis, tag, topic }: Props) {
  return (
    <div className="relative">
      <div className="absolute p-8 right-0 bottom-0">
        <EmojiImage emoji={coverEmojis[0]} />
      </div>

      <Link as={`/episodes/${slug}`} href="/episodes/[slug]" aria-label={title}>
        <div className="flex flex-row p-8 overflow-hidden rounded-lg justify-between bg-indigo-900 text-white lg:aspect-none group-hover:opacity-75">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-2xl font-black tracking-wide line-clamp-1">
              {title}
            </h3>
            <div className="flex">
              <div className="py-2 px-4 bg-amber-500 rounded-md">
                <p className="text-xs font-semibold line-clamp-1">
                  Young Shelden
                </p>
              </div>
            </div>
            <p className="text-base font-medium">
              <span className="font-bold text-lg">100+</span> Sentences
            </p>
            <div className="flex flex-row gap-2">
              <p className="text-xs font-medium py-2 px-4 border rounded-lg text-amber-500">
                {topic}
              </p>
              <p className="text-xs font-medium py-2 px-4 border rounded-lg text-amber-500">
                {tag}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
