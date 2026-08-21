# Online Mouse & Peripheral Diagnostic Suite

A high-performance, client-side browser benchmarking toolkit for testing mouse hardware performance, scroll wheel integrity, switch chatter, polling rates, and display response.

👉 **Live Web App:** [https://mouse-tester-95w.pages.dev](https://mouse-tester-95w.pages.dev)

---

## 🛠️ Diagnostic Tools Included

### 🖱️ Input & Mouse Diagnostics
- **Mouse Scroll & Double-Click Tester:** Real-time rotary encoder reversal glitch detection, switch chatter/debounce timing, and simultaneous LMB+RMB dual-chord synchronization.
- **CPS Speed Sprint Test:** Measure clicks per second over 5s, 10s, 15s, 30s, 60s, and 100s sprint intervals.
- **Microsecond Polling Rate (Hz) Stream:** Measure physical USB HID report frequency, jitter variance, and interval stability up to 8000Hz.
- **Spacebar Clicker:** Spacebar tapping cadence and actuation speed counter.
- **Full 104-Key & NKRO Matrix Test:** Physical key switch registration, dedicated CSS Grid Numpad, and simultaneous N-Key Rollover (NKRO) ghosting diagnostics.
- **Gamepad / Controller Diagnostic:** Dual-stick analog deadzones, circularity jitter, trigger pressure, and button mapping.

### 🖥️ Display & Media Diagnostics
- **Reaction Time Benchmark:** Millisecond visual reflex tester with latency ratings.
- **Screen Dead Pixel Inspector:** Fullscreen RGBW panel inspector for stuck, dead, or bright sub-pixels.
- **Monitor Motion Blur & Ghosting:** Multi-speed UFO chase benchmark to evaluate display response times and inverse ghosting.
- **Microphone Echo & dBFS Audio Meter:** Web Audio API peak volume visualizer and 5-second local loopback playback.
- **HTML5 Webcam & FPS Inspector:** Real-time camera resolution inspection (1080p, 4K, 720p), delivered FPS telemetry, and snapshot capture.

---

## 🌐 Multilingual (10 Locales Supported)
Fully localized static subdirectories with complete bidirectional `hreflang` routing, translated UI telemetry, troubleshooting guides, and Schema.org `FAQPage` structured data:
- **English (`/`)**
- **Spanish (`/es/`)**
- **German (`/de/`)**
- **French (`/fr/`)**
- **Italian (`/it/`)**
- **Japanese (`/ja/`)**
- **Chinese Simplified (`/zh/`)**
- **Korean (`/ko/`)**
- **Hindi (`/hi/`)**
- **Dutch (`/nl/`)**

---

## 🚀 Built With
- **100% Client-Side Pure Vanilla JavaScript (ES6+)**
- **HTML5 Canvas & Web Audio API**
- **Modern CSS3 (Cyber Glassmorphism Theme & Dark/Light Mode Engine)**
- **Cloudflare Pages Global Edge Deployment**
- **Zero External Tracking & 100% In-Browser Privacy**

---

## 🔒 Privacy & Security
All hardware diagnostic streams run entirely inside client memory. No audio, camera video, or peripheral telemetry data is ever recorded or transmitted over the network.

---

## 📄 License
This project is open-source under the MIT License.
