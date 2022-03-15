import Router from '../Router.js';
import Page from './Page.js';
import SerieThumbnail from '../components/SerieThumbnail';

export default class SeriesForm extends Page {
	seriesResult;

	query;
	name;
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
						<li><a  id="pertinence">pertinence</a></li>
						<li><a  id="note">note décroissante</a></li>
						<li><a id="date">date</a></li>
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
			this.query = 'pertinence';
			console.log(this.query);
			this.submit();
		});

		const note = document.getElementById('note');
		note.addEventListener('click', () => {
			this.query = 'note';
			console.log(this.query);
			this.submit();
		});

		const date = document.getElementById('date');
		date.addEventListener('click', () => {
			this.query = 'date';
			console.log(this.query);
			this.submit();
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
		let name;
		if (this.name != undefined) {
			name = this.name;
		} else {
			this.name = this.getInputValue('name');
			name = this.name;
		}
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
					console.log('dans le then', this.query);
					if (this.query == 'date') {
						data.sort(this.compareDate);
					}
					data.forEach(e => {
						console.log(e.show.premiered);
					});

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

	compareDate(date1, date2) {
		const date1split = date1.show.premiered.split('-');
		const date2split = date2.show.premiered.split('-');
		console.log('dans le compare');
		for (let i = 0; i < date1split.length; i++) {
			let value = parseInt(date1split[i]) - parseInt(date2split[i]);
			if (value != 0) {
				return value;
			}
		}
		return 0;
	}
}
