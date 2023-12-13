import data from '../data/data.json';
import 'external-svg-loader';
import 'Styles/base.scss';
import { loadLayout } from 'Utils/loadLayout';
import { handleBoards } from 'Utils/boardHandler';

function loadApp() {
  loadLayout(data.boards);
  handleBoards(data.boards);
}

window.addEventListener('load', loadApp);
