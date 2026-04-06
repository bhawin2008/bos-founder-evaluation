export interface SwipePost {
  hook: string;
  content: string;
  content_type: "text" | "carousel" | "poll";
  industry: string;
  engagement_level: "high" | "very_high" | "viral";
  goal: string;
}

export const swipeFile: SwipePost[] = [
  {
    hook: "I spent 30 days replying to every comment on my LinkedIn posts. Here's what happened:",
    content: `I spent 30 days replying to every comment on my LinkedIn posts. Here's what happened:

My impressions went up 340%.

But that's not the interesting part.

Here's what I actually learned:

1. People remember you when you reply thoughtfully
2. Conversations in comments lead to DMs
3. DMs lead to calls
4. Calls lead to clients

The algorithm didn't change. My behavior did.

I stopped treating LinkedIn like a broadcast channel and started treating it like a coffee shop.

The ROI of genuine conversation > the ROI of going viral.

What's your approach to comments? Do you reply to everyone?`,
    content_type: "text",
    industry: "Marketing",
    engagement_level: "viral",
    goal: "engagement",
  },
  {
    hook: "My client had 200 LinkedIn followers. 90 days later, she had 5,000. Here's the exact playbook:",
    content: `My client had 200 LinkedIn followers. 90 days later, she had 5,000. Here's the exact playbook:

Week 1-2: Profile overhaul
- Rewrote her headline (from job title to value proposition)
- Updated About section with a clear story
- Added a professional banner

Week 3-4: Content foundation
- Identified 3 content pillars
- Created a simple posting schedule (3x/week)
- Wrote 12 posts in advance

Week 5-8: Consistency + engagement
- Posted consistently at 8:30 AM IST
- Spent 15 min/day engaging with others' posts
- Replied to every comment within 1 hour

Week 9-12: Authority building
- Started sharing frameworks and data
- Published 2 long-form articles
- Connected with 10 new people daily

The result: 5,000 followers. 3 inbound clients. 1 speaking invitation.

No hacks. No pods. Just consistency and genuine value.

What's stopping you from trying this?`,
    content_type: "text",
    industry: "Consulting",
    engagement_level: "very_high",
    goal: "authority",
  },
  {
    hook: "The worst career advice I ever received: 'Just work hard and you'll be noticed.'",
    content: `The worst career advice I ever received: "Just work hard and you'll be noticed."

I believed it for 5 years.

Worked 12-hour days.
Delivered every project early.
Never said no.

And I watched people who did half the work get promoted.

Here's what nobody told me:

Visibility > Ability.

Not because talent doesn't matter — it does.
But because decisions are made in rooms you're not in.

Your work doesn't speak for itself. YOU speak for your work.

3 things I do now:
1. Share wins with my manager weekly (not just at review time)
2. Build relationships with people 2 levels above me
3. Post on LinkedIn to build external visibility

Working hard is the minimum. Making sure people know about it is the strategy.

Harsh? Maybe. True? Absolutely.

What's the worst career advice you've received?`,
    content_type: "text",
    industry: "Career",
    engagement_level: "viral",
    goal: "engagement",
  },
  {
    hook: "I replaced 4 hours of weekly meetings with a simple Loom video. Here's what changed:",
    content: `I replaced 4 hours of weekly meetings with a simple Loom video. Here's what changed:

Before:
- 4 status update meetings per week
- Average 45 min each
- 12 hours/month wasted
- Everyone checked out after 10 min

After:
- 1 weekly 5-min Loom video with updates
- Team responds async with comments
- Monthly 30-min sync for deep discussions only

Results after 3 months:
- Team productivity up (their words, not mine)
- Zero missed updates
- Better documentation (videos are searchable)
- People actually retain the information

The meeting wasn't the problem. The format was.

Not every conversation needs a Zoom call. Sometimes a 5-minute video says more than a 60-minute meeting.

What meetings could you replace with async updates?`,
    content_type: "text",
    industry: "Tech",
    engagement_level: "high",
    goal: "authority",
  },
  {
    hook: "Unpopular opinion: You don't need a personal brand. You need a personal reputation.",
    content: `Unpopular opinion: You don't need a personal brand. You need a personal reputation.

Here's the difference:

Brand = what you tell people you are
Reputation = what people tell others about you

I see too many people obsessing over:
- The perfect LinkedIn banner
- Posting every single day
- Growing follower count

While ignoring:
- Delivering exceptional work
- Being reliable and kind
- Helping without expecting returns

The most successful people I know don't have 'personal brands.' They have people who vouch for them in rooms they're not in.

Build your reputation first. The brand will follow.

Am I wrong? I'd love to hear your take.`,
    content_type: "text",
    industry: "Leadership",
    engagement_level: "very_high",
    goal: "engagement",
  },
  {
    hook: "Here's my exact process for writing a LinkedIn post in 15 minutes:",
    content: `Here's my exact process for writing a LinkedIn post in 15 minutes:

Minute 1-3: Pick ONE idea
- Check my notes app for observations
- Choose something I have a strong opinion on
- Make sure I can explain it simply

Minute 3-7: Write the hook + body
- Hook: 1 sentence that creates curiosity
- Body: 3-4 short paragraphs max
- Each paragraph = 1-2 sentences only

Minute 7-10: Add the value
- What's the takeaway?
- Can the reader DO something with this?
- Add a specific example or data point

Minute 10-13: Edit ruthlessly
- Remove every word that doesn't earn its place
- Break long sentences in half
- Add line breaks for mobile readability

Minute 13-15: Write the CTA
- Ask ONE question
- Make it easy to answer
- Hit publish

That's it. No overthinking. No perfectionism.

The best post is the one you actually publish.

Save this for your next writing session.`,
    content_type: "text",
    industry: "Content Creation",
    engagement_level: "high",
    goal: "education",
  },
  {
    hook: "3 years ago I charged ₹5,000 for my services. Today I charge ₹50,000. Here's what changed (hint: not my skills):",
    content: `3 years ago I charged ₹5,000 for my services. Today I charge ₹50,000.

Here's what changed (hint: not my skills):

1. I stopped selling time, started selling outcomes
Before: "I'll work 10 hours on your project"
After: "I'll help you increase conversions by 30%"

2. I started saying no
Turned down 60% of inquiries. Only worked with clients I could deliver massive results for.

3. I built proof
Case studies. Testimonials. LinkedIn content showing my thinking.

4. I positioned differently
Before: "I'm a freelance marketer"
After: "I help B2B founders fix their messaging in 2 weeks"

5. I raised my prices and lost 0 clients
The ones who stay at higher prices are better clients anyway.

Your pricing isn't about your skills. It's about your positioning.

How did you approach pricing in your career? Share below.`,
    content_type: "text",
    industry: "Freelancing",
    engagement_level: "very_high",
    goal: "authority",
  },
  {
    hook: "The most productive people I know don't use to-do lists. They use this instead:",
    content: `The most productive people I know don't use to-do lists. They use this instead:

Time blocks.

Here's the difference:

To-do list:
- "Work on proposal" (sits on list for 3 days)
- "Reply to emails" (done for 2 hours without noticing)
- "Strategy meeting prep" (rushed 10 min before)

Time blocking:
- 9-10 AM: Deep work on proposal (no notifications)
- 10-10:30 AM: Email batch (set timer)
- 10:30-11 AM: Meeting prep (done, not perfect)

The result?

- Fewer decisions about "what to do next"
- Protected time for important (not urgent) work
- Actual boundaries between work and rest

I've been time blocking for 2 years. My output doubled. My stress halved.

The tool doesn't matter (I use Google Calendar). The principle does:

If it's not on your calendar, it doesn't exist.

What's your productivity system? Drop it below.`,
    content_type: "text",
    industry: "Productivity",
    engagement_level: "high",
    goal: "education",
  },
  {
    hook: "I asked my team to roast my leadership style. Their answers were brutal — and exactly what I needed.",
    content: `I asked my team to roast my leadership style. Their answers were brutal — and exactly what I needed.

Here's what they said:

"You say 'it's fine' when it's clearly not fine."
"You jump into solutions before we finish explaining the problem."
"Your 'quick calls' are never quick."

Ouch.

But here's the thing — anonymous feedback is a gift.

Because it tells you what people won't say to your face. And those things? They're usually the most important.

What I did with the feedback:
1. Acknowledged each point publicly with the team
2. Picked 2 things to work on (not all at once)
3. Asked them to hold me accountable monthly

3 months later:
- Team satisfaction went up
- I stopped micromanaging (mostly)
- We actually finish meetings on time now

Leadership isn't about being perfect. It's about being brave enough to ask, "How can I be better?"

When's the last time you asked your team for honest feedback?`,
    content_type: "text",
    industry: "Leadership",
    engagement_level: "very_high",
    goal: "engagement",
  },
  {
    hook: "Stop adding 'Seeking new opportunities' to your LinkedIn headline. Do this instead:",
    content: `Stop adding "Seeking new opportunities" to your LinkedIn headline. Do this instead:

Your headline is prime real estate. It's the first thing recruiters see.

"Seeking new opportunities" tells them:
- You're available (so is everyone else)
- Nothing about your value
- Nothing memorable

Instead, use this formula:

[What you do] + [Who you help] + [The result]

Examples:
- "Product Manager | Helping SaaS teams ship 2x faster"
- "Marketing Lead | Driving growth for D2C brands across India"
- "Data Analyst | Turning messy data into business decisions"

Want to go further? Add a proof point:
- "Sales Leader | Helped 3 startups cross ₹10Cr ARR"

The goal isn't to be clever. It's to be clear.

Recruiters spend 6 seconds on your profile. Make those seconds count.

Drop your current headline below — I'll give you a quick suggestion to improve it.`,
    content_type: "text",
    industry: "Career",
    engagement_level: "viral",
    goal: "education",
  },
];
