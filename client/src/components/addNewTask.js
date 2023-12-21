import crossIcon from 'Icons/icon-cross.svg';

export function addNewTaskPanel() {
  return `
    <div class="screen-overlay" id="screen-overlay">
      <form class="add-new-task-form" id="add-new-task-form">
        <h2 class="new-task-form-heading">Add New Task</h2>
        <ul>
          <li class="new-task-form-list-item title">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" placeholder="e.g. Take coffee break"/>
          </li>
          <li class="new-task-form-list-item description">
            <label for="description">Description</label>
            <textarea
              type="text" 
              id="description" 
              name="description"
              cols="1"
              rows="1"
            />
            </textarea>
          </li>
          <li class="new-task-form-list-item subtasks">
            <label for="subtasks">Subtasks</label>
            <div class="subtasks-container" id="subtasks-container">
              <div class="new-task-form-subtask-item">
                <input type="text" id="subtasks" name="subtask"/>
                <button class="remove-subtask-btn">
                  <svg data-src=${crossIcon} class="remove-subtask-icon" id="remove-subtask-1"/>
                </button>
              </div>
              <div class="new-task-form-subtask-item">
                <input type="text" id="subtasks" name="subtask"/>
                <button class="remove-subtask-btn">
                  <svg data-src=${crossIcon} class="remove-subtask-icon" id="remove-subtask-2"/>
                </button>
              </div>
            </div>
            <button 
              class="add-new-subtask-btn secondary-btn" 
              id="add-new-subtask-btn">
                + Add New Subtask
              </button>
          </li> 
          <li class="new-task-form-list-item status">
            <label for="create-task">Status</label>
            <input type="text" id="create-task" name="create-task"/>
            <button 
              class="primary-btn-L" 
              id="create-new-task-btn">
                + Add New Subtask
              </button>
          </li>
        </ul>
      </form>
    </div>
  `;
}

export function getNewSubtaskHtml() {
  return `
    <div class="new-task-form-subtask-item">
      <input type="text" id="subtasks" name="subtask"/>
      <button class="add-new-subtask-btn">
        <svg data-src=${crossIcon} class="add-new-subtask-icon" id="remove-subtask-2"/>
      </button>
    </div>
  `;
}
