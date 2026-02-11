// ==================== Culture Nickname Suggestions Engine ====================
// Deterministic, keyword-based suggestion engine for Culture Intelligence Console.
// Generates Praise Titles and Coaching Notes per member based on repeated task patterns.
//
// Assumptions:
// - Threshold: keyword must appear 3+ times in 90-day window (configurable)
// - Uses task titles/descriptions, flag reasons, and categories
// - Confidence: High (5+), Med (4), Low (3)
// - Admin-only by default (no role system yet; controlled by a config flag)
// ============================================================================

var SUGGESTIONS_CONFIG = {
  minThreshold: 3,      // Minimum keyword hits to trigger a suggestion
  windowDays: 90,       // Rolling window in days
  topN: 5,              // Max suggestions to show
  enabled: true         // Toggle for admin-only visibility
};

// ---- Praise Title templates (keyword-based) ----
var PRAISE_TITLES = {
  demo: ["Demo King", "Demo Queen", "Presentation Pro"],
  client: ["Client Whisperer", "Client Champion", "Client Relations Pro"],
  presentation: ["Presentation Pro", "Slide Master", "Stage Commander"],
  design: ["Design Visionary", "Creative Lead", "Design Maestro"],
  code: ["Code Architect", "Engineering Ace", "Code Craftsman"],
  frontend: ["Frontend Wizard", "UI Champion", "Interface Artist"],
  backend: ["Backend Hero", "API Architect", "System Builder"],
  testing: ["Quality Guardian", "Testing Champion", "QA Hero"],
  review: ["Review Master", "Quality Gatekeeper", "Code Reviewer Pro"],
  deploy: ["Deployment Pro", "Release Champion", "Ship Captain"],
  documentation: ["Documentation Hero", "Knowledge Keeper", "Docs Champion"],
  support: ["Support Hero", "People Champion", "Team Anchor"],
  vendor: ["Vendor Relations Pro", "Partnership Builder", "External Liaison"],
  onboarding: ["Onboarding Guide", "Culture Ambassador", "Welcome Champion"],
  culture: ["Culture Champion", "Culture Queen", "Culture Ambassador"],
  leadership: ["Leadership Star", "Team Catalyst", "Mentorship Champion"],
  mentoring: ["Mentorship Champion", "Growth Enabler", "Team Builder"],
  collaboration: ["Collaboration Champion", "Cross-Team Connector", "Team Player"],
  planning: ["Strategic Planner", "Planning Pro", "Roadmap Architect"],
  deadline: ["Delivery Champion", "On-Time Hero", "Schedule Master"],
  bug: ["Bug Hunter", "Debugging Pro", "Issue Resolver"],
  fix: ["Fix-It Hero", "Issue Resolver", "Problem Solver"],
  research: ["Research Pioneer", "Discovery Lead", "Insights Champion"],
  analytics: ["Analytics Pro", "Data Champion", "Insights Builder"],
  marketing: ["Marketing Maven", "Brand Builder", "Growth Hacker"],
  sales: ["Sales Champion", "Deal Closer", "Revenue Driver"],
  communication: ["Communication Pro", "Clear Communicator", "Messaging Champion"],
  process: ["Process Optimizer", "Workflow Champion", "Efficiency Expert"],
  automation: ["Automation Pro", "Workflow Wizard", "Efficiency Expert"],
  security: ["Security Guardian", "Safety Champion", "Trust Builder"],
  performance: ["Performance Optimizer", "Speed Champion", "Efficiency Expert"],
  training: ["Training Champion", "Knowledge Sharer", "Learning Enabler"],
  report: ["Report Builder", "Analytics Pro", "Insights Champion"]
};

// ---- Coaching Note templates (keyword-based, for repeated red signals) ----
var COACHING_TEMPLATES = {
  demo: "Needs mentorship in demo delivery",
  client: "Needs support in client communication",
  presentation: "Needs coaching on presentation skills",
  design: "Needs support in design quality",
  code: "Needs mentorship in code quality",
  frontend: "Needs support with frontend work",
  backend: "Needs support with backend tasks",
  testing: "Needs coaching on testing practices",
  review: "Needs support in review process",
  deploy: "Needs support in deployment workflow",
  documentation: "Needs coaching on documentation",
  vendor: "Needs support in vendor arrangement",
  deadline: "Needs support meeting deadlines",
  bug: "Needs mentorship in debugging",
  planning: "Needs coaching on task planning",
  communication: "Needs support in communication clarity",
  process: "Needs coaching on process adherence",
  quality: "Needs mentorship in work quality",
  sop: "Needs coaching on SOP adherence",
  management: "Needs support in task management",
  skill: "Needs skill development support",
  domain: "Needs domain knowledge mentorship",
  emotion: "Needs emotional intelligence coaching",
  people: "Needs support in people management"
};

// ==================== Core Engine ====================

function generateCultureSuggestions() {
  if (!SUGGESTIONS_CONFIG.enabled) return [];

  var now = new Date();
  var windowStart = new Date(now.getTime() - SUGGESTIONS_CONFIG.windowDays * 24 * 60 * 60 * 1000);

  var allSuggestions = [];

  data.members.forEach(function(member) {
    var memberSuggestions = analyzeMemberKeywords(member, windowStart, now);
    allSuggestions = allSuggestions.concat(memberSuggestions);
  });

  // Sort by confidence (High first), then by count
  allSuggestions.sort(function(a, b) {
    var confOrder = { High: 0, Med: 1, Low: 2 };
    if (confOrder[a.confidence] !== confOrder[b.confidence]) {
      return confOrder[a.confidence] - confOrder[b.confidence];
    }
    return b.count - a.count;
  });

  return allSuggestions.slice(0, SUGGESTIONS_CONFIG.topN * 2); // Store more, display top N
}

function analyzeMemberKeywords(member, windowStart, now) {
  var memberId = member.id;
  var suggestions = [];

  // Collect green keyword hits from completed tasks and flags
  var greenKeywords = {};
  var redKeywords = {};

  // Scan tasks assigned to this member within window
  data.tasks.forEach(function(task) {
    if (task.assigneeId !== memberId) return;
    var taskDate = new Date(task.createdAt);
    if (taskDate < windowStart) return;

    var keywords = extractKeywords((task.title || "") + " " + (task.description || ""));

    // Check if task has green flags (good completion)
    var taskGreenFlags = data.flags.filter(function(f) {
      return f.taskId === task.id && f.color === "green";
    });
    var taskRedFlags = data.flags.filter(function(f) {
      return f.taskId === task.id && f.color === "red";
    });

    if (taskGreenFlags.length > 0) {
      keywords.forEach(function(kw) {
        greenKeywords[kw] = (greenKeywords[kw] || 0) + taskGreenFlags.reduce(function(s, f) { return s + f.count; }, 0);
      });
    }

    if (taskRedFlags.length > 0) {
      keywords.forEach(function(kw) {
        redKeywords[kw] = (redKeywords[kw] || 0) + taskRedFlags.reduce(function(s, f) { return s + f.count; }, 0);
      });
    }
  });

  // Also scan flags directly (non-task flags like extraordinary, blunder, leadership)
  data.flags.forEach(function(f) {
    if (f.memberId !== memberId) return;
    var flagDate = new Date(f.createdAt);
    if (flagDate < windowStart) return;

    var flagKw = extractKeywords((f.reason || "") + " " + (f.note || ""));

    // Also include category as a keyword
    if (f.category) {
      var catLabel = getCategoryLabel(f.category).toLowerCase();
      if (catLabel) flagKw.push(catLabel);
    }

    if (f.color === "green") {
      flagKw.forEach(function(kw) {
        greenKeywords[kw] = (greenKeywords[kw] || 0) + f.count;
      });
    } else if (f.color === "red") {
      flagKw.forEach(function(kw) {
        redKeywords[kw] = (redKeywords[kw] || 0) + f.count;
      });
    }
  });

  // Generate Praise Titles from green keywords
  Object.keys(greenKeywords).forEach(function(kw) {
    var count = greenKeywords[kw];
    if (count < SUGGESTIONS_CONFIG.minThreshold) return;

    var matchedTitle = findPraiseTitle(kw);
    if (!matchedTitle) return;

    var confidence = count >= 5 ? "High" : (count >= 4 ? "Med" : "Low");

    suggestions.push({
      memberId: memberId,
      memberName: member.name,
      type: "praise",
      title: matchedTitle,
      keyword: kw,
      count: count,
      confidence: confidence,
      text: member.name + " is a " + matchedTitle
    });
  });

  // Generate Coaching Notes from red keywords
  Object.keys(redKeywords).forEach(function(kw) {
    var count = redKeywords[kw];
    if (count < SUGGESTIONS_CONFIG.minThreshold) return;

    var coachingNote = findCoachingNote(kw);
    if (!coachingNote) return;

    var confidence = count >= 5 ? "High" : (count >= 4 ? "Med" : "Low");

    suggestions.push({
      memberId: memberId,
      memberName: member.name,
      type: "coaching",
      title: coachingNote,
      keyword: kw,
      count: count,
      confidence: confidence,
      text: member.name + " " + coachingNote.toLowerCase()
    });
  });

  // Deduplicate: keep highest-count per type per member
  var seen = {};
  var deduped = [];
  suggestions.forEach(function(s) {
    var key = s.memberId + "|" + s.type + "|" + s.title;
    if (!seen[key] || seen[key].count < s.count) {
      seen[key] = s;
    }
  });
  Object.keys(seen).forEach(function(k) { deduped.push(seen[k]); });

  return deduped;
}

function findPraiseTitle(keyword) {
  // Direct match
  if (PRAISE_TITLES[keyword]) {
    var titles = PRAISE_TITLES[keyword];
    return titles[0]; // Use first (primary) title
  }
  // Partial match
  var keys = Object.keys(PRAISE_TITLES);
  for (var i = 0; i < keys.length; i++) {
    if (keyword.indexOf(keys[i]) !== -1 || keys[i].indexOf(keyword) !== -1) {
      return PRAISE_TITLES[keys[i]][0];
    }
  }
  return null;
}

function findCoachingNote(keyword) {
  // Direct match
  if (COACHING_TEMPLATES[keyword]) {
    return COACHING_TEMPLATES[keyword];
  }
  // Partial match
  var keys = Object.keys(COACHING_TEMPLATES);
  for (var i = 0; i < keys.length; i++) {
    if (keyword.indexOf(keys[i]) !== -1 || keys[i].indexOf(keyword) !== -1) {
      return COACHING_TEMPLATES[keys[i]];
    }
  }
  return null;
}

// ==================== Get suggestions for a specific member ====================

function getMemberSuggestions(memberId) {
  var all = generateCultureSuggestions();
  return all.filter(function(s) { return s.memberId === memberId; });
}

// ==================== Dashboard Rendering ====================

function renderCultureSuggestions() {
  var container = document.getElementById("dashboard-suggestions");
  if (!container) return;

  var suggestions = generateCultureSuggestions();

  if (suggestions.length === 0) {
    container.innerHTML = '<div class="empty-state-sm">Not enough signal data yet. Suggestions appear when keyword patterns emerge (3+ occurrences in 90 days).</div>';
    return;
  }

  // Show top N
  var topSuggestions = suggestions.slice(0, SUGGESTIONS_CONFIG.topN);

  var html = '';
  topSuggestions.forEach(function(s, idx) {
    var isPraise = s.type === "praise";
    var confClass = s.confidence === "High" ? "sug-conf-high" : (s.confidence === "Med" ? "sug-conf-med" : "sug-conf-low");
    var typeClass = isPraise ? "sug-praise" : "sug-coaching";
    var typeIcon = isPraise
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>'
      : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    var shimmerClass = (isPraise && s.confidence === "High" && idx === 0) ? " sug-shimmer" : "";

    html += '<div class="sug-card ' + typeClass + shimmerClass + '">' +
      '<div class="sug-icon">' + typeIcon + '</div>' +
      '<div class="sug-body">' +
        '<div class="sug-title">' + escapeHtml(s.title) + '</div>' +
        '<div class="sug-text">' + escapeHtml(s.text) + '</div>' +
        '<div class="sug-meta">' +
          '<span class="sug-conf ' + confClass + '">' + s.confidence + '</span>' +
          '<span class="sug-keyword">' + escapeHtml(s.keyword) + '</span>' +
          '<span class="sug-count">' + s.count + ' signals</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  });

  container.innerHTML = html;
}

// ==================== Member Detail Suggestions ====================

function renderMemberSuggestionsBadge(memberId) {
  var suggestions = getMemberSuggestions(memberId);
  if (suggestions.length === 0) return '';

  var html = '<div class="member-suggestions">';
  suggestions.forEach(function(s) {
    var isPraise = s.type === "praise";
    var cls = isPraise ? "msug-praise" : "msug-coaching";
    var confCls = s.confidence === "High" ? "msug-conf-high" : (s.confidence === "Med" ? "msug-conf-med" : "msug-conf-low");
    html += '<span class="msug-badge ' + cls + ' ' + confCls + '">' +
      (isPraise ? '&#9733; ' : '&#9829; ') +
      escapeHtml(s.title) +
    '</span>';
  });
  html += '</div>';
  return html;
}
