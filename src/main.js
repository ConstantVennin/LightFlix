import Router from './Router';
import PizzaList from './pages/PizzaList';
import Component from './components/Component';
import PizzaForm from './pages/PizzaForm';
//import $ from 'jquery';
import Element from './lib/jqlite.js';
import $ from './lib/jqlite.js';

const pizzaList = new PizzaList([]),
	aboutPage = new Component('section', null, 'Ce site est génial'),
	pizzaForm = new PizzaForm();

Router.routes = [
	{ path: '/', page: pizzaList, title: 'La carte' },
	{ path: '/a-propos', page: aboutPage, title: 'À propos' },
	{ path: '/ajouter-pizza', page: pizzaForm, title: 'Ajouter une pizza' },
];
Router.titleElement = $('.pageTitle');
Router.contentElement = $('.pageContent');
Router.menuElement = $('.mainMenu');

// History API (gestion des boutons précédent/suivant du navigateur)
window.onpopstate = () => {
	Router.navigate(document.location.pathname, false);
};
// deep linking
Router.navigate(document.location.pathname);

// TP4 - B.2. Charger un fichier statique
function displayNews(html) {
	const $newsContainer = $('.newsContainer');
	// injection du contenu chargé dans la page
	$newsContainer.html(html);
	// affichage du bandeau de news
	$newsContainer.show();

	// gestion du bouton fermer
	const $closeButton = ('.closeButton', $newsContainer);
	$closeButton.on('click', event => {
		event.preventDefault();
		$newsContainer.hide();
	});
}
fetch('./news.html')
	.then(response => response.text())
	.then(displayNews);

/*
console.log($('.logo span').html('jQuery<em>forever</em>'));
$('a').html('jQuery<em>forever</em>');
*/

$('.logo').on('click', event => {
	event.preventDefault();
	Router.navigate('/');
});
