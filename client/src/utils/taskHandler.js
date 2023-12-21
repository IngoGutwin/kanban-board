import { addNewTaskPanel, getNewSubtaskHtml } from 'Components/addNewTask';

const htmlElements = {
  addNewTaskBtn: null,
  appContainer: null,
};

let boards = null;

function addNewTask() {}

function getHtmlElements() {
  htmlElements.addNewTaskBtn = document.querySelector('#add-new-task-btn');
  htmlElements.appContainer = document.querySelector('#app');
}

function addNewSubTask(e) {
  e.preventDefault();
  const subtaskContainer = document.querySelector(
    '#screen-overlay #subtasks-container'
  );
  subtaskContainer.insertAdjacentHTML('afterbegin', getNewSubtaskHtml());
}

function activateEventListenerSubtasks() {
  const addNewSubTaskBtn = document.querySelector(
    '#screen-overlay #add-new-subtask-btn'
  );
  addNewSubTaskBtn.addEventListener('click', addNewSubTask, false);
}

function handleScreenOverlay() {
  const screenOverlay = document.querySelector('#screen-overlay');
  screenOverlay.addEventListener('click', (e) => {
    if (e.target.id === 'screen-overlay') {
      screenOverlay.remove();
    }
  });
}

function openAddNewTaskForm() {
  if (htmlElements.addNewTaskBtn.dataset.hasTasks === 'true') {
    htmlElements.appContainer.insertAdjacentHTML(
      'afterbegin',
      addNewTaskPanel()
    );
    handleScreenOverlay();
    activateEventListenerSubtasks();
  }
}

export function activateTaskEvents(boardsData) {
  getHtmlElements();
  boards = boardsData;
  htmlElements.addNewTaskBtn.addEventListener('click', openAddNewTaskForm);
}
