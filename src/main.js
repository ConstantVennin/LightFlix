import Router from './Router';
import Equipe from './pages/Equipe';
import SeriesForm from './pages/SeriesForm';

const seriesForm = new SeriesForm(),
	equipe = new Equipe();

Router.routes = [
	{ path: '/', page: seriesForm, title: 'Nos Series' },
	{ path: '/lequipe', page: equipe, title: 'Notre Equipe' },
];

Router.titleElement = document.querySelector('.pageTitle');
Router.contentElement = document.querySelector('.pageContent');
Router.menuElement = document.querySelector('.mainMenu');

window.onpopstate = () => {
	Router.navigate(document.location.pathname, false);
};

// deep linking
Router.navigate(document.location.pathname);

const logo = document.querySelector('.logo');
logo.addEventListener('click', event => {
	event.preventDefault();
	Router.navigate('/');
});
