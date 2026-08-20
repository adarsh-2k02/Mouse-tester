const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'es', 'de', 'fr', 'it', 'ja', 'zh', 'ko', 'hi', 'nl'];

// 1. Update contact.html with Web3Forms + Graceful Direct Mail Fallback
const contactPath = 'contact.html';
if (fs.existsSync(contactPath)) {
  let contactHtml = fs.readFileSync(contactPath, 'utf8');

  const formSection = `<form id="contactForm" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="0e1a3fa2-4752-4fe6-a979-3b608882005e">
          <input type="hidden" name="subject" value="New MouseTester.io Support Submission">
          <input type="hidden" name="from_name" value="MouseTester.io Support Desk">

          <div class="cyber-form-group">
            <label for="contactName">Your Name</label>
            <input type="text" id="contactName" name="name" placeholder="e.g. Alex" required>
          </div>

          <div class="cyber-form-group">
            <label for="contactEmail">Email Address</label>
            <input type="email" id="contactEmail" name="email" placeholder="e.g. alex@example.com" required>
          </div>

          <div class="cyber-form-group">
            <label for="contactTopic">Inquiry Category</label>
            <select id="contactTopic" name="category">
              <option value="General Inquiry">General Inquiry &amp; Feedback</option>
              <option value="Hardware Bug">Hardware Diagnostic Bug Report</option>
              <option value="Feature Request">New Benchmark Tool Request</option>
              <option value="Partnership">Partnership / Hardware Review</option>
              <option value="Privacy Question">Privacy &amp; Terms Question</option>
            </select>
          </div>

          <div class="cyber-form-group">
            <label for="contactMessage">Message</label>
            <textarea id="contactMessage" name="message" rows="4" placeholder="Describe your inquiry, device specs, or testing feedback in detail..." required></textarea>
          </div>

          <!-- Success Alert -->
          <div id="contactSentAlert" style="display:none; background:rgba(16,185,129,0.15); border:1px solid var(--accent-emerald); color:#6ee7b7; padding:0.85rem 1rem; border-radius:var(--radius-sm); font-size:0.85rem; margin-bottom:1.25rem;">
            ✓ Thank you! Your message has been sent successfully. Our support team (adarshverma3k10@gmail.com) will review your request shortly.
          </div>

          <!-- Graceful Direct Mail Fallback Alert -->
          <div id="contactFallbackAlert" style="display:none; background:rgba(244,63,94,0.15); border:1px solid var(--accent-rose); color:#fca5a5; padding:0.85rem 1rem; border-radius:var(--radius-sm); font-size:0.85rem; margin-bottom:1.25rem;">
            <span>⚠️ Instant delivery is currently offline or unconfigured.</span>
            <div style="margin-top:0.5rem;">
              <a id="fallbackMailtoBtn" href="mailto:adarshverma3k10@gmail.com" class="btn btn-secondary" style="font-size:0.8rem; padding:0.4rem 0.8rem; text-decoration:none; display:inline-flex;">
                ✉️ Email us directly at adarshverma3k10@gmail.com
              </a>
            </div>
          </div>

          <button type="submit" id="contactSubmitBtn" class="btn btn-primary" style="width:100%;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            <span id="submitBtnText">Send Message</span>
          </button>
        </form>

        <script>
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
          e.preventDefault();
          const form = this;
          const submitBtn = document.getElementById('contactSubmitBtn');
          const submitText = document.getElementById('submitBtnText');
          const successAlert = document.getElementById('contactSentAlert');
          const fallbackAlert = document.getElementById('contactFallbackAlert');
          const fallbackBtn = document.getElementById('fallbackMailtoBtn');

          if (successAlert) successAlert.style.display = 'none';
          if (fallbackAlert) fallbackAlert.style.display = 'none';

          if (submitBtn) {
            submitBtn.disabled = true;
            if (submitText) submitText.textContent = 'Sending Message...';
          }

          const formData = new FormData(form);

          try {
            const response = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
              if (successAlert) successAlert.style.display = 'block';
              form.reset();
            } else {
              throw new Error(data.message || 'Submission failed');
            }
          } catch (err) {
            const name = form.querySelector('[name="name"]')?.value || '';
            const email = form.querySelector('[name="email"]')?.value || '';
            const topic = form.querySelector('[name="category"]')?.value || 'Support';
            const msg = form.querySelector('[name="message"]')?.value || '';

            const mailto = 'mailto:adarshverma3k10@gmail.com?subject=' + encodeURIComponent('[MouseTester Support] ' + topic + ' from ' + name) + '&body=' + encodeURIComponent('Name: ' + name + '\\nEmail: ' + email + '\\nCategory: ' + topic + '\\n\\nMessage:\\n' + msg);
            
            if (fallbackBtn) fallbackBtn.href = mailto;
            if (fallbackAlert) fallbackAlert.style.display = 'block';
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              if (submitText) submitText.textContent = 'Send Message';
            }
          }
        });
        </script>`;

  contactHtml = contactHtml.replace(/<form id="contactForm"[\s\S]*?<\/script>/, formSection);
  fs.writeFileSync(contactPath, contactHtml, 'utf8');
  console.log('Updated contact.html with Web3Forms zero-backend delivery + fallback!');
}

// 2. Restore complete, pristine keyboard testing engine across all 10 locales
const cleanKeyboardScript = `  <!-- 104-Key Visual Matrix & NKRO Engine -->
  <script>
  (function() {
    const activeKeys = new Set();
    const visitedKeys = new Set();
    let maxRollover = 0;
    const keyDownTimes = {};

    const statActive = document.getElementById('statActiveKeys');
    const statMax = document.getElementById('statMaxRollover');
    const statTested = document.getElementById('statTestedKeys');
    const activeKeyPills = document.getElementById('activeKeyPills');
    const resetBtn = document.getElementById('kbResetBtn');
    const logList = document.getElementById('kbLogList');

    const totalKeyElements = document.querySelectorAll('.kb-key').length;

    // Web Audio API for subtle, high-speed keypress click sound
    let audioCtx = null;
    function playKeyClick() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.03);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
      } catch (e) {}
    }

    function updateActivePills() {
      if (!activeKeyPills) return;
      if (activeKeys.size === 0) {
        activeKeyPills.innerHTML = '<span style="font-size:0.8rem; color:var(--text-subtle);">(None - Press keys to see live multi-key rollover)</span>';
        return;
      }
      activeKeyPills.innerHTML = Array.from(activeKeys)
        .map(code => '<span class="active-key-pill">' + code + '</span>')
        .join('');
    }

    function addLog(code, name, duration) {
      if (!logList) return;
      const row = document.createElement('div');
      row.className = 'log-row normal';
      const timeStr = new Date().toTimeString().split(' ')[0] + '.' + String(Math.floor(performance.now() % 1000)).padStart(3, '0');
      const extra = (duration !== undefined && duration !== null) ? ' | Held: ' + duration.toFixed(0) + 'ms' : '';
      row.innerHTML = '<span>[' + timeStr + '] <strong>' + code + '</strong></span><span>Key: "' + name + '"' + extra + '</span>';
      logList.insertBefore(row, logList.firstChild);
      while (logList.children.length > 50) logList.removeChild(logList.lastChild);
    }

    window.addEventListener('keydown', (e) => {
      // Prevent browser hijack for common gaming/typing benchmark keys
      if (['Space', 'Tab', 'F1', 'F3', 'F5', 'F7'].includes(e.code)) {
        e.preventDefault();
      }

      const code = e.code;
      if (!code) return;

      if (!keyDownTimes[code]) {
        keyDownTimes[code] = performance.now();
        playKeyClick();
        addLog(code, e.key);
      }

      activeKeys.add(code);
      visitedKeys.add(code);

      if (activeKeys.size > maxRollover) {
        maxRollover = activeKeys.size;
      }

      if (statActive) statActive.textContent = activeKeys.size;
      if (statMax) statMax.textContent = maxRollover;
      if (statTested) statTested.textContent = visitedKeys.size + ' / ' + totalKeyElements;
      updateActivePills();

      const keyEl = document.querySelector('.kb-key[data-code="' + code + '"]');
      if (keyEl) {
        keyEl.classList.add('pressed', 'visited');
      }
    });

    window.addEventListener('keyup', (e) => {
      const code = e.code;
      if (!code) return;

      activeKeys.delete(code);
      if (statActive) statActive.textContent = activeKeys.size;
      updateActivePills();

      if (keyDownTimes[code]) {
        const dur = performance.now() - keyDownTimes[code];
        delete keyDownTimes[code];
      }

      const keyEl = document.querySelector('.kb-key[data-code="' + code + '"]');
      if (keyEl) {
        keyEl.classList.remove('pressed');
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeKeys.clear();
        visitedKeys.clear();
        maxRollover = 0;
        if (statActive) statActive.textContent = '0';
        if (statMax) statMax.textContent = '0';
        if (statTested) statTested.textContent = '0 / ' + totalKeyElements;
        updateActivePills();
        document.querySelectorAll('.kb-key').forEach(el => el.classList.remove('pressed', 'visited'));
        if (logList) logList.innerHTML = '';
        resetBtn.blur();
      });
    }

    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-question');
      if (q) {
        q.addEventListener('click', () => {
          item.classList.toggle('open');
        });
      }
    });
  })();
  </script>`;

LOCALES.forEach(loc => {
  const filePath = loc === 'en' ? 'keyboard-test.html' : path.join(loc, 'keyboard-test.html');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the entire bottom script tag
    content = content.replace(/<script>[\s\S]*?\(function\(\)\s*\{[\s\S]*?statActiveKeys[\s\S]*?<\/script>/, cleanKeyboardScript);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Pristine keyboard engine deployed for ${loc}`);
  }
});

console.log('--- RE-RUNNING MASTER BUILD & AUDIT ---');
require('./master_build.js');
