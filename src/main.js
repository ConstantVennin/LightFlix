import Router from './Router';
import Accueil from './pages/Accueil';
import Equipe from './pages/Equipe';

const accueil = new Accueil(),
	equipe = new Equipe();

Router.routes = [
	{ path: '/', page: accueil, title: 'Accueil' },
	{ path: '/serie', page: accueil, title: 'Chercher une série' },
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
