import { content_cn } from "@/content/feature-content";

export default function FeatureSection() {
  return (
    <div className="my-8 md:my-16">
      <div className="flex flex-col items-center justify-center">
        <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-slate-300">
          {content_cn.title}
        </p>
      </div>

      <div className="mt-8 md:mt-8 grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-3">
        {content_cn.recommendation.map((feature) => (
          <div
            key={feature.name}
            className="flex flex-col p-8 rounded-lg border dark:bg-slate-500/20 bg-slate-100/20"
          >
            <div className="flex flex-row text-base font-semibold gap-2 text-gray-900 dark:text-slate-300">
              <feature.icon
                className="h-6 w-6 text-indigo-600"
                aria-hidden="true"
              />
              {feature.name}
            </div>
            <div className="mt-4 text-base text-gray-600 dark:text-slate-400">
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
