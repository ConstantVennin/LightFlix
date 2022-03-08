import Component from './Component.js';
import Img from './Img.js';

export default class SerieThumbnail extends Component {
	constructor(name, image, description) {
		super('article', { name: 'class', value: 'serieThumbnail' }, null);
		this.name = name;
		this.image = image;
		this.description = description;
	}

	render() {
		return /*html*/ `<article class=serieThumbnail><h1>${this.name}</h1><a href=${this.image}><img src=${this.image} alt=${this.name} ></a><p>${this.description}</p></article>`;
	}
}
