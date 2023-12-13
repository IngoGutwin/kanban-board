import { topBar, logo } from 'Components/topBar';
import { setThemeMode, toggleThemeMode } from './themeMode';
import {
  sideBar,
  sideBarToggle,
  loadSideBarToggleIcon,
} from 'Components/sideBar';
import { taskBar } from 'Components/taskBar';

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
  themeModeToggle: null,
  taskBar: null,
};

function setSidebarHeight() {
  setTimeout(() => {
    const appContainerHeight = htmlElements.app.offsetHeight;
    const topBarHeight = htmlElements.topBar.offsetHeight;
    const sideBarHeight = appContainerHeight - topBarHeight;
    htmlElements.sideBar.style.height = `${sideBarHeight}px`;
  }, 500);
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
  htmlElements.themeModeToggle = htmlElements.sideBar.querySelector(
    '#side-bar-theme-mode-toggle'
  );
  htmlElements.themeModeContainer = htmlElements.sideBar.querySelector(
    '#side-bar-theme-mode'
  );
  htmlElements.taskBar = document.querySelector('#task-bar');
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
  htmlElements.taskBar.dataset.sideBarToggle = state;
  htmlElements.app.dataset.sideBarToggle = state;
  localStorage.sideBar = state;
  // reloadSideBarToggleIcon();
}

function toggleSideBar() {
  htmlElements.sideBarToggleIcon = document.querySelector(
    '#side-bar-toggle-icon'
  );
  htmlElements.sideBarToggleIcon.remove();
  htmlElements.sideBarToggleBtn.innerText = '';
  if (localStorage.sideBar === 'open') {
    updateSideBarState('hidden');
    reloadSideBarToggleIcon();
  } else {
    updateSideBarState('open');
    reloadSideBarToggleIcon();
  }
}

function activateEventListeners() {
  htmlElements.themeModeToggle.addEventListener('click', () => {
    toggleThemeMode(htmlElements.themeModeContainer);
    loadLogo();
  });
}

function reloadEventListeners() {
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
  htmlElements.app.insertAdjacentHTML('afterbegin', taskBar());
  htmlElements.app.insertAdjacentHTML('afterbegin', sideBar(boardsData));
  htmlElements.app.insertAdjacentHTML('afterbegin', topBar(boardsData));
  getHtmlElements();
  loadLogo();
  loadSideBarToggle();
  updateSideBarState(localStorage.sideBar);
  reloadEventListeners();
  activateEventListeners();
}

function loadOnScreenResize() {
  if (window.innerWidth < 700 && htmlElements.logo.dataset.logo !== 'mobile') {
    loadLogo();
    loadSideBarToggle();
    reloadEventListeners();
  } else if (
    window.innerWidth > 700 &&
    htmlElements.logo.dataset.logo === 'mobile'
  ) {
    loadLogo();
    loadSideBarToggle();
    reloadEventListeners();
  }
}

window.addEventListener('resize', loadOnScreenResize);
