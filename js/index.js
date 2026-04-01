const THEME_STORAGE_KEY = "theme-preference";
const ACTIVE_PROFILE_NAME_KEY = "perfilAtivoNome";
const ACTIVE_PROFILE_IMAGE_KEY = "perfilAtivoImagem";
const root = document.documentElement;
const toggleButton = document.getElementById("theme-toggle");

function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (!toggleButton) {
        return;
    }

    const isDark = theme === "dark";
    toggleButton.setAttribute("aria-pressed", String(isDark));
    toggleButton.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
}

function toggleTheme() {
    const currentTheme = root.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
}

function saveActiveProfile() {
    const profileLinks = document.querySelectorAll(".profile");

    profileLinks.forEach((profileLink) => {
        profileLink.addEventListener("click", () => {
            const profileName = profileLink.querySelector("figcaption")?.textContent?.trim();
            const profileImage = profileLink.querySelector("img")?.getAttribute("src");

            if (profileName) {
                localStorage.setItem(ACTIVE_PROFILE_NAME_KEY, profileName);
            }

            if (profileImage) {
                localStorage.setItem(ACTIVE_PROFILE_IMAGE_KEY, profileImage);
            }
        });
    });
}

applyTheme(getPreferredTheme());
saveActiveProfile();

if (toggleButton) {
    toggleButton.addEventListener("click", toggleTheme);
}
