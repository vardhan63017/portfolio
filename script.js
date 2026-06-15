// SKILLS DATA
const skills = [
  { name: "HTML5", icon: "🌐", cat: "frontend", level: 92, label: "Advanced" },
  { name: "CSS3", icon: "🎨", cat: "frontend", level: 88, label: "Advanced" },
  {
    name: "JavaScript",
    icon: "⚡",
    cat: "frontend",
    level: 82,
    label: "Proficient",
  },
  {
    name: "Bootstrap",
    icon: "🅱",
    cat: "frontend",
    level: 85,
    label: "Proficient",
  },
  {
    name: "React.js",
    icon: "⚛",
    cat: "frontend",
    level: 75,
    label: "Proficient",
  },
  {
    name: "TypeScript",
    icon: "🔷",
    cat: "frontend",
    level: 65,
    label: "Working",
  },
  {
    name: "Java",
    icon: "☕",
    cat: "programming",
    level: 80,
    label: "Proficient",
  },
  {
    name: "DSA",
    icon: "🧩",
    cat: "programming",
    level: 78,
    label: "Proficient",
  },
  {
    name: "MySQL",
    icon: "🗄",
    cat: "programming",
    level: 72,
    label: "Working",
  },
  {
    name: "MongoDB",
    icon: "🍃",
    cat: "programming",
    level: 62,
    label: "Learning",
  },
  { name: "GitHub", icon: "🐙", cat: "tools", level: 82, label: "Proficient" },
  { name: "VS Code", icon: "🖥", cat: "tools", level: 90, label: "Advanced" },
  { name: "Figma", icon: "✏️", cat: "tools", level: 68, label: "Working" },
  { name: "Vercel", icon: "▲", cat: "tools", level: 75, label: "Proficient" },
];

function renderSkills(filter = "all") {
  const grid = document.getElementById("skillsGrid");
  const filtered =
    filter === "all" ? skills : skills.filter((s) => s.cat === filter);
  grid.innerHTML = filtered
    .map(
      (s) => `
    <div class="skill-card reveal">
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar"><div class="skill-fill" data-width="${s.level}"></div></div>
      <div class="skill-level">${s.label} · ${s.level}%</div>
    </div>
  `,
    )
    .join("");
  requestAnimationFrame(() => {
    initReveal();
    setTimeout(() => {
      grid.querySelectorAll(".skill-fill").forEach((el) => {
        el.style.width = el.dataset.width + "%";
      });
    }, 300);
  });
}

function filterSkills(cat) {
  document
    .querySelectorAll(".cat-btn")
    .forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");
  renderSkills(cat);
}

// TYPED EFFECT
const phrases = [
  "aspiring entrepreneur,",
  "startup enthusiast,",
  "providing innovative solutions for real world problems",
];
let pi = 0,
  ci = 0,
  deleting = false;
function typeLoop() {
  const el = document.getElementById("typed-text");
  const phrase = phrases[pi];
  if (!deleting) {
    el.textContent = phrase.substring(0, ++ci);
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    el.textContent = phrase.substring(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 45);
  }
}

// SCROLL PROGRESS
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("progress").style.width =
    (window.scrollY / max) * 100 + "%";
  const nav = document.getElementById("nav");
  nav.classList.toggle("scrolled", window.scrollY > 30);
}

// REVEAL
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal:not(.visible)")
    .forEach((el) => io.observe(el));
}

// COUNTER ANIMATION
function animateCounters() {
  document.querySelectorAll(".stat-num[data-target]").forEach((el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const decimal = parseInt(el.dataset.decimal || 0);
    const duration = 1500;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      el.textContent = decimal
        ? value.toFixed(decimal) + suffix
        : Math.round(value) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(update);
        io.disconnect();
      }
    });
    io.observe(el);
  });
}

// NAV TOGGLE
function toggleNav() {
  document.getElementById("navLinks").classList.toggle("open");
}

// FORM
function handleSubmit(btn) {
  btn.textContent = "Sending...";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "✓ Message Sent!";
    btn.style.background = "#00ffc8";
  }, 1500);
  setTimeout(() => {
    btn.textContent = "Send Message →";
    btn.disabled = false;
    btn.style.background = "";
  }, 4000);
}

// INIT
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("load", () => {
  renderSkills();
  typeLoop();
  initReveal();
  animateCounters();
  // hero reveals
  document.querySelectorAll(".hero-content .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 150 + 300);
  });
  // avatar stats hover
  document.querySelectorAll(".avatar-stat").forEach((el) => {
    el.style.transition = "all 0.3s";
  });
});
// close nav on link click
document.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  }),
);
