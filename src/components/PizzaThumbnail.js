import Component from './Component.js';
import Img from './Img.js';

export default class PizzaThumbnail extends Component {
	constructor({ name, image, price_small, price_large }) {
		super('article', { name: 'class', value: 'pizzaThumbnail' }, [
			new Component('a', { name: 'href', value: image }, [
				new Img(image),
				new Component('section', null, [
					new Component('h4', null, name),
					new Component('ul', null, [
						new Component(
							'li',
							null,
							`Prix petit format : ${price_small.toFixed(2)} €`
						),
						new Component(
							'li',
							null,
							`Prix grand format : ${price_large.toFixed(2)} €`
						),
					]),
				]),
			]),
		]);
	}
}
