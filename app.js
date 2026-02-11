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
  if (!task.dueDate || task.status === "completed") return false;
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

// ==================== Task Completion Review ====================

function toggleTaskStatus(id) {
  var task = data.tasks.find(function(t) { return t.id === id; });
  if (!task) return;

  if (task.status === "completed") {
    // Un-completing — just revert
    task.status = "pending";
    saveData(data);
    refreshAll();
  } else {
    // Completing — open review modal
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
  var summaryEl = document.getElementById("flags-summary");
  summaryEl.innerHTML =
    '<div class="flags-summary-row">' +
      '<div class="flags-summary-item green">' +
        '<span class="flags-summary-count">' + flags.green + '</span>' +
        '<span class="flags-summary-label">Green Flags</span>' +
      '</div>' +
      '<div class="flags-summary-item red">' +
        '<span class="flags-summary-count">' + flags.red + '</span>' +
        '<span class="flags-summary-label">Red Flags</span>' +
      '</div>' +
      '<div class="flags-summary-item net ' + (flags.green - flags.red >= 0 ? 'green' : 'red') + '">' +
        '<span class="flags-summary-count">' + (flags.green - flags.red > 0 ? '+' : '') + (flags.green - flags.red) + '</span>' +
        '<span class="flags-summary-label">Net Score</span>' +
      '</div>' +
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
    var taskCount = data.tasks.filter(function(t) { return t.assigneeId === member.id && t.status !== "completed"; }).length;
    var initials = member.name.split(" ").map(function(n) { return n[0]; }).join("").toUpperCase().substring(0, 2);
    var roleColor = role ? role.color : "blue";
    var flagHtml = renderFlagBadge(member.id);

    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      '<div class="card-top">' +
        '<div class="member-info">' +
          '<div class="avatar ' + roleColor + '">' + initials + '</div>' +
          '<div>' +
            '<div class="member-name">' + escapeHtml(member.name) + ' ' + flagHtml + '</div>' +
            '<div class="member-email">' + escapeHtml(member.email) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card-actions">' +
          '<button class="btn-icon" onclick="showMemberFlags(\'' + member.id + '\')" title="View Flags">&#9873;</button>' +
          '<button class="btn-icon" onclick="editMember(\'' + member.id + '\')" title="Edit">&#9998;</button>' +
          '<button class="btn-icon btn-icon-danger" onclick="deleteMember(\'' + member.id + '\')" title="Delete">&#10005;</button>' +
        '</div>' +
      '</div>' +
      '<div class="card-bottom">' +
        '<div class="role-badge ' + roleColor + '">' + (role ? escapeHtml(role.name) : "No Role") + '</div>' +
        '<span class="status-badge status-' + member.status + '">' + formatStatus(member.status) + '</span>' +
        '<span class="card-meta">' + taskCount + ' active task' + (taskCount !== 1 ? 's' : '') + '</span>' +
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
    assigneeId: document.getElementById("task-assignee").value,
    priority: document.getElementById("task-priority").value,
    dueDate: document.getElementById("task-due").value,
    status: document.getElementById("task-status").value,
    createdAt: editId
      ? (data.tasks.find(function(t) { return t.id === editId; }) || {}).createdAt || new Date().toISOString()
      : new Date().toISOString()
  };

  // Preserve flag-related fields on edit
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
  // Show flags awarded on this task
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

function renderTasks() {
  var container = document.getElementById("tasks-list");
  if (!container) return;
  container.innerHTML = "";

  var filtered = data.tasks.filter(function(t) {
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
    var statusOrder = { "in-progress": 0, pending: 1, completed: 2 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  filtered.forEach(function(task) {
    var assignee = data.members.find(function(m) { return m.id === task.assigneeId; });
    var overdueClass = isOverdue(task) ? " task-overdue" : "";
    var flagIndicator = getTaskFlagIndicator(task);

    var card = document.createElement("div");
    card.className = "card task-card" + (task.status === "completed" ? " task-completed" : "") + overdueClass;
    card.innerHTML =
      '<div class="card-top">' +
        '<div class="task-info">' +
          '<button class="task-checkbox ' + (task.status === "completed" ? "checked" : "") + '" onclick="toggleTaskStatus(\'' + task.id + '\')">' +
            (task.status === "completed" ? "&#10003;" : "") +
          '</button>' +
          '<div>' +
            '<div class="task-title">' + escapeHtml(task.title) + ' ' + flagIndicator + '</div>' +
            (task.description ? '<div class="task-desc">' + escapeHtml(task.description) + '</div>' : '') +
          '</div>' +
        '</div>' +
        '<div class="card-actions">' +
          (task.status !== "completed" && task.assigneeId
            ? '<button class="btn-icon btn-icon-blunder" onclick="openBlunder(\'' + task.id + '\')" title="Report Blunder">&#9873;</button>'
            : '') +
          '<button class="btn-icon" onclick="editTask(\'' + task.id + '\')" title="Edit">&#9998;</button>' +
          '<button class="btn-icon btn-icon-danger" onclick="deleteTask(\'' + task.id + '\')" title="Delete">&#10005;</button>' +
        '</div>' +
      '</div>' +
      '<div class="card-bottom">' +
        '<span class="priority-badge priority-' + task.priority + '">' + task.priority + '</span>' +
        '<span class="status-badge status-' + task.status + '">' + formatStatus(task.status) + '</span>' +
        (isOverdue(task) ? '<span class="status-badge status-overdue">Overdue</span>' : '') +
        (assignee ? '<span class="card-meta">Assigned to ' + escapeHtml(assignee.name) + '</span>' : '<span class="card-meta">Unassigned</span>') +
        (task.dueDate ? '<span class="card-meta">Due ' + formatDate(task.dueDate) + '</span>' : '') +
      '</div>';
    container.appendChild(card);
  });
}

// ==================== Dashboard ====================

function renderDashboard() {
  var activeTasks = data.tasks.filter(function(t) { return t.status !== "completed"; });

  // Count all flags
  var totalGreen = 0;
  var totalRed = 0;
  data.flags.forEach(function(f) {
    if (f.color === "green") totalGreen += f.count;
    else if (f.color === "red") totalRed += f.count;
  });

  document.getElementById("stat-members").textContent = data.members.length;
  document.getElementById("stat-tasks").textContent = activeTasks.length;
  document.getElementById("stat-green-flags").textContent = totalGreen;
  document.getElementById("stat-red-flags").textContent = totalRed;

  // Member Flag Status (sorted by net score descending)
  var flagStatusEl = document.getElementById("dashboard-flag-status");
  if (flagStatusEl) {
    if (data.members.length === 0) {
      flagStatusEl.innerHTML = '<div class="empty-state-sm">No members yet</div>';
    } else {
      var memberFlagData = data.members.map(function(m) {
        var flags = getMemberFlags(m.id);
        return { member: m, green: flags.green, red: flags.red, net: flags.green - flags.red };
      }).sort(function(a, b) { return b.net - a.net; });

      flagStatusEl.innerHTML = "";
      memberFlagData.forEach(function(mf) {
        var initials = mf.member.name.split(" ").map(function(n) { return n[0]; }).join("").toUpperCase().substring(0, 2);
        var role = data.roles.find(function(r) { return r.id === mf.member.roleId; });
        var roleColor = role ? role.color : "blue";
        var netClass = mf.net > 0 ? "green" : (mf.net < 0 ? "red" : "neutral");

        var item = document.createElement("div");
        item.className = "dashboard-list-item clickable";
        item.onclick = function() { showMemberFlags(mf.member.id); };
        item.innerHTML =
          '<div class="avatar avatar-sm ' + roleColor + '">' + initials + '</div>' +
          '<div class="dashboard-item-info">' +
            '<span class="dashboard-item-name">' + escapeHtml(mf.member.name) + '</span>' +
            '<span class="dashboard-item-detail">' + (role ? escapeHtml(role.name) : "No Role") + '</span>' +
          '</div>' +
          '<div class="dashboard-flag-chips">' +
            '<span class="flag-chip flag-chip-green">&#9873; ' + mf.green + '</span>' +
            '<span class="flag-chip flag-chip-red">&#9873; ' + mf.red + '</span>' +
            '<span class="flag-chip flag-chip-net ' + netClass + '">' + (mf.net > 0 ? '+' : '') + mf.net + '</span>' +
          '</div>';
        flagStatusEl.appendChild(item);
      });
    }
  }

  // Overdue Tasks
  var overdueEl = document.getElementById("dashboard-overdue");
  if (overdueEl) {
    var overdueTasks = data.tasks.filter(function(t) { return isOverdue(t); });
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

  // Recent members (last 5)
  var recentMembers = document.getElementById("recent-members");
  if (recentMembers) {
    var recent = data.members.slice(-5).reverse();
    if (recent.length === 0) {
      recentMembers.innerHTML = '<div class="empty-state-sm">No members yet</div>';
    } else {
      recentMembers.innerHTML = "";
      recent.forEach(function(member) {
        var role = data.roles.find(function(r) { return r.id === member.roleId; });
        var initials = member.name.split(" ").map(function(n) { return n[0]; }).join("").toUpperCase().substring(0, 2);
        var roleColor = role ? role.color : "blue";
        var flagHtml = renderFlagBadge(member.id);
        var item = document.createElement("div");
        item.className = "dashboard-list-item";
        item.innerHTML =
          '<div class="avatar avatar-sm ' + roleColor + '">' + initials + '</div>' +
          '<div class="dashboard-item-info">' +
            '<span class="dashboard-item-name">' + escapeHtml(member.name) + ' ' + flagHtml + '</span>' +
            '<span class="dashboard-item-detail">' + (role ? escapeHtml(role.name) : "No Role") + '</span>' +
          '</div>' +
          '<span class="status-badge status-' + member.status + '">' + formatStatus(member.status) + '</span>';
        recentMembers.appendChild(item);
      });
    }
  }

  // Recent tasks (last 5)
  var recentTasks = document.getElementById("recent-tasks");
  if (recentTasks) {
    var recentT = data.tasks.slice(-5).reverse();
    if (recentT.length === 0) {
      recentTasks.innerHTML = '<div class="empty-state-sm">No tasks yet</div>';
    } else {
      recentTasks.innerHTML = "";
      recentT.forEach(function(task) {
        var assignee = data.members.find(function(m) { return m.id === task.assigneeId; });
        var flagIndicator = getTaskFlagIndicator(task);
        var item = document.createElement("div");
        item.className = "dashboard-list-item";
        item.innerHTML =
          '<div class="dashboard-item-info">' +
            '<span class="dashboard-item-name">' + escapeHtml(task.title) + ' ' + flagIndicator + '</span>' +
            '<span class="dashboard-item-detail">' + (assignee ? escapeHtml(assignee.name) : "Unassigned") + '</span>' +
          '</div>' +
          '<span class="priority-badge priority-' + task.priority + '">' + task.priority + '</span>' +
          '<span class="status-badge status-' + task.status + '">' + formatStatus(task.status) + '</span>';
        recentTasks.appendChild(item);
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
    // Remove flags for deleted member
    data.flags = data.flags.filter(function(f) { return f.memberId !== pendingDeleteId; });
  } else if (pendingDeleteType === "task") {
    data.tasks = data.tasks.filter(function(t) { return t.id !== pendingDeleteId; });
    // Remove flags tied to deleted task
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
