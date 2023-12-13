export function emptyBoard() {
  return `
    <div class="task-bar-empty-board" id="task-empty-board">
      <h2 class="task-bar-heading">This board is empty. Create a new column to get started.</h2>
      <button class="task-bar-add-new-column" id="task-bar-add-new-columns"></button>
    </div>
  `;
}

export function taskBar() {
  return `
    <div class="task-bar" id="task-bar" data-side-bar-toggle="${localStorage.sideBar}"></div>  
  `;
}
