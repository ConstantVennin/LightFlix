import { lineBreak } from 'acorn';
import $ from 'jquery';

export default class Router {
	static titleElement;
	static contentElement;
	/**
	 * Tableau des routes/pages de l'application.
	 * @example `Router.routes = [{ path: '/', page: pizzaList, title: 'La carte' }]`
	 */
	static routes = [];

	// propriété statique privée
	static #menuElement;
	/**
	 * Setter qui indique au Router la balise HTML contenant le menu de navigation.
	 * Écoute le clic sur chaque lien et déclenche la méthode navigate.
	 * @param element Élément HTML qui contient le menu principal
	 */
	static set menuElement(element) {
		this.#menuElement = element;
		//const links = this.#menuElement.querySelectorAll('a');

		const $links = $('a', this.#menuElement);
		$links.on('click', event => {
			event.preventDefault();
			this.navigate(event.currentTarget.getAttribute('href'));
		});
	}

	/**
	 * Affiche la page correspondant à `path` dans le tableau `routes`
	 * @param {String} path URL de la page à afficher
	 * @param {Boolean} pushState active/désactive le pushState (ajout d'une entrée dans l'historique de navigation)
	 */
	static navigate(path, pushState = true) {
		const route = this.routes.find(route => route.path === path);
		if (route) {
			// rendu du titre
			$(this.titleElement).html(`<h1>${route.title}</h1>`);
			// rendu de la page
			$(this.contentElement).html(route.page.render());
			// initialisation de la page
			route.page.mount?.(this.contentElement);

			// Activation/désactivation des liens du menu
			const $previousMenuLink = $('.active', this.#menuElement),
				$newMenuLink = $(`a[href="${path}"]`, this.#menuElement);
			$previousMenuLink?.removeClass('active'); // on retire la classe "active" du précédent menu
			$newMenuLink?.addClass('active'); // on ajoute la classe CSS "active" sur le nouveau lien

			// History API : ajout d'une entrée dans l'historique du navigateur
			// pour pouvoir utiliser les boutons précédent/suivant
			if (pushState) {
				window.history.pushState(null, null, path);
			}
		}
	}
}
