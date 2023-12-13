import logoMobile from 'Icons/logo-mobile.svg';
import logoDark from 'Icons/logo-dark.svg';
import logoLight from 'Icons/logo-light.svg';
import addTask from 'Icons/icon-add-task-mobile.svg';
import ellipsis from 'Icons/icon-vertical-ellipsis.svg';

function getLogoType(isScreenMobile) {
  if (isScreenMobile) {
    return [logoMobile, 'mobile'];
  } else {
    return [
      localStorage.theme === 'dark' ? logoDark : logoLight,
      localStorage.theme,
    ];
  }
}

export function logo(isScreenMobile) {
  const logoType = getLogoType(isScreenMobile);
  return `<svg data-src=${logoType[0]} class="logo" id="logo" data-logo="${logoType[1]}"/>`;
}

export function topBar(boardsData) {
  if (boardsData[0] === undefined) {
    console.log(boardsData);
    boardsData[0] = { name: 'NO BOARDS' };
  }
  return `
    <div class="top-bar" id="top-bar">
      <div class="logo-container" id="logo-container"></div>
      <div class="board-title" id="board-title">
        <h1 class="board-title-title" id="board-title-heading">No Board Selected</h1>
      </div>
      <div class="board-controls">
        <button class="add-new-task-btn primary-btn-L" id="add-new-task-btn" data-has-tasks="false">
          <svg data-src=${addTask} class="add-new-task-icon"/>
          <h2 class="add-new-task-heading">Add New Task</h2>
        </button>
        <button class="board-options" id="board-options">
          <svg data-src=${ellipsis} class="board-options-icon"/>
        </button>
      </div>
    </div> 
  `;
}
