import Image from "next/image";
import Link from "next/link";

type Props = {
  slug?: string;
  title: string;
  coverImage: string;
  tag: string;
  topic: string;
};

export function EpisodeCard({ slug, title, coverImage, tag, topic }: Props) {
  const image = (
    <img
      src={coverImage}
      alt={`Cover Image for ${title}`}
      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
    />
    // <Image
    //   src={src}
    //   alt={`Cover Image for ${title}`}
    //   className={cn("shadow-sm w-full", {
    //     "hover:shadow-lg transition-shadow duration-200": slug,
    //   })}
    //   width={1300}
    //   height={630}
    // />
  );

  return (
    <>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        {slug ? (
          <Link
            as={`/episodes/${slug}`}
            href="/episodes/[slug]"
            aria-label={title}
          >
            {image}
          </Link>
        ) : (
          image
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm">
            <Link
              as={`/episodes/${slug}`}
              href="/episodes/[slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-1 text-sm">{topic}</p>
        </div>
        <p className="text-sm font-medium">{tag}</p>
      </div>
    </>
  );
}
