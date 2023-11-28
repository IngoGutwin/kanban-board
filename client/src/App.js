import 'Styles/base.scss';
import topBarMobile from './components/topBarMobile';
import topBar from './components/topBar';
import { setThemeMode, toggleThemeMode } from './utils/themeMode';

const app = document.querySelector('#app');

function loadApp() {
  setThemeMode();
}

function checkTheme() {
  toggleThemeMode();
  console.log(localStorage.theme);
}

window.addEventListener('load', loadApp);
window.addEventListener('click', checkTheme);
