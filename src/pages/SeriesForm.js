import Router from '../Router.js';
import Page from './Page.js';
import SerieThumbnail from '../components/SerieThumbnail';

export default class SeriesForm extends Page {
	#series;

	render() {
		return /*html*/ `
        <form class="SeriesForm">
            <label class="searchBar">
                <input class="searchBarInput" type="text" name="name">
            </label>	
            <br>

			<ul class="triSection" id="">
				<li class="triPar"><a href="#">tri par</a>
					<ul class="listTri">
						<li class="triElement"><a id="pertinence">pertinence</a></li>
						<li class="triElement"><a id="note">note décroissante</a></li>
						<li class="triElement"><a id="date">date</a></li>
					</ul>
				</li>
				<a id="inverserTri">Inverser</a>
			</ul>
            <button type="submit">Rechercher</button>
        </form>
		
		<div class="seriesList"></div>`;
	}

	mount(element) {
		super.mount(element);

		const form = document.querySelector('form', this.element);
		form.addEventListener('submit', event => {
			event.preventDefault();
			this.submit();
		});

		const pertinence = document.querySelector('#pertinence');
		pertinence.addEventListener('click', () => {
			this.submit();
		});

		const note = document.querySelector('#note');
		note.addEventListener('click', () => {
			this.series = this.#series.sort(SerieThumbnail.compareNote);
		});

		const date = document.querySelector('#date');
		date.addEventListener('click', () => {
			this.series = this.#series.sort(SerieThumbnail.compareDate);
		});

		const inverserTri = document.querySelector('#inverserTri');
		inverserTri.addEventListener('click', () => {
			this.series = this.#series.reverse();
		});

		this.submit();
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

		const elementLoading = document.querySelector('.pageContent');
		elementLoading.classList.add('is-loading');

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

					this.series = randomFilms.map(serie => new SerieThumbnail(serie));
				})
				.then(elementLoading.classList.remove('is-loading'));
		} else {
			fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
				.then(response => response.json())
				.then(data => {
					this.series = data.map(serie => new SerieThumbnail(serie.show));
				})
				.then(elementLoading.classList.remove('is-loading'));
		}
	}

	set series(value) {
		this.#series = value;

		const seriesList = document.querySelector('.seriesList');
		this.children = this.#series;

		if (seriesList && this.children) {
			seriesList.innerHTML = '';
			this.children.forEach(element => {
				seriesList.innerHTML += element.render();
			});
		}

		const serieThumbnails = document.querySelectorAll('.serieThumbnail a');
		serieThumbnails.forEach(a => {
			a.addEventListener('click', event => {
				event.preventDefault();
				Router.navigate('/' + a.getAttribute('href').split('/')[3]);
			});
		});
	}
}
