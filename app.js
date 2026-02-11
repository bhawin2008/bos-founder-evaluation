// ==================== Data Store ====================

function loadData() {
  return {
    members: JSON.parse(localStorage.getItem("boss_members") || "[]"),
    tasks: JSON.parse(localStorage.getItem("boss_tasks") || "[]"),
    roles: JSON.parse(localStorage.getItem("boss_roles") || "[]"),
    flags: JSON.parse(localStorage.getItem("boss_flags") || "[]")
  };
}

function saveData(data) {
  localStorage.setItem("boss_members", JSON.stringify(data.members));
  localStorage.setItem("boss_tasks", JSON.stringify(data.tasks));
  localStorage.setItem("boss_roles", JSON.stringify(data.roles));
  localStorage.setItem("boss_flags", JSON.stringify(data.flags));
}

var data = loadData();
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
  }
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
  // Sync all from inputs
  document.querySelectorAll(".dr-from").forEach(function(el) { el.value = val; });
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
  // Sync all to inputs
  document.querySelectorAll(".dr-to").forEach(function(el) { el.value = val; });
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

// ==================== Modals ====================

function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
  if (modalId === "member-modal") {
    populateRoleDropdown("member-role");
  }
  if (modalId === "task-modal") {
    populateMemberDropdown("task-assignee");
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

function addFlag(memberId, taskId, color, count, reason) {
  data.flags.push({
    id: generateId(),
    memberId: memberId,
    taskId: taskId,
    color: color,
    count: count,
    reason: reason,
    createdAt: new Date().toISOString()
  });
  saveData(data);
}

function renderFlagBadge(memberId) {
  var flags = getMemberFlags(memberId);
  var parts = [];
  if (flags.green > 0) {
    parts.push('<span class="flag-count flag-green-count">&#9873; ' + flags.green + '</span>');
  }
  if (flags.red > 0) {
    parts.push('<span class="flag-count flag-red-count">&#9873; ' + flags.red + '</span>');
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
      addFlag(task.assigneeId, task.id, "red", 1, "Missed deadline: " + task.title);
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
  var d = new Date(parts[0], parts[1] - 1, 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
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
  // Always include current month
  months[getMonthKey(new Date().toISOString())] = true;
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
  if (trend === "rising") return '<span class="trend-badge trend-rising">&#9650; Rising</span>';
  if (trend === "falling") return '<span class="trend-badge trend-falling">&#9660; Falling</span>';
  return '<span class="trend-badge trend-flat">&#9644; Flat</span>';
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
  var reason = "Leadership Multiplier: " + reasons.join(", ");
  if (note) reason += " — " + note;

  // +1 green flag per qualifying criterion
  addFlag(memberId, null, "green", checks.length, reason);

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

function submitReview(quality) {
  var task = data.tasks.find(function(t) { return t.id === pendingReviewTaskId; });
  if (!task) return;

  task.status = "completed";
  task.reviewResult = quality;

  if (task.assigneeId) {
    if (quality === "extraordinary") {
      addFlag(task.assigneeId, task.id, "green", 2, "Extraordinary result: " + task.title);
    } else if (quality === "perfect") {
      addFlag(task.assigneeId, task.id, "green", 1, "Completed perfectly: " + task.title);
    } else if (quality === "below") {
      addFlag(task.assigneeId, task.id, "red", 1, "Below expectation: " + task.title);
    }
  }

  saveData(data);
  closeModal("review-modal");
  pendingReviewTaskId = null;
  refreshAll();
}

function cancelReview() {
  pendingReviewTaskId = null;
  closeModal("review-modal");
}

// ==================== Mark Extraordinary ====================

function openExtraordinary(taskId) {
  var task = data.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;
  pendingExtraordinaryTaskId = taskId;
  document.getElementById("extraordinary-task-name").textContent = task.title;
  document.getElementById("extraordinary-note").value = "";
  openModal("extraordinary-modal");
}

function submitExtraordinary() {
  var task = data.tasks.find(function(t) { return t.id === pendingExtraordinaryTaskId; });
  if (!task || !task.assigneeId) {
    closeModal("extraordinary-modal");
    return;
  }

  var note = document.getElementById("extraordinary-note").value.trim();
  var reason = "Extraordinary work on task: " + task.title;
  if (note) reason += " — " + note;

  addFlag(task.assigneeId, task.id, "green", 2, reason);

  closeModal("extraordinary-modal");
  pendingExtraordinaryTaskId = null;
  refreshAll();
}

// ==================== Blunder ====================

function openBlunder(taskId) {
  var task = data.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;
  pendingBlunderTaskId = taskId;
  document.getElementById("blunder-task-name").textContent = task.title;
  document.getElementById("blunder-note").value = "";
  openModal("blunder-modal");
}

function submitBlunder() {
  var task = data.tasks.find(function(t) { return t.id === pendingBlunderTaskId; });
  if (!task || !task.assigneeId) {
    closeModal("blunder-modal");
    return;
  }

  var note = document.getElementById("blunder-note").value.trim();
  var reason = "Blunder in task: " + task.title;
  if (note) reason += " — " + note;

  addFlag(task.assigneeId, task.id, "red", 3, reason);

  closeModal("blunder-modal");
  pendingBlunderTaskId = null;
  refreshAll();
}

// ==================== Member Flag History ====================

function showMemberFlags(memberId) {
  var member = data.members.find(function(m) { return m.id === memberId; });
  if (!member) return;

  document.getElementById("flags-modal-title").textContent = escapeHtml(member.name) + " — Flag History";

  var flags = getMemberFlags(memberId);
  var eff = getEffectiveFlags(memberId);
  var effNet = eff.green - eff.red;
  var trend = getMemberTrend(memberId);
  var trendLabel = trend === "rising" ? "&#9650; Rising" : (trend === "falling" ? "&#9660; Falling" : "&#9644; Flat");
  var trendCls = trend === "rising" ? "trend-rising" : (trend === "falling" ? "trend-falling" : "trend-flat");
  var monthlyWarn = getMonthlyRedWarning(memberId);

  var summaryEl = document.getElementById("flags-summary");
  summaryEl.innerHTML =
    '<div class="flags-summary-row">' +
      '<div class="flags-summary-item green">' +
        '<span class="flags-summary-count">' + flags.green + '</span>' +
        '<span class="flags-summary-label">Green Flags</span>' +
      '</div>' +
      '<div class="flags-summary-item red">' +
        '<span class="flags-summary-count">' + flags.red + (eff.decayActive ? '<span style="font-size:0.5em;opacity:0.7"> → ' + eff.red + '</span>' : '') + '</span>' +
        '<span class="flags-summary-label">Red Flags' + (eff.decayActive ? ' (decayed)' : '') + '</span>' +
      '</div>' +
      '<div class="flags-summary-item net ' + (effNet >= 0 ? 'green' : 'red') + '">' +
        '<span class="flags-summary-count">' + (effNet > 0 ? '+' : '') + effNet + '</span>' +
        '<span class="flags-summary-label">Effective Net</span>' +
      '</div>' +
    '</div>' +
    '<div class="flags-meta-row">' +
      '<span class="trend-badge ' + trendCls + '">' + trendLabel + '</span>' +
      (eff.decayActive ? '<span class="decay-badge">Decay Active (' + eff.cleanStreak + ' clean months → -50% old reds)</span>' : '') +
      (monthlyWarn ? '<span class="monthly-warning-badge">2+ Red Flags This Month</span>' : '') +
    '</div>';

  var historyList = document.getElementById("flags-history-list");
  var flagEntries = getMemberFlagList(memberId);

  if (flagEntries.length === 0) {
    historyList.innerHTML = '<div class="empty-state-sm">No flags recorded yet</div>';
  } else {
    historyList.innerHTML = "";
    flagEntries.forEach(function(f) {
      var item = document.createElement("div");
      item.className = "flag-history-item";
      var dateStr = new Date(f.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      item.innerHTML =
        '<div class="flag-history-icon ' + f.color + '">' +
          '&#9873;' + (f.count > 1 ? ' x' + f.count : '') +
        '</div>' +
        '<div class="flag-history-info">' +
          '<span class="flag-history-reason">' + escapeHtml(f.reason) + '</span>' +
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
          '<button class="btn-icon" onclick="editRole(\'' + role.id + '\')" title="Edit">&#9998;</button>' +
          '<button class="btn-icon btn-icon-danger" onclick="deleteRole(\'' + role.id + '\')" title="Delete">&#10005;</button>' +
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

function renderMembers() {
  var container = document.getElementById("members-list");
  if (!container) return;
  container.innerHTML = "";

  var searchInput = document.getElementById("member-search");
  var search = searchInput ? searchInput.value.toLowerCase() : "";

  var filtered = data.members.filter(function(m) {
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
    var flagHtml = renderFlagBadge(member.id);
    var alertHtml = isRedAlert(member.id) ? '<span class="red-alert-badge">RED ALERT</span>' : '';
    var trendHtml = renderTrendBadge(member.id);
    var warningHtml = getMonthlyRedWarning(member.id) ? '<span class="monthly-warning-badge">2+ RED THIS MONTH</span>' : '';
    var eff = getEffectiveFlags(member.id);
    var decayHtml = eff.decayActive ? '<span class="decay-badge">Decay Active (-50%)</span>' : '';

    var card = document.createElement("div");
    card.className = "card" + (isRedAlert(member.id) ? " card-red-alert" : "") + (getMonthlyRedWarning(member.id) ? " card-monthly-warning" : "");
    card.innerHTML =
      '<div class="card-top">' +
        '<div class="member-info">' +
          '<div class="avatar ' + roleColor + '">' + initials + '</div>' +
          '<div>' +
            '<div class="member-name">' + escapeHtml(member.name) + ' ' + flagHtml + ' ' + trendHtml + ' ' + alertHtml + ' ' + warningHtml + '</div>' +
            '<div class="member-email">' + escapeHtml(member.email) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card-actions">' +
          '<button class="btn-icon btn-icon-leadership" onclick="openLeadership(\'' + member.id + '\')" title="Leadership Multiplier">&#9819;</button>' +
          '<button class="btn-icon" onclick="showMemberFlags(\'' + member.id + '\')" title="View Flags">&#9873;</button>' +
          '<button class="btn-icon" onclick="editMember(\'' + member.id + '\')" title="Edit">&#9998;</button>' +
          '<button class="btn-icon btn-icon-danger" onclick="deleteMember(\'' + member.id + '\')" title="Delete">&#10005;</button>' +
        '</div>' +
      '</div>' +
      '<div class="card-bottom">' +
        '<div class="role-badge ' + roleColor + '">' + (role ? escapeHtml(role.name) : "No Role") + '</div>' +
        '<span class="status-badge status-' + member.status + '">' + formatStatus(member.status) + '</span>' +
        '<span class="card-meta">' + taskCount + ' active task' + (taskCount !== 1 ? 's' : '') + '</span>' +
        decayHtml +
      '</div>';
    container.appendChild(card);
  });
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
  document.getElementById("task-due").value = task.dueDate;
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-modal-title").textContent = "Edit Task";
  openModal("task-modal");
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
      parts.push('<span class="task-flag-pip ' + f.color + '">&#9873;</span>');
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

  var filtered = data.tasks.filter(function(t) {
    // Date range filter first
    if (!isTaskInDateRange(t)) return false;
    if (currentFilter === "all") return true;
    if (currentFilter === "overdue") return isOverdue(t);
    return t.status === currentFilter;
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
      statusSelect += '<span class="tt-overdue-tag">Overdue</span>';
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
      actions += '<button class="tt-action-btn tt-action-complete" onclick="toggleTaskStatus(\'' + task.id + '\')" title="Complete Task">&#10003;</button>';
    }
    if (showExtraordinary) {
      actions += '<button class="tt-action-btn tt-action-green" onclick="openExtraordinary(\'' + task.id + '\')" title="Mark Extraordinary (+2 Green)">&#9733;</button>';
    }
    if (showBlunder) {
      actions += '<button class="tt-action-btn tt-action-red" onclick="openBlunder(\'' + task.id + '\')" title="Report Blunder (+3 Red)">&#9873;</button>';
    }
    actions += '<button class="tt-action-btn tt-action-edit" onclick="editTask(\'' + task.id + '\')" title="Edit">&#9998;</button>';
    actions += '<button class="tt-action-btn tt-action-delete" onclick="deleteTask(\'' + task.id + '\')" title="Delete">&#10005;</button>';

    html += '<tr class="' + rowClass + '">' +
      '<td class="tt-col-title">' +
        '<div class="tt-task-name">' + escapeHtml(task.title) + ' ' + flagIndicator + '</div>' +
        (task.description ? '<div class="tt-task-desc">' + escapeHtml(task.description) + '</div>' : '') +
      '</td>' +
      '<td class="tt-col-assignee">' + assigneeSelect + '</td>' +
      '<td class="tt-col-status">' + statusSelect + '</td>' +
      '<td class="tt-col-due">' + dueInput + '</td>' +
      '<td class="tt-col-priority">' + prioritySelect + '</td>' +
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

  var totalFlags = totalGreen + totalRed;
  var greenPct = totalFlags > 0 ? Math.round((totalGreen / totalFlags) * 100) : 0;
  var redPct = totalFlags > 0 ? Math.round((totalRed / totalFlags) * 100) : 0;

  document.getElementById("stat-members").textContent = data.members.length;
  document.getElementById("stat-tasks").textContent = activeTasks.length;
  document.getElementById("stat-green-flags").textContent = greenPct + "%";
  document.getElementById("stat-green-flags-sub").textContent = totalGreen + " flags";
  document.getElementById("stat-red-flags").textContent = redPct + "%";
  document.getElementById("stat-red-flags-sub").textContent = totalRed + " flags";

  // === Zone Distribution (uses date-filtered flags) ===
  var zoneDistEl = document.getElementById("dashboard-zone-dist");
  if (zoneDistEl) {
    if (data.members.length === 0) {
      zoneDistEl.innerHTML = '<div class="empty-state-sm">No members yet</div>';
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
      var yPct = Math.round((yellowCount / total) * 100);
      var rPct = Math.round((redCount / total) * 100);

      zoneDistEl.innerHTML =
        '<div class="zone-bar">' +
          (gPct > 0 ? '<div class="zone-bar-seg green" style="width:' + gPct + '%">' + gPct + '%</div>' : '') +
          (yPct > 0 ? '<div class="zone-bar-seg yellow" style="width:' + yPct + '%">' + yPct + '%</div>' : '') +
          (rPct > 0 ? '<div class="zone-bar-seg red" style="width:' + rPct + '%">' + rPct + '%</div>' : '') +
        '</div>' +
        '<div class="zone-legend">' +
          '<span class="zone-legend-item"><span class="zone-dot green"></span> Green ' + greenCount + ' (' + gPct + '%)</span>' +
          '<span class="zone-legend-item"><span class="zone-dot yellow"></span> Neutral ' + yellowCount + ' (' + yPct + '%)</span>' +
          '<span class="zone-legend-item"><span class="zone-dot red"></span> Red ' + redCount + ' (' + rPct + '%)</span>' +
        '</div>';
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

      // Build trend chart (last up to 6 months)
      var chartMonths = months.slice(-6);
      var chartRows = '';
      chartMonths.forEach(function(mo) {
        var g = 0, y = 0, r = 0;
        data.members.forEach(function(m) {
          var z = getMemberZoneAtMonth(m.id, mo);
          if (z === "green") g++;
          else if (z === "red") r++;
          else y++;
        });
        var tot = data.members.length;
        var gW = Math.round((g / tot) * 100);
        var yW = Math.round((y / tot) * 100);
        var rW = Math.round((r / tot) * 100);
        chartRows +=
          '<div class="trend-row">' +
            '<span class="trend-label">' + getMonthLabel(mo) + '</span>' +
            '<div class="trend-bar">' +
              (gW > 0 ? '<div class="zone-bar-seg green" style="width:' + gW + '%"></div>' : '') +
              (yW > 0 ? '<div class="zone-bar-seg yellow" style="width:' + yW + '%"></div>' : '') +
              (rW > 0 ? '<div class="zone-bar-seg red" style="width:' + rW + '%"></div>' : '') +
            '</div>' +
          '</div>';
      });

      trendEl.innerHTML =
        '<div class="movement-cards">' +
          '<div class="movement-card green"><span class="movement-val">' + iPct + '%</span><span class="movement-lbl">Improved</span></div>' +
          '<div class="movement-card yellow"><span class="movement-val">' + sPct + '%</span><span class="movement-lbl">Stable</span></div>' +
          '<div class="movement-card red"><span class="movement-val">' + dPct + '%</span><span class="movement-lbl">Declined</span></div>' +
        '</div>' +
        '<div class="trend-chart">' + chartRows + '</div>' +
        '<div class="trend-period">Comparing ' + getMonthLabel(prevMonth) + ' → ' + getMonthLabel(currMonth) + '</div>';
    }
  }

  // === Red Alerts ===
  var alertEl = document.getElementById("dashboard-alerts");
  if (alertEl) {
    var alertMembers = data.members.filter(function(m) { return isRedAlert(m.id); });
    if (alertMembers.length === 0) {
      alertEl.innerHTML = '<div class="empty-state-sm">No red alerts — all clear</div>';
    } else {
      alertEl.innerHTML = "";
      alertMembers.forEach(function(member) {
        var role = data.roles.find(function(r) { return r.id === member.roleId; });
        var flags = getMemberFlags(member.id);
        var initials = member.name.split(" ").map(function(n) { return n[0]; }).join("").toUpperCase().substring(0, 2);
        var item = document.createElement("div");
        item.className = "dashboard-list-item alert-item clickable";
        item.onclick = function() { showMemberFlags(member.id); };
        item.innerHTML =
          '<div class="avatar avatar-sm red">' + initials + '</div>' +
          '<div class="dashboard-item-info">' +
            '<span class="dashboard-item-name overdue-text">' + escapeHtml(member.name) + '</span>' +
            '<span class="dashboard-item-detail">Red zone for 2+ consecutive months</span>' +
          '</div>' +
          '<span class="flag-chip flag-chip-red">&#9873; ' + flags.red + '</span>';
        alertEl.appendChild(item);
      });
    }
  }

  // === Department Heatmap ===
  var heatmapEl = document.getElementById("dashboard-heatmap");
  if (heatmapEl) {
    if (data.roles.length === 0) {
      heatmapEl.innerHTML = '<div class="empty-state-sm">No roles/departments defined</div>';
    } else {
      var html = '<div class="heatmap-grid">';
      data.roles.forEach(function(role) {
        var roleMembers = data.members.filter(function(m) { return m.roleId === role.id; });
        if (roleMembers.length === 0) {
          html += '<div class="heatmap-cell neutral"><div class="heatmap-dept">' + escapeHtml(role.name) + '</div><div class="heatmap-val">No members</div></div>';
          return;
        }
        var totalNet = 0;
        var gCount = 0, rCount = 0;
        roleMembers.forEach(function(m) {
          var f = getMemberFlagsFiltered(m.id);
          totalNet += (f.green - f.red);
          gCount += f.green;
          rCount += f.red;
        });
        var avgNet = totalNet / roleMembers.length;
        var heatClass = avgNet > 0 ? "green" : (avgNet < 0 ? "red" : "neutral");
        html += '<div class="heatmap-cell ' + heatClass + '">' +
          '<div class="heatmap-dept">' + escapeHtml(role.name) + '</div>' +
          '<div class="heatmap-val">' + (avgNet > 0 ? '+' : '') + avgNet.toFixed(1) + ' avg</div>' +
          '<div class="heatmap-detail">' + roleMembers.length + ' members · ' + gCount + 'G / ' + rCount + 'R</div>' +
        '</div>';
      });

      // Unassigned
      var unassigned = data.members.filter(function(m) { return !m.roleId; });
      if (unassigned.length > 0) {
        var uNet = 0, uG = 0, uR = 0;
        unassigned.forEach(function(m) {
          var f = getMemberFlagsFiltered(m.id);
          uNet += (f.green - f.red);
          uG += f.green;
          uR += f.red;
        });
        var uAvg = uNet / unassigned.length;
        var uClass = uAvg > 0 ? "green" : (uAvg < 0 ? "red" : "neutral");
        html += '<div class="heatmap-cell ' + uClass + '">' +
          '<div class="heatmap-dept">Unassigned</div>' +
          '<div class="heatmap-val">' + (uAvg > 0 ? '+' : '') + uAvg.toFixed(1) + ' avg</div>' +
          '<div class="heatmap-detail">' + unassigned.length + ' members · ' + uG + 'G / ' + uR + 'R</div>' +
        '</div>';
      }

      html += '</div>';
      heatmapEl.innerHTML = html;
    }
  }

  // === Member Flag Status ===
  var flagStatusEl = document.getElementById("dashboard-flag-status");
  if (flagStatusEl) {
    if (data.members.length === 0) {
      flagStatusEl.innerHTML = '<div class="empty-state-sm">No members yet</div>';
    } else {
      var memberFlagData = data.members.map(function(m) {
        var flags = getMemberFlagsFiltered(m.id);
        var eff = getEffectiveFlags(m.id);
        var effNet = eff.green - eff.red;
        return { member: m, green: flags.green, red: flags.red, net: flags.green - flags.red, effNet: effNet, decayActive: eff.decayActive };
      }).sort(function(a, b) { return b.effNet - a.effNet; });

      flagStatusEl.innerHTML = "";
      memberFlagData.forEach(function(mf) {
        var initials = mf.member.name.split(" ").map(function(n) { return n[0]; }).join("").toUpperCase().substring(0, 2);
        var role = data.roles.find(function(r) { return r.id === mf.member.roleId; });
        var roleColor = role ? role.color : "blue";
        var netClass = mf.effNet > 0 ? "green" : (mf.effNet < 0 ? "red" : "neutral");
        var alertCls = isRedAlert(mf.member.id) ? " alert-item" : "";
        var warnCls = getMonthlyRedWarning(mf.member.id) ? " monthly-warn-item" : "";
        var trend = getMemberTrend(mf.member.id);
        var trendIcon = trend === "rising" ? "&#9650;" : (trend === "falling" ? "&#9660;" : "&#9644;");
        var trendCls = trend === "rising" ? "trend-rising" : (trend === "falling" ? "trend-falling" : "trend-flat");

        var item = document.createElement("div");
        item.className = "dashboard-list-item clickable" + alertCls + warnCls;
        item.onclick = function() { showMemberFlags(mf.member.id); };
        item.innerHTML =
          '<div class="avatar avatar-sm ' + roleColor + '">' + initials + '</div>' +
          '<div class="dashboard-item-info">' +
            '<span class="dashboard-item-name">' + escapeHtml(mf.member.name) +
              ' <span class="trend-badge-sm ' + trendCls + '">' + trendIcon + '</span>' +
              (isRedAlert(mf.member.id) ? ' <span class="red-alert-badge-sm">ALERT</span>' : '') +
              (getMonthlyRedWarning(mf.member.id) ? ' <span class="monthly-warning-badge-sm">WARN</span>' : '') +
              (mf.decayActive ? ' <span class="decay-badge-sm">-50%</span>' : '') +
            '</span>' +
            '<span class="dashboard-item-detail">' + (role ? escapeHtml(role.name) : "No Role") + '</span>' +
          '</div>' +
          '<div class="dashboard-flag-chips">' +
            '<span class="flag-chip flag-chip-green">&#9873; ' + mf.green + '</span>' +
            '<span class="flag-chip flag-chip-red">&#9873; ' + mf.red + '</span>' +
            '<span class="flag-chip flag-chip-net ' + netClass + '">' + (mf.effNet > 0 ? '+' : '') + mf.effNet + '</span>' +
          '</div>';
        flagStatusEl.appendChild(item);
      });
    }
  }

  // === Overdue Tasks ===
  var overdueEl = document.getElementById("dashboard-overdue");
  if (overdueEl) {
    var overdueTasks = filteredTasks.filter(function(t) { return isOverdue(t); });
    if (overdueTasks.length === 0) {
      overdueEl.innerHTML = '<div class="empty-state-sm">No overdue tasks</div>';
    } else {
      overdueEl.innerHTML = "";
      overdueTasks.forEach(function(task) {
        var assignee = data.members.find(function(m) { return m.id === task.assigneeId; });
        var item = document.createElement("div");
        item.className = "dashboard-list-item";
        item.innerHTML =
          '<div class="dashboard-item-info">' +
            '<span class="dashboard-item-name overdue-text">' + escapeHtml(task.title) + '</span>' +
            '<span class="dashboard-item-detail">' + (assignee ? escapeHtml(assignee.name) : "Unassigned") + ' — Due ' + formatDate(task.dueDate) + '</span>' +
          '</div>' +
          '<span class="status-badge status-overdue">Overdue</span>';
        overdueEl.appendChild(item);
      });
    }
  }
}

// ==================== Delete Confirmation ====================

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
  } else if (pendingDeleteType === "role") {
    data.roles = data.roles.filter(function(r) { return r.id !== pendingDeleteId; });
    data.members.forEach(function(m) {
      if (m.roleId === pendingDeleteId) m.roleId = "";
    });
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
  var date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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

function refreshAll() {
  checkOverdueFlags();
  renderDashboard();
  renderMembers();
  renderTasks();
  renderRoles();
}

// ==================== Initialize ====================

document.addEventListener("DOMContentLoaded", function() {
  refreshAll();
});
