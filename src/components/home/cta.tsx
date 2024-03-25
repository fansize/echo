import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Highlight from "@/components/home/highlight";
import { content_cn } from "@/content/homepage-content";

export default function CTA() {
  return (
    <div className="text-start">
      <div className="text-4xl md:text-5xl font-bold ">
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
        <div className="flex flex-row gap-3 font-semibold rounded-full px-4 py-2 text-sm  ring-1 ring-gray-900/10 dark:ring-white hover:ring-gray-900/20">
          {content_cn.subtitle}
          <Link href="#">
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mt-8 text-gray-600 dark:text-slate-300">
        {content_cn.description.map((step, index) => (
          <Highlight key={index} text={step.text} />
        ))}
      </div>
      <div className="mt-12 md:mr-12 md:mt-12 flex items-center justify-center md:justify-start gap-x-6">
        <Link
          href="/episodes"
          className="flex items-center justify-center rounded-md bg-indigo-600 w-2/3  py-5 text-base tracking-widest font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {content_cn.getStarted}
        </Link>
        <Link
          href="/wiki"
          className="flex items-center justify-center text-base w-1/4  py-5 rounded-md  dark:bg-slate-500/20 bg-neutral-300/20"
        >
          {content_cn.learnMore}
        </Link>
      </div>
    </div>
  );
}
