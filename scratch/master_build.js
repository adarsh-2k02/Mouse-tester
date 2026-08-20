const fs = require('fs');
const path = require('path');

// Clean up extraneous build scripts in root if any
const legacyScripts = [
  'build_all.js',
  'extract_from_transcript.js',
  'generate_entire_suite.js',
  'gen_suite.js',
  'init_dirs.js'
];

legacyScripts.forEach(script => {
  if (fs.existsSync(script)) {
    fs.unlinkSync(script);
    console.log(`Removed legacy file: ${script}`);
  }
});

console.log('--- 1. BUILDING 11-TOOL POLLING RATE PAGES ACROSS 10 LOCALES ---');

const LOCALES_DATA = {
  en: {
    lang: 'en',
    dir: '',
    title: 'Mouse Polling Rate Test (Hz Checker) - Real-Time USB Frequency & Jitter',
    desc: 'Test your mouse polling rate (125Hz, 500Hz, 1000Hz, 4000Hz, 8000Hz) in real time with unthrottled sub-millisecond coalesced event tracking.',
    keywords: 'mouse polling rate test, mouse hz test, usb polling rate checker, 1000hz mouse test, 8000hz mouse test, mouse hz meter, polling rate jitter',
    pill: 'High-Precision Microsecond USB Frequency Tracker (Coalesced Event Engine)',
    h1: 'Mouse Polling Rate (Hz) Test',
    subtitle: 'Move your mouse rapidly in circles within the sweep area below. Uses unthrottled hardware PointerEvents (bypassing monitor 60Hz/144Hz vsync limits) to measure real USB frequency, peak report rate, and packet jitter.',
    modeFree: 'Continuous Mode',
    mode5s: '5s Benchmark',
    mode10s: '10s Benchmark',
    mode15s: '15s Endurance',
    timerRemaining: 'Remaining:',
    timerLive: 'Live Stream',
    resetBtn: 'Reset',
    sampleLabel: 'Sample Packets:',
    topLabel: 'CONTINUOUS MOVEMENT AREA',
    bottomLabel: 'HIGH-RESOLUTION POINTEREVENT STREAM (UNTHROTTLED)',
    defaultPill: 'Move Mouse Rapidly in Circles to Detect Tier',
    statAvgLabel: 'Average Polling',
    statAvgBadge: 'Stable',
    statPeakLabel: 'Peak Frequency',
    statPeakBadge: 'Max',
    statIntervalLabel: 'Packet Interval',
    statIntervalBadge: 'Timing',
    statJitterLabel: 'Jitter Deviation',
    statJitterBadge: '± σ',
    statTargetLabel: 'Target Interval',
    statTargetBadge: 'USB Spec',
    statStabilityLabel: 'Signal Stability',
    statStabilityBadge: 'Score',
    chartTitle: 'Live Polling Rate Frequency Stream',
    superb: 'Superb',
    good: 'Good',
    moderate: 'Moderate',
    verdictComplete: '🏆 Test Complete: ',
    verdictClean: 'Clean USB Signal',
    verdictJitter: 'Jitter: ±',
    placeholderWave: 'Live USB packet frequency waveform will render on mouse movement',
    c8000: '🚀 8000 Hz Class (Hyper-Polling Ultra)',
    c4000: '⚡ 4000 Hz Class (Hyper-Polling Pro)',
    c2000: '⚡ 2000 Hz Class (Pro Gaming Grade)',
    c1000: '🎮 1000 Hz Class (Esports Gaming Standard)',
    c500: '💼 500 Hz Class (Casual Gaming)',
    c250: '🔋 250 Hz Class (Eco Wireless)',
    c125: '🔋 125 Hz Class (Standard Office / Bluetooth Mouse)',
    guideTitle: 'Understanding Mouse Polling Rate & Hardware Tiers',
    guideP1: 'Your mouse polling rate (measured in Hz) dictates how many times per second your hardware sends cursor position reports to your computer. A higher polling rate delivers lower latency and smoother tracking.',
    guideT1: '125 Hz (8.0ms Interval)',
    guideD1: 'Standard for 95% of office mice, Bluetooth mice, and laptop trackpads. Factory-configured to 125Hz to maximize battery life. Practical readings typically fluctuate between 120Hz and 140Hz due to USB bus scheduling.',
    guideT2: '500 Hz (2.0ms Interval)',
    guideD2: 'Common baseline for casual gaming mice, offering a 4x reduction in input lag compared to standard office mice.',
    guideT3: '1000 Hz (1.0ms Interval)',
    guideD3: 'The gold standard for competitive esports (Logitech G, Razer, Zowie, Glorious). Transmits updates every single millisecond.',
    guideT4: '4000 Hz - 8000 Hz (0.25ms - 0.125ms)',
    guideD4: 'Hyper-polling gaming mice for high-refresh-rate (240Hz, 360Hz, 540Hz) monitors.'
  },
  es: {
    lang: 'es',
    dir: 'es',
    title: 'Test de Polling Rate del Ratón (Hz Checker) - Frecuencia USB y Jitter',
    desc: 'Prueba el polling rate de tu ratón (125Hz a 8000Hz) en tiempo real con captura de eventos agrupados de hardware sin limitación de monitor.',
    keywords: 'polling rate test raton, test hz raton, medir hz raton, probar 1000hz raton, test 8000hz, estabilidad usb raton',
    pill: 'Rastreador de Frecuencia USB de Microsegundos (Motor de Eventos de Hardware)',
    h1: 'Test de Polling Rate (Hz) del Ratón',
    subtitle: 'Mueve el ratón rápidamente en círculos en el área de prueba. Utiliza eventos de hardware sin limitación de vsync (60Hz/144Hz) para medir la frecuencia USB real, tasa pico y jitter.',
    modeFree: 'Modo Continuo',
    mode5s: '5s Benchmark',
    mode10s: '10s Benchmark',
    mode15s: '15s Resistencia',
    timerRemaining: 'Restante:',
    timerLive: 'Flujo en Vivo',
    resetBtn: 'Restablecer',
    sampleLabel: 'Paquetes de muestra:',
    topLabel: 'ÁREA DE MOVIMIENTO CONTINUO',
    bottomLabel: 'FLUJO DE EVENTOS DE ALTA RESOLUCIÓN (SIN LIMITACIÓN)',
    defaultPill: 'Mueve el ratón en círculos para detectar nivel',
    statAvgLabel: 'Polling Promedio',
    statAvgBadge: 'Estable',
    statPeakLabel: 'Frecuencia Pico',
    statPeakBadge: 'Máx',
    statIntervalLabel: 'Intervalo Paquetes',
    statIntervalBadge: 'Tiempo',
    statJitterLabel: 'Desviación Jitter',
    statJitterBadge: '± σ',
    statTargetLabel: 'Intervalo Objetivo',
    statTargetBadge: 'Espec. USB',
    statStabilityLabel: 'Estabilidad Señal',
    statStabilityBadge: 'Puntuación',
    chartTitle: 'Flujo de Frecuencia de Polling en Tiempo Real',
    superb: 'Excelente',
    good: 'Bueno',
    moderate: 'Moderado',
    verdictComplete: '🏆 Test Completado: ',
    verdictClean: 'Señal USB Limpia',
    verdictJitter: 'Jitter: ±',
    placeholderWave: 'La onda de frecuencia USB se mostrará al mover el ratón',
    c8000: '🚀 Clase 8000 Hz (Ultra Hyper-Polling)',
    c4000: '⚡ Clase 4000 Hz (Hyper-Polling Pro)',
    c2000: '⚡ Clase 2000 Hz (Gaming Profesional)',
    c1000: '🎮 Clase 1000 Hz (Estándar Gaming Esports)',
    c500: '💼 Clase 500 Hz (Gaming Casual)',
    c250: '🔋 Clase 250 Hz (Inalámbrico Eco)',
    c125: '🔋 Clase 125 Hz (Ratón Estándar de Oficina / Bluetooth)',
    guideTitle: 'Comprendiendo los Niveles de Polling Rate',
    guideP1: 'El polling rate de tu ratón (en Hz) indica cuántas veces por segundo el hardware envía la posición a tu ordenador.',
    guideT1: '125 Hz (Intervalo 8.0ms)',
    guideD1: 'Estándar para el 95% de los ratones de oficina, Bluetooth y trackpads. Diseñado para ahorrar batería.',
    guideT2: '500 Hz (Intervalo 2.0ms)',
    guideD2: 'Base común para ratones gaming casuales.',
    guideT3: '1000 Hz (Intervalo 1.0ms)',
    guideD3: 'El estándar de oro para esports competitivos (Logitech G, Razer, Zowie).',
    guideT4: '4000 Hz - 8000 Hz (0.25ms - 0.125ms)',
    guideD4: 'Ratones de hiper-sondeo para monitores de 240Hz, 360Hz y 540Hz.'
  },
  de: {
    lang: 'de',
    dir: 'de',
    title: 'Maus Polling Rate Test (Hz Checker) - USB-Abtastrate & Jitter',
    desc: 'Messen Sie die USB-Polling-Rate (125Hz bis 8000Hz) in Echtzeit mit nativer Coalesced-Event-Erfassung ohne 60Hz/144Hz VSync-Limit.',
    keywords: 'maus polling rate test, maus hz testen, usb abtastrate checker, 1000hz maus test, 8000hz maus test, maus jitter messung',
    pill: 'Mikrosekunden-USB-Frequenz-Tracker (Coalesced-Hardware-Events)',
    h1: 'Maus Polling Rate (Hz) Test',
    subtitle: 'Bewegen Sie Ihre Maus schnell im Kreis im Messbereich. Nutzt ungedrosselte Hardware-PointerEvents (ohne 60Hz/144Hz Monitor-Limit) zur genauen Erfassung von USB-Frequenz, Spitzen-Hz und Jitter.',
    modeFree: 'Endlos-Modus',
    mode5s: '5s Benchmark',
    mode10s: '10s Benchmark',
    mode15s: '15s Ausdauer',
    timerRemaining: 'Verbleibend:',
    timerLive: 'Live-Stream',
    resetBtn: 'Zurücksetzen',
    sampleLabel: 'Gemessene Pakete:',
    topLabel: 'KONTINUIERLICHER BEWEGUNGSBEREICH',
    bottomLabel: 'HOCHAUFLÖSENDER EVENT-STREAM (UNGEDROSSELT)',
    defaultPill: 'Maus schnell im Kreis bewegen',
    statAvgLabel: 'Durchschnittliche Polling-Rate',
    statAvgBadge: 'Stabil',
    statPeakLabel: 'Spitzenfrequenz',
    statPeakBadge: 'Max',
    statIntervalLabel: 'Paket-Intervall',
    statIntervalBadge: 'Timing',
    statJitterLabel: 'Jitter-Abweichung',
    statJitterBadge: '± σ',
    statTargetLabel: 'Soll-Intervall',
    statTargetBadge: 'USB-Spez.',
    statStabilityLabel: 'Signalstabilität',
    statStabilityBadge: 'Bewertung',
    chartTitle: 'Echtzeit-Polling-Frequenzkurve',
    superb: 'Hervorragend',
    good: 'Gut',
    moderate: 'Mäßig',
    verdictComplete: '🏆 Test abgeschlossen: ',
    verdictClean: 'Sauberes USB-Signal',
    verdictJitter: 'Jitter: ±',
    placeholderWave: 'Die USB-Frequenzkurve wird bei Mausbewegung angezeigt',
    c8000: '🚀 8000 Hz Klasse (Hyper-Polling Ultra)',
    c4000: '⚡ 4000 Hz Klasse (Hyper-Polling Pro)',
    c2000: '⚡ 2000 Hz Klasse (Pro Gaming)',
    c1000: '🎮 1000 Hz Klasse (Esports Gaming Standard)',
    c500: '💼 500 Hz Klasse (Casual Gaming)',
    c250: '🔋 250 Hz Klasse (Eco Wireless)',
    c125: '🔋 125 Hz Klasse (Standard-Büromaus / Bluetooth)',
    guideTitle: 'Verständnis der Maus-Polling-Rate & Hardware-Klassen',
    guideP1: 'Die Polling-Rate Ihrer Maus (in Hz) gibt an, wie oft pro Sekunde Positionsdaten an den PC gesendet werden.',
    guideT1: '125 Hz (8,0 ms Intervall)',
    guideD1: 'Standard für 95 % aller Büromäuse, Bluetooth-Mäuse und Trackpads zur Maximierung der Batterielaufzeit.',
    guideT2: '500 Hz (2,0 ms Intervall)',
    guideD2: 'Standard für Gelegenheits-Gaming-Mäuse mit 4x geringerem Input-Lag.',
    guideT3: '1000 Hz (1,0 ms Intervall)',
    guideD3: 'Der Goldstandard für kompetitives Esports-Gaming (Logitech G, Razer, Zowie).',
    guideT4: '4000 Hz - 8000 Hz (0,25 ms - 0,125 ms)',
    guideD4: 'Hyper-Polling-Mäuse für Monitore mit 240Hz, 360Hz und 540Hz.'
  },
  fr: {
    lang: 'fr',
    dir: 'fr',
    title: "Test de Taux d'Échantillonnage Souris (Hz) - Fréquence USB & Jitter",
    desc: "Mesurez le taux de rapport USB (125Hz à 8000Hz) en temps réel avec extraction d'événements matériels non bridés par l'écran.",
    keywords: 'test taux echantillonnage souris, test hz souris, polling rate souris, test souris 1000hz, test souris 8000hz, gigue usb souris',
    pill: "Traqueur de Fréquence USB Haute Précision (Moteur d'Événements Matériels)",
    h1: "Test de Taux d'Échantillonnage (Hz)",
    subtitle: "Déplacez rapidement votre souris en cercles dans la zone de test. Utilise des événements de pointeur non bridés par le taux de rafraîchissement de l'écran (60Hz/144Hz) pour une mesure USB exacte.",
    modeFree: 'Mode Continu',
    mode5s: 'Benchmark 5s',
    mode10s: 'Benchmark 10s',
    mode15s: 'Endurance 15s',
    timerRemaining: 'Restant :',
    timerLive: 'Flux en Direct',
    resetBtn: 'Réinitialiser',
    sampleLabel: 'Paquets échantillonnés :',
    topLabel: 'ZONE DE MOUVEMENT CONTINU',
    bottomLabel: "FLUX D'ÉVÉNEMENTS HAUTE RÉSOLUTION (SANS BRIDAGE)",
    defaultPill: 'Déplacez la souris en cercles pour détecter le niveau',
    statAvgLabel: 'Taux Moyen',
    statAvgBadge: 'Stable',
    statPeakLabel: 'Fréquence Maximale',
    statPeakBadge: 'Max',
    statIntervalLabel: 'Intervalle Paquets',
    statIntervalBadge: 'Chrono',
    statJitterLabel: 'Déviation Jitter',
    statJitterBadge: '± σ',
    statTargetLabel: 'Intervalle Cible',
    statTargetBadge: 'Norme USB',
    statStabilityLabel: 'Stabilité Signal',
    statStabilityBadge: 'Score',
    chartTitle: 'Flux de Fréquence de Taux en Direct',
    superb: 'Superbe',
    good: 'Bon',
    moderate: 'Moyen',
    verdictComplete: '🏆 Test Terminé : ',
    verdictClean: 'Signal USB Stable',
    verdictJitter: 'Jitter : ±',
    placeholderWave: "La forme d'onde USB en direct s'affichera lors du mouvement",
    c8000: '🚀 Classe 8000 Hz (Hyper-Polling Ultra)',
    c4000: '⚡ Classe 4000 Hz (Hyper-Polling Pro)',
    c2000: '⚡ Classe 2000 Hz (Gaming Pro)',
    c1000: '🎮 Classe 1000 Hz (Standard Esports)',
    c500: '💼 Classe 500 Hz (Gaming Occasionnel)',
    c250: '🔋 Classe 250 Hz (Sans fil Éco)',
    c125: '🔋 Classe 125 Hz (Souris Bureautique Standard / Bluetooth)',
    guideTitle: 'Comprendre les Niveaux de Taux de Rapport (Hz)',
    guideP1: 'Le taux de rapport de votre souris indique le nombre de paquets de position envoyés par seconde.',
    guideT1: '125 Hz (Intervalle 8.0ms)',
    guideD1: 'Standard pour 95% des souris de bureau et Bluetooth afin d\'économiser la batterie.',
    guideT2: '500 Hz (Intervalle 2.0ms)',
    guideD2: 'Base courante pour les souris de jeu grand public.',
    guideT3: '1000 Hz (Intervalle 1.0ms)',
    guideD3: 'Le standard compétitif pour l\'esport (Logitech G, Razer, Zowie).',
    guideT4: '4000 Hz - 8000 Hz (0.25ms - 0.125ms)',
    guideD4: 'Souris hyper-polling pour écrans 240Hz, 360Hz et 540Hz.'
  },
  it: {
    lang: 'it',
    dir: 'it',
    title: 'Test Polling Rate Mouse (Hz Checker) - Frequenza USB & Jitter',
    desc: 'Misura il polling rate USB (125Hz fino a 8000Hz) del mouse con acquisizione hardware ad alta frequenza senza limitazione dello schermo.',
    keywords: 'test polling rate mouse, test hz mouse, frequenza usb mouse, test mouse 1000hz, test 8000hz mouse, jitter usb',
    pill: 'Tracciatore di Frequenza USB ad Alta Precisione (Eventi Hardware Coalesced)',
    h1: 'Test Polling Rate Mouse (Hz)',
    subtitle: "Muovi rapidamente il mouse in cerchio nell'area di test. Utilizza eventi hardware non limitati dal vsync (60Hz/144Hz) per misurare la frequenza USB reale, picco e jitter.",
    modeFree: 'Modalità Continua',
    mode5s: 'Benchmark 5s',
    mode10s: 'Benchmark 10s',
    mode15s: 'Resistenza 15s',
    timerRemaining: 'Rimanente:',
    timerLive: 'Flusso Live',
    resetBtn: 'Reimposta',
    sampleLabel: 'Pacchetti campionati:',
    topLabel: 'AREA DI MOVIMENTO CONTINUO',
    bottomLabel: 'FLUSSO DI EVENTI AD ALTA RISOLUZIONE (NON LIMITATO)',
    defaultPill: 'Muovi il mouse in cerchio per rilevare il livello',
    statAvgLabel: 'Polling Medio',
    statAvgBadge: 'Stabile',
    statPeakLabel: 'Frequenza di Picco',
    statPeakBadge: 'Max',
    statIntervalLabel: 'Intervallo Pacchetti',
    statIntervalBadge: 'Timing',
    statJitterLabel: 'Deviazione Jitter',
    statJitterBadge: '± σ',
    statTargetLabel: 'Intervallo Obiettivo',
    statTargetBadge: 'Spec. USB',
    statStabilityLabel: 'Stabilità Segnale',
    statStabilityBadge: 'Punteggio',
    chartTitle: 'Flusso Frequenza Polling Rate in Tempo Reale',
    superb: 'Eccellente',
    good: 'Buono',
    moderate: 'Moderato',
    verdictComplete: '🏆 Test Completato: ',
    verdictClean: 'Segnale USB Pulito',
    verdictJitter: 'Jitter: ±',
    placeholderWave: "La forma d'onda della frequenza USB verrà mostrata al movimento",
    c8000: '🚀 Classe 8000 Hz (Hyper-Polling Ultra)',
    c4000: '⚡ Classe 4000 Hz (Hyper-Polling Pro)',
    c2000: '⚡ Classe 2000 Hz (Gaming Professionale)',
    c1000: '🎮 Classe 1000 Hz (Standard Gaming Esports)',
    c500: '💼 Classe 500 Hz (Gaming Casual)',
    c250: '🔋 Classe 250 Hz (Wireless Eco)',
    c125: '🔋 Classe 125 Hz (Mouse Ufficio Standard / Bluetooth)',
    guideTitle: 'Comprendere le Classi di Polling Rate del Mouse',
    guideP1: 'Il polling rate del mouse (in Hz) indica quanti report al secondo vengono inviati al computer.',
    guideT1: '125 Hz (Intervallo 8.0ms)',
    guideD1: 'Predefinito per il 95% dei mouse da ufficio e Bluetooth per massimizzare la batteria.',
    guideT2: '500 Hz (Intervallo 2.0ms)',
    guideD2: 'Base comune per mouse da gaming casual.',
    guideT3: '1000 Hz (Intervallo 1.0ms)',
    guideD3: 'Lo standard di riferimento per gli esports (Logitech G, Razer, Zowie).',
    guideT4: '4000 Hz - 8000 Hz (0.25ms - 0.125ms)',
    guideD4: 'Mouse hyper-polling per display da 240Hz, 360Hz e 540Hz.'
  },
  ja: {
    lang: 'ja',
    dir: 'ja',
    title: 'マウスポーリングレートテスト (Hzチェッカー) - USB更新頻度＆ジッター測定',
    desc: 'ゲーミングマウスのUSBポーリングレート（125Hz〜8000Hz）をリアルタイム測定。ディスプレイのリフレッシュレート上限を回避する合体イベント解析エンジン搭載。',
    keywords: 'マウスポーリングレート テスト, マウス hz テスト, usb レポートレート 測定, 1000hz マウス テスト, 8000hz マウス, ジッター 測定',
    pill: 'マイクロ秒精度 高精度USBポーリングレート測定器 (Coalesced Event エンジン)',
    h1: 'マウスポーリングレート (Hz) テスト',
    subtitle: '下の計測エリア内でマウスを素早く動かしてください。モニターの60Hz/144Hz制限をバイパスする未統合ハードウェアイベント解析により、真のUSB通信周波数を測定します。',
    modeFree: '連続測定モード',
    mode5s: '5秒 ベンチマーク',
    mode10s: '10秒 ベンチマーク',
    mode15s: '15秒 耐久テスト',
    timerRemaining: '残り時間:',
    timerLive: 'リアルタイム計測中',
    resetBtn: 'リセット',
    sampleLabel: 'サンプルパケット数:',
    topLabel: 'マウス連続移動エリア',
    bottomLabel: '高解像度ポインターイベントストリーム (無制限・高精度)',
    defaultPill: '円を描くように素早く動かして検出',
    statAvgLabel: '平均ポーリングレート',
    statAvgBadge: '安定',
    statPeakLabel: '最大ピーク周波数',
    statPeakBadge: '最大',
    statIntervalLabel: 'パケット転送間隔',
    statIntervalBadge: '間隔',
    statJitterLabel: 'ジッター標準偏差',
    statJitterBadge: '± σ',
    statTargetLabel: 'USB規格理論値',
    statTargetBadge: 'USB仕様',
    statStabilityLabel: '信号安定度',
    statStabilityBadge: 'スコア',
    chartTitle: 'リアルタイムポーリングレート周波数波形',
    superb: '極めて優秀',
    good: '良好',
    moderate: '普通',
    verdictComplete: '🏆 測定完了: ',
    verdictClean: '安定したUSBシグナル',
    verdictJitter: 'ジッター: ±',
    placeholderWave: 'マウスを動かすとリアルタイム周波数波形が描画されます',
    c8000: '🚀 8000 Hz クラス (超高ポーリング / Ultra)',
    c4000: '⚡ 4000 Hz クラス (Pro ハイパーポーリング)',
    c2000: '⚡ 2000 Hz クラス (プロゲーミング)',
    c1000: '🎮 1000 Hz クラス (競技eスポーツ標準)',
    c500: '💼 500 Hz クラス (一般ゲーミング)',
    c250: '🔋 250 Hz クラス (省電力ワイヤレス)',
    c125: '🔋 125 Hz クラス (一般的なオフィス / Bluetoothマウス)',
    guideTitle: 'マウスポーリングレートの規格とクラスについて',
    guideP1: 'ポーリングレート（Hz）は、マウスが1秒間にPCへ位置データを送信する頻度です。',
    guideT1: '125 Hz (間隔 8.0ms)',
    guideD1: '一般的なオフィス用マウス、Bluetoothマウス、トラックパッドの標準値です。バッテリーを節約するため125Hzに固定されています。実測では120Hz〜140Hz程度を示します。',
    guideT2: '500 Hz (間隔 2.0ms)',
    guideD2: 'カジュアルゲーミングマウスの標準値。',
    guideT3: '1000 Hz (間隔 1.0ms)',
    guideD3: 'Logicool G、Razer、Zowie等の競技用ゲーミングマウスの世界標準。',
    guideT4: '4000 Hz - 8000 Hz (0.25ms - 0.125ms)',
    guideD4: '240Hz〜540Hz高リフレッシュレートモニター向けの超高速マウス。'
  },
  zh: {
    lang: 'zh',
    dir: 'zh',
    title: '鼠标回报率测试 (Hz测试) - 实时USB轮询率与抖动分析',
    desc: '实时测量电竞鼠标 USB 回报率 (125Hz 至 8000Hz)。采用原生合并事件引擎，突破显示器 60Hz/144Hz 刷新率限制。',
    keywords: '鼠标回报率测试, 鼠标hz测试, usb轮询率测试, 1000hz鼠标测试, 8000hz鼠标测试, 鼠标抖动测试, polling rate',
    pill: '微秒级高精度 USB 报告率分析引擎 (突破屏幕刷新率限制)',
    h1: '鼠标回报率 (Polling Rate) 测试',
    subtitle: '在下方测试区域内快速连续晃动鼠标。引擎自动提取底层硬件 Coalesced Events，不受屏幕 60Hz/144Hz 垂直同步限制，精准呈现真实 USB 回报率。',
    modeFree: '连续测试模式',
    mode5s: '5秒 标准基准',
    mode10s: '10秒 稳定测试',
    mode15s: '15秒 极限耐力',
    timerRemaining: '剩余时间:',
    timerLive: '实时数据流',
    resetBtn: '重置数据',
    sampleLabel: '采样数据包:',
    topLabel: '鼠标连续移动测试区域',
    bottomLabel: '高精度 POINTEREVENT 硬件事件流 (无帧率锁死)',
    defaultPill: '快速连续画圈晃动鼠标以检测档位',
    statAvgLabel: '平均回报率',
    statAvgBadge: '稳定',
    statPeakLabel: '峰值报告率',
    statPeakBadge: '最高',
    statIntervalLabel: '数据包间隔',
    statIntervalBadge: '延迟',
    statJitterLabel: 'Jitter 抖动方差',
    statJitterBadge: '± σ',
    statTargetLabel: 'USB 理论间隔',
    statTargetBadge: '协议标准',
    statStabilityLabel: '信号稳定性',
    statStabilityBadge: '评级',
    chartTitle: '实时回报率频率波动曲线',
    superb: '极佳',
    good: '良好',
    moderate: '一般',
    verdictComplete: '🏆 测试完成: ',
    verdictClean: '纯净稳定 USB 信号',
    verdictJitter: '抖动: ±',
    placeholderWave: '移动鼠标以实时呈现 USB 数据包频率波动波形',
    c8000: '🚀 8000 Hz 档位 (极限超高回报率)',
    c4000: '⚡ 4000 Hz 档位 (专业电竞超频)',
    c2000: '⚡ 2000 Hz 档位 (职业电竞级别)',
    c1000: '🎮 1000 Hz 档位 (电竞游戏黄金标准)',
    c500: '💼 500 Hz 档位 (主流游戏外设)',
    c250: '🔋 250 Hz 档位 (节能无线模式)',
    c125: '🔋 125 Hz 档位 (标准办公/蓝牙/普通鼠标)',
    guideTitle: '鼠标回报率 (Polling Rate) 硬件分级解析',
    guideP1: '鼠标回报率（以 Hz 衡量）代表鼠标硬件每秒向电脑主板发送光标位移数据的次数。',
    guideT1: '125 Hz (8.0ms 间隔)',
    guideD1: '市面上 95% 的普通办公鼠标、蓝牙鼠标和笔记本触控板的标准硬件配置。为节省电池固定为 125Hz。实测在 120Hz~140Hz 属于完全正常的硬件物理表现。',
    guideT2: '500 Hz (2.0ms 间隔)',
    guideD2: '入门级游戏鼠标的常见标准，延迟比办公鼠标降低 4 倍。',
    guideT3: '1000 Hz (1.0ms 间隔)',
    guideD3: '职业电竞鼠标（罗技 G、雷蛇、卓威 Zowie）的黄金行业标准。',
    guideT4: '4000 Hz - 8000 Hz (0.25ms - 0.125ms)',
    guideD4: '适配 240Hz、360Hz 及 540Hz 极高刷新率显示器的顶级电竞外设。'
  },
  ko: {
    lang: 'ko',
    dir: 'ko',
    title: '마우스 폴링레이트 테스트 (Hz 측정기) - 실시간 USB 주파수 & 지터 분석',
    desc: '게이밍 마우스의 USB 폴링레이트(125Hz ~ 8000Hz)를 실시간 측정합니다. 모니터 주사율 한계를 우회하는 하드웨어 이벤트 엔진 탑재.',
    keywords: '마우스 폴링레이트 테스트, 마우스 hz 테스트, usb 폴링레이트 측정, 1000hz 마우스 테스트, 8000hz 마우스, 마우스 지터',
    pill: '초정밀 USB 주파수 트래커 (모니터 60Hz 한계 우회 엔진)',
    h1: '마우스 폴링레이트 (Hz) 테스트',
    subtitle: '아래 영역에서 마우스를 빠르게 회전시키세요. 모니터의 60Hz/144Hz 수직동기화 제한을 우회하여 순수 USB 하드웨어 패킷을 실시간 추출합니다.',
    modeFree: '연속 측정 모드',
    mode5s: '5초 벤치마크',
    mode10s: '10초 벤치마크',
    mode15s: '15초 지구력',
    timerRemaining: '남은 시간:',
    timerLive: '실시간 스트림',
    resetBtn: '초기화',
    sampleLabel: '샘플 패킷 수:',
    topLabel: '마우스 연속 이동 측정 영역',
    bottomLabel: '고정밀 POINTEREVENT 실시간 데이터 스트림 (비제한)',
    defaultPill: '원을 그리며 빠르게 움직여 등급 감지',
    statAvgLabel: '평균 폴링레이트',
    statAvgBadge: '안정적',
    statPeakLabel: '최고 주파수',
    statPeakBadge: '최대',
    statIntervalLabel: '패킷 전송 간격',
    statIntervalBadge: '주기',
    statJitterLabel: '지터 표준편차',
    statJitterBadge: '± σ',
    statTargetLabel: 'USB 규격 이론값',
    statTargetBadge: 'USB 규격',
    statStabilityLabel: '신호 안정성',
    statStabilityBadge: '점수',
    chartTitle: '실시간 폴링레이트 주파수 파형',
    superb: '최상',
    good: '양호',
    moderate: '보통',
    verdictComplete: '🏆 측정 완료: ',
    verdictClean: '안정적인 USB 신호',
    verdictJitter: '지터: ±',
    placeholderWave: '마우스를 움직이면 실시간 주파수 파형이 표시됩니다',
    c8000: '🚀 8000 Hz 등급 (하이퍼 폴링 울트라)',
    c4000: '⚡ 4000 Hz 등급 (하이퍼 폴링 프로)',
    c2000: '⚡ 2000 Hz 등급 (프로 게이밍)',
    c1000: '🎮 1000 Hz 등급 (e스포츠 게이밍 표준)',
    c500: '💼 500 Hz 등급 (캐주얼 게이밍)',
    c250: '🔋 250 Hz 등급 (절전 무선)',
    c125: '🔋 125 Hz 등급 (일반 사무용 / 블루투스 마우스)',
    guideTitle: '마우스 폴링레이트 하드웨어 등급 안내',
    guideP1: '마우스 폴링레이트(Hz)는 마우스가 1초 동안 PC로 위치 보고를 전송하는 횟수입니다.',
    guideT1: '125 Hz (8.0ms 간격)',
    guideD1: '일반 사무용 마우스, 블루투스 마우스, 노트북 트랙패드의 95%가 사용하는 기본 하드웨어 규격입니다.',
    guideT2: '500 Hz (2.0ms 간격)',
    guideD2: '일반 게이밍 마우스의 기본 규격입니다.',
    guideT3: '1000 Hz (1.0ms 간격)',
    guideD3: '로지텍 G, 레이저, 조위 등 프로 게이밍 마우스의 글로벌 표준입니다.',
    guideT4: '4000 Hz - 8000 Hz (0.25ms - 0.125ms)',
    guideD4: '240Hz, 360Hz, 540Hz 고주사율 모니터를 위한 하이퍼 폴링 마우스입니다.'
  },
  hi: {
    lang: 'hi',
    dir: 'hi',
    title: 'माउस पोलिंग रेट टेस्ट (Hz Checker) - रीयल-टाइम USB फ़्रीक्वेंसी और जिटर',
    desc: 'अपने गेमिंग माउस की USB पोलिंग दर (125Hz से 8000Hz) रीयल-टाइम में मापें। मॉनिटर 60Hz सीमा को बाईपास करने वाला हार्डवेयर इवेंट इंजन।',
    keywords: 'माउस पोलिंग रेट टेस्ट, माउस hz टेस्ट, usb polling rate hindi, 1000hz माउस टेस्ट, 8000hz माउस, माउस जिटर टेस्ट',
    pill: 'माइक्रोसेकंड USB पोलिंग रेट इंजन (मॉनिटर रिफ्रेश रेट बाईपास)',
    h1: 'माउस पोलिंग रेट (Hz) टेस्ट',
    subtitle: 'नीचे दिए गए क्षेत्र में माउस को तेज़ी से घुमाएँ। यह मॉनिटर की 60Hz/144Hz सीमा को बायपास करके सीधे USB हार्डवेयर पैकेट्स से सटीक पोलिंग दर और जिटर मापता है।',
    modeFree: 'अनवरत मोड',
    mode5s: '5s बेंचमार्क',
    mode10s: '10s बेंचमार्क',
    mode15s: '15s धीरज टेस्ट',
    timerRemaining: 'शेष समय:',
    timerLive: 'लाइव स्ट्रीम',
    resetBtn: 'रीसेट',
    sampleLabel: 'सैंपल पैकेट्स:',
    topLabel: 'माउस मूवमेंट क्षेत्र',
    bottomLabel: 'हाई-रेज़ोल्यूशन पॉइंटर स्ट्रीम (अनथ्रोटल्ड)',
    defaultPill: 'क्लास जांचने के लिए माउस को तेज़ी से घुमाएँ',
    statAvgLabel: 'औसत पोलिंग दर',
    statAvgBadge: 'स्थिर',
    statPeakLabel: 'पीक फ़्रीक्वेंसी',
    statPeakBadge: 'उच्चतम',
    statIntervalLabel: 'पैकेट अंतराल',
    statIntervalBadge: 'टाइमिंग',
    statJitterLabel: 'जिटर विचलन',
    statJitterBadge: '± σ',
    statTargetLabel: 'लक्षित अंतराल',
    statTargetBadge: 'USB मानक',
    statStabilityLabel: 'सिग्नल स्थिरता',
    statStabilityBadge: 'स्कोर',
    chartTitle: 'लाइव पोलिंग रेट फ़्रीक्वेंसी स्ट्रीम',
    superb: 'शानदार',
    good: 'अच्छा',
    moderate: 'मध्यम',
    verdictComplete: '🏆 टेस्ट पूरा हुआ: ',
    verdictClean: 'सटीक USB सिग्नल',
    verdictJitter: 'जिटर: ±',
    placeholderWave: 'माउस घुमाने पर रीयल-टाइम USB फ़्रीक्वेंसी वेवफ़ॉर्म दिखेगा',
    c8000: '🚀 8000 Hz क्लास (हाइपर-पोलिंग अल्ट्रा)',
    c4000: '⚡ 4000 Hz क्लास (हाइपर-पोलिंग प्रो)',
    c2000: '⚡ 2000 Hz क्लास (प्रो गेमिंग)',
    c1000: '🎮 1000 Hz क्लास (ई-स्पोर्ट्स गेमिंग मानक)',
    c500: '💼 500 Hz क्लास (कैजुअल गेमिंग)',
    c250: '🔋 250 Hz क्लास (इको वायरलेस)',
    c125: '🔋 125 Hz क्लास (सामान्य ऑफिस / ब्लूटूथ माउस)',
    guideTitle: 'माउस पोलिंग रेट और हार्डवेयर टियर्स को समझें',
    guideP1: 'माउस पोलिंग दर (Hz में) यह बताती है कि आपका माउस प्रति सेकंड कंप्यूटर को कितनी बार कर्सर डेटा भेजता है।',
    guideT1: '125 Hz (8.0ms अंतराल)',
    guideD1: '95% सामान्य ऑफिस, ब्लूटूथ और लैपटॉप ट्रैकपैड का मानक। बैटरी बचाने के लिए 125Hz तय होता है (120Hz-140Hz आना स्वाभाविक है)।',
    guideT2: '500 Hz (2.0ms अंतराल)',
    guideD2: 'कैजुअल गेमिंग माउस का मानक।',
    guideT3: '1000 Hz (1.0ms अंतराल)',
    guideD3: 'ई-स्पोर्ट्स गेमिंग माउस (Logitech G, Razer, Zowie) का विश्व मानक।',
    guideT4: '4000 Hz - 8000 Hz (0.25ms - 0.125ms)',
    guideD4: '240Hz, 360Hz और 540Hz हाई-रिफ्रेश मॉनिटर्स के लिए हाइपर-पोलिंग माउस।'
  },
  nl: {
    lang: 'nl',
    dir: 'nl',
    title: 'Muis Polling Rate Test (Hz Checker) - USB Frequentie & Jitter',
    desc: 'Meet de USB-polling rate (125Hz tot 8000Hz) van uw muis in realtime zonder monitor 60Hz/144Hz vsync-beperking.',
    keywords: 'muis polling rate test, muis hz testen, usb polling rate checker, 1000hz muis test, 8000hz muis test, muis jitter meten',
    pill: 'Microseconde USB-Frequentietracker (Hardware Coalesced Event Engine)',
    h1: 'Muis Polling Rate (Hz) Test',
    subtitle: 'Beweeg uw muis snel in cirkels binnen het meetvlak hieronder. Omzeilt 60Hz/144Hz schermverversing om de werkelijke USB-frequentie, piek-Hz en pakketjitter te meten.',
    modeFree: 'Continue Modus',
    mode5s: '5s Benchmark',
    mode10s: '10s Benchmark',
    mode15s: '15s Uithouding',
    timerRemaining: 'Resterend:',
    timerLive: 'Live Stream',
    resetBtn: 'Resetten',
    sampleLabel: 'Gemeten pakketten:',
    topLabel: 'CONTINU BEWEGINGSGEBIED',
    bottomLabel: 'HOOGWAARDIGE POINTEREVENT-STREAM (ONBEPERKT)',
    defaultPill: 'Beweeg de muis snel in cirkels',
    statAvgLabel: 'Gemiddelde Polling',
    statAvgBadge: 'Stabiel',
    statPeakLabel: 'Piekfrequentie',
    statPeakBadge: 'Max',
    statIntervalLabel: 'Pakketinterval',
    statIntervalBadge: 'Timing',
    statJitterLabel: 'Jitterdeviatie',
    statJitterBadge: '± σ',
    statTargetLabel: 'Doelinterval',
    statTargetBadge: 'USB-spec.',
    statStabilityLabel: 'Signaalstabiliteit',
    statStabilityBadge: 'Score',
    chartTitle: 'Realtime Polling Rate Frequentiestroom',
    superb: 'Uitstekend',
    good: 'Goed',
    moderate: 'Matig',
    verdictComplete: '🏆 Test Voltooid: ',
    verdictClean: 'Schoon USB-signaal',
    verdictJitter: 'Jitter: ±',
    placeholderWave: 'USB-frequentiegolfvorm wordt live getekend bij beweging',
    c8000: '🚀 8000 Hz Klasse (Hyper-Polling Ultra)',
    c4000: '⚡ 4000 Hz Klasse (Hyper-Polling Pro)',
    c2000: '⚡ 2000 Hz Klasse (Pro Gaming)',
    c1000: '🎮 1000 Hz Klasse (Esports Gaming Standaard)',
    c500: '💼 500 Hz Klasse (Casual Gaming)',
    c250: '🔋 250 Hz Klasse (Eco Draadloos)',
    c125: '🔋 125 Hz Klasse (Standaard Kantoormuis / Bluetooth)',
    guideTitle: 'Uitleg over Muis Polling Rate & Hardware Niveaus',
    guideP1: 'De polling rate (in Hz) geeft aan hoe vaak per seconde positie-updates naar de pc worden gestuurd.',
    guideT1: '125 Hz (8,0 ms Interval)',
    guideD1: 'Standaard voor 95% van alle kantoormuizen en Bluetooth-muizen om batterij te sparen.',
    guideT2: '500 Hz (2,0 ms Interval)',
    guideD2: 'Veelvoorkomende basis voor casual gaming muizen.',
    guideT3: '1000 Hz (1,0 ms Interval)',
    guideD3: 'De gouden standaard voor esports (Logitech G, Razer, Zowie).',
    guideT4: '4000 Hz - 8000 Hz (0,25 ms - 0,125 ms)',
    guideD4: 'Hyper-polling muizen voor 240Hz, 360Hz en 540Hz monitoren.'
  }
};

const ALL_LOCALES = ['en', 'es', 'de', 'fr', 'it', 'ja', 'zh', 'ko', 'hi', 'nl'];

function buildHtml(locKey) {
  const loc = LOCALES_DATA[locKey];
  const isSubdir = loc.dir !== '';
  const assetPrefix = isSubdir ? '../' : '';

  const hreflangs = ALL_LOCALES.map(l => {
    const url = l === 'en' ? 'https://mousetester.pages.dev/polling-rate-test.html' : `https://mousetester.pages.dev/${l}/polling-rate-test.html`;
    return `  <link rel="alternate" hreflang="${l}" href="${url}">`;
  }).join('\n');

  const canonicalUrl = isSubdir ? `https://mousetester.pages.dev/${loc.dir}/polling-rate-test.html` : 'https://mousetester.pages.dev/polling-rate-test.html';

  return `<!DOCTYPE html>
<html lang="${loc.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${loc.title}</title>
  <meta name="description" content="${loc.desc}">
  <meta name="keywords" content="${loc.keywords}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">
${hreflangs}
  <link rel="alternate" hreflang="x-default" href="https://mousetester.pages.dev/polling-rate-test.html">

  <!-- Theme & Styling -->
  <meta name="theme-color" content="#0a0d14">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${assetPrefix}style.css">
  <script src="${assetPrefix}theme-i18n.js"></script>
</head>
<body>

  <!-- Main Container -->
  <main class="container">
    
    <div class="hero-header">
      <div class="hero-pill">
        <span class="pulse-dot"></span>
        <span>${loc.pill}</span>
      </div>
      <h1 class="hero-title">${loc.h1}</h1>
      <p class="hero-subtitle">
        ${loc.subtitle}
      </p>
    </div>

    <!-- Mode Selector & Timed Benchmark Runner -->
    <div class="mode-selector-bar">
      <div class="mode-buttons" id="hzModeGroup">
        <button class="mode-btn active" data-duration="0">${loc.modeFree}</button>
        <button class="mode-btn" data-duration="5">${loc.mode5s}</button>
        <button class="mode-btn" data-duration="10">${loc.mode10s}</button>
        <button class="mode-btn" data-duration="15">${loc.mode15s}</button>
      </div>

      <div class="timer-container" id="hzTimerBox">
        <span id="hzTimerLabel">${loc.timerLive}</span>
      </div>
    </div>

    <div class="timer-progress-bar active" id="hzProgressBar" style="display:none; margin-bottom:1.5rem;">
      <div id="hzProgressFill" class="timer-progress-fill" style="width:100%;"></div>
    </div>

    <!-- Main Grid -->
    <div class="app-grid">
      
      <!-- Left: Interactive Sweep Area -->
      <section class="glass-panel">
        <div class="control-bar">
          <button id="hzResetBtn" class="btn btn-danger">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
            ${loc.resetBtn}
          </button>
          <div style="font-size:0.85rem; color:var(--text-muted);">
            ${loc.sampleLabel} <strong id="hzTotalEvents" style="color:var(--text-main); font-family:var(--font-mono);">0</strong>
          </div>
        </div>

        <div id="hzSweepStage" class="hz-sweep-stage" tabindex="0">
          <div class="hz-sweep-top-label">
            ${loc.topLabel}
          </div>
          
          <div class="hz-sweep-center">
            <div class="hz-huge-number" id="hzLiveDisplay">0 <span>Hz</span></div>
            <div id="usbClassPill" class="usb-class-pill">
              <span>${loc.defaultPill}</span>
            </div>
          </div>

          <div class="hz-sweep-bottom-label">
            ${loc.bottomLabel}
          </div>
        </div>
      </section>

      <!-- Right: Detailed Telemetry & Oscillation Wave -->
      <section class="metrics-column">
        <div class="stats-grid">
          <div class="stat-card highlight">
            <div class="stat-label">
              <span>${loc.statAvgLabel}</span>
              <span class="stat-badge">${loc.statAvgBadge}</span>
            </div>
            <div class="stat-value"><span id="statAvgHz">0</span><span class="stat-unit">Hz</span></div>
          </div>

          <div class="stat-card">
            <div class="stat-label">
              <span>${loc.statPeakLabel}</span>
              <span class="stat-badge">${loc.statPeakBadge}</span>
            </div>
            <div class="stat-value"><span id="statPeakHz">0</span><span class="stat-unit">Hz</span></div>
          </div>

          <div class="stat-card">
            <div class="stat-label">
              <span>${loc.statIntervalLabel}</span>
              <span class="stat-badge">${loc.statIntervalBadge}</span>
            </div>
            <div class="stat-value"><span id="statAvgInterval">0.00</span><span class="stat-unit">ms</span></div>
          </div>

          <div class="stat-card">
            <div class="stat-label">
              <span>${loc.statJitterLabel}</span>
              <span class="stat-badge">${loc.statJitterBadge}</span>
            </div>
            <div class="stat-value"><span id="statJitter">0.00</span><span class="stat-unit">ms</span></div>
          </div>

          <div class="stat-card">
            <div class="stat-label">
              <span>${loc.statTargetLabel}</span>
              <span class="stat-badge">${loc.statTargetBadge}</span>
            </div>
            <div class="stat-value" id="statTargetInterval">--</div>
          </div>

          <div class="stat-card">
            <div class="stat-label">
              <span>${loc.statStabilityLabel}</span>
              <span class="stat-badge">${loc.statStabilityBadge}</span>
            </div>
            <div class="stat-value" id="statStability">--</div>
          </div>
        </div>

        <div class="chart-container">
          <div class="chart-header">
            <div class="chart-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              ${loc.chartTitle}
            </div>
          </div>
          <canvas id="hzWaveCanvas" style="width:100%; height:160px; background:#0d121c; border-radius:var(--radius-sm); display:block;"></canvas>
        </div>
      </section>
    </div>

    <!-- Polling Rate Tiers & Information Section -->
    <section class="glass-panel" style="margin-top: 2rem;">
      <h2 style="font-size:1.35rem; font-weight:700; color:var(--text-main); margin-bottom:0.75rem;">${loc.guideTitle}</h2>
      <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.5rem;">${loc.guideP1}</p>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">
        <div style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem;">
          <div style="font-weight:700; color:var(--accent-cyan); margin-bottom:0.35rem;">${loc.guideT1}</div>
          <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${loc.guideD1}</div>
        </div>

        <div style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem;">
          <div style="font-weight:700; color:#818cf8; margin-bottom:0.35rem;">${loc.guideT2}</div>
          <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${loc.guideD2}</div>
        </div>

        <div style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem;">
          <div style="font-weight:700; color:#c084fc; margin-bottom:0.35rem;">${loc.guideT3}</div>
          <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${loc.guideD3}</div>
        </div>

        <div style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem;">
          <div style="font-weight:700; color:#f43f5e; margin-bottom:0.35rem;">${loc.guideT4}</div>
          <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${loc.guideD4}</div>
        </div>
      </div>
    </section>
  </main>

  <!-- Polling Rate Engine Script -->
  <script>
  (function() {
    let modeDuration = 0; // 0 = continuous
    let isTiming = false;
    let isFinished = false;
    let timerStartTime = 0;
    let timerInterval = null;

    let eventCount = 0;
    let peakHz = 0;
    let lastPacketTime = 0;
    
    // Rolling packet buffer for microsecond frequency analysis
    let packetTimestamps = []; // sliding 150ms window
    let allIntervals = [];     // for full test summary
    let deltaBuffer = [];      // last 50 deltas for jitter
    let hzHistory = [];        // for live waveform

    const sweepStage = document.getElementById('hzSweepStage');
    const liveDisplay = document.getElementById('hzLiveDisplay');
    const usbClassPill = document.getElementById('usbClassPill');
    const totalEventsEl = document.getElementById('hzTotalEvents');
    const avgHzEl = document.getElementById('statAvgHz');
    const peakHzEl = document.getElementById('statPeakHz');
    const avgIntervalEl = document.getElementById('statAvgInterval');
    const jitterEl = document.getElementById('statJitter');
    const targetIntervalEl = document.getElementById('statTargetInterval');
    const stabilityEl = document.getElementById('statStability');
    const resetBtn = document.getElementById('hzResetBtn');
    
    const modeBtns = document.querySelectorAll('#hzModeGroup .mode-btn');
    const timerLabel = document.getElementById('hzTimerLabel');
    const progressBar = document.getElementById('hzProgressBar');
    const progressFill = document.getElementById('hzProgressFill');

    const canvas = document.getElementById('hzWaveCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function classifyHz(hz) {
      if (hz >= 6000) return { label: '${loc.c8000}', target: '0.125 ms' };
      if (hz >= 3000) return { label: '${loc.c4000}', target: '0.25 ms' };
      if (hz >= 1500) return { label: '${loc.c2000}', target: '0.50 ms' };
      if (hz >= 750) return { label: '${loc.c1000}', target: '1.00 ms' };
      if (hz >= 380) return { label: '${loc.c500}', target: '2.00 ms' };
      if (hz >= 190) return { label: '${loc.c250}', target: '4.00 ms' };
      return { label: '${loc.c125}', target: '8.00 ms' };
    }

    function resetTest() {
      clearInterval(timerInterval);
      isTiming = false;
      isFinished = false;
      eventCount = 0;
      peakHz = 0;
      lastPacketTime = 0;
      packetTimestamps = [];
      allIntervals = [];
      deltaBuffer = [];
      hzHistory = [];

      totalEventsEl.textContent = '0';
      liveDisplay.innerHTML = '0 <span>Hz</span>';
      usbClassPill.innerHTML = '<span>${loc.defaultPill}</span>';
      avgHzEl.textContent = '0';
      peakHzEl.textContent = '0';
      avgIntervalEl.textContent = '0.00';
      jitterEl.textContent = '0.00';
      targetIntervalEl.textContent = '--';
      stabilityEl.textContent = '--';

      if (modeDuration > 0) {
        timerLabel.innerHTML = '${loc.timerRemaining} <strong style="color:var(--accent-cyan);">' + modeDuration.toFixed(1) + 's</strong>';
        progressBar.style.display = 'block';
        progressFill.style.width = '100%';
      } else {
        timerLabel.textContent = '${loc.timerLive}';
        progressBar.style.display = 'none';
      }
    }

    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeDuration = parseFloat(btn.dataset.duration);
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        resetTest();
      });
    });

    resetBtn.addEventListener('click', resetTest);

    function startTimedRun() {
      isTiming = true;
      timerStartTime = performance.now();
      timerInterval = setInterval(() => {
        const elapsed = (performance.now() - timerStartTime) / 1000;
        const remaining = Math.max(0, modeDuration - elapsed);
        timerLabel.innerHTML = '${loc.timerRemaining} <strong style="color:var(--accent-cyan);">' + remaining.toFixed(1) + 's</strong>';
        progressFill.style.width = (remaining / modeDuration * 100) + '%';

        if (remaining <= 0) {
          finishTimedRun();
        }
      }, 40);
    }

    function finishTimedRun() {
      clearInterval(timerInterval);
      isTiming = false;
      isFinished = true;
      timerLabel.innerHTML = '${loc.timerRemaining} <strong style="color:var(--accent-emerald);">0.0s</strong>';
      progressFill.style.width = '0%';

      if (allIntervals.length > 5) {
        const validDeltas = allIntervals.filter(d => d > 0 && d < 200);
        if (validDeltas.length > 0) {
          const avgDelta = validDeltas.reduce((a, b) => a + b, 0) / validDeltas.length;
          const finalHz = Math.round(1000 / avgDelta);
          const variance = validDeltas.reduce((acc, v) => acc + Math.pow(v - avgDelta, 2), 0) / validDeltas.length;
          const finalJitter = Math.sqrt(variance);

          liveDisplay.innerHTML = finalHz + ' <span>Hz</span>';
          avgHzEl.textContent = finalHz;
          avgIntervalEl.textContent = avgDelta.toFixed(2);
          jitterEl.textContent = finalJitter.toFixed(2);

          const cls = classifyHz(finalHz);
          usbClassPill.innerHTML = '<span>' + '${loc.verdictComplete}' + cls.label + ' (' + '${loc.verdictJitter}' + finalJitter.toFixed(2) + 'ms)</span>';
        }
      }
    }

    // Professional Coalesced PointerEvent Ingestion Engine
    function processPointerPacket(e) {
      if (isFinished) return;

      const subEvents = (typeof e.getCoalescedEvents === 'function') ? e.getCoalescedEvents() : [e];
      const now = performance.now();

      if (modeDuration > 0 && !isTiming && eventCount > 2) {
        startTimedRun();
      }

      for (let i = 0; i < subEvents.length; i++) {
        eventCount++;
        const pTime = subEvents[i].timeStamp || now;
        packetTimestamps.push(pTime);

        if (lastPacketTime > 0) {
          const delta = pTime - lastPacketTime;
          if (delta > 0 && delta < 200) {
            deltaBuffer.push(delta);
            allIntervals.push(delta);
            if (deltaBuffer.length > 60) deltaBuffer.shift();
          }
        }
        lastPacketTime = pTime;
      }

      // Calculate sliding-window Frequency (180ms rolling window)
      const windowCutoff = now - 180;
      while (packetTimestamps.length > 0 && packetTimestamps[0] < windowCutoff) {
        packetTimestamps.shift();
      }

      if (packetTimestamps.length >= 4) {
        const windowSpanMs = packetTimestamps[packetTimestamps.length - 1] - packetTimestamps[0];
        if (windowSpanMs > 15) {
          const rawHz = Math.round(((packetTimestamps.length - 1) / windowSpanMs) * 1000);
          
          if (rawHz > 0 && rawHz < 12000) {
            if (rawHz > peakHz) {
              peakHz = rawHz;
            }

            let avgDelta = 1000 / rawHz;
            let jitterStdDev = 0;
            if (deltaBuffer.length > 2) {
              const meanD = deltaBuffer.reduce((a, b) => a + b, 0) / deltaBuffer.length;
              avgDelta = meanD;
              const variance = deltaBuffer.reduce((acc, v) => acc + Math.pow(v - meanD, 2), 0) / deltaBuffer.length;
              jitterStdDev = Math.sqrt(variance);
            }

            liveDisplay.innerHTML = rawHz + ' <span>Hz</span>';
            totalEventsEl.textContent = eventCount.toLocaleString();
            avgHzEl.textContent = rawHz;
            peakHzEl.textContent = peakHz;
            avgIntervalEl.textContent = avgDelta.toFixed(2);
            jitterEl.textContent = jitterStdDev.toFixed(2);

            const cls = classifyHz(rawHz);
            if (!isFinished) {
              usbClassPill.innerHTML = '<span>' + cls.label + '</span>';
            }
            targetIntervalEl.textContent = cls.target;

            const stabilityScore = jitterStdDev < 0.35 ? '99% (${loc.superb})' : (jitterStdDev < 0.8 ? '95% (${loc.good})' : '85% (${loc.moderate})');
            stabilityEl.textContent = stabilityScore;

            hzHistory.push(rawHz);
            if (hzHistory.length > 100) hzHistory.shift();
          }
        }
      }
    }

    sweepStage.addEventListener('pointermove', processPointerPacket, { passive: true });

    sweepStage.addEventListener('pointerleave', () => {
      lastPacketTime = 0;
    });

    // Continuous 60fps/144fps/240fps Waveform Render Loop
    function renderWave() {
      requestAnimationFrame(renderWave);

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Grid Lines & Hz Scale Markers
      const maxScale = Math.max(1200, peakHz * 1.15);
      const gridFrequencies = [125, 500, 1000, 2000, 4000, 8000].filter(f => f < maxScale * 0.95);

      ctx.font = Math.round(10 * dpr) + 'px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      gridFrequencies.forEach(hz => {
        const y = h - (hz / maxScale) * (h - 24 * dpr) - 12 * dpr;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1 * dpr;
        ctx.setLineDash([4 * dpr, 4 * dpr]);
        ctx.beginPath();
        ctx.moveTo(48 * dpr, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillText(hz + 'Hz', 42 * dpr, y);
      });
      ctx.setLineDash([]);

      // 2. Draw Live Stream Waveform
      if (hzHistory.length >= 2) {
        const maxPoints = 80;
        const slice = hzHistory.slice(-maxPoints);
        const startX = 50 * dpr;
        const graphW = w - startX;
        const step = graphW / (slice.length - 1);

        ctx.beginPath();
        slice.forEach((hz, i) => {
          const x = startX + i * step;
          const normalized = Math.min(1, hz / maxScale);
          const y = h - (normalized * (h - 24 * dpr)) - 12 * dpr;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });

        // Glowing Line Stroke
        ctx.save();
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2.5 * dpr;
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 10 * dpr;
        ctx.stroke();
        ctx.restore();

        // Gradient Fill
        const lastX = startX + (slice.length - 1) * step;
        ctx.lineTo(lastX, h);
        ctx.lineTo(startX, h);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
        grad.addColorStop(1, 'rgba(168, 85, 247, 0.0)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Active Head Dot
        const latestHz = slice[slice.length - 1];
        const latestY = h - (Math.min(1, latestHz / maxScale) * (h - 24 * dpr)) - 12 * dpr;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(lastX, latestY, 3.5 * dpr, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Idle placeholder guide
        ctx.font = Math.round(11 * dpr) + 'px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.fillText('${loc.placeholderWave}', w / 2 + 20 * dpr, h / 2);
      }
    }

    renderWave();
  })();
  </script>
</body>
</html>`;
}

// Write out all 10 polling-rate-test.html files
Object.keys(LOCALES_DATA).forEach(locKey => {
  const loc = LOCALES_DATA[locKey];
  const targetPath = loc.dir === '' ? 'polling-rate-test.html' : path.join(loc.dir, 'polling-rate-test.html');
  const content = buildHtml(locKey);
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log(`Generated ${targetPath}`);
});

console.log('--- 2. UPDATING NAVBARS & 4-COLUMN FOOTERS ACROSS ALL 114 PAGES ---');

const NAV_DATA = {
  en: {
    langBtn: '🌐 EN ▾',
    badge: '11 Tools Hub',
    scroll: 'Mouse Scroll Glitch',
    cps: 'CPS Speed Test',
    spacebar: 'Spacebar Clicker',
    polling: 'Polling Rate (Hz)',
    keyboard: '104-Key Keyboard',
    gamepad: 'Gamepad Tester',
    more: 'More Tools ▾',
    rx: '⚡ Reaction Time Test',
    pixel: '🖥️ Screen Dead Pixel Test',
    motion: '🏎️ Monitor Motion Blur Test',
    mic: '🎙️ Microphone Echo & dBFS',
    cam: '📷 Webcam Resolution & FPS',
    footerBrand: 'MouseTester.io - Peripheral Diagnostic Suite',
    footerSub: '100% Client-Side Pure JavaScript. Zero external trackers. Private, ultra-low latency hardware testing on Cloudflare Pages.',
    coreTools: 'Input Diagnostics',
    avTools: 'Display & Media',
    trust: 'Trust & Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    about: 'About Us',
    contact: 'Contact & Support',
    copyNotice: '© 2026 MouseTester.io. All rights reserved.'
  },
  es: {
    langBtn: '🌐 ES ▾',
    badge: 'Diagnóstico USB',
    scroll: 'Scroll y Botones',
    cps: 'Test CPS',
    spacebar: 'Barra Espaciadora',
    polling: 'Polling Rate (Hz)',
    keyboard: 'Teclado 104',
    gamepad: 'Mando Gamepad',
    more: 'Más Herramientas ▾',
    rx: '⚡ Test de Tiempo de Reacción',
    pixel: '🖥️ Test de Píxeles Muertos',
    motion: '🏎️ Test Desenfoque de Movimiento',
    mic: '🎙️ Test de Micrófono y Eco',
    cam: '📷 Test de Cámara Web y FPS',
    footerBrand: 'MouseTester.io - Suite de Diagnóstico de Periféricos',
    footerSub: '100% JavaScript del lado del cliente. Sin rastreadores. Pruebas de hardware privadas y de latencia ultra baja.',
    coreTools: 'Diagnósticos de Entrada',
    avTools: 'Pantalla y Medios',
    trust: 'Confianza y Legal',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    about: 'Sobre Nosotros',
    contact: 'Contacto y Soporte',
    copyNotice: '© 2026 MouseTester.io. Todos los derechos reservados.'
  },
  de: {
    langBtn: '🌐 DE ▾',
    badge: 'USB-Telemetrie',
    scroll: 'Mausrad & Tasten',
    cps: 'CPS-Klicktest',
    spacebar: 'Leertaste-Test',
    polling: 'Polling Rate (Hz)',
    keyboard: 'Tastatur 104',
    gamepad: 'Gamepad-Test',
    more: 'Mehr Tools ▾',
    rx: '⚡ Reaktionszeit-Test',
    pixel: '🖥️ Pixelfehler-Test',
    motion: '🏎️ Bewegungsunschärfe-Test',
    mic: '🎙️ Mikrofon- & Echo-Test',
    cam: '📷 Webcam & FPS-Test',
    footerBrand: 'MouseTester.io - Hardware-Diagnose-Suite',
    footerSub: '100% clientseitiges reines JavaScript. Keine Tracker. Private Hardware-Tests mit minimaler Latenz.',
    coreTools: 'Eingabe-Diagnose',
    avTools: 'Display & Medien',
    trust: 'Rechtliches & Datenschutz',
    privacy: 'Datenschutzerklärung',
    terms: 'Nutzungsbedingungen',
    about: 'Über uns',
    contact: 'Kontakt & Support',
    copyNotice: '© 2026 MouseTester.io. Alle Rechte vorbehalten.'
  },
  fr: {
    langBtn: '🌐 FR ▾',
    badge: 'Télémétrie USB',
    scroll: 'Molette & Boutons',
    cps: 'Test CPS',
    spacebar: "Barre d'Espace",
    polling: "Taux d'Échantillonnage (Hz)",
    keyboard: 'Clavier 104',
    gamepad: 'Manette Gamepad',
    more: 'Plus d\'Outils ▾',
    rx: '⚡ Test de Temps de Réaction',
    pixel: '🖥️ Test Pixels Morts',
    motion: '🏎️ Test Flou de Mouvement',
    mic: '🎙️ Test Microphone & Écho',
    cam: '📷 Test Webcam & FPS',
    footerBrand: 'MouseTester.io - Suite de Diagnostic Périphérique',
    footerSub: '100% JavaScript pur côté client. Aucun traceur. Tests matériels privés et ultra-rapides.',
    coreTools: 'Diagnostics d\'Entrée',
    avTools: 'Affichage & Médias',
    trust: 'Légal & Confiance',
    privacy: 'Politique de Confidentialité',
    terms: 'Conditions d\'Utilisation',
    about: 'À Propos',
    contact: 'Contact & Support',
    copyNotice: '© 2026 MouseTester.io. Tous droits réservés.'
  },
  it: {
    langBtn: '🌐 IT ▾',
    badge: 'Telemetria USB',
    scroll: 'Rotella & Pulsanti',
    cps: 'Test CPS',
    spacebar: 'Barra Spaziatrice',
    polling: 'Polling Rate (Hz)',
    keyboard: 'Tastiera 104',
    gamepad: 'Controller Gamepad',
    more: 'Altri Strumenti ▾',
    rx: '⚡ Test Tempo di Reazione',
    pixel: '🖥️ Test Pixel Bruciati',
    motion: '🏎️ Test Sfocatura Movimento',
    mic: '🎙️ Test Microfono ed Eco',
    cam: '📷 Test Webcam e FPS',
    footerBrand: 'MouseTester.io - Suite Diagnostica Periferiche',
    footerSub: '100% puro JavaScript client-side. Nessun tracciatore. Test hardware privati a bassissima latenza.',
    coreTools: 'Diagnostica di Input',
    avTools: 'Display e Multimedia',
    trust: 'Legale e Privacy',
    privacy: 'Informativa sulla Privacy',
    terms: 'Termini di Servizio',
    about: 'Chi Siamo',
    contact: 'Contatti e Supporto',
    copyNotice: '© 2026 MouseTester.io. Tutti i diritti riservati.'
  },
  ja: {
    langBtn: '🌐 JA ▾',
    badge: 'USB テレメトリ',
    scroll: 'スクロール＆ボタン',
    cps: 'CPS連打テスト',
    spacebar: 'スペース連打',
    polling: 'ポーリングレート (Hz)',
    keyboard: 'キーボード 104',
    gamepad: 'ゲームパッド',
    more: 'その他ツール ▾',
    rx: '⚡ 反応速度テスト',
    pixel: '🖥️ ドット抜け・画面テスト',
    motion: '🏎️ 残像・ゴーストテスト',
    mic: '🎙️ マイク＆エコーテスト',
    cam: '📷 Webカメラ＆FPS',
    footerBrand: 'MouseTester.io - デバイス診断スイート',
    footerSub: '完全クライアントサイド動作。トラッカーなし。超低遅延でセキュアな周辺機器ベンチマーク環境。',
    coreTools: '入力デバイス診断',
    avTools: '画面＆メディア検証',
    trust: '規約とポリシー',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    about: '当サイトについて',
    contact: 'お問い合わせ',
    copyNotice: '© 2026 MouseTester.io. 無断転載を禁じます。'
  },
  zh: {
    langBtn: '🌐 ZH ▾',
    badge: 'USB 实时采样',
    scroll: '滚轮与按键',
    cps: 'CPS点击速度',
    spacebar: '空格键连点',
    polling: '回报率 (Hz)',
    keyboard: '104全键键盘',
    gamepad: '手柄测试',
    more: '更多工具 ▾',
    rx: '⚡ 反应时间测试',
    pixel: '🖥️ 屏幕坏点检测',
    motion: '🏎️ 动态模糊与拖影',
    mic: '🎙️ 麦克风与回声',
    cam: '📷 摄像头与FPS',
    footerBrand: 'MouseTester.io - 外设硬件诊断工具',
    footerSub: '纯客户端 JavaScript 运行。零追踪代码，完全私密的超低延迟硬件基准测试平台。',
    coreTools: '输入设备测试',
    avTools: '屏幕与影音检测',
    trust: '信任与合规',
    privacy: '隐私政策',
    terms: '服务条款',
    about: '关于我们',
    contact: '联系与支持',
    copyNotice: '© 2026 MouseTester.io. 版权所有。'
  },
  ko: {
    langBtn: '🌐 KO ▾',
    badge: 'USB 텔레메트리',
    scroll: '스크롤 & 버튼',
    cps: 'CPS 광클 테스트',
    spacebar: '스페이스바 연타',
    polling: '폴링레이트 (Hz)',
    keyboard: '104키 키보드',
    gamepad: '게임패드',
    more: '추가 도구 ▾',
    rx: '⚡ 반응속도 테스트',
    pixel: '🖥️ 모니터 불량화소',
    motion: '🏎️ 잔상 & 고스팅',
    mic: '🎙️ 마이크 & 에코',
    cam: '📷 웹캠 & FPS',
    footerBrand: 'MouseTester.io - 주변기기 진단 도구',
    footerSub: '100% 클라이언트 순수 JavaScript 구동. 추적기 없음. 비공개 초저지연 하드웨어 벤치마크.',
    coreTools: '입력 장치 진단',
    avTools: '디스플레이 & 미디어',
    trust: '약관 및 신뢰',
    privacy: '개인정보 처리방침',
    terms: '이용약관',
    about: '소개',
    contact: '문의 및 지원',
    copyNotice: '© 2026 MouseTester.io. All rights reserved.'
  },
  hi: {
    langBtn: '🌐 HI ▾',
    badge: 'USB टेलीमेट्री',
    scroll: 'स्क्रॉल और बटन',
    cps: 'CPS टेस्ट',
    spacebar: 'स्पेसबार टेस्ट',
    polling: 'पोलिंग रेट (Hz)',
    keyboard: '104-की कीबोर्ड',
    gamepad: 'गेमपैड',
    more: 'अन्य टूल्स ▾',
    rx: '⚡ प्रतिक्रिया समय',
    pixel: '🖥️ डेड पिक्सेल टेस्ट',
    motion: '🏎️ मोशन ब्लर टेस्ट',
    mic: '🎙️ माइक्रोफ़ोन और इको',
    cam: '📷 वेबकैम और FPS',
    footerBrand: 'MouseTester.io - पेरीफेरल डायग्नोस्टिक सूट',
    footerSub: '100% क्लाइंट-साइड शुद्ध जावास्क्रिप्ट। कोई बाहरी ट्रैकर नहीं। निजी और अल्ट्रा-लो लेटेंसी हार्डवेयर टेस्टिंग।',
    coreTools: 'इनपुट डायग्नोस्टिक्स',
    avTools: 'डिस्प्ले और मीडिया',
    trust: 'नीति और कानूनी',
    privacy: 'गोपनीयता नीति (Privacy)',
    terms: 'सेवा की शर्तें (Terms)',
    about: 'हमारे बारे में (About)',
    contact: 'संपर्क और सहायता',
    copyNotice: '© 2026 MouseTester.io. सर्वाधिकार सुरक्षित।'
  },
  nl: {
    langBtn: '🌐 NL ▾',
    badge: 'USB-Telemetrie',
    scroll: 'Scroll & Knoppen',
    cps: 'CPS-Test',
    spacebar: 'Spatiebalk',
    polling: 'Polling Rate (Hz)',
    keyboard: 'Toetsenbord 104',
    gamepad: 'Gamepad',
    more: 'Meer Tools ▾',
    rx: '⚡ Reactietijd Test',
    pixel: '🖥️ Dode Pixels Test',
    motion: '🏎️ Bewegingsonscherpte',
    mic: '🎙️ Microfoon & Echo',
    cam: '📷 Webcam & FPS',
    footerBrand: 'MouseTester.io - Randapparatuur Diagnosesuite',
    footerSub: '100% Client-Side Pure JavaScript. Geen trackers. Privé en ultra-lage latency hardware tests.',
    coreTools: 'Invoerdiagnose',
    avTools: 'Scherm & Media',
    trust: 'Juridisch & Vertrouwen',
    privacy: 'Privacybeleid',
    terms: 'Gebruiksvoorwaarden',
    about: 'Over Ons',
    contact: 'Contact & Ondersteuning',
    copyNotice: '© 2026 MouseTester.io. Alle rechten voorbehouden.'
  }
};

function buildNavbar(langCode, currentFilename) {
  const d = NAV_DATA[langCode] || NAV_DATA.en;

  const isScrollActive = currentFilename === 'index.html';
  const isCpsActive = currentFilename === 'cps-test.html';
  const isSpaceActive = currentFilename === 'spacebar-clicker.html';
  const isPollActive = currentFilename === 'polling-rate-test.html';
  const isKbActive = currentFilename === 'keyboard-test.html';
  const isGpActive = currentFilename === 'gamepad-test.html';

  const isRxActive = currentFilename === 'reaction-time-test.html';
  const isPixelActive = currentFilename === 'screen-dead-pixel.html';
  const isMotionActive = currentFilename === 'monitor-motion-blur.html';
  const isMicActive = currentFilename === 'microphone-test.html';
  const isCamActive = currentFilename === 'webcam-test.html';

  const isDropdownActive = isRxActive || isPixelActive || isMotionActive || isMicActive || isCamActive;

  return `  <!-- Top Navigation Hub (${langCode.toUpperCase()}) -->
  <header class="navbar">
    <div class="nav-container">
      <a href="index.html" class="brand-logo">
        <div class="brand-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="7"></rect>
            <path d="M12 6v4"></path>
          </svg>
        </div>
        <span>MouseTester<span style="color:var(--accent-cyan)">.io</span></span>
      </a>

      <ul class="nav-links">
        <li><a href="index.html"${isScrollActive ? ' class="active"' : ''}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="2" width="14" height="20" rx="7"></rect><path d="M12 6v4"></path></svg> ${d.scroll}</a></li>
        <li><a href="cps-test.html"${isCpsActive ? ' class="active"' : ''}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg> ${d.cps}</a></li>
        <li><a href="spacebar-clicker.html"${isSpaceActive ? ' class="active"' : ''}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="9" width="18" height="6" rx="2"></rect></svg> ${d.spacebar}</a></li>
        <li><a href="polling-rate-test.html"${isPollActive ? ' class="active"' : ''}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${d.polling}</a></li>
        <li><a href="keyboard-test.html"${isKbActive ? ' class="active"' : ''}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8"></path></svg> ${d.keyboard}</a></li>
        <li><a href="gamepad-test.html"${isGpActive ? ' class="active"' : ''}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="6" width="20" height="12" rx="6"></rect><path d="M6 12h4m-2-2v4m9-2h.01M17 10h.01"></path></svg> ${d.gamepad}</a></li>
        
        <li class="nav-dropdown${isDropdownActive ? ' active' : ''}">
          <button class="nav-dropdown-btn">${d.more}</button>
          <div class="nav-dropdown-content">
            <a href="reaction-time-test.html"${isRxActive ? ' class="active"' : ''}>${d.rx}</a>
            <a href="screen-dead-pixel.html"${isPixelActive ? ' class="active"' : ''}>${d.pixel}</a>
            <a href="monitor-motion-blur.html"${isMotionActive ? ' class="active"' : ''}>${d.motion}</a>
            <a href="microphone-test.html"${isMicActive ? ' class="active"' : ''}>${d.mic}</a>
            <a href="webcam-test.html"${isCamActive ? ' class="active"' : ''}>${d.cam}</a>
          </div>
        </li>
      </ul>

      <div class="nav-actions">
        <button id="themeToggleBtn" class="theme-toggle-btn" title="Toggle Theme">🌙 <span class="theme-text">Dark</span></button>
        
        <div class="lang-dropdown">
          <button id="currentLangBtn" class="lang-btn">${d.langBtn}</button>
          <div id="langDropdownList" class="lang-dropdown-menu"></div>
        </div>

        <span class="nav-badge">${d.badge}</span>
      </div>
    </div>
  </header>`;
}

function buildFooter(langCode) {
  const d = NAV_DATA[langCode] || NAV_DATA.en;
  const isSubdir = langCode !== 'en';
  const rootPrefix = isSubdir ? '../' : './';
  const localPrefix = '';

  return `  <!-- Footer -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        
        <!-- Col 1: Brand & Privacy Statement -->
        <div class="footer-col">
          <a href="${isSubdir ? 'index.html' : './index.html'}" class="brand-logo" style="margin-bottom:0.75rem; display:inline-flex;">
            <div class="brand-icon" style="width:28px; height:28px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="5" y="2" width="14" height="20" rx="7"></rect>
                <path d="M12 6v4"></path>
              </svg>
            </div>
            <span>MouseTester<span style="color:var(--accent-cyan)">.io</span></span>
          </a>
          <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.6; margin-bottom:1rem;">
            ${d.footerSub}
          </p>
          <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size:0.75rem; color:var(--accent-emerald); background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); padding:0.25rem 0.6rem; border-radius:var(--radius-full);">
            <span>🔒 100% Client-Side Privacy</span>
          </div>
        </div>

        <!-- Col 2: Input Diagnostics -->
        <div class="footer-col">
          <h4>${d.coreTools}</h4>
          <ul>
            <li><a href="${localPrefix}index.html">🖱️ ${d.scroll}</a></li>
            <li><a href="${localPrefix}cps-test.html">⚡ ${d.cps}</a></li>
            <li><a href="${localPrefix}spacebar-clicker.html">⌨️ ${d.spacebar}</a></li>
            <li><a href="${localPrefix}polling-rate-test.html">🔄 ${d.polling}</a></li>
            <li><a href="${localPrefix}keyboard-test.html">🖮 ${d.keyboard}</a></li>
            <li><a href="${localPrefix}gamepad-test.html">🎮 ${d.gamepad}</a></li>
          </ul>
        </div>

        <!-- Col 3: Display & Media -->
        <div class="footer-col">
          <h4>${d.avTools}</h4>
          <ul>
            <li><a href="${localPrefix}reaction-time-test.html">${d.rx}</a></li>
            <li><a href="${localPrefix}screen-dead-pixel.html">${d.pixel}</a></li>
            <li><a href="${localPrefix}monitor-motion-blur.html">${d.motion}</a></li>
            <li><a href="${localPrefix}microphone-test.html">${d.mic}</a></li>
            <li><a href="${localPrefix}webcam-test.html">${d.cam}</a></li>
          </ul>
        </div>

        <!-- Col 4: Trust & Legal -->
        <div class="footer-col">
          <h4>${d.trust}</h4>
          <ul>
            <li><a href="${rootPrefix}privacy-policy.html">🛡️ ${d.privacy}</a></li>
            <li><a href="${rootPrefix}terms-of-service.html">📜 ${d.terms}</a></li>
            <li><a href="${rootPrefix}about.html">💡 ${d.about}</a></li>
            <li><a href="${rootPrefix}contact.html">✉️ ${d.contact}</a></li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <div>${d.copyNotice}</div>
        <div style="display:flex; gap:1.25rem;">
          <a href="${rootPrefix}privacy-policy.html">${d.privacy}</a>
          <a href="${rootPrefix}terms-of-service.html">${d.terms}</a>
          <a href="${rootPrefix}about.html">${d.about}</a>
          <a href="${rootPrefix}contact.html">${d.contact}</a>
        </div>
      </div>
    </div>
  </footer>`;
}

function getAllHtml(dir) {
  let list = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!f.startsWith('.') && f !== 'node_modules' && f !== 'scratch') {
        list = list.concat(getAllHtml(full));
      }
    } else if (f.endsWith('.html')) {
      list.push(full);
    }
  });
  return list;
}

const allFiles = getAllHtml('.');
console.log(`Updating navbar and rich footer across ${allFiles.length} HTML files...`);

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative('.', filePath).replace(/\\/g, '/');
  const isSubdir = rel.includes('/');
  const langCode = isSubdir ? rel.split('/')[0] : 'en';
  const filename = isSubdir ? rel.split('/')[1] : rel;

  const newNav = buildNavbar(langCode, filename);
  const newFooter = buildFooter(langCode);

  content = content.replace(/(\s*<!-- Top Navigation Hub[^\n]*-->)+/g, '');
  content = content.replace(/(\s*<!-- Footer -->)+/g, '');

  if (content.includes('<header class="navbar">')) {
    content = content.replace(/<header class="navbar">[\s\S]*?<\/header>/, newNav);
  } else if (content.includes('<main')) {
    content = content.replace('<main', `${newNav}\n\n  <main`);
  }

  if (content.includes('<footer class="footer">')) {
    content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/, newFooter);
  } else if (content.includes('</main>')) {
    content = content.replace('</main>', `</main>\n\n${newFooter}`);
  } else if (content.includes('</body>')) {
    content = content.replace('</body>', `${newFooter}\n</body>`);
  }

  // Sanitize internal relative links
  if (isSubdir) {
    content = content.replace(/href="style\.css"/g, 'href="../style.css"');
    content = content.replace(/src="theme-i18n\.js"/g, 'src="../theme-i18n.js"');
    content = content.replace(/src="app\.js"/g, 'src="../app.js"');
    content = content.replace(/href="\.\.\/(cps-test|keyboard-test|gamepad-test|spacebar-clicker|reaction-time-test|screen-dead-pixel|monitor-motion-blur|microphone-test|webcam-test|polling-rate-test)\.html"/g, 'href="$1.html"');
    content = content.replace(/href="\.\.\/index\.html"/g, 'href="index.html"');
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Nav & rich footer update complete across all files!');

console.log('--- 3. GENERATING COMPLETE SITEMAP.XML (ALL 114 URLS) ---');

const TOOLS = [
  { file: 'index.html', priority: '1.0' },
  { file: 'cps-test.html', priority: '0.9' },
  { file: 'keyboard-test.html', priority: '0.9' },
  { file: 'gamepad-test.html', priority: '0.9' },
  { file: 'spacebar-clicker.html', priority: '0.85' },
  { file: 'polling-rate-test.html', priority: '0.85' },
  { file: 'reaction-time-test.html', priority: '0.85' },
  { file: 'screen-dead-pixel.html', priority: '0.85' },
  { file: 'monitor-motion-blur.html', priority: '0.85' },
  { file: 'microphone-test.html', priority: '0.85' },
  { file: 'webcam-test.html', priority: '0.85' }
];

function getUrl(lang, toolFile) {
  if (lang === 'en') {
    return toolFile === 'index.html' ? 'https://mousetester.pages.dev/' : `https://mousetester.pages.dev/${toolFile}`;
  } else {
    return toolFile === 'index.html' ? `https://mousetester.pages.dev/${lang}/` : `https://mousetester.pages.dev/${lang}/${toolFile}`;
  }
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

// 1. Root English URLs with hreflang alternate cluster
xml += `  <!-- English Core & Companion Suite (Root) -->\n`;
TOOLS.forEach(t => {
  const locUrl = getUrl('en', t.file);
  xml += `  <url>\n    <loc>${locUrl}</loc>\n`;
  ALL_LOCALES.forEach(lang => {
    xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${getUrl(lang, t.file)}" />\n`;
  });
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${getUrl('en', t.file)}" />\n`;
  xml += `    <lastmod>2026-08-19</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${t.priority}</priority>\n  </url>\n`;
});

// 2. Localized Subdirectory URLs
ALL_LOCALES.filter(l => l !== 'en').forEach(lang => {
  xml += `\n  <!-- ${lang.toUpperCase()} Subdirectory (/${lang}/) -->\n`;
  TOOLS.forEach(t => {
    const locUrl = getUrl(lang, t.file);
    xml += `  <url><loc>${locUrl}</loc><lastmod>2026-08-19</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
  });
});

// 3. Static Trust & Compliance URLs
xml += `\n  <!-- Compliance & Trust Pages -->\n`;
const SITEMAP_STATIC = [
  { file: 'privacy-policy.html', priority: '0.5' },
  { file: 'terms-of-service.html', priority: '0.5' },
  { file: 'about.html', priority: '0.6' },
  { file: 'contact.html', priority: '0.6' }
];

SITEMAP_STATIC.forEach(item => {
  xml += `  <url>\n    <loc>https://mousetester.pages.dev/${item.file}</loc>\n    <lastmod>2026-08-19</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${item.priority}</priority>\n  </url>\n`;
});

xml += `</urlset>\n`;
fs.writeFileSync('sitemap.xml', xml, 'utf8');
console.log('sitemap.xml written with all 114 URLs!');

console.log('--- 4. AUDITING SUITE CONSISTENCY ---');

let failed = 0;
const auditedFiles = getAllHtml('.');

auditedFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const rel = path.relative('.', f).replace(/\\/g, '/');
  const isSubdir = rel.includes('/');

  // Check More Tools dropdown
  const dropdownMatch = content.match(/<div class="nav-dropdown-content">([\s\S]*?)<\/div>/);
  if (!dropdownMatch) {
    console.error(`FAIL [${rel}]: Missing nav-dropdown-content`);
    failed++;
  } else {
    const requiredTools = [
      'reaction-time-test.html',
      'screen-dead-pixel.html',
      'monitor-motion-blur.html',
      'microphone-test.html',
      'webcam-test.html'
    ];
    for (const rt of requiredTools) {
      if (!dropdownMatch[1].includes(`href="${rt}"`)) {
        console.error(`FAIL [${rel}]: Dropdown missing ${rt}`);
        failed++;
      }
    }
  }

  // Check footer trust links
  const footerMatch = content.match(/<footer class="footer">([\s\S]*?)<\/footer>/);
  if (!footerMatch) {
    console.error(`FAIL [${rel}]: Missing footer`);
    failed++;
  } else {
    const footerHtml = footerMatch[1];
    if (!footerHtml.includes('privacy-policy.html') || !footerHtml.includes('terms-of-service.html') || !footerHtml.includes('about.html') || !footerHtml.includes('contact.html')) {
      console.error(`FAIL [${rel}]: Footer missing trust links`);
      failed++;
    }
  }

  // Check language switcher
  if (!content.includes('id="currentLangBtn"') || !content.includes('id="langDropdownList"')) {
    console.error(`FAIL [${rel}]: Missing language switcher`);
    failed++;
  }

  // Check theme toggle
  if (!content.includes('id="themeToggleBtn"')) {
    console.error(`FAIL [${rel}]: Missing themeToggleBtn`);
    failed++;
  }
});

if (failed === 0) {
  console.log(`✅ ALL ${auditedFiles.length} HTML PAGES PASSED 100% OF BATCH AUDITS!`);
} else {
  console.error(`❌ Total failures: ${failed}`);
  process.exit(1);
}
