import { content_cn } from "@/content/feature-content";

export default function FeatureSection() {
  return (
    <div className="my-16 md:my-16">
      <div className="flex flex-col items-center justify-center">
        <p className="mt-4 text-2xl font-bold text-gray-900">
          {content_cn.title}
        </p>
        <p className="mt-4 text-lg text-gray-600">{content_cn.description}</p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-20 md:grid-cols-3">
        {content_cn.recommendation.map((feature) => (
          <div key={feature.name} className="flex flex-col">
            <div className="flex flex-row text-base font-semibold gap-2 text-gray-900">
              <feature.icon
                className="h-6 w-6 text-indigo-600"
                aria-hidden="true"
              />
              {feature.name}
            </div>
            <div className="mt-4 text-base text-gray-600">
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
