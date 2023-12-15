import { emptyBoard } from 'Components/taskBar';

const htmlElements = {
  sideBarBoards: null,
  activeBoard: null,
  addNewTaskButton: null,
  taskBar: null,
  boardTitleHeading: null,
  taskBarColumnName: null,
};

let boards = null;

function createNewBoard() {
  const newBoard = {
    title: 'New Boards',
    description: '',
    status: 'Todo',
    subtasks: [
      {
        title: 'Account page',
        isCompleted: false,
      },
      {
        title: 'Billing page',
        isCompleted: false,
      },
    ],
  };
  console.log(newBoard);
}

function updateAddNewTaskButton(buttonState) {
  htmlElements.addNewTaskButton.dataset.hasTasks = buttonState;
}

function loadEmptyTaskBar() {
  updateAddNewTaskButton(false);
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

function clearTaskBar() {
  htmlElements.taskBar.innerHTML = '';
}

function generateRandomColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  console.log(randomColor);
  return randomColor;
}

function loadTagColor() {
  htmlElements.taskBarColumnName = document.querySelectorAll(
    '#task-bar-column-name'
  );
  htmlElements.taskBarColumnName.forEach(
    (item) =>
      (item.children[0].style.backgroundColor = '#' + generateRandomColor())
  );
}

function getColumnsHtml(columns) {
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
    '<div class="task-bar-column task-bar-add-new-column"><h1 class="task-bar-add-new-column-button" id="task-bar-add-new-column-button">+ New Column</h1></div>'
  );
  return columnsHtml.join('');
}

function loadColumns(boardColumns) {
  updateAddNewTaskButton(true);
  clearTaskBar();
  htmlElements.taskBar.insertAdjacentHTML(
    'afterbegin',
    getColumnsHtml(boardColumns)
  );
  loadTagColor();
}

function checkTasksOnBoard() {
  let activeBoard = htmlElements.activeBoard.innerText;
  boards.forEach((board) => {
    if (board?.name == activeBoard) {
      board?.columns != undefined
        ? loadColumns(board.columns)
        : loadEmptyTaskBar();
    }
  });
}

function updateBoardState(currentTarget) {
  htmlElements.sideBarBoards.forEach((board) => {
    if (
      board.classList.contains('side-bar-board') &&
      board.dataset.boardActive == 'true'
    ) {
      board.dataset.boardActive = false;
    }
  });
  currentTarget.dataset.boardActive = true;
  htmlElements.activeBoard = currentTarget;
  htmlElements.boardTitleHeading.innerText = htmlElements.activeBoard.innerText;
  checkTasksOnBoard();
}

function processInteractionOnBoards(e) {
  if (e.currentTarget.id === 'create-new-board-btn') {
    createNewBoard();
  } else {
    updateBoardState(e.currentTarget);
  }
}

function activateEventListeners() {
  htmlElements.sideBarBoards.forEach((button) => {
    button.addEventListener('click', processInteractionOnBoards);
  });
}

function getHtmlElements() {
  htmlElements.sideBarBoards = document
    .querySelector('#side-bar-boards')
    .querySelectorAll('button');
  htmlElements.addNewTaskButton = document.querySelector('#add-new-task-btn');
  htmlElements.taskBar = document.querySelector('#task-bar');
  htmlElements.boardTitleHeading = document.querySelector(
    '#board-title-heading'
  );
}

export function handleBoards(boardsData) {
  boards = boardsData;
  getHtmlElements();
  activateEventListeners();
}
