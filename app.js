const questions = [
  // SECTION 1: DEMAND QUALITY (MARKETING INPUT)
  {
    category: "Demand Quality",
    categoryKey: "demand",
    question: "Where do most of your leads come from?",
    options: [
      "Random / referrals / luck",
      "Founder network",
      "Some inbound channels",
      "Clear, intent-based sources"
    ]
  },
  {
    category: "Demand Quality",
    categoryKey: "demand",
    question: "How relevant are incoming leads?",
    options: [
      "Mostly poor fit",
      "Mixed quality",
      "Mostly relevant",
      "Highly qualified & targeted"
    ]
  },
  {
    category: "Demand Quality",
    categoryKey: "demand",
    question: "Do leads understand why they contacted you?",
    options: [
      "Often confused",
      "Need explanation",
      "Mostly aware",
      "Very clear problem awareness"
    ]
  },
  {
    category: "Demand Quality",
    categoryKey: "demand",
    question: "How consistent is lead flow?",
    options: [
      "Completely random",
      "Spikes occasionally",
      "Somewhat steady",
      "Predictable inflow"
    ]
  },
  {
    category: "Demand Quality",
    categoryKey: "demand",
    question: "Do you intentionally attract or passively receive leads?",
    options: [
      "Passive only",
      "Some effort",
      "Planned activities",
      "Clear demand strategy"
    ]
  },

  // SECTION 2: MESSAGE & POSITIONING CLARITY
  {
    category: "Message & Positioning Clarity",
    categoryKey: "message",
    question: "Can prospects explain what you do in one sentence?",
    options: [
      "No",
      "After explanation",
      "Mostly yes",
      "Instantly yes"
    ]
  },
  {
    category: "Message & Positioning Clarity",
    categoryKey: "message",
    question: "How consistent is your message across channels?",
    options: [
      "Different everywhere",
      "Slightly aligned",
      "Mostly aligned",
      "Fully consistent"
    ]
  },
  {
    category: "Message & Positioning Clarity",
    categoryKey: "message",
    question: "Do you sell outcomes or services?",
    options: [
      "Services only",
      "Mix of both",
      "Outcome-led sometimes",
      "Outcome-led always"
    ]
  },
  {
    category: "Message & Positioning Clarity",
    categoryKey: "message",
    question: "Do prospects compare you mainly on price?",
    options: [
      "Always",
      "Often",
      "Sometimes",
      "Rarely"
    ]
  },
  {
    category: "Message & Positioning Clarity",
    categoryKey: "message",
    question: "Is your differentiation clear?",
    options: [
      "No clear difference",
      "Generic difference",
      "Somewhat clear",
      "Very distinct"
    ]
  },

  // SECTION 3: SALES PROCESS & CONVERSION
  {
    category: "Sales Process & Conversion",
    categoryKey: "sales",
    question: "Is there a defined sales process?",
    options: [
      "Completely ad-hoc",
      "Founder-driven",
      "Some structure",
      "Documented & repeatable"
    ]
  },
  {
    category: "Sales Process & Conversion",
    categoryKey: "sales",
    question: "How are discovery calls handled?",
    options: [
      "Unstructured chats",
      "Founder intuition",
      "Semi-structured",
      "Clear discovery framework"
    ]
  },
  {
    category: "Sales Process & Conversion",
    categoryKey: "sales",
    question: "Do you qualify or reject leads?",
    options: [
      "Almost never",
      "Gut-based",
      "Basic checklist",
      "Strict qualification"
    ]
  },
  {
    category: "Sales Process & Conversion",
    categoryKey: "sales",
    question: "How strong is your proposal clarity?",
    options: [
      "Confusing / long",
      "Depends on client",
      "Mostly clear",
      "Very crisp & outcome-led"
    ]
  },
  {
    category: "Sales Process & Conversion",
    categoryKey: "sales",
    question: "How confident is your close rate?",
    options: [
      "Very low / random",
      "Inconsistent",
      "Reasonably stable",
      "Highly predictable"
    ]
  },

  // SECTION 4: REVENUE PREDICTABILITY
  {
    category: "Revenue Predictability",
    categoryKey: "revenue",
    question: "Can you forecast revenue 2\u20133 months ahead?",
    options: [
      "No idea",
      "Rough guess",
      "Approximate forecast",
      "Clear forecast"
    ]
  },
  {
    category: "Revenue Predictability",
    categoryKey: "revenue",
    question: "How dependent is revenue on the founder?",
    options: [
      "Completely dependent",
      "Mostly dependent",
      "Partially dependent",
      "Largely independent"
    ]
  },
  {
    category: "Revenue Predictability",
    categoryKey: "revenue",
    question: "Do you know your conversion metrics?",
    options: [
      "No tracking",
      "Gut feeling",
      "Some numbers",
      "Clear metrics"
    ]
  },
  {
    category: "Revenue Predictability",
    categoryKey: "revenue",
    question: "How stable are your deal sizes?",
    options: [
      "Very inconsistent",
      "Mostly small deals",
      "Some consistency",
      "Very consistent"
    ]
  },
  {
    category: "Revenue Predictability",
    categoryKey: "revenue",
    question: "How calm do you feel about next quarter revenue?",
    options: [
      "Very anxious",
      "Unsure",
      "Mostly confident",
      "Very confident"
    ]
  }
];

const statusRanges = [
  {
    min: 0, max: 25,
    label: "Sales & Marketing is Broken",
    className: "broken",
    description: "Revenue is unpredictable and your sales and marketing systems are not functioning. Immediate, focused intervention is needed before anything else."
  },
  {
    min: 26, max: 45,
    label: "Works but Unreliable",
    className: "unreliable",
    description: "Some things are working, but nothing is consistent enough to scale. Revenue comes in, but you can\u2019t predict or repeat it reliably."
  },
  {
    min: 46, max: 60,
    label: "Scalable & Predictable",
    className: "scalable",
    description: "Your sales and marketing engine has real structure. Revenue is predictable, messaging is clear, and growth has a repeatable foundation."
  }
];

const categoryLabels = {
  demand: "Demand Quality",
  message: "Message & Positioning Clarity",
  sales: "Sales Process & Conversion",
  revenue: "Revenue Predictability"
};

const categorySubtitles = {
  demand: "Are the right leads coming in?",
  message: "Do prospects get it instantly?",
  sales: "What happens after a lead comes in?",
  revenue: "Is growth calm or chaotic?"
};

const recommendations = {
  demand: {
    red: "Your marketing attracts attention, not intent. Focus on attracting problem-aware buyers before increasing volume.",
    yellow: "Lead flow is happening but inconsistent. Define your ideal lead sources and double down on what\u2019s already working.",
    green: "Demand generation is healthy. Keep optimizing your best-performing channels and monitor lead quality metrics."
  },
  message: {
    red: "Your offering is not clearly understood. Until messaging is outcome-led, conversion will stay low.",
    yellow: "Your message partly lands, but lacks consistency. Align all channels around one clear, outcome-driven promise.",
    green: "Messaging is clear and differentiated. Continue refining based on prospect feedback and competitive shifts."
  },
  sales: {
    red: "Revenue is unstable because sales is intuition-driven. Build a repeatable discovery and qualification process.",
    yellow: "There\u2019s some structure, but it\u2019s not consistently followed. Document your best sales conversations and standardize them.",
    green: "Sales process is solid and repeatable. Focus on improving conversion rates and coaching the team on edge cases."
  },
  revenue: {
    red: "Growth feels stressful because revenue depends on individuals, not systems.",
    yellow: "You have some visibility into revenue, but not enough to plan confidently. Start tracking conversion metrics weekly.",
    green: "Revenue is predictable and founder-independent. Maintain your forecasting discipline and look for expansion opportunities."
  }
};

const bottleneckMessages = {
  demand: "Your marketing attracts attention, not intent. Focus on attracting problem-aware buyers before increasing volume.",
  message: "Your offering is not clearly understood. Until messaging is outcome-led, conversion will stay low.",
  sales: "Revenue is unstable because sales is intuition-driven. Build a repeatable discovery and qualification process.",
  revenue: "Growth feels stressful because revenue depends on individuals, not systems."
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
  const categoryScores = { demand: 0, message: 0, sales: 0, revenue: 0 };

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

function getSectionStatus(score) {
  if (score <= 6) return { label: "Critical", color: "red", indicator: "\u{1F534}" };
  if (score <= 11) return { label: "Unstable", color: "yellow", indicator: "\u{1F7E1}" };
  return { label: "Healthy", color: "green", indicator: "\u{1F7E2}" };
}

function getBottlenecks(categoryScores) {
  const sorted = Object.entries(categoryScores)
    .map(([key, score]) => ({ key, score, name: categoryLabels[key] }))
    .sort((a, b) => a.score - b.score);

  return sorted.slice(0, 3);
}

function animateScore(target) {
  const el = document.getElementById("score-number");
  if (target === 0) {
    el.textContent = "0";
    return;
  }
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

function getSectionRecommendation(key, score) {
  const status = getSectionStatus(score);
  return recommendations[key][status.color];
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

  // Section A: Scorecard
  const scorecardContainer = document.getElementById("scorecard-body");
  scorecardContainer.innerHTML = "";

  Object.entries(categoryScores).forEach(([key, score]) => {
    const sectionStatus = getSectionStatus(score);
    const percentage = (score / 15) * 100;

    const row = document.createElement("div");
    row.className = "scorecard-row";
    row.innerHTML =
      '<div class="scorecard-section">' +
        '<span class="scorecard-name">' + categoryLabels[key] + '</span>' +
        '<span class="scorecard-subtitle">' + categorySubtitles[key] + '</span>' +
      '</div>' +
      '<div class="scorecard-score">' + score + ' / 15</div>' +
      '<div class="scorecard-bar-container">' +
        '<div class="scorecard-bar-bg">' +
          '<div class="scorecard-bar-fill ' + sectionStatus.color + '" style="width: 0%"></div>' +
        '</div>' +
      '</div>' +
      '<div class="scorecard-status ' + sectionStatus.color + '">' + sectionStatus.label + '</div>';

    scorecardContainer.appendChild(row);

    setTimeout(() => {
      row.querySelector(".scorecard-bar-fill").style.width = percentage + "%";
    }, 300);
  });

  // Section B: Top 3 Bottlenecks
  const bottlenecks = getBottlenecks(categoryScores);
  const bottlenecksList = document.getElementById("bottlenecks-list");
  bottlenecksList.innerHTML = "";

  bottlenecks.forEach((b, i) => {
    const sectionStatus = getSectionStatus(b.score);
    const item = document.createElement("div");
    item.className = "bottleneck-item";
    item.innerHTML =
      '<div class="bottleneck-rank">#' + (i + 1) + '</div>' +
      '<div class="bottleneck-info">' +
        '<h3>' + b.name +
          ' <span class="bottleneck-score ' + sectionStatus.color + '">' + b.score + '/15 \u2014 ' + sectionStatus.label + '</span>' +
        '</h3>' +
        '<p>' + bottleneckMessages[b.key] + '</p>' +
      '</div>';
    bottlenecksList.appendChild(item);
  });

  // Section C: What to Fix First
  const fixFirstContainer = document.getElementById("fix-first-content");
  const lowestSection = bottlenecks[0];
  const lowestStatus = getSectionStatus(lowestSection.score);
  fixFirstContainer.innerHTML =
    '<div class="fix-first-highlight">' +
      '<div class="fix-first-label">Your #1 priority</div>' +
      '<div class="fix-first-section">' + lowestSection.name + '</div>' +
      '<div class="fix-first-score ' + lowestStatus.color + '">' + lowestSection.score + '/15 \u2014 ' + lowestStatus.label + '</div>' +
    '</div>' +
    '<p class="fix-first-recommendation">' + getSectionRecommendation(lowestSection.key, lowestSection.score) + '</p>' +
    '<div class="fix-first-principle">' +
      '<strong>Remember:</strong> Fix the lowest score first. More leads will not fix broken conversion.' +
    '</div>';

  // Section D: All Recommendations
  const recsContainer = document.getElementById("recommendations-list");
  recsContainer.innerHTML = "";

  Object.entries(categoryScores).forEach(([key, score]) => {
    const sectionStatus = getSectionStatus(score);
    const rec = document.createElement("div");
    rec.className = "recommendation-item";
    rec.innerHTML =
      '<div class="recommendation-header">' +
        '<span class="recommendation-name">' + categoryLabels[key] + '</span>' +
        '<span class="recommendation-status ' + sectionStatus.color + '">' + sectionStatus.label + '</span>' +
      '</div>' +
      '<p class="recommendation-text">' + getSectionRecommendation(key, score) + '</p>';
    recsContainer.appendChild(rec);
  });
}

function restartDiagnostic() {
  currentQuestion = 0;
  answers = new Array(questions.length).fill(-1);
  showScreen("landing");
}
