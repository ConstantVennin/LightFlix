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

		const elementLoading = document.querySelector('.pageContent');
		elementLoading.classList.add('is-loading');

		fetch(`https://api.tvmaze.com/shows/${this.id}`)
			.then(response => {
				if (!response.ok) {
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
						let lastEpisodes = [];
						const nbEpisodes = 5;

						for (
							let i = data.length - 1;
							i > Math.max(data.length - 1 - nbEpisodes, 0);
							i--
						) {
							lastEpisodes.push(data[i]);
						}
						this.episodes = lastEpisodes.map(
							episode => new EpisodeThumbnail(episode)
						);
						elementLoading.classList.remove('is-loading');
					});
			})
			.catch(() => {
				Router.displayErrorPage(
					'Série introuvable !',
					"La serie que vous cherchez n'exise pas"
				);
				elementLoading.classList.remove('is-loading');
			});
	}

	set episodes(value) {
		this.#episodes = value;

		this.#episodes.forEach(element => {
			document.querySelector('.pageContent').innerHTML += element.render();
		});
	}
}
