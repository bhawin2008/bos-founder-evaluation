// Startup Studio - Venture Pipeline Manager
(function () {
  'use strict';

  // Evaluation criteria definitions
  const CRITERIA = [
    { id: 'market', label: 'Market Opportunity', desc: 'Size, growth, and accessibility of the target market' },
    { id: 'problem', label: 'Problem Severity', desc: 'How painful is the problem you are solving?' },
    { id: 'solution', label: 'Solution Fit', desc: 'How well does your solution address the problem?' },
    { id: 'competitive', label: 'Competitive Advantage', desc: 'Defensibility and differentiation from competitors' },
    { id: 'team', label: 'Team Readiness', desc: 'Skills, experience, and capacity of the founding team' },
    { id: 'feasibility', label: 'Technical Feasibility', desc: 'Can you build this with available resources and technology?' },
    { id: 'revenue', label: 'Revenue Potential', desc: 'Clarity and scale of the monetization path' },
    { id: 'timing', label: 'Market Timing', desc: 'Is now the right time for this venture?' },
  ];

  const REVENUE_MODEL_LABELS = {
    saas: 'SaaS Subscription',
    marketplace: 'Marketplace',
    freemium: 'Freemium',
    transactional: 'Transactional',
    advertising: 'Advertising',
    licensing: 'Licensing',
    other: 'Other',
  };

  const STAGE_LABELS = {
    idea: 'Idea',
    validating: 'Validating',
    building: 'Building',
    launched: 'Launched',
    paused: 'Paused',
  };

  // Sample seed data
  const SEED_VENTURES = [
    {
      id: '1',
      name: 'AI Scheduling Assistant',
      description: 'An AI-powered scheduling tool that learns meeting preferences and automatically finds optimal times across teams and time zones.',
      stage: 'validating',
      market: 'Remote teams & distributed companies',
      revenueModel: 'saas',
      scores: { market: 8, problem: 7, solution: 8, competitive: 6, team: 7, feasibility: 8, revenue: 7, timing: 9 },
      createdAt: '2026-01-15T10:00:00Z',
      updatedAt: '2026-02-01T14:30:00Z',
    },
    {
      id: '2',
      name: 'Founder Wellness Tracker',
      description: 'A wellness and burnout prevention app specifically designed for startup founders, tracking stress, sleep, and workload patterns.',
      stage: 'idea',
      market: 'Startup founders & entrepreneurs',
      revenueModel: 'freemium',
      scores: { market: 6, problem: 8, solution: 5, competitive: 4, team: 6, feasibility: 9, revenue: 5, timing: 7 },
      createdAt: '2026-02-05T09:00:00Z',
      updatedAt: '2026-02-05T09:00:00Z',
    },
    {
      id: '3',
      name: 'MicroSaaS Marketplace',
      description: 'A curated marketplace for buying and selling small SaaS businesses under $50k ARR, with built-in due diligence tools.',
      stage: 'building',
      market: 'Indie hackers & micro-entrepreneurs',
      revenueModel: 'marketplace',
      scores: { market: 7, problem: 7, solution: 7, competitive: 5, team: 8, feasibility: 6, revenue: 8, timing: 8 },
      createdAt: '2025-12-01T08:00:00Z',
      updatedAt: '2026-02-10T11:00:00Z',
    },
    {
      id: '4',
      name: 'Local Commerce Platform',
      description: 'A hyperlocal e-commerce platform connecting neighborhood shops with nearby customers for same-day delivery.',
      stage: 'launched',
      market: 'Local retail businesses',
      revenueModel: 'transactional',
      scores: { market: 8, problem: 6, solution: 7, competitive: 5, team: 7, feasibility: 7, revenue: 7, timing: 6 },
      createdAt: '2025-09-20T12:00:00Z',
      updatedAt: '2026-01-28T16:00:00Z',
    },
    {
      id: '5',
      name: 'DevTool Analytics',
      description: 'Usage analytics and adoption metrics for developer tools and APIs, helping DevRel teams understand developer journeys.',
      stage: 'idea',
      market: 'Developer tool companies',
      revenueModel: 'saas',
      scores: {},
      createdAt: '2026-02-12T10:00:00Z',
      updatedAt: '2026-02-12T10:00:00Z',
    },
    {
      id: '6',
      name: 'Carbon Offset Tracker',
      description: 'B2B SaaS for startups to track, report, and offset their carbon footprint with verified credits and automated reporting.',
      stage: 'paused',
      market: 'Climate-conscious startups',
      revenueModel: 'saas',
      scores: { market: 6, problem: 5, solution: 6, competitive: 4, team: 5, feasibility: 7, revenue: 5, timing: 6 },
      createdAt: '2025-10-10T08:00:00Z',
      updatedAt: '2026-01-15T09:00:00Z',
    },
  ];

  // State
  let ventures = [];
  let currentView = 'dashboard';
  let evaluatingVentureId = null;

  // Initialize
  function init() {
    loadData();
    bindEvents();
    renderCurrentView();
  }

  // Data persistence
  function loadData() {
    const stored = localStorage.getItem('startup-studio-ventures');
    if (stored) {
      ventures = JSON.parse(stored);
    } else {
      ventures = SEED_VENTURES;
      saveData();
    }
  }

  function saveData() {
    localStorage.setItem('startup-studio-ventures', JSON.stringify(ventures));
  }

  // Navigation
  function bindEvents() {
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        switchView(this.dataset.view);
      });
    });

    document.getElementById('btn-new-venture').addEventListener('click', function () {
      openVentureModal();
    });

    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('btn-cancel-modal').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });

    document.getElementById('detail-modal-close').addEventListener('click', closeDetailModal);
    document.getElementById('detail-modal-overlay').addEventListener('click', function (e) {
      if (e.target === this) closeDetailModal();
    });

    document.getElementById('venture-form').addEventListener('submit', function (e) {
      e.preventDefault();
      saveVenture();
    });

    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        this.classList.add('active');
        renderVentures(this.dataset.filter);
      });
    });

    document.getElementById('btn-cancel-evaluate').addEventListener('click', function () {
      cancelEvaluation();
    });

    document.getElementById('btn-save-evaluate').addEventListener('click', function () {
      saveEvaluation();
    });
  }

  function switchView(view) {
    currentView = view;
    document.querySelectorAll('.nav-link').forEach(function (l) {
      l.classList.remove('active');
    });
    document.querySelector('[data-view="' + view + '"]').classList.add('active');

    document.querySelectorAll('.view').forEach(function (v) {
      v.classList.remove('active');
    });
    document.getElementById('view-' + view).classList.add('active');

    renderCurrentView();
  }

  function renderCurrentView() {
    switch (currentView) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'ventures':
        renderVentures('all');
        break;
      case 'evaluate':
        renderEvaluateSelect();
        break;
      case 'pipeline':
        renderPipeline();
        break;
    }
  }

  // Dashboard
  function renderDashboard() {
    var total = ventures.length;
    var active = ventures.filter(function (v) { return v.stage !== 'paused'; }).length;
    var evaluated = ventures.filter(function (v) { return Object.keys(v.scores).length > 0; }).length;
    var avgScore = 0;
    var scoredVentures = ventures.filter(function (v) { return Object.keys(v.scores).length > 0; });
    if (scoredVentures.length > 0) {
      var totalScore = scoredVentures.reduce(function (sum, v) {
        return sum + getOverallScore(v);
      }, 0);
      avgScore = Math.round(totalScore / scoredVentures.length);
    }

    var statsHtml = [
      { label: 'Total Ventures', value: total, sub: 'in portfolio' },
      { label: 'Active', value: active, sub: 'currently active' },
      { label: 'Evaluated', value: evaluated, sub: 'scored ventures' },
      { label: 'Avg Score', value: avgScore + '%', sub: 'across evaluated' },
    ].map(function (s) {
      return '<div class="stat-card">' +
        '<div class="stat-label">' + s.label + '</div>' +
        '<div class="stat-value">' + s.value + '</div>' +
        '<div class="stat-sub">' + s.sub + '</div>' +
        '</div>';
    }).join('');

    document.getElementById('stats-grid').innerHTML = statsHtml;

    var sorted = ventures.slice().sort(function (a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    var recent = sorted.slice(0, 5);

    if (recent.length === 0) {
      document.getElementById('recent-activity').innerHTML =
        '<div class="empty-state"><p>No ventures yet. Create your first venture to get started.</p></div>';
      return;
    }

    var activityHtml = recent.map(function (v) {
      return '<div class="activity-item">' +
        '<span class="activity-text"><strong>' + escapeHtml(v.name) + '</strong> &mdash; ' + STAGE_LABELS[v.stage] + '</span>' +
        '<span class="activity-date">' + formatDate(v.updatedAt) + '</span>' +
        '</div>';
    }).join('');

    document.getElementById('recent-activity').innerHTML = activityHtml;
  }

  // Ventures
  function renderVentures(filter) {
    var filtered = ventures;
    if (filter && filter !== 'all') {
      filtered = ventures.filter(function (v) { return v.stage === filter; });
    }

    if (filtered.length === 0) {
      document.getElementById('ventures-list').innerHTML =
        '<div class="empty-state"><p>No ventures found.</p></div>';
      return;
    }

    var html = filtered.map(function (v) {
      var score = getOverallScore(v);
      var hasScore = Object.keys(v.scores).length > 0;
      var scoreColor = score >= 70 ? 'var(--success)' : score >= 50 ? 'var(--warning)' : 'var(--danger)';

      return '<div class="venture-card" data-id="' + v.id + '">' +
        '<div class="venture-card-header">' +
        '<h4>' + escapeHtml(v.name) + '</h4>' +
        '<span class="stage-badge stage-' + v.stage + '">' + STAGE_LABELS[v.stage] + '</span>' +
        '</div>' +
        '<div class="venture-card-desc">' + escapeHtml(v.description) + '</div>' +
        '<div class="venture-card-meta">' +
        '<span>' + escapeHtml(v.market || 'No market defined') + '</span>' +
        (v.revenueModel ? '<span>' + REVENUE_MODEL_LABELS[v.revenueModel] + '</span>' : '') +
        '</div>' +
        (hasScore ?
          '<div class="venture-card-score">' +
          '<div class="score-label"><span>Score</span><span>' + score + '%</span></div>' +
          '<div class="score-bar"><div class="score-fill" style="width:' + score + '%;background:' + scoreColor + '"></div></div>' +
          '</div>' :
          '<div class="venture-card-score"><div class="score-label"><span style="color:var(--text-muted)">Not evaluated</span></div></div>'
        ) +
        '</div>';
    }).join('');

    document.getElementById('ventures-list').innerHTML = html;

    document.querySelectorAll('.venture-card').forEach(function (card) {
      card.addEventListener('click', function () {
        showVentureDetail(this.dataset.id);
      });
    });
  }

  // Venture Detail
  function showVentureDetail(id) {
    var v = ventures.find(function (x) { return x.id === id; });
    if (!v) return;

    document.getElementById('detail-modal-title').textContent = v.name;

    var hasScore = Object.keys(v.scores).length > 0;
    var overallScore = getOverallScore(v);

    var scoresHtml = '';
    if (hasScore) {
      scoresHtml = '<div class="detail-section"><h4>Evaluation Scores</h4><div class="detail-scores">' +
        CRITERIA.map(function (c) {
          var val = v.scores[c.id] || 0;
          var pct = val * 10;
          var color = pct >= 70 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)';
          return '<div class="detail-score-row">' +
            '<span style="min-width:140px">' + c.label + '</span>' +
            '<div class="score-bar"><div class="score-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
            '<span style="min-width:40px;text-align:right">' + val + '/10</span>' +
            '</div>';
        }).join('') +
        '</div></div>';
    }

    var html = '<div class="detail-section"><h4>Description</h4><p>' + escapeHtml(v.description) + '</p></div>' +
      '<div class="detail-meta">' +
      '<div class="detail-meta-item"><div class="label">Stage</div><div class="value">' + STAGE_LABELS[v.stage] + '</div></div>' +
      '<div class="detail-meta-item"><div class="label">Revenue Model</div><div class="value">' + (v.revenueModel ? REVENUE_MODEL_LABELS[v.revenueModel] : 'Not set') + '</div></div>' +
      '<div class="detail-meta-item"><div class="label">Target Market</div><div class="value">' + escapeHtml(v.market || 'Not defined') + '</div></div>' +
      '<div class="detail-meta-item"><div class="label">Overall Score</div><div class="value">' + (hasScore ? overallScore + '%' : 'Not evaluated') + '</div></div>' +
      '</div>' +
      scoresHtml +
      '<div class="detail-actions">' +
      '<button class="btn btn-primary btn-sm" onclick="window.__editVenture(\'' + v.id + '\')">Edit</button>' +
      '<button class="btn btn-secondary btn-sm" onclick="window.__evaluateVenture(\'' + v.id + '\')">Evaluate</button>' +
      '<button class="btn btn-danger btn-sm" onclick="window.__deleteVenture(\'' + v.id + '\')">Delete</button>' +
      '</div>';

    document.getElementById('detail-modal-body').innerHTML = html;
    document.getElementById('detail-modal-overlay').classList.remove('hidden');
  }

  // Expose actions for detail modal buttons
  window.__editVenture = function (id) {
    closeDetailModal();
    openVentureModal(id);
  };

  window.__evaluateVenture = function (id) {
    closeDetailModal();
    switchView('evaluate');
    startEvaluation(id);
  };

  window.__deleteVenture = function (id) {
    if (confirm('Are you sure you want to delete this venture?')) {
      ventures = ventures.filter(function (v) { return v.id !== id; });
      saveData();
      closeDetailModal();
      renderCurrentView();
    }
  };

  // Evaluate
  function renderEvaluateSelect() {
    evaluatingVentureId = null;
    document.getElementById('evaluate-select').classList.remove('hidden');
    document.getElementById('evaluate-form').classList.add('hidden');

    var nonPaused = ventures.filter(function (v) { return v.stage !== 'paused'; });

    if (nonPaused.length === 0) {
      document.getElementById('evaluate-venture-list').innerHTML =
        '<div class="empty-state"><p>No ventures available to evaluate.</p></div>';
      return;
    }

    var html = nonPaused.map(function (v) {
      var hasScore = Object.keys(v.scores).length > 0;
      return '<div class="venture-select-item" data-id="' + v.id + '">' +
        '<span class="name">' + escapeHtml(v.name) + '</span>' +
        '<span class="stage">' + STAGE_LABELS[v.stage] + (hasScore ? ' (re-evaluate)' : '') + '</span>' +
        '</div>';
    }).join('');

    document.getElementById('evaluate-venture-list').innerHTML = html;

    document.querySelectorAll('.venture-select-item').forEach(function (item) {
      item.addEventListener('click', function () {
        startEvaluation(this.dataset.id);
      });
    });
  }

  function startEvaluation(id) {
    var v = ventures.find(function (x) { return x.id === id; });
    if (!v) return;

    evaluatingVentureId = id;
    document.getElementById('evaluate-select').classList.add('hidden');
    document.getElementById('evaluate-form').classList.remove('hidden');
    document.getElementById('evaluate-venture-name').textContent = 'Evaluating: ' + v.name;

    var html = CRITERIA.map(function (c) {
      var val = v.scores[c.id] || 5;
      return '<div class="criteria-item">' +
        '<label>' + c.label + '</label>' +
        '<div class="criteria-desc">' + c.desc + '</div>' +
        '<input type="range" min="1" max="10" value="' + val + '" data-criteria="' + c.id + '">' +
        '<div class="criteria-value">' + val + ' / 10</div>' +
        '</div>';
    }).join('');

    document.getElementById('criteria-grid').innerHTML = html;

    document.querySelectorAll('#criteria-grid input[type="range"]').forEach(function (input) {
      input.addEventListener('input', function () {
        this.parentElement.querySelector('.criteria-value').textContent = this.value + ' / 10';
      });
    });
  }

  function saveEvaluation() {
    if (!evaluatingVentureId) return;

    var v = ventures.find(function (x) { return x.id === evaluatingVentureId; });
    if (!v) return;

    var scores = {};
    document.querySelectorAll('#criteria-grid input[type="range"]').forEach(function (input) {
      scores[input.dataset.criteria] = parseInt(input.value);
    });

    v.scores = scores;
    v.updatedAt = new Date().toISOString();
    saveData();

    cancelEvaluation();
  }

  function cancelEvaluation() {
    evaluatingVentureId = null;
    renderEvaluateSelect();
  }

  // Pipeline
  function renderPipeline() {
    var stages = ['idea', 'validating', 'building', 'launched'];

    stages.forEach(function (stage) {
      var col = document.querySelector('.pipeline-column-body[data-stage="' + stage + '"]');
      var stageVentures = ventures.filter(function (v) { return v.stage === stage; });

      if (stageVentures.length === 0) {
        col.innerHTML = '<div class="empty-state" style="padding:20px 10px;font-size:0.8rem;">No ventures</div>';
        return;
      }

      col.innerHTML = stageVentures.map(function (v) {
        var hasScore = Object.keys(v.scores).length > 0;
        var score = getOverallScore(v);
        return '<div class="pipeline-card" data-id="' + v.id + '">' +
          '<h5>' + escapeHtml(v.name) + '</h5>' +
          '<p>' + escapeHtml(truncate(v.description, 80)) + '</p>' +
          (hasScore ? '<div class="pipeline-score">Score: ' + score + '%</div>' : '') +
          '</div>';
      }).join('');
    });

    document.querySelectorAll('.pipeline-card').forEach(function (card) {
      card.addEventListener('click', function () {
        showVentureDetail(this.dataset.id);
      });
    });
  }

  // Modal
  function openVentureModal(editId) {
    var modal = document.getElementById('modal-overlay');
    var form = document.getElementById('venture-form');
    form.reset();

    if (editId) {
      var v = ventures.find(function (x) { return x.id === editId; });
      if (!v) return;
      document.getElementById('modal-title').textContent = 'Edit Venture';
      document.getElementById('venture-id').value = v.id;
      document.getElementById('venture-name').value = v.name;
      document.getElementById('venture-description').value = v.description;
      document.getElementById('venture-stage').value = v.stage;
      document.getElementById('venture-market').value = v.market || '';
      document.getElementById('venture-revenue-model').value = v.revenueModel || '';
    } else {
      document.getElementById('modal-title').textContent = 'New Venture';
      document.getElementById('venture-id').value = '';
    }

    modal.classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  }

  function closeDetailModal() {
    document.getElementById('detail-modal-overlay').classList.add('hidden');
  }

  function saveVenture() {
    var id = document.getElementById('venture-id').value;
    var name = document.getElementById('venture-name').value.trim();
    var description = document.getElementById('venture-description').value.trim();
    var stage = document.getElementById('venture-stage').value;
    var market = document.getElementById('venture-market').value.trim();
    var revenueModel = document.getElementById('venture-revenue-model').value;

    if (!name || !description) return;

    if (id) {
      var v = ventures.find(function (x) { return x.id === id; });
      if (v) {
        v.name = name;
        v.description = description;
        v.stage = stage;
        v.market = market;
        v.revenueModel = revenueModel;
        v.updatedAt = new Date().toISOString();
      }
    } else {
      ventures.push({
        id: Date.now().toString(),
        name: name,
        description: description,
        stage: stage,
        market: market,
        revenueModel: revenueModel,
        scores: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    saveData();
    closeModal();
    renderCurrentView();
  }

  // Helpers
  function getOverallScore(venture) {
    var keys = Object.keys(venture.scores);
    if (keys.length === 0) return 0;
    var sum = keys.reduce(function (acc, k) { return acc + venture.scores[k]; }, 0);
    return Math.round((sum / (keys.length * 10)) * 100);
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function truncate(str, len) {
    if (str.length <= len) return str;
    return str.substring(0, len) + '...';
  }

  // Start
  init();
})();
