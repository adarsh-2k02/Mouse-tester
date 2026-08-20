/**
 * MouseTester.io - Multi-Tool Peripheral Testing Engine (v3.5)
 * Universal High-Precision Simultaneous Dual-Click (LMB + RMB Chord) Engine & Switch Chatter Diagnostics
 * Pure Vanilla JavaScript (ES6+) | 0 External Dependencies | 100% Static Ready
 */

(function () {
  'use strict';

  // --- Core State Management ---
  const state = {
    audioEnabled: true,
    
    // Timed Mode Settings
    testMode: 0, // 0 = Free Scroll, 15 = 15s, 30 = 30s, 60 = 60s
    testStatus: 'idle', // 'idle' | 'running' | 'locked'
    timeRemaining: 0,
    timerInterval: null,
    
    // Scroll Metrics
    totalScrolls: 0,
    scrollUpCount: 0,
    scrollDownCount: 0,
    glitchCount: 0,
    lastScrollTime: 0,
    lastDeltaY: 0,
    lastDeltaX: 0,
    accumulatedDeltaY: 0,
    accumulatedDeltaX: 0,
    peakSpeed: 0, // events per sec
    currentSpeed: 0,
    
    // Horizontal & Tilt Tracking
    tiltLeftCount: 0,
    tiltRightCount: 0,

    // Direction & Stroke Polarity Tracking
    currentStrokeDir: 0, // -1: up, 1: down, 0: idle
    strokeEventCount: 0,
    strokeStartTime: 0,
    dominantTicks: 0,
    opposingTicks: 0,
    
    // Button Metrics & Switch Chatter / Debounce
    debounceThreshold: 80, // configurable ms (default: 80ms)
    doubleClickAnomalyCount: 0,
    chatterDetectedCount: 0,
    buttonClicks: {
      left: 0,
      middle: 0,
      right: 0,
      back: 0,
      forward: 0
    },
    buttonDownTimes: {},
    lastButtonDownTime: {},
    lastButtonUpTime: {},
    buttonsDown: new Set(),

    // Simultaneous Dual-Click (LMB + RMB Chord)
    dualClickCount: 0,
    lastDualClickDelta: 0,
    fastestDualClickDelta: 0,

    // Real-time Event Queue for Canvas Graph & Log
    recentDeltas: [], // { time, deltaY, isGlitch, dir }
    eventTimestamps: [],

    // Comprehensive Telemetry Log for CSV Export
    telemetryLog: []
  };

  // State Tracking for Dual Chord Detection
  let lastLmbPressTime = 0;
  let lastRmbPressTime = 0;
  let lastChordTriggerTime = 0;
  let isLmbDown = false;
  let isRmbDown = false;
  let dualChordHighlightTimeout = null;

  // --- DOM Elements ---
  const elements = {
    testStage: document.getElementById('testStage'),
    resetBtn: document.getElementById('resetBtn'),
    exportCsvBtn: document.getElementById('exportCsvBtn'),
    printReportBtn: document.getElementById('printReportBtn'),
    copyReportBtn: document.getElementById('copyReportBtn'),
    soundToggle: document.getElementById('soundToggle'),
    debounceSelect: document.getElementById('debounceThresholdSelect'),
    glitchToast: document.getElementById('glitchToast'),
    directionBadge: document.getElementById('directionBadge'),
    stageLockOverlay: document.getElementById('stageLockOverlay'),
    lockVerdictBadge: document.getElementById('lockVerdictBadge'),
    lockDetailsText: document.getElementById('lockDetailsText'),
    restartTimedBtn: document.getElementById('restartTimedBtn'),
    
    // Timer UI
    timerContainer: document.getElementById('timerContainer'),
    timerText: document.getElementById('timerText'),
    timerProgressBar: document.getElementById('timerProgressBar'),
    timerProgressFill: document.getElementById('timerProgressFill'),
    modeBtns: document.querySelectorAll('.mode-btn'),

    // Tilt Arrows
    tiltLeftIndicator: document.getElementById('tiltLeftIndicator'),
    tiltRightIndicator: document.getElementById('tiltRightIndicator'),
    
    // SVG Parts
    btnLeft: document.getElementById('svgBtnLeft'),
    btnRight: document.getElementById('svgBtnRight'),
    btnMiddle: document.getElementById('svgWheel'),
    btnBack: document.getElementById('svgBtnBack'),
    btnForward: document.getElementById('svgBtnForward'),
    
    // Stat Displays
    statTotalScrolls: document.getElementById('statTotalScrolls'),
    statGlitches: document.getElementById('statGlitches'),
    statGlitchRate: document.getElementById('statGlitchRate'),
    statCurrentSpeed: document.getElementById('statCurrentSpeed'),
    statPeakSpeed: document.getElementById('statPeakSpeed'),
    statLastDelta: document.getElementById('statLastDelta'),
    statAccumulatedY: document.getElementById('statAccumulatedY'),
    statAccumulatedX: document.getElementById('statAccumulatedX'),
    statDeltaMode: document.getElementById('statDeltaMode'),
    statDoubleClicks: document.getElementById('statDoubleClicks'),
    statDualSync: document.getElementById('statDualSync') || document.getElementById('statDualClickDelta'),
    
    // Polarity Bar
    polarityText: document.getElementById('polarityText'),
    polarityFill: document.getElementById('polarityFill'),
    
    // Button Chips
    chipLmb: document.getElementById('chipLmb'),
    chipMmb: document.getElementById('chipMmb'),
    chipRmb: document.getElementById('chipRmb'),
    chipM4: document.getElementById('chipM4'),
    chipM5: document.getElementById('chipM5'),
    chipDualClick: document.getElementById('chipDualClick'),
    chipDualCount: document.getElementById('chipDualCount'),
    chipDualDelta: document.getElementById('chipDualDelta'),
    
    // Log & Verdict
    eventLogList: document.getElementById('eventLogList'),
    healthBanner: document.getElementById('healthBanner'),
    verdictTitle: document.getElementById('verdictTitle'),
    verdictDesc: document.getElementById('verdictDesc'),
    verdictIcon: document.getElementById('verdictIcon'),
    
    // Canvas
    canvas: document.getElementById('scrollWaveCanvas')
  };

  // --- Web Audio API Synthesizer ---
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && typeof (window.AudioContext || window.webkitAudioContext) !== 'undefined') {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.04, volume = 0.15) {
    if (!state.audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playScrollTick(direction) {
    const baseFreq = direction === 'up' ? 580 : 340;
    playTone(baseFreq, 'sine', 0.025, 0.08);
  }

  function playGlitchAlert() {
    playTone(180, 'sawtooth', 0.12, 0.3);
    setTimeout(() => playTone(120, 'sawtooth', 0.15, 0.25), 50);
  }

  function playClickTone(buttonIndex) {
    const freqs = [650, 480, 560, 420, 720];
    const f = freqs[buttonIndex] || 500;
    playTone(f, 'triangle', 0.035, 0.12);
  }

  // --- Timed Benchmark Controller ---
  function setMode(seconds) {
    state.testMode = seconds;
    resetAll(false);

    elements.modeBtns.forEach(btn => {
      const btnSec = parseInt(btn.dataset.seconds, 10);
      btn.classList.toggle('active', btnSec === seconds);
    });

    if (elements.timerText) {
      elements.timerText.textContent = seconds > 0 ? `${seconds.toFixed(1)}s` : 'Free Scroll';
    }
  }

  function startTimedRun() {
    if (state.testMode === 0 || state.testStatus === 'running') return;
    
    state.testStatus = 'running';
    state.timeRemaining = state.testMode;
    
    if (elements.timerContainer) {
      elements.timerContainer.classList.add('timer-running');
    }

    const startTime = performance.now();
    const durationMs = state.testMode * 1000;

    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, (durationMs - elapsed) / 1000);
      state.timeRemaining = remaining;

      if (elements.timerText) {
        elements.timerText.textContent = `${remaining.toFixed(1)}s`;
      }

      if (elements.timerProgressFill) {
        const progressPct = (remaining / state.testMode) * 100;
        elements.timerProgressFill.style.width = `${progressPct}%`;
      }

      if (remaining <= 0) {
        finishTimedRun();
      }
    }, 30);

    addLogEntry('BENCHMARK STARTED', `Timed run initiated (${state.testMode} seconds duration)`, 'normal');
  }

  function finishTimedRun() {
    clearInterval(state.timerInterval);
    state.testStatus = 'locked';
    state.timeRemaining = 0;

    if (elements.timerContainer) {
      elements.timerContainer.classList.remove('timer-running');
    }
    if (elements.timerText) {
      elements.timerText.textContent = '0.0s (Finished)';
    }
    if (elements.timerProgressFill) {
      elements.timerProgressFill.style.width = '0%';
    }

    const isClean = state.glitchCount === 0 && state.doubleClickAnomalyCount === 0;
    const totalEvents = state.totalScrolls + Object.values(state.buttonClicks).reduce((a, b) => a + b, 0);

    if (elements.lockVerdictBadge) {
      elements.lockVerdictBadge.className = `verdict-badge-large ${isClean ? 'clean' : 'glitch'}`;
      elements.lockVerdictBadge.innerHTML = isClean 
        ? '✅ Clean Hardware Signal - 0 Anomalies' 
        : `⚠️ ${state.glitchCount + state.doubleClickAnomalyCount} Hardware Anomaly Ticks Detected`;
    }

    if (elements.lockDetailsText) {
      elements.lockDetailsText.innerHTML = `
        <strong>Total Interactions:</strong> ${totalEvents} (Scrolls: ${state.totalScrolls}, Glitches: ${state.glitchCount}) <br>
        <strong>Double-Click Anomalies:</strong> ${state.doubleClickAnomalyCount} | 
        <strong>Dual-Click Chords:</strong> ${state.dualClickCount} <br>
        <strong>Peak Velocity:</strong> ${state.peakSpeed} evt/s | 
        <strong>Displacement:</strong> ${Math.round(state.accumulatedDeltaY)}px Y, ${Math.round(state.accumulatedDeltaX)}px X
      `;
    }

    if (elements.stageLockOverlay) {
      elements.stageLockOverlay.classList.add('active');
    }

    addLogEntry('RUN COMPLETE', `Timed test finished. Result: ${isClean ? 'PASS' : 'FAIL (Hardware glitch / chatter detected)'}`, isClean ? 'normal' : 'glitch');
    updateVerdict();
  }

  // --- Wheel Animation & Highlight Reset Timer ---
  let wheelTimeout = null;
  let directionBadgeTimeout = null;
  let glitchToastTimeout = null;
  let tiltTimeout = null;

  function triggerWheelVisual(dir, isGlitch = false) {
    if (!elements.btnMiddle) return;
    
    elements.btnMiddle.classList.remove('scroll-up', 'scroll-down', 'scroll-glitch');
    
    if (isGlitch) {
      elements.btnMiddle.classList.add('scroll-glitch');
      elements.testStage.classList.remove('glitch-flash');
      void elements.testStage.offsetWidth;
      elements.testStage.classList.add('glitch-flash');
    } else if (dir === 'up') {
      elements.btnMiddle.classList.add('scroll-up');
    } else if (dir === 'down') {
      elements.btnMiddle.classList.add('scroll-down');
    }

    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      elements.btnMiddle.classList.remove('scroll-up', 'scroll-down', 'scroll-glitch');
    }, 120);
  }

  function triggerTiltVisual(dir) {
    const el = dir === 'left' ? elements.tiltLeftIndicator : elements.tiltRightIndicator;
    if (el) {
      el.classList.add('active');
      clearTimeout(tiltTimeout);
      tiltTimeout = setTimeout(() => {
        if (elements.tiltLeftIndicator) elements.tiltLeftIndicator.classList.remove('active');
        if (elements.tiltRightIndicator) elements.tiltRightIndicator.classList.remove('active');
      }, 150);
    }
  }

  function showDirectionBadge(dir) {
    if (!elements.directionBadge) return;
    elements.directionBadge.className = `direction-badge visible dir-${dir}`;
    elements.directionBadge.textContent = dir === 'up' ? '▲ Scrolling UP' : '▼ Scrolling DOWN';

    clearTimeout(directionBadgeTimeout);
    directionBadgeTimeout = setTimeout(() => {
      elements.directionBadge.classList.remove('visible');
    }, 450);
  }

  function showGlitchToast(msg) {
    if (!elements.glitchToast) return;
    elements.glitchToast.textContent = msg || '⚠️ Reversal Glitch Detected!';
    elements.glitchToast.classList.add('show');
    
    clearTimeout(glitchToastTimeout);
    glitchToastTimeout = setTimeout(() => {
      elements.glitchToast.classList.remove('show');
    }, 1600);
  }

  // --- Glitch Detection & Scroll Processing Engine ---
  function handleWheelEvent(e) {
    e.preventDefault();
    if (state.testStatus === 'locked') return;

    if (state.testMode > 0 && state.testStatus === 'idle') {
      startTimedRun();
    }

    const now = performance.now();
    const rawDeltaY = e.deltaY;
    const rawDeltaX = e.deltaX;
    
    if (rawDeltaY === 0 && rawDeltaX === 0) return;

    // Handle DeltaX (Horizontal Scrolling & Tilt Wheel)
    if (Math.abs(rawDeltaX) > 0) {
      state.accumulatedDeltaX += rawDeltaX;
      state.lastDeltaX = rawDeltaX;
      if (rawDeltaX < 0) {
        state.tiltLeftCount++;
        triggerTiltVisual('left');
      } else {
        state.tiltRightCount++;
        triggerTiltVisual('right');
      }
    }

    if (rawDeltaY === 0) {
      updateUI();
      return;
    }

    state.totalScrolls++;
    const currentDir = rawDeltaY < 0 ? -1 : (rawDeltaY > 0 ? 1 : 0);
    const dirName = currentDir === -1 ? 'up' : (currentDir === 1 ? 'down' : 'horizontal');
    
    if (currentDir === -1) state.scrollUpCount++;
    if (currentDir === 1) state.scrollDownCount++;

    state.lastDeltaY = rawDeltaY;
    state.accumulatedDeltaY += rawDeltaY;

    const modeMap = { 0: 'Pixels (px)', 1: 'Lines', 2: 'Pages' };
    const modeText = modeMap[e.deltaMode] || 'Pixels';

    // Velocity window
    state.eventTimestamps.push(now);
    state.eventTimestamps = state.eventTimestamps.filter(t => now - t <= 1000);
    state.currentSpeed = state.eventTimestamps.length;
    if (state.currentSpeed > state.peakSpeed) {
      state.peakSpeed = state.currentSpeed;
    }

    // Stroke & Reversal Algorithm
    const timeSinceLast = now - state.lastScrollTime;
    let isGlitch = false;

    if (timeSinceLast < 140 && state.strokeEventCount >= 2) {
      if (state.currentStrokeDir !== 0 && currentDir !== 0 && currentDir !== state.currentStrokeDir) {
        isGlitch = true;
        state.glitchCount++;
        state.opposingTicks++;
        playGlitchAlert();
        showGlitchToast(`⚠️ Glitch: Opposite tick (${rawDeltaY > 0 ? '+' : ''}${Math.round(rawDeltaY)}) during ${state.currentStrokeDir === -1 ? 'UP' : 'DOWN'} stroke`);
        addLogEntry('GLITCH REVERSAL', `Opposing delta: ${rawDeltaY > 0 ? '+' : ''}${Math.round(rawDeltaY)}) during ${state.currentStrokeDir === -1 ? 'UP' : 'DOWN'} stroke`, 'glitch');
      } else {
        state.strokeEventCount++;
        state.dominantTicks++;
      }
    } else {
      state.currentStrokeDir = currentDir;
      state.strokeEventCount = 1;
      state.strokeStartTime = now;
      state.dominantTicks++;
    }

    state.lastScrollTime = now;

    // Visual cues
    triggerWheelVisual(dirName, isGlitch);
    showDirectionBadge(dirName);
    if (!isGlitch) {
      playScrollTick(dirName);
    }

    // Append to Telemetry Record for CSV
    state.telemetryLog.push({
      time: new Date().toISOString(),
      type: `WHEEL_${dirName.toUpperCase()}`,
      deltaY: Math.round(rawDeltaY),
      deltaX: Math.round(rawDeltaX),
      polarity: currentDir,
      isGlitch: isGlitch ? 1 : 0,
      speed: state.currentSpeed
    });

    // Canvas Queue
    state.recentDeltas.push({
      time: now,
      deltaY: rawDeltaY,
      isGlitch: isGlitch,
      dir: dirName
    });

    if (state.recentDeltas.length > 160) {
      state.recentDeltas.shift();
    }

    if (!isGlitch && (state.totalScrolls <= 5 || state.totalScrolls % 20 === 0)) {
      addLogEntry('SCROLL', `${dirName.toUpperCase()} deltaY: ${rawDeltaY > 0 ? '+' : ''}${Math.round(rawDeltaY)} | Speed: ${state.currentSpeed} evt/s`, 'normal');
    }

    updateUI(modeText);
  }

  // --- Button Press, Double Click Chatter & Dual-Click Chord Engine ---
  const buttonMap = {
    0: { key: 'left', name: 'LMB (Left)', svg: elements.btnLeft, chip: elements.chipLmb },
    1: { key: 'middle', name: 'MMB (Wheel)', svg: elements.btnMiddle, chip: elements.chipMmb },
    2: { key: 'right', name: 'RMB (Right)', svg: elements.btnRight, chip: elements.chipRmb },
    3: { key: 'back', name: 'M4 (Back)', svg: elements.btnBack, chip: elements.chipM4 },
    4: { key: 'forward', name: 'M5 (Forward)', svg: elements.btnForward, chip: elements.chipM5 }
  };

  function triggerDualChord(delta) {
    const now = performance.now();
    if (now - lastChordTriggerTime < 220) return; // Cooldown to avoid duplicate count
    lastChordTriggerTime = now;

    state.dualClickCount++;
    state.lastDualClickDelta = delta;
    if (state.fastestDualClickDelta === 0 || delta < state.fastestDualClickDelta) {
      state.fastestDualClickDelta = delta;
    }

    addLogEntry('DUAL CHORD', `LMB + RMB synchronized: ${delta.toFixed(1)} ms`, 'normal');
    playTone(880, 'sine', 0.08, 0.2);

    const chipEl = elements.chipDualClick;
    if (chipEl) {
      const countEl = elements.chipDualCount;
      const deltaEl = elements.chipDualDelta;
      if (countEl && deltaEl) {
        countEl.textContent = state.dualClickCount;
        deltaEl.textContent = `${delta.toFixed(1)} ms`;
      }
      chipEl.classList.add('pressed', 'active');
      clearTimeout(dualChordHighlightTimeout);
      dualChordHighlightTimeout = setTimeout(() => {
        if (chipEl) {
          chipEl.classList.remove('pressed', 'active');
        }
      }, 250);
    }

    const dualSyncEl = document.getElementById('statDualSync') || document.getElementById('statDualClickDelta');
    if (dualSyncEl) {
      dualSyncEl.textContent = `${delta.toFixed(1)} ms`;
    }

    state.telemetryLog.push({
      time: new Date().toISOString(),
      type: 'BUTTON_DUAL_CHORD',
      deltaY: 0,
      deltaX: delta,
      polarity: 0,
      isGlitch: 0,
      speed: state.currentSpeed
    });

    updateUI();
  }

  function handlePointerDown(e) {
    const btn = buttonMap[e.button];
    if (!btn) return;
    e.preventDefault();

    if (state.testStatus === 'locked') return;
    if (state.testMode > 0 && state.testStatus === 'idle') {
      startTimedRun();
    }

    const now = performance.now();
    state.buttonClicks[btn.key]++;
    state.buttonDownTimes[btn.key] = now;

    // 1. Double Click / Switch Chatter Detection
    const lastDown = state.lastButtonDownTime[btn.key] || 0;
    const timeSinceLastClick = now - lastDown;
    let isChatter = false;

    if (lastDown > 0 && timeSinceLastClick < state.debounceThreshold) {
      isChatter = true;
      state.doubleClickAnomalyCount++;
      state.chatterDetectedCount++;
      playGlitchAlert();
      showGlitchToast(`⚠️ Double-Click Anomaly: ${btn.name} clicked within ${timeSinceLastClick.toFixed(1)}ms (< ${state.debounceThreshold}ms threshold)`);
      addLogEntry('SWITCH CHATTER', `${btn.name} rapid double click: ${timeSinceLastClick.toFixed(1)}ms (< ${state.debounceThreshold}ms debounce)`, 'glitch');
      
      if (btn.chip) {
        btn.chip.classList.remove('chatter-warning');
        void btn.chip.offsetWidth;
        btn.chip.classList.add('chatter-warning');
      }
    }

    state.lastButtonDownTime[btn.key] = now;

    // 2. High-Precision Dual-Chord Matching (LMB + RMB)
    let isDualChord = false;
    if (e.button === 0) { // LMB
      isLmbDown = true;
      lastLmbPressTime = now;
      if (lastRmbPressTime > 0) {
        const delta = Math.round(Math.abs(lastLmbPressTime - lastRmbPressTime) * 10) / 10;
        if (delta <= 250) {
          triggerDualChord(delta);
          isDualChord = true;
        }
      }
    } else if (e.button === 2) { // RMB
      isRmbDown = true;
      lastRmbPressTime = now;
      if (lastLmbPressTime > 0) {
        const delta = Math.round(Math.abs(lastRmbPressTime - lastLmbPressTime) * 10) / 10;
        if (delta <= 250) {
          triggerDualChord(delta);
          isDualChord = true;
        }
      }
    }

    // Direct hardware bitmask check (e.g. mouse driver sends buttons === 3)
    const buttons = typeof e.buttons === 'number' ? e.buttons : 0;
    if (!isDualChord && ((buttons & 3) === 3 || buttons === 3)) {
      const delta = (lastLmbPressTime > 0 && lastRmbPressTime > 0 && Math.abs(lastLmbPressTime - lastRmbPressTime) <= 250)
        ? Math.round(Math.abs(lastLmbPressTime - lastRmbPressTime) * 10) / 10
        : 1.0;
      triggerDualChord(delta);
    }

    // Telemetry Logging for individual button
    state.telemetryLog.push({
      time: new Date().toISOString(),
      type: `BUTTON_DOWN_${btn.key.toUpperCase()}`,
      deltaY: 0,
      deltaX: 0,
      polarity: 0,
      isGlitch: isChatter ? 1 : 0,
      speed: state.currentSpeed
    });

    if (btn.svg) {
      if (btn.key === 'middle') {
        btn.svg.classList.add('btn-active');
      } else {
        btn.svg.classList.add('active');
      }
    }
    if (btn.chip) {
      btn.chip.classList.add('pressed');
      const countEl = btn.chip.querySelector('.chip-count');
      if (countEl) countEl.textContent = state.buttonClicks[btn.key];
    }

    if (!isChatter) {
      playClickTone(e.button);
      addLogEntry('BUTTON DOWN', `${btn.name} pressed`, 'normal');
    }

    updateUI();
  }

  // Release Lifecycle Handler to guarantee zero stuck buttons
  function handleReleaseState(e) {
    const buttons = typeof e.buttons === 'number' ? e.buttons : 0;

    // LMB release
    if ((buttons & 1) === 0) {
      isLmbDown = false;
      if (elements.btnLeft) elements.btnLeft.classList.remove('active');
      if (elements.chipLmb) elements.chipLmb.classList.remove('pressed');
    }

    // RMB release
    if ((buttons & 2) === 0) {
      isRmbDown = false;
      if (elements.btnRight) elements.btnRight.classList.remove('active');
      if (elements.chipRmb) elements.chipRmb.classList.remove('pressed');
    }

    // MMB release
    if ((buttons & 4) === 0) {
      if (elements.btnMiddle) elements.btnMiddle.classList.remove('btn-active');
      if (elements.chipMmb) elements.chipMmb.classList.remove('pressed');
    }

    // M4 Back release
    if ((buttons & 8) === 0) {
      if (elements.btnBack) elements.btnBack.classList.remove('active');
      if (elements.chipM4) elements.chipM4.classList.remove('pressed');
    }

    // M5 Forward release
    if ((buttons & 16) === 0) {
      if (elements.btnForward) elements.btnForward.classList.remove('active');
      if (elements.chipM5) elements.chipM5.classList.remove('pressed');
    }

    if (buttons === 0) {
      isLmbDown = false;
      isRmbDown = false;
      state.buttonsDown.clear();
      document.querySelectorAll('.mouse-btn.active').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.mouse-wheel.btn-active').forEach(el => el.classList.remove('btn-active'));
      document.querySelectorAll('.button-chip.pressed:not(#chipDualClick)').forEach(el => el.classList.remove('pressed'));
    }
  }

  function handlePointerUp(e) {
    const btn = buttonMap[e.button];
    if (btn) {
      state.lastButtonUpTime[btn.key] = performance.now();
    }
    handleReleaseState(e);
  }

  // --- Real-time Log Helper ---
  function addLogEntry(type, message, category = 'normal') {
    if (!elements.eventLogList) return;
    
    const timeStr = new Date().toTimeString().split(' ')[0] + '.' + String(Math.floor(performance.now() % 1000)).padStart(3, '0');
    const row = document.createElement('div');
    row.className = `log-row ${category}`;
    row.innerHTML = `<span>[${timeStr}] <strong>${type}</strong></span><span>${message}</span>`;

    elements.eventLogList.insertBefore(row, elements.eventLogList.firstChild);

    while (elements.eventLogList.children.length > 60) {
      elements.eventLogList.removeChild(elements.eventLogList.lastChild);
    }
  }

  // --- Update Dashboard Statistics ---
  function updateUI(modeText = 'Pixels') {
    if (elements.statTotalScrolls) elements.statTotalScrolls.textContent = state.totalScrolls.toLocaleString();
    if (elements.statGlitches) elements.statGlitches.textContent = state.glitchCount;
    
    const rate = state.totalScrolls > 0 ? ((state.glitchCount / state.totalScrolls) * 100).toFixed(1) : '0.0';
    if (elements.statGlitchRate) elements.statGlitchRate.textContent = `${rate}%`;
    
    if (elements.statCurrentSpeed) elements.statCurrentSpeed.textContent = state.currentSpeed;
    if (elements.statPeakSpeed) elements.statPeakSpeed.textContent = state.peakSpeed;
    
    if (elements.statDoubleClicks) {
      elements.statDoubleClicks.textContent = state.doubleClickAnomalyCount;
    }
    
    const dualSyncEl = document.getElementById('statDualSync') || document.getElementById('statDualClickDelta');
    if (dualSyncEl) {
      dualSyncEl.textContent = state.lastDualClickDelta > 0 ? `${state.lastDualClickDelta.toFixed(1)} ms` : '--';
    }

    if (elements.chipDualCount) {
      elements.chipDualCount.textContent = state.dualClickCount;
    }
    if (elements.chipDualDelta) {
      elements.chipDualDelta.textContent = state.lastDualClickDelta > 0 ? `${state.lastDualClickDelta.toFixed(1)} ms` : '-- ms';
    }

    if (elements.statLastDelta) {
      const sign = state.lastDeltaY > 0 ? '+' : '';
      elements.statLastDelta.textContent = `${sign}${Math.round(state.lastDeltaY)}`;
    }
    if (elements.statAccumulatedY) {
      elements.statAccumulatedY.textContent = `${Math.round(state.accumulatedDeltaY)}px`;
    }
    if (elements.statAccumulatedX) {
      elements.statAccumulatedX.textContent = `${Math.round(state.accumulatedDeltaX)}px`;
    }
    if (elements.statDeltaMode) {
      elements.statDeltaMode.textContent = modeText;
    }

    // Polarity Ratio
    const totalTicks = state.dominantTicks + state.opposingTicks;
    if (totalTicks > 0 && elements.polarityText && elements.polarityFill) {
      const dominantPercent = ((state.dominantTicks / totalTicks) * 100).toFixed(1);
      const opposingPercent = ((state.opposingTicks / totalTicks) * 100).toFixed(1);
      elements.polarityText.textContent = `${dominantPercent}% Dominant / ${opposingPercent}% Opposing`;
      elements.polarityFill.style.width = `${dominantPercent}%`;
    }

    updateVerdict();
  }

  // --- Health Diagnostic Verdict ---
  function updateVerdict() {
    if (!elements.healthBanner || !elements.verdictTitle || !elements.verdictDesc || !elements.verdictIcon) return;

    if (state.totalScrolls < 15 && Object.values(state.buttonClicks).reduce((a, b) => a + b, 0) < 5) {
      elements.healthBanner.className = 'health-verdict-banner';
      elements.verdictIcon.textContent = '✨';
      elements.verdictTitle.textContent = 'Ready for Diagnostic Testing';
      elements.verdictDesc.textContent = 'Scroll your wheel continuously up and down inside the test stage and click buttons to check for rotary encoder bounce and switch chatter double clicks.';
      return;
    }

    const glitchRate = state.totalScrolls > 0 ? (state.glitchCount / state.totalScrolls) * 100 : 0;

    if (state.glitchCount > 0 || state.doubleClickAnomalyCount > 0) {
      elements.healthBanner.className = 'health-verdict-banner warning';
      elements.verdictIcon.textContent = '⚠️';
      
      let issues = [];
      if (state.glitchCount > 0) {
        issues.push(`${state.glitchCount} scroll reversal jump${state.glitchCount > 1 ? 's' : ''} (${glitchRate.toFixed(1)}% error rate)`);
      }
      if (state.doubleClickAnomalyCount > 0) {
        issues.push(`${state.doubleClickAnomalyCount} switch chatter double-click${state.doubleClickAnomalyCount > 1 ? 's' : ''} (< ${state.debounceThreshold}ms debounce)`);
      }

      elements.verdictTitle.textContent = 'Hardware Irregularities Detected';
      elements.verdictDesc.textContent = `Anomaly detected: ${issues.join(' and ')}. Review the troubleshooting guide below to clean your rotary encoder or adjust microswitch debounce.`;
    } else {
      elements.healthBanner.className = 'health-verdict-banner';
      elements.verdictIcon.textContent = '✅';
      elements.verdictTitle.textContent = 'Hardware Signal Healthy';
      elements.verdictDesc.textContent = `All ${state.totalScrolls} scroll ticks and button actuations registered cleanly with 0.0% glitch anomalies (Debounce: ${state.debounceThreshold}ms).`;
    }
  }

  // --- Canvas Delta Waveform Visualizer ---
  function initCanvas() {
    const canvas = elements.canvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function renderWaveform() {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.font = '10px monospace';
      ctx.fillText('+UP', 8, 14);
      ctx.fillText('0', 8, centerY - 4);
      ctx.fillText('-DOWN', 8, height - 6);

      const deltas = state.recentDeltas;
      if (deltas.length === 0) {
        requestAnimationFrame(renderWaveform);
        return;
      }

      const maxPoints = 80;
      const slice = deltas.slice(-maxPoints);
      const step = width / (maxPoints - 1);
      const startX = width - (slice.length - 1) * step;

      slice.forEach((item, index) => {
        const x = startX + index * step;
        const normalized = Math.max(-1, Math.min(1, item.deltaY / 120));
        const barHeight = -normalized * (centerY - 16);
        const y = centerY + barHeight;

        ctx.beginPath();
        ctx.lineWidth = 2.5;
        if (item.isGlitch) {
          ctx.strokeStyle = '#f43f5e';
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 8;
        } else if (item.dir === 'up') {
          ctx.strokeStyle = '#38bdf8';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 4;
        } else {
          ctx.strokeStyle = '#a78bfa';
          ctx.shadowColor = '#a78bfa';
          ctx.shadowBlur = 4;
        }

        ctx.moveTo(x, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, item.isGlitch ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = item.isGlitch ? '#fda4af' : (item.dir === 'up' ? '#7dd3fc' : '#c4b5fd');
        ctx.fill();

        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(renderWaveform);
    }

    requestAnimationFrame(renderWaveform);
  }

  // --- Reset All Test Metrics ---
  function resetAll(clearLogs = true) {
    clearInterval(state.timerInterval);
    state.testStatus = 'idle';
    state.totalScrolls = 0;
    state.scrollUpCount = 0;
    state.scrollDownCount = 0;
    state.glitchCount = 0;
    state.lastScrollTime = 0;
    state.lastDeltaY = 0;
    state.lastDeltaX = 0;
    state.accumulatedDeltaY = 0;
    state.accumulatedDeltaX = 0;
    state.tiltLeftCount = 0;
    state.tiltRightCount = 0;
    state.peakSpeed = 0;
    state.currentSpeed = 0;
    state.currentStrokeDir = 0;
    state.strokeEventCount = 0;
    state.dominantTicks = 0;
    state.opposingTicks = 0;
    state.doubleClickAnomalyCount = 0;
    state.chatterDetectedCount = 0;
    
    // Dual Chord State Reset
    isLmbDown = false;
    isRmbDown = false;
    lastLmbPressTime = 0;
    lastRmbPressTime = 0;
    lastChordTriggerTime = 0;
    state.dualClickCount = 0;
    state.lastDualClickDelta = 0;
    state.fastestDualClickDelta = 0;
    state.buttonsDown.clear();
    state.lastButtonDownTime = {};
    state.lastButtonUpTime = {};
    state.recentDeltas = [];
    state.eventTimestamps = [];
    state.telemetryLog = [];

    Object.keys(state.buttonClicks).forEach(k => {
      state.buttonClicks[k] = 0;
    });

    ['chipLmb', 'chipMmb', 'chipRmb', 'chipM4', 'chipM5'].forEach(id => {
      const chip = document.getElementById(id);
      if (chip) {
        chip.classList.remove('pressed', 'chatter-warning');
        const c = chip.querySelector('.chip-count');
        if (c) c.textContent = '0';
      }
    });

    if (elements.chipDualClick) {
      elements.chipDualClick.classList.remove('pressed', 'active');
    }
    if (elements.chipDualCount) {
      elements.chipDualCount.textContent = '0';
    }
    if (elements.chipDualDelta) {
      elements.chipDualDelta.textContent = '-- ms';
    }
    const dualSyncEl = document.getElementById('statDualSync') || document.getElementById('statDualClickDelta');
    if (dualSyncEl) {
      dualSyncEl.textContent = '--';
    }

    if (elements.stageLockOverlay) {
      elements.stageLockOverlay.classList.remove('active');
    }
    if (elements.timerContainer) {
      elements.timerContainer.classList.remove('timer-running');
    }
    if (elements.timerText) {
      elements.timerText.textContent = state.testMode > 0 ? `${state.testMode.toFixed(1)}s` : 'Free Scroll';
    }
    if (elements.timerProgressFill) {
      elements.timerProgressFill.style.width = '100%';
    }
    if (elements.polarityText) {
      elements.polarityText.textContent = '100% Dominant / 0% Opposing';
    }
    if (elements.polarityFill) {
      elements.polarityFill.style.width = '100%';
    }

    if (clearLogs && elements.eventLogList) {
      elements.eventLogList.innerHTML = '';
      addLogEntry('TEST RESET', 'Session cleared. Ready for fresh test run.', 'normal');
    }
    updateUI('Pixels');
  }

  // --- Dynamic CSV Export Generator ---
  function exportCSV() {
    if (state.telemetryLog.length === 0) {
      alert('No telemetry data collected yet. Scroll the wheel or click buttons first!');
      return;
    }

    const headers = ['Timestamp', 'EventType', 'DeltaY', 'DeltaX_or_ChordMs', 'Polarity', 'GlitchFlag', 'SpeedEvtPerSec'];
    const rows = state.telemetryLog.map(e => [
      e.time,
      e.type,
      e.deltaY,
      e.deltaX,
      e.polarity,
      e.isGlitch,
      e.speed
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `mousetester-telemetry-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // --- Clean Print & PDF Report Generator ---
  function printReport() {
    window.print();
  }

  // --- Clipboard Summary Copy ---
  function copyReport() {
    const rate = state.totalScrolls > 0 ? ((state.glitchCount / state.totalScrolls) * 100).toFixed(2) : '0.00';
    const dominantPct = (state.dominantTicks + state.opposingTicks) > 0 
      ? ((state.dominantTicks / (state.dominantTicks + state.opposingTicks)) * 100).toFixed(1) 
      : '100.0';

    const report = `=== MOUSETESTER.IO HARDWARE TELEMETRY REPORT ===
Generated: ${new Date().toLocaleString()}
User Agent: ${navigator.userAgent}
Test Mode:  ${state.testMode > 0 ? `${state.testMode}s Sprint Mode` : 'Continuous Free Scroll'}

--- SCROLL WHEEL & TILT METRICS ---
Total Scroll Events:  ${state.totalScrolls}
Scroll Up Ticks:      ${state.scrollUpCount}
Scroll Down Ticks:    ${state.scrollDownCount}
Reversal Glitches:    ${state.glitchCount}
Glitch Anomaly Rate:  ${rate}%
Polarity Stability:   ${dominantPct}% Dominant
Vertical Displacement: ${Math.round(state.accumulatedDeltaY)} px
Horizontal Tilt Disp: ${Math.round(state.accumulatedDeltaX)} px
Peak Scroll Velocity: ${state.peakSpeed} events/sec

--- BUTTON CLICKS & SWITCH CHATTER ---
Left Click (LMB):     ${state.buttonClicks.left}
Middle Click (MMB):   ${state.buttonClicks.middle}
Right Click (RMB):    ${state.buttonClicks.right}
Side Button 4 (Back): ${state.buttonClicks.back}
Side Button 5 (Fwd):  ${state.buttonClicks.forward}
Double-Click Anomalies: ${state.doubleClickAnomalyCount} (< ${state.debounceThreshold}ms debounce)
Dual-Click Chords:    ${state.dualClickCount} (Latest Delta: ${state.lastDualClickDelta.toFixed(1)}ms, Best: ${state.fastestDualClickDelta.toFixed(1)}ms)

--- OVERALL HARDWARE DIAGNOSIS ---
${state.glitchCount > 0 ? 'FAIL: Mouse scroll encoder exhibits reversal bounce jumps.' : 'PASS: Scroll encoder signal is consistent and stable.'}
${state.doubleClickAnomalyCount > 0 ? `FAIL: Microswitch contact chatter detected (${state.doubleClickAnomalyCount} rapid double clicks).` : 'PASS: Microswitch debounce is clean and stable.'}
================================================`;

    navigator.clipboard.writeText(report).then(() => {
      alert('Diagnostic telemetry report copied to clipboard!');
    }).catch(() => {
      prompt('Copy your diagnostic report:', report);
    });
  }

  // --- FAQ Accordion Logic ---
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const q = item.querySelector('.faq-question');
      if (!q) return;
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  // --- Initialization & Event Listeners ---
  function init() {
    const stage = elements.testStage || document.getElementById('testStage') || document.getElementById('testArea');
    if (!stage) return;

    stage.addEventListener('wheel', handleWheelEvent, { passive: false });
    stage.addEventListener('pointerdown', handlePointerDown);
    stage.addEventListener('mousedown', handlePointerDown);
    stage.addEventListener('pointerup', handlePointerUp);
    stage.addEventListener('mouseup', handlePointerUp);
    stage.addEventListener('pointercancel', handlePointerUp);
    stage.addEventListener('mouseleave', handlePointerUp);
    stage.addEventListener('contextmenu', e => e.preventDefault());
    stage.addEventListener('auxclick', e => e.preventDefault());

    // Window global listeners to ensure buttons never stay stuck if released outside the stage
    window.addEventListener('pointerup', handleReleaseState);
    window.addEventListener('mouseup', handleReleaseState);
    window.addEventListener('pointercancel', handleReleaseState);
    window.addEventListener('contextmenu', e => {
      if (stage.contains(e.target)) e.preventDefault();
    });

    // Debounce Threshold Select
    if (elements.debounceSelect) {
      elements.debounceSelect.addEventListener('change', (e) => {
        state.debounceThreshold = parseInt(e.target.value, 10) || 80;
        addLogEntry('DEBOUNCE UPDATED', `Debounce chatter threshold set to ${state.debounceThreshold}ms`, 'normal');
        updateVerdict();
      });
    }

    // Mode Buttons
    elements.modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const sec = parseInt(btn.dataset.seconds, 10);
        setMode(sec);
      });
    });

    if (elements.restartTimedBtn) {
      elements.restartTimedBtn.addEventListener('click', () => {
        resetAll(false);
      });
    }

    if (elements.resetBtn) {
      elements.resetBtn.addEventListener('click', () => resetAll(true));
    }

    if (elements.exportCsvBtn) {
      elements.exportCsvBtn.addEventListener('click', exportCSV);
    }

    if (elements.printReportBtn) {
      elements.printReportBtn.addEventListener('click', printReport);
    }

    if (elements.copyReportBtn) {
      elements.copyReportBtn.addEventListener('click', copyReport);
    }

    if (elements.soundToggle) {
      elements.soundToggle.addEventListener('change', (e) => {
        state.audioEnabled = e.target.checked;
        if (state.audioEnabled) initAudio();
      });
    }

    initCanvas();
    initFAQ();
    updateUI('Pixels');
    addLogEntry('SYSTEM READY', 'Peripheral suite active. Move cursor into test stage to begin.', 'normal');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
