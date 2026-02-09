const questions = [
  // SALES SYSTEM MATURITY
  {
    category: "Sales System Maturity",
    categoryKey: "sales",
    question: "How do most deals close today?",
    options: [
      "Mostly through random referrals or word of mouth",
      "Founder personally closes almost every deal",
      "There's a loose process, but it's inconsistent",
      "A clear, repeatable sales system that the team follows"
    ]
  },
  {
    category: "Sales System Maturity",
    categoryKey: "sales",
    question: "How predictable is your monthly revenue?",
    options: [
      "Completely random \u2014 we never know what's coming",
      "We have a rough sense, but it swings wildly",
      "Somewhat predictable with occasional surprises",
      "Highly predictable \u2014 we forecast with confidence"
    ]
  },
  {
    category: "Sales System Maturity",
    categoryKey: "sales",
    question: "Do you actively qualify or reject leads?",
    options: [
      "We chase every lead that comes in",
      "We have a gut feel but no formal criteria",
      "We have some filters, but they're loosely followed",
      "We have a clear qualification checklist and say no fast"
    ]
  },
  {
    category: "Sales System Maturity",
    categoryKey: "sales",
    question: "How confident are sales conversations across the team?",
    options: [
      "Only the founder can handle sales conversations well",
      "One or two people can sell, but it's inconsistent",
      "The team manages okay with some founder support",
      "The team handles sales calls confidently and independently"
    ]
  },
  {
    category: "Sales System Maturity",
    categoryKey: "sales",
    question: "Is your sales process documented and repeatable?",
    options: [
      "It's entirely in the founder's head",
      "Some rough notes exist, but nobody follows them",
      "Partially documented but not consistently used",
      "Clearly documented, trained, and followed by the team"
    ]
  },

  // MARKETING CLARITY
  {
    category: "Marketing Clarity",
    categoryKey: "marketing",
    question: "How clearly defined is your ideal customer profile (ICP)?",
    options: [
      "We sell to anyone who's willing to pay",
      "We have a vague idea but nothing written down",
      "Somewhat defined but we still take random clients",
      "Very specific, documented, and strictly followed"
    ]
  },
  {
    category: "Marketing Clarity",
    categoryKey: "marketing",
    question: "What primarily drives inbound leads today?",
    options: [
      "Mostly luck, random referrals, or personal network",
      "Some social media activity but no clear strategy",
      "A few channels are working but we're not sure why",
      "Intent-driven marketing with clear lead sources"
    ]
  },
  {
    category: "Marketing Clarity",
    categoryKey: "marketing",
    question: "Is your messaging consistent across website, LinkedIn, and sales calls?",
    options: [
      "Completely different messaging everywhere",
      "Similar tone but no unified message",
      "Mostly aligned with a few gaps",
      "Same core message across every touchpoint"
    ]
  },
  {
    category: "Marketing Clarity",
    categoryKey: "marketing",
    question: "Can prospects understand what you do within 10 seconds?",
    options: [
      "People are often confused after we explain",
      "It takes a full conversation to get clarity",
      "Most people get it, but it's not instant",
      "Instantly clear \u2014 even a stranger gets it immediately"
    ]
  },
  {
    category: "Marketing Clarity",
    categoryKey: "marketing",
    question: "Do you know which marketing activities actually convert into revenue?",
    options: [
      "No tracking at all \u2014 we're guessing",
      "We track some vanity metrics (likes, followers)",
      "We have some data but can't connect it to revenue",
      "Clear tracking from lead source to closed deal"
    ]
  },

  // FOUNDER DEPENDENCY
  {
    category: "Founder Dependency",
    categoryKey: "founder",
    question: "What happens if you step away for 2 weeks?",
    options: [
      "Everything breaks \u2014 the business stops",
      "Major things stall, small things survive",
      "Most things run, but key decisions wait for me",
      "Business runs smoothly without me"
    ]
  },
  {
    category: "Founder Dependency",
    categoryKey: "founder",
    question: "Who makes critical business decisions today?",
    options: [
      "Only the founder \u2014 no exceptions",
      "Founder decides, but sometimes takes input",
      "A few people can decide on smaller things",
      "Clear ownership layers \u2014 decisions happen without the founder"
    ]
  },
  {
    category: "Founder Dependency",
    categoryKey: "founder",
    question: "Who closes important deals?",
    options: [
      "Only the founder \u2014 nobody else can",
      "Founder does most, with some team support",
      "Team handles smaller deals, founder closes big ones",
      "Sales team closes deals independently"
    ]
  },
  {
    category: "Founder Dependency",
    categoryKey: "founder",
    question: "Are key processes documented or only in your head?",
    options: [
      "Nothing is documented \u2014 it's all in my head",
      "A few things are written down but outdated",
      "Important processes are partially documented",
      "Clear SOPs exist and are actively maintained"
    ]
  },
  {
    category: "Founder Dependency",
    categoryKey: "founder",
    question: "How often are you firefighting daily issues?",
    options: [
      "Every single day \u2014 I'm the fire department",
      "Most days have at least one fire to put out",
      "Occasionally, but it's getting better",
      "Rarely \u2014 the team handles issues before they escalate"
    ]
  },

  // TEAM CAPABILITY
  {
    category: "Team Capability",
    categoryKey: "team",
    question: "How reliable is your team without constant follow-up?",
    options: [
      "Nothing moves unless I push it",
      "Some things get done, but quality drops",
      "Mostly reliable with occasional check-ins needed",
      "Highly reliable \u2014 they deliver without follow-up"
    ]
  },
  {
    category: "Team Capability",
    categoryKey: "team",
    question: "Do team members take ownership beyond assigned tasks?",
    options: [
      "Rarely \u2014 they only do what's told",
      "Sometimes, but only certain individuals",
      "Growing \u2014 more people are stepping up",
      "Consistently \u2014 the team owns outcomes, not just tasks"
    ]
  },
  {
    category: "Team Capability",
    categoryKey: "team",
    question: "Is there a leadership layer below you?",
    options: [
      "None \u2014 I manage everyone directly",
      "Informal leads but no real authority",
      "A few emerging leaders but not fully empowered",
      "Strong leadership team that runs their areas"
    ]
  },
  {
    category: "Team Capability",
    categoryKey: "team",
    question: "How is feedback handled inside the team?",
    options: [
      "Avoided \u2014 people fear confrontation",
      "Happens but gets emotional or personal",
      "Improving \u2014 some structure is forming",
      "Structured, safe, and part of the culture"
    ]
  },
  {
    category: "Team Capability",
    categoryKey: "team",
    question: "How confident are you in your hiring decisions so far?",
    options: [
      "Mostly wrong \u2014 high regret or turnover",
      "Hit or miss \u2014 no clear pattern",
      "Getting better \u2014 learning from past mistakes",
      "Consistently strong hires that fit and perform"
    ]
  }
];

const statusRanges = [
  {
    min: 0, max: 12,
    label: "Survival Mode",
    className: "survival",
    description: "The founder IS the business. No systems, no leverage. One bad week away from collapse. Immediate action needed."
  },
  {
    min: 13, max: 24,
    label: "Fragile Growth",
    className: "fragile",
    description: "Revenue is coming in, but everything depends on the founder. Growth is creating more chaos, not clarity."
  },
  {
    min: 25, max: 36,
    label: "Emerging Structure",
    className: "emerging",
    description: "Some systems are forming, but inconsistently followed. The business works \u2014 until it's tested."
  },
  {
    min: 37, max: 48,
    label: "Scaling Ready",
    className: "scaling",
    description: "Real foundations are in place. The team is growing into ownership. A few gaps remain, but momentum is strong."
  },
  {
    min: 49, max: 60,
    label: "Built to Scale",
    className: "built",
    description: "Systems run the business, not the founder. Revenue is predictable, the team is capable, and growth has structure."
  }
];

const categoryLabels = {
  sales: "Sales System Maturity",
  marketing: "Marketing Clarity",
  founder: "Founder Dependency",
  team: "Team Capability"
};

const bottleneckMessages = {
  sales: "Your revenue is unpredictable and founder-driven. Without a repeatable sales system, growth will always be a grind.",
  marketing: "Your market doesn't clearly understand who you are, what you solve, or why you're different. You're creating noise, not signal.",
  founder: "You ARE the business. Nothing moves without you, and that's the ceiling on your growth.",
  team: "You have people, not a team. Execution depends on constant follow-up, not ownership."
};

let currentQuestion = 0;
let answers = new Array(questions.length).fill(-1);

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

function startDiagnostic() {
  currentQuestion = 0;
  answers = new Array(questions.length).fill(-1);
  showScreen("question-screen");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  document.getElementById("progress-bar").style.width = progress + "%";
  document.getElementById("category-badge").textContent = q.category;
  document.getElementById("category-badge").className = "category-badge " + q.categoryKey;
  document.getElementById("question-counter").textContent = (currentQuestion + 1) + " / " + questions.length;
  document.getElementById("question-text").textContent = q.question;

  const container = document.getElementById("options-container");
  const letters = ["A", "B", "C", "D"];
  container.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option" + (answers[currentQuestion] === i ? " selected" : "");
    div.onclick = () => selectOption(i);
    div.innerHTML =
      '<div class="option-letter">' + letters[i] + '</div>' +
      '<div class="option-text">' + opt + '</div>';
    container.appendChild(div);
  });

  const prevBtn = document.getElementById("prev-btn");
  prevBtn.style.visibility = currentQuestion === 0 ? "hidden" : "visible";

  const nextBtn = document.getElementById("next-btn");
  nextBtn.disabled = answers[currentQuestion] === -1;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "See Results" : "Next";
}

function selectOption(index) {
  answers[currentQuestion] = index;
  renderQuestion();
}

function nextQuestion() {
  if (answers[currentQuestion] === -1) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function calculateScores() {
  const categoryScores = { sales: 0, marketing: 0, founder: 0, team: 0 };

  questions.forEach((q, i) => {
    if (answers[i] >= 0) {
      categoryScores[q.categoryKey] += answers[i];
    }
  });

  const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);
  return { categoryScores, totalScore };
}

function getStatus(totalScore) {
  for (const range of statusRanges) {
    if (totalScore >= range.min && totalScore <= range.max) {
      return range;
    }
  }
  return statusRanges[0];
}

function getCategoryHealth(score) {
  if (score <= 5) return { label: "Red Flag", barClass: "red" };
  if (score <= 10) return { label: "Needs Attention", barClass: "orange" };
  return { label: "Healthy", barClass: "green" };
}

function getBottlenecks(categoryScores) {
  const sorted = Object.entries(categoryScores)
    .map(([key, score]) => ({ key, score, name: categoryLabels[key] }))
    .sort((a, b) => a.score - b.score);

  return sorted.slice(0, 3);
}

function animateScore(target) {
  const el = document.getElementById("score-number");
  let current = 0;
  const duration = 1200;
  const stepTime = duration / target;

  const timer = setInterval(() => {
    current++;
    el.textContent = current;
    if (current >= target) {
      clearInterval(timer);
    }
  }, stepTime);
}

function showResults() {
  showScreen("results-screen");

  const { categoryScores, totalScore } = calculateScores();
  const status = getStatus(totalScore);

  // Score circle
  const scoreCircle = document.getElementById("score-circle");
  scoreCircle.className = "score-circle " + status.className;
  animateScore(totalScore);

  // Status badge
  const statusBadge = document.getElementById("status-badge");
  statusBadge.textContent = status.label;
  statusBadge.className = "status-badge " + status.className;

  // Status description
  document.getElementById("status-description").textContent = status.description;

  // Category scores
  const categoryContainer = document.getElementById("category-scores");
  categoryContainer.innerHTML = "";

  Object.entries(categoryScores).forEach(([key, score]) => {
    const health = getCategoryHealth(score);
    const percentage = (score / 15) * 100;

    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML =
      '<div class="category-card-header">' +
        '<span class="category-card-name">' + categoryLabels[key] + '</span>' +
        '<span class="category-card-score">' + score + ' / 15</span>' +
      '</div>' +
      '<div class="category-bar-bg">' +
        '<div class="category-bar-fill ' + health.barClass + '" style="width: 0%"></div>' +
      '</div>' +
      '<div class="category-card-label">' + health.label + '</div>';

    categoryContainer.appendChild(card);

    setTimeout(() => {
      card.querySelector(".category-bar-fill").style.width = percentage + "%";
    }, 300);
  });

  // Bottlenecks
  const bottlenecks = getBottlenecks(categoryScores);
  const bottlenecksList = document.getElementById("bottlenecks-list");
  bottlenecksList.innerHTML = "";

  bottlenecks.forEach((b, i) => {
    const item = document.createElement("div");
    item.className = "bottleneck-item";
    item.innerHTML =
      '<div class="bottleneck-rank">#' + (i + 1) + '</div>' +
      '<div class="bottleneck-info">' +
        '<h3>' + b.name + ' <span style="color: var(--accent-red); font-size: 0.85rem;">(' + b.score + '/15)</span></h3>' +
        '<p>' + bottleneckMessages[b.key] + '</p>' +
      '</div>';
    bottlenecksList.appendChild(item);
  });
}

function restartDiagnostic() {
  currentQuestion = 0;
  answers = new Array(questions.length).fill(-1);
  showScreen("landing");
}
