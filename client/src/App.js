import data from '../data/data.json';
import 'external-svg-loader';
import 'Styles/base.scss';
import { loadLayout } from 'Utils/loadLayout';
import { activateEventListenersTaskBar } from 'Utils/taskBar';

function loadApp() {
  loadLayout(data.boards);
  activateEventListenersTaskBar(data.boards);
}

window.addEventListener('load', loadApp);
