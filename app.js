// ==================== Data Store ====================

function loadData() {
  return {
    members: JSON.parse(localStorage.getItem("boss_members") || "[]"),
    tasks: JSON.parse(localStorage.getItem("boss_tasks") || "[]"),
    roles: JSON.parse(localStorage.getItem("boss_roles") || "[]")
  };
}

function saveData(data) {
  localStorage.setItem("boss_members", JSON.stringify(data.members));
  localStorage.setItem("boss_tasks", JSON.stringify(data.tasks));
  localStorage.setItem("boss_roles", JSON.stringify(data.roles));
}

let data = loadData();
let currentFilter = "all";
let pendingDeleteType = null;
let pendingDeleteId = null;

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
        '<div class="role-badge ' + role.color + '">' + role.name + '</div>' +
        '<div class="card-actions">' +
          '<button class="btn-icon" onclick="editRole(\'' + role.id + '\')" title="Edit">&#9998;</button>' +
          '<button class="btn-icon btn-icon-danger" onclick="deleteRole(\'' + role.id + '\')" title="Delete">&#10005;</button>' +
        '</div>' +
      '</div>' +
      '<p class="card-desc">' + (role.description || "No description") + '</p>' +
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

    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      '<div class="card-top">' +
        '<div class="member-info">' +
          '<div class="avatar ' + roleColor + '">' + initials + '</div>' +
          '<div>' +
            '<div class="member-name">' + escapeHtml(member.name) + '</div>' +
            '<div class="member-email">' + escapeHtml(member.email) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card-actions">' +
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

  if (editId) {
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

function toggleTaskStatus(id) {
  var task = data.tasks.find(function(t) { return t.id === id; });
  if (!task) return;
  if (task.status === "completed") {
    task.status = "pending";
  } else {
    task.status = "completed";
  }
  saveData(data);
  refreshAll();
}

function filterTasks(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.getAttribute("data-filter") === filter);
  });
  renderTasks();
}

function renderTasks() {
  var container = document.getElementById("tasks-list");
  if (!container) return;
  container.innerHTML = "";

  var filtered = data.tasks.filter(function(t) {
    if (currentFilter === "all") return true;
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
    var card = document.createElement("div");
    card.className = "card task-card" + (task.status === "completed" ? " task-completed" : "");
    card.innerHTML =
      '<div class="card-top">' +
        '<div class="task-info">' +
          '<button class="task-checkbox ' + (task.status === "completed" ? "checked" : "") + '" onclick="toggleTaskStatus(\'' + task.id + '\')">' +
            (task.status === "completed" ? "&#10003;" : "") +
          '</button>' +
          '<div>' +
            '<div class="task-title">' + escapeHtml(task.title) + '</div>' +
            (task.description ? '<div class="task-desc">' + escapeHtml(task.description) + '</div>' : '') +
          '</div>' +
        '</div>' +
        '<div class="card-actions">' +
          '<button class="btn-icon" onclick="editTask(\'' + task.id + '\')" title="Edit">&#9998;</button>' +
          '<button class="btn-icon btn-icon-danger" onclick="deleteTask(\'' + task.id + '\')" title="Delete">&#10005;</button>' +
        '</div>' +
      '</div>' +
      '<div class="card-bottom">' +
        '<span class="priority-badge priority-' + task.priority + '">' + task.priority + '</span>' +
        '<span class="status-badge status-' + task.status + '">' + formatStatus(task.status) + '</span>' +
        (assignee ? '<span class="card-meta">Assigned to ' + escapeHtml(assignee.name) + '</span>' : '<span class="card-meta">Unassigned</span>') +
        (task.dueDate ? '<span class="card-meta">Due ' + formatDate(task.dueDate) + '</span>' : '') +
      '</div>';
    container.appendChild(card);
  });
}

// ==================== Dashboard ====================

function renderDashboard() {
  var activeTasks = data.tasks.filter(function(t) { return t.status !== "completed"; });
  var completedTasks = data.tasks.filter(function(t) { return t.status === "completed"; });

  document.getElementById("stat-members").textContent = data.members.length;
  document.getElementById("stat-tasks").textContent = activeTasks.length;
  document.getElementById("stat-completed").textContent = completedTasks.length;
  document.getElementById("stat-roles").textContent = data.roles.length;

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
        var item = document.createElement("div");
        item.className = "dashboard-list-item";
        item.innerHTML =
          '<div class="avatar avatar-sm ' + roleColor + '">' + initials + '</div>' +
          '<div class="dashboard-item-info">' +
            '<span class="dashboard-item-name">' + escapeHtml(member.name) + '</span>' +
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
        var item = document.createElement("div");
        item.className = "dashboard-list-item";
        item.innerHTML =
          '<div class="dashboard-item-info">' +
            '<span class="dashboard-item-name">' + escapeHtml(task.title) + '</span>' +
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
  } else if (pendingDeleteType === "task") {
    data.tasks = data.tasks.filter(function(t) { return t.id !== pendingDeleteId; });
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
  renderDashboard();
  renderMembers();
  renderTasks();
  renderRoles();
}

// ==================== Initialize ====================

document.addEventListener("DOMContentLoaded", function() {
  refreshAll();
});
