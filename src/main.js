import Router from './Router';
import Accueil from './pages/Accueil';
import Equipe from './pages/Equipe';
import SeriesForm from './pages/SeriesForm';

const accueil = new Accueil(),
	seriesForm = new SeriesForm(),
	equipe = new Equipe();

Router.routes = [
	{ path: '/', page: accueil, title: 'Bienvenue sur LightFlix !' },
	{ path: '/serie', page: seriesForm, title: 'Chercher une série' },
	{ path: '/notre-equipe', page: equipe, title: 'Notre Equipe' },
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
