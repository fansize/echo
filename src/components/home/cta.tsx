import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { content_cn } from "@/content/homepage-content";

export default function CTA() {
  return (
    <div className="text-start">
      <div className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 ">
        <h2>
          {content_cn.title.map((part, index) =>
            part.special ? (
              <span key={index} className="text-indigo-600 font-black">
                {part.text}
              </span>
            ) : (
              <span key={index}>{part.text}</span>
            )
          )}
        </h2>
      </div>

      <div className="flex mt-8 justify-start">
        <div className="flex flex-row gap-3 font-semibold rounded-full px-4 py-2 text-sm  text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          {content_cn.subtitle}
          <Link href="#">
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mt-8 text-lg leading-8 text-gray-600">
        {content_cn.description.map((step, index) => (
          <p key={index}>{step.text}</p>
        ))}
      </div>
      <div className="mt-16 flex items-center justify-center md:justify-start gap-x-6">
        <Link
          href="/episodes"
          className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {content_cn.getStarted}
        </Link>
        <Link
          href="/wiki"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          {content_cn.learnMore} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
