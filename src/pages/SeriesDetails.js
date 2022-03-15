import Router from '../Router.js';
import Page from './Page.js';

export default class SerieDetails extends Page {
	id;

	render() {
		let page = /*html*/ `<p> ${this.id} </p>`;
		return page;
	}

	setId(id) {
		this.id = id;
	}

	mount(element) {
		super.mount(element);
	}
}
