const T_KEY = "ig-theme";
const M_KEY = "ig-mode";

let theme = localStorage.getItem(T_KEY);
let mode =
  localStorage.getItem(M_KEY) ||
  (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

/* ---------- apply theme to <html> ---------- */
function applyTheme(t) {
  const h = document.documentElement;
  h.className = "";
  h.classList.add(t);

  const modeBtn = document.getElementById("mode-btn");

  if (t === "clarity") {
    h.classList.add(mode);
    modeBtn.style.display = "";
    modeBtn.textContent = mode === "dark" ? "☀️ Light" : "🌙 Dark";
    const ddModeBtn = document.getElementById("dd-mode-btn");
    if (ddModeBtn)
      ddModeBtn.textContent = mode === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  } else {
    modeBtn.style.display = "none";
  }

  /* update active dot in dropdown */
  ["clarity", "synthwave", "glass"].forEach((id) => {
    const el = document.getElementById("dd-" + id);
    if (el) el.classList.toggle("active", id === t);
  });
}

/* ---------- pick theme (from selector overlay) ---------- */
function pickTheme(t) {
  theme = t;
  localStorage.setItem(T_KEY, t);
  applyTheme(t);
  document.getElementById("selector").style.display = "none";
  document.getElementById("site").classList.add("show");
}

/* ---------- pick theme from dropdown ---------- */
function ddPick(t) {
  theme = t;
  localStorage.setItem(T_KEY, t);
  applyTheme(t);
  closeDropdown();
}

/* ---------- show selector screen ---------- */
function showSelector() {
  closeDropdown();
  document.getElementById("selector").style.display = "flex";
  document.getElementById("site").classList.remove("show");
}

/* ---------- dropdown toggle ---------- */
function toggleDropdown(e) {
  e.stopPropagation();
  const btn = document.getElementById("theme-dd-btn");
  const dd = document.getElementById("theme-dd");
  const open = dd.classList.toggle("open");
  btn.classList.toggle("open", open);
}

function closeDropdown() {
  document.getElementById("theme-dd").classList.remove("open");
  document.getElementById("theme-dd-btn").classList.remove("open");
}

document.addEventListener("click", () => closeDropdown());
document
  .getElementById("theme-dd")
  .addEventListener("click", (e) => e.stopPropagation());

/* ---------- light / dark toggle (Clarity only) ---------- */
function toggleMode() {
  mode = mode === "dark" ? "light" : "dark";
  localStorage.setItem(M_KEY, mode);
  applyTheme("clarity");
}

/* ---------- init ---------- */
if (theme) {
  applyTheme(theme);
  document.getElementById("selector").style.display = "none";
  document.getElementById("site").classList.add("show");
} else {
  /* Default classes for the selector overlay itself */
  document.documentElement.classList.add("clarity", "dark");
}

/* ---------- smooth scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const el = document.querySelector(a.getAttribute("href"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
});
