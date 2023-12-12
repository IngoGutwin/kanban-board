const htmlElements = {
  sideBarBoards: null,
};

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

function loadBoardData(e) {
  if (e.currentTarget.id === 'create-new-board-btn') {
    createNewBoard();
  } else {
    htmlElements.sideBarBoards.forEach((board) => {
      if (
        board.classList.contains('side-bar-board') &&
        board.dataset.boardActive == 'true'
      ) {
        board.dataset.boardActive = false;
      }
    });
    e.currentTarget.dataset.boardActive = true;
  }
}

export function activateEventListenersTaskBar() {
  htmlElements.sideBarBoards = document
    .querySelector('#side-bar-boards')
    .querySelectorAll('button');
  htmlElements.sideBarBoards.forEach((button) => {
    button.addEventListener('click', loadBoardData);
  });
}
