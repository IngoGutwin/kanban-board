import boardIcon from 'Icons/icon-board.svg';
import lightMode from 'Icons/icon-light-theme.svg';
import darkMode from 'Icons/icon-dark-theme.svg';
import chevron from 'Icons/icon-chevron-down.svg';
import hideSideBar from 'Icons/icon-hide-sidebar.svg';
import showSideBar from 'Icons/icon-show-sidebar.svg';

export function loadSideBarToggleIcon(isScreenMobile) {
  let result = ['', ''];
  if (isScreenMobile) {
    result[0] = chevron;
  } else {
    if (localStorage.sideBar === 'open') {
      result[0] = hideSideBar;
      result[1] = '<h3>Hide Sidebar</h3>';
    } else {
      result[0] = showSideBar;
    }
  }
  return `<svg data-src=${result[0]} class="side-bar-toggle-icon" id="side-bar-toggle-icon"/> ${result[1]}`;
}

export function sideBarToggle(isScreenMobile) {
  return `
    <div class="side-bar-toggle-container" 
      id="side-bar-toggle-container" 
      data-side-bar-toggle="${localStorage.sideBar}"
    >
      <button class="side-bar-toggle-btn" id="side-bar-toggle-btn">
        ${loadSideBarToggleIcon(isScreenMobile)}
      </button>
    </div>
  `;
}

function loadBoards(boardsData) {
  const boardButtons = boardsData.map(
    (board) => `
      <button class="side-bar-board" data-board-active="false">
          <svg data-src=${boardIcon} class="side-bar-board-icon"/>
          <h3 class="side-bar-board-name">${board.name}</h3>
        </button>
      `
  );
  return boardButtons.join('');
}

export function sideBar(boardsData) {
  return `
    <div 
      class="side-bar"
      id="side-bar" 
      data-side-bar-toggle="${localStorage.sideBar}"
    >
      <div class="side-bar-boards" id="side-bar-boards">
        <h4 class="side-bar-heading">all boards (${boardsData.length})</h4>
        ${loadBoards(boardsData)}
        <button class="side-bar-new-board" id="create-new-board-btn">
          <svg data-src=${boardIcon} class="side-bar-new-board-icon"/>
          <h3 class="side-bar-new-board-heading">+ Create New Board</h3>
        </button>
      </div>
      <div class="side-bar-theme-mode" id="side-bar-theme-mode" 
        data-theme-mode="${localStorage.theme}">
        <svg data-src=${lightMode} class="side-bar-theme-mode-icon"/>
        <div class="side-bar-theme-mode-toggle" id="side-bar-theme-mode-toggle">
          <button class="side-bar-theme-mode-btn"></button>
        </div>
        <svg data-src=${darkMode} class="side-bar-theme-mode-icon"/>
      </div>
    </div>
  `;
}
