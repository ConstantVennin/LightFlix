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
				const randomFilms = [];
				const alreadyPicked = [];

				for (let i = 0; i < 10; i++) {
					let rnd;
					do {
						rnd = parseInt(Math.random() * data.length, 10);
					} while (alreadyPicked.includes(rnd));

					randomFilms.push(data[rnd]);
					alreadyPicked.push(rnd);
				}

				this.children = randomFilms.map(serie => {
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
