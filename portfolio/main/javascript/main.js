/**
 * OBSIDIAN WORKSPACE - APPLICATION LOGIC & INTERACTIVITY ENGINE
 * Core system interactivity, tab navigation, project inspector, live telemetry & hotkeys.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();
  initNavigation();
  initBootSequence();
  initProjectInspector();
  initTelemetryClock();
  initContactForm();
  initClipboardHandlers();
  initKeyboardHotkeys();
});

/* ==========================================================================
   0. SIDEBAR TOGGLE & MINIMIZE SYSTEM (⌘B)
   ========================================================================== */
function initSidebarToggle() {
  const toggleBtns = document.querySelectorAll('.sidebar-toggle-btn, #sidebar-toggle-header');
  const aside = document.querySelector('.app-aside');
  if (!aside) return;

  // Restore saved collapse state across page navigation
  const isCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
  if (isCollapsed) {
    aside.classList.add('collapsed');
    updateToggleIcons(true);
  }

  function toggleSidebar() {
    const collapsed = aside.classList.toggle('collapsed');
    localStorage.setItem('sidebar_collapsed', collapsed ? 'true' : 'false');
    updateToggleIcons(collapsed);
    showToast(collapsed ? 'Sidebar Collapsed (⌘B)' : 'Sidebar Expanded (⌘B)');
  }

  function updateToggleIcons(collapsed) {
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = collapsed ? 'side_navigation' : 'dock_to_left';
      }
    });
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSidebar();
    });
  });

  // Global Ctrl+B / Cmd+B hotkey to toggle sidebar
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleSidebar();
    }
  });
}

/* ==========================================================================
   1. NAVIGATION & BUFFER SWITCHING
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('[data-path]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetPath = link.getAttribute('data-path');
      if (targetPath) {
        e.preventDefault();
        navigateToPath(targetPath);
      }
    });
  });
}

function navigateToPath(path) {
  const pageMap = {
    'about': 'about.html',
    'work': 'work.html',
    'stack': 'stack.html',
    'experience': 'experience.html',
    'contact': 'contact.html',
    'contact_form': 'contact_form.html',
    'boot': 'index.html'
  };

  const targetFile = pageMap[path] || `${path}.html`;
  // Determine relative path based on current window location
  if (window.location.pathname.includes('/html/')) {
    window.location.href = targetFile;
  } else {
    window.location.href = `html/${targetFile}`;
  }
}

/* ==========================================================================
   2. BOOT LOADING SEQUENCE SIMULATION
   ========================================================================== */
function initBootSequence() {
  const progressFill = document.getElementById('progress-fill');
  const progressPercent = document.getElementById('progress-percent');
  const chunkDisplay = document.getElementById('chunk-display');
  const skipBtn = document.getElementById('skip-btn');
  const activeStep = document.getElementById('step-active');

  if (!progressFill) return;

  let progress = 78;
  let completed = false;

  function completeLoad() {
    if (completed) return;
    completed = true;
    progress = 100;
    if (progressFill) progressFill.style.width = '100%';
    if (progressPercent) progressPercent.innerText = '100%';
    if (chunkDisplay) chunkDisplay.innerText = '18/18';

    if (activeStep) {
      activeStep.classList.remove('animate-pulse');
      activeStep.innerHTML = `
        <span class="px-1.5 py-0.2 rounded bg-primary/10 text-primary font-metadata-label text-metadata-label font-semibold">OK</span>
        <span class="text-on-surface">Workspace buffer ready. Dispatching view transition...</span>
        <span class="material-symbols-outlined text-[14px] text-primary ml-auto">check_circle</span>
      `;
    }

    setTimeout(() => {
      navigateToPath('about');
    }, 450);
  }

  const interval = setInterval(() => {
    if (progress < 96) {
      progress += Math.floor(Math.random() * 4) + 1;
      if (progress > 96) progress = 96;
      if (progressFill) progressFill.style.width = `${progress}%`;
      if (progressPercent) progressPercent.innerText = `${progress}%`;
      const chunks = Math.min(18, Math.floor((progress / 100) * 18));
      if (chunkDisplay) chunkDisplay.innerText = `${chunks}/18`;
    } else {
      clearInterval(interval);
      setTimeout(completeLoad, 600);
    }
  }, 180);

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      completeLoad();
    }
  });

  if (skipBtn) {
    skipBtn.addEventListener('click', completeLoad);
  }
}

/* ==========================================================================
   3. WORKSPACE PROJECT INSPECTOR (work.emad)
   ========================================================================== */
function initProjectInspector() {
  const projects = [
    {
      idx: "01",
      title: "HRMS — Human Resource Management System",
      category: "fullstack",
      subtitle: "Express.js · MongoDB · EJS · Node.js Cluster",
      year: "2025",
      type: "FULL-STACK",
      client: "CLIENT WORK",
      narrative: "Streamlined multi-tenant enterprise system for attendance tracking, automated payroll calculation, and role-based access management with real-time audit logs.",
      highlights: [
        { icon: "account_tree", title: "Modular MVC", desc: "Strict controller decoupling" },
        { icon: "database", title: "Mongo Aggregation", desc: "Custom payroll pipelines" },
        { icon: "bolt", title: "SSR & Micro-APIs", desc: "Sub-40ms response latency" }
      ],
      metrics: ["99.98%", "14.2k events", "89.4% Jest", "Docker / AWS"]
    },
    {
      idx: "02",
      title: "EMIFLIX — Media Streaming Engine",
      category: "fullstack",
      subtitle: "Java · XML · Firebase Engine · Android SDK",
      year: "2024",
      type: "MOBILE / CLOUD",
      client: "COMMERCIAL",
      narrative: "Architected low-latency digital streaming platform featuring real-time catalog syncing, client caching protocols, and predictive content recommendation pipelines.",
      highlights: [
        { icon: "sync", title: "Sync Engine", desc: "Realtime Firebase datastore" },
        { icon: "play_circle", title: "Adaptive Stream", desc: "Bitrate-aware media buffer" },
        { icon: "security", title: "Auth Pipeline", desc: "OAuth2 & JWT bearer security" }
      ],
      metrics: ["99.94%", "28.5k stream/d", "84.0% JUnit", "Google Cloud"]
    },
    {
      idx: "03",
      title: "React Web Experiences — Micro-Systems",
      category: "frontend",
      subtitle: "React 19 · Tailwind CSS · GSAP · Framer Motion",
      year: "2025",
      type: "FRONTEND",
      client: "INTERNAL",
      narrative: "Production-grade design engineering suite composed of ultra-smooth spatial transitions, 60fps micro-interactions, and accessible keyboard-navigable components.",
      highlights: [
        { icon: "layers", title: "Design Tokens", desc: "Programmatic Tailwind system" },
        { icon: "speed", title: "60 FPS Renders", desc: "Hardware-accelerated GSAP" },
        { icon: "accessibility", title: "WCAG AAA", desc: "Fully accessible tree models" }
      ],
      metrics: ["100/100", "< 12KB bundle", "96.2% RTL", "Vercel Edge"]
    },
    {
      idx: "04",
      title: "Interactive Frontend Projects — UI Visualizers",
      category: "frontend",
      subtitle: "Vanilla JS · Web APIs · Canvas 2D · Web Audio",
      year: "2024",
      type: "EXPERIMENTAL",
      client: "R&D LAB",
      narrative: "Exploration suite testing browser limits: Web Audio API frequency analyzers, particle physics engines using Canvas 2D, and lightweight zero-dependency reactive stores.",
      highlights: [
        { icon: "memory", title: "Custom Store", desc: "Zero-dependency 4KB state" },
        { icon: "graphic_eq", title: "Web Audio Canvas", desc: "Real-time FFT audio visualizer" },
        { icon: "brush", title: "Vector Engine", desc: "Procedural geometry generation" }
      ],
      metrics: ["0-dep", "60 FPS Canvas", "100% Native", "Cloudflare"]
    }
  ];

  let currentIdx = 0;

  const listItems = document.querySelectorAll('.project-item');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const btnNext = document.getElementById('btn-next-project');

  if (!listItems.length) return;

  const inspectorIndex = document.getElementById('inspector-index');
  const inspectorTitle = document.getElementById('inspector-title');
  const inspectorSubtitle = document.getElementById('inspector-subtitle');
  const inspectorNarrative = document.getElementById('inspector-narrative');
  const tagYear = document.getElementById('tag-year');
  const tagType = document.getElementById('tag-type');
  const tagClient = document.getElementById('tag-client');
  const highlightsContainer = document.getElementById('highlights-container');
  const metric1 = document.getElementById('metric-1');
  const metric2 = document.getElementById('metric-2');
  const metric3 = document.getElementById('metric-3');
  const metric4 = document.getElementById('metric-4');

  function renderInspector(idx) {
    const p = projects[idx];
    currentIdx = idx;

    if (inspectorIndex) inspectorIndex.textContent = p.idx;
    if (inspectorTitle) inspectorTitle.textContent = p.title;
    if (inspectorSubtitle) inspectorSubtitle.textContent = p.subtitle;
    if (inspectorNarrative) inspectorNarrative.textContent = p.narrative;
    if (tagYear) tagYear.textContent = p.year;
    if (tagType) tagType.textContent = p.type;
    if (tagClient) tagClient.textContent = p.client;

    if (metric1) metric1.textContent = p.metrics[0];
    if (metric2) metric2.textContent = p.metrics[1];
    if (metric3) metric3.textContent = p.metrics[2];
    if (metric4) metric4.textContent = p.metrics[3];

    if (highlightsContainer) {
      highlightsContainer.innerHTML = p.highlights.map(h => `
        <div class="p-space-md rounded bg-surface-container flex flex-col justify-between h-24">
          <span class="material-symbols-outlined text-[18px] text-primary">${h.icon}</span>
          <div>
            <span class="font-code-sm text-code-sm text-on-surface font-medium block">${h.title}</span>
            <span class="font-metadata-label text-metadata-label text-on-surface-variant/60 block mt-0.5">${h.desc}</span>
          </div>
        </div>
      `).join('');
    }

    listItems.forEach((el, index) => {
      if (index === idx) {
        el.className = "project-item active group cursor-pointer p-space-md rounded bg-surface-container-high text-on-surface flex flex-col justify-between transition-all duration-150 relative";
      } else {
        el.className = "project-item group cursor-pointer p-space-md rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface flex flex-col justify-between transition-all duration-150 relative";
      }
    });
  }

  listItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-project-idx'), 10);
      renderInspector(idx);
    });
  });

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const nextIdx = (currentIdx + 1) % projects.length;
      renderInspector(nextIdx);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.className = "filter-btn px-2 py-0.5 rounded font-metadata-label text-metadata-label bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors";
      });
      btn.className = "filter-btn px-2 py-0.5 rounded font-metadata-label text-metadata-label bg-surface-container-high text-primary font-medium";

      const filter = btn.getAttribute('data-filter');
      listItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (currentIdx + 1) % projects.length;
      renderInspector(nextIdx);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (currentIdx - 1 + projects.length) % projects.length;
      renderInspector(prevIdx);
    }
  });
}

/* ==========================================================================
   4. TELEMETRY CLOCK (PKT UTC+5)
   ========================================================================== */
function initTelemetryClock() {
  const liveTimeEl = document.getElementById('live-time');
  if (!liveTimeEl) return;

  function tickClock() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const pkt = new Date(utc + (3600000 * 5));
    const hours = String(pkt.getHours()).padStart(2, '0');
    const mins = String(pkt.getMinutes()).padStart(2, '0');
    const secs = String(pkt.getSeconds()).padStart(2, '0');
    liveTimeEl.textContent = `${hours}:${mins}:${secs} PKT`;
  }

  setInterval(tickClock, 1000);
  tickClock();
}

/* ==========================================================================
   5. CONTACT FORM & LIVE SERIALIZER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('transmission-form');
  if (!form) return;

  let currentEngagement = 'Contract';

  window.selectEngagement = function(btn) {
    document.querySelectorAll('.engagement-pill').forEach(el => {
      el.classList.remove('border-primary', 'text-primary', 'bg-surface-container-high');
      el.classList.add('border-outline-variant/30', 'text-on-surface-variant', 'bg-surface-container-low');
      const dot = el.querySelector('span.rounded-full');
      if (dot) dot.remove();
    });

    btn.classList.add('border-primary', 'text-primary', 'bg-surface-container-high');
    btn.classList.remove('border-outline-variant/30', 'text-on-surface-variant', 'bg-surface-container-low');
    
    const newDot = document.createElement('span');
    newDot.className = 'w-1.5 h-1.5 rounded-full bg-primary';
    btn.prepend(newDot);

    currentEngagement = btn.getAttribute('data-val') || 'Contract';
    window.updateTelemetry();
  };

  window.updateTelemetry = function() {
    const senderVal = document.getElementById('sender-name')?.value.trim() || '';
    const emailVal = document.getElementById('return-channel')?.value.trim() || '';
    const payloadVal = document.getElementById('message-payload')?.value || '';

    const charCounter = document.getElementById('char-counter');
    if (charCounter) charCounter.textContent = `${payloadVal.length} CHARS`;

    const packetWeight = document.getElementById('packet-weight');
    const byteLen = new Blob([senderVal + emailVal + payloadVal + currentEngagement]).size;
    const totalKb = (0.24 + (byteLen / 1024)).toFixed(2);
    if (packetWeight) packetWeight.textContent = `${totalKb} KB`;

    const jsonSender = document.getElementById('json-sender');
    const jsonEmail = document.getElementById('json-email');
    const jsonType = document.getElementById('json-type');
    const jsonLen = document.getElementById('json-len');
    const jsonTime = document.getElementById('json-time');
    const jsonStatus = document.getElementById('json-status');

    if (jsonSender) jsonSender.textContent = senderVal ? `"${senderVal}"` : 'null';
    if (jsonEmail) jsonEmail.textContent = emailVal ? `"${emailVal}"` : 'null';
    if (jsonType) jsonType.textContent = `"${currentEngagement}"`;
    if (jsonLen) jsonLen.textContent = String(payloadVal.length);
    if (jsonTime) jsonTime.textContent = `"${new Date().toISOString()}"`;

    if (jsonStatus) {
      if (senderVal && emailVal && payloadVal.length > 5) {
        jsonStatus.textContent = '"buffered_ready"';
        jsonStatus.className = 'text-primary';
      } else {
        jsonStatus.textContent = '"drafting"';
        jsonStatus.className = 'text-primary-fixed-dim';
      }
    }
  };

  window.dispatchTransmission = function() {
    const submitBtn = document.getElementById('btn-submit');
    const statusCard = document.getElementById('status-card');
    const statusFlag = document.getElementById('form-status-flag');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="material-symbols-outlined text-[16px] animate-spin text-primary">sync</span>
        <span>Broadcasting Packet...</span>
      `;
    }

    if (statusCard) {
      statusCard.innerHTML = `
        <div class="flex items-center gap-2 text-primary">
          <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          <span>TRANSMITTING_ENCRYPTED_STREAM...</span>
        </div>
        <span class="font-code-sm text-code-sm text-primary">PACKET #4928</span>
      `;
    }

    setTimeout(() => {
      if (statusCard) {
        statusCard.innerHTML = `
          <div class="flex items-center gap-2 text-primary font-medium">
            <span class="material-symbols-outlined text-[15px] text-primary">check_circle</span>
            <span>200 OK: ACKNOWLEDGED BY EMAD KHAN NODE</span>
          </div>
          <span class="font-code-sm text-code-sm text-on-surface">RESPONSE < 24H</span>
        `;
      }

      if (statusFlag) statusFlag.textContent = 'DISPATCH_CONFIRMED_200';

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span class="material-symbols-outlined text-[16px] text-primary">done_all</span>
          <span>Sent Successfully</span>
        `;
        submitBtn.classList.add('border-primary', 'bg-surface-container');
      }

      showToast('Transmission Dispatched Successfully!');
    }, 1200);
  };
}

/* ==========================================================================
   6. CLIPBOARD & TOAST HANDLERS
   ========================================================================== */
function showToast(text) {
  let toast = document.getElementById('status-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'status-toast';
    toast.className = 'toast-notification';
    toast.innerHTML = `<span class="material-symbols-outlined text-primary">check_circle</span><span id="toast-message"></span>`;
    document.body.appendChild(toast);
  }

  const toastMsg = document.getElementById('toast-message');
  if (toastMsg) toastMsg.textContent = text;

  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 2500);
}

function initClipboardHandlers() {
  const email = 'emadkhan.dev@gmail.com';

  const copyEmailCard = document.getElementById('copy-email-card');
  if (copyEmailCard) {
    copyEmailCard.addEventListener('click', () => {
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
      }).catch(() => {
        showToast(`Address: ${email}`);
      });
    });
  }

  const copyBtn = document.getElementById('copy-clipboard-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const payload = `Name: Emad Khan\nRole: Frontend Developer\nEmail: ${email}\nLocation: Pakistan (UTC+5)\nStatus: Available for Work`;
      navigator.clipboard.writeText(payload).then(() => {
        showToast('Contact payload copied to clipboard!');
      });
    });
  }
}

/* ==========================================================================
   7. KEYBOARD HOTKEYS & SHORTCUTS
   ========================================================================== */
function initKeyboardHotkeys() {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === '1') {
      e.preventDefault();
      navigateToPath('work');
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      showToast('Quick Switcher: Use sidebar or ⌘1 for Work');
    }
  });
}
