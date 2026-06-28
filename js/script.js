/* =========================================================
   Marko Trajkovski – Portfolio
   script.js  (Vanilla JS, no dependencies)
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Helpers ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (Dark default + persist) ---------- */
  const root = document.documentElement;
  const themeToggle = $('#themeToggle');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) root.setAttribute('data-theme', storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* =========================================================
     i18n – Sprachumschalter (DE / EN)
     ========================================================= */
  let currentLang = localStorage.getItem('lang') || 'de';

  // Übersetzungswörterbuch: normalisierter DE-Text -> EN
  const I18N = {
    // Navigation
    "Über mich": "About",
    "Projekte": "Projects",
    "Lebenslauf": "CV",
    "Kontakt": "Contact",
    // Hero
    "Verfügbar für Junior-Positionen & Praktika": "Available for junior positions & internships",
    "Ich verbinde Technologie und Wirtschaft, um strukturierte, benutzerfreundliche und praxisnahe digitale Lösungen zu entwickeln.":
      "I combine technology and business to build structured, user-friendly and practical digital solutions.",
    "Projekte ansehen": "View Projects",
    "Kontakt aufnehmen": "Get in Touch",
    "Wien, Österreich": "Vienna, Austria",
    "HAK – IT & Wirtschaft": "HAK – IT & Business",
    // Section: About
    "01 — Über mich": "01 — About",
    "Technisch versiert. Wirtschaftlich denkend.": "Technically skilled. Business-minded.",
    "Ich bin Absolvent der Handelsakademie (HAK) mit Schwerpunkt":
      "I'm a graduate of the Austrian Business Academy (HAK) specializing in",
    "IT & Wirtschaft": "IT & Business",
    "aus Wien. Meine Ausbildung verbindet technisches Know-how mit betriebswirtschaftlichem Verständnis – eine Kombination, die mir hilft, Probleme strukturiert zu analysieren und praxisnahe Lösungen zu entwickeln.":
      "based in Vienna. My education combines technical know-how with business understanding — a mix that helps me analyse problems in a structured way and build practical solutions.",
    "Mein besonderes Interesse gilt der": "I'm especially interested in",
    "Softwareentwicklung": "Software Development",
    "Webentwicklung": "Web Development",
    "Datenbanken": "Databases",
    "und der": "and",
    "Wirtschaftsinformatik": "Business Informatics",
    ". In mehreren praxisorientierten Projekten habe ich gelernt, Anforderungen zu durchdenken, sauberen Code zu schreiben und Ergebnisse verständlich zu präsentieren.":
      ". In several hands-on projects I learned to think requirements through, write clean code and present results clearly.",
    "Motivierter Berufseinsteiger": "Motivated career starter",
    "Strukturierter Problemlöser": "Structured problem solver",
    "Analytischer Denker": "Analytical thinker",
    "Lernbereit & wissbegierig": "Eager to learn & curious",
    // Timeline
    "Entwicklung": "Development",
    "Projekt": "Project",
    "Abschluss": "Graduation",
    "HAK – Beginn": "HAK – Start",
    "Einstieg in die Handelsakademie mit Schwerpunkt IT & Wirtschaft.":
      "Starting at the Austrian Business Academy specialising in IT & Business.",
    "Erste Programmiererfahrungen": "First Programming Experience",
    "Web- & Softwareentwicklung, Datenbanken und objektorientierte Programmierung.":
      "Web & software development, databases and object-oriented programming.",
    "Diplomarbeitsprojekt": "Diploma Thesis Project",
    "Umsetzung eines praxisnahen, webbasierten Projekts im Team.":
      "Building a practical, web-based project in a team.",
    "Maturaabschluss": "Final Diploma (Matura)",
    "Erfolgreicher Abschluss der HAK – bereit für den nächsten Schritt.":
      "Successfully graduated from HAK – ready for the next step.",
    // Skills
    "Werkzeuge & Kompetenzen": "Tools & Skills",
    "Ein Überblick über meine technischen und wirtschaftlichen Fähigkeiten.":
      "An overview of my technical and business skills.",
    "Projektmanagement": "Project Management",
    "Prozessanalyse": "Process Analysis",
    "Betriebswirtschaft": "Business Administration",
    "Datenanalyse": "Data Analysis",
    // Projects
    "03 — Projekte": "03 — Projects",
    "Ausgewählte Projekte": "Selected Projects",
    "Praxisnahe Arbeiten mit interaktiven Mini-Demos – probier sie direkt aus.":
      "Hands-on work with interactive mini demos – try them right here.",
    "Finanzcontrolling-System": "Financial Controlling System",
    "Wetter-Webseite": "Weather Website",
    "Datenbank-Projekte": "Database Projects",
    "C#-Anwendungen": "C# Applications",
    "Abgeschlossen": "Completed",
    "Privatprojekt": "Personal Project",
    "Lernprojekte": "Learning Projects",
    "Webbasierte Administrationsoberfläche zur Analyse von Nutzerfeedback im öffentlichen Verkehr – mit Dashboard, Datenvisualisierung und KPI-Auswertung.":
      "Web-based admin interface for analysing user feedback in public transport – with dashboard, data visualisation and KPI evaluation.",
    "System zur Verwaltung von Abonnements, Zahlungen und offenen Beträgen – mit Kostenübersicht, Zahlungsstatus und Auswertungen.":
      "System for managing subscriptions, payments and outstanding amounts – with cost overview, payment status and reports.",
    "Webanwendung zur Anzeige aktueller Wetterdaten über externe APIs – mit Standortanzeige und übersichtlicher Darstellung.":
      "Web app showing current weather data via external APIs – with location display and a clear layout.",
    "Konzeption und Umsetzung relationaler Datenbanken – inklusive ERD, SQL-Abfragen und durchdachter Datenmodellierung.":
      "Design and implementation of relational databases – including ERD, SQL queries and thoughtful data modelling.",
    "Verschiedene Softwareprojekte zur Vertiefung objektorientierter Programmierung – mit Datenverwaltung und Benutzeroberflächen.":
      "Various software projects to deepen object-oriented programming – with data management and user interfaces.",
    // Demo labels & content
    "Finanzcontrolling · Zahlungen": "Financial Controlling · Payments",
    "Wetter · Live-Mockup": "Weather · Live Mockup",
    "Datenmodell · ERD": "Data Model · ERD",
    "Desktop-App · Mockup": "Desktop App · Mockup",
    "Feedback gesamt": "Total feedback",
    "Ø Bewertung": "Avg. rating",
    "Offene Tickets": "Open tickets",
    "Gelöst": "Resolved",
    "Feedback pro Linie": "Feedback per line",
    "letzte 6 Wochen": "last 6 weeks",
    "Linie": "Line",
    "Kategorie": "Category",
    "Sauberkeit": "Cleanliness",
    "Pünktlichkeit": "Punctuality",
    "In Bearbeitung": "In progress",
    "Offen": "Open",
    "Alle": "All",
    "Bezahlt": "Paid",
    "Offen:": "Open:",
    "Leistung": "Service",
    "Betrag": "Amount",
    "Fällig": "Due",
    "Streaming-Abo": "Streaming sub",
    "Cloud-Speicher": "Cloud storage",
    "Musik-Abo": "Music sub",
    "Software-Lizenz": "Software license",
    "Heute · leicht bewölkt": "Today · partly cloudy",
    "Luftfeucht.": "Humidity",
    "Gefühlt": "Feels like",
    "Stadt wechseln": "Switch city",
    "Datei": "File",
    "Bearbeiten": "Edit",
    "Ansicht": "View",
    "Hilfe": "Help",
    "▦ Übersicht": "▦ Overview",
    "＋ Artikel": "＋ Items",
    "⇄ Buchungen": "⇄ Transactions",
    "⚙ Einstellungen": "⚙ Settings",
    // CV
    "04 — Lebenslauf": "04 — CV",
    "Kurzprofil & Werdegang": "Profile & Background",
    "Strukturierter, lernbereiter Absolvent mit Schwerpunkt IT & Wirtschaft. Auf der Suche nach einer Junior-Position oder einem Praktikum, in dem ich technisches Können und wirtschaftliches Denken einbringen und ausbauen kann.":
      "Structured, eager-to-learn graduate specialising in IT & Business. Looking for a junior position or internship where I can apply and grow my technical skills and business mindset.",
    "Lebenslauf herunterladen (PDF)": "Download CV (PDF)",
    "Ausbildung": "Education",
    "Kenntnisse": "Skills",
    "Interessen": "Interests",
    "Handelsakademie (HAK)": "Business Academy (HAK)",
    "Schwerpunkt IT & Wirtschaft · Matura": "Specialisation IT & Business · Matura",
    "Webbasiertes Praxisprojekt im Team": "Web-based team project",
    "Wirtschaft": "Business",
    "Projektmanagement, BWL, Datenanalyse": "Project Management, Business Admin, Data Analysis",
    "Saubere, wartbare Lösungen": "Clean, maintainable solutions",
    "Moderne, benutzerfreundliche Interfaces": "Modern, user-friendly interfaces",
    "Schnittstelle Technik & Business": "Bridge between tech & business",
    // Contact
    "05 — Kontakt": "05 — Contact",
    "Lassen Sie uns sprechen": "Let's talk",
    "Offen für Junior-Positionen, Praktika und Studienmöglichkeiten.":
      "Open to junior positions, internships and study opportunities.",
    "E-Mail": "Email",
    "Nachricht": "Message",
    "Nachricht senden": "Send Message",
    "Direkt erreichen": "Reach me directly",
    "📍 Wien, Österreich": "📍 Vienna, Austria",
    // Footer
    "Marko Trajkovski. Alle Rechte vorbehalten.": "Marko Trajkovski. All rights reserved.",
    "Erstellt mit HTML, CSS & JavaScript.": "Built with HTML, CSS & JavaScript."
  };

  // Platzhalter (per Feld-ID): [DE, EN]
  const PLACEHOLDERS = {
    name:    ["Ihr Name", "Your name"],
    email:   ["name@beispiel.com", "name@example.com"],
    message: ["Ihre Nachricht …", "Your message …"]
  };

  // Dynamische JS-Strings: [DE, EN]
  const STR = {
    demoOpen:   ["Demo", "Demo"],
    demoClose:  ["Demo schließen", "Close demo"],
    sending:    ["Wird gesendet …", "Sending …"],
    invalid:    ["Bitte füllen Sie alle Felder korrekt aus.", "Please fill in all fields correctly."],
    mailtoNote: ["Ihr E-Mail-Programm wurde geöffnet. (Live-Versand: Web3Forms-Key eintragen)",
                 "Your email app has opened. (For live sending, add a Web3Forms key)"],
    thanks:     ["Danke, {name}! Ihre Nachricht wurde gesendet.", "Thanks, {name}! Your message has been sent."],
    fail:       ["Senden fehlgeschlagen. Bitte direkt per E-Mail kontaktieren.",
                 "Sending failed. Please get in touch directly by email."],
    mailSubject:["Kontakt über Portfolio – ", "Contact via portfolio – "]
  };
  const WEEKDAYS = { de: ['Mo','Di','Mi','Do','Fr'], en: ['Mon','Tue','Wed','Thu','Fri'] };

  const tr = (arr) => arr[currentLang === 'en' ? 1 : 0];

  // Text-Knoten, die NICHT vom Wörterbuch angefasst werden (JS-gesteuert / Code)
  const SKIP_SEL = '#modal, .js-demo, #formNote, #wxCity, #wxTemp, #wxWeek, #finOpen, #langToggle';
  const origCache = new WeakMap();

  function collectTextNodes(rootEl) {
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (p.tagName === 'SCRIPT' || p.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
        if (p.closest(SKIP_SEL)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    return nodes;
  }

  function applyLang(lang) {
    currentLang = lang;
    // 1) Text-Knoten übersetzen / zurücksetzen
    collectTextNodes(document.body).forEach(node => {
      if (!origCache.has(node)) origCache.set(node, node.nodeValue);
      const orig = origCache.get(node);
      const norm = orig.replace(/\s+/g, ' ').trim();
      if (lang === 'en' && Object.prototype.hasOwnProperty.call(I18N, norm)) {
        const lead = /^\s/.test(orig) ? ' ' : '';
        const trail = /\s$/.test(orig) ? ' ' : '';
        node.nodeValue = lead + I18N[norm] + trail;
      } else {
        node.nodeValue = orig;
      }
    });
    // 2) Platzhalter
    Object.keys(PLACEHOLDERS).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.placeholder = PLACEHOLDERS[id][lang === 'en' ? 1 : 0];
    });
    // 3) Demo-Buttons je nach Zustand
    $$('.js-demo').forEach(btn => {
      const demo = document.getElementById('demo-' + btn.dataset.demo);
      const open = demo && !demo.hasAttribute('hidden');
      btn.textContent = open ? tr(STR.demoClose) : tr(STR.demoOpen);
    });
    // 4) Wetter-Wochentage neu rendern (falls sichtbar)
    if (wxInited) renderWeather();
    // 5) Offenes Modal in neuer Sprache neu aufbauen
    if (modal.classList.contains('is-open') && currentModalKey) fillModal(currentModalKey);
    // 6) Doc-Sprache & Button-Label
    root.setAttribute('lang', lang);
    if (langToggle) {
      langToggle.textContent = lang === 'en' ? 'DE' : 'EN';
      langToggle.setAttribute('aria-label', lang === 'en' ? 'Auf Deutsch umschalten' : 'Switch to English');
    }
  }

  const langToggle = $('#langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const next = currentLang === 'en' ? 'de' : 'en';
      localStorage.setItem('lang', next);
      applyLang(next);
    });
  }

  /* ---------- Navbar: scrolled state ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = $('#navBurger');
  const navLinks = $('#navLinks');
  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };
  if (burger) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    $$('.nav__link', navLinks).forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = $$('main section[id]');
  const navLinkMap = new Map($$('.nav__link').map(a => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinkMap.forEach(l => l.classList.remove('is-active'));
        const link = navLinkMap.get(e.target.id);
        if (link) link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$('.reveal');
  const revealIO = new IntersectionObserver((entries, obs) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (Math.min(i, 4) * 60) + 'ms';
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealIO.observe(el));

  /* ---------- Skill bar animation trigger ---------- */
  const skillIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  $$('.skill-card').forEach(c => skillIO.observe(c));

  /* ---------- Animated counters (dashboard) ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimal = el.dataset.decimal === 'true';
    const fmt = (v) => (decimal ? (v / 10).toFixed(1).replace('.', ',') : Math.round(v).toLocaleString('de-AT')) + suffix;
    const dur = 1100;
    const start = performance.now();
    let done = false;
    const finish = () => { if (done) return; done = true; el.textContent = fmt(target); };
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick); else finish();
    }
    requestAnimationFrame(tick);
    // Sicherheitsnetz: falls rAF (z. B. im Hintergrund-Tab) nicht tickt, Endwert garantieren
    setTimeout(finish, dur + 150);
  }

  /* ---------- Project demos (toggle inline) ---------- */
  $$('.js-demo').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.demo;
      const demo = $('#demo-' + id);
      if (!demo) return;
      const show = demo.hasAttribute('hidden');
      if (show) {
        demo.removeAttribute('hidden');
        btn.textContent = tr(STR.demoClose);
        $$('.stat__value[data-count]', demo).forEach(animateCount);
        if (id === 'weather') initWeather();
        // neu eingeblendete Demo-Texte ggf. übersetzen
        if (currentLang === 'en') applyLang('en');
      } else {
        demo.setAttribute('hidden', '');
        btn.textContent = tr(STR.demoOpen);
      }
    });
  });

  /* ---------- Finance demo: filter + open sum ---------- */
  const finBody = $('#finBody');
  if (finBody) {
    const rows = $$('tr', finBody);
    const openEl = $('#finOpen');
    const calcOpen = () => {
      let sum = 0;
      rows.forEach(r => {
        if (r.dataset.state === 'open') {
          const amt = parseFloat(r.children[1].textContent.replace(/[^0-9,]/g, '').replace(',', '.'));
          sum += amt;
        }
      });
      openEl.textContent = '€ ' + sum.toFixed(2).replace('.', ',');
    };
    calcOpen();
    $$('.fin__filters .chip-btn').forEach(b => {
      b.addEventListener('click', () => {
        $$('.fin__filters .chip-btn').forEach(x => x.classList.remove('is-active'));
        b.classList.add('is-active');
        const f = b.dataset.filter;
        rows.forEach(r => r.classList.toggle('is-hidden', f !== 'all' && r.dataset.state !== f));
      });
    });
  }

  /* ---------- Weather demo: mock data + city switch ---------- */
  let wxInited = false;
  const wxCities = [
    { city: 'Wien',     temp: 21, days: [[0,'☀',23],[1,'⛅',21],[2,'🌧',17],[3,'⛅',19],[4,'☀',24]] },
    { city: 'Graz',     temp: 19, days: [[0,'⛅',20],[1,'🌧',16],[2,'🌧',15],[3,'☀',22],[4,'⛅',21]] },
    { city: 'Salzburg', temp: 17, days: [[0,'🌧',16],[1,'⛅',18],[2,'☀',21],[3,'☀',22],[4,'⛅',19]] }
  ];
  let wxIdx = 0;
  function renderWeather() {
    const c = wxCities[wxIdx];
    const dayNames = WEEKDAYS[currentLang === 'en' ? 'en' : 'de'];
    $('#wxCity').textContent = c.city;
    $('#wxTemp').textContent = c.temp + '°';
    $('#wxWeek').innerHTML = c.days.map(d =>
      `<div class="wx-day"><span>${dayNames[d[0]]}</span><em>${d[1]}</em><strong>${d[2]}°</strong></div>`
    ).join('');
  }
  function initWeather() {
    if (wxInited) return;
    wxInited = true;
    renderWeather();
    const sw = $('#wxSwitch');
    if (sw) sw.addEventListener('click', () => { wxIdx = (wxIdx + 1) % wxCities.length; renderWeather(); });
  }

  /* ---------- Project detail modal (bilingual) ---------- */
  const projectData = {
    movecheck: {
      title: 'MoveCheck',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      de: {
        tag: 'Diplomarbeitsprojekt',
        problem: 'Nutzerfeedback im öffentlichen Verkehr wurde dezentral gesammelt und war kaum auswertbar – es fehlte ein zentrales Werkzeug für Analyse und Priorisierung.',
        solution: 'Eine webbasierte Administrationsoberfläche mit Dashboard, KPI-Auswertung, Feedback-Management und Datenbankanbindung, die Rückmeldungen strukturiert visualisiert.',
        challenge: 'Saubere Datenmodellierung in MySQL, performante Aggregation der Kennzahlen und eine übersichtliche Darstellung großer Datenmengen.',
        result: 'Ein funktionsfähiges Dashboard, das Feedback nach Linie und Kategorie auswertet und offene Tickets nachverfolgbar macht.',
        learned: 'Zusammenspiel von Frontend, PHP-Backend und Datenbank sowie das Übersetzen fachlicher Anforderungen in eine klare UI.'
      },
      en: {
        tag: 'Diploma Thesis Project',
        problem: 'User feedback in public transport was collected in a scattered way and hard to evaluate – a central tool for analysis and prioritisation was missing.',
        solution: 'A web-based admin interface with dashboard, KPI evaluation, feedback management and database connection that visualises feedback in a structured way.',
        challenge: 'Clean data modelling in MySQL, performant aggregation of the metrics and a clear presentation of large amounts of data.',
        result: 'A working dashboard that evaluates feedback by line and category and makes open tickets traceable.',
        learned: 'The interplay of frontend, PHP backend and database, plus translating business requirements into a clear UI.'
      }
    },
    finance: {
      title: 'Finanzcontrolling-System',
      tech: ['JavaScript', 'Datenanalyse', 'Excel'],
      de: {
        tag: 'Privatprojekt',
        problem: 'Abonnements, wiederkehrende Zahlungen und offene Beträge waren schwer im Blick zu behalten.',
        solution: 'Ein System zur Verwaltung von Abos und Zahlungen mit Kostenübersicht, Zahlungsstatus und Auswertungen über offene vs. bezahlte Beträge.',
        challenge: 'Verlässliche Berechnung offener Summen und eine filterbare, schnell erfassbare Darstellung der Zahlungen.',
        result: 'Eine klare Übersicht, die offene Beträge automatisch summiert und nach Status filterbar macht.',
        learned: 'Strukturiertes Aufbereiten von Finanzdaten und der wirtschaftliche Blick auf wiederkehrende Kosten.'
      },
      en: {
        tag: 'Personal Project',
        problem: 'Subscriptions, recurring payments and outstanding amounts were hard to keep track of.',
        solution: 'A system to manage subscriptions and payments with a cost overview, payment status and reports on open vs. paid amounts.',
        challenge: 'Reliable calculation of open totals and a filterable, quickly readable view of all payments.',
        result: 'A clear overview that sums up outstanding amounts automatically and can be filtered by status.',
        learned: 'Structured preparation of financial data and a business-minded view of recurring costs.'
      }
    },
    weather: {
      title: 'Wetter-Webseite',
      tech: ['JavaScript', 'REST API', 'HTML', 'CSS'],
      de: {
        tag: 'Webprojekt',
        problem: 'Aktuelle Wetterdaten sollten standortbezogen und übersichtlich in einer Webanwendung dargestellt werden.',
        solution: 'Eine Webanwendung, die Wetterdaten über eine externe API abruft und mit Standortanzeige sowie Tagesübersicht aufbereitet.',
        challenge: 'Anbindung einer externen REST-API, Verarbeitung der JSON-Antwort und Fehlerbehandlung bei fehlenden Daten.',
        result: 'Eine reaktionsschnelle Oberfläche mit aktuellen Werten und einer Vorschau für die kommenden Tage.',
        learned: 'Arbeit mit asynchronen API-Aufrufen (fetch), JSON-Verarbeitung und sauberes Rendering dynamischer Daten.'
      },
      en: {
        tag: 'Web Project',
        problem: 'Current weather data needed to be displayed clearly and location-based in a web application.',
        solution: 'A web app that fetches weather data from an external API and presents it with location display and a daily overview.',
        challenge: 'Connecting an external REST API, processing the JSON response and handling errors when data is missing.',
        result: 'A responsive interface with current values and a preview for the coming days.',
        learned: 'Working with asynchronous API calls (fetch), JSON processing and clean rendering of dynamic data.'
      }
    },
    db: {
      title: 'Datenbank-Projekte',
      tech: ['MySQL', 'MariaDB', 'SQL', 'ERD'],
      de: {
        tag: 'Datenbank',
        problem: 'Fachliche Anforderungen mussten in konsistente, normalisierte relationale Datenmodelle überführt werden.',
        solution: 'Konzeption und Umsetzung relationaler Datenbanken inklusive Entity-Relationship-Diagrammen, durchdachter Datenmodellierung und SQL-Abfragen.',
        challenge: 'Normalisierung, sinnvolle Schlüssel- und Beziehungsdefinitionen sowie effiziente JOIN-Abfragen.',
        result: 'Robuste Datenmodelle und Abfragen, die fachliche Fragestellungen zuverlässig beantworten.',
        learned: 'Vom ERD zur lauffähigen Datenbank – Modellierung, Normalisierung und das Schreiben aussagekräftiger SQL-Abfragen.'
      },
      en: {
        tag: 'Database',
        problem: 'Business requirements had to be turned into consistent, normalised relational data models.',
        solution: 'Design and implementation of relational databases including entity-relationship diagrams, thoughtful data modelling and SQL queries.',
        challenge: 'Normalisation, sensible key and relationship definitions and efficient JOIN queries.',
        result: 'Robust data models and queries that reliably answer business questions.',
        learned: 'From ERD to a working database – modelling, normalisation and writing meaningful SQL queries.'
      }
    },
    csharp: {
      title: 'C#-Anwendungen',
      tech: ['C#', '.NET', 'OOP', 'Visual Studio'],
      de: {
        tag: 'Lernprojekte',
        problem: 'Objektorientierte Konzepte sollten praktisch vertieft und in lauffähige Software überführt werden.',
        solution: 'Mehrere Desktop-Anwendungen mit Datenverwaltung und Benutzeroberflächen, die OOP-Prinzipien in der Praxis anwenden.',
        challenge: 'Sauberer Klassenaufbau, Trennung von Logik und Oberfläche sowie nachvollziehbare Datenverwaltung.',
        result: 'Funktionsfähige Anwendungen, die zentrale OOP-Konzepte wie Kapselung, Vererbung und Klassenstruktur demonstrieren.',
        learned: 'Vertieftes Verständnis objektorientierter Programmierung und der Entwicklung mit C# in Visual Studio.'
      },
      en: {
        tag: 'Learning Projects',
        problem: 'Object-oriented concepts needed to be deepened in practice and turned into working software.',
        solution: 'Several desktop applications with data management and user interfaces that apply OOP principles in practice.',
        challenge: 'Clean class structure, separation of logic and interface and traceable data management.',
        result: 'Working applications that demonstrate core OOP concepts such as encapsulation, inheritance and class structure.',
        learned: 'A deeper understanding of object-oriented programming and developing with C# in Visual Studio.'
      }
    }
  };

  const MODAL_LABELS = {
    de: ['Problemstellung', 'Lösungsansatz', 'Technologien', 'Herausforderungen', 'Ergebnis', 'Gelerntes'],
    en: ['Problem', 'Solution', 'Technologies', 'Challenges', 'Result', 'Learnings']
  };
  // Titel, die in der EN-Version anders heißen
  const PROJECT_TITLE_EN = {
    'Finanzcontrolling-System': 'Financial Controlling System',
    'Wetter-Webseite': 'Weather Website',
    'Datenbank-Projekte': 'Database Projects',
    'C#-Anwendungen': 'C# Applications'
  };

  const modal = $('#modal');
  const modalTag = $('#modalTag');
  const modalTitle = $('#modalTitle');
  const modalGrid = $('#modalGrid');
  let lastFocused = null;
  let currentModalKey = null;

  function fillModal(key) {
    const p = projectData[key];
    if (!p) return;
    const d = p[currentLang === 'en' ? 'en' : 'de'];
    const labels = MODAL_LABELS[currentLang === 'en' ? 'en' : 'de'];
    const title = (currentLang === 'en' && PROJECT_TITLE_EN[p.title]) ? PROJECT_TITLE_EN[p.title] : p.title;
    modalTag.textContent = d.tag;
    modalTitle.textContent = title;
    modalGrid.innerHTML = `
      <div class="modal__item"><h4>${labels[0]}</h4><p>${d.problem}</p></div>
      <div class="modal__item"><h4>${labels[1]}</h4><p>${d.solution}</p></div>
      <div class="modal__item"><h4>${labels[2]}</h4><div class="tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div></div>
      <div class="modal__item"><h4>${labels[3]}</h4><p>${d.challenge}</p></div>
      <div class="modal__item"><h4>${labels[4]}</h4><p>${d.result}</p></div>
      <div class="modal__item"><h4>${labels[5]}</h4><p>${d.learned}</p></div>
    `;
  }

  function openModal(key) {
    if (!projectData[key]) return;
    currentModalKey = key;
    lastFocused = document.activeElement;
    fillModal(key);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('.modal__close', modal).focus();
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentModalKey = null;
    if (lastFocused) lastFocused.focus();
  }

  $$('.js-details').forEach(b => b.addEventListener('click', () => openModal(b.dataset.details)));
  $$('.js-close-modal').forEach(b => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

  /* ---------- Contact form ---------- */
  const form = $('#contactForm');
  if (form) {
    const note = $('#formNote');
    const submitBtn = $('button[type="submit"]', form);
    const accessKey = (form.querySelector('input[name="access_key"]') || {}).value || '';

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const name = $('#name'), email = $('#email'), message = $('#message');
      let valid = true;
      [name, email, message].forEach(f => f.classList.remove('is-invalid'));
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

      if (!name.value.trim()) { name.classList.add('is-invalid'); valid = false; }
      if (!emailOk) { email.classList.add('is-invalid'); valid = false; }
      if (!message.value.trim()) { message.classList.add('is-invalid'); valid = false; }

      if (!valid) {
        note.textContent = tr(STR.invalid);
        note.className = 'contact__note err';
        return;
      }

      // Kein Access Key konfiguriert → mailto-Fallback, damit nichts verloren geht.
      if (!accessKey || accessKey.indexOf('DEIN_') === 0) {
        const subject = encodeURIComponent(tr(STR.mailSubject) + name.value.trim());
        const body = encodeURIComponent(message.value.trim() + '\n\n— ' + name.value.trim() + ' (' + email.value.trim() + ')');
        window.location.href = 'mailto:marko.trajkovski2510@gmail.com?subject=' + subject + '&body=' + body;
        note.textContent = tr(STR.mailtoNote);
        note.className = 'contact__note ok';
        return;
      }

      // Echter Versand über Web3Forms
      const original = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = tr(STR.sending);
      note.textContent = '';
      note.className = 'contact__note';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          note.textContent = tr(STR.thanks).replace('{name}', name.value.trim());
          note.className = 'contact__note ok';
          form.reset();
        } else {
          throw new Error(data.message || 'Error');
        }
      } catch (err) {
        note.textContent = tr(STR.fail);
        note.className = 'contact__note err';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      }
    });
  }

  /* ---------- Initiale Sprache anwenden ---------- */
  applyLang(currentLang);
})();
