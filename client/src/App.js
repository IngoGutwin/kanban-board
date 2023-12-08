import data from '../data/data.json';
import 'external-svg-loader';
import 'Styles/base.scss';
import { loadLayout } from 'Utils/loadLayout.js';

function loadApp() {
  loadLayout(data.boards);
}

window.addEventListener('load', loadApp);
