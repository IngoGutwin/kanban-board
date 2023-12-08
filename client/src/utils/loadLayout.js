import { topBar, logo } from 'Components/topBar.js';
import { setThemeMode } from './themeMode';
import { sideBar } from 'Components/sideBar';

const htmlElements = {
  app: null,
  topBar: null,
  logoContainer: null,
  sideBar: null,
  logo: null,
};

function setSidebarHeight() {
  const appContainerHeight = htmlElements.app.offsetHeight;
  const topBarHeight = htmlElements.topBar.offsetHeight;
  const sideBarHeight = appContainerHeight - topBarHeight;
  htmlElements.sideBar.style.height = `${sideBarHeight}px`;
}

function reloadLogo() {
  htmlElements.logo.remove();
  htmlElements.logoContainer.insertAdjacentHTML('afterbegin', logo());
  htmlElements.logo = document.querySelector('#logo');
}

function loadOnScreenResize() {
  if (
    window.screen.availWidth < 700 &&
    htmlElements.logo.dataset.logo !== 'mobile'
  ) {
    reloadLogo();
  } else if (
    window.screen.availWidth > 700 &&
    htmlElements.logo.dataset.logo === 'mobile'
  ) {
    reloadLogo();
  }
}

function getHtmlElements() {
  htmlElements.topBar = document.querySelector('#top-bar');
  htmlElements.sideBar = document.querySelector('#side-bar');
  htmlElements.logoContainer = document.querySelector('#logo-container');
}

export function loadLayout(boardsData) {
  setThemeMode();
  htmlElements.app = document.querySelector('#app');
  htmlElements.app.insertAdjacentHTML('afterbegin', sideBar(boardsData));
  htmlElements.app.insertAdjacentHTML('afterbegin', topBar(boardsData));
  getHtmlElements();
  htmlElements.logoContainer.insertAdjacentHTML('afterbegin', logo());
  setTimeout(() => {
    setSidebarHeight();
  }, 300);
  htmlElements.logo = document.querySelector('#logo');
}

window.addEventListener('resize', loadOnScreenResize);
