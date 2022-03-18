import Component from './Component';

export default class EpisodeThumbnail extends Component {
	constructor(episode) {
		super('article', { name: 'class', value: 'episodeThumbnail' }, null);
		this.title = episode.name;
		let img;
		try {
			img = episode.image.medium;
		} catch (error) {
			img = '../../images/not-found.png';
		}
		this.image = img;
		this.date = episode.airdate;
		this.summary = episode.summary;
	}

	render() {
		let page = `<article class=episodeThumbnail><img class="episodeElement"`;
		if (this.image) {
			page += `<img src=${this.image} alt=${this.title} >`;
		} else {
			page += `<img src="../../images/not-found.png" alt=${this.name} >`;
		}

		if (this.title) page += `<h1 class="episodeElement">${this.title}</h1>`;
		if (this.date) page += `<h2 class="episodeElement">${this.date}</h2>`;
		if (this.summary)
			page += `<button class="episodeElement">Dévoiler le résumé</button> ${this.summary}`;

		return page + '</article>';
	}

	static formData(data) {
		return data.map(episode => {
			let image;
			try {
				image = episode.image.medium;
			} catch (error) {
				image = null;
			}

			return new EpisodeThumbnail(
				episode.name,
				image,
				episode.airdate,
				episode.summary
			);
		});
	}
}
