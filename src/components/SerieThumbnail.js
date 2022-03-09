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
		let page =
			'<article class=serieThumbnail><a href= "http://localhost:8000/serie-${this.id}">';
		if (this.image) page += `<img src=${this.image} alt=${this.name} >`;
		if (this.name) page += `<h1>${this.name}</h1>`;
		if (this.note) page += `<h4>Note : ${this.note}/10</h4>`;
		if (this.description) {
			if (this.description.length > 500) {
				page += `<p>${this.description.substring(0, 500)} [...]</p>`;
			} else {
				page += `${this.description}`;
			}
		}
		return page + '</a></article>';
	}

	static formData(data) {
		console.log(data);
		return data.map(serie => {
			let image;
			try {
				image = serie.image.medium;
			} catch (error) {
				image = null;
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
