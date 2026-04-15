/**
 * Animated Product Demo Simulations
 * Pure CSS/JS mock UIs for the landing page
 */

// ─── Shared: typing effect ───────────────────────────────────────────────────
function typeText(el, text, speed = 40) {
  return new Promise(resolve => {
    let i = 0;
    el.textContent = '';
    const id = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) { clearInterval(id); resolve(); }
    }, speed);
  });
}

// ─── DataQGuard Dashboard Animation ────────────────────────────────────────
function initDataQGuardDemo(container) {
  const bars = container.querySelectorAll('.bar-fill');
  const numbers = container.querySelectorAll('.metric-number');
  const statusDots = container.querySelectorAll('.status-dot');
  const timelineItems = container.querySelectorAll('.timeline-item');
  const anomalyHighlight = container.querySelector('.anomaly-highlight');

  const sequence = [
    () => animateBars(bars),
    () => animateNumbers(numbers),
    () => flashStatus(statusDots),
    () => showTimeline(timelineItems),
    () => showAnomaly(anomalyHighlight),
  ];

  let idx = 0;
  function run() {
    if (idx < sequence.length) sequence[idx++]();
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(run, 300);
      setInterval(() => { idx = 0; run(); }, 8000);
      obs.disconnect();
    }
  }, { threshold: 0.3 });
  obs.observe(container);
}

function animateBars(bars) {
  const targets = [97, 99, 94, 98, 95, 99, 96];
  bars.forEach((bar, i) => {
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = targets[i] + '%'; }, i * 80);
  });
}

function animateNumbers(nums) {
  const targets = [99.4, 2847, 0];
  nums.forEach((n, i) => {
    let cur = 0;
    const end = targets[i];
    const id = setInterval(() => {
      cur += end / 30;
      n.textContent = (cur >= end ? end : Math.round(cur * 10) / 10) + (i === 0 ? '%' : i === 1 ? '' : ' ⚠');
      if (cur >= end) clearInterval(id);
    }, 30);
  });
}

function flashStatus(dots) {
  dots.forEach((dot, i) => {
    setTimeout(() => {
      dot.style.background = i === 2 ? '#ff4444' : '#00ff88';
      dot.style.boxShadow = i === 2 ? '0 0 8px #ff4444' : '0 0 8px #00ff88';
      setTimeout(() => { dot.style.background = ''; dot.style.boxShadow = ''; }, 600);
    }, i * 400);
  });
}

function showTimeline(items) {
  items.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-10px)';
    setTimeout(() => {
      item.style.transition = 'all 0.4s ease';
      item.style.opacity = '1';
      item.style.transform = 'none';
    }, i * 250);
  });
}

function showAnomaly(el) {
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'scale(0.95)';
  setTimeout(() => {
    el.style.transition = 'all 0.5s ease';
    el.style.opacity = '1';
    el.style.transform = 'scale(1)';
  }, 1200);
}

// ─── ai-data-analyst Chat Animation ───────────────────────────────────────
function initAIAnalystDemo(container) {
  const messages = container.querySelectorAll('.chat-message');
  const chartArea = container.querySelector('.chart-area');
  const sqlBlock = container.querySelector('.sql-block');
  const inputEl = container.querySelector('.chat-input');

  let step = 0;

  function runStep(i) {
    if (i >= messages.length) return;

    const msg = messages[i];
    const isUser = msg.classList.contains('user');

    if (isUser) {
      msg.style.opacity = '1';
      msg.style.transform = 'translateY(8px)';
      setTimeout(() => runStep(i + 1), 1200);
    } else {
      msg.style.opacity = '1';
      msg.style.transform = 'translateY(0)';
      const text = msg.querySelector('.msg-text');
      if (text) {
        const full = text.dataset.full || text.textContent;
        text.textContent = '';
        msg.style.transform = 'translateY(0)';
        let chars = 0;
        const id = setInterval(() => {
          text.textContent += full[chars++];
          if (chars >= full.length) {
            clearInterval(id);
            if (i === 1) {
              setTimeout(() => showSQL(sqlBlock), 200);
              setTimeout(() => showChart(chartArea), 800);
            }
            setTimeout(() => runStep(i + 1), 1400);
          }
        }, 18);
      } else {
        setTimeout(() => runStep(i + 1), 1400);
      }
    }
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => runStep(0), 500);
      obs.disconnect();
    }
  }, { threshold: 0.3 });
  obs.observe(container);
}

function showSQL(block) {
  if (!block) return;
  block.style.display = 'block';
  block.style.opacity = '0';
  block.style.transform = 'translateY(8px)';
  setTimeout(() => {
    block.style.transition = 'all 0.35s ease';
    block.style.opacity = '1';
    block.style.transform = 'none';
  }, 50);
}

function showChart(area) {
  if (!area) return;
  area.style.display = 'flex';
  area.style.opacity = '0';
  setTimeout(() => {
    area.style.transition = 'opacity 0.5s ease';
    area.style.opacity = '1';
    animateBars2(area.querySelectorAll('.cbar'));
  }, 50);
}

function animateBars2(bars) {
  const vals = [65, 82, 47, 91, 73, 88, 56];
  bars.forEach((bar, i) => {
    bar.style.height = '0%';
    setTimeout(() => {
      bar.style.transition = 'height 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      bar.style.height = vals[i] + '%';
    }, i * 70);
  });
}

// ─── etl-toolkit Pipeline Animation ────────────────────────────────────────
function initETLDemo(container) {
  const steps = container.querySelectorAll('.pipe-step');
  const connections = container.querySelectorAll('.pipe-conn');
  const logs = container.querySelectorAll('.log-entry');
  const particles = container.querySelectorAll('.particle');
  const resultBadge = container.querySelector('.result-badge');

  const connPaths = [
    'M 60,30 L 120,30',
    'M 200,30 L 260,30',
    'M 340,30 L 400,30',
    'M 460,30 L 520,30',
  ];

  function run() {
    // Reset
    steps.forEach(s => { s.style.opacity = '0.35'; s.style.transform = 'scale(0.95)'; });
    logs.forEach(l => { l.style.opacity = '0'; l.textContent = ''; });
    particles.forEach(p => p.style.opacity = '0');
    if (resultBadge) resultBadge.style.opacity = '0';

    const timings = [0, 900, 1800, 2700, 3600];
    const labels = [
      '→ ReadDatabase: SELECT * FROM users (4,291 rows)',
      '→ QualityCheck: not_null passed · unique passed · range passed ✓',
      '→ Transform: normalize_email (4,291 rows)',
      '→ WriteDatabase: upsert dim_users — 4,291 rows written in 342ms',
    ];

    // Step 1: ReadDatabase
    setTimeout(() => {
      steps[0].style.transition = 'all 0.4s ease';
      steps[0].style.opacity = '1';
      steps[0].style.transform = 'scale(1)';
      animateParticle(particles[0], connPaths[0]);
      showLog(logs[0], labels[0], '#00e5ff');
    }, timings[0]);

    // Step 2: QualityCheck
    setTimeout(() => {
      steps[1].style.transition = 'all 0.4s ease';
      steps[1].style.opacity = '1';
      steps[1].style.transform = 'scale(1)';
      animateParticle(particles[1], connPaths[1]);
      showLog(logs[1], labels[1], '#00ff88');
    }, timings[1]);

    // Step 3: Transform
    setTimeout(() => {
      steps[2].style.transition = 'all 0.4s ease';
      steps[2].style.opacity = '1';
      steps[2].style.transform = 'scale(1)';
      animateParticle(particles[2], connPaths[2]);
      showLog(logs[2], labels[2], '#ff9100');
    }, timings[2]);

    // Step 4: WriteDatabase
    setTimeout(() => {
      steps[3].style.transition = 'all 0.4s ease';
      steps[3].style.opacity = '1';
      steps[3].style.transform = 'scale(1)';
      animateParticle(particles[3], connPaths[3]);
      showLog(logs[3], labels[3], '#b388ff');
    }, timings[3]);

    // Result
    setTimeout(() => {
      if (resultBadge) {
        resultBadge.style.transition = 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        resultBadge.style.opacity = '1';
        resultBadge.style.transform = 'scale(1)';
      }
    }, 4400);
  }

  function showLog(el, text, color) {
    if (!el) return;
    el.style.transition = 'opacity 0.3s ease';
    el.style.opacity = '1';
    el.style.borderLeftColor = color;
    el.style.color = color;
    let i = 0;
    el.textContent = '⏳';
    const id = setInterval(() => {
      el.textContent = text.substring(0, ++i);
      if (i >= text.length) clearInterval(id);
    }, 30);
  }

  function animateParticle(p, path) {
    if (!p || !path) return;
    p.style.opacity = '1';
    p.style.transition = 'none';
    p.style.offsetPath = `path('${path}')`;
    p.style.offsetDistance = '0px';
    setTimeout(() => {
      p.style.transition = 'offset-distance 0.6s ease-in';
      p.style.offsetDistance = '100%';
    }, 10);
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(run, 400);
      setInterval(run, 9000);
      obs.disconnect();
    }
  }, { threshold: 0.25 });
  obs.observe(container);
}

// ─── Init all demos ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const qg = document.getElementById('demo-qguard');
  const ai = document.getElementById('demo-ai');
  const etl = document.getElementById('demo-etl');
  if (qg) initDataQGuardDemo(qg);
  if (ai) initAIAnalystDemo(ai);
  if (etl) initETLDemo(etl);
});
