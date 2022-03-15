import { lineBreak } from 'acorn';

export default class Router {
	static titleElement;
	static contentElement;
	/**
	 * Tableau des routes/pages de l'application.
	 * @example `Router.routes = [{ path: '/', page: pizzaList, title: 'La carte' }]`
	 */
	static routes = [];

	// C.3. Navigation en JS : Le menu
	static #menuElement; // propriété statique privée
	/**
	 * Setter qui indique au Router la balise HTML contenant le menu de navigation.
	 * Écoute le clic sur chaque lien et déclenche la méthode navigate.
	 * @param element Élément HTML qui contient le menu principal
	 */
	static set menuElement(element) {
		this.#menuElement = element;
		const links = this.#menuElement.querySelectorAll('a');
		links.forEach(link =>
			link.addEventListener('click', event => {
				event.preventDefault();
				this.navigate(event.currentTarget.getAttribute('href'));
			})
		);
	}

	/**
	 * Affiche la page correspondant à `path` dans le tableau `routes`
	 * @param {String} path URL de la page à afficher
	 * @param {Boolean} pushState active/désactive le pushState (ajout d'une entrée dans l'historique de navigation)
	 */
	static navigate(path, pushState = true) {
		const route = this.routes.find(route => {
			return path.match(route.path) == path;
		});

		if (route) {
			if (route.title != '') {
				this.titleElement.innerHTML = `<h1>${route.title}</h1>`;
			} else {
				this.titleElement.innerHTML = '';
			}

			if (path.includes('/serie-')) {
				route.page.setId(path.split('-')[1]);
			}

			this.contentElement.innerHTML = route.page.render();
			// D.2. Préparatifs : La classe Page
			route.page.mount?.(this.contentElement);

			// E.1. Activation du menu
			const previousMenuLink = this.#menuElement.querySelector('.active'),
				newMenuLink = this.#menuElement.querySelector(`a[href="${path}"]`);
			previousMenuLink?.classList.remove('active'); // on retire la classe "active" du précédent menu
			newMenuLink?.classList.add('active'); // on ajoute la classe CSS "active" sur le nouveau lien

			// E.2. History API
			if (pushState) {
				window.history.pushState(null, null, path);
			}
		}
	}
}
