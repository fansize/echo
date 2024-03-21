import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { content_cn } from "@/content/homepage-content";

export default function CTASection() {
  return (
    <div className="flex flex-col md:flex-row  gap-4 py-8 md:py-16">
      <div className="md:w-3/5 text-start">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 ">
          {content_cn.title.map((part, index) =>
            part.special ? (
              <span key={index} className="text-indigo-600 font-bold">
                {part.text}
              </span>
            ) : (
              <span key={index}>{part.text}</span>
            )
          )}
        </h1>

        <div className="flex mt-6 justify-start">
          <div className="flex flex-row gap-3 font-semibold rounded-full px-4 py-2 text-sm  text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            {content_cn.subtitle}
            <Link href="#">
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          {content_cn.description.map((step, index) => (
            <p key={index}>{step.text}</p>
          ))}
        </p>
        <div className="mt-10 flex items-center justify-start gap-x-6">
          <Link
            href="/episodes"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {content_cn.getStarted}
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {content_cn.learnMore} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <div className="md:w-2/5 rounded-lg shadow-xl">
        <Image
          src="/assets/images/placeholder-homepage.png"
          width={1694}
          height={1130}
          alt="Picture of the Echo English"
        />
      </div>
    </div>
  );
}
