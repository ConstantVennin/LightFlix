import Page from './Page';
import SerieThumbnail from '../components/SerieThumbnail';

export default class Accueil extends Page {
	#series;

	constructor(series) {
		super('accueil'); // on pase juste la classe CSS souhaitée
		this.series = series;
	}

	mount(element) {
		super.mount(element);
		// appel ajax lorsque l'on affiche la page
		$(this.element).addClass('is-loading');
		fetch('http://localhost:8080/api/v1/pizzas')
			.then(response => response.json())
			.then(data => (this.pizzas = data)) //  maj des children
			.then(() => this.element.html(this.render())) // affichage dans la page
			.then(() => {
				$('.pizzaList .pizzaThumbnail a', this.element).on('click', event => {
					event.preventDefault();
					console.log(event.currentTarget.getAttribute('href'));
				});
			})
			.then($(this.element).removeClass('is-loading'));
	}

	set pizzas(value) {
		this.#series = value;
		this.children = this.#series.map(
			serie => new SerieThumbnail('truc', 'truc', 'truc', 'truc')
		);
	}
}
