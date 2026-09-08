/**
 * Theme utility
 * localStorage key: "wf-theme"  -> "light" | "dark"
 *
 * initTheme()   - app start par call karo (e.g. AuthPage ke useEffect me),
 *                 localStorage se theme parh kar <html> par apply kar deta hai.
 * setTheme(t)   - theme ko explicitly "light" ya "dark" set karta hai + save karta hai.
 * toggleTheme() - current theme ko flip karta hai (agar kabhi toggle button banana ho).
 * getStoredTheme() - sirf value read karta hai, DOM ko touch nahi karta.
 */

const STORAGE_KEY = "theme";
const DEFAULT_THEME = "dark"; // is design ka original look dark tha, isliye fallback dark hai

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function getStoredTheme() {
  if (!isBrowser()) return DEFAULT_THEME;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : DEFAULT_THEME;
  } catch {
    // localStorage blocked (private mode, etc.) — safe fallback
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme) {
  if (!isBrowser()) return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  root.setAttribute("data-theme", theme);
}

export function setTheme(theme) {
  const next = theme === "light" ? "light" : "dark";
  if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore write errors, still apply visually
    }
  }
  applyTheme(next);
  return next;
}

export function toggleTheme() {
  const current = getStoredTheme();
  return setTheme(current === "dark" ? "light" : "dark");
}

/**
 * Call once on app/page mount. Reads "wf-theme" from localStorage
 * and applies it immediately. Returns the resolved theme string.
 */
export function initTheme() {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
}