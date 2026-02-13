const plans = [
  {
    label: "Monthly",
    price: "299",
    desc: "Cancel anytime. No lock-in contracts.",
    features: [
      "All 5 BOS framework modules",
      "Weekly live sessions",
      "Monthly open mic access",
      "All tools & templates",
      "Private founder community",
      "Accountability check-ins",
    ],
    featured: false,
    cta: "Get Started",
  },
  {
    label: "Annual",
    price: "249",
    desc: "Billed annually. Save $600/year.",
    features: [
      "Everything in Monthly",
      "2 months free",
      "Priority session access",
      "1-on-1 onboarding call",
      "Early access to new tools",
      "Founder directory listing",
    ],
    featured: true,
    cta: "Apply Now",
  },
];

export default function PricingSection() {
  return (
    <section className="py-[120px] max-[900px]:py-20" id="pricing">
      <div className="max-w-[1080px] mx-auto px-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-400 mb-4">
          Investment
        </span>
        <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
          Simple, transparent pricing.
        </h2>
        <p className="text-[1.0625rem] text-gray-500 leading-[1.7] max-w-[520px] mb-14">
          One plan. Full access. No upsells. The price reflects the value of the
          community and the bar we maintain.
        </p>

        <div className="grid grid-cols-2 gap-6 max-w-[720px] max-sm:grid-cols-1 max-sm:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.label}
              className={`relative p-10 border rounded-2xl transition-all hover:-translate-y-0.5 ${
                plan.featured
                  ? "border-yellow-400 bg-gray-50 hover:border-yellow-500 max-sm:order-first"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-9 text-[0.6875rem] font-bold uppercase tracking-[1px] text-[#0A0A0A] bg-yellow-400 px-3.5 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-sm font-semibold text-gray-500 mb-2">
                {plan.label}
              </div>

              <div className="flex items-baseline gap-0.5 mb-2">
                <span className="text-2xl font-bold text-[#0A0A0A]">$</span>
                <span className="text-[3.5rem] font-extrabold tracking-[-2px] text-[#0A0A0A] leading-none">
                  {plan.price}
                </span>
                <span className="text-base font-medium text-gray-400">
                  /month
                </span>
              </div>

              <p className="text-[0.8125rem] text-gray-400 mb-7">
                {plan.desc}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="relative pl-[22px] text-sm text-gray-600 leading-normal before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-3 before:h-1.5 before:border-l-2 before:border-b-2 before:border-yellow-600 before:-rotate-45"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#apply"
                className={`block w-full text-center px-7 py-3 text-[0.9375rem] font-semibold rounded-lg transition-all hover:-translate-y-px ${
                  plan.featured
                    ? "bg-[#0A0A0A] text-white hover:bg-gray-800"
                    : "bg-transparent text-gray-600 border border-gray-300 hover:text-[#0A0A0A] hover:border-gray-500"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
