import EpisodeThumbnail from '../components/EpisodeThumbnail.js';
import Router from '../Router.js';
import Page from './Page.js';

export default class SerieDetails extends Page {
	id;

	render() {
		let page = /*html*/ `<p> ${this.id} </p>`;

		if (this.children) {
			this.children.forEach(child => {
				page += child.render();
			});
		}

		return page;
	}

	setId(id) {
		this.id = id;
	}

	mount(element) {
		super.mount(element);

		fetch(`https://api.tvmaze.com/shows/${this.id}/episodes`)
			.then(response => response.json())
			.then(data => {
				this.children = EpisodeThumbnail.formData(data);
			})
			.then(() => {
				this.element.html = this.render();
				Router.navigate(`/serie-${this.id}`);
			});
	}
}
