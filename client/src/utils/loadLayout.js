import { topBar, logo } from 'Components/topBar';
import { setThemeMode } from './themeMode';
import {
  sideBar,
  sideBarToggle,
  loadSideBarToggleIcon,
} from 'Components/sideBar';

const htmlElements = {
  app: null,
  topBar: null,
  logoContainer: null,
  logo: null,
  sideBar: null,
  sideBarToggleBtn: null,
  sideBarToggleContainer: null,
  sideBarToggleIcon: null,
};

function setSidebarHeight() {
  setTimeout(() => {
    const appContainerHeight = htmlElements.app.offsetHeight;
    const topBarHeight = htmlElements.topBar.offsetHeight;
    const sideBarHeight = appContainerHeight - topBarHeight;
    htmlElements.sideBar.style.height = `${sideBarHeight}px`;
  }, 300);
}

function loadLogo() {
  if (htmlElements.logo !== null) {
    htmlElements.logo.remove();
  }
  htmlElements.logoContainer.insertAdjacentHTML('afterbegin', logo());
  htmlElements.logo = document.querySelector('#logo');
}

function loadOnScreenResize() {
  if (window.innerWidth < 700 && htmlElements.logo.dataset.logo !== 'mobile') {
    loadLogo();
  } else if (
    window.innerWidth > 700 &&
    htmlElements.logo.dataset.logo === 'mobile'
  ) {
    loadLogo();
  }
}

function getHtmlElements() {
  htmlElements.topBar = document.querySelector('#top-bar');
  htmlElements.sideBar = document.querySelector('#side-bar');
  htmlElements.logoContainer = document.querySelector('#logo-container');
}

function updateSideBarState(state) {
  htmlElements.sideBar.dataset.sideBarToggle = state;
  htmlElements.sideBarToggleContainer.dataset.sideBarToggle = state;
  localStorage.sideBar = state;
  htmlElements.sideBarToggleBtn.insertAdjacentHTML(
    'afterbegin',
    loadSideBarToggleIcon()
  );
}

function toggleSideBar() {
  htmlElements.sideBarToggleIcon = document.querySelector(
    '#side-bar-toggle-icon'
  );
  htmlElements.sideBarToggleIcon.remove();
  htmlElements.sideBarToggleBtn.innerText = '';
  if (localStorage.sideBar === 'open') {
    updateSideBarState('hidden');
  } else {
    updateSideBarState('open');
  }
}

function activateEventListeners() {
  htmlElements.sideBarToggleBtn = document.querySelector(
    '#side-bar-toggle-btn'
  );
  htmlElements.sideBarToggleContainer = document.querySelector(
    '#side-bar-toggle-container'
  );
  htmlElements.sideBarToggleBtn.addEventListener('click', toggleSideBar);
}

export function loadLayout(boardsData) {
  setThemeMode();
  htmlElements.app = document.querySelector('#app');
  htmlElements.app.insertAdjacentHTML('afterbegin', sideBar(boardsData));
  htmlElements.app.insertAdjacentHTML('afterbegin', topBar(boardsData));
  getHtmlElements();
  htmlElements.sideBar.insertAdjacentHTML('beforeend', sideBarToggle());
  setSidebarHeight();
  loadLogo();
  activateEventListeners();
}

window.addEventListener('resize', loadOnScreenResize);
