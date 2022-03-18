import EpisodeThumbnail from '../components/EpisodeThumbnail.js';
import DetailThumbnail from '../components/DetailThumbnail.js';
import Router from '../Router.js';
import Page from './Page.js';

export default class SerieDetails extends Page {
	id;

	#episodes;

	setId(id) {
		this.id = id;
	}

	mount(element) {
		super.mount(element);

		fetch(`https://api.tvmaze.com/shows/${this.id}`)
			.then(response => {
				if (!response.ok) {
					// en cas d'erreur serveur on averti l'utilisateur
					throw new Error(`Erreur : ${response.statusText}`);
				}
				return response.json();
			})
			.then(data => {
				document.querySelector('.pageContent').innerHTML = new DetailThumbnail(
					data
				).render();

				fetch(`https://api.tvmaze.com/shows/${this.id}/episodes`)
					.then(response => response.json())
					.then(data => {
						this.episodes = data.map(episode => new EpisodeThumbnail(episode));
					});
			})
			.catch(error => alert(error.message));
	}

	set episodes(value) {
		this.#episodes = value;

		this.#episodes.forEach(element => {
			document.querySelector('.pageContent').innerHTML += element.render();
		});
	}
}
