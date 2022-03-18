import Component from './Component';

export default class EpisodeThumbnail extends Component {
	constructor(title, image, date, summary) {
		super('article', { name: 'class', value: 'episodeThumbnail' }, null);
		this.title = title;
		this.image = image;
		this.date = date;
		this.summary = summary;
	}

	render() {
		let page = `<img class="episodeElement"`;
		if (this.image) {
			page += `<img src=${this.image} alt=${this.title} >`;
		} else {
			page += `<img src="../../images/not-found.png" alt=${this.name} >`;
		}

		if (this.title) page += `<h1 class="episodeElement">${this.title}</h1>`;
		if (this.date) page += `<h2 class="episodeElement">${this.date}</h2>`;
		if (this.summary)
			page += `<button class="episodeElement">Dévoiler le résumé</button> ${this.summary}`;

		return page;
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
