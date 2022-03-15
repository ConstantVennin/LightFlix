import Router from '../Router.js';
import Page from './Page.js';
import SerieThumbnail from '../components/SerieThumbnail';

export default class SeriesForm extends Page {
	seriesResult;

	render() {
		let page = /*html*/ `
        <form class="SeriesForm">
            <label>
                Nom :
                <input type="text" name="name">
            </label>	
            <br>
			<!--
            <input type="radio" id="notYetAired" name="status" value="notYetAired">
            <label for="notYetAired"> Not yet aired </label><br>
            <input type="radio" id="airing" name="status" value="airing">
            <label for="airing"> Airing </label><br>
            <input type="radio" id="finished" name="status" value="finished">
            <label for="finished"> Finished </label><br>
            <input type="radio" id="idc" name="status" value="idc">
            <label for="idc"> I don't care </label> -->

			<ul id="">
				<li><a href="#">tri par</a>
					<ul>
						<li><a href="#" id="pertinence">pertinence</a></li>
						<li><a href="#" id="note">note décroissante</a></li>
						<li><a href="#" id="date">date</a></li>
					</ul>
				</li>
			</ul>
            <button type="submit">Rechercher</button>
        </form>
		
		<div class="seriesList">
		`;

		if (this.children != undefined) {
			if (this.children.length != 0) {
				this.children.forEach(child => {
					page += child.render();
				});
			} else {
				page += "<h1>Aucun série trouvée :'(</h1>";
			}
		}

		return page + '</div>';
	}

	mount(element) {
		super.mount(element);
		// une fois la page affichée, on détecte la soumission du formulaire
		const form = document.querySelector('form', this.element);
		form.addEventListener('submit', event => {
			event.preventDefault();
			this.submit(event);
		});

		const serieThumbnails = document.querySelectorAll('.serieThumbnail a');

		serieThumbnails.forEach(a => {
			a.addEventListener('click', event => {
				event.preventDefault();
				Router.navigate('/' + a.getAttribute('href').split('/')[3]);
			});
		});

		if (this.children == undefined) {
			this.submit();
		}
	}

	/**
	 * Retourne la valeur saisie par l'utilisateur dans le champ de formulaire
	 * dont le nom correspond à `inputName`
	 * @param {string} inputName nom du champ de formulaire
	 */
	getInputValue(inputName) {
		return this.element.querySelector(`input[name="${inputName}"]`)?.value;
	}
	/**
	 * Récupère les infos saisies par l'utilisateur, les vérifie
	 * puis les envoie au serveur REST
	 */
	submit() {
		const name = this.getInputValue('name');

		if (name == '') {
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

					this.children = SerieThumbnail.formData(randomFilms);
				})
				.then(() => {
					this.element.html = this.render();
					Router.navigate('/');
				});
		} else {
			fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
				.then(response => response.json())
				.then(data => {
					this.children = SerieThumbnail.formData(
						data.map(result => result.show)
					);
				})
				.then(() => {
					this.element.html = this.render();
					Router.navigate('/');
				});
		}
	}
}
