import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateHooks(
  topic: string,
  contentType: string,
  industry: string,
  tone: string
): Promise<{ hook: string; style: string }[]> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system:
      'You are a LinkedIn content strategist who specializes in writing scroll-stopping hooks. You understand that the first 2 lines of a LinkedIn post determine whether someone clicks "see more."',
    messages: [
      {
        role: "user",
        content: `Generate 3 unique LinkedIn post hooks for the following:
- Topic: ${topic}
- Content type: ${contentType}
- Industry: ${industry}
- Tone: ${tone}

Rules:
- Each hook must be under 20 words
- Each hook must create curiosity or tension
- Do NOT use clickbait — the hook must relate to real content
- Vary the structures: use a question, a bold statement, and a surprising stat/fact
- Return as JSON array: [{"hook": "...", "style": "question|statement|stat"}]
- Return ONLY the JSON array, no other text.`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return JSON.parse(text);
}

export async function analyzePost(postContent: string) {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system:
      "You are a LinkedIn content coach. You analyze LinkedIn post drafts and give specific, actionable feedback. You are supportive but honest. You never rewrite the post — you only suggest improvements.",
    messages: [
      {
        role: "user",
        content: `Analyze this LinkedIn post draft and provide feedback:

Post: """
${postContent}
"""

Provide your analysis as JSON:
{
  "overall_score": <1-10>,
  "hook_strength": {"score": <1-10>, "feedback": "specific feedback on the opening"},
  "readability": {"score": <1-10>, "feedback": "are sentences short enough? Is it scannable?"},
  "value": {"score": <1-10>, "feedback": "does this provide genuine value to the reader?"},
  "cta_strength": {"score": <1-10>, "feedback": "does it end with a clear call to action?"},
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "estimated_engagement": "low|medium|high",
  "one_line_verdict": "a single sentence summary"
}

Return ONLY the JSON object, no other text.`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return JSON.parse(text);
}

export async function generatePrompts(
  industry: string,
  contentPillars: string[],
  goal: string
) {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system:
      "You are a LinkedIn content idea generator. You create specific, actionable post ideas that a professional can write about today. Each idea should be concrete enough to start writing immediately.",
    messages: [
      {
        role: "user",
        content: `Generate 3 LinkedIn post ideas for:
- Industry: ${industry}
- Content pillars: ${contentPillars.join(", ")}
- Goal: ${goal}

Rules:
- Each idea must include: a specific angle (not just a topic), a suggested format (text/carousel/poll), and a one-line hook to get started
- Make ideas specific, not generic. "Share a leadership tip" is bad. "Share the one hiring mistake that cost you 3 months" is good.
- Return as JSON array: [{"idea": "...", "format": "text|carousel|poll", "starter_hook": "...", "why_it_works": "..."}]
- Return ONLY the JSON array, no other text.`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return JSON.parse(text);
}
