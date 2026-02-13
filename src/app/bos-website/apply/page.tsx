"use client";

import { useState, FormEvent } from "react";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Page Header */}
      <section className="pt-[150px] pb-16">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-600 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Join BOS
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-[-2px] mb-4">
            Application process.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-[560px]">
            We keep the bar high so every member gets maximum value.
          </p>
        </div>
      </section>

      {/* Application Steps */}
      <section className="py-28 bg-[#0D0D0D] text-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start gap-0 mb-12">
            {[
              { num: "1", title: "Apply", desc: "Fill out a short application. Tell us about your business, stage, and what you're solving for." },
              { num: "2", title: "Validation call", desc: "A 15-minute call to confirm fit. No pitch — just an honest conversation." },
              { num: "3", title: "Selection", desc: "We review every application. Not everyone gets in. That's what makes it work." },
              { num: "4", title: "Onboarding", desc: "Get access to frameworks, the community, and your first structured session." },
            ].map((step, i) => (
              <div key={step.num} className="flex md:flex-col items-start md:items-center md:text-center flex-1 gap-4 md:gap-0 px-0 md:px-4 py-5 md:py-0 border-b md:border-b-0 border-gray-800 last:border-b-0">
                <div className="w-11 h-11 min-w-[44px] flex items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-500 text-[#0A0A0A] text-[0.9375rem] font-extrabold rounded-full mb-0 md:mb-5 shadow-[0_4px_16px_rgba(250,204,21,0.3)]">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-[0.8125rem] text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block w-10 min-w-[40px] h-0.5 bg-gradient-to-r from-yellow-400 to-transparent rounded-sm mt-5 absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="max-w-[560px]">
            <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
              Start your application.
            </h2>
            <p className="text-[1.0625rem] text-gray-500 leading-relaxed max-w-[520px] mb-10">
              Takes under 3 minutes. We&apos;ll respond within 48 hours.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-[0.8125rem] font-semibold text-gray-700">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="text-[0.9375rem] px-4 py-3.5 bg-white border-[1.5px] border-gray-200 rounded-[10px] text-[#0A0A0A] outline-none transition-all focus:border-yellow-600 focus:shadow-[0_0_0_3px_rgba(234,179,8,0.1)] placeholder:text-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[0.8125rem] font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="text-[0.9375rem] px-4 py-3.5 bg-white border-[1.5px] border-gray-200 rounded-[10px] text-[#0A0A0A] outline-none transition-all focus:border-yellow-600 focus:shadow-[0_0_0_3px_rgba(234,179,8,0.1)] placeholder:text-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="text-[0.8125rem] font-semibold text-gray-700">
                  Company name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  placeholder="Your company"
                  className="text-[0.9375rem] px-4 py-3.5 bg-white border-[1.5px] border-gray-200 rounded-[10px] text-[#0A0A0A] outline-none transition-all focus:border-yellow-600 focus:shadow-[0_0_0_3px_rgba(234,179,8,0.1)] placeholder:text-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="role" className="text-[0.8125rem] font-semibold text-gray-700">
                  Your role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  required
                  placeholder="Founder, Co-founder, CEO..."
                  className="text-[0.9375rem] px-4 py-3.5 bg-white border-[1.5px] border-gray-200 rounded-[10px] text-[#0A0A0A] outline-none transition-all focus:border-yellow-600 focus:shadow-[0_0_0_3px_rgba(234,179,8,0.1)] placeholder:text-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="stage" className="text-[0.8125rem] font-semibold text-gray-700">
                  Business stage
                </label>
                <select
                  id="stage"
                  name="stage"
                  required
                  defaultValue=""
                  className="text-[0.9375rem] px-4 py-3.5 pr-10 bg-white border-[1.5px] border-gray-200 rounded-[10px] text-[#0A0A0A] outline-none transition-all focus:border-yellow-600 focus:shadow-[0_0_0_3px_rgba(234,179,8,0.1)] cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201.5L6%206.5L11%201.5%22%20stroke%3D%22%23A3A3A3%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]"
                >
                  <option value="" disabled>
                    Select your stage
                  </option>
                  <option value="pre-revenue">Pre-revenue (with product)</option>
                  <option value="early-revenue">Early revenue ($0-$50K/mo)</option>
                  <option value="growing">Growing ($50K-$200K/mo)</option>
                  <option value="scaling">Scaling ($200K+/mo)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="challenge" className="text-[0.8125rem] font-semibold text-gray-700">
                  Biggest challenge right now
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  rows={4}
                  required
                  placeholder="What's the one thing that, if solved, would change everything?"
                  className="text-[0.9375rem] px-4 py-3.5 bg-white border-[1.5px] border-gray-200 rounded-[10px] text-[#0A0A0A] outline-none transition-all focus:border-yellow-600 focus:shadow-[0_0_0_3px_rgba(234,179,8,0.1)] placeholder:text-gray-400 resize-y min-h-[80px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="why" className="text-[0.8125rem] font-semibold text-gray-700">
                  Why BOS?
                </label>
                <textarea
                  id="why"
                  name="why"
                  rows={3}
                  placeholder="What drew you here? (optional)"
                  className="text-[0.9375rem] px-4 py-3.5 bg-white border-[1.5px] border-gray-200 rounded-[10px] text-[#0A0A0A] outline-none transition-all focus:border-yellow-600 focus:shadow-[0_0_0_3px_rgba(234,179,8,0.1)] placeholder:text-gray-400 resize-y min-h-[80px]"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className={`w-full inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-xl transition-all ${
                  submitted
                    ? "bg-[#0A0A0A] text-white opacity-60 cursor-default"
                    : "bg-[#0A0A0A] text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
                }`}
              >
                {submitted ? "Application Submitted" : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
