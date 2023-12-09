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
  boardTitle: null,
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

function getHtmlElements() {
  htmlElements.topBar = document.querySelector('#top-bar');
  htmlElements.sideBar = document.querySelector('#side-bar');
  htmlElements.logoContainer = document.querySelector('#logo-container');
  htmlElements.sideBarToggleBtn = document.querySelector(
    '#side-bar-toggle-btn'
  );
  htmlElements.sideBarToggleContainer = document.querySelector(
    '#side-bar-toggle-container'
  );
  htmlElements.boardTitle = document.querySelector('#board-title');
}

function reloadSideBarToggleIcon() {
  htmlElements.sideBarToggleBtn.insertAdjacentHTML(
    'afterbegin',
    loadSideBarToggleIcon()
  );
}

function updateSideBarState(state) {
  htmlElements.sideBar.dataset.sideBarToggle = state;
  htmlElements.sideBarToggleContainer.dataset.sideBarToggle = state;
  localStorage.sideBar = state;
  reloadSideBarToggleIcon();
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
  getHtmlElements();
  htmlElements.sideBarToggleBtn.addEventListener('click', toggleSideBar);
}

function loadSideBarToggle() {
  if (htmlElements.sideBarToggleContainer !== null) {
    htmlElements.sideBarToggleContainer.remove();
  }
  function insertToggle() {
    if (window.innerWidth < 700) {
      htmlElements.sideBar.style.height = null;
      htmlElements.boardTitle.insertAdjacentHTML('beforeend', sideBarToggle());
    } else if (window.innerWidth > 700) {
      htmlElements.sideBar.insertAdjacentHTML('beforeend', sideBarToggle());
      setSidebarHeight();
    }
  }
  insertToggle();
  htmlElements.sideBarToggleContainer = document.querySelector(
    '#side-bar-toggle-container'
  );
}

export function loadLayout(boardsData) {
  setThemeMode();
  htmlElements.app = document.querySelector('#app');
  htmlElements.app.insertAdjacentHTML('afterbegin', sideBar(boardsData));
  htmlElements.app.insertAdjacentHTML('afterbegin', topBar(boardsData));
  getHtmlElements();
  loadLogo();
  loadSideBarToggle();
  activateEventListeners();
}

function loadOnScreenResize() {
  if (window.innerWidth < 700 && htmlElements.logo.dataset.logo !== 'mobile') {
    loadLogo();
    loadSideBarToggle();
  } else if (
    window.innerWidth > 700 &&
    htmlElements.logo.dataset.logo === 'mobile'
  ) {
    loadLogo();
    loadSideBarToggle();
  }
}

window.addEventListener('resize', loadOnScreenResize);
