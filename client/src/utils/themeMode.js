export function setThemeMode() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else if (
    localStorage.theme === 'light' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: light').matches)
  ) {
    document.documentElement.classList.add('light');
    localStorage.theme = 'light';
  }
}

export function toggleThemeMode(htmlElement) {
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.theme = 'light';
    htmlElement.dataset.themeMode = 'light';
  } else if (localStorage.theme === 'light') {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    htmlElement.dataset.themeMode = 'dark';
  }
}
