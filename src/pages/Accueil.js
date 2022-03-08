import Page from './Page';
import SerieThumbnail from '../components/SerieThumbnail';

export default class Accueil extends Page {
	constructor() {
		super('accueil'); // on pase juste la classe CSS souhaitée
	}

	mount(element) {
		super.mount(element);

		fetch('https://api.tvmaze.com/shows')
			.then(response => response.json())
			.then(data => {
				console.log(data);

				this.children = data.map(serie => {
					return new SerieThumbnail(
						serie.name,
						serie.image.medium,
						serie.summary,
						42
					);
				});
			}) //  maj des children
			.then(() => (this.element.html = this.render())); // affichage dans la page
	}
}
