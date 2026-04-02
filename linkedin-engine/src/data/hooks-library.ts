import type { HookCategory } from "@/types";

export interface HookData {
  text: string;
  category: HookCategory;
}

export const hooksLibrary: HookData[] = [
  // Story hooks
  { text: "I made a mistake that cost me 6 months of progress. Here's what happened:", category: "story" },
  { text: "The best career advice I ever got was just 4 words:", category: "story" },
  { text: "I said no to a ₹10 lakh project. Here's why:", category: "story" },
  { text: "3 years ago, I almost quit my business. One conversation changed everything.", category: "story" },
  { text: "I got rejected 47 times before landing my dream role. Here's what I learned:", category: "story" },
  { text: "A stranger's email changed my entire career trajectory. Let me explain:", category: "story" },
  { text: "I fired my biggest client last month. Best decision I ever made.", category: "story" },

  // Authority hooks
  { text: "Nobody talks about this, but it's the #1 reason most LinkedIn posts fail:", category: "authority" },
  { text: "Here's a framework I use every week that nobody teaches:", category: "authority" },
  { text: "If I had to start my LinkedIn from scratch today, here's exactly what I'd do:", category: "authority" },
  { text: "I've reviewed 500+ LinkedIn profiles this year. Here's the pattern I see in the top 1%:", category: "authority" },
  { text: "After working with 100+ professionals, I've noticed 3 habits that separate top performers:", category: "authority" },
  { text: "The most successful people I know all do this one thing differently:", category: "authority" },
  { text: "I've been in this industry for 10 years. Here's what nobody tells beginners:", category: "authority" },

  // Engagement hooks
  { text: "I went from 0 to 10,000 followers in 90 days. But not the way you think.", category: "engagement" },
  { text: "I asked 50 hiring managers what they actually look at on LinkedIn profiles:", category: "engagement" },
  { text: "Hot take: your morning routine doesn't matter. Here's what actually does:", category: "engagement" },
  { text: "Let's settle this once and for all. Which matters more: skills or connections?", category: "engagement" },
  { text: "I polled 200 founders. The #1 thing they wish they knew before starting:", category: "engagement" },
  { text: "Agree or disagree? The best leaders don't have all the answers.", category: "engagement" },

  // Controversy hooks
  { text: "Stop doing this on LinkedIn. Seriously.", category: "controversy" },
  { text: "Unpopular opinion: Engagement pods don't work anymore.", category: "controversy" },
  { text: "I'll say what nobody else will: hustle culture is destroying careers.", category: "controversy" },
  { text: "Everyone's talking about AI replacing jobs. They're missing the real problem:", category: "controversy" },
  { text: "Your company culture isn't broken. Your leadership is.", category: "controversy" },
  { text: "The 'just be authentic' advice on LinkedIn is terrible. Here's why:", category: "controversy" },

  // Education hooks
  { text: "Your LinkedIn headline is costing you clients. Here's the fix:", category: "education" },
  { text: "I spent 30 days studying viral LinkedIn posts. Here are 5 patterns:", category: "education" },
  { text: "Most people overthink LinkedIn. Here's my simple daily process:", category: "education" },
  { text: "5 LinkedIn features you're not using (but should be):", category: "education" },
  { text: "The difference between a good and great LinkedIn profile? These 3 things:", category: "education" },
  { text: "Here's exactly how I write a LinkedIn post in 15 minutes:", category: "education" },
  { text: "The LinkedIn algorithm changed again. Here's what works now:", category: "education" },

  // Case study hooks
  { text: "3 years ago, I was invisible on LinkedIn. Today, 80% of my clients come from here.", category: "case_study" },
  { text: "This one change to my LinkedIn profile doubled my inbound leads:", category: "case_study" },
  { text: "My client went from 200 to 5,000 followers in 60 days. Here's the exact playbook:", category: "case_study" },
  { text: "We increased our team's LinkedIn engagement by 300%. Here's how:", category: "case_study" },
  { text: "One post. 50,000 impressions. Zero ad spend. Here's what happened:", category: "case_study" },

  // Launch hooks
  { text: "After 6 months of building in silence, I'm finally ready to share this:", category: "launch" },
  { text: "We just launched something that solves a problem nobody's talking about:", category: "launch" },
  { text: "Big announcement: I'm leaving my comfort zone. Here's what's next:", category: "launch" },
  { text: "I've been working on something for months. Today, it's live:", category: "launch" },
  { text: "This started as a side project. Now it's solving a real problem:", category: "launch" },

  // Personal hooks
  { text: "I didn't post on LinkedIn for 2 months. Here's the honest reason:", category: "personal" },
  { text: "My therapist said something that changed how I lead my team:", category: "personal" },
  { text: "I burnt out last year. Here's what nobody saw behind the success posts:", category: "personal" },
  { text: "The hardest conversation I've ever had at work taught me everything:", category: "personal" },
  { text: "I used to think success meant working 14-hour days. I was wrong.", category: "personal" },

  // Opinion hooks
  { text: "Controversial: Remote work isn't for everyone. And that's okay.", category: "opinion" },
  { text: "We need to stop glorifying 'busy' in professional culture.", category: "opinion" },
  { text: "The best hire I ever made had zero relevant experience. Here's why:", category: "opinion" },
  { text: "Most career advice is given by people who got lucky. Here's what actually works:", category: "opinion" },
  { text: "The future of work isn't AI. It's something nobody's paying attention to:", category: "opinion" },
];
