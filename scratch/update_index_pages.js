const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'es', 'de', 'fr', 'it', 'ja', 'zh', 'ko', 'hi', 'nl'];

const I18N_DATA = {
  en: {
    lang: 'en',
    title: 'Mouse Scroll & Double Click Test - Switch Chatter Glitch Detector',
    metaDesc: 'Test mouse scroll wheel speed, detect jumpy reverse glitches, and check for double-clicking switch chatter and simultaneous dual-click latency in real time.',
    metaKeywords: 'mouse scroll test, mouse double click test, switch chatter detector, mouse wheel jumping fix, debounce wear test, simultaneous click test, lmb rmb chord test',
    ogTitle: 'Mouse Scroll & Double Click Test - Hardware Diagnostics',
    ogDesc: 'Accurate online tool to detect mouse scroll wheel jumping, switch chatter double-clicks, and simultaneous dual-click latency.',
    heroPill: 'Hardware Signal Diagnostics &amp; Telemetry Suite',
    heroTitle: 'Mouse Scroll Wheel &amp; Double Click Tester',
    heroSubtitle: 'Diagnose scroll wheel bounce-back, microswitch contact chatter (double-clicking), and simultaneous LMB+RMB dual-click synchronization in real time. Choose Free Scroll or timed benchmark sprints.',
    freeScroll: 'Free Scroll',
    sprint15: '15s Sprint',
    benchmark30: '30s Benchmark',
    endurance60: '60s Endurance',
    timeLabel: 'Time:',
    resetBtn: 'Reset',
    exportCsv: 'Export CSV',
    printReport: 'Print / PDF',
    soundLabel: 'Sound',
    debounceLabel: 'Debounce:',
    clickInstructions: '🖱️ Click or Scroll inside this box',
    subInstructions: 'Right-Click &amp; Side Buttons Captured',
    watermark: 'High-Frequency Pointer Event Stream',
    chipLmb: 'Left (LMB)',
    chipMmb: 'Middle (MMB)',
    chipRmb: 'Right (RMB)',
    chipM4: 'Back (M4)',
    chipM5: 'Forward (M5)',
    chipDual: 'Dual LMB+RMB Chord',
    statTotalScrolls: 'Total Scrolls',
    statReverseJumps: 'Reverse Jumps',
    statGlitchRate: 'Glitch Rate',
    statDoubleClicks: 'Double-Click Chatter',
    statDualSync: 'Dual-Click Sync',
    statCurrentSpeed: 'Current Speed',
    statPeakSpeed: 'Peak Burst Speed',
    statAccumulatedY: 'Accumulated Y',
    polarityRatio: 'Scroll Polarity Ratio',
    chartTitle: 'Real-Time Scroll Velocity Stream (120Hz)',
    chartUp: 'Up',
    chartDown: 'Down',
    chartGlitch: 'Glitch',
    logTitle: 'Live Telemetry &amp; Anomaly Event Stream',
    guideBadge: 'Hardware Mechanics &amp; Repair',
    guideTitle: 'Mouse Scroll Glitches &amp; Switch Chatter Explained',
    guideLead: 'Understand what causes scroll wheel jumping, mechanical switch double-clicking, and how to service your gaming mouse.',
    card1Icon: '⚙️',
    card1Title: 'Rotary Encoder Reversal Glitches',
    card1Text: 'Most mice use a mechanical 2-phase rotary encoder. When dust or oxidized lubricant coats the internal metal pins, the quadrature signal skips, causing your screen to jitter or jump in the reverse direction.',
    card2Icon: '⚡',
    card2Title: 'Mechanical Switch Chatter &amp; Double Clicks',
    card2Text: 'Mechanical switches (Omron, Kailh, Huano) rely on a curved copper leaf spring. With wear, the metal fatigued contacts literally bounce upon impact, triggering false rapid double clicks below the debounce threshold.',
    card3Icon: '🎯',
    card3Title: 'Simultaneous Dual-Click (LMB + RMB)',
    card3Text: 'FPS and MOBA mechanics often require pressing Left and Right buttons together (e.g., weapon scope + instant trigger). Our microsecond timer benchmarks how tightly synchronized your dual clicks register.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What causes mouse double-clicking and switch chatter?',
        a: 'Mechanical microswitches use physical copper leaf springs. Over millions of actuations, metal tension weakens and contact surfaces oxidize. When pressed, the contacts bounce for longer than normal (chatter), causing the microcontroller to register two or more clicks within a few milliseconds.'
      },
      {
        q: 'How do I fix a double-clicking mouse?',
        a: '1. Increase the firmware debounce time in your mouse software (e.g. Logitech G Hub, Razer Synapse) from 4ms to 8–12ms. 2. Spray a tiny amount of quick-drying electronic contact cleaner (like WD-40 Specialist Contact Cleaner or DeoxIT) directly into the microswitch actuator and click it 50 times. 3. For a permanent fix, solder in high-durability switches (TTC Gold Dustproof, Huano Blue Shell Pink Dot) or upgrade to optical switch mice which are physically immune to debounce wear.'
      },
      {
        q: 'Why is my mouse scroll wheel jumping in the wrong direction?',
        a: 'Dust, lint, or dried grease accumulates inside the mechanical rotary encoder wheel. When the wiper arms skip an electrical phase, the controller misinterprets the rotation direction, causing erratic jumping.'
      },
      {
        q: 'What is the standard debounce threshold for gaming mice?',
        a: 'Most gaming mice use an internal debounce filter of 4ms to 12ms. If consecutive clicks on the same button register in under 40–80ms during normal human clicking, it is almost certainly a hardware switch chatter defect.'
      }
    ]
  },
  es: {
    lang: 'es',
    title: 'Test de Scroll y Doble Clic del Ratón - Detector de Rebote y Fallos',
    metaDesc: 'Prueba la velocidad del scroll, detecta saltos involuntarios, fallos de doble clic por rebote de microswitch y mide la sincronización de doble clic simultáneo.',
    metaKeywords: 'test scroll raton, test doble clic raton, detector rebote microswitch, raton salta arriba y abajo, prueba pulsacion simultanea, debounce test',
    ogTitle: 'Test de Scroll y Doble Clic del Ratón - Diagnóstico de Hardware',
    ogDesc: 'Herramienta online para detectar saltos del scroll, doble clic no deseado por rebote y latencia de pulsación dual.',
    heroPill: 'Suite de Telemetría y Diagnóstico de Hardware',
    heroTitle: 'Test de Scroll y Doble Clic del Ratón',
    heroSubtitle: 'Diagnostica saltos involuntarios de la rueda, rebote de contactos (doble clic no deseado) y sincronización de pulsación dual LMB+RMB en tiempo real. Elige Scroll Libre o pruebas cronometradas.',
    freeScroll: 'Scroll Libre',
    sprint15: '15s Sprint',
    benchmark30: '30s Benchmark',
    endurance60: '60s Resistencia',
    timeLabel: 'Tiempo:',
    resetBtn: 'Reiniciar',
    exportCsv: 'Exportar CSV',
    printReport: 'Imprimir / PDF',
    soundLabel: 'Sonido',
    debounceLabel: 'Debounce:',
    clickInstructions: '🖱️ Haz clic o gira la rueda aquí',
    subInstructions: 'Clic Derecho y Botones Laterales Capturados',
    watermark: 'Flujo de Eventos de Puntero de Alta Frecuencia',
    chipLmb: 'Izquierdo (LMB)',
    chipMmb: 'Central (MMB)',
    chipRmb: 'Derecho (RMB)',
    chipM4: 'Atrás (M4)',
    chipM5: 'Adelante (M5)',
    chipDual: 'Acorde Dual LMB+RMB',
    statTotalScrolls: 'Total Scrolls',
    statReverseJumps: 'Saltos Inversos',
    statGlitchRate: 'Tasa de Error',
    statDoubleClicks: 'Doble Clic Anómalo',
    statDualSync: 'Delta Doble Clic',
    statCurrentSpeed: 'Velocidad Actual',
    statPeakSpeed: 'Velocidad Máxima',
    statAccumulatedY: 'Y Acumulado',
    polarityRatio: 'Relación de Polaridad del Scroll',
    chartTitle: 'Flujo de Velocidad de Scroll en Tiempo Real (120Hz)',
    chartUp: 'Arriba',
    chartDown: 'Abajo',
    chartGlitch: 'Fallo',
    logTitle: 'Registro de Telemetría y Anomalías en Vivo',
    guideBadge: 'Mecánica de Hardware y Reparación',
    guideTitle: 'Explicación de Fallos de Scroll y Rebote de Doble Clic',
    guideLead: 'Descubre qué causa los saltos de rueda, el doble clic no deseado por fatiga de contactos y cómo solucionarlo.',
    card1Icon: '⚙️',
    card1Title: 'Saltos Inversos del Codificador Rotatorio',
    card1Text: 'La mayoría de ratones usan un codificador mecánico rotativo de dos fases. El polvo o lubricante oxidado en los pines metálicos hace que la señal se salte pasos, provocando saltos bruscos en dirección opuesta.',
    card2Icon: '⚡',
    card2Title: 'Rebote de Contactos (Switch Chatter) y Doble Clic',
    card2Text: 'Los microinterruptores mecánicos (Omron, Kailh, Huano) usan una lámina de cobre elástica. Con el desgaste, los contactos rebotan al impactar, registrando falsos dobles clics por debajo del umbral de debounce.',
    card3Icon: '🎯',
    card3Title: 'Clic Simultáneo Dual (LMB + RMB)',
    card3Text: 'En shooters y MOBAs es crucial pulsar ambos botones al unísono (apuntar + disparar). Nuestro cronómetro mide con precisión de microsegundos la sincronización entre ambos clics.',
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      {
        q: '¿Qué causa el doble clic involuntario en un ratón?',
        a: 'Los microinterruptores mecánicos usan láminas de cobre flexibles. Con el uso prolongado y la oxidación superficial, los contactos rebotan mecánicamente más tiempo del esperado, haciendo que el controlador interprete varios clics en pocos milisegundos.'
      },
      {
        q: '¿Cómo solucionar el problema de doble clic?',
        a: '1. Aumenta el tiempo de debounce en el software del fabricante (Logitech G Hub, Razer Synapse) de 4ms a 8–12ms. 2. Aplica limpiador de contactos electrónicos de secado rápido (como WD-40 Specialist Limpiador de Contactos) en el pulsador y presiónalo 50 veces. 3. Cambia los switches por modelos reforzados (TTC Gold, Huano Blue Shell Pink Dot) o utiliza ratones con switches ópticos.'
      },
      {
        q: '¿Por qué la rueda del ratón salta en dirección contraria?',
        a: 'El polvo y la pelusa se acumulan en el codificador rotatorio mecánico. Al no hacer contacto limpio los terminales, el circuito confunde la fase de giro e invierte el desplazamiento.'
      },
      {
        q: '¿Cuál es el umbral de debounce estándar en ratones gaming?',
        a: 'Los ratones gaming suelen filtrar rebotes entre 4ms y 12ms. Si dos pulsaciones consecutivas ocurren en menos de 40–80ms durante un uso normal, se trata casi seguro de un fallo de rebote de hardware.'
      }
    ]
  },
  de: {
    lang: 'de',
    title: 'Maus Scroll- & Doppelklick-Test - Prellfehler & Schalter-Diagnose',
    metaDesc: 'Testen Sie Ihr Mausrad auf Sprungfehler, erkennen Sie Schalterprellen (ungewollte Doppelklicks) und messen Sie simultane Dual-Klick-Latenz in Echtzeit.',
    metaKeywords: 'maus scroll test, maus doppelklick test, prellfehler tester, mausrad springt, taster debounce test, simultaner mausklick test',
    ogTitle: 'Maus Scroll- & Doppelklick-Test - Hardware-Diagnose',
    ogDesc: 'Online-Tool zur Diagnose von Mausrad-Sprungfehlern, Schalterprellen (Doppelklicks) und synchronen Dual-Klicks.',
    heroPill: 'Hardware-Signaldiagnose &amp; Telemetrie-Suite',
    heroTitle: 'Maus Scrollrad- &amp; Doppelklick-Tester',
    heroSubtitle: 'Diagnostizieren Sie Mausrad-Rücksprünge, Mikroschalter-Prellfehler (ungewollte Doppelklicks) und synchrone LMB+RMB-Klicks in Echtzeit. Wählen Sie Freies Scrollen oder Benchmark-Sprints.',
    freeScroll: 'Freies Scrollen',
    sprint15: '15s Sprint',
    benchmark30: '30s Benchmark',
    endurance60: '60s Ausdauer',
    timeLabel: 'Zeit:',
    resetBtn: 'Zurücksetzen',
    exportCsv: 'CSV Export',
    printReport: 'Drucken / PDF',
    soundLabel: 'Ton',
    debounceLabel: 'Entprellzeit:',
    clickInstructions: '🖱️ Hier klicken oder mit dem Mausrad scrollen',
    subInstructions: 'Rechtsklick &amp; Seitentasten erfasst',
    watermark: 'Hochfrequenz-Zeigerereignis-Stream',
    chipLmb: 'Links (LMB)',
    chipMmb: 'Mitte (MMB)',
    chipRmb: 'Rechts (RMB)',
    chipM4: 'Zurück (M4)',
    chipM5: 'Vor (M5)',
    chipDual: 'Dual LMB+RMB Akkord',
    statTotalScrolls: 'Gesamt-Scrolls',
    statReverseJumps: 'Sprungfehler',
    statGlitchRate: 'Fehlerrate',
    statDoubleClicks: 'Doppelklick-Fehler',
    statDualSync: 'Dual-Klick Delta',
    statCurrentSpeed: 'Aktuelle Geschw.',
    statPeakSpeed: 'Spitzengeschw.',
    statAccumulatedY: 'Y Kumuliert',
    polarityRatio: 'Scroll-Polaritätsverhältnis',
    chartTitle: 'Echtzeit-Scroll-Geschwindigkeits-Stream (120Hz)',
    chartUp: 'Hoch',
    chartDown: 'Runter',
    chartGlitch: 'Fehler',
    logTitle: 'Live-Telemetrie &amp; Anomalie-Protokoll',
    guideBadge: 'Hardware-Mechanik &amp; Reparatur',
    guideTitle: 'Mausrad-Fehler &amp; Schalterprellen im Detail',
    guideLead: 'Erfahren Sie, warum Mausräder rückwärts springen, Mikroschalter ungewollt doppelt klicken und wie Sie Ihre Maus warten.',
    card1Icon: '⚙️',
    card1Title: 'Drehencoder-Rücksprünge',
    card1Text: 'Die meisten Mäuse verwenden mechanische 2-Phasen-Drehencoder. Staub oder oxidiertes Fett auf den Metallkontakten führen zu Signalfehlern, wodurch das Rad in die falsche Richtung springt.',
    card2Icon: '⚡',
    card2Title: 'Schalterprellen (Switch Chatter) & Doppelklicks',
    card2Text: 'Mechanische Taster (Omron, Kailh, Huano) nutzen Blattfedern aus Kupfer. Durch Materialermüdung prellen die Kontakte beim Schließen und lösen ungewollte Mehrfachklicks unterhalb des Debounce-Limits aus.',
    card3Icon: '🎯',
    card3Title: 'Simultaner Dual-Klick (LMB + RMB)',
    card3Text: 'In FPS- und MOBA-Titeln müssen oft Links- und Rechtsklick synchron ausgelöst werden (z. B. Zielen + Schießen). Unser Timer misst die Millisekunden-Genauigkeit Ihrer Doppelklick-Synchronisation.',
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Was verursacht ungewollte Doppelklicks bei Mäusen?',
        a: 'Mechanische Mikroschalter federn beim Schließen nach (Prellen). Mit zunehmendem Alter ermüdet die Metallfeder und die Kontakte oxidieren, wodurch das Prellen länger als die Software-Entprellzeit dauert und Mehrfachklicks entstehen.'
      },
      {
        q: 'Wie kann man einen Doppelklick-Fehler beheben?',
        a: '1. Erhöhen Sie die Debounce-Zeit in der Maussoftware (z. B. Logitech G Hub, Razer Synapse) von 4ms auf 8–12ms. 2. Sprühen Sie Kontaktreiniger (z. B. WD-40 Specialist Kontaktspray) in den Mikroschalter und betätigen Sie ihn mehrmals. 3. Tauschen Sie die Schalter gegen langlebige Modelle (TTC Gold, Huano) oder optische Schalter aus.'
      },
      {
        q: 'Warum springt mein Mausrad in die falsche Richtung?',
        a: 'Staub und Fettreste im Drehencoder verhindern einen sauberen Kontakt der Schleifarme, wodurch der Mikrocontroller die Drehrichtung falsch interpretiert.'
      },
      {
        q: 'Was ist die normale Debounce-Zeit bei Gaming-Mäusen?',
        a: 'Gaming-Mäuse nutzen meist 4ms bis 12ms Entprellzeit. Werden zwei Klicks derselben Taste innerhalb von unter 40–80ms registriert, liegt fast immer ein Schalter-Defekt vor.'
      }
    ]
  },
  fr: {
    lang: 'fr',
    title: 'Test de Molette et Double Clic Souris - Détecteur de Rebond & Pannes',
    metaDesc: 'Testez votre molette de souris, détectez les sauts inverses, les anomalies de double clic (rebond de microswitch) et mesurez la synchronisation double clic.',
    metaKeywords: 'test molette souris, test double clic souris, detecteur rebond interrupteur, molette qui saute, clic simultane souris',
    ogTitle: 'Test de Molette et Double Clic Souris - Diagnostic Matériel',
    ogDesc: 'Outil en ligne pour tester les sauts de molette, le double clic involontaire et la synchronisation des clics simultanés.',
    heroPill: 'Suite de Diagnostic et Télémétrie Matérielle',
    heroTitle: 'Test de Molette &amp; Détecteur de Double Clic',
    heroSubtitle: 'Diagnostiquez les sauts de molette, le rebond des microswitches (double-clic involontaire) et la synchronisation simultanée LMB+RMB en temps réel.',
    freeScroll: 'Défilement Libre',
    sprint15: 'Sprint 15s',
    benchmark30: 'Benchmark 30s',
    endurance60: 'Endurance 60s',
    timeLabel: 'Temps :',
    resetBtn: 'Réinitialiser',
    exportCsv: 'Exporter CSV',
    printReport: 'Imprimer / PDF',
    soundLabel: 'Son',
    debounceLabel: 'Antirebond :',
    clickInstructions: '🖱️ Cliquez ou faites défiler ici',
    subInstructions: 'Clic Droit et Boutons Latéraux Capturés',
    watermark: 'Flux d\'événements de pointeur haute fréquence',
    chipLmb: 'Gauche (LMB)',
    chipMmb: 'Milieu (MMB)',
    chipRmb: 'Droit (RMB)',
    chipM4: 'Retour (M4)',
    chipM5: 'Avance (M5)',
    chipDual: 'Accord Double LMB+RMB',
    statTotalScrolls: 'Total Défilements',
    statReverseJumps: 'Sauts Inverses',
    statGlitchRate: 'Taux d\'Erreur',
    statDoubleClicks: 'Double Clics Anormaux',
    statDualSync: 'Delta Double Clic',
    statCurrentSpeed: 'Vitesse Actuelle',
    statPeakSpeed: 'Vitesse Max',
    statAccumulatedY: 'Y Cumulé',
    polarityRatio: 'Ratio de Polarité de Défilement',
    chartTitle: 'Flux de Vitesse de Défilement en Temps Réel (120Hz)',
    chartUp: 'Haut',
    chartDown: 'Bas',
    chartGlitch: 'Erreur',
    logTitle: 'Journal de Télémétrie et d\'Anomalies en Direct',
    guideBadge: 'Mécanique Matérielle &amp; Réparation',
    guideTitle: 'Comprendre les Pannes de Molette et le Rebond des Switches',
    guideLead: 'Découvrez ce qui cause les sauts de molette, les doubles clics accidentels et comment entretenir votre souris.',
    card1Icon: '⚙️',
    card1Title: 'Sauts Inverses de l\'Encodeur Rotatif',
    card1Text: 'La majorité des souris utilisent un encodeur rotatif mécanique à 2 phases. La poussière et les débris accumulés perturbent le signal de quadrature, provoquant des sauts en sens inverse.',
    card2Icon: '⚡',
    card2Title: 'Rebond de Switch (Chatter) & Double Clics',
    card2Text: 'Les microswitches mécaniques (Omron, Kailh, Huano) utilisent une lamelle en cuivre. L\'usure entraîne un rebond métallique à l\'impact qui enregistre de faux doubles clics.',
    card3Icon: '🎯',
    card3Title: 'Clic Simultané Dual (LMB + RMB)',
    card3Text: 'Dans les FPS et MOBAs, presser les deux boutons simultanément est essentiel. Notre chronomètre mesure avec une précision à la microseconde l\'écart de synchronisation.',
    faqTitle: 'Foire Aux Questions',
    faqs: [
      {
        q: 'Quelle est la cause d\'un double clic involontaire ?',
        a: 'Les microswitches mécaniques utilisent une lame métallique soumise à l\'usure et à l\'oxydation. Lors de l\'appui, les contacts rebondissent plus longtemps que prévu, générant plusieurs signaux électriques consécutifs.'
      },
      {
        q: 'Comment réparer un problème de double clic ?',
        a: '1. Augmentez le délai d\'antirebond (debounce) dans le logiciel constructeur (Logitech G Hub, Razer Synapse) à 8–12ms. 2. Appliquez un nettoyant pour contacts électroniques à séchage rapide dans le switch. 3. Remplacez le microswitch par un modèle renforcé (TTC Gold) ou une souris à switches optiques.'
      },
      {
        q: 'Pourquoi ma molette de souris saute-t-elle en arrière ?',
        a: 'Des poussières et de la graisse séchée encrassent l\'encodeur rotatif mécanique, faussant la détection du sens de rotation par le contrôleur.'
      },
      {
        q: 'Quel est le seuil d\'antirebond normal pour une souris gaming ?',
        a: 'Les souris de jeu appliquent un filtre antirebond entre 4ms et 12ms. Si deux clics du même bouton sont enregistrés en moins de 40–80ms lors d\'un usage normal, il s\'agit d\'un défaut de switch.'
      }
    ]
  },
  it: {
    lang: 'it',
    title: 'Test Rotella e Doppio Clic Mouse - Rilevamento Debounce & Anomalie',
    metaDesc: 'Verifica la rotella del mouse, rileva rimbalzi anomali, errori di doppio clic dovuti al debounce dei microswitch e misura la sincronizzazione dei clic simultanei.',
    metaKeywords: 'test rotella mouse, test doppio clic mouse, debounce microswitch, rotella mouse salta, clic simultaneo lmb rmb',
    ogTitle: 'Test Rotella e Doppio Clic Mouse - Diagnostica Hardware',
    ogDesc: 'Strumento online per rilevare salti della rotella del mouse, doppi clic anomali e latenza di sincronizzazione duale.',
    heroPill: 'Suite di Telemetria e Diagnostica Hardware',
    heroTitle: 'Test Rotella e Rilevatore Doppio Clic',
    heroSubtitle: 'Rileva salti di direzione della rotella, difetti di contatto dei microswitch (doppi clic anomali) e sincronizzazione LMB+RMB in tempo reale.',
    freeScroll: 'Scorrimento Libero',
    sprint15: 'Sprint 15s',
    benchmark30: 'Benchmark 30s',
    endurance60: 'Resistenza 60s',
    timeLabel: 'Tempo:',
    resetBtn: 'Reimposta',
    exportCsv: 'Esporta CSV',
    printReport: 'Stampa / PDF',
    soundLabel: 'Audio',
    debounceLabel: 'Debounce:',
    clickInstructions: '🖱️ Clicca o scorri all\'interno di questo riquadro',
    subInstructions: 'Clic Destro e Pulsanti Laterali Catturati',
    watermark: 'Flusso di eventi puntatore ad alta frequenza',
    chipLmb: 'Sinistro (LMB)',
    chipMmb: 'Centrale (MMB)',
    chipRmb: 'Destro (RMB)',
    chipM4: 'Indietro (M4)',
    chipM5: 'Avanti (M5)',
    chipDual: 'Accordo Duale LMB+RMB',
    statTotalScrolls: 'Scorrimenti Totali',
    statReverseJumps: 'Salti Inversi',
    statGlitchRate: 'Tasso di Errore',
    statDoubleClicks: 'Doppi Clic Anomali',
    statDualSync: 'Delta Doppio Clic',
    statCurrentSpeed: 'Velocità Attuale',
    statPeakSpeed: 'Velocità di Picco',
    statAccumulatedY: 'Y Accumulato',
    polarityRatio: 'Rapporto di Polarità dello Scorrimento',
    chartTitle: 'Flusso di Velocità di Scorrimento in Tempo Reale (120Hz)',
    chartUp: 'Su',
    chartDown: 'Giù',
    chartGlitch: 'Anomalia',
    logTitle: 'Registro Telemetria ed Eventi Anomali in Diretta',
    guideBadge: 'Meccanica Hardware &amp; Riparazione',
    guideTitle: 'Spiegazione dei Salti della Rotella e del Rimbalzo dei Tasti',
    guideLead: 'Scopri le cause dei salti di rotella, dei doppi clic involontari e come eseguire la manutenzione del mouse da gioco.',
    card1Icon: '⚙️',
    card1Title: 'Salti Inversi dell\'Encoder Rotativo',
    card1Text: 'La maggior parte dei mouse utilizza un encoder rotativo meccanico. Polvere o grasso ossidato impediscono il contatto ottimale dei pin, causando salti improvvisi nella direzione opposta.',
    card2Icon: '⚡',
    card2Title: 'Rimbalzo dei Contatti (Chatter) e Doppi Clic',
    card2Text: 'I microswitch meccanici (Omron, Kailh, Huano) utilizzano lamelle di rame. Con l\'usura, i contatti rimbalzano all\'impatto registrando doppi clic anomali sotto la soglia di debounce.',
    card3Icon: '🎯',
    card3Title: 'Clic Simultaneo Duale (LMB + RMB)',
    card3Text: 'Nei titoli FPS e MOBA premere entrambi i tasti all\'unisono è fondamentale. Il nostro timer registra con precisione al microsecondo il delta di sincronizzazione.',
    faqTitle: 'Domande Frequenti',
    faqs: [
      {
        q: 'Cosa causa il doppio clic accidentale del mouse?',
        a: 'I microswitch meccanici si usurano con l\'uso prolungato. L\'ossidazione e la perdita di tensione della lamella metallica aumentano il rimbalzo elettrico (chatter), facendo registrare due clic consecutivi.'
      },
      {
        q: 'Come posso risolvere il doppio clic del mouse?',
        a: '1. Aumenta il tempo di debounce nel software del mouse (Logitech G Hub, Razer Synapse) a 8–12ms. 2. Applica spray detergente per contatti elettronici ad asciugatura rapida nel microswitch. 3. Sostituisci gli interruttori con switch rinforzati (TTC Gold) o passa a un mouse con switch ottici.'
      },
      {
        q: 'Perché la rotella del mouse salta nella direzione sbagliata?',
        a: 'Polvere e residui all\'interno dell\'encoder rotativo meccanico impediscono ai contatti di rilevare correttamente la sequenza di fase.'
      },
      {
        q: 'Qual è la soglia di debounce tipica nei mouse da gaming?',
        a: 'I mouse da gaming impostano filtri di debounce tra 4ms e 12ms. Se due clic sullo stesso tasto avvengono in meno di 40–80ms durante l\'uso normale, si tratta di un difetto hardware.'
      }
    ]
  },
  ja: {
    lang: 'ja',
    title: 'マウススクロール＆チャタリング・ダブルクリック判定テスト',
    metaDesc: 'マウスホイールの逆回転・チャタリング現象、マイクロスイッチの接点劣化による意図しないダブルクリック、左右同時押し同期精度をリアルタイム測定。',
    metaKeywords: 'マウス スクロール テスト, マウス チャタリング テスト, マウス ダブルクリック 判定, ホイール 逆流 直し方, 同時押し 判定',
    ogTitle: 'マウススクロール＆チャタリング・ダブルクリック判定テスト',
    ogDesc: 'ホイールの逆流跳ね返り、スイッチ劣化による意図しないダブルクリック、左右同時クリックのミリ秒同期差をリアルタイム診断。',
    heroPill: 'ハードウェア信号診断＆テレメトリ測定スイート',
    heroTitle: 'マウススクロール＆チャタリング・ダブルクリック測定器',
    heroSubtitle: 'ホイールの逆方向跳ね返り、スイッチ劣化による勝手なダブルクリック（チャタリング）、左右同時クリックのミリ秒同期差をリアルタイム診断。',
    freeScroll: 'フリースクロール',
    sprint15: '15秒測定',
    benchmark30: '30秒ベンチマーク',
    endurance60: '60秒耐久テスト',
    timeLabel: '残り時間:',
    resetBtn: 'リセット',
    exportCsv: 'CSV出力',
    printReport: '印刷 / PDF',
    soundLabel: '効果音',
    debounceLabel: 'チャタリング閾値:',
    clickInstructions: '🖱️ この枠内でクリックまたはホイール回転',
    subInstructions: '右クリック＆サイドボタンも検出中',
    watermark: '高周波ポインターイベントストリーム',
    chipLmb: '左ボタン (LMB)',
    chipMmb: 'ホイール (MMB)',
    chipRmb: '右ボタン (RMB)',
    chipM4: '戻る (M4)',
    chipM5: '進む (M5)',
    chipDual: '左右同時押し (LMB+RMB)',
    statTotalScrolls: '総スクロール数',
    statReverseJumps: '逆流跳ね返り',
    statGlitchRate: 'エラー率',
    statDoubleClicks: 'チャタリング回数',
    statDualSync: '同時押し時間差',
    statCurrentSpeed: '現在速度',
    statPeakSpeed: '最高速度',
    statAccumulatedY: 'Y軸移動量',
    polarityRatio: 'スクロール極性安定度',
    chartTitle: 'リアルタイム・スクロール速度波形 (120Hz)',
    chartUp: '上回転',
    chartDown: '下回転',
    chartGlitch: '逆流エラー',
    logTitle: 'リアルタイム測定ログ＆異常検知ストリーム',
    guideBadge: 'ハードウェア構造と修理ガイド',
    guideTitle: 'マウスホイール逆流とチャタリングの原因と直し方',
    guideLead: 'ホイールの跳ね返りや、マイクロスイッチの劣化による勝手なダブルクリックが発生する仕組みと対策を解説します。',
    card1Icon: '⚙️',
    card1Title: 'ロータリーエンコーダーの逆回転現象',
    card1Text: 'マウスホイールは機械式2相ロータリーエンコーダーを採用しています。内部の金属接点に埃や酸化したグリスが付着すると、信号が乱れて逆方向に画面が跳ね上がります。',
    card2Icon: '⚡',
    card2Title: '接点バウンス（チャタリング）と誤ダブルクリック',
    card2Text: 'メカニカルマイクロスイッチ（オムロン、Kailh等）内部の銅製板バネが摩耗すると、クリック時の物理的なバウンド（チャタリング）が長くなり、1回の押し込みで2回以上のクリックが認識されます。',
    card3Icon: '🎯',
    card3Title: '左右同時クリック（LMB+RMB）同期判定',
    card3Text: 'FPSやMOBAにおいて、照準と発射を同時に行うシーンでは左右の同時押し精度が重要です。マイクロ秒単位で同期誤差を計測します。',
    faqTitle: 'よくある質問（FAQ）',
    faqs: [
      {
        q: 'マウスのチャタリング（勝手なダブルクリック）の原因は何ですか？',
        a: 'メカニカルスイッチ内部の板バネの金属疲労や接点の酸化皮膜が原因です。押した瞬間の接点バウンド時間が長くなり、OS側で2回のクリックと誤認されます。'
      },
      {
        q: 'マウスのチャタリングを直す方法はありますか？',
        a: '1. マウス設定ソフトウェア（Logitech G HUBやRazer Synapse）でデバウンスタイムを8〜12msに引き上げる。 2. 接点復活剤（KURE 2-26や速乾性エレクトロニッククリーナー）をスイッチ内部に少量吹き付ける。 3. 高耐久マイクロスイッチ（TTC Gold、Huano製）へのハンダ交換、または光学式スイッチ（Optical Switch）搭載マウスへの乗り換えを推奨します。'
      },
      {
        q: 'ホイールを回すと上下にガタつく・逆回転するのはなぜですか？',
        a: 'エンコーダー内部の端子に埃や劣化した油脂が詰まり、A相/B相の直交位相信号が正しく読み取れなくなるためです。'
      },
      {
        q: '一般的なゲーミングマウスのデバウンスタイムはどのくらいですか？',
        a: '通常4ms〜12ms前後に設定されています。通常の手動クリック操作において、40〜80ms未満の間隔で連打が認識される場合はスイッチのチャタリング故障と判定できます。'
      }
    ]
  },
  zh: {
    lang: 'zh',
    title: '鼠标滚轮与连点/双击测试 - 微动开关抖动与故障诊断',
    metaDesc: '在线检测鼠标滚轮上下乱跳/回滚故障、微动开关金属弹片氧化导致的双击/连点故障，以及左右键同时按下同步延迟分析。',
    metaKeywords: '鼠标滚轮测试, 鼠标双击测试, 鼠标连点检测, 鼠标滚轮乱跳修复, 左右键同时点击测试, 微动开关消抖',
    ogTitle: '鼠标滚轮与连点/双击测试 - 硬件故障诊断',
    ogDesc: '高精度检测鼠标滚轮上下乱跳、微动开关双击连点故障与左右键双击同步毫秒差。',
    heroPill: '硬件信号诊断与实时遥测套件',
    heroTitle: '鼠标滚轮与微动双击/连点测试',
    heroSubtitle: '实时检测滚轮编码器回滚杂波、微动触点氧化引起的异常双击/连点，以及左右键协同按下的毫秒级时间差。支持自由滚动或限时基准测试。',
    freeScroll: '自由测试',
    sprint15: '15秒极速',
    benchmark30: '30秒基准',
    endurance60: '60秒耐久',
    timeLabel: '剩余时间:',
    resetBtn: '重置',
    exportCsv: '导出 CSV',
    printReport: '打印 / PDF',
    soundLabel: '音效',
    debounceLabel: '消抖阈值:',
    clickInstructions: '🖱️ 在此区域内滚动或点击按键',
    subInstructions: '右键及侧键已启用事件捕获',
    watermark: '高采样率指针事件流',
    chipLmb: '左键 (LMB)',
    chipMmb: '中键 (MMB)',
    chipRmb: '右键 (RMB)',
    chipM4: '后退键 (M4)',
    chipM5: '前进键 (M5)',
    chipDual: '左右双键协同 (LMB+RMB)',
    statTotalScrolls: '总滚动次数',
    statReverseJumps: '回滚乱跳',
    statGlitchRate: '异常故障率',
    statDoubleClicks: '异常双击连点',
    statDualSync: '双键同步差',
    statCurrentSpeed: '当前转速',
    statPeakSpeed: '峰值速度',
    statAccumulatedY: 'Y轴位移总量',
    polarityRatio: '滚动方向极性稳定性',
    chartTitle: '实时滚动速度波形分析 (120Hz)',
    chartUp: '向上',
    chartDown: '向下',
    chartGlitch: '回滚异常',
    logTitle: '实时遥测日志与异常事件流',
    guideBadge: '硬件工作原理与维修指南',
    guideTitle: '鼠标滚轮乱跳与微动连点双击原因剖析',
    guideLead: '深入了解机械编码器回滚杂波与微动开关弹片疲劳抖动的原因及维修方案。',
    card1Icon: '⚙️',
    card1Title: '机械旋转编码器回滚跳帧',
    card1Text: '多数鼠标采用机械式正交编码器。当灰尘、棉絮或氧化油脂阻碍金属触爪接触时，正交波形丢失相位，导致滚轮上下抽搐或反向跳动。',
    card2Icon: '⚡',
    card2Title: '微动开关触点弹跳（连点/双击）',
    card2Text: '欧姆龙、凯华、华诺等机械微动依靠内部铜合金弹片导通。磨损与氧化会导致弹片在接触瞬间产生剧烈的微秒级回弹抖动，从而引发异常连点。',
    card3Icon: '🎯',
    card3Title: '左右键同时触发（LMB + RMB 协同）',
    card3Text: '在FPS射击（开镜即开火）或MOBA技能连招中，左右键的毫秒级同步至关重要。本工具可高精度记录双键触发的时间差。',
    faqTitle: '常见问题解答 (FAQ)',
    faqs: [
      {
        q: '为什么鼠标会出现异常双击/自动连点？',
        a: '机械微动开关内部的铜合金簧片在数百万次按压后会发生金属疲劳与接触点微观氧化。按下时弹片物理抖动时间超过了鼠标芯片的消抖算法阈值，导致系统识别为多次点击。'
      },
      {
        q: '如何修复鼠标双击问题？',
        a: '1. 在鼠标官方驱动（如 Logitech G Hub、Razer Synapse）中适当调高消抖时间（Debounce Time）至 8–12ms。 2. 使用快干型精密电子清洁剂（如 WD-40 触点清洁剂或 DeoxIT）喷入微动缝隙并反复点击50次清除氧化层。 3. 更换高耐久防尘微动（如 TTC 金微动、华诺蓝壳粉点），或选择从物理原理上免疫双击的光学微动鼠标。'
      },
      {
        q: '鼠标滚轮上下乱跳、回滚怎么办？',
        a: '通常是机械编码器内部积灰。可用压缩空气吹除缝隙杂物，或滴入极少量高浓度异丙醇/触点清洁剂并快速转动。若触爪磨损严重则需更换编码器。'
      },
      {
        q: '电竞鼠标的标准消抖时间是多少？',
        a: '一般电竞鼠标硬件消抖在 4ms 到 12ms 之间。若同个按键在正常手速下连续触发间隔低于 40–80ms，通常可判定为微动弹跳老化故障。'
      }
    ]
  },
  ko: {
    lang: 'ko',
    title: '마우스 스크롤 & 더블클릭 불량 테스트 - 스위치 채터링 진단',
    metaDesc: '마우스 휠 튐 및 역주행 현상, 스위치 노후화로 인한 의도치 않은 더블클릭(채터링), 좌우 동시 클릭 동기화 딜레이를 실시간 측정합니다.',
    metaKeywords: '마우스 휠 테스트, 마우스 더블클릭 테스트, 마우스 채터링 테스트, 휠 튕김 수리, 좌우 동시 클릭',
    ogTitle: '마우스 스크롤 & 더블클릭 불량 테스트 - 하드웨어 진단',
    ogDesc: '마우스 휠 튕김, 마이크로스위치 채터링(더블클릭 불량), 좌우 동시 클릭 지연시간을 실시간 진단합니다.',
    heroPill: '하드웨어 신호 진단 &amp; 텔레메트리 측정 스위트',
    heroTitle: '마우스 휠 스크롤 &amp; 더블클릭 채터링 테스터',
    heroSubtitle: '휠 엔코더 역방향 튐 오류, 마이크로스위치 접점 불량으로 인한 더블클릭 현상, 좌우 동시 입력 오차(ms)를 실시간 진단합니다.',
    freeScroll: '자유 스크롤',
    sprint15: '15초 스프린트',
    benchmark30: '30초 벤치마크',
    endurance60: '60초 내구성',
    timeLabel: '남은 시간:',
    resetBtn: '초기화',
    exportCsv: 'CSV 내보내기',
    printReport: '인쇄 / PDF',
    soundLabel: '효과음',
    debounceLabel: '디바운스 기준:',
    clickInstructions: '🖱️ 이 영역 안에서 스크롤하거나 클릭하세요',
    subInstructions: '우클릭 및 측면 버튼 이벤트 감지 중',
    watermark: '초고속 포인터 이벤트 스트림',
    chipLmb: '좌클릭 (LMB)',
    chipMmb: '휠클릭 (MMB)',
    chipRmb: '우클릭 (RMB)',
    chipM4: '뒤로가기 (M4)',
    chipM5: '앞으로가기 (M5)',
    chipDual: '좌우 동시 클릭 (LMB+RMB)',
    statTotalScrolls: '총 스크롤 수',
    statReverseJumps: '역방향 튐 오류',
    statGlitchRate: '오류율',
    statDoubleClicks: '더블클릭 불량',
    statDualSync: '동시 클릭 시간차',
    statCurrentSpeed: '현재 속도',
    statPeakSpeed: '최고 속도',
    statAccumulatedY: '누적 Y축 변위',
    polarityRatio: '스크롤 방향 극성 안정도',
    chartTitle: '실시간 스크롤 속도 파형 분석 (120Hz)',
    chartUp: '위로',
    chartDown: '아래로',
    chartGlitch: '오류',
    logTitle: '실시간 텔레메트리 및 이상 감지 로그',
    guideBadge: '하드웨어 구조 및 수리 가이드',
    guideTitle: '마우스 휠 튕김 및 더블클릭 불량 원인 분석',
    guideLead: '스크롤 휠 오작동과 스위치 채터링으로 인한 의도치 않은 더블클릭 원인 및 해결 방법을 알아보세요.',
    card1Icon: '⚙️',
    card1Title: '로터리 엔코더 역방향 튐 현상',
    card1Text: '대부분의 마우스는 기계식 로터리 엔코더를 사용합니다. 내부 핀에 먼지나 산화된 윤활유가 묻으면 직교 위상 신호가 누락되어 휠이 반대 방향으로 튑니다.',
    card2Icon: '⚡',
    card2Title: '스위치 채터링(바운스)과 불량 더블클릭',
    card2Text: '옴론, 카일, 후아노 등 기계식 스위치는 구리 판스프링을 사용합니다. 마모와 산화로 인해 접점이 튕기는 바운스 시간이 길어지며 의도치 않은 더블클릭이 발생합니다.',
    card3Icon: '🎯',
    card3Title: '좌우 동시 입력 (LMB + RMB)',
    card3Text: 'FPS 및 MOBA 게임에서는 조준과 사격을 동시에 수행하는 동기화 반응 속도가 중요합니다. 마이크로초 정밀도로 동시 클릭 딜레이를 측정합니다.',
    faqTitle: '자주 묻는 질문 (FAQ)',
    faqs: [
      {
        q: '마우스 더블클릭 불량(채터링)의 원인은 무엇인가요?',
        a: '마이크로스위치 내부 구리 금속판의 피로 누적 및 접점 산화 때문입니다. 클릭 시 접점이 미세하게 튕기는 시간이 마우스 디바운스 알고리즘 기준을 초과하여 두 번 누른 것으로 인식됩니다.'
      },
      {
        q: '더블클릭 현상을 어떻게 해결하나요?',
        a: '1. 마우스 전용 소프트웨어(Logitech G HUB, Razer Synapse 등)에서 디바운스 타임(Debounce Time)을 8~12ms로 높입니다. 2. 속건성 접점부활제(BW-100 등)를 스위치 틈새에 분사하고 50회 이상 클릭합니다. 3. 내구성 높은 스위치(TTC 골드, 후아노)로 교체 납땜하거나 물리적 더블클릭이 없는 광축(Optical) 마우스로 교체합니다.'
      },
      {
        q: '마우스 휠이 반대로 튕기거나 헛도는 이유는 무엇인가요?',
        a: '엔코더 내부 접점에 먼지와 굳은 그리스가 쌓여 회전 위상 신호를 메인 컨트롤러가 반대 방향으로 잘못 인식하기 때문입니다.'
      },
      {
        q: '게이밍 마우스의 표준 디바운스 시간은 얼마인가요?',
        a: '통상 4ms~12ms 수준입니다. 정상적인 사람의 클릭 속도에서 동일 버튼이 40~80ms 미만으로 연속 인식된다면 스위치 채터링 불량입니다.'
      }
    ]
  },
  hi: {
    lang: 'hi',
    title: 'माउस स्क्रॉल और डबल क्लिक टेस्ट - स्विच चटरिंग और डिबाउंस डिटेक्टर',
    metaDesc: 'माउस स्क्रॉल व्हील की जंपिंग, माइक्रोस्विच खराबी के कारण होने वाले अनचाहे डबल-क्लिक (चटरिंग), और दोनों बटन एक साथ दबाने का रिफ्लेक्स टेस्ट करें।',
    metaKeywords: 'माउस स्क्रॉल टेस्ट, माउस डबल क्लिक टेस्ट, माउस स्विच चटरिंग, माउस व्हील रिपेयर, simultanous click test hindi',
    ogTitle: 'माउस स्क्रॉल और डबल क्लिक टेस्ट - हार्डवेयर डायग्नोस्टिक्स',
    ogDesc: 'माउस व्हील जंपिंग, स्विच चटरिंग डबल क्लिक और साइमल्टेनियस डुअल क्लिक लेटेंसी का रीयल-टाइम टेस्ट।',
    heroPill: 'हार्डवेयर सिग्नल डायग्नोस्टिक्स और टेलीमेट्री सुइट',
    heroTitle: 'माउस स्क्रॉल व्हील और डबल-क्लिक टेस्टर',
    heroSubtitle: 'व्हील के गलत दिशा में उछलने, स्विच घिसाव के कारण अनपेक्षित डबल क्लिक, और एक साथ बाएँ+दाएँ क्लिक के समय अंतर का रीयल-टाइम डायग्नोसिस।',
    freeScroll: 'फ्री स्क्रॉल',
    sprint15: '15s स्प्रिंट',
    benchmark30: '30s बेंचमार्क',
    endurance60: '60s सहनशक्ति',
    timeLabel: 'समय शेष:',
    resetBtn: 'रीसेट',
    exportCsv: 'CSV निर्यात',
    printReport: 'प्रिंट / PDF',
    soundLabel: 'ध्वनि',
    debounceLabel: 'डिबाउंस सीमा:',
    clickInstructions: '🖱️ इस बॉक्स के अंदर क्लिक या स्क्रॉल करें',
    subInstructions: 'राइट-क्लिक और साइड बटन कैप्चर किए गए',
    watermark: 'हाई-फ्रीक्वेंसी पॉइंटर इवेंट स्ट्रीम',
    chipLmb: 'बायाँ (LMB)',
    chipMmb: 'मध्य (MMB)',
    chipRmb: 'दायाँ (RMB)',
    chipM4: 'पीछे (M4)',
    chipM5: 'आगे (M5)',
    chipDual: 'डुअल LMB+RMB कॉर्ड',
    statTotalScrolls: 'कुल स्क्रॉल',
    statReverseJumps: 'विपरीत जंप',
    statGlitchRate: 'त्रुटि दर',
    statDoubleClicks: 'डबल-क्लिक विसंगति',
    statDualSync: 'डुअल क्लिक अंतर',
    statCurrentSpeed: 'वर्तमान गति',
    statPeakSpeed: 'उच्चतम गति',
    statAccumulatedY: 'संचित Y विस्थापन',
    polarityRatio: 'स्क्रॉल पोलारिटी अनुपात',
    chartTitle: 'रीयल-टाइम स्क्रॉल गति तरंग (120Hz)',
    chartUp: 'ऊपर',
    chartDown: 'नीचे',
    chartGlitch: 'गड़बड़ी',
    logTitle: 'लाइव टेलीमेट्री और इवेंट स्ट्रीम',
    guideBadge: 'हार्डवेयर यांत्रिकी और मरम्मत',
    guideTitle: 'माउस व्हील जंप और स्विच चटरिंग का पूरा विवरण',
    guideLead: 'जानें कि माउस का पहिया गलत दिशा में क्यों उछलता है और स्विच घिसने पर अनचाहे डबल-क्लिक कैसे ठीक करें।',
    card1Icon: '⚙️',
    card1Title: 'रोटरी एनकोडर रिवर्सल ग्लिच',
    card1Text: 'ज्यादातर माउस 2-फेज मैकेनिकल रोटरी एनकोडर का उपयोग करते हैं। जब धूल या सूखा ग्रीस पिन को रोकता है, तो सिग्नल छूट जाता है और स्क्रीन उल्टी दिशा में कूदती है।',
    card2Icon: '⚡',
    card2Title: 'स्विच चटरिंग और अनचाहा डबल-क्लिक',
    card2Text: 'मैकेनिकल माइक्रोस्विच में कॉपर लीफ स्प्रिंग होती है। उम्र के साथ धातु थक जाती है और क्लिक करने पर बाउंस बढ़ जाता है, जिससे स्वतः दो बार क्लिक दर्ज होता है।',
    card3Icon: '🎯',
    card3Title: 'साइमल्टेनियस डुअल क्लिक (LMB + RMB)',
    card3Text: 'गेमिंग में बाएँ और दाएँ बटन को एक साथ दबाने का समन्वय बहुत महत्वपूर्ण है। हमारा टाइमर माइक्रोसेकंड में दोनों क्लिक के बीच का अंतर मापता है।',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    faqs: [
      {
        q: 'माउस में अनचाहे डबल-क्लिक का क्या कारण है?',
        a: 'माइक्रोस्विच के अंदर मौजूद तांबे की स्प्रिंग का घिस जाना और संपर्क सतह पर ऑक्सीडेशन होना। इससे स्विच का बाउंस समय बढ़ जाता है और कंप्यूटर एक ही बार में दो क्लिक रजिस्टर कर लेता है।'
      },
      {
        q: 'माउस के डबल-क्लिक को कैसे ठीक करें?',
        a: '1. माउस सॉफ्टवेयर में डिबाउंस टाइम 8-12ms पर सेट करें। 2. कॉन्टैक्ट क्लीनर स्प्रे (जैसे WD-40 Specialist Contact Cleaner) को स्विच में छिड़कें। 3. पुराने स्विच को नए TTC Gold या ऑप्टिकल स्विच से बदलें।'
      },
      {
        q: 'माउस का स्क्रॉल व्हील उल्टी दिशा में क्यों भागता है?',
        a: 'रोटरी एनकोडर के अंदर धूल और सूखा ग्रीस जमा होने से कंट्रोलर घूमने की सही दिशा नहीं पहचान पाता।'
      },
      {
        q: 'गेमिंग माउस के लिए सामान्य डिबाउंस टाइम क्या है?',
        a: 'आमतौर पर 4ms से 12ms। यदि सामान्य उपयोग में 40–80ms से कम समय में दो क्लिक होते हैं, तो यह स्विच खराबी है।'
      }
    ]
  },
  nl: {
    lang: 'nl',
    title: 'Muis Scroll- & Dubbelklik Test - Switch Chatter & Debounce Detector',
    metaDesc: 'Test uw muiswielsnelheid, detecteer terugspringende scrollfouten, microswitch-chatter (ongewenste dubbelklikken) en meet gelijktijdige kliksynchronisatie.',
    metaKeywords: 'muis scroll test, muis dubbelklik test, switch chatter detector, muiswiel springt, microswitch debounce test',
    ogTitle: 'Muis Scroll- & Dubbelklik Test - Hardware Diagnostiek',
    ogDesc: 'Nauwkeurige online tool voor het detecteren van muiswiel-terugsprongen, dubbelklikfouten en synchronisatie van dubbele klikken.',
    heroPill: 'Hardware Signaaldiagnostiek &amp; Telemetrie Suite',
    heroTitle: 'Muis Scrollwiel &amp; Dubbelklik Tester',
    heroSubtitle: 'Diagnosticeer terugspringende scrollwielen, microswitch-contactstuiteren (ongewenste dubbelklikken) en gelijktijdige LMB+RMB-kliksnelheid in realtime.',
    freeScroll: 'Vrij Scrollen',
    sprint15: '15s Sprint',
    benchmark30: '30s Benchmark',
    endurance60: '60s Uithouding',
    timeLabel: 'Tijd:',
    resetBtn: 'Resetten',
    exportCsv: 'Exporteer CSV',
    printReport: 'Afdrukken / PDF',
    soundLabel: 'Geluid',
    debounceLabel: 'Debounce:',
    clickInstructions: '🖱️ Klik of scroll binnen dit kader',
    subInstructions: 'Rechtermuisknop &amp; Zijknoppen Vastgelegd',
    watermark: 'Hoogfrequente Aanwijzer-Gebeurtenisstroom',
    chipLmb: 'Links (LMB)',
    chipMmb: 'Midden (MMB)',
    chipRmb: 'Rechts (RMB)',
    chipM4: 'Terug (M4)',
    chipM5: 'Vooruit (M5)',
    chipDual: 'Duo LMB+RMB Akkoord',
    statTotalScrolls: 'Totaal Scrolls',
    statReverseJumps: 'Terugsprongen',
    statGlitchRate: 'Foutpercentage',
    statDoubleClicks: 'Dubbelklik Fout',
    statDualSync: 'Duo-Klik Delta',
    statCurrentSpeed: 'Huidige Snelheid',
    statPeakSpeed: 'Pieksnelheid',
    statAccumulatedY: 'Y Gecumuleerd',
    polarityRatio: 'Scroll-Polariteitsverhouding',
    chartTitle: 'Realtime Scroll Snelheidsgolfvorm (120Hz)',
    chartUp: 'Omhoog',
    chartDown: 'Omlaag',
    chartGlitch: 'Fout',
    logTitle: 'Live Telemetrie &amp; Anomalie-Gebeurtenissen',
    guideBadge: 'Hardware Mechanica &amp; Reparatie',
    guideTitle: 'Muiswiel Fouten &amp; Switch Chatter Uitgelegd',
    guideLead: 'Ontdek waarom muiswielen terugspringen, schakelaars ongewenst dubbelklikken en hoe u uw muis kunt onderhouden.',
    card1Icon: '⚙️',
    card1Title: 'Rotary Encoder Terugsprongfouten',
    card1Text: 'De meeste muizen gebruiken een mechanische 2-fasen roterende encoder. Stof of geoxideerd smeermiddel veroorzaakt haperingen in het signaal waardoor het scherm de verkeerde kant op springt.',
    card2Icon: '⚡',
    card2Title: 'Switch Chatter & Ongewenste Dubbelklikken',
    card2Text: 'Mechanische microswitches (Omron, Kailh, Huano) gebruiken koperen bladveren. Bij slijtage stuiteren de contacten bij impact, waardoor valse dubbelklikken onder de debounce-drempel worden geregistreerd.',
    card3Icon: '🎯',
    card3Title: 'Gelijktijdige Duo-Klik (LMB + RMB)',
    card3Text: 'Bij FPS- en MOBA-games is het gelijktijdig indrukken van beide knoppen essentieel. Onze timer meet met microseconde-precisie de onderlinge synchronisatielatentie.',
    faqTitle: 'Veelgestelde Vragen (FAQ)',
    faqs: [
      {
        q: 'Wat veroorzaakt ongewenste dubbelklikken bij een muis?',
        a: 'Mechanische microswitches slijten na miljoenen klikken. Door metaalmoeheid en contactoxidatie stuiteren de contacten langer dan normaal (chatter), waardoor de controller twee klikken registreert.'
      },
      {
        q: 'Hoe los ik een dubbelklikfout op?',
        a: '1. Verhoog de debounce-tijd in de software van uw muis (Logitech G Hub, Razer Synapse) naar 8–12ms. 2. Spuit een kleine hoeveelheid sneldrogende contactspray in de microswitch. 3. Soldeer duurzamere schakelaars (TTC Gold) in of stap over op een muis met optische switches.'
      },
      {
        q: 'Waarom springt mijn muiswiel de verkeerde kant op?',
        a: 'Stof en vuil in de mechanische encoder verstoren de elektrische fasen, waardoor de controller de draairichting verkeerd interpreteert.'
      },
      {
        q: 'Wat is de standaard debounce-tijd voor gamingmuizen?',
        a: 'Gamingmuizen hanteren meestal 4ms tot 12ms. Als opeenvolgende klikken op dezelfde knop binnen 40–80ms plaatsvinden bij normaal gebruik, is er sprake van schakelaarslijtage.'
      }
    ]
  }
};

function generateIndexHtml(loc) {
  const d = I18N_DATA[loc] || I18N_DATA.en;
  const isSubdir = loc !== 'en';
  const canonicalUrl = isSubdir ? `https://mousetester.pages.dev/${loc}/` : 'https://mousetester.pages.dev/';
  const assetPrefix = isSubdir ? '../' : './';

  const faqSchemaItems = d.faqs.map(f => `          {
            "@type": "Question",
            "name": "${f.q.replace(/"/g, '\\"')}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${f.a.replace(/"/g, '\\"')}"
            }
          }`).join(',\n');

  const faqHtmlItems = d.faqs.map(f => `          <div class="faq-item">
            <button class="faq-question">
              <span>${f.q}</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="faq-answer">
              <p>${f.a}</p>
            </div>
          </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="${d.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${d.title}</title>
  <meta name="description" content="${d.metaDesc}">
  <meta name="keywords" content="${d.metaKeywords}">
  <meta name="author" content="MouseTester.io">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Alternate hreflang tags -->
  <link rel="alternate" hreflang="en" href="https://mousetester.pages.dev/">
  <link rel="alternate" hreflang="es" href="https://mousetester.pages.dev/es/">
  <link rel="alternate" hreflang="de" href="https://mousetester.pages.dev/de/">
  <link rel="alternate" hreflang="fr" href="https://mousetester.pages.dev/fr/">
  <link rel="alternate" hreflang="it" href="https://mousetester.pages.dev/it/">
  <link rel="alternate" hreflang="ja" href="https://mousetester.pages.dev/ja/">
  <link rel="alternate" hreflang="zh" href="https://mousetester.pages.dev/zh/">
  <link rel="alternate" hreflang="ko" href="https://mousetester.pages.dev/ko/">
  <link rel="alternate" hreflang="hi" href="https://mousetester.pages.dev/hi/">
  <link rel="alternate" hreflang="nl" href="https://mousetester.pages.dev/nl/">
  <link rel="alternate" hreflang="x-default" href="https://mousetester.pages.dev/">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${d.ogTitle}">
  <meta property="og:description" content="${d.ogDesc}">

  <!-- Theme & Fonts -->
  <meta name="theme-color" content="#0a0d14">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${assetPrefix}style.css">
  <script src="${assetPrefix}theme-i18n.js"></script>

  <!-- Schema.org JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "${canonicalUrl}#webapp",
        "name": "MouseTester.io - ${d.heroTitle}",
        "url": "${canonicalUrl}",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
        "description": "${d.metaDesc}",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "${canonicalUrl}#faq",
        "mainEntity": [
${faqSchemaItems}
        ]
      }
    ]
  }
  </script>
</head>
<body>
  <!-- Top Navigation Hub -->
  <header class="navbar"></header>

  <!-- Main Layout -->
  <main class="container" id="testSection">
    
    <!-- Hero Header -->
    <div class="hero-header">
      <div class="hero-pill">
        <span class="pulse-dot"></span>
        <span>${d.heroPill}</span>
      </div>
      <h1 class="hero-title">${d.heroTitle}</h1>
      <p class="hero-subtitle">
        ${d.heroSubtitle}
      </p>
    </div>

    <!-- Duration / Mode Selector Bar -->
    <div class="mode-selector-bar">
      <div class="mode-buttons">
        <button class="mode-btn active" data-seconds="0">${d.freeScroll}</button>
        <button class="mode-btn" data-seconds="15">${d.sprint15}</button>
        <button class="mode-btn" data-seconds="30">${d.benchmark30}</button>
        <button class="mode-btn" data-seconds="60">${d.endurance60}</button>
      </div>

      <div id="timerContainer" class="timer-container">
        <div class="timer-ring"></div>
        <span>${d.timeLabel} <strong id="timerText" style="color:var(--accent-cyan);">${d.freeScroll}</strong></span>
      </div>
    </div>

    <!-- Timer Countdown Progress Bar -->
    <div id="timerProgressBar" class="timer-progress-bar">
      <div id="timerProgressFill" class="timer-progress-fill"></div>
    </div>

    <!-- Main Testing Grid -->
    <div class="app-grid">
      
      <!-- Interactive Stage Column -->
      <section class="glass-panel">
        <div class="control-bar">
          <div class="toolbar-group">
            <button id="resetBtn" class="btn btn-danger">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
              ${d.resetBtn}
            </button>
            <button id="exportCsvBtn" class="btn btn-cyan">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              ${d.exportCsv}
            </button>
            <button id="printReportBtn" class="btn btn-secondary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              ${d.printReport}
            </button>
          </div>

          <div class="toolbar-group" style="display:flex; align-items:center; gap:0.85rem;">
            <div class="debounce-control" title="Debounce threshold for detecting microswitch chatter">
              <span>${d.debounceLabel}</span>
              <select id="debounceThresholdSelect" class="debounce-select">
                <option value="40">40 ms</option>
                <option value="60">60 ms</option>
                <option value="80" selected>80 ms</option>
                <option value="100">100 ms</option>
                <option value="120">120 ms</option>
              </select>
            </div>

            <label class="toggle-switch" title="Play audible click/whirr audio feedback">
              <span>${d.soundLabel}</span>
              <input type="checkbox" id="soundToggle" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <!-- Capture Stage -->
        <div id="testStage" class="test-stage" tabindex="0">
          <div class="stage-instructions">
            <span>${d.clickInstructions}</span>
            <span style="color:var(--accent-cyan)">${d.subInstructions}</span>
          </div>

          <!-- Vector Mouse Visualizer SVG -->
          <div class="mouse-svg-wrapper">
            <svg class="mouse-svg" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              <filter id="mouseGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.5"/>
              </filter>

              <!-- Main Body Shell -->
              <path class="mouse-body" filter="url(#mouseGlow)" d="M 45,100 C 45,35 65,15 100,15 C 135,15 155,35 155,100 C 155,190 165,240 145,285 C 130,315 70,315 55,285 C 35,240 45,190 45,100 Z" />
              <path class="mouse-accent-lines" d="M 68,200 C 85,250 115,250 132,200" />
              <path class="mouse-accent-lines" d="M 75,230 C 90,265 110,265 125,230" />

              <!-- Left & Right Buttons -->
              <path id="svgBtnLeft" class="mouse-btn" d="M 52,95 C 50,45 68,24 95,22 L 95,115 C 72,115 54,110 52,95 Z" />
              <path id="svgBtnRight" class="mouse-btn" d="M 148,95 C 150,45 132,24 105,22 L 105,115 C 128,115 146,110 148,95 Z" />

              <!-- Center Wheel Well -->
              <rect x="91" y="32" width="18" height="58" rx="9" fill="#0d121c" stroke="#253046" stroke-width="2"/>

              <!-- Scroll Wheel (MMB) -->
              <g id="svgWheel" class="mouse-wheel">
                <rect x="93" y="35" width="14" height="52" rx="7" />
                <line x1="95" y1="46" x2="105" y2="46" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="95" y1="56" x2="105" y2="56" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="95" y1="66" x2="105" y2="66" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="95" y1="76" x2="105" y2="76" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>
              </g>

              <!-- Side Buttons (M4 Back / M5 Forward) -->
              <path id="svgBtnBack" class="mouse-btn btn-side" d="M 40,165 C 38,150 38,135 41,122 L 47,126 C 45,138 45,150 47,162 Z" />
              <path id="svgBtnForward" class="mouse-btn btn-side" d="M 41,118 C 38,105 38,92 42,80 L 48,84 C 45,95 45,107 47,114 Z" />

              <!-- Text Indicators -->
              <text x="73" y="75" fill="#64748b" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">LMB</text>
              <text x="127" y="75" fill="#64748b" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">RMB</text>
              <text x="24" y="102" fill="#64748b" font-size="9" font-weight="700" font-family="sans-serif">M5</text>
              <text x="24" y="146" fill="#64748b" font-size="9" font-weight="700" font-family="sans-serif">M4</text>
            </svg>
          </div>

          <!-- Tilt Wheel Horizontal Indicators -->
          <div class="wheel-tilt-indicator">
            <span id="tiltLeftIndicator" class="tilt-arrow">◀ Tilt Left</span>
            <span id="tiltRightIndicator" class="tilt-arrow">Tilt Right ▶</span>
          </div>

          <!-- Direction Alert Overlay -->
          <div class="scroll-arrow-indicator">
            <div id="directionBadge" class="direction-badge">▲ Scrolling UP</div>
          </div>

          <!-- Real-Time Glitch Alert Notification -->
          <div id="glitchToast" class="glitch-toast">
            ⚠️ Hardware Reverse Glitch Detected!
          </div>

          <div class="stage-watermark">${d.watermark}</div>

          <!-- Stage Lock Overlay upon Timed Mode Completion -->
          <div id="stageLockOverlay" class="stage-lock-overlay">
            <div id="lockVerdictBadge" class="verdict-badge-large clean">
              ✅ Clean Hardware Signal
            </div>
            <p id="lockDetailsText" style="color:var(--text-muted); font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem; max-width:460px;">
              Your timed test completed with 0 reverse jump anomalies.
            </p>
            <div style="display:flex; gap:0.75rem;">
              <button id="restartTimedBtn" class="btn btn-secondary">Run Another Test</button>
            </div>
          </div>
        </div>

        <!-- Button Status State Grid (Including Dual LMB+RMB Chord) -->
        <div class="button-state-grid" style="grid-template-columns: repeat(6, 1fr);">
          <div id="chipLmb" class="button-chip">
            <span class="chip-name">${d.chipLmb}</span>
            <span class="chip-count">0</span>
          </div>
          <div id="chipMmb" class="button-chip">
            <span class="chip-name">${d.chipMmb}</span>
            <span class="chip-count">0</span>
          </div>
          <div id="chipRmb" class="button-chip">
            <span class="chip-name">${d.chipRmb}</span>
            <span class="chip-count">0</span>
          </div>
          <div id="chipM4" class="button-chip">
            <span class="chip-name">${d.chipM4}</span>
            <span class="chip-count">0</span>
          </div>
          <div id="chipM5" class="button-chip">
            <span class="chip-name">${d.chipM5}</span>
            <span class="chip-count">0</span>
          </div>
          <div id="chipDualClick" class="button-chip dual-chord">
            <span class="chip-name">${d.chipDual}</span>
            <span class="chip-count"><span id="chipDualCount">0</span> (<span id="chipDualDelta" style="font-size:0.75rem; color:var(--accent-cyan);">-- ms</span>)</span>
          </div>
        </div>
      </section>

      <!-- Metrics & Real-Time Waveform Column -->
      <section class="metrics-column">
        
        <!-- Live Stat Cards Grid -->
        <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="stat-card highlight">
            <div class="stat-label">
              <span>${d.statTotalScrolls}</span>
              <span class="stat-badge">Ticks</span>
            </div>
            <div class="stat-value" id="statTotalScrolls">0</div>
          </div>

          <div class="stat-card alert-card">
            <div class="stat-label">
              <span>${d.statReverseJumps}</span>
              <span class="stat-badge">Glitches</span>
            </div>
            <div class="stat-value" id="statGlitches">0</div>
          </div>

          <div class="stat-card alert-card">
            <div class="stat-label">
              <span>${d.statDoubleClicks}</span>
              <span class="stat-badge">Chatter</span>
            </div>
            <div class="stat-value" id="statDoubleClicks" style="color:var(--accent-rose);">0</div>
          </div>

          <div class="stat-card">
            <div class="stat-label">
              <span>${d.statDualSync}</span>
              <span class="stat-badge">Sync</span>
            </div>
            <div class="stat-value" id="statDualSync" style="color:var(--accent-cyan);">--</div>
          </div>

          <div class="stat-card">
            <div class="stat-label">
              <span>${d.statGlitchRate}</span>
              <span class="stat-badge">Error %</span>
            </div>
            <div class="stat-value" id="statGlitchRate">0.0%</div>
          </div>

          <div class="stat-card">
            <div class="stat-label">
              <span>${d.statCurrentSpeed}</span>
              <span class="stat-badge">Live</span>
            </div>
            <div class="stat-value"><span id="statCurrentSpeed">0</span><span class="stat-unit">evt/s</span></div>
          </div>

          <div class="stat-card">
            <div class="stat-label">
              <span>${d.statPeakSpeed}</span>
              <span class="stat-badge">Max</span>
            </div>
            <div class="stat-value"><span id="statPeakSpeed">0</span><span class="stat-unit">evt/s</span></div>
          </div>

          <div class="stat-card">
            <div class="stat-label">
              <span>${d.statAccumulatedY}</span>
              <span class="stat-badge" id="statDeltaMode">Pixels</span>
            </div>
            <div class="stat-value" id="statAccumulatedY">0px</div>
          </div>
        </div>

        <!-- Polarity Ratio Track Bar -->
        <div class="polarity-bar-card">
          <div class="polarity-header">
            <span>${d.polarityRatio}</span>
            <span id="polarityText" style="color:var(--accent-cyan);">100% Dominant / 0% Opposing</span>
          </div>
          <div class="polarity-track">
            <div id="polarityFill" class="polarity-dominant-fill"></div>
          </div>
        </div>

        <!-- 120Hz Oscilloscope Waveform Canvas -->
        <div class="chart-container">
          <div class="chart-header">
            <div class="chart-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              ${d.chartTitle}
            </div>
            <div class="chart-legend">
              <span class="legend-item"><span class="legend-dot blue"></span> ${d.chartUp}</span>
              <span class="legend-item"><span class="legend-dot purple"></span> ${d.chartDown}</span>
              <span class="legend-item"><span class="legend-dot red"></span> ${d.chartGlitch}</span>
            </div>
          </div>
          <canvas id="scrollWaveCanvas"></canvas>
        </div>

      </section>

    </div>

    <!-- Diagnostic Verdict Banner -->
    <div id="healthBanner" class="health-verdict-banner">
      <div id="verdictIcon" class="verdict-icon">✨</div>
      <div class="verdict-content">
        <h3 id="verdictTitle" class="verdict-title">Ready for Diagnostic Testing</h3>
        <p id="verdictDesc" class="verdict-desc">
          Scroll your wheel continuously up and down inside the test stage and click buttons to check for rotary encoder bounce and switch chatter double clicks.
        </p>
      </div>
    </div>

    <!-- Real-time Event Telemetry Log -->
    <div class="log-card">
      <div class="log-header">
        <div class="log-title">${d.logTitle}</div>
        <span style="font-size:0.75rem; color:var(--text-subtle);">Real-Time Microsecond Precision</span>
      </div>
      <div id="eventLogList" class="log-list"></div>
    </div>

    <!-- Technical Guide & SEO Content Section -->
    <section class="content-section">
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span class="section-badge">${d.guideBadge}</span>
        <h2 class="section-title">${d.guideTitle}</h2>
        <p class="section-lead">${d.guideLead}</p>
      </div>

      <div class="guide-grid">
        <div class="guide-card">
          <div class="guide-card-icon">${d.card1Icon}</div>
          <h3>${d.card1Title}</h3>
          <p>${d.card1Text}</p>
        </div>

        <div class="guide-card">
          <div class="guide-card-icon">${d.card2Icon}</div>
          <h3>${d.card2Title}</h3>
          <p>${d.card2Text}</p>
        </div>

        <div class="guide-card">
          <div class="guide-card-icon">${d.card3Icon}</div>
          <h3>${d.card3Title}</h3>
          <p>${d.card3Text}</p>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section" id="faq">
        <h2 class="section-title" style="text-align: center; margin-bottom: 2rem;">${d.faqTitle}</h2>
        <div class="faq-list">
${faqHtmlItems}
        </div>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="footer"></footer>

  <script src="${assetPrefix}app.js"></script>
</body>
</html>
`;
}

// Generate all index.html files
LOCALES.forEach(loc => {
  const filePath = loc === 'en' ? 'index.html' : path.join(loc, 'index.html');
  const html = generateIndexHtml(loc);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated ${filePath} with Double Click & Dual-Click Telemetry`);
});

console.log('--- RE-RUNNING MASTER BUILD & AUDIT PIPELINE ---');
require('./master_build.js');
