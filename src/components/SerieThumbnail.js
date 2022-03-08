import Component from './Component.js';
import Img from './Img.js';

export default class SerieThumbnail extends Component {
	constructor(name, image, description, episodes) {
		console.log('rfhzf', name);
		super('article', { name: 'class', value: 'serieThumbnail' }, [
			new Component('a', { name: 'href', value: image }, [
				new Component('h1', null, name),
				new Img(image),
				new Component('h4', null, description),
				new Component('p', null, `Episodes : ${episodes}`),
			]),
		]);
	}
}
