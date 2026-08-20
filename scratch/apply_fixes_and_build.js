const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'es', 'de', 'fr', 'it', 'ja', 'zh', 'ko', 'hi', 'nl'];

const STOP_CAM_TEXT = {
  en: '⏹️ Stop Camera',
  es: '⏹️ Detener Cámara',
  de: '⏹️ Kamera Stoppen',
  fr: '⏹️ Arrêter la Caméra',
  it: '⏹️ Ferma Fotocamera',
  ja: '⏹️ カメラを停止',
  zh: '⏹️ 停止摄像头',
  ko: '⏹️ 카메라 중지',
  hi: '⏹️ कैमरा रोकें',
  nl: '⏹️ Stop Camera'
};

const STOP_MIC_TEXT = {
  en: '⏹️ Stop Microphone',
  es: '⏹️ Detener Micrófono',
  de: '⏹️ Mikrofon Stoppen',
  fr: '⏹️ Arrêter le Micro',
  it: '⏹️ Ferma Microfono',
  ja: '⏹️ マイクを停止',
  zh: '⏹️ 停止麦克风',
  ko: '⏹️ 마이크 중지',
  hi: '⏹️ माइक रोकें',
  nl: '⏹️ Stop Microfoon'
};

// 1. Update contact.html
const contactPath = 'contact.html';
if (fs.existsSync(contactPath)) {
  let contactHtml = fs.readFileSync(contactPath, 'utf8');
  
  // Replace the contact form submission handler
  const formReplacement = `<form id="contactForm" action="mailto:adarshverma3k10@gmail.com" method="POST" enctype="text/plain">
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

          <div id="contactSentAlert" style="display:none; background:rgba(16,185,129,0.15); border:1px solid var(--accent-emerald); color:#6ee7b7; padding:0.85rem 1rem; border-radius:var(--radius-sm); font-size:0.85rem; margin-bottom:1.25rem;">
            ✓ Thank you! Preparing your message... Our team (adarshverma3k10@gmail.com) responds within 24–48 business hours.
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            Send Message
          </button>
        </form>

        <script>
        document.getElementById('contactForm').addEventListener('submit', function(e) {
          const alertBox = document.getElementById('contactSentAlert');
          if (alertBox) alertBox.style.display = 'block';
          const name = document.getElementById('contactName').value;
          const email = document.getElementById('contactEmail').value;
          const topic = document.getElementById('contactTopic').value;
          const msg = document.getElementById('contactMessage').value;
          
          const mailtoUrl = 'mailto:adarshverma3k10@gmail.com?subject=' + encodeURIComponent('[MouseTester Support] ' + topic + ' from ' + name) + '&body=' + encodeURIComponent('Name: ' + name + '\\nEmail: ' + email + '\\nCategory: ' + topic + '\\n\\nMessage:\\n' + msg);
          
          setTimeout(() => {
            window.location.href = mailtoUrl;
          }, 300);
        });
        </script>`;

  contactHtml = contactHtml.replace(/<form id="contactForm"[\s\S]*?<\/form>/, formReplacement);
  fs.writeFileSync(contactPath, contactHtml, 'utf8');
  console.log('Updated contact.html with mailto and interactive feedback!');
}

// 2. Update keyboard-test.html across all locales
LOCALES.forEach(loc => {
  const filePath = loc === 'en' ? 'keyboard-test.html' : path.join(loc, 'keyboard-test.html');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Inject focus blur and Enter key protection
    const keydownHook = `window.addEventListener('keydown', (e) => {
      if (document.activeElement && document.activeElement !== document.body && document.activeElement.tagName === 'BUTTON') {
        document.activeElement.blur();
      }
      if (['Space', 'Enter', 'NumpadEnter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'F1', 'F3', 'F5', 'F6', 'F7'].includes(e.code)) {
        e.preventDefault();
      }`;

    content = content.replace(/window\.addEventListener\('keydown',\s*\(e\)\s*=>\s*\{[\s\S]*?if\s*\(\['Space'[\s\S]*?\}\s*\}/, keydownHook);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated keyboard-test.html for ${loc}`);
  }
});

// 3. Update webcam-test.html across all locales with Stop button
LOCALES.forEach(loc => {
  const filePath = loc === 'en' ? 'webcam-test.html' : path.join(loc, 'webcam-test.html');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const stopTxt = STOP_CAM_TEXT[loc] || STOP_CAM_TEXT.en;

    // Add Stop button if not present
    if (!content.includes('id="stopCamBtn"')) {
      content = content.replace(
        /<button id="startCamBtn" class="btn btn-cyan">([\s\S]*?)<\/button>/,
        `<button id="startCamBtn" class="btn btn-cyan">$1</button>\n            <button id="stopCamBtn" class="btn btn-danger" style="display:none;">${stopTxt}</button>`
      );
    }

    // Add stopCamera implementation in script
    const stopCamScript = `
    const stopBtn = document.getElementById('stopCamBtn');

    function stopCamera() {
      if (camStream) {
        camStream.getTracks().forEach(track => track.stop());
        camStream = null;
      }
      if (video) {
        video.srcObject = null;
      }
      placeholder.style.display = 'flex';
      hudBadge.style.display = 'none';
      startBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> Enable Camera';
      startBtn.classList.remove('btn-secondary');
      startBtn.classList.add('btn-cyan');
      if (stopBtn) stopBtn.style.display = 'none';
      snapBtn.disabled = true;
      resLabel.textContent = '0 x 0';
      fpsLabel.textContent = '0 FPS';
      statRes.textContent = '--';
      statFps.textContent = '--';
      statAspect.textContent = '--';
    }

    if (stopBtn) stopBtn.addEventListener('click', stopCamera);`;

    if (!content.includes('function stopCamera()')) {
      content = content.replace(
        /startBtn\.addEventListener\('click',\s*initCamera\);/,
        `startBtn.addEventListener('click', initCamera);\n${stopCamScript}`
      );

      // Show stop button on active camera
      content = content.replace(
        /startBtn\.classList\.add\('btn-secondary'\);/,
        `startBtn.classList.add('btn-secondary');\n        if (stopBtn) stopBtn.style.display = 'inline-flex';`
      );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated webcam-test.html for ${loc}`);
  }
});

// 4. Update microphone-test.html across all locales with Stop button
LOCALES.forEach(loc => {
  const filePath = loc === 'en' ? 'microphone-test.html' : path.join(loc, 'microphone-test.html');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const stopTxt = STOP_MIC_TEXT[loc] || STOP_MIC_TEXT.en;

    // Add Stop button if not present
    if (!content.includes('id="stopMicBtn"')) {
      content = content.replace(
        /<button id="startMicBtn" class="btn btn-cyan">([\s\S]*?)<\/button>/,
        `<button id="startMicBtn" class="btn btn-cyan">$1</button>\n            <button id="stopMicBtn" class="btn btn-danger" style="display:none;">${stopTxt}</button>`
      );
    }

    // Add stopMicrophone implementation in script
    const stopMicScript = `
    const stopBtn = document.getElementById('stopMicBtn');

    function stopMicrophone() {
      if (micStream) {
        micStream.getTracks().forEach(track => track.stop());
        micStream = null;
      }
      if (audioCtx) {
        try { audioCtx.close(); } catch(e) {}
        audioCtx = null;
      }
      analyser = null;
      startBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg> Enable Microphone';
      startBtn.classList.remove('btn-secondary');
      startBtn.classList.add('btn-cyan');
      if (stopBtn) stopBtn.style.display = 'none';
      echoBtn.disabled = true;
      meterFill.style.width = '0%';
      dbfsLabel.textContent = '-Infinity dBFS';
      peakVolEl.textContent = '0%';
      sampleRateEl.textContent = '--';
      channelsEl.textContent = '--';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (stopBtn) stopBtn.addEventListener('click', stopMicrophone);`;

    if (!content.includes('function stopMicrophone()')) {
      content = content.replace(
        /const startBtn = document\.getElementById\('startMicBtn'\);/,
        `const startBtn = document.getElementById('startMicBtn');\n${stopMicScript}`
      );

      // Show stop button on active microphone
      content = content.replace(
        /startBtn\.classList\.add\('btn-secondary'\);/,
        `startBtn.classList.add('btn-secondary');\n        if (stopBtn) stopBtn.style.display = 'inline-flex';`
      );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated microphone-test.html for ${loc}`);
  }
});

console.log('--- EXECUTING MASTER REBUILD & AUDIT ---');
require('./master_build.js');
