// ==================== SVG Icon Helpers ====================

var icons = {
  arrowUp: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  arrowDown: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
  minus: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  dot: '<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3.5" fill="currentColor"/></svg>',
  crown: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-5 4-5-4-5 4-1 0z"/><path d="M5 16h14v2H5z"/></svg>',
  heart: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  refresh: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
  alert: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  shuffle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>'
};

// ==================== Data Store ====================

function loadData() {
  return {
    members: JSON.parse(localStorage.getItem("boss_members") || "[]"),
    tasks: JSON.parse(localStorage.getItem("boss_tasks") || "[]"),
    roles: JSON.parse(localStorage.getItem("boss_roles") || "[]"),
    flags: JSON.parse(localStorage.getItem("boss_flags") || "[]"),
    categories: JSON.parse(localStorage.getItem("boss_categories") || "null"),
    notes: JSON.parse(localStorage.getItem("boss_notes") || "[]"),
    autoRules: JSON.parse(localStorage.getItem("boss_autorules") || "[]")
  };
}

var defaultCategories = [
  { id: "cat_people", name: "People" },
  { id: "cat_sop", name: "SOP" },
  { id: "cat_emotion", name: "Emotion" },
  { id: "cat_skill", name: "Skill" },
  { id: "cat_domain", name: "Domain" },
  { id: "cat_management", name: "Management" },
  { id: "cat_other", name: "Other" }
];

function saveData(data) {
  localStorage.setItem("boss_members", JSON.stringify(data.members));
  localStorage.setItem("boss_tasks", JSON.stringify(data.tasks));
  localStorage.setItem("boss_roles", JSON.stringify(data.roles));
  localStorage.setItem("boss_flags", JSON.stringify(data.flags));
  localStorage.setItem("boss_categories", JSON.stringify(data.categories));
  localStorage.setItem("boss_notes", JSON.stringify(data.notes || []));
  localStorage.setItem("boss_autorules", JSON.stringify(data.autoRules || []));
}

var data = loadData();
if (!data.categories) {
  data.categories = defaultCategories.slice();
  saveData(data);
}
var currentFilter = "all";
var pendingDeleteType = null;
var pendingDeleteId = null;
var pendingReviewTaskId = null;
var pendingBlunderTaskId = null;
var pendingExtraordinaryTaskId = null;

// ==================== Date Range Filter ====================

var dateRangePreset = "all";
var dateRangeFrom = "";
var dateRangeTo = "";

function getDateRangeBounds() {
  if (dateRangePreset === "custom") {
    return { from: dateRangeFrom || null, to: dateRangeTo || null };
  }
  if (dateRangePreset === "all") {
    return { from: null, to: null };
  }

  var today = new Date();
  today.setHours(23, 59, 59, 999);
  var from = new Date();
  from.setHours(0, 0, 0, 0);

  if (dateRangePreset === "today") {
    // from is already today start
  } else if (dateRangePreset === "week") {
    from.setDate(from.getDate() - 7);
  } else if (dateRangePreset === "month") {
    from.setMonth(from.getMonth() - 1);
  } else if (dateRangePreset === "year") {
    from.setFullYear(from.getFullYear() - 1);
  }

  var yf = from.getFullYear();
  var mf = String(from.getMonth() + 1).padStart(2, "0");
  var df = String(from.getDate()).padStart(2, "0");
  var yt = today.getFullYear();
  var mt = String(today.getMonth() + 1).padStart(2, "0");
  var dt = String(today.getDate()).padStart(2, "0");

  return { from: yf + "-" + mf + "-" + df, to: yt + "-" + mt + "-" + dt };
}

function isDateInRange(dateStr) {
  if (!dateStr) return true;
  var bounds = getDateRangeBounds();
  if (!bounds.from && !bounds.to) return true;
  if (bounds.from && dateStr < bounds.from) return false;
  if (bounds.to && dateStr > bounds.to) return false;
  return true;
}

function isTaskInDateRange(task) {
  var bounds = getDateRangeBounds();
  if (!bounds.from && !bounds.to) return true;
  // Match by due date OR creation date
  var dueMatch = task.dueDate ? isDateInRange(task.dueDate) : false;
  var createdDate = task.createdAt ? task.createdAt.substring(0, 10) : "";
  var createMatch = createdDate ? isDateInRange(createdDate) : false;
  // If no due date, use creation date; otherwise use due date
  return task.dueDate ? dueMatch : createMatch;
}

function isFlagInDateRange(flag) {
  var bounds = getDateRangeBounds();
  if (!bounds.from && !bounds.to) return true;
  var flagDate = flag.createdAt ? flag.createdAt.substring(0, 10) : "";
  return isDateInRange(flagDate);
}

var presetLabels = { today: "Today", week: "Last Week", month: "Last Month", year: "Last Year", all: "All Time", custom: "Custom" };

function updateDateLabel() {
  var label = presetLabels[dateRangePreset] || "All Time";
  if (dateRangePreset === "custom" && dateRangeFrom && dateRangeTo) {
    label = dateRangeFrom + " — " + dateRangeTo;
  }
  document.querySelectorAll(".dr-icon-label").forEach(function(el) { el.textContent = label; });
}

function toggleDateDropdown(btn) {
  var wrap = btn.closest(".dr-icon-wrap");
  var dd = wrap.querySelector(".dr-dropdown");
  var isOpen = dd.classList.contains("open");
  // Close all dropdowns first
  document.querySelectorAll(".dr-dropdown").forEach(function(d) { d.classList.remove("open"); });
  if (!isOpen) dd.classList.add("open");
}

function setDatePreset(preset) {
  dateRangePreset = preset;
  // Update button active states
  document.querySelectorAll(".dr-preset-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.getAttribute("data-preset") === preset);
  });
  // Show/hide custom inputs
  document.querySelectorAll(".dr-custom-inputs").forEach(function(el) {
    el.style.display = preset === "custom" ? "flex" : "none";
  });
  if (preset !== "custom") {
    dateRangeFrom = "";
    dateRangeTo = "";
    document.querySelectorAll(".dr-from").forEach(function(el) { el.value = ""; });
    document.querySelectorAll(".dr-to").forEach(function(el) { el.value = ""; });
    // Close dropdown when a non-custom preset is picked
    document.querySelectorAll(".dr-dropdown").forEach(function(d) { d.classList.remove("open"); });
  }
  updateDateLabel();
  refreshAll();
}

function setCustomDateFrom(val) {
  dateRangeFrom = val;
  dateRangePreset = "custom";
  document.querySelectorAll(".dr-preset-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.getAttribute("data-preset") === "custom");
  });
  document.querySelectorAll(".dr-custom-inputs").forEach(function(el) {
    el.style.display = "flex";
  });
  document.querySelectorAll(".dr-from").forEach(function(el) { el.value = val; });
  updateDateLabel();
  refreshAll();
}

function setCustomDateTo(val) {
  dateRangeTo = val;
  dateRangePreset = "custom";
  document.querySelectorAll(".dr-preset-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.getAttribute("data-preset") === "custom");
  });
  document.querySelectorAll(".dr-custom-inputs").forEach(function(el) {
    el.style.display = "flex";
  });
  document.querySelectorAll(".dr-to").forEach(function(el) { el.value = val; });
  updateDateLabel();
  refreshAll();
}

// Filtered data getters that respect date range
function getFilteredFlags() {
  return data.flags.filter(function(f) { return isFlagInDateRange(f); });
}

function getFilteredTasks() {
  return data.tasks.filter(function(t) { return isTaskInDateRange(t); });
}

function getMemberFlagsFiltered(memberId) {
  var red = 0;
  var green = 0;
  getFilteredFlags().forEach(function(f) {
    if (f.memberId === memberId) {
      if (f.color === "red") red += f.count;
      else if (f.color === "green") green += f.count;
    }
  });
  return { red: red, green: green };
}

function getMemberZoneFiltered(memberId) {
  var f = getMemberFlagsFiltered(memberId);
  var net = f.green - f.red;
  if (net > 0) return "green";
  if (net < 0) return "red";
  return "yellow";
}

// ==================== Navigation ====================

function switchView(viewName) {
  document.querySelectorAll(".view").forEach(function(v) {
    v.classList.remove("active");
  });
  document.getElementById(viewName + "-view").classList.add("active");

  document.querySelectorAll(".nav-item").forEach(function(btn) {
    btn.classList.remove("active");
  });
  document.querySelector('.nav-item[data-view="' + viewName + '"]').classList.add("active");

  refreshAll();
}

// ==================== Manual Section Toggle ====================

function toggleManualSection(headerEl) {
  var section = headerEl.parentElement;
  section.classList.toggle("mnl-open");
}

function scrollToManualSection(sectionId) {
  var el = document.getElementById(sectionId);
  if (!el) return;
  // Open the section
  el.classList.add("mnl-open");
  // Scroll into view
  setTimeout(function() {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

// ==================== Modals ====================

function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
  if (modalId === "member-modal") {
    populateRoleDropdown("member-role");
  }
  if (modalId === "task-modal") {
    populateMemberDropdown("task-assignee");
    var alertEl = document.getElementById("task-assignee-alert");
    if (alertEl) { alertEl.style.display = "none"; alertEl.innerHTML = ""; }
  }
  if (modalId === "review-modal") {
    populateCategoryDropdown("review-category");
    var catSec = document.getElementById("review-category-section");
    if (catSec) catSec.style.display = "none";
    var submitBtn = document.getElementById("review-submit-btn");
    if (submitBtn) submitBtn.style.display = "none";
    var noteEl = document.getElementById("review-note");
    if (noteEl) noteEl.value = "";
    var catEl = document.getElementById("review-category");
    if (catEl) catEl.value = "";
    // Remove selection highlight from all buttons
    document.querySelectorAll("#review-modal .flag-option-btn").forEach(function(btn) {
      btn.classList.remove("selected");
    });
    pendingReviewQuality = null;
  }
  if (modalId === "extraordinary-modal") {
    populateCategoryDropdown("extraordinary-category");
  }
  if (modalId === "blunder-modal") {
    populateCategoryDropdown("blunder-category");
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
  var form = document.getElementById(modalId.replace("-modal", "-form"));
  if (form) form.reset();
  var editId = document.getElementById(modalId.replace("-modal", "-edit-id"));
  if (editId) editId.value = "";
  var titleEl = document.getElementById(modalId + "-title");
  if (titleEl) {
    var type = modalId.replace("-modal", "");
    titleEl.textContent = "Add " + type.charAt(0).toUpperCase() + type.slice(1);
  }
}

// ==================== Flag Helpers ====================

function getMemberFlags(memberId) {
  var red = 0;
  var green = 0;
  data.flags.forEach(function(f) {
    if (f.memberId === memberId) {
      if (f.color === "red") red += f.count;
      else if (f.color === "green") green += f.count;
    }
  });
  return { red: red, green: green };
}

function getMemberFlagList(memberId) {
  return data.flags.filter(function(f) {
    return f.memberId === memberId;
  }).sort(function(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

function addFlag(memberId, taskId, color, count, reason, note, category) {
  data.flags.push({
    id: generateId(),
    memberId: memberId,
    taskId: taskId,
    color: color,
    count: count,
    reason: reason,
    note: note || "",
    category: category || "",
    createdAt: new Date().toISOString()
  });
  saveData(data);
}

function renderFlagBadge(memberId) {
  var flags = getMemberFlags(memberId);
  var parts = [];
  if (flags.green > 0) {
    parts.push('<span class="flag-count flag-green-count">' + icons.dot + ' ' + flags.green + '</span>');
  }
  if (flags.red > 0) {
    parts.push('<span class="flag-count flag-red-count">' + icons.dot + ' ' + flags.red + '</span>');
  }
  if (parts.length === 0) return '';
  return '<span class="flag-badges">' + parts.join('') + '</span>';
}

function isOverdue(task) {
  if (!task.dueDate || task.status === "completed" || task.status === "cancelled") return false;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var parts = task.dueDate.split("-");
  var due = new Date(parts[0], parts[1] - 1, parts[2]);
  return due < today;
}

function checkOverdueFlags() {
  data.tasks.forEach(function(task) {
    if (isOverdue(task) && task.assigneeId && !task.overdueFlagged) {
      addFlag(task.assigneeId, task.id, "red", 1, "Past due: " + task.title, "", "");
      task.overdueFlagged = true;
    }
  });
  saveData(data);
}

// ==================== Zone Analytics ====================

function getMemberZone(memberId) {
  var f = getMemberFlags(memberId);
  var net = f.green - f.red;
  if (net > 0) return "green";
  if (net < 0) return "red";
  return "yellow";
}

function getMonthKey(dateStr) {
  var d = new Date(dateStr);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
}

function getMonthLabel(key) {
  var parts = key.split("-");
  return String(parts[1]).padStart(2, "0") + "-" + String(parts[0]).slice(-2);
}

function getMemberZoneAtMonth(memberId, monthKey) {
  var red = 0;
  var green = 0;
  data.flags.forEach(function(f) {
    if (f.memberId === memberId && getMonthKey(f.createdAt) <= monthKey) {
      if (f.color === "red") red += f.count;
      else if (f.color === "green") green += f.count;
    }
  });
  var net = green - red;
  if (net > 0) return "green";
  if (net < 0) return "red";
  return "yellow";
}

function getActiveMonths() {
  var months = {};
  data.flags.forEach(function(f) {
    months[getMonthKey(f.createdAt)] = true;
  });
  // Only include current month if it has flag activity
  var currentMonth = getMonthKey(new Date().toISOString());
  if (!months[currentMonth]) {
    // If no flags this month, still include it only if there are fewer than 2 months
    // (so trends can still be calculated from earlier data)
    if (Object.keys(months).length < 2) {
      months[currentMonth] = true;
    }
  }
  return Object.keys(months).sort();
}

function isRedAlert(memberId) {
  var months = getActiveMonths();
  if (months.length < 2) return false;
  var last2 = months.slice(-2);
  return last2.every(function(m) {
    return getMemberZoneAtMonth(memberId, m) === "red";
  });
}

// ==================== Member Trend (Rising / Flat / Falling) ====================

function getMemberNetAtMonth(memberId, monthKey) {
  var red = 0;
  var green = 0;
  data.flags.forEach(function(f) {
    if (f.memberId === memberId && getMonthKey(f.createdAt) <= monthKey) {
      if (f.color === "red") red += f.count;
      else if (f.color === "green") green += f.count;
    }
  });
  return green - red;
}

function getMemberTrend(memberId) {
  var months = getActiveMonths();
  if (months.length < 2) return "flat";
  var prev = getMemberNetAtMonth(memberId, months[months.length - 2]);
  var curr = getMemberNetAtMonth(memberId, months[months.length - 1]);
  if (curr > prev) return "rising";
  if (curr < prev) return "falling";
  return "flat";
}

function renderTrendBadge(memberId) {
  var trend = getMemberTrend(memberId);
  if (trend === "rising") return '<span class="trend-badge trend-rising">' + icons.arrowUp + ' Accelerating</span>';
  if (trend === "falling") return '<span class="trend-badge trend-falling">' + icons.arrowDown + ' Needs Attention</span>';
  return '<span class="trend-badge trend-flat">' + icons.minus + ' Steady</span>';
}

// ==================== Red Flag Decay ====================
// If no red flags for 2 consecutive months, older red flags lose 50% weight

function getEffectiveFlags(memberId) {
  var months = getActiveMonths();
  var currentMonth = months.length > 0 ? months[months.length - 1] : getMonthKey(new Date().toISOString());

  // Count red flags per month for this member
  var redByMonth = {};
  data.flags.forEach(function(f) {
    if (f.memberId === memberId && f.color === "red") {
      var mk = getMonthKey(f.createdAt);
      redByMonth[mk] = (redByMonth[mk] || 0) + f.count;
    }
  });

  // Find consecutive clean months (0 red flags) ending at the most recent months
  var cleanStreak = 0;
  for (var i = months.length - 1; i >= 0; i--) {
    if (!redByMonth[months[i]] || redByMonth[months[i]] === 0) {
      cleanStreak++;
    } else {
      break;
    }
  }

  var decayActive = cleanStreak >= 2;

  var effectiveRed = 0;
  var effectiveGreen = 0;
  data.flags.forEach(function(f) {
    if (f.memberId !== memberId) return;
    if (f.color === "green") {
      effectiveGreen += f.count;
    } else if (f.color === "red") {
      if (decayActive) {
        // Old red flags (before the clean streak) get 50% decay
        var flagMonth = getMonthKey(f.createdAt);
        var flagInCleanPeriod = false;
        for (var j = months.length - cleanStreak; j < months.length; j++) {
          if (j >= 0 && months[j] === flagMonth) { flagInCleanPeriod = true; break; }
        }
        if (!flagInCleanPeriod) {
          effectiveRed += Math.ceil(f.count * 0.5); // 50% decay rounded up
        } else {
          effectiveRed += f.count;
        }
      } else {
        effectiveRed += f.count;
      }
    }
  });

  return { red: effectiveRed, green: effectiveGreen, decayActive: decayActive, cleanStreak: cleanStreak };
}

// ==================== Monthly Warning (2+ red in a month) ====================

function getMonthlyRedWarning(memberId) {
  var currentMonth = getMonthKey(new Date().toISOString());
  var redThisMonth = 0;
  data.flags.forEach(function(f) {
    if (f.memberId === memberId && f.color === "red" && getMonthKey(f.createdAt) === currentMonth) {
      redThisMonth += f.count;
    }
  });
  return redThisMonth >= 2;
}

// ==================== Leadership Multiplier ====================

var pendingLeadershipMemberId = null;

function openLeadership(memberId) {
  var member = data.members.find(function(m) { return m.id === memberId; });
  if (!member) return;
  pendingLeadershipMemberId = memberId;
  document.getElementById("leadership-member-name").textContent = member.name;
  document.getElementById("leadership-reason").value = "";
  // Reset checkboxes
  document.querySelectorAll(".leadership-check").forEach(function(cb) { cb.checked = false; });
  openModal("leadership-modal");
}

function submitLeadership() {
  var memberId = pendingLeadershipMemberId;
  if (!memberId) { closeModal("leadership-modal"); return; }

  var checks = document.querySelectorAll(".leadership-check:checked");
  if (checks.length === 0) { closeModal("leadership-modal"); return; }

  var reasons = [];
  checks.forEach(function(cb) { reasons.push(cb.getAttribute("data-label")); });
  var note = document.getElementById("leadership-reason").value.trim();
  var reason = "Leadership Signal: " + reasons.join(", ");

  // +1 green flag per qualifying criterion
  addFlag(memberId, null, "green", checks.length, reason, note);

  closeModal("leadership-modal");
  pendingLeadershipMemberId = null;
  refreshAll();
}

// ==================== Task Completion Review ====================

function toggleTaskStatus(id) {
  var task = data.tasks.find(function(t) { return t.id === id; });
  if (!task) return;

  if (task.status === "completed") {
    task.status = "pending";
    saveData(data);
    refreshAll();
  } else {
    pendingReviewTaskId = id;
    document.getElementById("review-task-name").textContent = task.title;
    openModal("review-modal");
  }
}

var pendingReviewQuality = null;

function selectReviewOption(quality) {
  pendingReviewQuality = quality;
  // Highlight selected button
  document.querySelectorAll("#review-modal .flag-option-btn").forEach(function(btn) {
    btn.classList.remove("selected");
  });
  var btnMap = { extraordinary: 0, perfect: 1, none: 2, below: 3, blunder: 4 };
  var btns = document.querySelectorAll("#review-modal .flag-option-btn");
  if (btns[btnMap[quality]]) btns[btnMap[quality]].classList.add("selected");

  var catSec = document.getElementById("review-category-section");
  var submitBtn = document.getElementById("review-submit-btn");

  if (quality === "none") {
    // No category needed, submit directly
    if (catSec) catSec.style.display = "none";
    if (submitBtn) submitBtn.style.display = "none";
    submitReview();
  } else {
    // Show category + note for all signal-generating options
    if (catSec) catSec.style.display = "block";
    if (submitBtn) submitBtn.style.display = "inline-flex";
  }
}

function submitReview() {
  var quality = pendingReviewQuality;
  if (!quality) return;
  var task = data.tasks.find(function(t) { return t.id === pendingReviewTaskId; });
  if (!task) return;

  var category = "";
  var note = "";
  var catEl = document.getElementById("review-category");
  var noteEl = document.getElementById("review-note");
  if (catEl) category = catEl.value;
  if (noteEl) note = noteEl.value.trim();

  if (quality === "blunder" && !category) {
    alert("Please select a category for blunder reviews.");
    if (catEl) catEl.focus();
    return;
  }

  task.status = "completed";
  task.reviewResult = quality;

  if (task.assigneeId) {
    if (quality === "extraordinary") {
      addFlag(task.assigneeId, task.id, "green", 2, "Exceptional contribution: " + task.title, note, category);
    } else if (quality === "perfect") {
      addFlag(task.assigneeId, task.id, "green", 1, "Completed with excellence: " + task.title, note, category);
    } else if (quality === "below") {
      addFlag(task.assigneeId, task.id, "red", 1, "Needs support: " + task.title, note, category);
    } else if (quality === "blunder") {
      addFlag(task.assigneeId, task.id, "red", 2, "Blunder: " + task.title, note, category);
    }
  }

  saveData(data);
  closeModal("review-modal");
  pendingReviewTaskId = null;
  pendingReviewQuality = null;
  refreshAll();
}

function cancelReview() {
  pendingReviewTaskId = null;
  pendingReviewQuality = null;
  closeModal("review-modal");
}

// ==================== Mark Extraordinary ====================

var pendingExtraordinaryMemberId = null;

function openExtraordinary(taskId) {
  var task = data.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;
  pendingExtraordinaryTaskId = taskId;
  pendingExtraordinaryMemberId = null;
  document.getElementById("extraordinary-task-name").textContent = task.title;
  document.getElementById("extraordinary-note").value = "";
  document.getElementById("extraordinary-category").value = "";
  openModal("extraordinary-modal");
}

function openExtraordinaryForMember(memberId) {
  var member = data.members.find(function(m) { return m.id === memberId; });
  if (!member) return;
  pendingExtraordinaryMemberId = memberId;
  pendingExtraordinaryTaskId = null;
  document.getElementById("extraordinary-task-name").textContent = member.name;
  document.getElementById("extraordinary-note").value = "";
  document.getElementById("extraordinary-category").value = "";
  openModal("extraordinary-modal");
}

function submitExtraordinary() {
  var memberId = null;
  var taskId = null;
  var contextName = "";

  if (pendingExtraordinaryMemberId) {
    memberId = pendingExtraordinaryMemberId;
    var member = data.members.find(function(m) { return m.id === memberId; });
    contextName = member ? member.name : "member";
  } else if (pendingExtraordinaryTaskId) {
    var task = data.tasks.find(function(t) { return t.id === pendingExtraordinaryTaskId; });
    if (!task || !task.assigneeId) { closeModal("extraordinary-modal"); return; }
    memberId = task.assigneeId;
    taskId = task.id;
    contextName = task.title;
  } else {
    closeModal("extraordinary-modal");
    return;
  }

  var note = document.getElementById("extraordinary-note").value.trim();
  var category = document.getElementById("extraordinary-category").value;
  var reason = "Exceptional contribution: " + contextName;

  addFlag(memberId, taskId, "green", 2, reason, note, category);

  closeModal("extraordinary-modal");
  pendingExtraordinaryTaskId = null;
  pendingExtraordinaryMemberId = null;
  refreshAll();
}

// ==================== Blunder ====================

var pendingBlunderMemberId = null;

function openBlunder(taskId) {
  var task = data.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;
  pendingBlunderTaskId = taskId;
  pendingBlunderMemberId = null;
  document.getElementById("blunder-task-name").textContent = task.title;
  document.getElementById("blunder-note").value = "";
  document.getElementById("blunder-category").value = "";
  openModal("blunder-modal");
}

function openBlunderForMember(memberId) {
  var member = data.members.find(function(m) { return m.id === memberId; });
  if (!member) return;
  pendingBlunderMemberId = memberId;
  pendingBlunderTaskId = null;
  document.getElementById("blunder-task-name").textContent = member.name;
  document.getElementById("blunder-note").value = "";
  document.getElementById("blunder-category").value = "";
  openModal("blunder-modal");
}

function submitBlunder() {
  var memberId = null;
  var taskId = null;
  var contextName = "";

  if (pendingBlunderMemberId) {
    memberId = pendingBlunderMemberId;
    var member = data.members.find(function(m) { return m.id === memberId; });
    contextName = member ? member.name : "member";
  } else if (pendingBlunderTaskId) {
    var task = data.tasks.find(function(t) { return t.id === pendingBlunderTaskId; });
    if (!task || !task.assigneeId) { closeModal("blunder-modal"); return; }
    memberId = task.assigneeId;
    taskId = task.id;
    contextName = task.title;
  } else {
    closeModal("blunder-modal");
    return;
  }

  var note = document.getElementById("blunder-note").value.trim();
  var category = document.getElementById("blunder-category").value;

  if (!category) {
    alert("Please select a category for critical incidents.");
    document.getElementById("blunder-category").focus();
    return;
  }

  var reason = "Critical incident: " + contextName;

  addFlag(memberId, taskId, "red", 3, reason, note, category);

  closeModal("blunder-modal");
  pendingBlunderTaskId = null;
  pendingBlunderMemberId = null;
  refreshAll();
}

// ==================== Member Flag History ====================

function showMemberFlags(memberId) {
  var member = data.members.find(function(m) { return m.id === memberId; });
  if (!member) return;

  document.getElementById("flags-modal-title").textContent = escapeHtml(member.name) + " — Signal History";

  var flags = getMemberFlags(memberId);
  var eff = getEffectiveFlags(memberId);
  var effNet = eff.green - eff.red;
  var trend = getMemberTrend(memberId);
  var trendLabel = trend === "rising" ? (icons.arrowUp + " Accelerating") : (trend === "falling" ? (icons.arrowDown + " Needs Attention") : (icons.minus + " Steady"));
  var trendCls = trend === "rising" ? "trend-rising" : (trend === "falling" ? "trend-falling" : "trend-flat");
  var monthlyWarn = getMonthlyRedWarning(memberId);

  var summaryEl = document.getElementById("flags-summary");
  summaryEl.innerHTML =
    '<div class="flags-summary-row">' +
      '<div class="flags-summary-item green">' +
        '<span class="flags-summary-count">' + flags.green + '</span>' +
        '<span class="flags-summary-label">Strong Signals</span>' +
      '</div>' +
      '<div class="flags-summary-item red">' +
        '<span class="flags-summary-count">' + flags.red + (eff.decayActive ? '<span style="font-size:0.5em;opacity:0.7"> → ' + eff.red + '</span>' : '') + '</span>' +
        '<span class="flags-summary-label">Weak Signals' + (eff.decayActive ? ' (recovered)' : '') + '</span>' +
      '</div>' +
      '<div class="flags-summary-item net ' + (effNet >= 0 ? 'green' : 'red') + '">' +
        '<span class="flags-summary-count">' + (effNet > 0 ? '+' : '') + effNet + '</span>' +
        '<span class="flags-summary-label">Net Signal</span>' +
      '</div>' +
    '</div>' +
    '<div class="flags-meta-row">' +
      '<span class="trend-badge ' + trendCls + '">' + trendLabel + '</span>' +
      (eff.decayActive ? '<span class="decay-badge">Recovery Active (' + eff.cleanStreak + ' clean months → -50% old signals)</span>' : '') +
      (monthlyWarn ? '<span class="monthly-warning-badge">Attention: 2+ Weak Signals This Month</span>' : '') +
    '</div>';

  var historyList = document.getElementById("flags-history-list");
  var flagEntries = getMemberFlagList(memberId);

  if (flagEntries.length === 0) {
    historyList.innerHTML = '<div class="empty-state-sm">No signals recorded yet</div>';
  } else {
    historyList.innerHTML = "";
    flagEntries.forEach(function(f) {
      var item = document.createElement("div");
      item.className = "flag-history-item";
      var fd = new Date(f.createdAt);
      var dateStr = String(fd.getDate()).padStart(2,"0") + "-" + String(fd.getMonth()+1).padStart(2,"0") + "-" + String(fd.getFullYear()).slice(-2);
      var noteHtml = f.note ? '<span class="flag-history-note">' + escapeHtml(f.note) + '</span>' : '';
      var catHtml = f.category ? '<span class="flag-category-badge">' + escapeHtml(getCategoryLabel(f.category)) + '</span>' : '';
      item.innerHTML =
        '<div class="flag-history-icon ' + f.color + '">' +
          icons.dot + (f.count > 1 ? ' x' + f.count : '') +
        '</div>' +
        '<div class="flag-history-info">' +
          '<span class="flag-history-reason">' + escapeHtml(f.reason) + catHtml + '</span>' +
          noteHtml +
          '<span class="flag-history-date">' + dateStr + '</span>' +
        '</div>';
      historyList.appendChild(item);
    });
  }

  openModal("flags-modal");
}

// ==================== Roles ====================

function saveRole(event) {
  event.preventDefault();
  var editId = document.getElementById("role-edit-id").value;
  var role = {
    id: editId || generateId(),
    name: document.getElementById("role-name").value.trim(),
    description: document.getElementById("role-description").value.trim(),
    color: document.getElementById("role-color").value,
    createdAt: editId
      ? (data.roles.find(function(r) { return r.id === editId; }) || {}).createdAt || new Date().toISOString()
      : new Date().toISOString()
  };

  if (editId) {
    var idx = data.roles.findIndex(function(r) { return r.id === editId; });
    if (idx !== -1) data.roles[idx] = role;
  } else {
    data.roles.push(role);
  }

  saveData(data);
  closeModal("role-modal");
  refreshAll();
}

function editRole(id) {
  var role = data.roles.find(function(r) { return r.id === id; });
  if (!role) return;
  document.getElementById("role-edit-id").value = role.id;
  document.getElementById("role-name").value = role.name;
  document.getElementById("role-description").value = role.description;
  document.getElementById("role-color").value = role.color;
  document.getElementById("role-modal-title").textContent = "Edit Role";
  openModal("role-modal");
}

function deleteRole(id) {
  pendingDeleteType = "role";
  pendingDeleteId = id;
  document.getElementById("confirm-text").textContent =
    "Are you sure you want to delete this role? Members with this role will become unassigned.";
  openModal("confirm-modal");
}

function renderRoles() {
  var container = document.getElementById("roles-list");
  if (!container) return;
  container.innerHTML = "";

  if (data.roles.length === 0) {
    container.innerHTML = '<div class="empty-state">No roles defined yet. Add your first role to get started.</div>';
    return;
  }

  data.roles.forEach(function(role) {
    var memberCount = data.members.filter(function(m) { return m.roleId === role.id; }).length;
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      '<div class="card-top">' +
        '<div class="role-badge ' + role.color + '">' + escapeHtml(role.name) + '</div>' +
        '<div class="card-actions">' +
          '<button class="btn-icon" onclick="editRole(\'' + role.id + '\')" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
          '<button class="btn-icon btn-icon-danger" onclick="deleteRole(\'' + role.id + '\')" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
        '</div>' +
      '</div>' +
      '<p class="card-desc">' + (role.description ? escapeHtml(role.description) : "No description") + '</p>' +
      '<div class="card-meta">' + memberCount + ' member' + (memberCount !== 1 ? 's' : '') + '</div>';
    container.appendChild(card);
  });
}

// ==================== Members ====================

function saveMember(event) {
  event.preventDefault();
  var editId = document.getElementById("member-edit-id").value;
  var member = {
    id: editId || generateId(),
    name: document.getElementById("member-name").value.trim(),
    email: document.getElementById("member-email").value.trim(),
    roleId: document.getElementById("member-role").value,
    status: document.getElementById("member-status").value,
    createdAt: editId
      ? (data.members.find(function(m) { return m.id === editId; }) || {}).createdAt || new Date().toISOString()
      : new Date().toISOString()
  };

  if (editId) {
    var idx = data.members.findIndex(function(m) { return m.id === editId; });
    if (idx !== -1) data.members[idx] = member;
  } else {
    data.members.push(member);
  }

  saveData(data);
  closeModal("member-modal");
  refreshAll();
}

function editMember(id) {
  var member = data.members.find(function(m) { return m.id === id; });
  if (!member) return;
  document.getElementById("member-edit-id").value = member.id;
  document.getElementById("member-name").value = member.name;
  document.getElementById("member-email").value = member.email;
  populateRoleDropdown("member-role");
  document.getElementById("member-role").value = member.roleId;
  document.getElementById("member-status").value = member.status;
  document.getElementById("member-modal-title").textContent = "Edit Member";
  openModal("member-modal");
}

function deleteMember(id) {
  pendingDeleteType = "member";
  pendingDeleteId = id;
  document.getElementById("confirm-text").textContent =
    "Are you sure you want to delete this member? Their tasks will become unassigned.";
  openModal("confirm-modal");
}

function populateDeptFilter() {
  var sel = document.getElementById("member-dept-filter");
  if (!sel) return;
  var currentVal = sel.value;
  var depts = {};
  data.members.forEach(function(m) {
    var role = data.roles.find(function(r) { return r.id === m.roleId; });
    var name = role ? role.name : "Unassigned";
    depts[name] = m.roleId || "";
  });
  sel.innerHTML = '<option value="">All Departments</option>';
  Object.keys(depts).sort().forEach(function(name) {
    sel.innerHTML += '<option value="' + depts[name] + '">' + escapeHtml(name) + '</option>';
  });
  sel.value = currentVal;
}

function renderMembers() {
  var container = document.getElementById("members-list");
  if (!container) return;
  container.innerHTML = "";

  populateDeptFilter();

  var searchInput = document.getElementById("member-search");
  var search = searchInput ? searchInput.value.toLowerCase() : "";
  var deptFilter = document.getElementById("member-dept-filter");
  var deptVal = deptFilter ? deptFilter.value : "";

  var filtered = data.members.filter(function(m) {
    // Department filter
    if (deptVal !== "") {
      if (deptVal === "__unassigned__") {
        if (m.roleId) return false;
      } else {
        if (m.roleId !== deptVal) return false;
      }
    }
    // Text search
    if (!search) return true;
    return m.name.toLowerCase().indexOf(search) !== -1 ||
           m.email.toLowerCase().indexOf(search) !== -1;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">' +
      (data.members.length === 0
        ? "No team members yet. Add your first member to get started."
        : "No members match your search.") +
      '</div>';
    return;
  }

  filtered.forEach(function(member) {
    var role = data.roles.find(function(r) { return r.id === member.roleId; });
    var taskCount = data.tasks.filter(function(t) {
      return t.assigneeId === member.id && t.status !== "completed" && t.status !== "cancelled";
    }).length;
    var initials = member.name.split(" ").map(function(n) { return n[0]; }).join("").toUpperCase().substring(0, 2);
    var roleColor = role ? role.color : "blue";
    var eff = getEffectiveFlags(member.id);
    var effNet = eff.green - eff.red;
    var zone = getMemberZone(member.id);
    var trendHtml = renderTrendBadge(member.id);
    var alertHtml = isRedAlert(member.id) ? '<span class="red-alert-badge">SUPPORT NEEDED</span>' : '';
    var warningHtml = getMonthlyRedWarning(member.id) ? '<span class="monthly-warning-badge">ATTENTION THIS MONTH</span>' : '';
    var decayHtml = eff.decayActive ? '<span class="decay-badge">Recovery Active (-50%)</span>' : '';

    var netClass = effNet > 0 ? "net-positive" : (effNet < 0 ? "net-negative" : "net-neutral");
    var zoneClass = zone === "green" ? "zone-green" : (zone === "red" ? "zone-red" : "zone-orange");

    var card = document.createElement("div");
    card.className = "member-card" + (isRedAlert(member.id) ? " card-red-alert" : "") + (getMonthlyRedWarning(member.id) ? " card-monthly-warning" : "");
    card.innerHTML =
      '<div class="member-card-header">' +
        '<div class="member-card-left">' +
          '<div class="avatar ' + roleColor + '">' + initials + '</div>' +
          '<div class="member-card-identity">' +
            '<div class="member-name">' + escapeHtml(member.name) + '</div>' +
            '<div class="member-email">' + escapeHtml(member.email) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="member-card-net ' + netClass + '">' +
          '<span class="member-card-net-value">' + (effNet > 0 ? '+' : '') + effNet + '</span>' +
          '<span class="member-card-net-label">Net Score</span>' +
        '</div>' +
      '</div>' +
      '<div class="member-card-badges">' +
        trendHtml + ' ' + alertHtml + ' ' + warningHtml + ' ' + decayHtml +
      '</div>' +
      (typeof renderMemberSuggestionsBadge === "function" ? renderMemberSuggestionsBadge(member.id) : '') +
      '<div class="member-card-stats">' +
        '<div class="member-stat">' +
          '<span class="member-stat-value">' + taskCount + '</span>' +
          '<span class="member-stat-label">Tasks</span>' +
        '</div>' +
        '<div class="member-stat">' +
          '<div class="member-zone-dot ' + zoneClass + '"></div>' +
          '<span class="member-stat-label">' + (zone === "green" ? "Strong" : (zone === "red" ? "Weak" : "Steady")) + ' Zone</span>' +
        '</div>' +
      '</div>' +
      '<div class="member-card-meta">' +
        '<div class="role-badge ' + roleColor + '">' + (role ? escapeHtml(role.name) : "No Role") + '</div>' +
        '<span class="status-badge status-' + member.status + '">' + formatStatus(member.status) + '</span>' +
      '</div>' +
      '<div class="member-card-actions">' +
        '<button class="member-action-btn member-action-green" onclick="openExtraordinaryForMember(\'' + member.id + '\')" title="Recognize Exceptional Work (+2 Strong Signals)">' + icons.star + ' Recognize</button>' +
        '<button class="member-action-btn member-action-red" onclick="openBlunderForMember(\'' + member.id + '\')" title="Log Critical Incident (+3 Weak Signals)">' + icons.alert + ' Log Incident</button>' +
        '<button class="member-action-btn member-action-leadership" onclick="openLeadership(\'' + member.id + '\')" title="Leadership Signal">' + icons.crown + ' Leadership</button>' +
        '<div class="member-card-icons">' +
          '<button class="btn-icon" onclick="showMemberFlags(\'' + member.id + '\')" title="View Signal History"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></button>' +
          '<button class="btn-icon" onclick="editMember(\'' + member.id + '\')" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
          '<button class="btn-icon btn-icon-danger" onclick="deleteMember(\'' + member.id + '\')" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
        '</div>' +
      '</div>';
    container.appendChild(card);
  });
}

// ==================== Voice Input (Title field mic) ====================

var voiceRecognition = null;
var voiceActive = false;

function toggleVoiceInput() {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    var statusEl = document.getElementById("voice-status");
    if (statusEl) statusEl.textContent = "Voice not supported. Use Chrome or Edge.";
    return;
  }
  if (voiceActive && voiceRecognition) { voiceRecognition.stop(); return; }

  voiceRecognition = new SpeechRecognition();
  voiceRecognition.lang = "en-US";
  voiceRecognition.interimResults = true;
  voiceRecognition.continuous = false;

  var btn = document.getElementById("voice-task-btn");
  var statusEl = document.getElementById("voice-status");
  var titleInput = document.getElementById("task-title");

  voiceActive = true;
  btn.classList.add("voice-recording");
  statusEl.textContent = "Listening...";

  voiceRecognition.onresult = function(event) {
    var transcript = "";
    for (var i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript;
    titleInput.value = transcript.charAt(0).toUpperCase() + transcript.slice(1);
    titleInput.dispatchEvent(new Event("input"));
    if (event.results[0].isFinal) {
      statusEl.textContent = "Done!";
      setTimeout(function() { statusEl.textContent = ""; }, 2000);
    }
  };
  voiceRecognition.onerror = function(event) {
    voiceActive = false; btn.classList.remove("voice-recording");
    statusEl.textContent = event.error === "not-allowed" ? "Mic denied." : event.error === "no-speech" ? "No speech." : "Error: " + event.error;
    setTimeout(function() { statusEl.textContent = ""; }, 3000);
  };
  voiceRecognition.onend = function() {
    voiceActive = false; btn.classList.remove("voice-recording");
    if (statusEl.textContent === "Listening...") { statusEl.textContent = "No speech detected."; setTimeout(function() { statusEl.textContent = ""; }, 2000); }
  };
  voiceRecognition.start();
}

// ==================== Voice Task Creator (Single-Shot) ====================

var vtc = {
  title: "",
  assigneeId: "",
  assigneeName: "",
  dueDate: "",
  weightage: "not-important",
  priority: "medium",
  recognition: null,
  listening: false
};

function openVoiceTaskCreator() {
  vtc.title = ""; vtc.assigneeId = ""; vtc.assigneeName = "";
  vtc.dueDate = ""; vtc.weightage = "not-important"; vtc.priority = "medium";
  document.getElementById("vtc-modal").classList.add("active");
  document.getElementById("vtc-prompt").textContent = "Tap the mic and say everything in one go";
  document.getElementById("vtc-mic-hint").textContent = "Tap to speak";
  document.getElementById("vtc-transcript").textContent = "";
  document.getElementById("vtc-parsed").style.display = "none";
  document.getElementById("vtc-nav").style.display = "none";
  document.getElementById("vtc-inline-edit").style.display = "none";
  document.getElementById("vtc-mic-btn").classList.remove("vtc-recording");
  document.getElementById("vtc-mic-btn").style.display = "";
}

function closeVoiceTaskCreator() {
  if (vtc.recognition) { try { vtc.recognition.stop(); } catch(e){} }
  vtc.listening = false;
  document.getElementById("vtc-modal").classList.remove("active");
}

function vtcToggleMic() {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    document.getElementById("vtc-mic-hint").textContent = "Voice not supported. Use Chrome or Edge.";
    return;
  }
  if (vtc.listening && vtc.recognition) { vtc.recognition.stop(); return; }

  vtc.recognition = new SpeechRecognition();
  vtc.recognition.lang = "en-US";
  vtc.recognition.interimResults = true;
  vtc.recognition.continuous = true;

  var btn = document.getElementById("vtc-mic-btn");
  var hint = document.getElementById("vtc-mic-hint");
  var transcriptEl = document.getElementById("vtc-transcript");
  vtc.listening = true;
  btn.classList.add("vtc-recording");
  hint.textContent = "Listening... tap mic again when done";
  transcriptEl.textContent = "";
  document.getElementById("vtc-parsed").style.display = "none";
  document.getElementById("vtc-nav").style.display = "none";

  var finalTranscript = "";

  vtc.recognition.onresult = function(event) {
    var interim = "";
    finalTranscript = "";
    for (var i = 0; i < event.results.length; i++) {
      if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
      else interim += event.results[i][0].transcript;
    }
    transcriptEl.innerHTML = '<span class="vtc-trans-final">' + escapeHtml(finalTranscript) + '</span>' +
      (interim ? '<span class="vtc-trans-interim">' + escapeHtml(interim) + '</span>' : '');
  };

  vtc.recognition.onerror = function(event) {
    vtc.listening = false; btn.classList.remove("vtc-recording");
    hint.textContent = event.error === "not-allowed" ? "Mic access denied. Allow in browser settings." : event.error === "no-speech" ? "No speech heard. Tap mic again." : "Error: " + event.error;
  };

  vtc.recognition.onend = function() {
    vtc.listening = false; btn.classList.remove("vtc-recording");
    if (finalTranscript) {
      vtcParseSentence(finalTranscript.trim());
    } else {
      hint.textContent = "No speech captured. Tap mic to try again.";
    }
  };

  vtc.recognition.start();
}

// ---- Smart single-sentence parser ----

function vtcParseSentence(raw) {
  var hint = document.getElementById("vtc-mic-hint");
  hint.textContent = "Parsing...";
  var lower = raw.toLowerCase();
  var remaining = raw;

  // 1) Extract weightage: "important" / "not important"
  vtc.weightage = "not-important";
  vtc.priority = "medium";
  var weightPatterns = [
    { re: /\b(not important|not-important|unimportant)\b/i, w: "not-important" },
    { re: /\b(important)\b/i, w: "important" }
  ];
  for (var wi = 0; wi < weightPatterns.length; wi++) {
    var wm = remaining.match(weightPatterns[wi].re);
    if (wm) { vtc.weightage = weightPatterns[wi].w; remaining = remaining.replace(wm[0], " "); break; }
  }

  // Extract priority
  var priPatterns = [
    { re: /\b(high priority|high-priority)\b/i, p: "high" },
    { re: /\b(low priority|low-priority)\b/i, p: "low" },
    { re: /\b(medium priority|medium-priority)\b/i, p: "medium" }
  ];
  for (var pi = 0; pi < priPatterns.length; pi++) {
    var pm = remaining.match(priPatterns[pi].re);
    if (pm) { vtc.priority = priPatterns[pi].p; remaining = remaining.replace(pm[0], " "); break; }
  }

  // 2) Extract due date patterns
  vtc.dueDate = "";
  var datePatterns = [
    /\b(?:due|by|before|on)\s+(tomorrow)\b/i,
    /\b(?:due|by|before|on)\s+(today)\b/i,
    /\b(?:due|by|before|on)\s+(next\s+(?:sunday|monday|tuesday|wednesday|thursday|friday|saturday))\b/i,
    /\b(?:due|by|before|on)\s+((?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}(?:\s*(?:st|nd|rd|th))?(?:\s+\d{4})?)\b/i,
    /\b(?:due|by|before|on)\s+(\d{1,2}(?:st|nd|rd|th)?\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)(?:\s+\d{4})?)\b/i,
    /\b(?:due|by|before|on)\s+(in\s+\d+\s+(?:day|days|week|weeks))\b/i,
    /\b(?:due|by|before|on)\s+(\d{1,2}[\/\-]\d{1,2}(?:[\/\-]\d{2,4})?)\b/i,
    /\b(tomorrow)\b/i,
    /\b(next\s+(?:sunday|monday|tuesday|wednesday|thursday|friday|saturday))\b/i,
    /\b(in\s+\d+\s+(?:day|days|week|weeks))\b/i,
    /\b((?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}(?:\s*(?:st|nd|rd|th))?(?:\s+\d{4})?)\b/i,
    /\b(\d{1,2}(?:st|nd|rd|th)?\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)(?:\s+\d{4})?)\b/i
  ];
  for (var di = 0; di < datePatterns.length; di++) {
    var dm = remaining.match(datePatterns[di]);
    if (dm) {
      var parsed = vtcParseDate(dm[1]);
      if (parsed) {
        vtc.dueDate = parsed;
        remaining = remaining.replace(dm[0], " ");
        break;
      }
    }
  }

  // 3) Extract assignee: "assign to X", "for X", "to X"
  vtc.assigneeId = ""; vtc.assigneeName = "";
  var assignPatterns = [
    /\b(?:assign(?:ed)?(?:\s+(?:it|this))?\s+to|assigned?\s+to)\s+(.+?)(?:\s+(?:due|by|before|on|important|not important|high priority|low priority|medium priority)|\s*$)/i,
    /\b(?:for)\s+(.+?)(?:\s+(?:due|by|before|on|important|not important|high priority|low priority|medium priority)|\s*$)/i
  ];
  for (var ai = 0; ai < assignPatterns.length; ai++) {
    var am = remaining.match(assignPatterns[ai]);
    if (am) {
      var nameGuess = am[1].trim();
      var matched = vtcMatchMember(nameGuess);
      if (matched) {
        vtc.assigneeId = matched.id;
        vtc.assigneeName = matched.name;
      }
      remaining = remaining.replace(am[0], " ");
      break;
    }
  }

  // If no pattern matched, try scanning for any member name in the sentence
  if (!vtc.assigneeId) {
    var bestMatch = null; var bestLen = 0;
    data.members.forEach(function(m) {
      var mLower = m.name.toLowerCase();
      var idx = remaining.toLowerCase().indexOf(mLower);
      if (idx !== -1 && mLower.length > bestLen) {
        bestLen = mLower.length; bestMatch = m;
      }
      // Also try first name
      var firstName = mLower.split(" ")[0];
      if (firstName.length >= 3 && remaining.toLowerCase().indexOf(firstName) !== -1 && firstName.length > bestLen) {
        bestLen = firstName.length; bestMatch = m;
      }
    });
    if (bestMatch) {
      vtc.assigneeId = bestMatch.id;
      vtc.assigneeName = bestMatch.name;
      // Remove matched name from remaining for cleaner title
      var nameRe = new RegExp("\\b" + bestMatch.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
      remaining = remaining.replace(nameRe, " ");
      // Also remove leading "assign to", "for", etc.
      remaining = remaining.replace(/\b(?:assign(?:ed)?\s+(?:it\s+)?to|for)\s*/i, " ");
    }
  }

  // 4) Whatever remains is the title
  // Clean up filler words
  remaining = remaining.replace(/\b(due|by|before|on|assign(?:ed)?\s*(?:it)?\s*to|for)\b/gi, " ");
  remaining = remaining.replace(/\s{2,}/g, " ").trim();
  vtc.title = remaining ? remaining.charAt(0).toUpperCase() + remaining.slice(1) : "";

  vtcShowParsed();
}

function vtcMatchMember(nameGuess) {
  var spoken = nameGuess.toLowerCase().trim();
  var bestMatch = null; var bestScore = 0;
  data.members.forEach(function(m) {
    var mName = m.name.toLowerCase();
    if (spoken === mName) { bestScore = 100; bestMatch = m; }
    else if (mName.indexOf(spoken) !== -1 || spoken.indexOf(mName) !== -1) {
      if (50 > bestScore) { bestScore = 50; bestMatch = m; }
    }
    var firstName = mName.split(" ")[0];
    if (spoken === firstName || spoken.indexOf(firstName) !== -1) {
      if (40 > bestScore) { bestScore = 40; bestMatch = m; }
    }
    var parts = mName.split(" ");
    if (parts.length > 1) {
      var lastName = parts[parts.length - 1];
      if (spoken === lastName || spoken.indexOf(lastName) !== -1) {
        if (35 > bestScore) { bestScore = 35; bestMatch = m; }
      }
    }
  });
  return bestMatch;
}

function vtcParseDate(spoken) {
  var lower = spoken.toLowerCase().trim().replace(/(\d+)(?:st|nd|rd|th)/g, "$1");
  var now = new Date();
  if (lower === "tomorrow") { var d = new Date(now); d.setDate(d.getDate() + 1); return vtcFmtDate(d); }
  if (lower === "today") return vtcFmtDate(now);
  var dayNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  var nextMatch = lower.match(/next\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/);
  if (nextMatch) {
    var targetDay = dayNames.indexOf(nextMatch[1]);
    var d2 = new Date(now); var diff = (targetDay - d2.getDay() + 7) % 7; if (diff === 0) diff = 7;
    d2.setDate(d2.getDate() + diff); return vtcFmtDate(d2);
  }
  var inDays = lower.match(/in\s+(\d+)\s+day/);
  if (inDays) { var d3 = new Date(now); d3.setDate(d3.getDate() + parseInt(inDays[1])); return vtcFmtDate(d3); }
  var inWeeks = lower.match(/in\s+(\d+)\s+week/);
  if (inWeeks) { var d4 = new Date(now); d4.setDate(d4.getDate() + parseInt(inWeeks[1]) * 7); return vtcFmtDate(d4); }
  var months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
  for (var mi = 0; mi < months.length; mi++) {
    if (lower.indexOf(months[mi]) !== -1) {
      var numMatch = lower.match(/(\d{1,2})/);
      if (numMatch) {
        var day = parseInt(numMatch[1]);
        var yearMatch = lower.match(/(20\d{2})/);
        var year = yearMatch ? parseInt(yearMatch[1]) : now.getFullYear();
        var d5 = new Date(year, mi, day);
        if (d5 < now && !yearMatch) d5.setFullYear(d5.getFullYear() + 1);
        return vtcFmtDate(d5);
      }
    }
  }
  var slashMatch = lower.match(/(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?/);
  if (slashMatch) {
    var sd = parseInt(slashMatch[1]), sm = parseInt(slashMatch[2]) - 1;
    var sy = slashMatch[3] ? (slashMatch[3].length === 2 ? 2000 + parseInt(slashMatch[3]) : parseInt(slashMatch[3])) : now.getFullYear();
    return vtcFmtDate(new Date(sy, sm, sd));
  }
  return null;
}

function vtcFmtDate(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function vtcShowParsed() {
  var hint = document.getElementById("vtc-mic-hint");
  hint.textContent = "Parsed! Review below and create.";
  document.getElementById("vtc-parsed").style.display = "";
  document.getElementById("vtc-nav").style.display = "";
  document.getElementById("vtc-inline-edit").style.display = "none";

  // Title
  var titleEl = document.getElementById("vtc-p-title");
  titleEl.textContent = vtc.title || "(not captured)";
  titleEl.className = "vtc-parsed-value" + (vtc.title ? "" : " vtc-parsed-miss");

  // Assignee
  var assignEl = document.getElementById("vtc-p-assignee");
  assignEl.textContent = vtc.assigneeName || "(not captured)";
  assignEl.className = "vtc-parsed-value" + (vtc.assigneeName ? "" : " vtc-parsed-miss");

  // Due date
  var dueEl = document.getElementById("vtc-p-due");
  dueEl.textContent = vtc.dueDate ? formatDate(vtc.dueDate) : "(not captured)";
  dueEl.className = "vtc-parsed-value" + (vtc.dueDate ? "" : " vtc-parsed-miss");

  // Weightage
  var weightEl = document.getElementById("vtc-p-weight");
  weightEl.textContent = vtc.weightage === "important" ? "Important" : "Not Important";
  weightEl.className = "vtc-parsed-value";
}

// ---- Inline edit for each field ----
function vtcEditField(field) {
  var editArea = document.getElementById("vtc-inline-edit");
  var content = document.getElementById("vtc-inline-content");
  editArea.style.display = "";
  var html = '';

  if (field === "title") {
    html = '<label class="vtc-edit-label">Task Title</label>' +
      '<input type="text" class="vtc-edit-input" id="vtc-edit-val" value="' + escapeHtml(vtc.title) + '">' +
      '<button type="button" class="btn-primary vtc-edit-save" onclick="vtc.title=document.getElementById(\'vtc-edit-val\').value.trim();vtcShowParsed();">Save</button>';
  } else if (field === "assignee") {
    html = '<label class="vtc-edit-label">Select Assignee</label><div class="vtc-chips">';
    data.members.forEach(function(m) {
      var sel = vtc.assigneeId === m.id ? " vtc-chip-active" : "";
      html += '<button type="button" class="vtc-chip' + sel + '" onclick="vtc.assigneeId=\'' + m.id + '\';vtc.assigneeName=\'' + escapeHtml(m.name).replace(/'/g, "\\'") + '\';vtcShowParsed();">' + escapeHtml(m.name) + '</button>';
    });
    html += '</div>';
  } else if (field === "due") {
    html = '<label class="vtc-edit-label">Due Date</label>' +
      '<input type="date" class="vtc-edit-input" id="vtc-edit-val" value="' + vtc.dueDate + '">' +
      '<button type="button" class="btn-primary vtc-edit-save" onclick="vtc.dueDate=document.getElementById(\'vtc-edit-val\').value;vtcShowParsed();">Save</button>';
  } else if (field === "weight") {
    html = '<label class="vtc-edit-label">Weightage & Priority</label><div class="vtc-chips">' +
      '<button type="button" class="vtc-chip' + (vtc.weightage === "important" ? " vtc-chip-active" : "") + '" onclick="vtc.weightage=\'important\';vtcShowParsed();">Important</button>' +
      '<button type="button" class="vtc-chip' + (vtc.weightage === "not-important" ? " vtc-chip-active" : "") + '" onclick="vtc.weightage=\'not-important\';vtcShowParsed();">Not Important</button>' +
      '<button type="button" class="vtc-chip' + (vtc.priority === "high" ? " vtc-chip-active" : "") + '" onclick="vtc.priority=\'high\';vtcShowParsed();">High</button>' +
      '<button type="button" class="vtc-chip' + (vtc.priority === "medium" ? " vtc-chip-active" : "") + '" onclick="vtc.priority=\'medium\';vtcShowParsed();">Medium</button>' +
      '<button type="button" class="vtc-chip' + (vtc.priority === "low" ? " vtc-chip-active" : "") + '" onclick="vtc.priority=\'low\';vtcShowParsed();">Low</button>' +
      '</div>';
  }
  content.innerHTML = html;
}

function vtcReset() {
  vtc.title = ""; vtc.assigneeId = ""; vtc.assigneeName = "";
  vtc.dueDate = ""; vtc.weightage = "not-important"; vtc.priority = "medium";
  document.getElementById("vtc-prompt").textContent = "Tap the mic and say everything in one go";
  document.getElementById("vtc-mic-hint").textContent = "Tap to speak";
  document.getElementById("vtc-transcript").textContent = "";
  document.getElementById("vtc-parsed").style.display = "none";
  document.getElementById("vtc-nav").style.display = "none";
  document.getElementById("vtc-inline-edit").style.display = "none";
}

function vtcSave() {
  if (!vtc.title) {
    document.getElementById("vtc-mic-hint").textContent = "Title is required. Tap Edit to add one.";
    return;
  }
  if (!vtc.assigneeId) {
    document.getElementById("vtc-mic-hint").textContent = "Assignee is required. Tap Edit to select.";
    return;
  }
  var task = {
    id: generateId(),
    title: vtc.title,
    description: "",
    notes: "",
    assigneeId: vtc.assigneeId,
    priority: vtc.priority,
    weightage: vtc.weightage,
    dueDate: vtc.dueDate,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  data.tasks.push(task);
  saveData(data);
  closeVoiceTaskCreator();
  refreshAll();
}

// ==================== Tasks ====================

function saveTask(event) {
  event.preventDefault();
  var editId = document.getElementById("task-edit-id").value;
  var task = {
    id: editId || generateId(),
    title: document.getElementById("task-title").value.trim(),
    description: document.getElementById("task-description").value.trim(),
    notes: document.getElementById("task-notes").value.trim(),
    assigneeId: document.getElementById("task-assignee").value,
    priority: document.getElementById("task-priority").value,
    weightage: document.getElementById("task-weightage").value || "not-important",
    dueDate: document.getElementById("task-due").value,
    status: document.getElementById("task-status").value,
    createdAt: editId
      ? (data.tasks.find(function(t) { return t.id === editId; }) || {}).createdAt || new Date().toISOString()
      : new Date().toISOString()
  };

  if (editId) {
    var existing = data.tasks.find(function(t) { return t.id === editId; });
    if (existing) {
      task.overdueFlagged = existing.overdueFlagged;
      task.reviewResult = existing.reviewResult;
    }
    var idx = data.tasks.findIndex(function(t) { return t.id === editId; });
    if (idx !== -1) data.tasks[idx] = task;
  } else {
    data.tasks.push(task);
  }

  saveData(data);
  closeModal("task-modal");
  refreshAll();
}

// ==================== Assignee Risk Alert ====================

function getCategoryLabel(catId) {
  if (!catId) return "";
  var cat = data.categories.find(function(c) { return c.id === catId; });
  return cat ? cat.name : catId;
}

// Extract meaningful keywords from text (title + description)
function extractKeywords(text) {
  if (!text) return [];
  var stopWords = ["the","a","an","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","shall","should","may","might","must","can","could","and","but","or","nor","not","no","so","if","then","else","when","at","by","for","with","about","against","between","through","during","before","after","above","below","to","from","up","down","in","out","on","off","over","under","again","further","once","here","there","all","each","every","both","few","more","most","other","some","such","than","too","very","just","also","into","of","it","its","this","that","these","those","i","me","my","we","our","you","your","he","him","his","she","her","they","them","their","what","which","who","whom","how","task","need","needs","make","get","new"];
  var words = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(function(w) {
    return w.length > 2 && stopWords.indexOf(w) === -1;
  });
  // Deduplicate
  var unique = [];
  words.forEach(function(w) { if (unique.indexOf(w) === -1) unique.push(w); });
  return unique;
}

function checkAssigneeRisk() {
  var alertEl = document.getElementById("task-assignee-alert");
  if (!alertEl) return;
  alertEl.style.display = "none";
  alertEl.innerHTML = "";

  var memberId = document.getElementById("task-assignee").value;
  if (!memberId) return;

  // Auto-extract keywords from task title and description
  var title = document.getElementById("task-title").value || "";
  var description = document.getElementById("task-description").value || "";
  var keywords = extractKeywords(title + " " + description);

  var warnings = [];

  // Get current month key
  var now = new Date();
  var currentMonthKey = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");

  // Get red flags for this member in current month
  var memberRedFlags = data.flags.filter(function(f) {
    return f.memberId === memberId && f.color === "red" && getMonthKey(f.createdAt) === currentMonthKey;
  });

  // Check category-based risk: 2+ red flags in same category this month
  // Check all categories that have 2+ signals
  var catCounts = {};
  memberRedFlags.forEach(function(f) {
    if (f.category) {
      catCounts[f.category] = (catCounts[f.category] || 0) + f.count;
    }
  });
  Object.keys(catCounts).forEach(function(cat) {
    if (catCounts[cat] >= 2) {
      warnings.push({
        type: "category",
        text: "This member has <strong>" + catCounts[cat] + " weak signals</strong> in <strong>" + getCategoryLabel(cat) + "</strong> this month. Consider support or reassignment."
      });
    }
  });

  // Check keyword-based risk: match auto-extracted keywords against red flag task keywords
  if (keywords.length > 0) {
    var matchedKeywords = [];
    memberRedFlags.forEach(function(f) {
      // Check keywords from the task associated with this flag
      if (f.taskId) {
        var flagTask = data.tasks.find(function(t) { return t.id === f.taskId; });
        if (flagTask) {
          var flagKeywords = extractKeywords((flagTask.title || "") + " " + (flagTask.description || ""));
          keywords.forEach(function(ik) {
            flagKeywords.forEach(function(fk) {
              if (ik && fk && (ik === fk || ik.indexOf(fk) !== -1 || fk.indexOf(ik) !== -1)) {
                if (matchedKeywords.indexOf(ik) === -1) matchedKeywords.push(ik);
              }
            });
          });
        }
      }
      // Also check flag note/reason for keyword matches
      var flagText = ((f.reason || "") + " " + (f.note || "")).toLowerCase();
      keywords.forEach(function(ik) {
        if (ik && flagText.indexOf(ik) !== -1) {
          if (matchedKeywords.indexOf(ik) === -1) matchedKeywords.push(ik);
        }
      });
    });
    if (matchedKeywords.length > 0) {
      warnings.push({
        type: "keyword",
        text: "Keyword overlap with recent weak signals: <strong>" + matchedKeywords.join(", ") + "</strong>. This member has struggled with similar work this month."
      });
    }
  }

  if (warnings.length > 0) {
    var html = '<div class="assignee-alert-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>';
    html += '<div class="assignee-alert-content">';
    html += '<div class="assignee-alert-title">Risk Pattern Detected</div>';
    warnings.forEach(function(w) {
      html += '<div class="assignee-alert-msg">' + w.text + '</div>';
    });
    html += '<div class="assignee-alert-note">You can still assign this task — this is an awareness signal.</div>';
    html += '</div>';
    alertEl.innerHTML = html;
    alertEl.style.display = "flex";
  }
}

function editTask(id) {
  var task = data.tasks.find(function(t) { return t.id === id; });
  if (!task) return;
  document.getElementById("task-edit-id").value = task.id;
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-description").value = task.description;
  document.getElementById("task-notes").value = task.notes || "";
  populateMemberDropdown("task-assignee");
  document.getElementById("task-assignee").value = task.assigneeId;
  document.getElementById("task-priority").value = task.priority;
  document.getElementById("task-weightage").value = task.weightage || "not-important";
  document.getElementById("task-due").value = task.dueDate;
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-modal-title").textContent = "Edit Task";
  openModal("task-modal");
  checkAssigneeRisk();
}

function deleteTask(id) {
  pendingDeleteType = "task";
  pendingDeleteId = id;
  document.getElementById("confirm-text").textContent =
    "Are you sure you want to delete this task?";
  openModal("confirm-modal");
}

function filterTasks(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.getAttribute("data-filter") === filter);
  });
  renderTasks();
}

function getTaskFlagIndicator(task) {
  var taskFlags = data.flags.filter(function(f) { return f.taskId === task.id; });
  if (taskFlags.length === 0) return '';

  var parts = [];
  taskFlags.forEach(function(f) {
    for (var i = 0; i < f.count; i++) {
      parts.push('<span class="task-flag-pip ' + f.color + '">' + icons.dot + '</span>');
    }
  });
  return '<span class="task-flag-indicator">' + parts.join('') + '</span>';
}

// ==================== Inline Task Updates ====================

function inlineUpdateStatus(taskId, newStatus) {
  var task = data.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;

  // If changing to completed, open the review modal instead
  if (newStatus === "completed" && task.status !== "completed") {
    pendingReviewTaskId = taskId;
    document.getElementById("review-task-name").textContent = task.title;
    openModal("review-modal");
    // Reset select to current value since review will handle it
    renderTasks();
    return;
  }

  task.status = newStatus;
  saveData(data);
  refreshAll();
}

function inlineUpdatePriority(taskId, newPriority) {
  var task = data.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;
  task.priority = newPriority;
  saveData(data);
  refreshAll();
}

function inlineUpdateDueDate(taskId, newDate) {
  var task = data.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;
  task.dueDate = newDate;
  saveData(data);
  refreshAll();
}

function inlineUpdateAssignee(taskId, newAssigneeId) {
  var task = data.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;
  task.assigneeId = newAssigneeId;
  saveData(data);
  refreshAll();
}

function inlineUpdateNotes(taskId, el) {
  var task = data.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;
  task.notes = el.value.trim();
  saveData(data);
}

function renderTasks() {
  var container = document.getElementById("tasks-list");
  if (!container) return;
  container.innerHTML = "";

  // Text search filter
  var taskSearchInput = document.getElementById("task-search");
  var taskSearch = taskSearchInput ? taskSearchInput.value.toLowerCase() : "";

  var filtered = data.tasks.filter(function(t) {
    // Date range filter first
    if (!isTaskInDateRange(t)) return false;
    if (currentFilter !== "all") {
      if (currentFilter === "overdue") { if (!isOverdue(t)) return false; }
      else { if (t.status !== currentFilter) return false; }
    }
    // Text search by task title or assignee name
    if (taskSearch) {
      var assignee = data.members.find(function(m) { return m.id === t.assigneeId; });
      var assigneeName = assignee ? assignee.name.toLowerCase() : "";
      if (t.title.toLowerCase().indexOf(taskSearch) === -1 && assigneeName.indexOf(taskSearch) === -1) {
        return false;
      }
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">' +
      (data.tasks.length === 0
        ? "No tasks yet. Add your first task to get started."
        : "No tasks match the current filter.") +
      '</div>';
    return;
  }

  filtered.sort(function(a, b) {
    var priorityOrder = { high: 0, medium: 1, low: 2 };
    var statusOrder = { "in-progress": 0, pending: 1, hold: 2, completed: 3, cancelled: 4 };
    var sa = statusOrder[a.status] !== undefined ? statusOrder[a.status] : 5;
    var sb = statusOrder[b.status] !== undefined ? statusOrder[b.status] : 5;
    if (sa !== sb) return sa - sb;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Build table
  var table = document.createElement("div");
  table.className = "task-table-wrap";

  var statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "hold", label: "Hold" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" }
  ];
  var priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ];

  var html = '<table class="task-table">' +
    '<thead><tr>' +
      '<th class="tt-col-title">Task</th>' +
      '<th class="tt-col-assignee">Assigned To</th>' +
      '<th class="tt-col-status">Status</th>' +
      '<th class="tt-col-due">Due Date</th>' +
      '<th class="tt-col-priority">Priority</th>' +
      '<th class="tt-col-weightage">Weightage</th>' +
      '<th class="tt-col-notes">Notes</th>' +
      '<th class="tt-col-actions">Actions</th>' +
    '</tr></thead><tbody>';

  filtered.forEach(function(task) {
    var assignee = data.members.find(function(m) { return m.id === task.assigneeId; });
    var isDone = task.status === "completed";
    var isCancelled = task.status === "cancelled";
    var isFinished = isDone || isCancelled;
    var showExtraordinary = isDone && task.assigneeId;
    var showBlunder = isFinished && task.assigneeId;
    var showComplete = !isDone && task.status !== "cancelled" && task.status !== "hold";
    var flagIndicator = getTaskFlagIndicator(task);

    var rowClass = "tt-row";
    if (isDone) rowClass += " tt-row-completed";
    if (isCancelled) rowClass += " tt-row-cancelled";
    if (task.status === "hold") rowClass += " tt-row-hold";
    if (isOverdue(task)) rowClass += " tt-row-overdue";

    // Status select
    var statusSelect = '<select class="tt-select tt-select-status status-' + task.status + '" onchange="inlineUpdateStatus(\'' + task.id + '\', this.value)">';
    statusOptions.forEach(function(opt) {
      statusSelect += '<option value="' + opt.value + '"' + (task.status === opt.value ? ' selected' : '') + '>' + opt.label + '</option>';
    });
    statusSelect += '</select>';
    if (isOverdue(task)) {
      statusSelect += '<span class="tt-overdue-tag">Past Due</span>';
    }

    // Priority select
    var prioritySelect = '<select class="tt-select tt-select-priority priority-sel-' + task.priority + '" onchange="inlineUpdatePriority(\'' + task.id + '\', this.value)">';
    priorityOptions.forEach(function(opt) {
      prioritySelect += '<option value="' + opt.value + '"' + (task.priority === opt.value ? ' selected' : '') + '>' + opt.label + '</option>';
    });
    prioritySelect += '</select>';

    // Assignee select
    var assigneeSelect = '<select class="tt-select tt-select-assignee" onchange="inlineUpdateAssignee(\'' + task.id + '\', this.value)">';
    assigneeSelect += '<option value="">Unassigned</option>';
    data.members.forEach(function(m) {
      assigneeSelect += '<option value="' + m.id + '"' + (task.assigneeId === m.id ? ' selected' : '') + '>' + escapeHtml(m.name) + '</option>';
    });
    assigneeSelect += '</select>';

    // Due date input
    var dueInput = '<input type="date" class="tt-date" value="' + (task.dueDate || '') + '" onchange="inlineUpdateDueDate(\'' + task.id + '\', this.value)">';

    // Notes input
    var notesInput = '<textarea class="tt-notes" rows="1" placeholder="—" onblur="inlineUpdateNotes(\'' + task.id + '\', this)">' + escapeHtml(task.notes || '') + '</textarea>';

    // Action buttons
    var actions = '';
    if (showComplete) {
      actions += '<button class="tt-action-btn tt-action-complete" onclick="toggleTaskStatus(\'' + task.id + '\')" title="Complete Task"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></button>';
    }
    if (showExtraordinary) {
      actions += '<button class="tt-action-btn tt-action-green" onclick="openExtraordinary(\'' + task.id + '\')" title="Exceptional (+2 Green)">' + icons.star + '</button>';
    }
    if (showBlunder) {
      actions += '<button class="tt-action-btn tt-action-red" onclick="openBlunder(\'' + task.id + '\')" title="Log Incident (+3 Red)">' + icons.alert + '</button>';
    }
    actions += '<button class="tt-action-btn tt-action-edit" onclick="editTask(\'' + task.id + '\')" title="Edit"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>';
    actions += '<button class="tt-action-btn tt-action-delete" onclick="deleteTask(\'' + task.id + '\')" title="Delete"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>';

    var weightageVal = task.weightage || "not-important";
    var weightageLabel = weightageVal === "important" ? "Important" : "Not Important";
    var weightageBadge = weightageVal === "important"
      ? '<span class="tt-weightage-badge tt-weight-important"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg> ' + weightageLabel + '</span>'
      : '<span class="tt-weightage-badge tt-weight-normal">' + weightageLabel + '</span>';

    html += '<tr class="' + rowClass + '">' +
      '<td class="tt-col-title">' +
        '<div class="tt-task-name">' + escapeHtml(task.title) + ' ' + flagIndicator + '</div>' +
        (task.description ? '<div class="tt-task-desc">' + escapeHtml(task.description) + '</div>' : '') +
      '</td>' +
      '<td class="tt-col-assignee">' + assigneeSelect + '</td>' +
      '<td class="tt-col-status">' + statusSelect + '</td>' +
      '<td class="tt-col-due">' + dueInput + '</td>' +
      '<td class="tt-col-priority">' + prioritySelect + '</td>' +
      '<td class="tt-col-weightage">' + weightageBadge + '</td>' +
      '<td class="tt-col-notes">' + notesInput + '</td>' +
      '<td class="tt-col-actions"><div class="tt-actions-wrap">' + actions + '</div></td>' +
    '</tr>';
  });

  html += '</tbody></table>';
  table.innerHTML = html;
  container.appendChild(table);
}

// ==================== Dashboard ====================

function renderDashboard() {
  var filteredTasks = getFilteredTasks();
  var filteredFlags = getFilteredFlags();

  var activeTasks = filteredTasks.filter(function(t) {
    return t.status !== "completed" && t.status !== "cancelled";
  });

  var totalGreen = 0;
  var totalRed = 0;
  filteredFlags.forEach(function(f) {
    if (f.color === "green") totalGreen += f.count;
    else if (f.color === "red") totalRed += f.count;
  });

  // Culture Momentum = net score (strength - growth)
  var cultureMomentum = totalGreen - totalRed;
  // Stability Index = ratio of strength to total (higher = more stable)
  var totalFlags = totalGreen + totalRed;
  var stabilityIndex = totalFlags > 0 ? Math.round((totalGreen / totalFlags) * 100) : 100;

  document.getElementById("stat-members").textContent = data.members.length;
  document.getElementById("stat-tasks").textContent = activeTasks.length;
  document.getElementById("stat-green-flags").textContent = (cultureMomentum > 0 ? "+" : "") + cultureMomentum;
  document.getElementById("stat-green-flags-sub").textContent = totalGreen + " strong signals";
  document.getElementById("stat-red-flags").textContent = stabilityIndex + "%";
  document.getElementById("stat-red-flags-sub").textContent = totalRed + " weak signals";

  // === Quick Action Summary ===
  var actionsEl = document.getElementById("dash-actions");
  if (actionsEl) {
    var pendingReviewCount = filteredTasks.filter(function(t) { return t.status === "completed" && !t.reviewResult; }).length;
    var needsReviewCount = filteredTasks.filter(function(t) { return t.status !== "completed" && t.status !== "cancelled" && isOverdue(t); }).length;
    var weakDeclining = data.members.filter(function(m) {
      var z = getMemberZoneFiltered(m.id);
      var trend = getMemberTrend(m.id);
      return z === "red" && trend === "falling";
    }).length;
    var needsAttentionCount = data.members.filter(function(m) {
      return isRedAlert(m.id) || getMonthlyRedWarning(m.id);
    }).length;

    actionsEl.innerHTML =
      '<div class="dash-action-item dash-action-review" onclick="switchView(\'tasks\')">' +
        '<span class="dash-action-count">' + needsReviewCount + '</span>' +
        '<span class="dash-action-label">tasks overdue</span>' +
      '</div>' +
      '<div class="dash-action-item dash-action-attention">' +
        '<span class="dash-action-count">' + needsAttentionCount + '</span>' +
        '<span class="dash-action-label">members need attention</span>' +
      '</div>' +
      '<div class="dash-action-item dash-action-declining">' +
        '<span class="dash-action-count">' + weakDeclining + '</span>' +
        '<span class="dash-action-label">declining in weak zone</span>' +
      '</div>' +
      '<div class="dash-action-item dash-action-active">' +
        '<span class="dash-action-count">' + activeTasks.length + '</span>' +
        '<span class="dash-action-label">active tasks</span>' +
      '</div>';
  }

  // === Culture Pulse Score ===
  var pulseEl = document.getElementById("dash-pulse");
  if (pulseEl) {
    if (data.members.length === 0) {
      pulseEl.innerHTML = '<div class="empty-state-sm">Add members to calculate pulse</div>';
    } else {
      var greenCount = 0, yellowCount = 0, redCount = 0;
      data.members.forEach(function(m) {
        var z = getMemberZoneFiltered(m.id);
        if (z === "green") greenCount++;
        else if (z === "red") redCount++;
        else yellowCount++;
      });
      var total = data.members.length;
      var gPct = Math.round((greenCount / total) * 100);
      var rPct = Math.round((redCount / total) * 100);

      // Composite score: stability(40%) + momentum direction(30%) + risk inverse(30%)
      var stabilityComponent = gPct; // 0-100
      var riskComponent = 100 - rPct; // 0-100
      var momentumComponent = 50; // default neutral
      var months = getActiveMonths();
      if (months.length >= 2) {
        var improved = 0;
        data.members.forEach(function(m) {
          var prev = getMemberZoneAtMonth(m.id, months[months.length - 2]);
          var curr = getMemberZoneAtMonth(m.id, months[months.length - 1]);
          var zoneRank = { red: 0, yellow: 1, green: 2 };
          if (zoneRank[curr] > zoneRank[prev]) improved++;
        });
        momentumComponent = Math.round((improved / total) * 100);
      }

      var pulseScore = Math.round(stabilityComponent * 0.4 + momentumComponent * 0.3 + riskComponent * 0.3);
      var pulseClass = pulseScore >= 70 ? 'pulse-good' : pulseScore >= 40 ? 'pulse-moderate' : 'pulse-low';
      var pulseVerdict = pulseScore >= 70 ? 'Culture is healthy and trending well'
        : pulseScore >= 40 ? 'Some areas need attention — check coaching list'
        : 'Multiple risk signals — prioritize 1-on-1 conversations';

      pulseEl.innerHTML =
        '<div class="pulse-wrap">' +
          '<div class="pulse-score-ring ' + pulseClass + '">' +
            '<svg viewBox="0 0 120 120" class="pulse-svg">' +
              '<circle cx="60" cy="60" r="52" class="pulse-track"/>' +
              '<circle cx="60" cy="60" r="52" class="pulse-fill" style="stroke-dasharray:' + Math.round(326.7 * pulseScore / 100) + ' 326.7"/>' +
            '</svg>' +
            '<div class="pulse-number">' + pulseScore + '</div>' +
          '</div>' +
          '<div class="pulse-details">' +
            '<div class="pulse-verdict">' + pulseVerdict + '</div>' +
            '<div class="pulse-breakdown">' +
              '<div class="pulse-factor"><span class="pulse-factor-dot zone-green"></span>Strong ' + greenCount + '</div>' +
              '<div class="pulse-factor"><span class="pulse-factor-dot zone-orange"></span>Steady ' + yellowCount + '</div>' +
              '<div class="pulse-factor"><span class="pulse-factor-dot zone-red"></span>Weak ' + redCount + '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
  }

  // === Signal Activity Feed ===
  var activityEl = document.getElementById("dash-activity");
  if (activityEl) {
    if (data.flags.length === 0) {
      activityEl.innerHTML = '<div class="empty-state-sm">No signals recorded yet</div>';
    } else {
      var now = new Date();
      var memberMap = {};
      data.members.forEach(function(m) { memberMap[m.id] = m.name; });
      var weeks = [];
      for (var wi = 3; wi >= 0; wi--) {
        var weekDays = [];
        for (var di = 6; di >= 0; di--) {
          var d = new Date(now);
          d.setDate(d.getDate() - (wi * 7 + di));
          var dayKey = d.toISOString().split("T")[0];
          var gCount = 0, rCount = 0;
          var dayFlags = [];
          data.flags.forEach(function(f) {
            if (f.createdAt && f.createdAt.split("T")[0] === dayKey) {
              if (f.color === "green") gCount += f.count;
              else rCount += f.count;
              dayFlags.push(f);
            }
          });
          weekDays.push({ date: dayKey, day: d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0), green: gCount, red: rCount, total: gCount + rCount, flags: dayFlags });
        }
        weeks.push(weekDays);
      }

      var gridHtml = '<div class="activity-grid">';
      weeks.forEach(function(week) {
        week.forEach(function(day) {
          var level = day.total === 0 ? 'level-0' : day.total <= 2 ? 'level-1' : day.total <= 4 ? 'level-2' : 'level-3';
          var color = day.green > day.red ? 'activity-green' : day.red > day.green ? 'activity-red' : 'activity-neutral';
          if (day.total === 0) color = '';
          var _dd = new Date(day.date + "T12:00:00");
          var displayDate = String(_dd.getDate()).padStart(2,"0") + "-" + String(_dd.getMonth()+1).padStart(2,"0") + "-" + String(_dd.getFullYear()).slice(-2);
          var tipLines = ['<strong>' + displayDate + '</strong>'];
          if (day.total === 0) {
            tipLines.push('<span class="at-muted">No signals</span>');
          } else {
            tipLines.push('<span class="at-count">' + day.green + ' strong, ' + day.red + ' weak</span>');
            day.flags.forEach(function(f) {
              var mName = memberMap[f.memberId] || "Unknown";
              var sigType = f.color === "green" ? "&#x25B2;" : "&#x25BC;";
              var sigCls = f.color === "green" ? "at-strong" : "at-weak";
              var line = '<span class="' + sigCls + '">' + sigType + '</span> ' + mName;
              if (f.category) line += ' <span class="at-cat">' + f.category + '</span>';
              if (f.reason) line += ' &mdash; ' + f.reason;
              tipLines.push(line);
            });
          }
          gridHtml += '<div class="activity-cell ' + level + ' ' + color + '"><div class="activity-tip">' + tipLines.join('<br>') + '</div></div>';
        });
      });
      gridHtml += '</div>';

      // Summary line
      var thisWeekTotal = weeks[3].reduce(function(s, d) { return s + d.total; }, 0);
      var lastWeekTotal = weeks[2].reduce(function(s, d) { return s + d.total; }, 0);
      var weekDiff = thisWeekTotal - lastWeekTotal;
      var summaryText = thisWeekTotal + ' signals this week';
      if (lastWeekTotal > 0) summaryText += ' (' + (weekDiff >= 0 ? '+' : '') + weekDiff + ' vs last week)';

      activityEl.innerHTML = gridHtml +
        '<div class="activity-labels"><span>4 weeks ago</span><span>This week</span></div>' +
        '<div class="activity-summary">' + summaryText + '</div>';
    }
  }

  // === Top Performers ===
  var topEl = document.getElementById("dash-top-performers");
  if (topEl) {
    if (data.members.length === 0) {
      topEl.innerHTML = '<div class="empty-state-sm">No members yet</div>';
    } else {
      var memberScores = data.members.map(function(m) {
        var eff = getEffectiveFlags(m.id);
        var trend = getMemberTrend(m.id);
        var trendIcon = trend === "rising" ? icons.arrowUp : (trend === "falling" ? icons.arrowDown : icons.minus);
        var trendCls = trend === "rising" ? "trend-rising" : (trend === "falling" ? "trend-falling" : "trend-flat");
        return { id: m.id, name: m.name, net: eff.green - eff.red, green: eff.green, trend: trend, trendIcon: trendIcon, trendCls: trendCls };
      }).sort(function(a, b) { return b.net - a.net; });

      var top5 = memberScores.filter(function(m) { return m.net > 0; }).slice(0, 5);
      if (top5.length === 0) {
        topEl.innerHTML = '<div class="empty-state-sm">No positive contributors yet</div>';
      } else {
        var html = '';
        top5.forEach(function(m, i) {
          html += '<div class="dash-member-row clickable" onclick="showMemberFlags(\'' + m.id + '\')">' +
            '<span class="dash-rank">' + (i + 1) + '</span>' +
            '<span class="dash-member-name">' + escapeHtml(m.name) + ' <span class="trend-badge-sm ' + m.trendCls + '">' + m.trendIcon + '</span></span>' +
            '<span class="dash-member-score dash-score-positive">+' + m.net + '</span>' +
          '</div>';
        });
        topEl.innerHTML = html;
      }
    }
  }

  // === Needs Coaching ===
  var coachEl = document.getElementById("dash-needs-coaching");
  if (coachEl) {
    if (data.members.length === 0) {
      coachEl.innerHTML = '<div class="empty-state-sm">No members yet</div>';
    } else {
      var coachMembers = data.members.map(function(m) {
        var eff = getEffectiveFlags(m.id);
        var trend = getMemberTrend(m.id);
        var trendIcon = trend === "rising" ? icons.arrowUp : (trend === "falling" ? icons.arrowDown : icons.minus);
        var trendCls = trend === "rising" ? "trend-rising" : (trend === "falling" ? "trend-falling" : "trend-flat");
        var zone = getMemberZoneFiltered(m.id);
        return { id: m.id, name: m.name, net: eff.green - eff.red, red: eff.red, trend: trend, trendIcon: trendIcon, trendCls: trendCls, zone: zone };
      }).filter(function(m) { return m.net < 0 || m.zone === "red"; })
        .sort(function(a, b) { return a.net - b.net; })
        .slice(0, 5);

      if (coachMembers.length === 0) {
        coachEl.innerHTML = '<div class="empty-state-sm dash-empty-positive">No members need coaching — everyone is healthy</div>';
      } else {
        var html = '';
        coachMembers.forEach(function(m, i) {
          html += '<div class="dash-member-row clickable" onclick="showMemberFlags(\'' + m.id + '\')">' +
            '<span class="dash-rank dash-rank-red">' + (i + 1) + '</span>' +
            '<span class="dash-member-name">' + escapeHtml(m.name) + ' <span class="trend-badge-sm ' + m.trendCls + '">' + m.trendIcon + '</span></span>' +
            '<span class="dash-member-score dash-score-negative">' + m.net + '</span>' +
          '</div>';
        });
        coachEl.innerHTML = html;
      }
    }
  }

  // === Task Completion Quality Breakdown (Donut) ===
  var qualityEl = document.getElementById("dash-quality");
  if (qualityEl) {
    var completed = data.tasks.filter(function(t) { return t.status === "completed"; });
    if (completed.length === 0) {
      qualityEl.innerHTML = '<div class="empty-state-sm">No completed tasks yet</div>';
    } else {
      var qCounts = { extraordinary: 0, perfect: 0, none: 0, below: 0, blunder: 0 };
      completed.forEach(function(t) {
        var r = t.reviewResult || "none";
        if (qCounts[r] !== undefined) qCounts[r]++;
        else qCounts.none++;
      });
      var qTotal = completed.length;
      var segments = [
        { label: "Exceptional", count: qCounts.extraordinary, color: "#059669" },
        { label: "Excellent", count: qCounts.perfect, color: "#34D399" },
        { label: "No Signal", count: qCounts.none, color: "#9CA3AF" },
        { label: "Below", count: qCounts.below, color: "#F59E0B" },
        { label: "Blunder", count: qCounts.blunder, color: "#DC2626" }
      ];

      // SVG donut
      var donutR = 50, donutCx = 60, donutCy = 60, donutStroke = 20;
      var circumference = 2 * Math.PI * donutR;
      var offset = 0;
      var donutPaths = '';
      segments.forEach(function(seg) {
        if (seg.count === 0) return;
        var pct = seg.count / qTotal;
        var dashLen = circumference * pct;
        donutPaths += '<circle cx="' + donutCx + '" cy="' + donutCy + '" r="' + donutR + '" fill="none" stroke="' + seg.color + '" stroke-width="' + donutStroke + '" stroke-dasharray="' + dashLen.toFixed(1) + ' ' + (circumference - dashLen).toFixed(1) + '" stroke-dashoffset="-' + offset.toFixed(1) + '" />';
        offset += dashLen;
      });

      var legendHtml = '';
      segments.forEach(function(seg) {
        if (seg.count === 0) return;
        legendHtml += '<div class="donut-legend-item"><span class="donut-legend-dot" style="background:' + seg.color + '"></span>' + seg.label + ' <strong>' + seg.count + '</strong> (' + Math.round((seg.count / qTotal) * 100) + '%)</div>';
      });

      var excellentPct = Math.round(((qCounts.extraordinary + qCounts.perfect) / qTotal) * 100);
      qualityEl.innerHTML =
        '<div class="donut-wrap">' +
          '<div class="donut-chart"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="#F3F4F6" stroke-width="20"/>' + donutPaths + '</svg><div class="donut-center"><span class="donut-center-val">' + excellentPct + '%</span><span class="donut-center-label">excellent</span></div></div>' +
          '<div class="donut-legend">' + legendHtml + '</div>' +
        '</div>';
    }
  }

  // === Category Heatmap ===
  var catHeatEl = document.getElementById("dash-cat-heatmap");
  if (catHeatEl) {
    var months = getActiveMonths();
    var last3Months = months.slice(-3);
    if (last3Months.length === 0 || data.categories.length === 0) {
      catHeatEl.innerHTML = '<div class="empty-state-sm">Need categories and signal data</div>';
    } else {
      var catGrid = {};
      data.categories.forEach(function(cat) { catGrid[cat.id] = {}; last3Months.forEach(function(mk) { catGrid[cat.id][mk] = 0; }); });
      data.flags.forEach(function(f) {
        if (!f.category || !catGrid[f.category]) return;
        var mk = getMonthKey(f.createdAt);
        if (catGrid[f.category][mk] !== undefined) catGrid[f.category][mk] += f.count;
      });

      var maxVal = 1;
      data.categories.forEach(function(cat) {
        last3Months.forEach(function(mk) {
          if (catGrid[cat.id][mk] > maxVal) maxVal = catGrid[cat.id][mk];
        });
      });

      var html = '<table class="cat-heat-table"><thead><tr><th></th>';
      last3Months.forEach(function(mk) { html += '<th>' + getMonthLabel(mk) + '</th>'; });
      html += '</tr></thead><tbody>';
      data.categories.forEach(function(cat) {
        html += '<tr><td class="cat-heat-name">' + escapeHtml(cat.name) + '</td>';
        last3Months.forEach(function(mk) {
          var val = catGrid[cat.id][mk];
          var intensity = val === 0 ? 0 : Math.max(1, Math.round((val / maxVal) * 4));
          html += '<td class="cat-heat-cell cat-heat-' + intensity + '">' + (val > 0 ? val : '') + '</td>';
        });
        html += '</tr>';
      });
      html += '</tbody></table>';
      catHeatEl.innerHTML = html;
    }
  }

  // === Department Comparison Bars ===
  var deptCompEl = document.getElementById("dash-dept-compare");
  if (deptCompEl) {
    if (data.roles.length === 0) {
      deptCompEl.innerHTML = '<div class="empty-state-sm">No departments defined</div>';
    } else {
      var deptScores = [];
      data.roles.forEach(function(role) {
        var roleMembers = data.members.filter(function(m) { return m.roleId === role.id; });
        if (roleMembers.length === 0) return;
        var totalNet = 0;
        roleMembers.forEach(function(m) {
          var f = getMemberFlagsFiltered(m.id);
          totalNet += (f.green - f.red);
        });
        var avg = totalNet / roleMembers.length;
        deptScores.push({ name: role.name, avg: avg, count: roleMembers.length });
      });
      deptScores.sort(function(a, b) { return b.avg - a.avg; });

      var maxAbs = Math.max.apply(null, deptScores.map(function(d) { return Math.abs(d.avg); })) || 1;
      var html = '';
      deptScores.forEach(function(d) {
        var pct = Math.round((Math.abs(d.avg) / maxAbs) * 100);
        var barClass = d.avg >= 0 ? 'dept-bar-positive' : 'dept-bar-negative';
        html += '<div class="dept-bar-row">' +
          '<span class="dept-bar-name">' + escapeHtml(d.name) + ' <span class="dept-bar-count">(' + d.count + ')</span></span>' +
          '<div class="dept-bar-track"><div class="dept-bar-fill ' + barClass + '" style="width:' + pct + '%"></div></div>' +
          '<span class="dept-bar-val ' + (d.avg >= 0 ? 'dash-score-positive' : 'dash-score-negative') + '">' + (d.avg >= 0 ? '+' : '') + d.avg.toFixed(1) + '</span>' +
        '</div>';
      });
      deptCompEl.innerHTML = html || '<div class="empty-state-sm">No data yet</div>';
    }
  }

  // === Blunder / Incident Tracker ===
  var blunderEl = document.getElementById("dash-blunder-tracker");
  if (blunderEl) {
    var months = getActiveMonths();
    var currentMonth = months.length > 0 ? months[months.length - 1] : getMonthKey(new Date().toISOString());
    var prevMonth = months.length > 1 ? months[months.length - 2] : null;

    var curBlunders = 0, prevBlunders = 0;
    var catCounts = {};
    data.flags.forEach(function(f) {
      if (f.color !== "red") return;
      var mk = getMonthKey(f.createdAt);
      if (mk === currentMonth) {
        curBlunders += f.count;
        if (f.category) catCounts[f.category] = (catCounts[f.category] || 0) + f.count;
      }
      if (mk === prevMonth) prevBlunders += f.count;
    });

    var topCat = null;
    var topCatCount = 0;
    Object.keys(catCounts).forEach(function(c) {
      if (catCounts[c] > topCatCount) { topCat = c; topCatCount = catCounts[c]; }
    });

    var diff = curBlunders - prevBlunders;
    var diffClass = diff > 0 ? 'dash-score-negative' : diff < 0 ? 'dash-score-positive' : '';
    var diffText = prevMonth ? (diff >= 0 ? '+' : '') + diff + ' vs ' + getMonthLabel(prevMonth) : '';

    blunderEl.innerHTML =
      '<div class="blunder-stats">' +
        '<div class="blunder-stat-main">' +
          '<span class="blunder-stat-val">' + curBlunders + '</span>' +
          '<span class="blunder-stat-label">weak signals this month</span>' +
          (diffText ? '<span class="blunder-stat-diff ' + diffClass + '">' + diffText + '</span>' : '') +
        '</div>' +
        '<div class="blunder-stat-cat">' +
          '<span class="blunder-cat-label">Top Category</span>' +
          '<span class="blunder-cat-val">' + (topCat ? getCategoryLabel(topCat) : 'None') + '</span>' +
          (topCatCount > 0 ? '<span class="blunder-cat-count">' + topCatCount + ' signals</span>' : '') +
        '</div>' +
      '</div>';
  }

  // === Recovery Watchlist ===
  var recoveryEl = document.getElementById("dash-recovery");
  if (recoveryEl) {
    if (data.members.length === 0) {
      recoveryEl.innerHTML = '<div class="empty-state-sm">No members yet</div>';
    } else {
      var months = getActiveMonths();
      var recoveredMembers = [];
      var closeToRecovery = [];

      data.members.forEach(function(m) {
        var eff = getEffectiveFlags(m.id);
        var mFlags = data.flags.filter(function(f) { return f.memberId === m.id && f.color === "red"; });
        if (mFlags.length === 0) return;

        // Check consecutive clean months (no red flags)
        var cleanMonths = 0;
        for (var i = months.length - 1; i >= 0; i--) {
          var hasRed = data.flags.some(function(f) {
            return f.memberId === m.id && f.color === "red" && getMonthKey(f.createdAt) === months[i];
          });
          if (!hasRed) cleanMonths++;
          else break;
        }

        if (eff.decayActive) {
          recoveredMembers.push({ id: m.id, name: m.name, cleanMonths: cleanMonths, net: eff.green - eff.red });
        } else if (cleanMonths === 1 && mFlags.length > 0) {
          closeToRecovery.push({ id: m.id, name: m.name, cleanMonths: cleanMonths, net: eff.green - eff.red });
        }
      });

      if (recoveredMembers.length === 0 && closeToRecovery.length === 0) {
        recoveryEl.innerHTML = '<div class="empty-state-sm">No recovery activity</div>';
      } else {
        var html = '';
        if (closeToRecovery.length > 0) {
          html += '<div class="recovery-group"><div class="recovery-group-title">1 More Clean Month to Recover</div>';
          closeToRecovery.forEach(function(m) {
            html += '<div class="dash-member-row clickable" onclick="showMemberFlags(\'' + m.id + '\')">' +
              '<span class="recovery-icon recovery-almost">1</span>' +
              '<span class="dash-member-name">' + escapeHtml(m.name) + '</span>' +
              '<span class="dash-member-score">' + (m.net >= 0 ? '+' : '') + m.net + '</span>' +
            '</div>';
          });
          html += '</div>';
        }
        if (recoveredMembers.length > 0) {
          html += '<div class="recovery-group"><div class="recovery-group-title recovery-title-active">Recovery Active (-50%)</div>';
          recoveredMembers.forEach(function(m) {
            html += '<div class="dash-member-row clickable" onclick="showMemberFlags(\'' + m.id + '\')">' +
              '<span class="recovery-icon recovery-active">-50%</span>' +
              '<span class="dash-member-name">' + escapeHtml(m.name) + '</span>' +
              '<span class="dash-member-score dash-score-positive">' + (m.net >= 0 ? '+' : '') + m.net + '</span>' +
            '</div>';
          });
          html += '</div>';
        }
        recoveryEl.innerHTML = html;
      }
    }
  }

  // === Zone Movement Trend ===
  var trendEl = document.getElementById("dashboard-trend");
  if (trendEl) {
    var months = getActiveMonths();
    if (months.length < 2 || data.members.length === 0) {
      trendEl.innerHTML = '<div class="empty-state-sm">Need at least 2 months of flag data for trends</div>';
    } else {
      // Calculate movement between last two months
      var prevMonth = months[months.length - 2];
      var currMonth = months[months.length - 1];
      var improved = 0, declined = 0, stable = 0;
      var zoneRank = { red: 0, yellow: 1, green: 2 };

      data.members.forEach(function(m) {
        var prev = getMemberZoneAtMonth(m.id, prevMonth);
        var curr = getMemberZoneAtMonth(m.id, currMonth);
        if (zoneRank[curr] > zoneRank[prev]) improved++;
        else if (zoneRank[curr] < zoneRank[prev]) declined++;
        else stable++;
      });

      var mTotal = data.members.length;
      var iPct = Math.round((improved / mTotal) * 100);
      var dPct = Math.round((declined / mTotal) * 100);
      var sPct = Math.round((stable / mTotal) * 100);

      // Build vertical bar chart (last up to 6 months)
      var chartMonths = months.slice(-6);
      var tot = data.members.length;
      var chartCols = '';
      chartMonths.forEach(function(mo) {
        var g = 0, y = 0, r = 0;
        data.members.forEach(function(m) {
          var z = getMemberZoneAtMonth(m.id, mo);
          if (z === "green") g++;
          else if (z === "red") r++;
          else y++;
        });
        var gPct = Math.round((g / tot) * 100);
        var yPct = Math.round((y / tot) * 100);
        var rPct = Math.round((r / tot) * 100);
        chartCols +=
          '<div class="vbar-col">' +
            '<div class="vbar-stack">' +
              (rPct > 0 ? '<div class="vbar-seg vbar-red" style="height:' + rPct + '%" title="Weak ' + rPct + '%"><span class="vbar-val">' + rPct + '%</span></div>' : '') +
              (yPct > 0 ? '<div class="vbar-seg vbar-orange" style="height:' + yPct + '%" title="Steady ' + yPct + '%"><span class="vbar-val">' + yPct + '%</span></div>' : '') +
              (gPct > 0 ? '<div class="vbar-seg vbar-green" style="height:' + gPct + '%" title="Strong ' + gPct + '%"><span class="vbar-val">' + gPct + '%</span></div>' : '') +
            '</div>' +
            '<span class="vbar-label">' + getMonthLabel(mo) + '</span>' +
          '</div>';
      });

      trendEl.innerHTML =
        '<div class="vbar-chart">' + chartCols + '</div>' +
        '<div class="vbar-legend">' +
          '<span class="vbar-legend-item"><span class="vbar-legend-dot vbar-green"></span>Strong</span>' +
          '<span class="vbar-legend-item"><span class="vbar-legend-dot vbar-orange"></span>Steady</span>' +
          '<span class="vbar-legend-item"><span class="vbar-legend-dot vbar-red"></span>Weak</span>' +
        '</div>';
    }
  }

  // === Member Flag Status (with Zone Tabs) ===
  var flagStatusEl = document.getElementById("dashboard-flag-status");
  if (flagStatusEl) {
    if (data.members.length === 0) {
      flagStatusEl.innerHTML = '<div class="empty-state-sm">No members yet</div>';
    } else {
      var memberFlagData = data.members.map(function(m) {
        var flags = getMemberFlagsFiltered(m.id);
        var eff = getEffectiveFlags(m.id);
        var effNet = eff.green - eff.red;
        var zone = getMemberZoneFiltered(m.id);
        return { member: m, green: flags.green, red: flags.red, net: flags.green - flags.red, effNet: effNet, decayActive: eff.decayActive, zone: zone };
      }).sort(function(a, b) { return b.effNet - a.effNet; });

      var greenMembers = memberFlagData.filter(function(mf) { return mf.zone === "green"; });
      var orangeMembers = memberFlagData.filter(function(mf) { return mf.zone === "yellow"; });
      var redMembers = memberFlagData.filter(function(mf) { return mf.zone === "red"; }).sort(function(a, b) { return a.effNet - b.effNet; });

      var activeTab = (flagStatusEl.dataset.activeTab) || "green";

      var tabsHtml =
        '<div class="signal-board-tabs">' +
          '<button class="signal-tab signal-tab-green' + (activeTab === "green" ? " active" : "") + '" onclick="switchSignalTab(\'green\')">' +
            '<span class="signal-tab-dot zone-green"></span> Strong <span class="signal-tab-count">' + greenMembers.length + '</span>' +
          '</button>' +
          '<button class="signal-tab signal-tab-orange' + (activeTab === "orange" ? " active" : "") + '" onclick="switchSignalTab(\'orange\')">' +
            '<span class="signal-tab-dot zone-orange"></span> Steady <span class="signal-tab-count">' + orangeMembers.length + '</span>' +
          '</button>' +
          '<button class="signal-tab signal-tab-red' + (activeTab === "red" ? " active" : "") + '" onclick="switchSignalTab(\'red\')">' +
            '<span class="signal-tab-dot zone-red"></span> Weak <span class="signal-tab-count">' + redMembers.length + '</span>' +
          '</button>' +
        '</div>';

      var tabMembers = activeTab === "red" ? redMembers : (activeTab === "orange" ? orangeMembers : greenMembers);

      var listHtml = '';
      if (tabMembers.length === 0) {
        listHtml = '<div class="empty-state-sm">No members in this zone</div>';
      } else {
        tabMembers.forEach(function(mf) {
          var initials = mf.member.name.split(" ").map(function(n) { return n[0]; }).join("").toUpperCase().substring(0, 2);
          var role = data.roles.find(function(r) { return r.id === mf.member.roleId; });
          var roleColor = role ? role.color : "blue";
          var netClass = mf.effNet > 0 ? "green" : (mf.effNet < 0 ? "red" : "neutral");
          var alertCls = isRedAlert(mf.member.id) ? " alert-item" : "";
          var warnCls = getMonthlyRedWarning(mf.member.id) ? " monthly-warn-item" : "";
          var trend = getMemberTrend(mf.member.id);
          var trendIcon = trend === "rising" ? icons.arrowUp : (trend === "falling" ? icons.arrowDown : icons.minus);
          var trendCls = trend === "rising" ? "trend-rising" : (trend === "falling" ? "trend-falling" : "trend-flat");

          listHtml +=
            '<div class="dashboard-list-item clickable' + alertCls + warnCls + '" onclick="showMemberFlags(\'' + mf.member.id + '\')">' +
              '<div class="avatar avatar-sm ' + roleColor + '">' + initials + '</div>' +
              '<div class="dashboard-item-info">' +
                '<span class="dashboard-item-name">' + escapeHtml(mf.member.name) +
                  ' <span class="trend-badge-sm ' + trendCls + '">' + trendIcon + '</span>' +
                  (isRedAlert(mf.member.id) ? ' <span class="red-alert-badge-sm">SUPPORT</span>' : '') +
                  (getMonthlyRedWarning(mf.member.id) ? ' <span class="monthly-warning-badge-sm">ATTN</span>' : '') +
                  (mf.decayActive ? ' <span class="decay-badge-sm">-50%</span>' : '') +
                '</span>' +
                '<span class="dashboard-item-detail">' + (role ? escapeHtml(role.name) : "No Role") + '</span>' +
              '</div>' +
              '<div class="dashboard-flag-chips">' +
                '<span class="flag-chip flag-chip-green">' + icons.dot + ' ' + mf.green + '</span>' +
                '<span class="flag-chip flag-chip-red">' + icons.dot + ' ' + mf.red + '</span>' +
                '<span class="flag-chip flag-chip-net ' + netClass + '">' + (mf.effNet > 0 ? '+' : '') + mf.effNet + '</span>' +
              '</div>' +
            '</div>';
        });
      }

      flagStatusEl.dataset.activeTab = activeTab;
      flagStatusEl.innerHTML = tabsHtml + '<div class="signal-board-list">' + listHtml + '</div>';
    }
  }

  // === Attention Board (Important+Past Due first, max 5 collapsed) ===
  var overdueEl = document.getElementById("dashboard-overdue");
  var viewMoreBtn = document.getElementById("attn-view-more-btn");
  if (overdueEl) {
    var overdueTasks = filteredTasks.filter(function(t) { return isOverdue(t); });
    if (viewMoreBtn) viewMoreBtn.style.display = "none";

    if (overdueTasks.length === 0) {
      overdueEl.innerHTML = '<div class="empty-state-sm">No tasks need attention</div>';
    } else {
      // Sort: Important + Past Due first, then other past due
      overdueTasks.sort(function(a, b) {
        var aImp = a.weightage === "important" ? 0 : 1;
        var bImp = b.weightage === "important" ? 0 : 1;
        if (aImp !== bImp) return aImp - bImp;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

      var attnLimit = 5;
      var isExpanded = overdueEl.dataset.expanded === "true";
      var visibleTasks = isExpanded ? overdueTasks : overdueTasks.slice(0, attnLimit);

      // Show View More button if more than 5
      if (overdueTasks.length > attnLimit && viewMoreBtn) {
        viewMoreBtn.style.display = "";
        viewMoreBtn.textContent = isExpanded
          ? "View Less"
          : "View More (" + (overdueTasks.length - attnLimit) + ")";
      }

      overdueEl.innerHTML = "";
      visibleTasks.forEach(function(task) {
        var assignee = data.members.find(function(m) { return m.id === task.assigneeId; });
        var isImportant = task.weightage === "important";
        var item = document.createElement("div");
        item.className = "dashboard-list-item" + (isImportant ? " attn-important-item" : "");
        item.innerHTML =
          (isImportant ? '<div class="attn-icon-wrap"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>' : '') +
          '<div class="dashboard-item-info">' +
            '<span class="dashboard-item-name overdue-text">' + escapeHtml(task.title) +
              (isImportant ? ' <span class="attn-important-tag">Important</span>' : '') +
            '</span>' +
            '<span class="dashboard-item-detail">' + (assignee ? escapeHtml(assignee.name) : "Unassigned") + ' — Due ' + formatDate(task.dueDate) + '</span>' +
          '</div>' +
          '<span class="status-badge status-overdue">Past Due</span>';
        overdueEl.appendChild(item);
      });
    }
  }
}

function toggleAttentionBoard() {
  var el = document.getElementById("dashboard-overdue");
  if (!el) return;
  el.dataset.expanded = el.dataset.expanded === "true" ? "false" : "true";
  renderDashboard();
}

// ==================== Predictive Insights ====================

function switchSignalTab(tab) {
  var el = document.getElementById("dashboard-flag-status");
  if (el) {
    el.dataset.activeTab = tab;
    renderDashboard();
  }
}

function renderPredictiveInsights() {
  var el = document.getElementById("insights-content");
  if (!el) return;
  if (data.members.length === 0) {
    el.innerHTML = '<div class="insights-empty">Add team members and signals to generate insights</div>';
    return;
  }

  var insights = [];
  var now = new Date();

  // =============================================
  // TIER 1: Task Performance Analytics per member
  // =============================================
  var memberProfiles = data.members.map(function(m) {
    var memberTasks = data.tasks.filter(function(t) { return t.assigneeId === m.id; });
    var completedTasks = memberTasks.filter(function(t) { return t.status === "completed"; });
    var activeTasks = memberTasks.filter(function(t) {
      return t.status !== "completed" && t.status !== "cancelled";
    });
    var overdueTasks = memberTasks.filter(function(t) { return isOverdue(t); });

    // On-time analysis
    var onTime = 0, late = 0, early = 0;
    completedTasks.forEach(function(t) {
      if (!t.dueDate) return;
      var dueDate = new Date(t.dueDate + "T23:59:59");
      // Estimate completion date from flags or use due date
      var completionFlags = data.flags.filter(function(f) {
        return f.taskId === t.id && f.color === "green";
      });
      if (completionFlags.length > 0) {
        var completedDate = new Date(completionFlags[0].createdAt);
        if (completedDate <= dueDate) {
          var daysBefore = Math.floor((dueDate - completedDate) / 86400000);
          if (daysBefore >= 2) early++;
          else onTime++;
        } else {
          late++;
        }
      } else {
        onTime++; // Assume on-time if no tracking data
      }
    });

    // Review quality breakdown
    var reviews = { extraordinary: 0, perfect: 0, acceptable: 0, below: 0, blunder: 0 };
    completedTasks.forEach(function(t) {
      if (t.reviewResult && reviews.hasOwnProperty(t.reviewResult)) {
        reviews[t.reviewResult]++;
      }
    });
    var totalReviewed = reviews.extraordinary + reviews.perfect + reviews.acceptable + reviews.below + reviews.blunder;
    var goodReviews = reviews.extraordinary + reviews.perfect;
    var badReviews = reviews.below + reviews.blunder;
    var qualityRate = totalReviewed > 0 ? Math.round((goodReviews / totalReviewed) * 100) : -1;

    // Important task performance
    var importantTasks = memberTasks.filter(function(t) { return t.weightage === "important"; });
    var importantCompleted = importantTasks.filter(function(t) { return t.status === "completed"; });
    var importantGood = importantCompleted.filter(function(t) {
      return t.reviewResult === "perfect" || t.reviewResult === "extraordinary";
    });
    var importantBad = importantCompleted.filter(function(t) {
      return t.reviewResult === "below" || t.reviewResult === "blunder";
    });

    // Category analysis via linked flags
    var catPerformance = {};
    data.flags.filter(function(f) { return f.memberId === m.id; }).forEach(function(f) {
      var cat = f.category || "";
      if (!cat && f.taskId) {
        // Try to infer category from task
        var linkedTask = data.tasks.find(function(t) { return t.id === f.taskId; });
        if (linkedTask) cat = "task-linked";
      }
      if (!cat) cat = "general";
      if (!catPerformance[cat]) catPerformance[cat] = { green: 0, red: 0, taskTitles: [] };
      if (f.color === "green") catPerformance[cat].green += f.count;
      else catPerformance[cat].red += f.count;
      if (f.taskId) {
        var t = data.tasks.find(function(t2) { return t2.id === f.taskId; });
        if (t && catPerformance[cat].taskTitles.indexOf(t.title) === -1) {
          catPerformance[cat].taskTitles.push(t.title);
        }
      }
    });

    // Find failed task titles (below/blunder reviews)
    var failedTasks = completedTasks.filter(function(t) {
      return t.reviewResult === "below" || t.reviewResult === "blunder";
    });
    var excellentTasks = completedTasks.filter(function(t) {
      return t.reviewResult === "perfect" || t.reviewResult === "extraordinary";
    });

    // Signals and zone
    var flags = getMemberFlags(m.id);
    var eff = getEffectiveFlags(m.id);
    var trend = getMemberTrend(m.id);
    var zone = getMemberZone(m.id);
    var role = data.roles.find(function(r) { return r.id === m.roleId; });

    return {
      member: m,
      role: role,
      roleName: role ? role.name : "Unassigned",
      memberTasks: memberTasks,
      completedTasks: completedTasks,
      activeTasks: activeTasks,
      overdueTasks: overdueTasks,
      onTime: onTime,
      late: late,
      early: early,
      reviews: reviews,
      totalReviewed: totalReviewed,
      goodReviews: goodReviews,
      badReviews: badReviews,
      qualityRate: qualityRate,
      importantTasks: importantTasks,
      importantGood: importantGood,
      importantBad: importantBad,
      catPerformance: catPerformance,
      failedTasks: failedTasks,
      excellentTasks: excellentTasks,
      green: flags.green,
      red: flags.red,
      effNet: eff.green - eff.red,
      trend: trend,
      zone: zone,
      redAlert: isRedAlert(m.id),
      decayActive: eff.decayActive,
      hasLeadership: data.flags.some(function(f) {
        return f.memberId === m.id && f.reason && f.reason.indexOf("Leadership") !== -1;
      })
    };
  });

  // =============================================
  // TIER 2: Signal-Task Correlation Engine
  // =============================================

  memberProfiles.forEach(function(mp) {
    var name = escapeHtml(mp.member.name);
    var totalTasks = mp.completedTasks.length;
    var onTimePct = totalTasks > 0 ? Math.round(((mp.onTime + mp.early) / totalTasks) * 100) : -1;
    var dataPoints = totalTasks + mp.green + mp.red;
    var confidence = dataPoints >= 8 ? "High" : (dataPoints >= 4 ? "Med" : "Low");
    var confClass = confidence === "High" ? "high" : (confidence === "Med" ? "med" : "low");

    // =============================================
    // TIER 3: Predictive Suggestions
    // =============================================

    // --- 1. TASK PERFORMANCE ALERT ---
    // Members with bad review rate or high late delivery
    if (mp.badReviews >= 2 && mp.totalReviewed >= 3) {
      var badPct = Math.round((mp.badReviews / mp.totalReviewed) * 100);
      var failedNames = mp.failedTasks.slice(0, 3).map(function(t) { return t.title; });
      var patternText = mp.badReviews + " of " + mp.totalReviewed + " reviewed tasks rated below expectation (" + badPct + "%)";
      var evidenceText = "Failed: " + failedNames.join(", ");
      var trendText = mp.trend === "falling" ? "Declining — was " + (mp.zone === "red" ? "already" : "moving toward") + " weak zone" :
                      (mp.trend === "rising" ? "Improving — trajectory is positive despite past failures" : "Steady — pattern is persisting without change");
      var actionText = mp.badReviews >= 3
        ? "Schedule a focused 1:1 this week. Ask about blockers and skill gaps — not performance. Consider pairing with a mentor for the next 2 tasks."
        : "Review the failed tasks together. Identify if this is a skill gap, resource issue, or unclear expectations. Adjust task assignment accordingly.";

      insights.push({
        type: "alert",
        tag: "Task Performance Alert",
        memberName: name,
        pattern: patternText,
        evidence: evidenceText,
        trendLine: trendText,
        action: actionText,
        confidence: confidence,
        confClass: confClass,
        priority: mp.badReviews >= 3 ? 1 : 2,
        zone: mp.zone
      });
    }

    // --- 2. OVERLOAD WARNING ---
    // Too many active tasks OR active + overdue combination
    if (mp.activeTasks.length >= 4 || (mp.activeTasks.length >= 3 && mp.overdueTasks.length >= 1)) {
      var importantActive = mp.activeTasks.filter(function(t) { return t.weightage === "important"; }).length;
      var patternText2 = mp.activeTasks.length + " active tasks" +
        (mp.overdueTasks.length > 0 ? " (" + mp.overdueTasks.length + " past due)" : "") +
        (importantActive > 0 ? " — " + importantActive + " marked Important" : "");
      var evidenceText2 = "Active: " + mp.activeTasks.slice(0, 3).map(function(t) { return t.title; }).join(", ");
      var trendText2 = mp.trend === "falling"
        ? "Performance declining — overload may be the root cause"
        : "Currently stable but workload exceeds sustainable threshold";

      insights.push({
        type: "overload",
        tag: "Overload Warning",
        memberName: name,
        pattern: patternText2,
        evidence: evidenceText2,
        trendLine: trendText2,
        action: "Redistribute " + (mp.overdueTasks.length > 0 ? "the past-due tasks immediately" : "at least 1 task") +
          ". Prioritize the Important items and defer or reassign the rest. Check in to prevent burnout.",
        confidence: confidence,
        confClass: confClass,
        priority: mp.overdueTasks.length >= 2 ? 1 : 3,
        zone: mp.zone
      });
    }

    // --- 3. SKILL GAP DETECTED ---
    // Repeated weak signals in same category
    Object.keys(mp.catPerformance).forEach(function(cat) {
      var cp = mp.catPerformance[cat];
      if (cp.red >= 2 && cat !== "general" && cat !== "task-linked") {
        var catLabel = getCategoryLabel(cat);
        var ratio = cp.green > 0 ? (cp.green + " green / " + cp.red + " red") : (cp.red + " weak signals, 0 green");
        var taskContext = cp.taskTitles.length > 0 ? "Related: " + cp.taskTitles.slice(0, 2).join(", ") : "";

        insights.push({
          type: "skillgap",
          tag: "Skill Gap Detected",
          memberName: name,
          pattern: cp.red + " weak signals in " + catLabel + " category",
          evidence: ratio + (taskContext ? ". " + taskContext : ""),
          trendLine: "Repeated pattern suggests a structural gap, not a one-time issue",
          action: "Invest in targeted " + catLabel.toLowerCase() + " training or pair with someone strong in this area. Reduce " + catLabel.toLowerCase() + "-heavy assignments until skills develop.",
          confidence: cp.red >= 3 ? "High" : "Med",
          confClass: cp.red >= 3 ? "high" : "med",
          priority: cp.red >= 3 ? 2 : 4,
          zone: mp.zone
        });
      }
    });

    // --- 4. RISING STAR ---
    // Consistent excellent reviews + green zone
    if (mp.goodReviews >= 3 && mp.qualityRate >= 70 && mp.zone === "green") {
      var starTasks = mp.excellentTasks.slice(0, 3).map(function(t) {
        return t.title + (t.reviewResult === "extraordinary" ? " (Extraordinary)" : "");
      });

      insights.push({
        type: "star",
        tag: "Rising Star",
        memberName: name,
        pattern: mp.goodReviews + " of " + mp.totalReviewed + " tasks rated Perfect or Extraordinary (" + mp.qualityRate + "% quality)",
        evidence: "Excelled at: " + starTasks.join(", "),
        trendLine: mp.trend === "rising" ? "Accelerating — consistently improving over time" :
                  (mp.trend === "flat" ? "Steady excellence — reliable high performer" : "Watch closely — slight dip in an otherwise strong performer"),
        action: mp.hasLeadership
          ? "Already recognized as a leader. Consider expanded scope — cross-team mentorship, tech lead role, or ownership of a key initiative."
          : "Recognize publicly. Consider for leadership development, mentorship pairing, or ownership of higher-impact projects.",
        confidence: confidence,
        confClass: confClass,
        priority: 3,
        zone: mp.zone
      });
    }

    // --- 5. BURNOUT RISK ---
    // High performer (green zone) with too many tasks
    if (mp.zone === "green" && mp.effNet >= 2 && mp.activeTasks.length >= 3) {
      insights.push({
        type: "burnout",
        tag: "Burnout Risk",
        memberName: name,
        pattern: "High performer (net +" + mp.effNet + ") carrying " + mp.activeTasks.length + " active tasks",
        evidence: mp.activeTasks.slice(0, 3).map(function(t) { return t.title; }).join(", "),
        trendLine: mp.trend === "falling"
          ? "Already showing signs of decline — act now before it accelerates"
          : "Currently stable but workload is unsustainable long-term",
        action: "High performers leave when overloaded and under-recognized. Rebalance workload to " +
          Math.max(1, mp.activeTasks.length - 2) + " tasks. Acknowledge their contributions publicly.",
        confidence: confidence,
        confClass: confClass,
        priority: mp.trend === "falling" ? 2 : 4,
        zone: mp.zone
      });
    }

    // --- 6. IMPORTANT TASK FAILURE ---
    // Failed important tasks specifically
    if (mp.importantBad.length >= 1) {
      var impFailedNames = mp.importantBad.map(function(t) { return t.title; });
      insights.push({
        type: "alert",
        tag: "Important Task Failure",
        memberName: name,
        pattern: mp.importantBad.length + " Important-weighted task" + (mp.importantBad.length > 1 ? "s" : "") + " rated below expectation",
        evidence: "Failed: " + impFailedNames.join(", "),
        trendLine: mp.zone === "red"
          ? "In weak zone — Important task failures compound the concern"
          : "Zone is " + mp.zone + " but Important tasks demand higher scrutiny",
        action: "Important tasks reflect business-critical work. Review what went wrong in a blameless post-mortem. Ensure this person has adequate support and clarity before the next high-stakes assignment.",
        confidence: "High",
        confClass: "high",
        priority: 1,
        zone: mp.zone
      });
    }

    // --- 7. RECOVERY OPPORTUNITY ---
    // Red/orange zone but trend is rising, or decay active with positive net
    if ((mp.zone === "red" || mp.zone === "yellow") && (mp.trend === "rising" || mp.decayActive) && mp.effNet >= -1) {
      var recentGood = mp.excellentTasks.filter(function(t) {
        return t.createdAt && (now - new Date(t.createdAt)) / 86400000 < 90;
      });

      insights.push({
        type: "recovery",
        tag: "Recovery In Progress",
        memberName: name,
        pattern: "Zone: " + mp.zone + " but trajectory is improving (net " + (mp.effNet >= 0 ? "+" : "") + mp.effNet + ")",
        evidence: recentGood.length > 0
          ? "Recent wins: " + recentGood.slice(0, 2).map(function(t) { return t.title; }).join(", ")
          : (mp.decayActive ? "Signal recovery active — old weak signals losing weight" : "Trend shifting positive"),
        trendLine: "This person is turning things around. Momentum is fragile at this stage.",
        action: "Acknowledge the improvement explicitly. Assign 1 winnable task to build confidence. Avoid heavy criticism — reinforce the positive trajectory.",
        confidence: confidence,
        confClass: confClass,
        priority: 3,
        zone: mp.zone
      });
    }

    // --- 8. CATEGORY STRENGTH ---
    // Person excels in a specific category
    Object.keys(mp.catPerformance).forEach(function(cat) {
      var cp = mp.catPerformance[cat];
      if (cp.green >= 3 && cp.red === 0 && cat !== "general" && cat !== "task-linked") {
        var catLabel = getCategoryLabel(cat);
        insights.push({
          type: "strength",
          tag: "Category Strength",
          memberName: name,
          pattern: cp.green + " strong signals in " + catLabel + " with zero red",
          evidence: cp.taskTitles.length > 0 ? "Tasks: " + cp.taskTitles.slice(0, 2).join(", ") : "Consistent excellence in " + catLabel,
          trendLine: "Reliable strength area — leverage for high-impact " + catLabel.toLowerCase() + " work",
          action: "Route " + catLabel.toLowerCase() + "-heavy tasks to " + name + ". Consider them as a subject-matter mentor for teammates struggling in this category.",
          confidence: cp.green >= 4 ? "High" : "Med",
          confClass: cp.green >= 4 ? "high" : "med",
          priority: 5,
          zone: mp.zone
        });
      }
    });
  });

  // --- 9. TEAM/DEPARTMENT PATTERNS ---
  data.roles.forEach(function(role) {
    var teamMembers = memberProfiles.filter(function(mp) { return mp.member.roleId === role.id; });
    if (teamMembers.length < 2) return;

    // Team on-time rate
    var teamCompleted = 0, teamOnTime = 0, teamBad = 0, teamGood = 0;
    var teamRedCount = 0;
    teamMembers.forEach(function(mp) {
      teamCompleted += mp.completedTasks.length;
      teamOnTime += mp.onTime + mp.early;
      teamBad += mp.badReviews;
      teamGood += mp.goodReviews;
      if (mp.zone === "red") teamRedCount++;
    });

    var teamOnTimePct = teamCompleted > 0 ? Math.round((teamOnTime / teamCompleted) * 100) : -1;
    var teamQualityPct = (teamBad + teamGood) > 0 ? Math.round((teamGood / (teamBad + teamGood)) * 100) : -1;
    var teamRedPct = Math.round((teamRedCount / teamMembers.length) * 100);

    // Underperforming department
    if (teamQualityPct !== -1 && (teamQualityPct < 50 || teamRedPct >= 50)) {
      var worstMembers = teamMembers.filter(function(mp) { return mp.zone === "red"; })
        .map(function(mp) { return mp.member.name; });

      insights.push({
        type: "department",
        tag: "Department Needs Attention",
        memberName: escapeHtml(role.name) + " Team",
        pattern: "Quality rate: " + teamQualityPct + "%" +
          (teamOnTimePct !== -1 ? " | On-time: " + teamOnTimePct + "%" : "") +
          " | " + teamRedPct + "% in weak zone",
        evidence: worstMembers.length > 0 ? "Members in red: " + worstMembers.join(", ") : "No individual red alerts but team metrics are low",
        trendLine: "Department-level patterns often indicate process or resource issues, not individual failures",
        action: "Hold a team retrospective focused on blockers. Review workload distribution, tooling gaps, and process clarity. Consider cross-team pairing.",
        confidence: teamCompleted >= 6 ? "High" : "Med",
        confClass: teamCompleted >= 6 ? "high" : "med",
        priority: 2,
        zone: "red"
      });
    }

    // High-performing department
    if (teamQualityPct >= 80 && teamRedCount === 0 && teamCompleted >= 4) {
      insights.push({
        type: "teamwin",
        tag: "High-Performing Team",
        memberName: escapeHtml(role.name) + " Team",
        pattern: teamQualityPct + "% quality rate across " + teamCompleted + " tasks | 0% in weak zone",
        evidence: "All " + teamMembers.length + " members in strong or steady zone",
        trendLine: "Team culture is strong — this is the benchmark for other departments",
        action: "Recognize the entire team publicly. Document their practices as a playbook for other departments. Consider stretch goals to maintain momentum.",
        confidence: "High",
        confClass: "high",
        priority: 5,
        zone: "green"
      });
    }
  });

  // Sort insights by priority (lower number = higher priority)
  insights.sort(function(a, b) { return a.priority - b.priority; });

  // =============================================
  // RENDER
  // =============================================
  if (insights.length === 0) {
    el.innerHTML = '<div class="insights-empty">Not enough task and signal data to generate predictions yet. Complete tasks and add signals to see actionable insights.</div>';
    return;
  }

  // Summary bar
  var alertCount = insights.filter(function(i) { return i.type === "alert" || i.type === "overload"; }).length;
  var positiveCount = insights.filter(function(i) { return i.type === "star" || i.type === "recovery" || i.type === "strength" || i.type === "teamwin"; }).length;
  var watchCount = insights.filter(function(i) { return i.type === "burnout" || i.type === "skillgap" || i.type === "department"; }).length;

  var summaryHtml = '<div class="pi-summary">' +
    '<div class="pi-summary-stat pi-summary-alert">' +
      '<span class="pi-summary-num">' + alertCount + '</span>' +
      '<span class="pi-summary-label">Action Needed</span>' +
    '</div>' +
    '<div class="pi-summary-stat pi-summary-watch">' +
      '<span class="pi-summary-num">' + watchCount + '</span>' +
      '<span class="pi-summary-label">Watch</span>' +
    '</div>' +
    '<div class="pi-summary-stat pi-summary-positive">' +
      '<span class="pi-summary-num">' + positiveCount + '</span>' +
      '<span class="pi-summary-label">Positive</span>' +
    '</div>' +
    '<div class="pi-summary-stat pi-summary-total">' +
      '<span class="pi-summary-num">' + insights.length + '</span>' +
      '<span class="pi-summary-label">Total Insights</span>' +
    '</div>' +
  '</div>';

  var cardsHtml = '';
  insights.forEach(function(ins) {
    var zoneClass = ins.zone === "green" ? "pi-zone-green" : (ins.zone === "red" ? "pi-zone-red" : "pi-zone-orange");
    cardsHtml +=
      '<div class="pi-card pi-card-' + ins.type + '">' +
        '<div class="pi-card-top">' +
          '<div class="pi-tag pi-tag-' + ins.type + '">' + ins.tag + '</div>' +
          '<span class="pi-confidence pi-conf-' + ins.confClass + '">' + ins.confidence + ' confidence</span>' +
        '</div>' +
        '<div class="pi-card-name">' + ins.memberName + '</div>' +
        '<div class="pi-card-rows">' +
          '<div class="pi-row">' +
            '<span class="pi-row-label">Pattern</span>' +
            '<span class="pi-row-value">' + ins.pattern + '</span>' +
          '</div>' +
          '<div class="pi-row">' +
            '<span class="pi-row-label">Evidence</span>' +
            '<span class="pi-row-value">' + ins.evidence + '</span>' +
          '</div>' +
          '<div class="pi-row">' +
            '<span class="pi-row-label">Trend</span>' +
            '<span class="pi-row-value">' + ins.trendLine + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="pi-card-action">' +
          '<div class="pi-action-label">Suggested Action</div>' +
          '<div class="pi-action-text">' + ins.action + '</div>' +
        '</div>' +
      '</div>';
  });

  el.innerHTML = summaryHtml + '<div class="pi-grid">' + cardsHtml + '</div>';
}

function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==================== Delete Confirmation ====================

function showDeleteConfirm(type, id) {
  pendingDeleteType = type;
  pendingDeleteId = id;
  var labels = { note: "note", autorule: "auto rule", member: "member", task: "task", role: "role" };
  document.getElementById("confirm-text").textContent = "Are you sure you want to delete this " + (labels[type] || "item") + "?";
  openModal("confirm-modal");
}

function confirmDelete() {
  if (pendingDeleteType === "member") {
    data.members = data.members.filter(function(m) { return m.id !== pendingDeleteId; });
    data.tasks.forEach(function(t) {
      if (t.assigneeId === pendingDeleteId) t.assigneeId = "";
    });
    data.flags = data.flags.filter(function(f) { return f.memberId !== pendingDeleteId; });
  } else if (pendingDeleteType === "task") {
    data.tasks = data.tasks.filter(function(t) { return t.id !== pendingDeleteId; });
    data.flags = data.flags.filter(function(f) { return f.taskId !== pendingDeleteId; });
  } else if (pendingDeleteType === "note") {
    data.notes = (data.notes || []).filter(function(n) { return n.id !== pendingDeleteId; });
  } else if (pendingDeleteType === "autorule") {
    data.autoRules = (data.autoRules || []).filter(function(r) { return r.id !== pendingDeleteId; });
  } else if (pendingDeleteType === "role") {
    data.roles = data.roles.filter(function(r) { return r.id !== pendingDeleteId; });
    data.members.forEach(function(m) {
      if (m.roleId === pendingDeleteId) m.roleId = "";
    });
  }

  // Category deletion (uses separate variable)
  if (pendingDeleteCategoryId) {
    data.categories = data.categories.filter(function(c) { return c.id !== pendingDeleteCategoryId; });
    pendingDeleteCategoryId = null;
  }

  saveData(data);
  closeModal("confirm-modal");
  pendingDeleteType = null;
  pendingDeleteId = null;
  refreshAll();
}

// ==================== Helpers ====================

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function formatStatus(status) {
  return status.split("-").map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}

function formatDate(dateStr) {
  var parts = dateStr.split("-");
  var dd = String(parts[2]).padStart(2, "0");
  var mm = String(parts[1]).padStart(2, "0");
  var yy = String(parts[0]).slice(-2);
  return dd + "-" + mm + "-" + yy;
}

function populateRoleDropdown(selectId) {
  var select = document.getElementById(selectId);
  var currentValue = select.value;
  select.innerHTML = '<option value="">Select a role</option>';
  data.roles.forEach(function(role) {
    var opt = document.createElement("option");
    opt.value = role.id;
    opt.textContent = role.name;
    select.appendChild(opt);
  });
  if (currentValue) select.value = currentValue;
}

function populateMemberDropdown(selectId) {
  var select = document.getElementById(selectId);
  var currentValue = select.value;
  select.innerHTML = '<option value="">Select a member</option>';
  data.members.forEach(function(member) {
    var opt = document.createElement("option");
    opt.value = member.id;
    opt.textContent = member.name;
    select.appendChild(opt);
  });
  if (currentValue) select.value = currentValue;
}

// ==================== Category Management ====================

function populateCategoryDropdown(selectId, includeEmpty) {
  var el = document.getElementById(selectId);
  if (!el) return;
  var currentVal = el.value;
  var firstOptText = el.options[0] ? el.options[0].textContent : "Select category...";
  el.innerHTML = '<option value="">' + firstOptText + '</option>';
  data.categories.forEach(function(cat) {
    el.innerHTML += '<option value="' + cat.id + '">' + escapeHtml(cat.name) + '</option>';
  });
  el.value = currentVal;
}

function openAddCategory() {
  document.getElementById("category-edit-id").value = "";
  document.getElementById("category-name").value = "";
  document.getElementById("category-modal-title").textContent = "Add Category";
  openModal("category-modal");
}

function editCategory(id) {
  var cat = data.categories.find(function(c) { return c.id === id; });
  if (!cat) return;
  document.getElementById("category-edit-id").value = cat.id;
  document.getElementById("category-name").value = cat.name;
  document.getElementById("category-modal-title").textContent = "Edit Category";
  openModal("category-modal");
}

function saveCategory(event) {
  event.preventDefault();
  var editId = document.getElementById("category-edit-id").value;
  var name = document.getElementById("category-name").value.trim();
  if (!name) return;

  if (editId) {
    var idx = data.categories.findIndex(function(c) { return c.id === editId; });
    if (idx !== -1) data.categories[idx].name = name;
  } else {
    data.categories.push({
      id: "cat_" + generateId(),
      name: name
    });
  }

  saveData(data);
  closeModal("category-modal");
  refreshAll();
}

var pendingDeleteCategoryId = null;

function deleteCategoryConfirm(id) {
  var cat = data.categories.find(function(c) { return c.id === id; });
  if (!cat) return;
  pendingDeleteCategoryId = id;
  document.getElementById("confirm-text").textContent =
    'Delete category "' + cat.name + '"? Existing flags and tasks with this category will keep their data.';
  openModal("confirm-modal");
}

function renderCategories() {
  var container = document.getElementById("config-categories-list");
  if (!container) return;

  if (data.categories.length === 0) {
    container.innerHTML = '<div class="empty-state">No categories defined. Add your first category.</div>';
    return;
  }

  var html = '<div class="config-table">';
  data.categories.forEach(function(cat, index) {
    html += '<div class="config-row">' +
      '<span class="config-row-name">' + escapeHtml(cat.name) + '</span>' +
      '<span class="config-row-id">' + escapeHtml(cat.id) + '</span>' +
      '<div class="config-row-actions">' +
        '<button class="btn-icon" onclick="editCategory(\'' + cat.id + '\')" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
        '<button class="btn-icon btn-icon-danger" onclick="deleteCategoryConfirm(\'' + cat.id + '\')" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
      '</div>' +
    '</div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

// ==================== My Notes ====================

var currentNoteFilter = "all";

function filterNotes(cat) {
  currentNoteFilter = cat;
  document.querySelectorAll("[data-nfilter]").forEach(function(btn) {
    btn.classList.toggle("active", btn.getAttribute("data-nfilter") === cat);
  });
  renderNotes();
}

function renderNotes() {
  var container = document.getElementById("notes-list");
  if (!container) return;
  if (!data.notes) data.notes = [];
  var search = (document.getElementById("notes-search") || {}).value || "";
  search = search.toLowerCase();

  var filtered = data.notes.filter(function(n) {
    if (currentNoteFilter !== "all" && n.category !== currentNoteFilter) return false;
    if (search && n.title.toLowerCase().indexOf(search) === -1 && (n.content || "").toLowerCase().indexOf(search) === -1) return false;
    return true;
  }).sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">No notes found. Click "+ Add Note" to create one.</div>';
    return;
  }

  var html = '';
  filtered.forEach(function(n) {
    var member = n.memberId ? data.members.find(function(m) { return m.id === n.memberId; }) : null;
    var isOverdue = n.dueDate && new Date(n.dueDate + "T23:59:59") < new Date() && !n.completed;
    html += '<div class="card note-card' + (n.completed ? ' note-completed' : '') + '">' +
      '<div class="card-top">' +
        '<div class="note-card-header">' +
          '<span class="note-cat-badge note-cat-' + n.category.toLowerCase() + '">' + escapeHtml(n.category) + '</span>' +
          (n.completed ? '<span class="note-done-badge">Done</span>' : '') +
          (isOverdue ? '<span class="note-overdue-badge">Overdue</span>' : '') +
        '</div>' +
        '<div class="card-actions">' +
          '<button onclick="editNote(\'' + n.id + '\')" title="Edit">&#9998;</button>' +
          '<button onclick="toggleNoteComplete(\'' + n.id + '\')" title="' + (n.completed ? 'Reopen' : 'Mark Done') + '">' + (n.completed ? '&#8634;' : '&#10003;') + '</button>' +
          '<button onclick="showDeleteConfirm(\'note\',\'' + n.id + '\')" title="Delete">&#10005;</button>' +
        '</div>' +
      '</div>' +
      '<h4 class="note-title">' + escapeHtml(n.title) + '</h4>' +
      (n.content ? '<p class="note-content">' + escapeHtml(n.content) + '</p>' : '') +
      '<div class="note-meta">' +
        (member ? '<span class="note-meta-item" title="Associated member">&#128100; ' + escapeHtml(member.name) + '</span>' : '') +
        (n.dueDate ? '<span class="note-meta-item' + (isOverdue ? ' note-meta-overdue' : '') + '" title="Due date">&#128197; ' + formatDate(n.dueDate) + '</span>' : '') +
        (n.link ? '<a class="note-meta-item note-meta-link" href="' + escapeHtml(n.link) + '" target="_blank" rel="noopener" title="Open link">&#128279; Link</a>' : '') +
        (n.fileName ? '<span class="note-meta-item" title="Attached file">&#128206; ' + escapeHtml(n.fileName) + '</span>' : '') +
        '<span class="note-meta-item note-meta-date">' + formatDate(n.createdAt.split("T")[0]) + '</span>' +
      '</div>' +
    '</div>';
  });
  container.innerHTML = html;
}

function openNoteModal() {
  document.getElementById("note-modal-title").textContent = "Add Note";
  document.getElementById("note-form").reset();
  document.getElementById("note-edit-id").value = "";
  populateNoteMemberDropdown();
  openModal("note-modal");
}

function populateNoteMemberDropdown() {
  var sel = document.getElementById("note-member");
  sel.innerHTML = '<option value="">None</option>';
  data.members.forEach(function(m) {
    sel.innerHTML += '<option value="' + m.id + '">' + escapeHtml(m.name) + '</option>';
  });
}

function saveNote(event) {
  event.preventDefault();
  var editId = document.getElementById("note-edit-id").value;
  var fileInput = document.getElementById("note-file");
  var existingNote = editId ? data.notes.find(function(n) { return n.id === editId; }) : null;

  var note = {
    id: editId || generateId(),
    title: document.getElementById("note-title").value.trim(),
    content: document.getElementById("note-content").value.trim(),
    category: document.getElementById("note-category").value,
    memberId: document.getElementById("note-member").value,
    dueDate: document.getElementById("note-due").value,
    link: document.getElementById("note-link").value.trim(),
    fileName: existingNote ? existingNote.fileName : "",
    fileData: existingNote ? existingNote.fileData : "",
    completed: existingNote ? existingNote.completed : false,
    createdAt: existingNote ? existingNote.createdAt : new Date().toISOString()
  };

  // Handle file upload (store as base64 in localStorage)
  if (fileInput.files && fileInput.files[0]) {
    var file = fileInput.files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5MB.");
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      note.fileName = file.name;
      note.fileData = e.target.result;
      finishSaveNote(note, editId);
    };
    reader.readAsDataURL(file);
  } else {
    finishSaveNote(note, editId);
  }
}

function finishSaveNote(note, editId) {
  if (!data.notes) data.notes = [];
  if (editId) {
    var idx = data.notes.findIndex(function(n) { return n.id === editId; });
    if (idx !== -1) data.notes[idx] = note;
  } else {
    data.notes.push(note);
  }
  saveData(data);
  closeModal("note-modal");
  renderNotes();
}

function editNote(id) {
  var n = data.notes.find(function(x) { return x.id === id; });
  if (!n) return;
  document.getElementById("note-modal-title").textContent = "Edit Note";
  document.getElementById("note-edit-id").value = n.id;
  document.getElementById("note-title").value = n.title;
  document.getElementById("note-content").value = n.content || "";
  document.getElementById("note-category").value = n.category;
  populateNoteMemberDropdown();
  document.getElementById("note-member").value = n.memberId || "";
  document.getElementById("note-due").value = n.dueDate || "";
  document.getElementById("note-link").value = n.link || "";
  openModal("note-modal");
}

function toggleNoteComplete(id) {
  var n = data.notes.find(function(x) { return x.id === id; });
  if (n) { n.completed = !n.completed; saveData(data); renderNotes(); }
}

function deleteNote(id) {
  data.notes = data.notes.filter(function(n) { return n.id !== id; });
  saveData(data);
  renderNotes();
}

// ==================== Compare Members ====================

function renderCompare() {
  var container = document.getElementById("cmp-result");
  if (!container) return;

  // Populate dropdowns
  var selA = document.getElementById("cmp-member-a");
  var selB = document.getElementById("cmp-member-b");
  var curA = selA.value; var curB = selB.value;
  [selA, selB].forEach(function(sel) {
    var cur = sel.value;
    sel.innerHTML = '<option value="">Select member</option>';
    data.members.forEach(function(m) {
      sel.innerHTML += '<option value="' + m.id + '"' + (cur === m.id ? ' selected' : '') + '>' + escapeHtml(m.name) + '</option>';
    });
  });

  if (!curA || !curB || curA === curB) {
    container.innerHTML = '<div class="empty-state">Select two different members to compare.</div>';
    return;
  }

  var mA = data.members.find(function(m) { return m.id === curA; });
  var mB = data.members.find(function(m) { return m.id === curB; });
  if (!mA || !mB) return;

  var statsA = getCmpStats(mA.id);
  var statsB = getCmpStats(mB.id);

  var rows = [
    { label: "Current Zone", a: statsA.zone, b: statsB.zone, type: "zone" },
    { label: "Net Score", a: statsA.net, b: statsB.net, type: "number" },
    { label: "Strong Signals", a: statsA.green, b: statsB.green, type: "number" },
    { label: "Weak Signals", a: statsA.red, b: statsB.red, type: "number-inverse" },
    { label: "Tasks Assigned", a: statsA.tasksTotal, b: statsB.tasksTotal, type: "number" },
    { label: "Tasks Completed", a: statsA.tasksCompleted, b: statsB.tasksCompleted, type: "number" },
    { label: "Completion Rate", a: statsA.completionRate + "%", b: statsB.completionRate + "%", type: "text" },
    { label: "Overdue Tasks", a: statsA.overdue, b: statsB.overdue, type: "number-inverse" },
    { label: "Blunders", a: statsA.blunders, b: statsB.blunders, type: "number-inverse" },
    { label: "Extraordinary", a: statsA.extraordinary, b: statsB.extraordinary, type: "number" },
    { label: "Trend", a: statsA.trend, b: statsB.trend, type: "trend" }
  ];

  var html = '<div class="cmp-table">';
  html += '<div class="cmp-header-row"><div class="cmp-metric-label"></div><div class="cmp-member-name">' + escapeHtml(mA.name) + '</div><div class="cmp-member-name">' + escapeHtml(mB.name) + '</div></div>';

  rows.forEach(function(r) {
    var aWin = "", bWin = "";
    if (r.type === "number") { aWin = Number(r.a) > Number(r.b) ? " cmp-win" : ""; bWin = Number(r.b) > Number(r.a) ? " cmp-win" : ""; }
    if (r.type === "number-inverse") { aWin = Number(r.a) < Number(r.b) ? " cmp-win" : ""; bWin = Number(r.b) < Number(r.a) ? " cmp-win" : ""; }

    var aDisplay = r.a, bDisplay = r.b;
    if (r.type === "zone") {
      aDisplay = '<span class="cmp-zone cmp-zone-' + r.a + '">' + (r.a === "green" ? "Strong" : r.a === "red" ? "Weak" : "Steady") + '</span>';
      bDisplay = '<span class="cmp-zone cmp-zone-' + r.b + '">' + (r.b === "green" ? "Strong" : r.b === "red" ? "Weak" : "Steady") + '</span>';
    }
    if (r.type === "trend") {
      aDisplay = r.a === "rising" ? '<span class="trend-rising">&#9650; Rising</span>' : r.a === "falling" ? '<span class="trend-falling">&#9660; Falling</span>' : '<span class="trend-flat">&#8212; Flat</span>';
      bDisplay = r.b === "rising" ? '<span class="trend-rising">&#9650; Rising</span>' : r.b === "falling" ? '<span class="trend-falling">&#9660; Falling</span>' : '<span class="trend-flat">&#8212; Flat</span>';
    }

    html += '<div class="cmp-row">' +
      '<div class="cmp-metric-label">' + r.label + '</div>' +
      '<div class="cmp-val' + aWin + '">' + aDisplay + '</div>' +
      '<div class="cmp-val' + bWin + '">' + bDisplay + '</div>' +
    '</div>';
  });

  // Month-over-month comparison
  html += '</div>';
  html += '<h3 class="cmp-section-title">6-Month Zone History</h3>';
  html += '<div class="cmp-history">';
  var monthKeys = getRecentMonths(6);
  html += '<div class="cmp-hist-row cmp-hist-header"><div class="cmp-hist-label">Month</div>';
  monthKeys.forEach(function(mk) { html += '<div class="cmp-hist-cell">' + getMonthLabel(mk) + '</div>'; });
  html += '</div>';
  [{ m: mA, label: mA.name }, { m: mB, label: mB.name }].forEach(function(entry) {
    html += '<div class="cmp-hist-row"><div class="cmp-hist-label">' + escapeHtml(entry.label) + '</div>';
    monthKeys.forEach(function(mk) {
      var z = getMemberZoneAtMonth(entry.m.id, mk);
      var zCls = z === "green" ? "cmp-z-g" : z === "red" ? "cmp-z-r" : "cmp-z-y";
      html += '<div class="cmp-hist-cell ' + zCls + '">' + (z === "green" ? "S" : z === "red" ? "W" : "St") + '</div>';
    });
    html += '</div>';
  });
  html += '</div>';

  container.innerHTML = html;
}

function getCmpStats(memberId) {
  var f = getMemberFlags(memberId);
  var eff = getEffectiveFlags(memberId);
  var zone = getMemberZone(memberId);
  var trend = getMemberTrend(memberId);
  var memberTasks = data.tasks.filter(function(t) { return t.assigneeId === memberId; });
  var completed = memberTasks.filter(function(t) { return t.status === "completed"; });
  var overdue = memberTasks.filter(function(t) { return isOverdue(t); });
  var blunders = memberTasks.filter(function(t) { return t.reviewResult === "blunder"; });
  var extraordinary = memberTasks.filter(function(t) { return t.reviewResult === "extraordinary"; });
  var rate = memberTasks.length > 0 ? Math.round(completed.length / memberTasks.length * 100) : 0;

  return {
    zone: zone, net: eff.effNet, green: f.green, red: f.red,
    tasksTotal: memberTasks.length, tasksCompleted: completed.length,
    completionRate: rate, overdue: overdue.length,
    blunders: blunders.length, extraordinary: extraordinary.length,
    trend: trend
  };
}

function getRecentMonths(count) {
  var months = [];
  var now = new Date();
  for (var i = count - 1; i >= 0; i--) {
    var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"));
  }
  return months;
}

// ==================== Automated Signal Rules ====================

var autoRuleTriggerLabels = {
  "overdue_days": "Task overdue by X days",
  "completed_ontime_streak": "Completed on-time streak (X tasks)",
  "blunder_in_important": "Blunder on important task",
  "weekly_completions": "X tasks completed in a week",
  "no_weak_signals_months": "No weak signals for X months"
};

function updateAutoRuleFields() {
  var trigger = document.getElementById("autorule-trigger").value;
  var thGroup = document.getElementById("autorule-threshold-group");
  if (trigger === "blunder_in_important") {
    thGroup.style.display = "none";
  } else {
    thGroup.style.display = "";
  }
  // Default signal direction
  var sigSel = document.getElementById("autorule-signal");
  if (trigger === "overdue_days" || trigger === "blunder_in_important") {
    sigSel.value = "red";
  } else {
    sigSel.value = "green";
  }
}

function renderAutoRules() {
  var container = document.getElementById("autorules-list");
  if (!container) return;
  if (!data.autoRules) data.autoRules = [];
  if (data.autoRules.length === 0) {
    container.innerHTML = '<div class="empty-state">No auto rules yet. Click "+ Add Rule" to create one.</div>';
    return;
  }
  var html = '';
  data.autoRules.forEach(function(rule) {
    var trigLabel = autoRuleTriggerLabels[rule.trigger] || rule.trigger;
    if (rule.threshold) trigLabel = trigLabel.replace("X", rule.threshold);
    var sigLabel = rule.signal === "green" ? "Strong" : "Weak";
    var sigCls = rule.signal === "green" ? "ar-sig-green" : "ar-sig-red";
    html += '<div class="card ar-card' + (rule.active ? '' : ' ar-inactive') + '">' +
      '<div class="card-top">' +
        '<div class="ar-card-header">' +
          '<span class="ar-status ' + (rule.active ? 'ar-active' : 'ar-paused') + '">' + (rule.active ? 'Active' : 'Paused') + '</span>' +
          '<h4 class="ar-name">' + escapeHtml(rule.name) + '</h4>' +
        '</div>' +
        '<div class="card-actions">' +
          '<button onclick="toggleAutoRule(\'' + rule.id + '\')" title="' + (rule.active ? 'Pause' : 'Activate') + '">' + (rule.active ? '&#9208;' : '&#9654;') + '</button>' +
          '<button onclick="editAutoRule(\'' + rule.id + '\')" title="Edit">&#9998;</button>' +
          '<button onclick="showDeleteConfirm(\'autorule\',\'' + rule.id + '\')" title="Delete">&#10005;</button>' +
        '</div>' +
      '</div>' +
      '<div class="ar-detail">' +
        '<span class="ar-trigger">' + escapeHtml(trigLabel) + '</span>' +
        ' &rarr; <span class="' + sigCls + '">' + sigLabel + ' x' + rule.weight + '</span>' +
      '</div>' +
    '</div>';
  });
  container.innerHTML = html;
}

function saveAutoRule(event) {
  event.preventDefault();
  var editId = document.getElementById("autorule-edit-id").value;
  var rule = {
    id: editId || generateId(),
    name: document.getElementById("autorule-name").value.trim(),
    trigger: document.getElementById("autorule-trigger").value,
    threshold: parseInt(document.getElementById("autorule-threshold").value) || 0,
    signal: document.getElementById("autorule-signal").value,
    weight: parseInt(document.getElementById("autorule-weight").value) || 1,
    active: document.getElementById("autorule-active").checked
  };
  if (!data.autoRules) data.autoRules = [];
  if (editId) {
    var idx = data.autoRules.findIndex(function(r) { return r.id === editId; });
    if (idx !== -1) data.autoRules[idx] = rule;
  } else {
    data.autoRules.push(rule);
  }
  saveData(data);
  closeModal("autorule-modal");
  renderAutoRules();
}

function editAutoRule(id) {
  var r = data.autoRules.find(function(x) { return x.id === id; });
  if (!r) return;
  document.getElementById("autorule-modal-title").textContent = "Edit Auto Rule";
  document.getElementById("autorule-edit-id").value = r.id;
  document.getElementById("autorule-name").value = r.name;
  document.getElementById("autorule-trigger").value = r.trigger;
  document.getElementById("autorule-threshold").value = r.threshold || 3;
  document.getElementById("autorule-signal").value = r.signal;
  document.getElementById("autorule-weight").value = r.weight || 1;
  document.getElementById("autorule-active").checked = r.active;
  updateAutoRuleFields();
  openModal("autorule-modal");
}

function toggleAutoRule(id) {
  var r = data.autoRules.find(function(x) { return x.id === id; });
  if (r) { r.active = !r.active; saveData(data); renderAutoRules(); }
}

function deleteAutoRule(id) {
  data.autoRules = data.autoRules.filter(function(r) { return r.id !== id; });
  saveData(data);
  renderAutoRules();
}

// --- Execute auto rules on each refresh ---
function executeAutoRules() {
  if (!data.autoRules || data.autoRules.length === 0) return;
  var now = new Date();
  var todayKey = now.toISOString().split("T")[0];

  data.autoRules.forEach(function(rule) {
    if (!rule.active) return;

    if (rule.trigger === "overdue_days") {
      data.tasks.forEach(function(task) {
        if (!task.dueDate || !task.assigneeId || task.status === "completed" || task.status === "cancelled") return;
        var due = new Date(task.dueDate + "T23:59:59");
        var daysOver = Math.floor((now - due) / 86400000);
        if (daysOver >= rule.threshold) {
          var flagKey = "ar_" + rule.id + "_" + task.id;
          var alreadyFlagged = data.flags.some(function(f) { return f.reason && f.reason.indexOf(flagKey) !== -1; });
          if (!alreadyFlagged) {
            addFlag(task.assigneeId, task.id, rule.signal, rule.weight, "[Auto] " + rule.name + " (" + flagKey + ")", "", "");
          }
        }
      });
    }

    if (rule.trigger === "blunder_in_important") {
      data.tasks.forEach(function(task) {
        if (task.reviewResult === "blunder" && task.weightage === "important" && task.assigneeId) {
          var flagKey = "ar_" + rule.id + "_" + task.id;
          var alreadyFlagged = data.flags.some(function(f) { return f.reason && f.reason.indexOf(flagKey) !== -1; });
          if (!alreadyFlagged) {
            addFlag(task.assigneeId, task.id, rule.signal, rule.weight, "[Auto] " + rule.name + " (" + flagKey + ")", "", "");
          }
        }
      });
    }

    if (rule.trigger === "completed_ontime_streak") {
      data.members.forEach(function(m) {
        var memberTasks = data.tasks.filter(function(t) { return t.assigneeId === m.id && t.status === "completed"; });
        var ontime = memberTasks.filter(function(t) {
          if (!t.dueDate) return true;
          return new Date(t.dueDate + "T23:59:59") >= new Date(t.createdAt);
        });
        if (ontime.length >= rule.threshold) {
          var streakKey = "ar_" + rule.id + "_" + m.id + "_" + ontime.length;
          var flagKey = "ar_" + rule.id + "_" + m.id + "_streak" + rule.threshold;
          var alreadyFlagged = data.flags.some(function(f) { return f.reason && f.reason.indexOf(flagKey) !== -1; });
          if (!alreadyFlagged) {
            addFlag(m.id, "", rule.signal, rule.weight, "[Auto] " + rule.name + " (" + flagKey + ")", "", "");
          }
        }
      });
    }

    if (rule.trigger === "weekly_completions") {
      var weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      data.members.forEach(function(m) {
        var weekCompleted = data.tasks.filter(function(t) {
          if (t.assigneeId !== m.id || t.status !== "completed") return false;
          return true; // simplified - counts all completed tasks
        });
        if (weekCompleted.length >= rule.threshold) {
          var flagKey = "ar_" + rule.id + "_" + m.id + "_wk" + getMonthKey(todayKey);
          var alreadyFlagged = data.flags.some(function(f) { return f.reason && f.reason.indexOf(flagKey) !== -1; });
          if (!alreadyFlagged) {
            addFlag(m.id, "", rule.signal, rule.weight, "[Auto] " + rule.name + " (" + flagKey + ")", "", "");
          }
        }
      });
    }

    if (rule.trigger === "no_weak_signals_months") {
      data.members.forEach(function(m) {
        var hasRecent = false;
        for (var mi = 0; mi < rule.threshold; mi++) {
          var d = new Date(now.getFullYear(), now.getMonth() - mi, 1);
          var mk = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
          var monthRed = data.flags.filter(function(f) {
            return f.memberId === m.id && f.color === "red" && getMonthKey(f.createdAt) === mk;
          });
          if (monthRed.length > 0) hasRecent = true;
        }
        if (!hasRecent) {
          var flagKey = "ar_" + rule.id + "_" + m.id + "_clean" + rule.threshold;
          var alreadyFlagged = data.flags.some(function(f) { return f.reason && f.reason.indexOf(flagKey) !== -1; });
          if (!alreadyFlagged) {
            addFlag(m.id, "", rule.signal, rule.weight, "[Auto] " + rule.name + " (" + flagKey + ")", "", "");
          }
        }
      });
    }
  });
}

function refreshAll() {
  checkOverdueFlags();
  executeAutoRules();
  renderDashboard();
  renderPredictiveInsights();
  renderMembers();
  renderTasks();
  renderRoles();
  renderCategories();
  renderNotes();
  renderAutoRules();
  renderCompare();
  if (typeof renderReports === "function") renderReports();
}

// ==================== Demo Data Seeding ====================

function seedDemoData() {
  // Only seed if no data exists or seed version changed
  var seedVersion = "v4";
  if (localStorage.getItem("boss_seed_version") === seedVersion) return;
  localStorage.setItem("boss_seed_version", seedVersion);

  // --- Roles ---
  var roles = [
    { id: "role_dev", name: "Developer", description: "Software development and engineering", color: "blue", createdAt: "2024-11-15T10:00:00.000Z" },
    { id: "role_design", name: "Designer", description: "UI/UX design and visual assets", color: "purple", createdAt: "2024-11-15T10:00:00.000Z" },
    { id: "role_mgr", name: "Manager", description: "Project management and team coordination", color: "green", createdAt: "2024-11-15T10:00:00.000Z" },
    { id: "role_qa", name: "QA Engineer", description: "Quality assurance and testing", color: "orange", createdAt: "2024-11-15T10:00:00.000Z" }
  ];

  // --- Members ---
  // Patterns planned:
  //   Arjun  (Dev)     → Rising (more green in Jan than Dec)
  //   Priya  (Designer)→ Falling (gets red flags in Jan)
  //   Rahul  (Manager) → Flat (balanced both months)
  //   Sneha  (QA)      → Red Alert (red zone both Dec & Jan)
  //   Vikram (Dev)     → Decay Active (clean Dec & Jan, old reds from Nov context)
  //   Meera  (Designer)→ Monthly Warning (2+ red in current month)
  //   Karan  (QA)      → Rising (big improvement in Jan)
  //   Deepa  (Manager) → Falling (decline in Jan)
  var members = [
    { id: "mem_arjun",  name: "Arjun Patel",    email: "arjun@team.com",  roleId: "role_dev",    status: "active", createdAt: "2024-11-20T09:00:00.000Z" },
    { id: "mem_priya",  name: "Priya Sharma",   email: "priya@team.com",  roleId: "role_design", status: "active", createdAt: "2024-11-20T09:00:00.000Z" },
    { id: "mem_rahul",  name: "Rahul Gupta",    email: "rahul@team.com",  roleId: "role_mgr",    status: "active", createdAt: "2024-11-20T09:00:00.000Z" },
    { id: "mem_sneha",  name: "Sneha Reddy",    email: "sneha@team.com",  roleId: "role_qa",     status: "active", createdAt: "2024-11-20T09:00:00.000Z" },
    { id: "mem_vikram", name: "Vikram Singh",   email: "vikram@team.com", roleId: "role_dev",    status: "active", createdAt: "2024-11-20T09:00:00.000Z" },
    { id: "mem_meera",  name: "Meera Iyer",     email: "meera@team.com",  roleId: "role_design", status: "active", createdAt: "2024-11-20T09:00:00.000Z" },
    { id: "mem_karan",  name: "Karan Malhotra", email: "karan@team.com",  roleId: "role_qa",     status: "active", createdAt: "2024-11-20T09:00:00.000Z" },
    { id: "mem_deepa",  name: "Deepa Nair",     email: "deepa@team.com",  roleId: "role_mgr",    status: "active", createdAt: "2024-11-20T09:00:00.000Z" },
    { id: "mem_rohan",  name: "Rohan Desai",    email: "rohan@team.com",  roleId: "role_dev",    status: "active", createdAt: "2024-11-25T09:00:00.000Z" },
    { id: "mem_anita",  name: "Anita Kapoor",   email: "anita@team.com",  roleId: "role_qa",     status: "active", createdAt: "2024-11-25T09:00:00.000Z" }
  ];

  // --- Tasks (Dec 2024, Jan 2025, Dec 2025, Jan 2026) ---
  var tasks = [
    // December 2024 tasks
    { id: "task_01", title: "Build login module",          description: "Implement user authentication", notes: "Using JWT tokens",       assigneeId: "mem_arjun",  priority: "high",   dueDate: "2024-12-10", status: "completed", reviewResult: "perfect",       createdAt: "2024-12-01T09:00:00.000Z" },
    { id: "task_02", title: "Design dashboard mockups",    description: "Create wireframes for new dashboard", notes: "",                  assigneeId: "mem_priya",  priority: "high",   dueDate: "2024-12-12", status: "completed", reviewResult: "perfect",       createdAt: "2024-12-01T09:00:00.000Z" },
    { id: "task_03", title: "Sprint planning Q1",          description: "Plan Q1 sprint milestones",    notes: "Include team feedback",   assigneeId: "mem_rahul",  priority: "medium", dueDate: "2024-12-15", status: "completed", reviewResult: "acceptable",    createdAt: "2024-12-02T10:00:00.000Z" },
    { id: "task_04", title: "Regression test suite",       description: "Run full regression tests",    notes: "Found 3 critical bugs",   assigneeId: "mem_sneha",  priority: "high",   dueDate: "2024-12-08", status: "completed", reviewResult: "below",         createdAt: "2024-12-01T09:00:00.000Z" },
    { id: "task_05", title: "API optimization",            description: "Optimize slow endpoints",      notes: "Reduced latency by 40%",  assigneeId: "mem_vikram", priority: "medium", dueDate: "2024-12-18", status: "completed", reviewResult: "perfect",       createdAt: "2024-12-05T10:00:00.000Z" },
    { id: "task_06", title: "Brand style guide update",    description: "Update brand colors and fonts", notes: "",                        assigneeId: "mem_meera",  priority: "low",    dueDate: "2024-12-20", status: "completed", reviewResult: "acceptable",    createdAt: "2024-12-03T09:00:00.000Z" },
    { id: "task_07", title: "E2E test automation",         description: "Set up automated E2E tests",   notes: "Using Cypress",           assigneeId: "mem_karan",  priority: "high",   dueDate: "2024-12-22", status: "completed", reviewResult: "below",         createdAt: "2024-12-05T09:00:00.000Z" },
    { id: "task_08", title: "Budget review meeting",       description: "Review Q4 budget allocation",  notes: "",                        assigneeId: "mem_deepa",  priority: "medium", dueDate: "2024-12-19", status: "completed", reviewResult: "perfect",       createdAt: "2024-12-04T09:00:00.000Z" },
    // January 2025 tasks
    { id: "task_09", title: "Payment gateway integration", description: "Integrate Stripe payments",    notes: "Sandbox testing done",    assigneeId: "mem_arjun",  priority: "high",   dueDate: "2025-01-10", status: "completed", reviewResult: "extraordinary", createdAt: "2025-01-02T09:00:00.000Z" },
    { id: "task_10", title: "Mobile responsive redesign",  description: "Make all pages responsive",    notes: "Missed 3 breakpoints",    assigneeId: "mem_priya",  priority: "high",   dueDate: "2025-01-08", status: "completed", reviewResult: "below",         createdAt: "2025-01-02T09:00:00.000Z" },
    { id: "task_11", title: "Onboarding flow",             description: "Design new user onboarding",   notes: "",                        assigneeId: "mem_rahul",  priority: "medium", dueDate: "2025-01-15", status: "completed", reviewResult: "acceptable",    createdAt: "2025-01-03T10:00:00.000Z" },
    { id: "task_12", title: "Load testing",                description: "Test system under peak load",  notes: "Server crashed at 500 concurrent", assigneeId: "mem_sneha", priority: "high", dueDate: "2025-01-12", status: "completed", reviewResult: "below", createdAt: "2025-01-03T09:00:00.000Z" },
    { id: "task_13", title: "Database migration",          description: "Migrate to PostgreSQL 16",     notes: "Smooth migration",        assigneeId: "mem_vikram", priority: "high",   dueDate: "2025-01-18", status: "completed", reviewResult: "perfect",       createdAt: "2025-01-05T09:00:00.000Z" },
    { id: "task_14", title: "Icon library creation",       description: "Create custom SVG icon set",   notes: "",                        assigneeId: "mem_meera",  priority: "medium", dueDate: "2025-01-20", status: "in-progress",                              createdAt: "2025-01-06T09:00:00.000Z" },
    { id: "task_15", title: "Performance benchmarks",      description: "Run and document benchmarks",  notes: "Great improvement shown",  assigneeId: "mem_karan", priority: "medium", dueDate: "2025-01-22", status: "completed", reviewResult: "extraordinary", createdAt: "2025-01-06T09:00:00.000Z" },
    { id: "task_16", title: "Stakeholder presentation",    description: "Prepare Q1 kickoff slides",    notes: "Feedback was lukewarm",   assigneeId: "mem_deepa",  priority: "high",   dueDate: "2025-01-14", status: "completed", reviewResult: "below",         createdAt: "2025-01-04T09:00:00.000Z" },
    { id: "task_17", title: "Security audit",              description: "Conduct security review",      notes: "",                        assigneeId: "mem_arjun",  priority: "high",   dueDate: "2025-01-25", status: "in-progress",                              createdAt: "2025-01-10T09:00:00.000Z" },
    { id: "task_18", title: "User feedback analysis",      description: "Analyze Q4 user survey data",  notes: "Key insights documented", assigneeId: "mem_priya",  priority: "low",    dueDate: "2025-01-28", status: "hold",                                     createdAt: "2025-01-08T09:00:00.000Z" },
    // Rohan & Anita tasks
    { id: "task_19", title: "Microservice refactor",       description: "Break monolith into microservices", notes: "Started with auth service", assigneeId: "mem_rohan", priority: "high",   dueDate: "2025-01-15", status: "completed", reviewResult: "perfect",       createdAt: "2025-01-03T09:00:00.000Z" },
    { id: "task_20", title: "CI/CD pipeline setup",        description: "Configure GitHub Actions workflows", notes: "",                          assigneeId: "mem_rohan", priority: "medium", dueDate: "2025-01-20", status: "in-progress",                              createdAt: "2025-01-08T09:00:00.000Z" },
    { id: "task_21", title: "API contract testing",        description: "Write contract tests for all APIs",  notes: "Using Pact framework",     assigneeId: "mem_anita", priority: "high",   dueDate: "2024-12-18", status: "completed", reviewResult: "perfect",       createdAt: "2024-12-04T09:00:00.000Z" },
    { id: "task_22", title: "Smoke test automation",       description: "Automate smoke tests for staging",   notes: "Covered 12 critical flows", assigneeId: "mem_anita", priority: "medium", dueDate: "2025-01-10", status: "completed", reviewResult: "extraordinary", createdAt: "2025-01-02T09:00:00.000Z" },
    { id: "task_23", title: "Chaos engineering drill",     description: "Run failure injection tests",        notes: "",                          assigneeId: "mem_rohan", priority: "low",    dueDate: "2025-01-28", status: "pending",                                   createdAt: "2025-01-12T09:00:00.000Z" },
    // December 2025 tasks
    { id: "task_24", title: "Build notification service",   description: "Real-time push notification system",   notes: "Using WebSockets + Redis",         assigneeId: "mem_arjun",  priority: "high",   weightage: "important", dueDate: "2025-12-10", status: "completed", reviewResult: "perfect",       createdAt: "2025-12-01T09:00:00.000Z" },
    { id: "task_25", title: "Integration test suite",       description: "Full integration tests for payments",  notes: "Missed 4 edge cases",              assigneeId: "mem_sneha",  priority: "high",   dueDate: "2025-12-12", status: "completed", reviewResult: "below",         createdAt: "2025-12-01T09:00:00.000Z" },
    { id: "task_26", title: "Design system overhaul",       description: "Rebuild component library in Figma",   notes: "Shipped 40+ components",           assigneeId: "mem_meera",  priority: "high",   dueDate: "2025-12-18", status: "completed", reviewResult: "perfect",       createdAt: "2025-12-03T09:00:00.000Z" },
    { id: "task_27", title: "Kubernetes migration",         description: "Migrate staging to K8s cluster",       notes: "Zero-downtime cutover achieved",   assigneeId: "mem_rohan",  priority: "high",   weightage: "important", dueDate: "2025-12-20", status: "completed", reviewResult: "extraordinary", createdAt: "2025-12-05T09:00:00.000Z" },
    { id: "task_28", title: "Automated regression suite",   description: "Nightly regression pipeline",          notes: "Covers 85% of critical paths",     assigneeId: "mem_karan",  priority: "medium", dueDate: "2025-12-22", status: "completed", reviewResult: "acceptable",    createdAt: "2025-12-05T09:00:00.000Z" },
    // January 2026 tasks
    { id: "task_29", title: "Landing page redesign",        description: "Redesign marketing landing page",      notes: "Layout broke on Safari/Firefox",   assigneeId: "mem_priya",  priority: "high",   dueDate: "2026-01-08", status: "completed", reviewResult: "below",         createdAt: "2026-01-02T09:00:00.000Z" },
    { id: "task_30", title: "Q2 roadmap planning",          description: "Define Q2 milestones and deliverables", notes: "Aligned with all stakeholders",   assigneeId: "mem_deepa",  priority: "high",   dueDate: "2026-01-12", status: "completed", reviewResult: "perfect",       createdAt: "2026-01-02T09:00:00.000Z" },
    { id: "task_31", title: "Team restructuring plan",      description: "Reorg proposal for scaling teams",     notes: "Board approved same day",          assigneeId: "mem_rahul",  priority: "high",   dueDate: "2026-01-15", status: "completed", reviewResult: "extraordinary", createdAt: "2026-01-03T09:00:00.000Z" },
    { id: "task_32", title: "Security test framework",      description: "Build OWASP-based test framework",     notes: "Integrated with CI pipeline",      assigneeId: "mem_anita",  priority: "high",   weightage: "important", dueDate: "2026-01-18", status: "completed", reviewResult: "perfect",       createdAt: "2026-01-05T09:00:00.000Z" },
    { id: "task_33", title: "GraphQL API layer",            description: "Add GraphQL gateway over REST APIs",   notes: "",                                 assigneeId: "mem_vikram", priority: "high",   weightage: "important", dueDate: "2026-01-25", status: "in-progress",                              createdAt: "2026-01-06T09:00:00.000Z" },
    // Additional December 2025 tasks (fill gaps)
    { id: "task_34", title: "Brand guideline documentation",  description: "Document updated brand standards for 2026", notes: "Comprehensive and well-organized",  assigneeId: "mem_priya",  priority: "medium", dueDate: "2025-12-15", status: "completed", reviewResult: "perfect",       createdAt: "2025-12-02T09:00:00.000Z" },
    { id: "task_35", title: "Year-end team performance reviews", description: "Conduct and document all team reviews", notes: "Delayed feedback to 3 members",  assigneeId: "mem_rahul",  priority: "high",   dueDate: "2025-12-12", status: "completed", reviewResult: "below",         createdAt: "2025-12-01T09:00:00.000Z" },
    { id: "task_36", title: "Database performance tuning",    description: "Optimize slow queries and indexing strategy", notes: "Reduced avg query time by 60%", assigneeId: "mem_vikram", priority: "high",   dueDate: "2025-12-16", status: "completed", reviewResult: "extraordinary", createdAt: "2025-12-03T09:00:00.000Z" },
    { id: "task_37", title: "Mobile app test coverage",       description: "Increase test coverage to 90% on mobile app", notes: "Achieved 92% coverage",         assigneeId: "mem_anita",  priority: "high",   dueDate: "2025-12-19", status: "completed", reviewResult: "perfect",       createdAt: "2025-12-04T09:00:00.000Z" },
    { id: "task_38", title: "Annual budget finalization",     description: "Finalize department budgets for 2026",  notes: "Minor discrepancies found late",       assigneeId: "mem_deepa",  priority: "high",   dueDate: "2025-12-22", status: "completed", reviewResult: "perfect",       createdAt: "2025-12-05T09:00:00.000Z" },
    // Additional January 2026 tasks (fill gaps)
    { id: "task_39", title: "Real-time analytics dashboard",  description: "Build live metrics dashboard with WebSocket updates", notes: "Exceeded performance targets",  assigneeId: "mem_arjun",  priority: "high",   weightage: "important", dueDate: "2026-01-15", status: "completed", reviewResult: "extraordinary", createdAt: "2026-01-03T09:00:00.000Z" },
    { id: "task_40", title: "Automated deployment testing",   description: "Validate zero-downtime deploy pipeline",   notes: "Missed rollback scenario",          assigneeId: "mem_sneha",  priority: "high",   dueDate: "2026-01-10", status: "completed", reviewResult: "below",         createdAt: "2026-01-02T09:00:00.000Z" },
    { id: "task_41", title: "Mobile app UI overhaul",         description: "Redesign navigation and key screens",      notes: "Shipped with broken gestures and wrong spacing", assigneeId: "mem_meera", priority: "high", dueDate: "2026-01-14", status: "completed", reviewResult: "blunder", createdAt: "2026-01-03T09:00:00.000Z" },
    { id: "task_42", title: "API stress testing report",      description: "Run stress tests and document findings",   notes: "Thorough report with actionable items",          assigneeId: "mem_karan", priority: "medium", dueDate: "2026-01-16", status: "completed", reviewResult: "perfect", createdAt: "2026-01-05T09:00:00.000Z" },
    { id: "task_43", title: "Event-driven architecture POC",  description: "Prototype event sourcing with Kafka",      notes: "Clean implementation, ready for prod",           assigneeId: "mem_rohan", priority: "high",   dueDate: "2026-01-20", status: "completed", reviewResult: "perfect",       createdAt: "2026-01-06T09:00:00.000Z" },
    { id: "task_44", title: "Infrastructure cost optimization", description: "Reduce cloud spend by 20%",             notes: "Achieved 25% reduction",                         assigneeId: "mem_vikram", priority: "medium", dueDate: "2026-01-22", status: "completed", reviewResult: "perfect",      createdAt: "2026-01-08T09:00:00.000Z" },
    // February 2026 tasks (some overdue for Attention Board demo)
    { id: "task_45", title: "Client demo preparation",        description: "Prepare demo for enterprise client meeting",    notes: "",  assigneeId: "mem_arjun",  priority: "high",   weightage: "important",     dueDate: "2026-02-05", status: "in-progress", createdAt: "2026-01-28T09:00:00.000Z" },
    { id: "task_46", title: "Vendor arrangement review",       description: "Review vendor contracts for Q1 renewal",       notes: "",  assigneeId: "mem_deepa",  priority: "high",   weightage: "important",     dueDate: "2026-02-03", status: "pending",     createdAt: "2026-01-25T09:00:00.000Z" },
    { id: "task_47", title: "Client presentation deck",        description: "Build client presentation deck for demo day",  notes: "",  assigneeId: "mem_priya",  priority: "medium", weightage: "not-important", dueDate: "2026-02-08", status: "in-progress", createdAt: "2026-02-01T09:00:00.000Z" },
    { id: "task_48", title: "Code review backlog clearance",   description: "Review and merge pending pull requests",       notes: "",  assigneeId: "mem_rohan",  priority: "medium", weightage: "not-important", dueDate: "2026-02-06", status: "pending",     createdAt: "2026-01-29T09:00:00.000Z" }
  ];

  // --- Flags ---
  // Arjun: Dec → 1 green; Jan → 3 green (rising, net +4)
  // Priya: Dec → 1 green; Jan → 2 red (falling, net -1)
  // Rahul: Dec → 1 green, 1 red; Jan → 1 green, 1 red (flat, net 0)
  // Sneha: Dec → 2 red; Jan → 2 red (red alert, red zone both months, also monthly warning)
  // Vikram: Nov → 2 red (old); Dec → 0 red; Jan → 0 red (decay active, 2 clean months) + 1 green each
  // Meera: Dec → 1 green; Jan → 2 red (monthly warning, falling)
  // Karan: Dec → 1 red; Jan → 3 green (rising, net +2)
  // Deepa: Dec → 2 green; Jan → 2 red (falling, net 0 but declining)
  var flags = [
    // === Arjun (Rising) ===
    { id: "flag_01", memberId: "mem_arjun", taskId: "task_01", color: "green", count: 1, reason: "Completed perfectly: Build login module",         createdAt: "2024-12-10T15:00:00.000Z" },
    { id: "flag_02", memberId: "mem_arjun", taskId: "task_09", color: "green", count: 2, reason: "Extraordinary result: Payment gateway integration", createdAt: "2025-01-10T15:00:00.000Z" },
    { id: "flag_03", memberId: "mem_arjun", taskId: null,      color: "green", count: 1, reason: "Leadership Multiplier: Mentoring, Cross-team collaboration", createdAt: "2025-01-15T10:00:00.000Z" },

    // === Priya (Falling) ===
    { id: "flag_04", memberId: "mem_priya", taskId: "task_02", color: "green", count: 1, reason: "Completed perfectly: Design dashboard mockups",    createdAt: "2024-12-12T15:00:00.000Z" },
    { id: "flag_05", memberId: "mem_priya", taskId: "task_10", color: "red",   count: 1, reason: "Below expectation: Mobile responsive redesign",    createdAt: "2025-01-08T15:00:00.000Z" },
    { id: "flag_06", memberId: "mem_priya", taskId: null,      color: "red",   count: 1, reason: "Missed code review deadlines twice",               createdAt: "2025-01-20T10:00:00.000Z" },

    // === Rahul (Flat) ===
    { id: "flag_07", memberId: "mem_rahul", taskId: "task_03", color: "green", count: 1, reason: "Completed: Sprint planning Q1",                    createdAt: "2024-12-15T15:00:00.000Z" },
    { id: "flag_08", memberId: "mem_rahul", taskId: null,      color: "red",   count: 1, reason: "Late status report submission",                    createdAt: "2024-12-22T10:00:00.000Z" },
    { id: "flag_09", memberId: "mem_rahul", taskId: "task_11", color: "green", count: 1, reason: "Completed: Onboarding flow",                      createdAt: "2025-01-15T15:00:00.000Z" },
    { id: "flag_10", memberId: "mem_rahul", taskId: null,      color: "red",   count: 1, reason: "Unresponsive during critical issue escalation",    createdAt: "2025-01-22T10:00:00.000Z" },

    // === Sneha (Red Alert + Monthly Warning) ===
    { id: "flag_11", memberId: "mem_sneha", taskId: "task_04", color: "red",   count: 1, reason: "Below expectation: Regression test suite",         createdAt: "2024-12-08T15:00:00.000Z" },
    { id: "flag_12", memberId: "mem_sneha", taskId: null,      color: "red",   count: 1, reason: "Missed critical bug in production release",        createdAt: "2024-12-18T10:00:00.000Z" },
    { id: "flag_13", memberId: "mem_sneha", taskId: "task_12", color: "red",   count: 1, reason: "Below expectation: Load testing",                  createdAt: "2025-01-12T15:00:00.000Z" },
    { id: "flag_14", memberId: "mem_sneha", taskId: null,      color: "red",   count: 1, reason: "Inadequate test coverage on new module",           createdAt: "2025-01-25T10:00:00.000Z" },

    // === Vikram (Decay Active - old reds from Nov, clean Dec & Jan) ===
    { id: "flag_15", memberId: "mem_vikram", taskId: null,      color: "red",   count: 1, reason: "Deployed without peer review",                   createdAt: "2024-11-10T10:00:00.000Z" },
    { id: "flag_16", memberId: "mem_vikram", taskId: null,      color: "red",   count: 1, reason: "Production outage from untested change",          createdAt: "2024-11-18T10:00:00.000Z" },
    { id: "flag_17", memberId: "mem_vikram", taskId: "task_05", color: "green", count: 1, reason: "Completed perfectly: API optimization",           createdAt: "2024-12-18T15:00:00.000Z" },
    { id: "flag_18", memberId: "mem_vikram", taskId: "task_13", color: "green", count: 1, reason: "Completed perfectly: Database migration",         createdAt: "2025-01-18T15:00:00.000Z" },

    // === Meera (Monthly Warning in Jan - 2 red flags in Jan) ===
    { id: "flag_19", memberId: "mem_meera", taskId: "task_06", color: "green", count: 1, reason: "Completed: Brand style guide update",              createdAt: "2024-12-20T15:00:00.000Z" },
    { id: "flag_20", memberId: "mem_meera", taskId: null,      color: "red",   count: 1, reason: "Delivered assets with wrong brand colors",         createdAt: "2025-01-12T10:00:00.000Z" },
    { id: "flag_21", memberId: "mem_meera", taskId: null,      color: "red",   count: 1, reason: "Repeated accessibility violations in designs",     createdAt: "2025-01-22T10:00:00.000Z" },

    // === Karan (Rising - improved significantly in Jan) ===
    { id: "flag_22", memberId: "mem_karan", taskId: "task_07", color: "red",   count: 1, reason: "Below expectation: E2E test automation",           createdAt: "2024-12-22T15:00:00.000Z" },
    { id: "flag_23", memberId: "mem_karan", taskId: "task_15", color: "green", count: 2, reason: "Extraordinary result: Performance benchmarks",     createdAt: "2025-01-22T15:00:00.000Z" },
    { id: "flag_24", memberId: "mem_karan", taskId: null,      color: "green", count: 1, reason: "Leadership Multiplier: Mentoring junior QA team",  createdAt: "2025-01-25T10:00:00.000Z" },

    // === Deepa (Falling - good Dec, bad Jan) ===
    { id: "flag_25", memberId: "mem_deepa", taskId: "task_08", color: "green", count: 1, reason: "Completed perfectly: Budget review meeting",       createdAt: "2024-12-19T15:00:00.000Z" },
    { id: "flag_26", memberId: "mem_deepa", taskId: null,      color: "green", count: 1, reason: "Leadership Multiplier: Cross-team collaboration",  createdAt: "2024-12-28T10:00:00.000Z" },
    { id: "flag_27", memberId: "mem_deepa", taskId: "task_16", color: "red",   count: 1, reason: "Below expectation: Stakeholder presentation",     createdAt: "2025-01-14T15:00:00.000Z" },
    { id: "flag_28", memberId: "mem_deepa", taskId: null,      color: "red",   count: 1, reason: "Failed to communicate project delays to stakeholders", createdAt: "2025-01-26T10:00:00.000Z" },

    // === Rohan (Rising — solid performer) ===
    { id: "flag_29", memberId: "mem_rohan", taskId: "task_19", color: "green", count: 1, reason: "Completed perfectly: Microservice refactor",            createdAt: "2025-01-15T15:00:00.000Z" },
    { id: "flag_30", memberId: "mem_rohan", taskId: null,      color: "green", count: 1, reason: "Leadership Multiplier: Mentored 2+ teammates",          createdAt: "2025-01-20T10:00:00.000Z" },

    // === Anita (Rising — strong QA contributor) ===
    { id: "flag_31", memberId: "mem_anita", taskId: "task_21", color: "green", count: 1, reason: "Completed perfectly: API contract testing",              createdAt: "2024-12-18T15:00:00.000Z" },
    { id: "flag_32", memberId: "mem_anita", taskId: "task_22", color: "green", count: 2, reason: "Extraordinary result: Smoke test automation",            createdAt: "2025-01-10T15:00:00.000Z" },

    // === December 2025 Flags ===
    { id: "flag_33", memberId: "mem_arjun",  taskId: "task_24", color: "green", count: 1, reason: "Completed perfectly: Build notification service",        createdAt: "2025-12-10T15:00:00.000Z" },
    { id: "flag_34", memberId: "mem_sneha",  taskId: "task_25", color: "red",   count: 1, reason: "Below expectation: Integration test suite",              createdAt: "2025-12-12T15:00:00.000Z" },
    { id: "flag_35", memberId: "mem_meera",  taskId: "task_26", color: "green", count: 1, reason: "Completed perfectly: Design system overhaul",             createdAt: "2025-12-18T15:00:00.000Z" },
    { id: "flag_36", memberId: "mem_rohan",  taskId: "task_27", color: "green", count: 2, reason: "Extraordinary result: Kubernetes migration",              createdAt: "2025-12-20T15:00:00.000Z" },
    { id: "flag_37", memberId: "mem_karan",  taskId: "task_28", color: "green", count: 1, reason: "Completed: Automated regression suite",                   createdAt: "2025-12-22T15:00:00.000Z" },
    { id: "flag_38", memberId: "mem_deepa",  taskId: null,      color: "red",   count: 1, reason: "Missed quarterly milestone deadline",                     createdAt: "2025-12-28T10:00:00.000Z" },

    // === January 2026 Flags ===
    { id: "flag_39", memberId: "mem_priya",  taskId: "task_29", color: "red",   count: 1, reason: "Below expectation: Landing page redesign",               createdAt: "2026-01-08T15:00:00.000Z" },
    { id: "flag_40", memberId: "mem_deepa",  taskId: "task_30", color: "green", count: 1, reason: "Completed perfectly: Q2 roadmap planning",               createdAt: "2026-01-12T15:00:00.000Z" },
    { id: "flag_41", memberId: "mem_rahul",  taskId: "task_31", color: "green", count: 2, reason: "Extraordinary result: Team restructuring plan",           createdAt: "2026-01-15T15:00:00.000Z" },
    { id: "flag_42", memberId: "mem_anita",  taskId: "task_32", color: "green", count: 1, reason: "Completed perfectly: Security test framework",            createdAt: "2026-01-18T15:00:00.000Z" },
    { id: "flag_43", memberId: "mem_arjun",  taskId: null,      color: "red",   count: 1, reason: "Skipped code review for critical hotfix",                 createdAt: "2026-01-20T10:00:00.000Z" },
    { id: "flag_44", memberId: "mem_sneha",  taskId: null,      color: "green", count: 1, reason: "Improved QA process documentation significantly",         createdAt: "2026-01-22T10:00:00.000Z" },

    // === Additional December 2025 Flags (fill gaps) ===
    { id: "flag_45", memberId: "mem_priya",  taskId: "task_34", color: "green", count: 1, reason: "Completed with excellence: Brand guideline documentation",    note: "Very thorough and well-structured",  category: "cat_domain",     createdAt: "2025-12-15T15:00:00.000Z" },
    { id: "flag_46", memberId: "mem_rahul",  taskId: "task_35", color: "red",   count: 1, reason: "Needs support: Year-end team performance reviews",            note: "Delayed feedback to 3 members",      category: "cat_management", createdAt: "2025-12-12T15:00:00.000Z" },
    { id: "flag_47", memberId: "mem_vikram", taskId: "task_36", color: "green", count: 2, reason: "Exceptional contribution: Database performance tuning",        note: "60% latency reduction",              category: "cat_skill",      createdAt: "2025-12-16T15:00:00.000Z" },
    { id: "flag_48", memberId: "mem_anita",  taskId: "task_37", color: "green", count: 1, reason: "Completed with excellence: Mobile app test coverage",          note: "Exceeded 90% target",                category: "cat_skill",      createdAt: "2025-12-19T15:00:00.000Z" },
    { id: "flag_49", memberId: "mem_deepa",  taskId: "task_38", color: "green", count: 1, reason: "Completed with excellence: Annual budget finalization",         note: "",                                   category: "cat_management", createdAt: "2025-12-22T15:00:00.000Z" },
    { id: "flag_50", memberId: "mem_rahul",  taskId: null,      color: "green", count: 1, reason: "Leadership Multiplier: Cross-team collaboration on year-end goals", note: "",                              category: "cat_people",     createdAt: "2025-12-28T10:00:00.000Z" },
    { id: "flag_51", memberId: "mem_sneha",  taskId: null,      color: "red",   count: 1, reason: "Missed regression test deadline for release 4.2",               note: "Tests delivered 2 days late",        category: "cat_sop",        createdAt: "2025-12-20T10:00:00.000Z" },
    { id: "flag_52", memberId: "mem_priya",  taskId: null,      color: "red",   count: 1, reason: "Delivered mockups with outdated design tokens",                  note: "Had to redo 5 screens",             category: "cat_skill",      createdAt: "2025-12-22T10:00:00.000Z" },

    // === Additional January 2026 Flags (fill gaps) ===
    { id: "flag_53", memberId: "mem_arjun",  taskId: "task_39", color: "green", count: 2, reason: "Exceptional contribution: Real-time analytics dashboard",       note: "Exceeded all performance targets",    category: "cat_skill",      createdAt: "2026-01-15T15:00:00.000Z" },
    { id: "flag_54", memberId: "mem_sneha",  taskId: "task_40", color: "red",   count: 1, reason: "Needs support: Automated deployment testing",                   note: "Missed rollback scenario",            category: "cat_sop",        createdAt: "2026-01-10T15:00:00.000Z" },
    { id: "flag_55", memberId: "mem_meera",  taskId: "task_41", color: "red",   count: 2, reason: "Blunder: Mobile app UI overhaul",                               note: "Broken gestures and wrong spacing shipped", category: "cat_skill", createdAt: "2026-01-14T15:00:00.000Z" },
    { id: "flag_56", memberId: "mem_karan",  taskId: "task_42", color: "green", count: 1, reason: "Completed with excellence: API stress testing report",           note: "Thorough and actionable",             category: "cat_domain",     createdAt: "2026-01-16T15:00:00.000Z" },
    { id: "flag_57", memberId: "mem_rohan",  taskId: "task_43", color: "green", count: 1, reason: "Completed with excellence: Event-driven architecture POC",       note: "Clean implementation",                category: "cat_skill",      createdAt: "2026-01-20T15:00:00.000Z" },
    { id: "flag_58", memberId: "mem_vikram", taskId: "task_44", color: "green", count: 1, reason: "Completed with excellence: Infrastructure cost optimization",    note: "Achieved 25% cost reduction",         category: "cat_domain",     createdAt: "2026-01-22T15:00:00.000Z" },
    { id: "flag_59", memberId: "mem_meera",  taskId: null,      color: "red",   count: 1, reason: "Repeated accessibility issues in handoff to dev",                note: "Third time this quarter",             category: "cat_sop",        createdAt: "2026-01-25T10:00:00.000Z" },
    { id: "flag_60", memberId: "mem_rohan",  taskId: null,      color: "green", count: 1, reason: "Leadership Multiplier: Mentored 2 junior devs on event systems", note: "",                                    category: "cat_people",     createdAt: "2026-01-28T10:00:00.000Z" },
    { id: "flag_61", memberId: "mem_karan",  taskId: null,      color: "green", count: 1, reason: "Leadership Multiplier: Cross-team collaboration on perf testing", note: "",                                   category: "cat_people",     createdAt: "2026-01-28T10:00:00.000Z" },
    { id: "flag_62", memberId: "mem_priya",  taskId: null,      color: "red",   count: 1, reason: "Handoff to dev had incomplete responsive specs",                 note: "Missing tablet breakpoints",          category: "cat_skill",      createdAt: "2026-01-22T10:00:00.000Z" },
    { id: "flag_63", memberId: "mem_rahul",  taskId: null,      color: "green", count: 1, reason: "Leadership Multiplier: Positively referenced by 3 team leads",   note: "",                                    category: "cat_people",     createdAt: "2026-01-26T10:00:00.000Z" }
  ];

  data.roles = roles;
  data.members = members;
  data.tasks = tasks;
  data.flags = flags;
  saveData(data);
}

// ==================== Initialize ====================

document.addEventListener("DOMContentLoaded", function() {
  seedDemoData();
  refreshAll();

  // Close date dropdown when clicking outside
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".dr-icon-wrap")) {
      document.querySelectorAll(".dr-dropdown").forEach(function(d) { d.classList.remove("open"); });
    }
  });
});
