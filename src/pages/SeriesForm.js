import Router from '../Router.js';
import Page from './Page.js';
import SerieThumbnail from '../components/SerieThumbnail';

export default class SeriesForm extends Page {
	seriesResult;

	name = '';
	render() {
		let page = /*html*/ `
        <form class="SeriesForm">
            <label class="searchBar">
                <input class="searchBarInput" type="text" name="name" value=${this.name}>
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

			<ul class="triSection" id="">
				<li class="triPar"><a href="#">tri par</a>
					<ul class="listTri">
						<li class="triElement"><a id="pertinence">pertinence</a></li>
						<li class="triElement"><a id="note">note décroissante</a></li>
						<li class="triElement"><a id="date">date</a></li>
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
			this.submit();
		});

		const serieThumbnails = document.querySelectorAll('.serieThumbnail a');

		serieThumbnails.forEach(a => {
			a.addEventListener('click', event => {
				event.preventDefault();
				Router.navigate('/' + a.getAttribute('href').split('/')[3]);
			});
		});

		const pertinence = document.getElementById('pertinence');
		pertinence.addEventListener('click', () => {
			this.submit('pertinence');
		});

		const note = document.getElementById('note');
		note.addEventListener('click', () => {
			this.submit('note');
		});

		const date = document.getElementById('date');
		date.addEventListener('click', () => {
			this.submit('date');
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
	submit(query) {
		this.name = this.getInputValue('name');

		if (this.name == '') {
			const elementLoading = document.querySelector('.pageContent');
			elementLoading.classList.add('is-loading');
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
				})
				.then(elementLoading.classList.remove('is-loading'));
		} else {
			const elementLoading = document.querySelector('.pageContent');
			elementLoading.classList.add('is-loading');
			fetch(`https://api.tvmaze.com/search/shows?q=${this.name}`)
				.then(response => response.json())
				.then(data => {
					if (query == 'date') {
						data.sort(this.compareDate);
					} else if (query == 'note') {
						data.sort(this.compareNote);
					}

					this.children = SerieThumbnail.formData(
						data.map(result => result.show)
					);
				})
				.then(() => {
					this.element.html = this.render();
					Router.navigate('/');
				})
				.then(elementLoading.classList.remove('is-loading'));
		}
	}

	compareDate(date1, date2) {
		const d1 = date1.show.premiered,
			d2 = date2.show.premiered;

		if (d1 == undefined) return 1;
		if (d2 == undefined) return -1;

		const date1split = date1.show.premiered.split('-');
		const date2split = date2.show.premiered.split('-');

		for (let i = 0; i < date1split.length; i++) {
			let value = parseInt(date2split[i]) - parseInt(date1split[i]);
			if (value != 0) {
				return value;
			}
		}
		return 0;
	}

	compareNote(serie1, serie2) {
		const noteSerie1 = serie1.show.rating.average;
		const noteSerie2 = serie2.show.rating.average;

		if (noteSerie1 == undefined) return 1;
		if (noteSerie2 == undefined) return -1;

		return parseInt(noteSerie2) - parseInt(noteSerie1);
	}
}
