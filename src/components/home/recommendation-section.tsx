import Image from "next/image";
import { content_cn } from "@/content/quote-content";

export default function Recommendation() {
  return (
    <div className="overflow-hidden px-6 py-18 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="flex flex-col items-center justify-center">
          <p className="mt-4 text-2xl font-bold text-gray-900">
            谁在推荐回音法学习英语?
          </p>
        </div>
        <div className="mt-10">
          <div className="text-start text-xl leading-9 text-gray-900 sm:text-base">
            <p>{content_cn.quote}</p>
          </div>
          <div className="mt-10">
            <Image
              className="mx-auto h-10 w-10 rounded-full"
              src={content_cn.authorImage}
              alt="author image"
              width={450}
              height={570}
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">
                {content_cn.authorName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
