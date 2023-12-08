import logoMobile from 'Icons/logo-mobile.svg';
import logoDark from 'Icons/logo-dark.svg';
import logoLight from 'Icons/logo-light.svg';
import addTask from 'Icons/icon-add-task-mobile.svg';
import ellipsis from 'Icons/icon-vertical-ellipsis.svg';

function getLogoType() {
  if (window.screen.availWidth < 700) {
    return [logoMobile, 'mobile'];
  } else {
    return [
      localStorage.theme === 'dark' ? logoDark : logoLight,
      localStorage.theme,
    ];
  }
}

export function logo() {
  const logoType = getLogoType();
  return `<svg data-src=${logoType[0]} class="logo" id="logo" data-logo="${logoType[1]}"/>`;
}

export function topBar(boardsData) {
  return `
    <div class="top-bar" id="top-bar">
      <div class="logo-container" id="logo-container"></div>
      <div class="board-title">
        <h1 class="board-title-title">${boardsData[0].name}</h1>
      </div>
      <div class="board-controls">
        <button class="add-new-task-btn">
          <svg data-src=${addTask} class="add-new-task-icon"/>
        </button>
        <button class="board-options">
          <svg data-src=${ellipsis} class="board-options-icon"/>
        </button>
      </div>
    </div> 
  `;
}
