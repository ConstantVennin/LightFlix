import EpisodeThumbnail from '../components/EpisodeThumbnail.js';
import DetailThumbnail from '../components/DetailThumbnail.js';
import Router from '../Router.js';
import Page from './Page.js';

export default class SerieDetails extends Page {
	id;

	#episodes;

	render() {
		return /*html*/ `<div class="serieDetail"></div><div class="episodeList"></div>`;
	}

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
				document.querySelector('.serieDetail').innerHTML = new DetailThumbnail(
					data
				).render();

				let episodes;
				fetch(`https://api.tvmaze.com/shows/${this.id}/episodes`)
					.then(response => response.json())
					.then(data => {
						console.log(data);
						this.episodes = data.map(episode => new EpisodeThumbnail(episode));
					});
			})
			.catch(error => alert(error.message));
	}

	set episodes(value) {
		this.#episodes = value;

		const episodeList = document.querySelector('.episodeList');
		this.children = this.#episodes;

		if (episodeList && this.children) {
			episodeList.innerHTML = '';
			this.children.forEach(element => {
				episodeList.innerHTML += element.render();
			});
		}
	}
}
