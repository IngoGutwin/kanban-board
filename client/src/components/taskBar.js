function addNewColumnButton(cssClass) {
  return `
    <button class="${cssClass}" id="task-bar-add-new-column">+ Add New Column</button>
  `;
}

export function emptyBoard() {
  return `
    <div class="task-bar-empty-board" id="task-empty-board">
      <h2 class="task-bar-heading">This board is empty. Create a new column to get started.</h2>
      ${addNewColumnButton('primary-btn-L')}
    </div>
  `;
}

export function taskBar() {
  return `
    <div class="task-bar" id="task-bar" data-side-bar-toggle="${localStorage.sideBar}"></div>  
  `;
}

function loadSubTitle(subTasks) {
  const sumCompletedTasks = subTasks.reduce((total, current) => {
    if (current.isCompleted) {
      return (total += 1);
    } else {
      return (total += 0);
    }
  }, 0);
  return `
    ${subTasks.length < 1 ? '' : `${sumCompletedTasks}` + ' of'}
      ${subTasks.length} subtasks`;
}

function loadTasks(tasks) {
  const tasksHtml = tasks.map(
    (task, index) => `
      <div class="task-bar-task" id="task-bar-task-${index}" data-task-order="${index}">
        <h3 class="task-bar-task-heading">${task.title}</h3>
        <p 
          class="task-bar-task-subtasks">
            ${loadSubTitle(task.subtasks)} 
        </p>
      </div>
    `
  );
  return tasksHtml.join('');
}

export function tasksColumns(columns) {
  const columnsHtml = columns.map(
    (column, index) => `
      <div 
        class="task-bar-column" 
        id="column-${column.name.toLowerCase()}" 
        data-column="${index}"
      >
        <div 
          class="task-bar-column-name"
          id="task-bar-column-name"
        >
          <div 
            class="task-bar-column-tag-color"
            id="task-bar-column-tag-color-${index}"
          ></div>
          <h4 
            class="task-bar-heading" 
            id="task-bar-heading"
          >
              ${column.name.toLowerCase()} 
              ( ${column.tasks.length} )
          </h4>
        </div>
        ${loadTasks(column.tasks)}
      </div>
      
    `
  );
  columnsHtml.push(
    `<div class="task-bar-column task-bar-add-new-column">
        <h1>${addNewColumnButton('task-bar-add-new-column-button')}</h1>
    </div>`
  );
  return columnsHtml.join('');
}
