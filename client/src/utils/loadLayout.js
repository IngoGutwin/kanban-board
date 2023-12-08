import { topBar } from 'Components/topBar.js';
import { setThemeMode } from './themeMode';
import { sideBar } from 'Components/sideBar';

const htmlElements = {
  app: null,
  topBar: null,
  sideBar: null,
};

function getHtmlElements() {
  htmlElements.topBar = document.querySelector('#top-bar');
  htmlElements.sideBar = document.querySelector('#side-bar');
}

function setSidebarHeight() {
  const appContainerHeight = htmlElements.app.offsetHeight;
  const topBarHeight = htmlElements.topBar.offsetHeight;
  const sideBarHeight = appContainerHeight - topBarHeight;
  htmlElements.sideBar.style.height = `${sideBarHeight}px`;
}

export function loadLayout(boardsData) {
  htmlElements.app = document.querySelector('#app');
  setThemeMode();
  app.insertAdjacentHTML('afterbegin', sideBar(boardsData));
  app.insertAdjacentHTML('afterbegin', topBar(boardsData));
  getHtmlElements();
  setTimeout(() => {
    setSidebarHeight();
  }, 150);
}
