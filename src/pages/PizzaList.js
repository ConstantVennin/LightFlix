import Page from './Page';
import PizzaThumbnail from '../components/PizzaThumbnail';
import $ from 'jquery';

export default class PizzaList extends Page {
	#pizzas;

	constructor(pizzas) {
		super('pizzaList'); // on pase juste la classe CSS souhaitée
		this.pizzas = pizzas;
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
		this.#pizzas = value;
		this.children = this.#pizzas.map(pizza => new PizzaThumbnail(pizza));
	}
}
