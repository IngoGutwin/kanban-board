import { topBar, logo } from 'Components/topBar';
import { setThemeMode, toggleThemeMode } from './themeMode';
import {
  sideBar,
  sideBarToggle,
  loadSideBarToggleIcon,
} from 'Components/sideBar';
import { taskBar } from 'Components/taskBar';

const htmlElements = {
  appContainer: null,
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

const appState = {
  mobile: null,
};

function loadLogo(isScreenMobile) {
  if (htmlElements.logo !== null) {
    htmlElements.logo.remove();
  }
  htmlElements.logoContainer.insertAdjacentHTML(
    'afterbegin',
    logo(isScreenMobile)
  );
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
    loadSideBarToggleIcon(appState.mobile)
  );
}

function updateSideBarState(state) {
  htmlElements.sideBar.dataset.sideBarToggle = state;
  htmlElements.sideBarToggleContainer.dataset.sideBarToggle = state;
  htmlElements.taskBar.dataset.sideBarToggle = state;
  htmlElements.appContainer.dataset.sideBarToggle = state;
  localStorage.sideBar = state;
}

function toggleSideBar() {
  htmlElements.sideBarToggleIcon = document.querySelector(
    '#side-bar-toggle-icon'
  );
  htmlElements.sideBarToggleIcon.remove();
  htmlElements.sideBarToggleBtn.innerText = '';
  if (localStorage.sideBar === 'open') {
    updateSideBarState('hidden');
    reloadSideBarToggleIcon(appState.mobile);
  } else {
    updateSideBarState('open');
    reloadSideBarToggleIcon();
  }
}

function activateEventListeners() {
  htmlElements.themeModeToggle.addEventListener('click', () => {
    toggleThemeMode(htmlElements.themeModeContainer);
    loadLogo(appState.mobile);
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
    if (appState.mobile) {
      htmlElements.sideBar.style.height = null;
      htmlElements.boardTitle.insertAdjacentHTML(
        'beforeend',
        sideBarToggle(appState.mobile)
      );
    } else if (!appState.mobile) {
      htmlElements.sideBar.insertAdjacentHTML(
        'beforeend',
        sideBarToggle(appState.mobile)
      );
    }
  }
  insertToggle();
  htmlElements.sideBarToggleContainer = document.querySelector(
    '#side-bar-toggle-container'
  );
}

export function loadLayout(boardsData) {
  setThemeMode();
  htmlElements.appContainer = document.querySelector('#app');
  if (htmlElements.appContainer.clientWidth < 700) {
    appState.mobile = true;
  }
  htmlElements.appContainer.insertAdjacentHTML('afterbegin', taskBar());
  htmlElements.appContainer.insertAdjacentHTML(
    'afterbegin',
    sideBar(boardsData)
  );
  htmlElements.appContainer.insertAdjacentHTML('afterbegin', topBar());
  getHtmlElements();
  loadLogo(appState.mobile);
  loadSideBarToggle();
  reloadEventListeners();
  activateEventListeners();
  updateSideBarState(localStorage.sideBar);
}

function loadOnScreenResize() {
  if (
    htmlElements.appContainer.clientWidth < 700 &&
    htmlElements.logo.dataset.logo !== 'mobile'
  ) {
    appState.mobile = true;
    loadLogo(appState.mobile);
    loadSideBarToggle(appState.mobile);
    reloadEventListeners();
  } else if (
    htmlElements.appContainer.clientWidth > 700 &&
    htmlElements.logo.dataset.logo === 'mobile'
  ) {
    appState.mobile = false;
    loadLogo(appState.mobile);
    loadSideBarToggle(appState.mobile);
    reloadEventListeners();
  }
}

window.addEventListener('resize', loadOnScreenResize);
