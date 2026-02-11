// ==================== REPORTS MODULE ====================
// Culture Intelligence Reports — Executive-grade analytics
// ========================================================

var currentReportTab = "health";

// ==================== Analytics Engine ====================

function rptGetMonths() {
  var months = {};
  data.flags.forEach(function(f) { months[getMonthKey(f.createdAt)] = true; });
  data.tasks.forEach(function(t) { months[getMonthKey(t.createdAt)] = true; });
  var cur = getMonthKey(new Date().toISOString());
  months[cur] = true;
  return Object.keys(months).sort();
}

function rptGetDepartments() {
  var depts = {};
  data.members.forEach(function(m) {
    var role = data.roles.find(function(r) { return r.id === m.roleId; });
    var name = role ? role.name : "Unassigned";
    depts[name] = true;
  });
  return Object.keys(depts).sort();
}

function rptGetMemberDept(memberId) {
  var m = data.members.find(function(x) { return x.id === memberId; });
  if (!m) return "Unassigned";
  var role = data.roles.find(function(r) { return r.id === m.roleId; });
  return role ? role.name : "Unassigned";
}

function rptFilteredMembers() {
  var dept = document.getElementById("rpt-dept-filter").value;
  if (!dept) return data.members.slice();
  return data.members.filter(function(m) {
    return rptGetMemberDept(m.id) === dept;
  });
}

function rptGetSelectedMonth() {
  return document.getElementById("rpt-month-filter").value;
}

function rptFlagsForMonth(monthKey) {
  if (!monthKey) return data.flags.slice();
  return data.flags.filter(function(f) { return getMonthKey(f.createdAt) === monthKey; });
}

function rptFlagsUpToMonth(monthKey) {
  if (!monthKey) return data.flags.slice();
  return data.flags.filter(function(f) { return getMonthKey(f.createdAt) <= monthKey; });
}

function rptMemberNetAtMonth(memberId, monthKey) {
  var red = 0, green = 0;
  data.flags.forEach(function(f) {
    if (f.memberId === memberId && getMonthKey(f.createdAt) <= monthKey) {
      if (f.color === "red") red += f.count;
      else if (f.color === "green") green += f.count;
    }
  });
  return green - red;
}

function rptMemberZoneAtMonth(memberId, monthKey) {
  var net = rptMemberNetAtMonth(memberId, monthKey);
  if (net >= 3) return "green";
  if (net < 0) return "red";
  return "orange";
}

function rptMemberFlagsInMonth(memberId, monthKey) {
  var red = 0, green = 0;
  data.flags.forEach(function(f) {
    if (f.memberId === memberId && getMonthKey(f.createdAt) === monthKey) {
      if (f.color === "red") red += f.count;
      else if (f.color === "green") green += f.count;
    }
  });
  return { red: red, green: green };
}

// ---- Analytics Formulas ----

function rptCultureMomentumIndex(members, monthKey) {
  if (members.length === 0) return 0;
  var totalNet = 0;
  members.forEach(function(m) {
    totalNet += monthKey ? rptMemberNetAtMonth(m.id, monthKey) : (getEffectiveFlags(m.id).green - getEffectiveFlags(m.id).red);
  });
  return Math.round((totalNet / members.length) * 100) / 100;
}

function rptRiskIndex(members, monthKey) {
  if (members.length === 0) return 0;
  var redCount = 0;
  members.forEach(function(m) {
    var zone = monthKey ? rptMemberZoneAtMonth(m.id, monthKey) : getMemberZone(m.id);
    if (zone === "red") redCount++;
  });
  return Math.round((redCount / members.length) * 100);
}

function rptStabilityScore(members, monthKey) {
  if (members.length === 0) return 0;
  var greenCount = 0;
  members.forEach(function(m) {
    var zone = monthKey ? rptMemberZoneAtMonth(m.id, monthKey) : getMemberZone(m.id);
    if (zone === "green") greenCount++;
  });
  return Math.round((greenCount / members.length) * 100);
}

function rptNetImprovement(members, month1, month2) {
  if (members.length === 0 || !month1 || !month2) return 0;
  var improved = 0;
  members.forEach(function(m) {
    var net1 = rptMemberNetAtMonth(m.id, month1);
    var net2 = rptMemberNetAtMonth(m.id, month2);
    if (net2 > net1) improved++;
  });
  return Math.round((improved / members.length) * 100);
}

function rptZoneDistribution(members, monthKey) {
  var g = 0, o = 0, r = 0;
  members.forEach(function(m) {
    var zone = monthKey ? rptMemberZoneAtMonth(m.id, monthKey) : getMemberZone(m.id);
    if (zone === "green") g++;
    else if (zone === "red") r++;
    else o++;
  });
  var total = members.length || 1;
  return {
    green: g, orange: o, red: r,
    greenPct: Math.round((g / total) * 100),
    orangePct: Math.round((o / total) * 100),
    redPct: Math.round((r / total) * 100)
  };
}

// ==================== Filter Population ====================

function populateReportFilters() {
  var monthSel = document.getElementById("rpt-month-filter");
  var deptSel = document.getElementById("rpt-dept-filter");
  if (!monthSel || !deptSel) return;

  var curVal = monthSel.value;
  var curDept = deptSel.value;

  monthSel.innerHTML = '<option value="">All Time</option>';
  var months = rptGetMonths().reverse();
  months.forEach(function(mk) {
    var parts = mk.split("-");
    var label = new Date(parts[0], parts[1] - 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    monthSel.innerHTML += '<option value="' + mk + '">' + label + '</option>';
  });
  monthSel.value = curVal;

  deptSel.innerHTML = '<option value="">All Departments</option>';
  rptGetDepartments().forEach(function(d) {
    deptSel.innerHTML += '<option value="' + escapeHtml(d) + '">' + escapeHtml(d) + '</option>';
  });
  deptSel.value = curDept;
}

// ==================== Tab Switching ====================

function switchReportTab(tab) {
  currentReportTab = tab;
  document.querySelectorAll(".rpt-tab").forEach(function(btn) { btn.classList.remove("active"); });
  var tabs = document.querySelectorAll(".rpt-tab");
  var tabMap = { health: 0, movement: 1, risk: 2, leadership: 3, department: 4, quarterly: 5 };
  if (tabs[tabMap[tab]]) tabs[tabMap[tab]].classList.add("active");

  populateReportFilters();

  var renderers = {
    health: renderHealthReport,
    movement: renderMovementReport,
    risk: renderRiskReport,
    leadership: renderLeadershipReport,
    department: renderDepartmentReport,
    quarterly: renderQuarterlyReport
  };
  if (renderers[tab]) renderers[tab]();
}

// ==================== Helper: Bar Chart (CSS-based) ====================

function rptBarChart(items, maxVal) {
  if (!maxVal) maxVal = Math.max.apply(null, items.map(function(i) { return i.value; })) || 1;
  var html = '<div class="rpt-bar-chart">';
  items.forEach(function(item) {
    var pct = Math.round((item.value / maxVal) * 100);
    html += '<div class="rpt-bar-row">' +
      '<div class="rpt-bar-label">' + item.label + '</div>' +
      '<div class="rpt-bar-track"><div class="rpt-bar-fill rpt-bar-' + (item.color || 'accent') + '" style="width:' + pct + '%"></div></div>' +
      '<div class="rpt-bar-value">' + item.display + '</div>' +
    '</div>';
  });
  html += '</div>';
  return html;
}

// ==================== Helper: Horizontal Stacked Bar ====================

function rptStackedBar(greenPct, orangePct, redPct) {
  return '<div class="rpt-stacked-bar">' +
    (greenPct > 0 ? '<div class="rpt-stacked-seg rpt-seg-green" style="width:' + greenPct + '%" title="Green ' + greenPct + '%">' + (greenPct >= 10 ? greenPct + '%' : '') + '</div>' : '') +
    (orangePct > 0 ? '<div class="rpt-stacked-seg rpt-seg-orange" style="width:' + orangePct + '%" title="Orange ' + orangePct + '%">' + (orangePct >= 10 ? orangePct + '%' : '') + '</div>' : '') +
    (redPct > 0 ? '<div class="rpt-stacked-seg rpt-seg-red" style="width:' + redPct + '%" title="Red ' + redPct + '%">' + (redPct >= 10 ? redPct + '%' : '') + '</div>' : '') +
  '</div>';
}

// ==================== Helper: KPI Card ====================

function rptKPI(label, value, sub, colorClass, icon) {
  return '<div class="rpt-kpi' + (colorClass ? ' ' + colorClass : '') + '">' +
    (icon ? '<div class="rpt-kpi-icon">' + icon + '</div>' : '') +
    '<div class="rpt-kpi-value">' + value + '</div>' +
    '<div class="rpt-kpi-label">' + label + '</div>' +
    (sub ? '<div class="rpt-kpi-sub">' + sub + '</div>' : '') +
  '</div>';
}

// ==================== Helper: Trend Sparkline (canvas) ====================

function rptSparkline(canvasId, dataPoints, color) {
  setTimeout(function() {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var w = canvas.width = canvas.offsetWidth * 2;
    var h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    var cw = canvas.offsetWidth;
    var ch = canvas.offsetHeight;

    if (dataPoints.length < 2) return;
    var min = Math.min.apply(null, dataPoints);
    var max = Math.max.apply(null, dataPoints);
    var range = max - min || 1;
    var pad = 4;

    ctx.beginPath();
    ctx.strokeStyle = color || "#4F46E5";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    dataPoints.forEach(function(val, i) {
      var x = pad + (i / (dataPoints.length - 1)) * (cw - pad * 2);
      var y = ch - pad - ((val - min) / range) * (ch - pad * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Gradient fill
    ctx.lineTo(pad + ((dataPoints.length - 1) / (dataPoints.length - 1)) * (cw - pad * 2), ch);
    ctx.lineTo(pad, ch);
    ctx.closePath();
    var grad = ctx.createLinearGradient(0, 0, 0, ch);
    grad.addColorStop(0, (color || "#4F46E5") + "20");
    grad.addColorStop(1, (color || "#4F46E5") + "02");
    ctx.fillStyle = grad;
    ctx.fill();
  }, 50);
}

// ==================== Helper: Month Label ====================

function rptMonthLabel(mk) {
  var parts = mk.split("-");
  return new Date(parts[0], parts[1] - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ==================== A) Monthly Culture Health Report ====================

function renderHealthReport() {
  var container = document.getElementById("rpt-content");
  var members = rptFilteredMembers();
  var monthKey = rptGetSelectedMonth();
  var months = rptGetMonths();

  var targetMonth = monthKey || (months.length > 0 ? months[months.length - 1] : null);
  var prevMonth = null;
  if (targetMonth) {
    var idx = months.indexOf(targetMonth);
    if (idx > 0) prevMonth = months[idx - 1];
  }

  var dist = rptZoneDistribution(members, targetMonth);
  var prevDist = prevMonth ? rptZoneDistribution(members, prevMonth) : null;
  var cmi = rptCultureMomentumIndex(members, targetMonth);
  var prevCmi = prevMonth ? rptCultureMomentumIndex(members, prevMonth) : null;
  var risk = rptRiskIndex(members, targetMonth);
  var stability = rptStabilityScore(members, targetMonth);

  // Top 5 green / red contributors
  var memberScores = members.map(function(m) {
    var eff = targetMonth ? { green: 0, red: 0 } : getEffectiveFlags(m.id);
    if (targetMonth) {
      data.flags.forEach(function(f) {
        if (f.memberId === m.id && getMonthKey(f.createdAt) <= targetMonth) {
          if (f.color === "green") eff.green += f.count;
          else if (f.color === "red") eff.red += f.count;
        }
      });
    }
    return { id: m.id, name: m.name, dept: rptGetMemberDept(m.id), net: eff.green - eff.red, green: eff.green, red: eff.red };
  });

  var topGreen = memberScores.slice().sort(function(a, b) { return b.net - a.net; }).slice(0, 5);
  var topRed = memberScores.slice().sort(function(a, b) { return a.net - b.net; }).filter(function(x) { return x.net < 0; }).slice(0, 5);

  var cmiDelta = prevCmi !== null ? (cmi - prevCmi) : null;
  var cmiArrow = cmiDelta !== null ? (cmiDelta > 0 ? '<span class="rpt-trend-up">+' + cmiDelta.toFixed(2) + '</span>' : cmiDelta < 0 ? '<span class="rpt-trend-down">' + cmiDelta.toFixed(2) + '</span>' : '<span class="rpt-trend-flat">0.00</span>') : '';

  var html = '<div class="rpt-report-header"><h3>Monthly Culture Health</h3><p>' + (targetMonth ? rptMonthLabel(targetMonth) : 'All Time') + ' &middot; ' + members.length + ' members</p></div>';

  // KPI Cards
  html += '<div class="rpt-kpi-grid rpt-kpi-grid-4">';
  html += rptKPI('Culture Momentum', cmi.toFixed(2), cmiArrow ? 'vs prior: ' + cmiArrow : '', cmi >= 0 ? 'rpt-kpi-positive' : 'rpt-kpi-negative');
  html += rptKPI('Stability Score', stability + '%', 'green zone members', 'rpt-kpi-positive');
  html += rptKPI('Risk Index', risk + '%', 'red zone members', risk > 30 ? 'rpt-kpi-negative' : risk > 15 ? 'rpt-kpi-caution' : 'rpt-kpi-positive');
  html += rptKPI('Net Improvement', prevMonth ? rptNetImprovement(members, prevMonth, targetMonth) + '%' : '—', prevMonth ? 'improved vs ' + rptMonthLabel(prevMonth) : 'need 2+ months', '');
  html += '</div>';

  // Zone Distribution
  html += '<div class="rpt-sections">';
  html += '<div class="rpt-section">';
  html += '<h4>Zone Distribution</h4>';
  html += rptStackedBar(dist.greenPct, dist.orangePct, dist.redPct);
  html += '<div class="rpt-zone-legend">';
  html += '<span class="rpt-legend-item"><span class="rpt-legend-dot rpt-dot-green"></span> Green ' + dist.green + ' (' + dist.greenPct + '%)</span>';
  html += '<span class="rpt-legend-item"><span class="rpt-legend-dot rpt-dot-orange"></span> Orange ' + dist.orange + ' (' + dist.orangePct + '%)</span>';
  html += '<span class="rpt-legend-item"><span class="rpt-legend-dot rpt-dot-red"></span> Red ' + dist.red + ' (' + dist.redPct + '%)</span>';
  html += '</div>';
  if (prevDist) {
    html += '<div class="rpt-comparison"><span class="rpt-comparison-label">vs ' + rptMonthLabel(prevMonth) + ':</span>';
    var gDiff = dist.greenPct - prevDist.greenPct;
    var rDiff = dist.redPct - prevDist.redPct;
    html += ' Green ' + (gDiff >= 0 ? '+' : '') + gDiff + 'pp';
    html += ' &middot; Red ' + (rDiff >= 0 ? '+' : '') + rDiff + 'pp';
    html += '</div>';
  }
  html += '</div>';

  // Movement summary sparkline
  html += '<div class="rpt-section">';
  html += '<h4>Momentum Trend</h4>';
  var last6 = months.slice(-6);
  html += '<canvas id="rpt-health-spark" class="rpt-sparkline-lg"></canvas>';
  html += '<div class="rpt-spark-labels">';
  last6.forEach(function(mk) { html += '<span>' + rptMonthLabel(mk) + '</span>'; });
  html += '</div>';
  html += '</div>';
  html += '</div>';

  // Top contributors tables
  html += '<div class="rpt-sections">';
  html += '<div class="rpt-section"><h4>Top Culture Contributors</h4>';
  if (topGreen.length > 0) {
    html += '<table class="rpt-table"><thead><tr><th>Name</th><th>Department</th><th>Net Score</th><th>Strength</th></tr></thead><tbody>';
    topGreen.forEach(function(m, i) {
      html += '<tr><td><span class="rpt-rank">' + (i + 1) + '</span> ' + escapeHtml(m.name) + '</td><td>' + escapeHtml(m.dept) + '</td><td class="rpt-val-positive">+' + m.net + '</td><td>' + m.green + '</td></tr>';
    });
    html += '</tbody></table>';
  } else {
    html += '<p class="rpt-empty">No positive contributors found.</p>';
  }
  html += '</div>';

  html += '<div class="rpt-section"><h4>Growth Signal Leaders</h4>';
  if (topRed.length > 0) {
    html += '<table class="rpt-table"><thead><tr><th>Name</th><th>Department</th><th>Net Score</th><th>Growth</th></tr></thead><tbody>';
    topRed.forEach(function(m, i) {
      html += '<tr><td><span class="rpt-rank rpt-rank-red">' + (i + 1) + '</span> ' + escapeHtml(m.name) + '</td><td>' + escapeHtml(m.dept) + '</td><td class="rpt-val-negative">' + m.net + '</td><td>' + m.red + '</td></tr>';
    });
    html += '</tbody></table>';
  } else {
    html += '<p class="rpt-empty">No members in growth zone.</p>';
  }
  html += '</div>';
  html += '</div>';

  container.innerHTML = html;

  // Render sparkline
  var sparkData = last6.map(function(mk) { return rptCultureMomentumIndex(members, mk); });
  rptSparkline("rpt-health-spark", sparkData, "#4F46E5");
}

// ==================== B) Zone Movement Report ====================

function renderMovementReport() {
  var container = document.getElementById("rpt-content");
  var members = rptFilteredMembers();
  var months = rptGetMonths();
  var monthKey = rptGetSelectedMonth();

  var targetMonth = monthKey || (months.length > 1 ? months[months.length - 1] : null);
  var prevMonth = null;
  if (targetMonth) {
    var idx = months.indexOf(targetMonth);
    if (idx > 0) prevMonth = months[idx - 1];
  }

  var html = '<div class="rpt-report-header"><h3>Zone Movement Analysis</h3><p>' + (targetMonth ? rptMonthLabel(targetMonth) : 'Latest') + ' &middot; Tracking transitions between zones</p></div>';

  if (!prevMonth || !targetMonth) {
    html += '<div class="rpt-empty-state">Need at least 2 months of data to show zone movements.</div>';
    container.innerHTML = html;
    return;
  }

  // Calculate transitions
  var transitions = { gg: 0, go: 0, gr: 0, og: 0, oo: 0, or_: 0, rg: 0, ro: 0, rr: 0 };
  var transitionMembers = { go: [], gr: [], og: [], or_: [], rg: [], ro: [] };

  members.forEach(function(m) {
    var prev = rptMemberZoneAtMonth(m.id, prevMonth);
    var curr = rptMemberZoneAtMonth(m.id, targetMonth);
    var key = (prev === "orange" ? "o" : prev.charAt(0)) + (curr === "orange" ? "o" : curr.charAt(0));
    if (key === "or") key = "or_";
    transitions[key] = (transitions[key] || 0) + 1;
    if (transitionMembers[key]) transitionMembers[key].push(m);
  });

  var total = members.length || 1;
  var goUpPct = Math.round(((transitions.og + transitions.rg + transitions.ro) / total) * 100);
  var goDownPct = Math.round(((transitions.go + transitions.gr + transitions.or_) / total) * 100);
  var netImpScore = goUpPct - goDownPct;

  // KPIs
  html += '<div class="rpt-kpi-grid rpt-kpi-grid-4">';
  html += rptKPI('Moved Up', goUpPct + '%', (transitions.og + transitions.rg + transitions.ro) + ' members improved', 'rpt-kpi-positive');
  html += rptKPI('Moved Down', goDownPct + '%', (transitions.go + transitions.gr + transitions.or_) + ' members declined', goDownPct > 20 ? 'rpt-kpi-negative' : '');
  html += rptKPI('Stable', (100 - goUpPct - goDownPct) + '%', 'stayed in zone', '');
  html += rptKPI('Net Movement', (netImpScore >= 0 ? '+' : '') + netImpScore + 'pp', netImpScore >= 0 ? 'net positive' : 'net negative', netImpScore >= 0 ? 'rpt-kpi-positive' : 'rpt-kpi-negative');
  html += '</div>';

  // Transition matrix
  html += '<div class="rpt-section"><h4>Transition Matrix</h4><p class="rpt-section-sub">' + rptMonthLabel(prevMonth) + ' &rarr; ' + rptMonthLabel(targetMonth) + '</p>';
  html += '<table class="rpt-table rpt-matrix"><thead><tr><th></th><th class="rpt-matrix-hdr-g">To Green</th><th class="rpt-matrix-hdr-o">To Orange</th><th class="rpt-matrix-hdr-r">To Red</th></tr></thead><tbody>';
  html += '<tr><td class="rpt-matrix-row-g">From Green</td><td>' + transitions.gg + '</td><td class="rpt-cell-caution">' + transitions.go + '</td><td class="rpt-cell-danger">' + transitions.gr + '</td></tr>';
  html += '<tr><td class="rpt-matrix-row-o">From Orange</td><td class="rpt-cell-positive">' + transitions.og + '</td><td>' + transitions.oo + '</td><td class="rpt-cell-danger">' + transitions.or_ + '</td></tr>';
  html += '<tr><td class="rpt-matrix-row-r">From Red</td><td class="rpt-cell-positive">' + transitions.rg + '</td><td class="rpt-cell-positive">' + transitions.ro + '</td><td>' + transitions.rr + '</td></tr>';
  html += '</tbody></table></div>';

  // Movement trend over last 3 months
  html += '<div class="rpt-section"><h4>Movement Trend (Last 3 Months)</h4>';
  var last3 = months.slice(-4); // need 4 to get 3 transitions
  if (last3.length >= 2) {
    html += '<div class="rpt-movement-trend">';
    for (var i = 1; i < last3.length; i++) {
      var up = 0, down = 0;
      members.forEach(function(m) {
        var p = rptMemberZoneAtMonth(m.id, last3[i - 1]);
        var c = rptMemberZoneAtMonth(m.id, last3[i]);
        var zones = { green: 3, orange: 2, red: 1 };
        if (zones[c] > zones[p]) up++;
        if (zones[c] < zones[p]) down++;
      });
      html += '<div class="rpt-trend-period">';
      html += '<div class="rpt-trend-period-label">' + rptMonthLabel(last3[i - 1]) + ' &rarr; ' + rptMonthLabel(last3[i]) + '</div>';
      html += '<div class="rpt-trend-bars">';
      html += '<span class="rpt-trend-bar-up" style="width:' + Math.round((up / total) * 100) + '%">' + up + ' up</span>';
      html += '<span class="rpt-trend-bar-down" style="width:' + Math.round((down / total) * 100) + '%">' + down + ' down</span>';
      html += '</div></div>';
    }
    html += '</div>';
  }
  html += '</div>';

  // Notable movements
  var notable = [];
  if (transitionMembers.gr.length > 0) notable.push({ type: 'danger', label: 'Green → Red', members: transitionMembers.gr });
  if (transitionMembers.or_.length > 0) notable.push({ type: 'caution', label: 'Orange → Red', members: transitionMembers.or_ });
  if (transitionMembers.rg.length > 0) notable.push({ type: 'positive', label: 'Red → Green', members: transitionMembers.rg });
  if (transitionMembers.og.length > 0) notable.push({ type: 'positive', label: 'Orange → Green', members: transitionMembers.og });

  if (notable.length > 0) {
    html += '<div class="rpt-section"><h4>Notable Movements</h4>';
    notable.forEach(function(n) {
      html += '<div class="rpt-notable rpt-notable-' + n.type + '">';
      html += '<span class="rpt-notable-label">' + n.label + '</span>';
      html += '<span class="rpt-notable-names">' + n.members.map(function(m) { return escapeHtml(m.name); }).join(', ') + '</span>';
      html += '</div>';
    });
    html += '</div>';
  }

  container.innerHTML = html;
}

// ==================== C) Risk Radar Report ====================

function renderRiskReport() {
  var container = document.getElementById("rpt-content");
  var members = rptFilteredMembers();
  var months = rptGetMonths();
  var monthKey = rptGetSelectedMonth();
  var targetMonth = monthKey || (months.length > 0 ? months[months.length - 1] : getMonthKey(new Date().toISOString()));

  var html = '<div class="rpt-report-header"><h3>Risk Radar</h3><p>Identifying culture risk patterns for proactive intervention</p></div>';

  // Members with 2+ red in target month
  var monthlyRisk = [];
  members.forEach(function(m) {
    var flags = rptMemberFlagsInMonth(m.id, targetMonth);
    if (flags.red >= 2) {
      monthlyRisk.push({ id: m.id, name: m.name, dept: rptGetMemberDept(m.id), red: flags.red });
    }
  });
  monthlyRisk.sort(function(a, b) { return b.red - a.red; });

  // Consecutive red zone
  var consecutiveRed = [];
  members.forEach(function(m) {
    var streak = 0;
    for (var i = months.length - 1; i >= 0; i--) {
      if (rptMemberZoneAtMonth(m.id, months[i]) === "red") streak++;
      else break;
    }
    if (streak >= 2) consecutiveRed.push({ id: m.id, name: m.name, dept: rptGetMemberDept(m.id), streak: streak });
  });
  consecutiveRed.sort(function(a, b) { return b.streak - a.streak; });

  // Department red density
  var deptRed = {};
  var deptTotal = {};
  members.forEach(function(m) {
    var d = rptGetMemberDept(m.id);
    deptTotal[d] = (deptTotal[d] || 0) + 1;
    var zone = targetMonth ? rptMemberZoneAtMonth(m.id, targetMonth) : getMemberZone(m.id);
    if (zone === "red") deptRed[d] = (deptRed[d] || 0) + 1;
  });
  var deptDensity = Object.keys(deptTotal).map(function(d) {
    return { dept: d, red: deptRed[d] || 0, total: deptTotal[d], pct: Math.round(((deptRed[d] || 0) / deptTotal[d]) * 100) };
  }).sort(function(a, b) { return b.pct - a.pct; });

  // Most frequent red flag category
  var catCounts = {};
  rptFlagsForMonth(targetMonth).filter(function(f) { return f.color === "red"; }).forEach(function(f) {
    var cat = f.category || "uncategorized";
    catCounts[cat] = (catCounts[cat] || 0) + f.count;
  });
  var topCats = Object.keys(catCounts).map(function(c) {
    return { cat: c, count: catCounts[c] };
  }).sort(function(a, b) { return b.count - a.count; });

  // KPIs
  var totalRisk = monthlyRisk.length + consecutiveRed.length;
  html += '<div class="rpt-kpi-grid rpt-kpi-grid-4">';
  html += rptKPI('Monthly Risk Members', monthlyRisk.length.toString(), '2+ growth signals in ' + rptMonthLabel(targetMonth), monthlyRisk.length > 0 ? 'rpt-kpi-negative' : 'rpt-kpi-positive');
  html += rptKPI('Consecutive Red', consecutiveRed.length.toString(), '2+ months in red zone', consecutiveRed.length > 0 ? 'rpt-kpi-negative' : 'rpt-kpi-positive');
  html += rptKPI('Highest Risk Dept', deptDensity.length > 0 && deptDensity[0].pct > 0 ? deptDensity[0].dept : 'None', deptDensity.length > 0 && deptDensity[0].pct > 0 ? deptDensity[0].pct + '% red density' : 'all clear', deptDensity.length > 0 && deptDensity[0].pct > 25 ? 'rpt-kpi-negative' : '');
  html += rptKPI('Top Risk Category', topCats.length > 0 ? getCategoryLabel(topCats[0].cat) : 'None', topCats.length > 0 ? topCats[0].count + ' signals' : '', '');
  html += '</div>';

  html += '<div class="rpt-sections">';

  // Monthly risk members
  html += '<div class="rpt-section"><h4>Monthly Risk Members <span class="rpt-badge-alert">' + monthlyRisk.length + '</span></h4>';
  if (monthlyRisk.length > 0) {
    html += '<table class="rpt-table"><thead><tr><th>Name</th><th>Department</th><th>Growth Signals</th><th>Status</th></tr></thead><tbody>';
    monthlyRisk.forEach(function(m) {
      html += '<tr><td>' + escapeHtml(m.name) + '</td><td>' + escapeHtml(m.dept) + '</td><td class="rpt-val-negative">' + m.red + '</td><td><span class="rpt-alert-badge rpt-alert-pulse">Attention Needed</span></td></tr>';
    });
    html += '</tbody></table>';
  } else {
    html += '<p class="rpt-empty rpt-empty-positive">No members with 2+ growth signals this month. Culture health is stable.</p>';
  }
  html += '</div>';

  // Consecutive red
  html += '<div class="rpt-section"><h4>Consecutive Red Zone <span class="rpt-badge-alert">' + consecutiveRed.length + '</span></h4>';
  if (consecutiveRed.length > 0) {
    html += '<table class="rpt-table"><thead><tr><th>Name</th><th>Department</th><th>Months in Red</th><th>Priority</th></tr></thead><tbody>';
    consecutiveRed.forEach(function(m) {
      var priority = m.streak >= 3 ? 'Critical' : 'High';
      html += '<tr><td>' + escapeHtml(m.name) + '</td><td>' + escapeHtml(m.dept) + '</td><td>' + m.streak + '</td><td><span class="rpt-priority-badge rpt-priority-' + priority.toLowerCase() + '">' + priority + '</span></td></tr>';
    });
    html += '</tbody></table>';
  } else {
    html += '<p class="rpt-empty rpt-empty-positive">No consecutive red zone members.</p>';
  }
  html += '</div>';
  html += '</div>';

  // Department risk density + Category breakdown
  html += '<div class="rpt-sections">';
  html += '<div class="rpt-section"><h4>Department Risk Density</h4>';
  html += rptBarChart(deptDensity.map(function(d) {
    return { label: d.dept, value: d.pct, display: d.pct + '% (' + d.red + '/' + d.total + ')', color: d.pct > 30 ? 'red' : d.pct > 15 ? 'orange' : 'green' };
  }), 100);
  html += '</div>';

  html += '<div class="rpt-section"><h4>Risk by Category</h4>';
  if (topCats.length > 0) {
    html += rptBarChart(topCats.map(function(c) {
      return { label: getCategoryLabel(c.cat), value: c.count, display: c.count + ' signals', color: 'red' };
    }));
  } else {
    html += '<p class="rpt-empty">No categorized growth signals.</p>';
  }
  html += '</div>';
  html += '</div>';

  container.innerHTML = html;
}

// ==================== D) Leadership Pipeline Report ====================

function renderLeadershipReport() {
  var container = document.getElementById("rpt-content");
  var members = rptFilteredMembers();
  var months = rptGetMonths();

  var html = '<div class="rpt-report-header"><h3>Leadership Pipeline</h3><p>Identifying high-potential culture leaders based on consistent performance</p></div>';

  // Green for 3+ consecutive months
  var greenStreak = [];
  members.forEach(function(m) {
    var streak = 0;
    for (var i = months.length - 1; i >= 0; i--) {
      if (rptMemberZoneAtMonth(m.id, months[i]) === "green") streak++;
      else break;
    }
    var eff = getEffectiveFlags(m.id);
    var net = eff.green - eff.red;
    var trend = getMemberTrend(m.id);
    greenStreak.push({ id: m.id, name: m.name, dept: rptGetMemberDept(m.id), streak: streak, net: net, green: eff.green, trend: trend });
  });

  // Highest green momentum (most green signals in last 3 months)
  var last3 = months.slice(-3);
  var recentGreen = members.map(function(m) {
    var count = 0;
    data.flags.forEach(function(f) {
      if (f.memberId === m.id && f.color === "green" && last3.indexOf(getMonthKey(f.createdAt)) !== -1) {
        count += f.count;
      }
    });
    return { id: m.id, name: m.name, dept: rptGetMemberDept(m.id), count: count };
  }).sort(function(a, b) { return b.count - a.count; });

  // Leadership candidates: green 3+ months, rising trend, net >= 3
  var candidates = greenStreak.filter(function(m) {
    return m.streak >= 3 && m.net >= 3;
  }).sort(function(a, b) { return b.net - a.net; });

  var potentials = greenStreak.filter(function(m) {
    return m.streak >= 2 && m.net >= 1 && m.trend === "rising";
  }).sort(function(a, b) { return b.net - a.net; });

  // KPIs
  html += '<div class="rpt-kpi-grid rpt-kpi-grid-4">';
  html += rptKPI('Leadership Ready', candidates.length.toString(), 'green 3+ months, net &ge; 3', 'rpt-kpi-positive');
  html += rptKPI('High Potential', potentials.length.toString(), 'rising trend, green 2+ months', '');
  html += rptKPI('Avg Green Momentum', recentGreen.length > 0 ? (recentGreen.reduce(function(s, m) { return s + m.count; }, 0) / recentGreen.length).toFixed(1) : '0', 'strength signals / member (3mo)', '');
  html += rptKPI('Green Zone Depth', greenStreak.filter(function(m) { return m.streak >= 1; }).length + '/' + members.length, 'members currently green', 'rpt-kpi-positive');
  html += '</div>';

  // Leadership candidates table
  html += '<div class="rpt-section"><h4>Leadership Candidates</h4><p class="rpt-section-sub">Consistently in Green Zone with strong net scores</p>';
  if (candidates.length > 0) {
    html += '<table class="rpt-table"><thead><tr><th>Name</th><th>Department</th><th>Green Streak</th><th>Net Score</th><th>Trend</th></tr></thead><tbody>';
    candidates.forEach(function(m) {
      var trendHtml = m.trend === "rising" ? '<span class="rpt-trend-up">Accelerating</span>' : m.trend === "falling" ? '<span class="rpt-trend-down">Slowing</span>' : '<span class="rpt-trend-flat">Steady</span>';
      html += '<tr><td><span class="rpt-candidate-star">&#9733;</span> ' + escapeHtml(m.name) + '</td><td>' + escapeHtml(m.dept) + '</td><td>' + m.streak + ' months</td><td class="rpt-val-positive">+' + m.net + '</td><td>' + trendHtml + '</td></tr>';
    });
    html += '</tbody></table>';
  } else {
    html += '<p class="rpt-empty">No leadership-ready candidates yet. Members need 3+ months in Green Zone with net score &ge; 3.</p>';
  }
  html += '</div>';

  // High potentials
  html += '<div class="rpt-section"><h4>High Potential (Rising Stars)</h4>';
  if (potentials.length > 0) {
    html += '<table class="rpt-table"><thead><tr><th>Name</th><th>Department</th><th>Green Streak</th><th>Net Score</th></tr></thead><tbody>';
    potentials.forEach(function(m) {
      html += '<tr><td>' + escapeHtml(m.name) + '</td><td>' + escapeHtml(m.dept) + '</td><td>' + m.streak + ' months</td><td class="rpt-val-positive">+' + m.net + '</td></tr>';
    });
    html += '</tbody></table>';
  } else {
    html += '<p class="rpt-empty">No rising stars identified.</p>';
  }
  html += '</div>';

  // Green momentum bar chart
  html += '<div class="rpt-section"><h4>Strength Signal Momentum (Last 3 Months)</h4>';
  html += rptBarChart(recentGreen.slice(0, 10).map(function(m) {
    return { label: m.name, value: m.count, display: m.count + ' signals', color: 'green' };
  }));
  html += '</div>';

  container.innerHTML = html;
}

// ==================== E) Department Culture Report ====================

function renderDepartmentReport() {
  var container = document.getElementById("rpt-content");
  var members = rptFilteredMembers();
  var months = rptGetMonths();
  var monthKey = rptGetSelectedMonth();
  var targetMonth = monthKey || (months.length > 0 ? months[months.length - 1] : null);

  var depts = {};
  members.forEach(function(m) {
    var d = rptGetMemberDept(m.id);
    if (!depts[d]) depts[d] = [];
    depts[d].push(m);
  });
  var deptNames = Object.keys(depts).sort();

  var html = '<div class="rpt-report-header"><h3>Department Culture Report</h3><p>Zone distribution and culture health across departments</p></div>';

  // Department overview cards
  html += '<div class="rpt-dept-grid">';
  deptNames.forEach(function(d) {
    var dm = depts[d];
    var dist = rptZoneDistribution(dm, targetMonth);
    var cmi = rptCultureMomentumIndex(dm, targetMonth);
    var risk = rptRiskIndex(dm, targetMonth);

    html += '<div class="rpt-dept-card">';
    html += '<div class="rpt-dept-card-header"><h4>' + escapeHtml(d) + '</h4><span class="rpt-dept-count">' + dm.length + ' members</span></div>';
    html += rptStackedBar(dist.greenPct, dist.orangePct, dist.redPct);
    html += '<div class="rpt-dept-metrics">';
    html += '<div class="rpt-dept-metric"><span class="rpt-dept-metric-val ' + (cmi >= 0 ? 'rpt-val-positive' : 'rpt-val-negative') + '">' + (cmi >= 0 ? '+' : '') + cmi.toFixed(1) + '</span><span class="rpt-dept-metric-label">Momentum</span></div>';
    html += '<div class="rpt-dept-metric"><span class="rpt-dept-metric-val">' + dist.greenPct + '%</span><span class="rpt-dept-metric-label">Green</span></div>';
    html += '<div class="rpt-dept-metric"><span class="rpt-dept-metric-val ' + (risk > 25 ? 'rpt-val-negative' : '') + '">' + risk + '%</span><span class="rpt-dept-metric-label">Risk</span></div>';
    html += '</div></div>';
  });
  html += '</div>';

  // Red density heatmap (table)
  html += '<div class="rpt-section"><h4>Department Health Matrix</h4>';
  var last4 = months.slice(-4);
  if (last4.length > 0) {
    html += '<table class="rpt-table rpt-heatmap"><thead><tr><th>Department</th>';
    last4.forEach(function(mk) { html += '<th>' + rptMonthLabel(mk) + '</th>'; });
    html += '</tr></thead><tbody>';
    deptNames.forEach(function(d) {
      html += '<tr><td>' + escapeHtml(d) + '</td>';
      last4.forEach(function(mk) {
        var dm = depts[d];
        var redCount = 0;
        dm.forEach(function(m) {
          if (rptMemberZoneAtMonth(m.id, mk) === "red") redCount++;
        });
        var pct = Math.round((redCount / dm.length) * 100);
        var heatClass = pct === 0 ? 'rpt-heat-0' : pct <= 20 ? 'rpt-heat-1' : pct <= 40 ? 'rpt-heat-2' : pct <= 60 ? 'rpt-heat-3' : 'rpt-heat-4';
        html += '<td class="' + heatClass + '">' + pct + '%</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
  }
  html += '</div>';

  // Department trend comparison sparklines
  html += '<div class="rpt-section"><h4>Department Momentum Comparison</h4>';
  var last6 = months.slice(-6);
  deptNames.forEach(function(d, idx) {
    var dm = depts[d];
    var cmiVals = last6.map(function(mk) { return rptCultureMomentumIndex(dm, mk); });
    var latestCmi = cmiVals.length > 0 ? cmiVals[cmiVals.length - 1] : 0;
    html += '<div class="rpt-dept-trend-row">';
    html += '<span class="rpt-dept-trend-name">' + escapeHtml(d) + '</span>';
    html += '<canvas id="rpt-dept-spark-' + idx + '" class="rpt-sparkline-sm"></canvas>';
    html += '<span class="rpt-dept-trend-val ' + (latestCmi >= 0 ? 'rpt-val-positive' : 'rpt-val-negative') + '">' + (latestCmi >= 0 ? '+' : '') + latestCmi.toFixed(1) + '</span>';
    html += '</div>';
  });
  html += '</div>';

  container.innerHTML = html;

  // Render sparklines
  deptNames.forEach(function(d, idx) {
    var dm = depts[d];
    var cmiVals = last6.map(function(mk) { return rptCultureMomentumIndex(dm, mk); });
    var color = cmiVals.length > 1 && cmiVals[cmiVals.length - 1] >= cmiVals[cmiVals.length - 2] ? "#059669" : "#B91C1C";
    rptSparkline("rpt-dept-spark-" + idx, cmiVals, color);
  });
}

// ==================== F) Quarterly Culture Intelligence ====================

function renderQuarterlyReport() {
  var container = document.getElementById("rpt-content");
  var members = rptFilteredMembers();
  var months = rptGetMonths();

  // Determine quarters
  var quarters = {};
  months.forEach(function(mk) {
    var parts = mk.split("-");
    var q = "Q" + (Math.ceil(parseInt(parts[1]) / 3)) + " " + parts[0];
    if (!quarters[q]) quarters[q] = [];
    quarters[q].push(mk);
  });
  var qKeys = Object.keys(quarters).sort(function(a, b) {
    var pa = a.split(" "), pb = b.split(" ");
    return (pa[1] + pa[0]) < (pb[1] + pb[0]) ? -1 : 1;
  });

  var html = '<div class="rpt-report-header"><h3>Quarterly Culture Intelligence</h3><p>Strategic overview for leadership and board-level reporting</p></div>';

  // Current quarter data
  var curQ = qKeys.length > 0 ? qKeys[qKeys.length - 1] : null;
  var prevQ = qKeys.length > 1 ? qKeys[qKeys.length - 2] : null;
  var curMonths = curQ ? quarters[curQ] : [];
  var lastMonthOfQ = curMonths.length > 0 ? curMonths[curMonths.length - 1] : null;
  var prevLastMonth = prevQ && quarters[prevQ].length > 0 ? quarters[prevQ][quarters[prevQ].length - 1] : null;

  var cmi = lastMonthOfQ ? rptCultureMomentumIndex(members, lastMonthOfQ) : 0;
  var prevCmi = prevLastMonth ? rptCultureMomentumIndex(members, prevLastMonth) : null;
  var risk = lastMonthOfQ ? rptRiskIndex(members, lastMonthOfQ) : 0;
  var stability = lastMonthOfQ ? rptStabilityScore(members, lastMonthOfQ) : 0;
  var improvement = (prevLastMonth && lastMonthOfQ) ? rptNetImprovement(members, prevLastMonth, lastMonthOfQ) : null;

  // KPIs
  html += '<div class="rpt-kpi-grid rpt-kpi-grid-5">';
  html += rptKPI('Culture Momentum', cmi.toFixed(2), curQ || '', cmi >= 0 ? 'rpt-kpi-positive' : 'rpt-kpi-negative');
  html += rptKPI('Risk Index', risk + '%', risk <= 15 ? 'Low risk' : risk <= 30 ? 'Moderate' : 'Elevated', risk > 30 ? 'rpt-kpi-negative' : risk > 15 ? 'rpt-kpi-caution' : 'rpt-kpi-positive');
  html += rptKPI('Stability', stability + '%', 'green zone rate', 'rpt-kpi-positive');
  html += rptKPI('Improvement', improvement !== null ? improvement + '%' : '—', prevQ ? 'vs ' + prevQ : '', '');
  html += rptKPI('Team Size', members.length.toString(), 'active members', '');
  html += '</div>';

  // Executive Summary
  html += '<div class="rpt-executive-summary">';
  html += '<h4>Executive Summary</h4>';
  html += '<div class="rpt-exec-content">';
  var summaryPoints = [];
  if (stability >= 60) summaryPoints.push('Culture stability is strong with ' + stability + '% of members in the Green Zone.');
  else if (stability >= 40) summaryPoints.push('Culture stability is moderate at ' + stability + '%. Targeted coaching recommended.');
  else summaryPoints.push('Culture stability needs attention — only ' + stability + '% in Green Zone. Recommend leadership review.');

  if (risk <= 15) summaryPoints.push('Risk levels are low at ' + risk + '%, indicating a healthy team dynamic.');
  else if (risk <= 30) summaryPoints.push('Risk index at ' + risk + '% — a few team members may benefit from support conversations.');
  else summaryPoints.push('Elevated risk at ' + risk + '% — recommend prioritized 1-on-1 coaching sessions.');

  if (improvement !== null) {
    if (improvement >= 50) summaryPoints.push('Strong positive momentum with ' + improvement + '% of team improving quarter-over-quarter.');
    else if (improvement >= 25) summaryPoints.push('Moderate improvement trend at ' + improvement + '%. Culture programs are gaining traction.');
    else summaryPoints.push('Improvement rate at ' + improvement + '%. Consider refreshing engagement strategies.');
  }

  if (cmi >= 2) summaryPoints.push('Culture Momentum Index of ' + cmi.toFixed(2) + ' signals a healthy, high-performing culture.');
  else if (cmi >= 0) summaryPoints.push('Culture Momentum Index at ' + cmi.toFixed(2) + ' — stable but with room for growth.');
  else summaryPoints.push('Negative Culture Momentum (' + cmi.toFixed(2) + ') indicates systemic challenges requiring leadership attention.');

  summaryPoints.forEach(function(p) { html += '<p>' + p + '</p>'; });
  html += '</div></div>';

  // Quarterly trend lines
  html += '<div class="rpt-sections">';
  html += '<div class="rpt-section"><h4>Quarterly Momentum Trend</h4>';
  html += '<canvas id="rpt-quarterly-spark" class="rpt-sparkline-lg"></canvas>';
  html += '<div class="rpt-spark-labels">';
  var last8 = months.slice(-8);
  last8.forEach(function(mk) { html += '<span>' + rptMonthLabel(mk) + '</span>'; });
  html += '</div></div>';

  // Quarterly zone trends
  html += '<div class="rpt-section"><h4>Zone Composition Over Time</h4>';
  var last6 = months.slice(-6);
  html += '<div class="rpt-zone-timeline">';
  last6.forEach(function(mk) {
    var dist = rptZoneDistribution(members, mk);
    html += '<div class="rpt-zone-col">';
    html += '<div class="rpt-zone-bar">';
    if (dist.redPct > 0) html += '<div class="rpt-zone-seg rpt-seg-red" style="height:' + dist.redPct + '%"></div>';
    if (dist.orangePct > 0) html += '<div class="rpt-zone-seg rpt-seg-orange" style="height:' + dist.orangePct + '%"></div>';
    if (dist.greenPct > 0) html += '<div class="rpt-zone-seg rpt-seg-green" style="height:' + dist.greenPct + '%"></div>';
    html += '</div>';
    html += '<div class="rpt-zone-col-label">' + rptMonthLabel(mk) + '</div>';
    html += '</div>';
  });
  html += '</div></div>';
  html += '</div>';

  // Quarter comparison table
  html += '<div class="rpt-section"><h4>Quarter-over-Quarter Comparison</h4>';
  if (qKeys.length > 0) {
    html += '<table class="rpt-table"><thead><tr><th>Quarter</th><th>Momentum</th><th>Stability</th><th>Risk</th><th>Green</th><th>Orange</th><th>Red</th></tr></thead><tbody>';
    qKeys.slice(-4).forEach(function(q) {
      var qMonths = quarters[q];
      var lm = qMonths[qMonths.length - 1];
      var qCmi = rptCultureMomentumIndex(members, lm);
      var qStab = rptStabilityScore(members, lm);
      var qRisk = rptRiskIndex(members, lm);
      var qDist = rptZoneDistribution(members, lm);
      html += '<tr><td><strong>' + q + '</strong></td>';
      html += '<td class="' + (qCmi >= 0 ? 'rpt-val-positive' : 'rpt-val-negative') + '">' + (qCmi >= 0 ? '+' : '') + qCmi.toFixed(2) + '</td>';
      html += '<td>' + qStab + '%</td>';
      html += '<td class="' + (qRisk > 30 ? 'rpt-val-negative' : '') + '">' + qRisk + '%</td>';
      html += '<td>' + qDist.green + '</td><td>' + qDist.orange + '</td><td>' + qDist.red + '</td></tr>';
    });
    html += '</tbody></table>';
  }
  html += '</div>';

  container.innerHTML = html;

  // Render sparkline
  var sparkData = last8.map(function(mk) { return rptCultureMomentumIndex(members, mk); });
  rptSparkline("rpt-quarterly-spark", sparkData, "#4F46E5");
}

// ==================== Export: CSV ====================

function exportReportCSV() {
  var members = rptFilteredMembers();
  var months = rptGetMonths();
  var monthKey = rptGetSelectedMonth();
  var targetMonth = monthKey || (months.length > 0 ? months[months.length - 1] : null);

  var rows = [["Name", "Email", "Department", "Net Score", "Green Signals", "Red Signals", "Zone", "Trend"]];

  members.forEach(function(m) {
    var eff = getEffectiveFlags(m.id);
    var net = eff.green - eff.red;
    var zone = targetMonth ? rptMemberZoneAtMonth(m.id, targetMonth) : getMemberZone(m.id);
    var trend = getMemberTrend(m.id);
    rows.push([m.name, m.email, rptGetMemberDept(m.id), net, eff.green, eff.red, zone, trend]);
  });

  var csv = rows.map(function(r) {
    return r.map(function(cell) {
      return '"' + String(cell).replace(/"/g, '""') + '"';
    }).join(",");
  }).join("\n");

  var blob = new Blob([csv], { type: "text/csv" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "gor-culture-report-" + (targetMonth || "all") + ".csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ==================== Export: PDF (Print) ====================

function exportReportPDF() {
  window.print();
}

// ==================== Render Reports (called from refreshAll) ====================

function renderReports() {
  var view = document.getElementById("reports-view");
  if (!view || !view.classList.contains("active")) return;
  switchReportTab(currentReportTab);
}
