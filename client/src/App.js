import 'Styles/base.scss';
import topBarMobile from './components/topBarMobile';

const app = document.querySelector('#app');

app.insertAdjacentHTML('afterbegin', topBarMobile());
