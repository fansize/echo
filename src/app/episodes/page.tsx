"use client";

import Link from "next/link";

export type Episode = {
  id: number;
  title: string;
  href: string;
  videoSrc: string;
  subtitleSrc: string;
  tag: string;
  topic: string;
};

const episodes: Episode[] = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    videoSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    subtitleSrc: "Front of men's Basic Tee in black.",
    tag: "$35",
    topic: "Black",
  },
  {
    id: 2,
    title: "Basic Tee 2",
    href: "#",
    videoSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    subtitleSrc: "Front of men's Basic Tee in black.",
    tag: "$35",
    topic: "Black",
  },
];

export default function Listing() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {episodes.map((episode) => (
            <div key={episode.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={episode.videoSrc}
                  alt={episode.subtitleSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/episodes/${episode.title}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {episode.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{episode.topic}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {episode.tag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
