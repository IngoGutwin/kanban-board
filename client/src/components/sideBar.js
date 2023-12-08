import boardIcon from 'Icons/icon-board.svg';
import lightMode from 'Icons/icon-light-theme.svg';
import darkMode from 'Icons/icon-dark-theme.svg';

function loadBoards(boardsData) {
  const boardButtons = boardsData.map(
    (board) => `
    <button class="side-bar-board">
      <svg data-src=${boardIcon} class="side-bar-board-icon"/>
      <h3 class="side-bar-board-name">${board.name}</h3>
    </button>  
  `
  );
  return boardButtons.join('');
}

export function sideBar(boardsData) {
  return `
    <div class="side-bar" id="side-bar">
      <div class="side-bar-boards">
        <h3 class="side-bar-heading">all boards (${boardsData.length})</h3>
        ${loadBoards(boardsData)}
        <button class="side-bar-new-board">
          <svg data-src=${boardIcon} class="side-bar-new-board-icon"/>
          <h3 class="side-bar-new-board-heading">+ Create New Board</h3>
        </button>
      </div>
      <div class="side-bar-theme-mode" data-theme-mode="dark">
        <svg data-src=${lightMode} class="side-bar-theme-mode-icon"/>
        <div class="side-bar-theme-mode-toggle">
          <button class="side-bar-theme-mode-btn"></button>
        </div>
        <svg data-src=${darkMode} class="side-bar-theme-mode-icon"/>
      </div>
    </div>
  `;
}
