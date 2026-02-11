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

// ==================== Sample Seed Data ====================

function seedSampleData() {
  if (localStorage.getItem("boss_seeded")) return;

  var roles = [
    { id: "role_cto", name: "CTO", description: "Chief Technology Officer - leads all technical strategy and engineering teams", color: "blue", createdAt: "2025-11-20T09:00:00.000Z" },
    { id: "role_pm", name: "Product Manager", description: "Owns the product roadmap and prioritizes features based on user feedback", color: "green", createdAt: "2025-11-20T09:05:00.000Z" },
    { id: "role_dev", name: "Developer", description: "Full-stack software developer building core platform features", color: "purple", createdAt: "2025-11-20T09:10:00.000Z" },
    { id: "role_design", name: "Designer", description: "UI/UX designer creating user interfaces and design systems", color: "yellow", createdAt: "2025-11-20T09:15:00.000Z" },
    { id: "role_qa", name: "QA Engineer", description: "Quality assurance engineer responsible for testing and release quality", color: "red", createdAt: "2025-11-20T09:20:00.000Z" },
    { id: "role_mkt", name: "Marketing Lead", description: "Drives growth strategy, campaigns, and brand awareness", color: "green", createdAt: "2025-11-22T10:00:00.000Z" }
  ];

  var members = [
    { id: "mem_alex", name: "Alex Johnson", email: "alex@bossteam.io", roleId: "role_cto", status: "active", createdAt: "2025-11-25T08:00:00.000Z" },
    { id: "mem_sarah", name: "Sarah Chen", email: "sarah@bossteam.io", roleId: "role_pm", status: "active", createdAt: "2025-11-25T08:10:00.000Z" },
    { id: "mem_mike", name: "Mike Rivera", email: "mike@bossteam.io", roleId: "role_dev", status: "active", createdAt: "2025-11-26T09:00:00.000Z" },
    { id: "mem_priya", name: "Priya Patel", email: "priya@bossteam.io", roleId: "role_dev", status: "active", createdAt: "2025-11-26T09:15:00.000Z" },
    { id: "mem_james", name: "James Kim", email: "james@bossteam.io", roleId: "role_design", status: "active", createdAt: "2025-11-27T10:00:00.000Z" },
    { id: "mem_emma", name: "Emma Wilson", email: "emma@bossteam.io", roleId: "role_qa", status: "active", createdAt: "2025-11-28T08:30:00.000Z" },
    { id: "mem_omar", name: "Omar Hassan", email: "omar@bossteam.io", roleId: "role_dev", status: "on-leave", createdAt: "2025-12-01T09:00:00.000Z" },
    { id: "mem_lisa", name: "Lisa Zhang", email: "lisa@bossteam.io", roleId: "role_mkt", status: "active", createdAt: "2025-12-02T10:00:00.000Z" },
    { id: "mem_david", name: "David Brown", email: "david@bossteam.io", roleId: "role_dev", status: "active", createdAt: "2025-12-10T08:00:00.000Z" },
    { id: "mem_nina", name: "Nina Rossi", email: "nina@bossteam.io", roleId: "role_qa", status: "inactive", createdAt: "2025-12-15T09:00:00.000Z" }
  ];

  // December 2025 tasks (created in Dec, various statuses)
  var decTasks = [
    { id: "task_d01", title: "Set up CI/CD pipeline", description: "Configure GitHub Actions for automated builds and deployments", assigneeId: "mem_alex", priority: "high", dueDate: "2025-12-10", status: "completed", createdAt: "2025-12-01T09:00:00.000Z", completedAt: "2025-12-08T16:00:00.000Z" },
    { id: "task_d02", title: "Design onboarding flow", description: "Create wireframes and prototypes for new user onboarding experience", assigneeId: "mem_james", priority: "high", dueDate: "2025-12-12", status: "completed", createdAt: "2025-12-01T10:00:00.000Z", completedAt: "2025-12-11T14:00:00.000Z" },
    { id: "task_d03", title: "User authentication module", description: "Implement JWT-based authentication with refresh tokens", assigneeId: "mem_mike", priority: "high", dueDate: "2025-12-15", status: "completed", createdAt: "2025-12-02T08:30:00.000Z", completedAt: "2025-12-14T17:00:00.000Z" },
    { id: "task_d04", title: "Database schema design", description: "Design PostgreSQL schema for core entities", assigneeId: "mem_priya", priority: "high", dueDate: "2025-12-08", status: "completed", createdAt: "2025-12-02T09:00:00.000Z", completedAt: "2025-12-07T15:00:00.000Z" },
    { id: "task_d05", title: "Write QA test plan", description: "Create comprehensive test plan for the authentication module", assigneeId: "mem_emma", priority: "medium", dueDate: "2025-12-16", status: "completed", createdAt: "2025-12-03T11:00:00.000Z", completedAt: "2025-12-15T12:00:00.000Z" },
    { id: "task_d06", title: "Create product roadmap Q1", description: "Define product roadmap and milestones for Q1 2026", assigneeId: "mem_sarah", priority: "high", dueDate: "2025-12-18", status: "completed", createdAt: "2025-12-04T08:00:00.000Z", completedAt: "2025-12-17T16:30:00.000Z" },
    { id: "task_d07", title: "Homepage redesign mockups", description: "Design 3 homepage layout variations with responsive views", assigneeId: "mem_james", priority: "medium", dueDate: "2025-12-20", status: "completed", createdAt: "2025-12-05T10:00:00.000Z", completedAt: "2025-12-19T11:00:00.000Z" },
    { id: "task_d08", title: "API rate limiting", description: "Implement rate limiting middleware for all public API endpoints", assigneeId: "mem_mike", priority: "medium", dueDate: "2025-12-22", status: "completed", createdAt: "2025-12-08T09:00:00.000Z", completedAt: "2025-12-20T14:00:00.000Z" },
    { id: "task_d09", title: "Set up monitoring dashboard", description: "Configure Grafana dashboards for server metrics and alerting", assigneeId: "mem_alex", priority: "medium", dueDate: "2025-12-20", status: "completed", createdAt: "2025-12-08T10:00:00.000Z", completedAt: "2025-12-19T10:00:00.000Z" },
    { id: "task_d10", title: "Marketing landing page copy", description: "Write copy for the new product landing page including CTAs", assigneeId: "mem_lisa", priority: "medium", dueDate: "2025-12-22", status: "completed", createdAt: "2025-12-10T08:00:00.000Z", completedAt: "2025-12-21T15:00:00.000Z" },
    { id: "task_d11", title: "Integration testing suite", description: "Build integration tests for user registration and login flows", assigneeId: "mem_emma", priority: "medium", dueDate: "2025-12-24", status: "completed", createdAt: "2025-12-12T09:00:00.000Z", completedAt: "2025-12-23T13:00:00.000Z" },
    { id: "task_d12", title: "User profile page", description: "Implement user profile page with avatar upload and settings", assigneeId: "mem_priya", priority: "low", dueDate: "2025-12-28", status: "completed", createdAt: "2025-12-15T08:00:00.000Z", completedAt: "2025-12-27T14:00:00.000Z" },
    { id: "task_d13", title: "Email notification system", description: "Set up transactional email service for user notifications", assigneeId: "mem_omar", priority: "medium", dueDate: "2025-12-30", status: "pending", createdAt: "2025-12-16T09:00:00.000Z", completedAt: null },
    { id: "task_d14", title: "Social media campaign plan", description: "Plan December social media content calendar and ad strategy", assigneeId: "mem_lisa", priority: "low", dueDate: "2025-12-18", status: "completed", createdAt: "2025-12-10T14:00:00.000Z", completedAt: "2025-12-17T10:00:00.000Z" },
    { id: "task_d15", title: "Code review guidelines", description: "Document code review process and best practices for the team", assigneeId: "mem_alex", priority: "low", dueDate: "2025-12-28", status: "completed", createdAt: "2025-12-18T08:00:00.000Z", completedAt: "2025-12-26T16:00:00.000Z" },
    { id: "task_d16", title: "Performance benchmark tests", description: "Run load tests on API endpoints and document baseline metrics", assigneeId: "mem_emma", priority: "medium", dueDate: "2025-12-30", status: "in-progress", createdAt: "2025-12-20T09:00:00.000Z", completedAt: null }
  ];

  // January 2026 tasks (created in Jan, various statuses)
  var janTasks = [
    { id: "task_j01", title: "Implement search functionality", description: "Build full-text search with filters across all entities", assigneeId: "mem_mike", priority: "high", dueDate: "2026-01-10", status: "completed", createdAt: "2026-01-02T09:00:00.000Z", completedAt: "2026-01-09T17:00:00.000Z" },
    { id: "task_j02", title: "Dashboard analytics module", description: "Build analytics dashboard with charts for team metrics", assigneeId: "mem_priya", priority: "high", dueDate: "2026-01-12", status: "completed", createdAt: "2026-01-02T09:30:00.000Z", completedAt: "2026-01-11T15:00:00.000Z" },
    { id: "task_j03", title: "Design system v2", description: "Update design system with new components and token structure", assigneeId: "mem_james", priority: "high", dueDate: "2026-01-15", status: "completed", createdAt: "2026-01-03T08:00:00.000Z", completedAt: "2026-01-14T16:00:00.000Z" },
    { id: "task_j04", title: "Sprint planning Q1", description: "Break down Q1 roadmap into sprints and assign story points", assigneeId: "mem_sarah", priority: "high", dueDate: "2026-01-08", status: "completed", createdAt: "2026-01-03T10:00:00.000Z", completedAt: "2026-01-07T14:00:00.000Z" },
    { id: "task_j05", title: "Automated regression tests", description: "Expand test coverage to include all critical user journeys", assigneeId: "mem_emma", priority: "high", dueDate: "2026-01-15", status: "completed", createdAt: "2026-01-05T09:00:00.000Z", completedAt: "2026-01-14T11:00:00.000Z" },
    { id: "task_j06", title: "Real-time notifications", description: "Implement WebSocket-based real-time notification system", assigneeId: "mem_mike", priority: "high", dueDate: "2026-01-18", status: "completed", createdAt: "2026-01-06T08:00:00.000Z", completedAt: "2026-01-17T16:00:00.000Z" },
    { id: "task_j07", title: "Team permissions system", description: "Build role-based access control for team workspaces", assigneeId: "mem_priya", priority: "high", dueDate: "2026-01-20", status: "completed", createdAt: "2026-01-07T09:00:00.000Z", completedAt: "2026-01-19T15:00:00.000Z" },
    { id: "task_j08", title: "Content marketing strategy", description: "Define blog content calendar and SEO keyword targets for Q1", assigneeId: "mem_lisa", priority: "medium", dueDate: "2026-01-15", status: "completed", createdAt: "2026-01-06T10:00:00.000Z", completedAt: "2026-01-14T12:00:00.000Z" },
    { id: "task_j09", title: "Mobile responsive audit", description: "Audit and fix all responsive design issues on mobile devices", assigneeId: "mem_james", priority: "medium", dueDate: "2026-01-22", status: "completed", createdAt: "2026-01-08T08:00:00.000Z", completedAt: "2026-01-21T10:00:00.000Z" },
    { id: "task_j10", title: "DevOps infrastructure upgrade", description: "Migrate to containerized infrastructure with Kubernetes", assigneeId: "mem_alex", priority: "high", dueDate: "2026-01-25", status: "completed", createdAt: "2026-01-10T09:00:00.000Z", completedAt: "2026-01-24T17:00:00.000Z" },
    { id: "task_j11", title: "User feedback survey analysis", description: "Analyze Q4 user feedback and create actionable insights report", assigneeId: "mem_sarah", priority: "medium", dueDate: "2026-01-20", status: "completed", createdAt: "2026-01-10T10:00:00.000Z", completedAt: "2026-01-19T14:00:00.000Z" },
    { id: "task_j12", title: "API documentation overhaul", description: "Rewrite API docs with interactive examples using Swagger/OpenAPI", assigneeId: "mem_david", priority: "medium", dueDate: "2026-01-22", status: "completed", createdAt: "2026-01-12T08:00:00.000Z", completedAt: "2026-01-21T16:00:00.000Z" },
    { id: "task_j13", title: "Accessibility compliance audit", description: "Ensure WCAG 2.1 AA compliance across all user-facing pages", assigneeId: "mem_emma", priority: "medium", dueDate: "2026-01-28", status: "completed", createdAt: "2026-01-15T09:00:00.000Z", completedAt: "2026-01-27T13:00:00.000Z" },
    { id: "task_j14", title: "Data export feature", description: "Allow users to export their data in CSV and JSON formats", assigneeId: "mem_david", priority: "medium", dueDate: "2026-01-28", status: "in-progress", createdAt: "2026-01-16T08:00:00.000Z", completedAt: null },
    { id: "task_j15", title: "Onboarding email sequence", description: "Create 5-part drip email campaign for new user onboarding", assigneeId: "mem_lisa", priority: "medium", dueDate: "2026-01-25", status: "completed", createdAt: "2026-01-16T10:00:00.000Z", completedAt: "2026-01-24T11:00:00.000Z" },
    { id: "task_j16", title: "Dark mode theme support", description: "Implement system-aware dark/light mode toggle with persistence", assigneeId: "mem_james", priority: "low", dueDate: "2026-01-30", status: "completed", createdAt: "2026-01-18T09:00:00.000Z", completedAt: "2026-01-29T14:00:00.000Z" },
    { id: "task_j17", title: "Error tracking integration", description: "Set up Sentry for front-end error tracking and alerting", assigneeId: "mem_alex", priority: "medium", dueDate: "2026-01-28", status: "completed", createdAt: "2026-01-20T08:00:00.000Z", completedAt: "2026-01-27T15:00:00.000Z" },
    { id: "task_j18", title: "File upload microservice", description: "Build a dedicated service for handling file uploads with S3", assigneeId: "mem_priya", priority: "medium", dueDate: "2026-01-30", status: "in-progress", createdAt: "2026-01-22T09:00:00.000Z", completedAt: null },
    { id: "task_j19", title: "Security penetration testing", description: "Conduct security audit and pen test on all public endpoints", assigneeId: "mem_emma", priority: "high", dueDate: "2026-01-31", status: "pending", createdAt: "2026-01-24T08:00:00.000Z", completedAt: null },
    { id: "task_j20", title: "Investor metrics dashboard", description: "Build a metrics dashboard showcasing KPIs for investor updates", assigneeId: "mem_sarah", priority: "high", dueDate: "2026-01-31", status: "in-progress", createdAt: "2026-01-25T09:00:00.000Z", completedAt: null }
  ];

  var allTasks = decTasks.concat(janTasks);

  localStorage.setItem("boss_roles", JSON.stringify(roles));
  localStorage.setItem("boss_members", JSON.stringify(members));
  localStorage.setItem("boss_tasks", JSON.stringify(allTasks));
  localStorage.setItem("boss_seeded", "true");
}

seedSampleData();

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

// ==================== Analytics ====================

function getMonthTasks(year, month) {
  return data.tasks.filter(function(t) {
    var d = new Date(t.createdAt);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

function getCompletedInMonth(tasks) {
  return tasks.filter(function(t) { return t.status === "completed"; });
}

function renderAnalytics() {
  var decTasks = getMonthTasks(2025, 11); // December 2025
  var janTasks = getMonthTasks(2026, 0);  // January 2026
  var decCompleted = getCompletedInMonth(decTasks);
  var janCompleted = getCompletedInMonth(janTasks);

  var decRate = decTasks.length > 0 ? Math.round((decCompleted.length / decTasks.length) * 100) : 0;
  var janRate = janTasks.length > 0 ? Math.round((janCompleted.length / janTasks.length) * 100) : 0;

  // Summary cards
  var el;
  el = document.getElementById("dec-total"); if (el) el.textContent = decTasks.length;
  el = document.getElementById("dec-completed"); if (el) el.textContent = decCompleted.length;
  el = document.getElementById("dec-rate"); if (el) el.textContent = decRate + "%";
  el = document.getElementById("jan-total"); if (el) el.textContent = janTasks.length;
  el = document.getElementById("jan-completed"); if (el) el.textContent = janCompleted.length;
  el = document.getElementById("jan-rate"); if (el) el.textContent = janRate + "%";

  // Trend indicators
  var volumeChange = janTasks.length - decTasks.length;
  var rateChange = janRate - decRate;
  var decHigh = decTasks.filter(function(t) { return t.priority === "high"; }).length;
  var janHigh = janTasks.filter(function(t) { return t.priority === "high"; }).length;
  var highChange = janHigh - decHigh;

  var activeMembers = data.members.filter(function(m) { return m.status === "active"; }).length;
  var decAvg = activeMembers > 0 ? (decTasks.length / activeMembers).toFixed(1) : "0";
  var janAvg = activeMembers > 0 ? (janTasks.length / activeMembers).toFixed(1) : "0";

  el = document.getElementById("trend-volume");
  if (el) {
    el.textContent = (volumeChange > 0 ? "+" : "") + volumeChange + " tasks";
    el.className = "trend-value " + (volumeChange > 0 ? "trend-up" : volumeChange < 0 ? "trend-down" : "trend-neutral");
  }
  el = document.getElementById("trend-completion");
  if (el) {
    el.textContent = (rateChange > 0 ? "+" : "") + rateChange + "%";
    el.className = "trend-value " + (rateChange > 0 ? "trend-up" : rateChange < 0 ? "trend-down" : "trend-neutral");
  }
  el = document.getElementById("trend-high-priority");
  if (el) {
    el.textContent = (highChange > 0 ? "+" : "") + highChange + " tasks";
    el.className = "trend-value " + (highChange > 0 ? "trend-up" : highChange < 0 ? "trend-down" : "trend-neutral");
  }
  el = document.getElementById("trend-avg-tasks");
  if (el) {
    el.textContent = decAvg + " → " + janAvg;
    el.className = "trend-value " + (parseFloat(janAvg) > parseFloat(decAvg) ? "trend-up" : parseFloat(janAvg) < parseFloat(decAvg) ? "trend-down" : "trend-neutral");
  }

  // Status comparison bar chart
  renderGroupedBarChart("chart-status", ["Completed", "In Progress", "Pending"], [
    { label: "Dec", values: [
      decTasks.filter(function(t) { return t.status === "completed"; }).length,
      decTasks.filter(function(t) { return t.status === "in-progress"; }).length,
      decTasks.filter(function(t) { return t.status === "pending"; }).length
    ]},
    { label: "Jan", values: [
      janTasks.filter(function(t) { return t.status === "completed"; }).length,
      janTasks.filter(function(t) { return t.status === "in-progress"; }).length,
      janTasks.filter(function(t) { return t.status === "pending"; }).length
    ]}
  ]);

  // Priority comparison bar chart
  renderGroupedBarChart("chart-priority", ["High", "Medium", "Low"], [
    { label: "Dec", values: [
      decTasks.filter(function(t) { return t.priority === "high"; }).length,
      decTasks.filter(function(t) { return t.priority === "medium"; }).length,
      decTasks.filter(function(t) { return t.priority === "low"; }).length
    ]},
    { label: "Jan", values: [
      janTasks.filter(function(t) { return t.priority === "high"; }).length,
      janTasks.filter(function(t) { return t.priority === "medium"; }).length,
      janTasks.filter(function(t) { return t.priority === "low"; }).length
    ]}
  ]);

  // Member performance table
  renderMemberPerformance(decTasks, janTasks);

  // Weekly timeline
  renderWeeklyTimeline(decTasks, janTasks);
}

function renderGroupedBarChart(containerId, categories, datasets) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  var allValues = [];
  datasets.forEach(function(ds) { allValues = allValues.concat(ds.values); });
  var maxVal = Math.max.apply(null, allValues.concat([1]));

  categories.forEach(function(cat, i) {
    var row = document.createElement("div");
    row.className = "bar-row";

    var labelEl = document.createElement("div");
    labelEl.className = "bar-label";
    labelEl.textContent = cat;
    row.appendChild(labelEl);

    var barsWrap = document.createElement("div");
    barsWrap.className = "bars-wrap";

    datasets.forEach(function(ds, di) {
      var val = ds.values[i];
      var pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
      var bar = document.createElement("div");
      bar.className = "bar-track";
      var fill = document.createElement("div");
      fill.className = "bar-fill " + (di === 0 ? "bar-dec" : "bar-jan");
      fill.style.width = pct + "%";
      var valLabel = document.createElement("span");
      valLabel.className = "bar-value";
      valLabel.textContent = val;
      fill.appendChild(valLabel);
      bar.appendChild(fill);
      barsWrap.appendChild(bar);
    });

    row.appendChild(barsWrap);
    container.appendChild(row);
  });
}

function renderMemberPerformance(decTasks, janTasks) {
  var tbody = document.getElementById("member-performance-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  data.members.forEach(function(member) {
    var role = data.roles.find(function(r) { return r.id === member.roleId; });
    var decMemberTasks = decTasks.filter(function(t) { return t.assigneeId === member.id; });
    var decMemberCompleted = decMemberTasks.filter(function(t) { return t.status === "completed"; });
    var janMemberTasks = janTasks.filter(function(t) { return t.assigneeId === member.id; });
    var janMemberCompleted = janMemberTasks.filter(function(t) { return t.status === "completed"; });

    var decCount = decMemberCompleted.length;
    var janCount = janMemberCompleted.length;
    var diff = janCount - decCount;
    var trendClass = diff > 0 ? "trend-up" : diff < 0 ? "trend-down" : "trend-neutral";
    var trendText = diff > 0 ? "+" + diff + " more" : diff < 0 ? diff + " fewer" : "Same";

    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td><div class="table-member"><div class="avatar avatar-sm ' + (role ? role.color : "blue") + '">' +
        member.name.split(" ").map(function(n) { return n[0]; }).join("").toUpperCase().substring(0, 2) +
      '</div> ' + escapeHtml(member.name) + '</div></td>' +
      '<td><span class="role-badge ' + (role ? role.color : "blue") + '">' + (role ? escapeHtml(role.name) : "None") + '</span></td>' +
      '<td>' + decMemberTasks.length + '</td>' +
      '<td>' + decMemberCompleted.length + '</td>' +
      '<td>' + janMemberTasks.length + '</td>' +
      '<td>' + janMemberCompleted.length + '</td>' +
      '<td><span class="' + trendClass + '">' + trendText + '</span></td>';
    tbody.appendChild(tr);
  });
}

function renderWeeklyTimeline(decTasks, janTasks) {
  var container = document.getElementById("chart-timeline");
  if (!container) return;
  container.innerHTML = "";

  function getWeeklyCompletions(tasks, year, month) {
    var weeks = [0, 0, 0, 0, 0];
    tasks.forEach(function(t) {
      if (t.status === "completed" && t.completedAt) {
        var d = new Date(t.completedAt);
        if (d.getFullYear() === year && d.getMonth() === month) {
          var weekNum = Math.min(Math.floor((d.getDate() - 1) / 7), 4);
          weeks[weekNum]++;
        }
      }
    });
    return weeks;
  }

  var decWeekly = getWeeklyCompletions(decTasks, 2025, 11);
  var janWeekly = getWeeklyCompletions(janTasks, 2026, 0);
  var allWeekly = decWeekly.concat(janWeekly);
  var maxWeek = Math.max.apply(null, allWeekly.concat([1]));

  var weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

  // December weeks
  var decSection = document.createElement("div");
  decSection.className = "timeline-section";
  var decHeader = document.createElement("div");
  decHeader.className = "timeline-month-header";
  decHeader.textContent = "December 2025";
  decSection.appendChild(decHeader);

  decWeekly.forEach(function(val, i) {
    var row = document.createElement("div");
    row.className = "timeline-row";
    var label = document.createElement("div");
    label.className = "timeline-label";
    label.textContent = weekLabels[i];
    var track = document.createElement("div");
    track.className = "bar-track";
    var fill = document.createElement("div");
    fill.className = "bar-fill bar-dec";
    fill.style.width = (maxWeek > 0 ? (val / maxWeek) * 100 : 0) + "%";
    var valSpan = document.createElement("span");
    valSpan.className = "bar-value";
    valSpan.textContent = val;
    fill.appendChild(valSpan);
    track.appendChild(fill);
    row.appendChild(label);
    row.appendChild(track);
    decSection.appendChild(row);
  });
  container.appendChild(decSection);

  // January weeks
  var janSection = document.createElement("div");
  janSection.className = "timeline-section";
  var janHeader = document.createElement("div");
  janHeader.className = "timeline-month-header";
  janHeader.textContent = "January 2026";
  janSection.appendChild(janHeader);

  janWeekly.forEach(function(val, i) {
    var row = document.createElement("div");
    row.className = "timeline-row";
    var label = document.createElement("div");
    label.className = "timeline-label";
    label.textContent = weekLabels[i];
    var track = document.createElement("div");
    track.className = "bar-track";
    var fill = document.createElement("div");
    fill.className = "bar-fill bar-jan";
    fill.style.width = (maxWeek > 0 ? (val / maxWeek) * 100 : 0) + "%";
    var valSpan = document.createElement("span");
    valSpan.className = "bar-value";
    valSpan.textContent = val;
    fill.appendChild(valSpan);
    track.appendChild(fill);
    row.appendChild(label);
    row.appendChild(track);
    janSection.appendChild(row);
  });
  container.appendChild(janSection);
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
  renderAnalytics();
}

// ==================== Initialize ====================

document.addEventListener("DOMContentLoaded", function() {
  refreshAll();
});
