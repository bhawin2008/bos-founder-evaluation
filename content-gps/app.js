(function () {
  'use strict';

  // ===== State =====
  const state = {
    currentStep: 0,
    totalSteps: 5,
    data: {
      primaryGoal: '',
      businessType: '',
      contentExperience: '',
      weeklyHours: 3,
      targetAudience: '',
      uniqueAngle: '',
      contentVoice: '',
      platforms: [],
      pillars: [
        { name: '', topics: '', ratio: 33 },
        { name: '', topics: '', ratio: 34 },
        { name: '', topics: '', ratio: 33 },
      ],
    },
  };

  // ===== Content Templates =====
  const CONTENT_IDEAS = {
    'thought-leadership': {
      templates: [
        'Unpopular opinion: {topic}',
        'The real reason most founders fail at {topic}',
        '3 lessons from {topic} that changed my approach',
        'What nobody tells you about {topic}',
        'I was wrong about {topic} — here\'s what I learned',
        'Framework: How to think about {topic}',
        'The {topic} playbook I wish I had 5 years ago',
        '{topic}: What separates good from great',
      ],
      formats: [
        { name: 'Long-form post', pct: 35 },
        { name: 'Thread / Carousel', pct: 25 },
        { name: 'Short take', pct: 20 },
        { name: 'Case study', pct: 20 },
      ],
    },
    'lead-generation': {
      templates: [
        'How we solved {topic} for our clients',
        'Before & after: {topic} transformation',
        '{topic} checklist every founder needs',
        'Free framework: Master {topic} in 30 days',
        'The {topic} mistake costing you clients',
        '5 signs you need to fix your {topic}',
        'Client spotlight: {topic} results',
        'Step-by-step: Our {topic} process',
      ],
      formats: [
        { name: 'How-to guide', pct: 30 },
        { name: 'Case study', pct: 30 },
        { name: 'Checklist / Template', pct: 20 },
        { name: 'Social proof post', pct: 20 },
      ],
    },
    'community-building': {
      templates: [
        'Question for founders: How do you handle {topic}?',
        'My honest take on {topic}',
        'Building in public: {topic} update',
        'Behind the scenes: {topic} decisions',
        'What I\'d do differently with {topic}',
        'Monthly recap: {topic} wins and lessons',
        'Founder journal: Struggling with {topic}',
        'Community poll: {topic} best practices',
      ],
      formats: [
        { name: 'Engagement post', pct: 30 },
        { name: 'Behind-the-scenes', pct: 25 },
        { name: 'Poll / Question', pct: 25 },
        { name: 'Story / Reflection', pct: 20 },
      ],
    },
    'hiring-brand': {
      templates: [
        'Why top engineers join {topic} companies',
        'Our culture in action: {topic}',
        'What a day looks like working on {topic}',
        'Hiring lesson: {topic} matters more than you think',
        'Team spotlight: How we approach {topic}',
        'The {topic} culture we\'re building',
        'We made a mistake with {topic} — here\'s what we changed',
        'Why we invest in {topic} for our team',
      ],
      formats: [
        { name: 'Team story', pct: 30 },
        { name: 'Culture post', pct: 25 },
        { name: 'Day-in-the-life', pct: 25 },
        { name: 'Hiring update', pct: 20 },
      ],
    },
  };

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const GOAL_LABELS = {
    'thought-leadership': 'Thought Leadership',
    'lead-generation': 'Lead Generation',
    'community-building': 'Community Building',
    'hiring-brand': 'Hiring & Brand',
  };

  const VOICE_LABELS = {
    direct: 'Direct & Bold',
    analytical: 'Analytical',
    storyteller: 'Storyteller',
    educator: 'Educator',
    contrarian: 'Contrarian',
    builder: 'Builder in Public',
  };

  const PLATFORM_LABELS = {
    linkedin: 'LinkedIn',
    twitter: 'X / Twitter',
    blog: 'Blog',
    newsletter: 'Newsletter',
    youtube: 'YouTube',
    podcast: 'Podcast',
  };

  const PILLAR_COLORS = ['var(--accent)', 'var(--green)', 'var(--purple)', 'var(--orange)', 'var(--yellow)'];

  // ===== DOM References =====
  const progressFill = document.getElementById('progress-fill');
  const progressSteps = document.querySelectorAll('.progress-step');
  const stepPanels = document.querySelectorAll('.step-panel');
  const hoursRange = document.getElementById('weekly-hours');
  const hoursDisplay = document.getElementById('hours-display');
  const pillarsContainer = document.getElementById('pillars-container');
  const addPillarBtn = document.getElementById('add-pillar');
  const ratioTrack = document.getElementById('ratio-track');
  const ratioTotal = document.getElementById('ratio-total');

  // ===== Navigation =====
  function goToStep(step) {
    if (step < 0 || step >= state.totalSteps) return;

    // Collect data from current step before navigating
    collectStepData(state.currentStep);

    state.currentStep = step;

    // Update panels
    stepPanels.forEach((panel, i) => {
      panel.classList.toggle('active', i === step);
    });

    // Update progress steps
    progressSteps.forEach((el, i) => {
      el.classList.remove('active', 'completed');
      if (i === step) el.classList.add('active');
      else if (i < step) el.classList.add('completed');
    });

    // Update progress bar fill
    const pct = (step / (state.totalSteps - 1)) * 100;
    progressFill.style.width = pct + '%';

    // Run step-specific logic
    if (step === 3) generateRoute();
    if (step === 4) generateCompass();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===== Data Collection =====
  function collectStepData(step) {
    switch (step) {
      case 0:
        state.data.primaryGoal = getRadioValue('primary-goal');
        state.data.businessType = document.getElementById('business-type').value;
        state.data.contentExperience = getRadioValue('content-experience');
        state.data.weeklyHours = parseInt(hoursRange.value);
        break;
      case 1:
        state.data.targetAudience = document.getElementById('target-audience').value.trim();
        state.data.uniqueAngle = document.getElementById('unique-angle').value.trim();
        state.data.contentVoice = getRadioValue('content-voice');
        state.data.platforms = getCheckedValues('platforms');
        break;
      case 2:
        collectPillarData();
        break;
    }
  }

  function getRadioValue(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : '';
  }

  function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => el.value);
  }

  function collectPillarData() {
    const cards = pillarsContainer.querySelectorAll('.pillar-card');
    state.data.pillars = Array.from(cards).map((card) => ({
      name: card.querySelector('.pillar-name').value.trim(),
      topics: card.querySelector('.pillar-topics').value.trim(),
      ratio: parseInt(card.querySelector('.pillar-ratio').value),
    }));
  }

  // ===== Pillar Management =====
  function addPillar() {
    if (state.data.pillars.length >= 5) return;

    const idx = pillarsContainer.children.length;
    const card = createPillarCard(idx, { name: '', topics: '', ratio: 20 });
    pillarsContainer.appendChild(card);
    bindPillarEvents(card);
    updatePillarRemoveButtons();
    updateRatioBar();
  }

  function createPillarCard(idx, data) {
    const card = document.createElement('div');
    card.className = 'pillar-card';
    card.dataset.pillar = idx;
    card.innerHTML = `
      <div class="pillar-header">
        <span class="pillar-number">Pillar ${idx + 1}</span>
        <button class="pillar-remove" aria-label="Remove pillar">&times;</button>
      </div>
      <div class="form-group">
        <label class="form-label">Pillar name</label>
        <input type="text" class="form-input pillar-name" placeholder="e.g., Topic area" value="${escapeHtml(data.name)}">
      </div>
      <div class="form-group">
        <label class="form-label">What you'll cover</label>
        <textarea class="form-textarea pillar-topics" rows="2" placeholder="e.g., Subtopics, themes">${escapeHtml(data.topics)}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Content ratio</label>
        <div class="range-wrapper">
          <input type="range" min="10" max="50" value="${data.ratio}" class="form-range pillar-ratio">
          <span class="range-value pillar-ratio-display">${data.ratio}%</span>
        </div>
      </div>
    `;
    return card;
  }

  function removePillar(card) {
    if (pillarsContainer.children.length <= 2) return;
    card.remove();
    renumberPillars();
    updatePillarRemoveButtons();
    updateRatioBar();
  }

  function renumberPillars() {
    const cards = pillarsContainer.querySelectorAll('.pillar-card');
    cards.forEach((card, i) => {
      card.dataset.pillar = i;
      card.querySelector('.pillar-number').textContent = `Pillar ${i + 1}`;
    });
  }

  function updatePillarRemoveButtons() {
    const cards = pillarsContainer.querySelectorAll('.pillar-card');
    cards.forEach((card) => {
      const btn = card.querySelector('.pillar-remove');
      btn.classList.toggle('hidden', cards.length <= 2);
    });
  }

  function updateRatioBar() {
    const cards = pillarsContainer.querySelectorAll('.pillar-card');
    let total = 0;
    const segments = [];

    cards.forEach((card, i) => {
      const val = parseInt(card.querySelector('.pillar-ratio').value);
      total += val;
      segments.push({ pct: val, color: PILLAR_COLORS[i] || PILLAR_COLORS[0] });
    });

    ratioTrack.innerHTML = segments
      .map((s) => `<div class="ratio-segment" style="width:${s.pct}%;background:${s.color}"></div>`)
      .join('');

    ratioTotal.textContent = `Total: ${total}%`;
    ratioTotal.className = 'ratio-total';
    if (total > 100) ratioTotal.classList.add('error');
    else if (total !== 100) ratioTotal.classList.add('warning');
  }

  function bindPillarEvents(card) {
    const ratio = card.querySelector('.pillar-ratio');
    const display = card.querySelector('.pillar-ratio-display');
    ratio.addEventListener('input', () => {
      display.textContent = ratio.value + '%';
      updateRatioBar();
    });

    const removeBtn = card.querySelector('.pillar-remove');
    removeBtn.addEventListener('click', () => removePillar(card));
  }

  // ===== Route Generation =====
  function generateRoute() {
    collectStepData(2);
    const d = state.data;
    const hours = d.weeklyHours;
    const platforms = d.platforms.length > 0 ? d.platforms : ['linkedin'];
    const goal = d.primaryGoal || 'thought-leadership';
    const templates = CONTENT_IDEAS[goal] || CONTENT_IDEAS['thought-leadership'];
    const pillars = d.pillars.filter((p) => p.name);

    // Calculate posts per week based on hours
    let postsPerWeek;
    if (hours <= 2) postsPerWeek = 2;
    else if (hours <= 4) postsPerWeek = 3;
    else if (hours <= 7) postsPerWeek = 4;
    else if (hours <= 10) postsPerWeek = 5;
    else postsPerWeek = 7;

    // Update summary
    document.getElementById('route-posts-week').textContent = postsPerWeek;
    document.getElementById('route-platforms').textContent = platforms.length;
    document.getElementById('route-hours').textContent = hours;

    // Generate calendar
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';

    for (let week = 0; week < 4; week++) {
      const weekDiv = document.createElement('div');
      weekDiv.className = 'calendar-week';
      weekDiv.innerHTML = `<div class="calendar-week-header">Week ${week + 1}</div><div class="calendar-items"></div>`;

      const itemsContainer = weekDiv.querySelector('.calendar-items');

      for (let post = 0; post < postsPerWeek; post++) {
        const pillarIdx = pillars.length > 0 ? post % pillars.length : 0;
        const pillar = pillars[pillarIdx] || { name: 'General', topics: '' };
        const dayIdx = post % DAYS.length;
        const platform = platforms[post % platforms.length];
        const topicWords = pillar.topics ? pillar.topics.split(',')[0].trim() : pillar.name;
        const templateIdx = (week * postsPerWeek + post) % templates.templates.length;
        const title = templates.templates[templateIdx].replace('{topic}', topicWords || 'your niche');
        const format = templates.formats[post % templates.formats.length];

        const item = document.createElement('div');
        item.className = 'calendar-item';
        item.dataset.pillar = pillarIdx;
        item.innerHTML = `
          <span class="calendar-day">${DAYS[dayIdx]}</span>
          <span class="calendar-title">${escapeHtml(title)}</span>
          <span class="calendar-platform">${PLATFORM_LABELS[platform] || platform}</span>
          <span class="calendar-format">${escapeHtml(format.name)}</span>
        `;
        itemsContainer.appendChild(item);
      }

      calendarGrid.appendChild(weekDiv);
    }

    // Format mix
    const formatGrid = document.getElementById('format-grid');
    formatGrid.innerHTML = templates.formats
      .map(
        (f) => `
        <div class="format-card">
          <div class="format-bar"></div>
          <div>
            <div class="format-name">${f.name}</div>
            <div class="format-pct">${f.pct}% of content</div>
          </div>
        </div>
      `
      )
      .join('');
  }

  // ===== Compass (Results) =====
  function generateCompass() {
    collectStepData(state.currentStep - 1);
    const d = state.data;

    // Calculate readiness score
    let score = 0;
    let maxScore = 0;

    // Goal (15 points)
    maxScore += 15;
    if (d.primaryGoal) score += 15;

    // Business type (10 points)
    maxScore += 10;
    if (d.businessType) score += 10;

    // Experience (5 points)
    maxScore += 5;
    if (d.contentExperience) score += 5;

    // Hours (10 points)
    maxScore += 10;
    score += Math.min(10, Math.round((d.weeklyHours / 5) * 10));

    // Audience (15 points)
    maxScore += 15;
    if (d.targetAudience.length > 20) score += 15;
    else if (d.targetAudience.length > 5) score += 8;

    // Unique angle (15 points)
    maxScore += 15;
    if (d.uniqueAngle.length > 20) score += 15;
    else if (d.uniqueAngle.length > 5) score += 8;

    // Voice (10 points)
    maxScore += 10;
    if (d.contentVoice) score += 10;

    // Platforms (10 points)
    maxScore += 10;
    if (d.platforms.length >= 1) score += 5;
    if (d.platforms.length >= 2) score += 3;
    if (d.platforms.length >= 3) score += 2;

    // Pillars (10 points)
    maxScore += 10;
    const namedPillars = d.pillars.filter((p) => p.name.length > 0);
    score += Math.min(10, namedPillars.length * 3);

    const pct = Math.round((score / maxScore) * 100);

    // Update score ring
    const circle = document.getElementById('score-circle');
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (pct / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    document.getElementById('score-value').textContent = pct;

    const verdict = document.getElementById('score-verdict');
    if (pct >= 85) {
      verdict.textContent = 'Your content strategy is well-defined. You\'re ready to execute.';
      circle.style.stroke = 'var(--green)';
    } else if (pct >= 60) {
      verdict.textContent = 'Good foundation. Fill in the gaps to sharpen your strategy.';
      circle.style.stroke = 'var(--yellow)';
    } else {
      verdict.textContent = 'Your strategy needs more definition. Revisit the earlier steps.';
      circle.style.stroke = 'var(--red)';
    }

    // Compass cards
    document.getElementById('compass-goal').textContent = GOAL_LABELS[d.primaryGoal] || 'Not set';
    document.getElementById('compass-audience').textContent = d.targetAudience || 'Not defined';
    document.getElementById('compass-voice').textContent = VOICE_LABELS[d.contentVoice] || 'Not selected';
    document.getElementById('compass-platforms').textContent =
      d.platforms.map((p) => PLATFORM_LABELS[p] || p).join(', ') || 'None selected';

    // Pillars list
    const pillarsList = document.getElementById('compass-pillars-list');
    pillarsList.innerHTML = namedPillars
      .map(
        (p, i) => `
        <div class="compass-pillar-item">
          <span class="compass-pillar-color" style="background:${PILLAR_COLORS[i]}"></span>
          <span class="compass-pillar-name">${escapeHtml(p.name)}</span>
          <span class="compass-pillar-ratio">${p.ratio}%</span>
        </div>
      `
      )
      .join('');

    if (namedPillars.length === 0) {
      pillarsList.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">No pillars defined yet.</p>';
    }

    // Action list
    generateActions(d, pct);
  }

  function generateActions(d, score) {
    const actions = [];

    if (!d.primaryGoal) {
      actions.push('Go back to Step 1 and select your primary content goal.');
    }
    if (!d.targetAudience || d.targetAudience.length < 10) {
      actions.push('Define your target audience in more detail. The more specific, the more your content resonates.');
    }
    if (!d.uniqueAngle || d.uniqueAngle.length < 10) {
      actions.push('Articulate your unique angle. What makes your perspective different from others in your space?');
    }
    if (d.platforms.length === 0) {
      actions.push('Select at least one platform to publish on. LinkedIn is the strongest for B2B founder content.');
    }
    if (d.pillars.filter((p) => p.name).length < 3) {
      actions.push('Define at least 3 content pillars to give your content variety and structure.');
    }
    if (d.weeklyHours < 3) {
      actions.push('Consider investing at least 3 hours per week. Consistency matters more than volume.');
    }

    // Always-applicable actions
    actions.push('Block time on your calendar for content creation — treat it like a meeting.');
    actions.push('Write your first 5 posts this week using the calendar as a guide.');
    if (score >= 60) {
      actions.push('Review and refine your strategy after 30 days of consistent posting.');
    }

    const actionList = document.getElementById('action-list');
    actionList.innerHTML = actions
      .map(
        (text, i) => `
        <div class="action-item">
          <span class="action-num">${i + 1}</span>
          <span class="action-text">${escapeHtml(text)}</span>
        </div>
      `
      )
      .join('');
  }

  // ===== Export =====
  function exportStrategy() {
    collectStepData(state.currentStep);
    const d = state.data;

    const exportData = {
      contentGPS: {
        exportDate: new Date().toISOString(),
        destination: {
          primaryGoal: GOAL_LABELS[d.primaryGoal] || d.primaryGoal,
          businessType: d.businessType,
          contentExperience: d.contentExperience,
          weeklyHours: d.weeklyHours,
        },
        position: {
          targetAudience: d.targetAudience,
          uniqueAngle: d.uniqueAngle,
          contentVoice: VOICE_LABELS[d.contentVoice] || d.contentVoice,
          platforms: d.platforms.map((p) => PLATFORM_LABELS[p] || p),
        },
        pillars: d.pillars
          .filter((p) => p.name)
          .map((p) => ({
            name: p.name,
            topics: p.topics,
            ratio: p.ratio + '%',
          })),
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content-gps-strategy.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ===== Utilities =====
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ===== Event Binding =====
  function init() {
    // Next / Prev buttons
    document.querySelectorAll('.btn-next').forEach((btn) => {
      btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.next)));
    });

    document.querySelectorAll('.btn-prev').forEach((btn) => {
      btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.prev)));
    });

    // Progress step clicks
    progressSteps.forEach((step) => {
      step.addEventListener('click', () => goToStep(parseInt(step.dataset.step)));
    });

    // Hours range
    hoursRange.addEventListener('input', () => {
      hoursDisplay.textContent = hoursRange.value + (hoursRange.value === '1' ? ' hour' : ' hours');
    });

    // Pillar management
    addPillarBtn.addEventListener('click', addPillar);

    // Bind existing pillar cards
    pillarsContainer.querySelectorAll('.pillar-card').forEach(bindPillarEvents);
    updatePillarRemoveButtons();
    updateRatioBar();

    // Regenerate calendar
    document.getElementById('regenerate-calendar').addEventListener('click', generateRoute);

    // Export
    document.getElementById('export-strategy').addEventListener('click', exportStrategy);

    // Start over
    document.getElementById('start-over').addEventListener('click', () => {
      if (confirm('Start over? This will clear all your entries.')) {
        location.reload();
      }
    });

    // Limit platform checkboxes to 3
    document.querySelectorAll('input[name="platforms"]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const checked = document.querySelectorAll('input[name="platforms"]:checked');
        if (checked.length > 3) {
          cb.checked = false;
        }
      });
    });

    // Initialize progress
    goToStep(0);
  }

  // Start
  document.addEventListener('DOMContentLoaded', init);
})();
