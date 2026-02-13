"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What stage should my business be at to join?",
    answer:
      "You should have an active product or service and be generating some revenue. BOS is designed for founders who\u2019ve moved past the idea stage and are now dealing with growth, operations, and scaling challenges.",
  },
  {
    question: "How much time do I need to commit per week?",
    answer:
      "Plan for 2-3 hours per week: one live session plus time to implement frameworks in your business. The system is designed for busy founders \u2014 structured enough to be valuable, lean enough to be sustainable.",
  },
  {
    question: "Is this only for IT/tech founders?",
    answer:
      "BOS is built specifically for IT founders \u2014 people running software companies, dev agencies, SaaS products, and tech consultancies. The frameworks, language, and community are all tailored to this space.",
  },
  {
    question: "What if I join and it\u2019s not the right fit?",
    answer:
      "Monthly members can cancel anytime with no penalties. Annual members can request a prorated refund within the first 30 days. We\u2019d rather have the right people than keep the wrong ones.",
  },
  {
    question: "How is this different from other founder communities?",
    answer:
      "Most communities are either unstructured networking or course-based learning. BOS is an operating system \u2014 it gives you frameworks, tools, and accountability in a structured cadence. It\u2019s not about consuming content; it\u2019s about implementing systems.",
  },
  {
    question: "Can I try the tools before joining?",
    answer:
      "Some of our tools like DecisionOS and the Startup Health Diagnostic are available for preview. Full tool access, templates, and community features require membership.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-[120px] max-[900px]:py-20" id="faq">
      <div className="max-w-[1080px] mx-auto px-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-400 mb-4">
          Common Questions
        </span>
        <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
          Frequently asked.
        </h2>

        <div className="max-w-[680px] mt-14">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border-b border-gray-200 ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <button
                className="flex items-center justify-between w-full py-6 bg-transparent border-none cursor-pointer text-base font-semibold text-[#0A0A0A] text-left gap-4 transition-colors hover:text-gray-600"
                aria-expanded={activeIndex === i}
                onClick={() => toggle(i)}
              >
                <span>{faq.question}</span>
                <span
                  className={`text-xl font-normal text-gray-400 min-w-[20px] text-center transition-transform duration-300 ${
                    activeIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === i ? "max-h-[200px]" : "max-h-0"
                }`}
              >
                <p className="text-[0.9375rem] text-gray-500 leading-[1.7] pb-6">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
