import { emptyBoard, tasksColumns } from 'Components/taskBar';

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

function clearTaskBar() {
  htmlElements.taskBar.innerHTML = '';
}

function updateAddNewTaskButton(buttonState) {
  htmlElements.addNewTaskButton.dataset.hasTasks = buttonState;
}

function loadEmptyTaskBar() {
  clearTaskBar();
  updateAddNewTaskButton(false);
  htmlElements.taskBar.insertAdjacentHTML('afterbegin', emptyBoard());
}

function generateRandomColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
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

function loadColumns(boardColumns) {
  updateAddNewTaskButton(true);
  clearTaskBar();
  htmlElements.taskBar.insertAdjacentHTML(
    'afterbegin',
    tasksColumns(boardColumns)
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
