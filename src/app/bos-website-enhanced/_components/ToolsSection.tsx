const tools = [
  {
    icon: "DO",
    badge: "Live",
    badgeColor: "text-green-500 bg-green-500/10",
    name: "DecisionOS",
    description:
      "A counselor-style decision framework that walks you through high-stakes choices. Get clarity scores, red flag detection, and actionable verdicts.",
    features: [
      "4-step guided wizard",
      "Weighted scoring algorithm",
      "Red flag detection",
      "Experiment plans for uncertain decisions",
    ],
    coming: false,
  },
  {
    icon: "TM",
    badge: "Live",
    badgeColor: "text-green-500 bg-green-500/10",
    name: "BossTeam",
    description:
      "Team management and operations dashboard. Track members, tasks, roles, and performance analytics — all in one place.",
    features: [
      "Team member management",
      "Task tracking with status flows",
      "Role-based organization",
      "Month-over-month analytics",
    ],
    coming: false,
  },
  {
    icon: "DX",
    badge: "Coming Soon",
    badgeColor: "text-yellow-400 bg-yellow-400/10",
    name: "Startup Diagnostics",
    description:
      "Run a health check on your startup across revenue, marketing, operations, and leadership. Identify gaps and get prioritized action items.",
    features: [
      "Revenue diagnosis",
      "Marketing effectiveness scoring",
      "Operations health check",
      "Prioritized action roadmap",
    ],
    coming: true,
  },
];

export default function ToolsSection() {
  return (
    <section className="py-[120px] bg-[#171717] text-white max-[900px]:py-20" id="tools">
      <div className="max-w-[1080px] mx-auto px-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-500 mb-4">
          Built-In Tools
        </span>
        <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
          Your founder toolkit.
        </h2>
        <p className="text-[1.0625rem] text-gray-500 leading-[1.7] max-w-[520px] mb-14">
          BOS isn&apos;t just frameworks — it&apos;s working software. Tools you
          can use today to run your business better.
        </p>

        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={`p-8 border border-gray-800 rounded-xl transition-all hover:border-gray-600 hover:-translate-y-0.5 ${
                tool.coming ? "opacity-70" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 flex items-center justify-center bg-yellow-400 text-[#0A0A0A] text-[0.8125rem] font-extrabold tracking-[0.5px] rounded-[10px]">
                  {tool.icon}
                </div>
                <span
                  className={`text-[0.6875rem] font-bold uppercase tracking-[1px] px-2.5 py-1 rounded-full ${tool.badgeColor}`}
                >
                  {tool.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 text-white">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                {tool.description}
              </p>

              <ul className="space-y-2">
                {tool.features.map((feature) => (
                  <li
                    key={feature}
                    className="relative pl-[18px] text-[0.8125rem] text-gray-400 leading-normal before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-yellow-400"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
