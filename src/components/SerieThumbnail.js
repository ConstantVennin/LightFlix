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
		let page = `<article class=serieThumbnail><a href= "http://localhost:8000/serie-${this.id}">`;
		if (this.image) page += `<img src=${this.image} alt=${this.name} >`;
		if (this.name) page += `<h1 class="serieText">${this.name}`;
		if (this.date) {
			page += `<h2 class="serieText">${this.date}</h2></h1>`;
		} else {
			page += `</h1>`;
		}
		if (this.note)
			page += `<div class="progress serieText">
						<div class="progress-bar" role="progressbar" style="width: ${
							this.note * 10
						}%" aria-valuenow="${
				this.note * 10
			}" aria-valuemin="0" aria-valuemax="100">${this.note}/10</div>
					 </div>`;
		if (this.description) {
			if (this.description.length > 500) {
				page += `<p class="serieText">${this.description.substring(
					0,
					500
				)} [...]</p>`;
			} else {
				page += `<p class="serieText">${this.description}</p>`;
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
