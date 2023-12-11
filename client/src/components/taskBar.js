function emptyBoard() {
  return `
    <div class="task-bar-empty-board" id="task-empty-board">
      <h1 class="task-bar-heading"><h1>
    </div>
  `;
}

export function taskBar() {
  return `
    <div class="task-bar" id="task-bar">
      ${emptyBoard()}
    </div>  
  `;
}
