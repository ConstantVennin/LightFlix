import Component from './Component.js';
import Img from './Img.js';

export default class SerieThumbnail extends Component {
	constructor(id, image, name, date, description, note) {
		super('article', { name: 'class', value: 'serieThumbnail' }, null);
		this.id = id;
		this.image = image;
		this.name = name;
		this.date = date;
		this.description = description;
		this.note = note;
	}

	render() {
		let page = '<article class=serieThumbnail>';
		page += `<a href= "http://localhost:8000/serie-${this.id}"><img src=${this.image} alt=${this.name} ></a>`;
		page += `<h1>${this.name}</h1>`;
		page += `${this.description}`;
		if (this.note) page += `<h3>${this.note}</h3>`;

		return page + '</article>';
	}

	static formData(data) {
		console.log(data);
		return data.map(serie => {
			let image;
			try {
				image = serie.image.medium;
			} catch (error) {
				image = '../../img/no-image-found-360x260.png';
			}

			return new SerieThumbnail(
				serie.id,
				image,
				serie.name,
				serie.premiered,
				serie.summary,
				serie.rating.average
			);
		});
	}
}
