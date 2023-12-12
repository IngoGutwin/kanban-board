const htmlElements = {
  sideBarBoards: null,
  activeBoard: null,
  addNewTaskButton: null,
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

function updateBoardState() {
  htmlElements.sideBarBoards.forEach((board) => {
    if (
      board.classList.contains('side-bar-board') &&
      board.dataset.boardActive == 'true'
    ) {
      board.dataset.boardActive = false;
    }
  });
}

function processInteractionOnBoards(e) {
  if (e.currentTarget.id === 'create-new-board-btn') {
    createNewBoard();
  } else {
    updateBoardState();
    e.currentTarget.dataset.boardActive = true;
    htmlElements.activeBoard = e.currentTarget;
    loadBoardData();
  }
}

function updateAddNewTaskButton(buttonState) {
  htmlElements.addNewTaskButton.dataset.hasTasks = buttonState;
}

function loadEmptyTaskBar() {
  updateAddNewTaskButton(false);
  console.log('empty TaskBar');
}

function loadTasks(boardData) {
  updateAddNewTaskButton(true);
}

function loadBoardData() {
  let activeBoard = htmlElements.activeBoard.innerText;
  boards.forEach((board) => {
    if (board?.name == activeBoard) {
      board?.columns != undefined ? loadTasks(board) : loadEmptyTaskBar();
    }
  });
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
}

export function activateBoardTaskBar(boardsData) {
  boards = boardsData;
  getHtmlElements();
  activateEventListeners();
}
