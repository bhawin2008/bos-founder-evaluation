"use client";

import {
  BookOpen,
  Target,
  TrendingUp,
  Settings,
  Cpu,
  Shield,
  Users,
  BarChart3,
} from "lucide-react";

export default function ManualView() {
  const sections = [
    {
      icon: BookOpen,
      title: "Getting Started",
      content:
        "The Culture Console is a comprehensive team management and culture intelligence platform built on the GOR (Growth, Operations, Resilience) framework. It provides real-time insights into your team's health, productivity, and collaboration patterns.",
    },
    {
      icon: Target,
      title: "GOR Framework Overview",
      content:
        "The GOR framework measures three core dimensions of organizational culture:\n\n- Growth: Measures learning velocity, skill development, and innovation capacity. Teams scoring high in Growth embrace change and continuously improve.\n\n- Operations: Tracks execution efficiency, process adherence, and delivery consistency. High Operations scores indicate reliable, well-coordinated teams.\n\n- Resilience: Assesses adaptability, stress management, and recovery speed. Resilient teams maintain performance under pressure and bounce back from setbacks.",
    },
    {
      icon: TrendingUp,
      title: "Culture Health Score",
      content:
        "The Culture Health Score is an aggregate metric combining GOR dimensions with configurable weights. Default weights: Growth (35%), Operations (40%), Resilience (25%).\n\nHealth Levels:\n- Excellent (90+): Outstanding culture alignment\n- Good (75-89): Healthy team dynamics\n- Warning (60-74): Attention needed\n- Critical (<60): Immediate intervention required",
    },
    {
      icon: Users,
      title: "Member Management",
      content:
        "Track team members with roles, status, and individual GOR scores. Each member has:\n- A culture score (0-100)\n- Individual GOR breakdown\n- Task assignment history\n- Status tracking (Active, On Leave, Inactive)\n\nUse the Members view to add, edit, or remove team members and monitor their performance trends.",
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      content:
        "The Reports view provides month-over-month performance comparisons including:\n- Task completion rates and volume trends\n- Priority distribution analysis\n- Per-member performance tracking\n- Weekly completion timelines\n\nUse date range filters to focus on specific periods.",
    },
    {
      icon: Cpu,
      title: "Signal Framework",
      content:
        "Signals are measurable indicators of culture health. Each signal has:\n- A category (engagement, productivity, collaboration, wellbeing, leadership)\n- A weight determining its influence on the overall score\n- A threshold that triggers alerts when crossed\n\nConfigure signals in the Signal Framework view to match your organization's priorities.",
    },
    {
      icon: Shield,
      title: "Auto Rules",
      content:
        "Automated rules respond to signal changes without manual intervention:\n- Define trigger conditions based on signal thresholds\n- Set actions like alerts, notifications, or scheduled meetings\n- Enable/disable rules as needed\n- Track when rules were last triggered\n\nExample: Auto-alert when a member's wellbeing signal drops below 50.",
    },
    {
      icon: Settings,
      title: "Configuration",
      content:
        "Customize the console to your organization:\n- Organization name and branding\n- GOR dimension weights\n- Health threshold levels\n- Date range defaults\n- Notification preferences\n- Auto-rules toggle\n\nAll configuration changes take effect immediately across all views.",
    },
  ];

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">Manual</h2>
          <p className="text-[#8888a0] text-sm mt-1">
            Culture Console &amp; GOR Framework documentation
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {sections.map(({ icon: Icon, title, content }) => (
          <div
            key={title}
            className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[rgba(74,108,247,0.12)] flex items-center justify-center text-[#4a6cf7]">
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-[#f0f0f5]">{title}</h3>
            </div>
            <div className="text-[0.88rem] text-[#8888a0] leading-relaxed whitespace-pre-line">
              {content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
