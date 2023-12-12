import data from '../data/data.json';
import 'external-svg-loader';
import 'Styles/base.scss';
import { loadLayout } from 'Utils/loadLayout';
import { activateBoardTaskBar } from 'Utils/boardActions';

function loadApp() {
  loadLayout(data.boards);
  activateBoardTaskBar(data.boards);
}

window.addEventListener('load', loadApp);
