import Router from '../Router.js';
import Page from './Page.js';
import $ from 'jquery';

export default class PizzaForm extends Page {
	render() {
		return /*html*/ `
			<form class="pizzaForm">
				<label>
					Nom :
					<input type="text" name="name">
				</label>
				<label>
					Image :<br/>
					<input type="text" name="image" placeholder="https://source.unsplash.com/xxxxxxx/600x600">
					<small>Vous pouvez trouver des images de pizza sur <a href="https://unsplash.com/">https://unsplash.com/</a> puis utiliser l'URL <code>https://source.unsplash.com/xxxxxxx/600x600</code> où <code>xxxxxxx</code> est l'id de la photo choisie (celui dans la barre d'adresse)</small>
				</label>
				<label>
					Prix petit format :
					<input type="number" name="price_small" step="0.05">
				</label>
				<label>
					Prix grand format :
					<input type="number" name="price_large" step="0.05">
				</label>
				<button type="submit">Ajouter</button>
			</form>`;
	}

	mount(element) {
		super.mount(element);
		// une fois la page affichée, on détecte la soumission du formulaire
		const $form = $('form', this.element);
		$form.on('submit', event => this.submit(event));
	}

	/**
	 * Retourne la valeur saisie par l'utilisateur dans le champ de formulaire
	 * dont le nom correspond à `inputName`
	 * @param {string} inputName nom du champ de formulaire
	 */
	getInputValue(inputName) {
		return $(`input[name="${inputName}"]`, this.element).val();
	}
	/**
	 * Récupère les infos saisies par l'utilisateur, les vérifie
	 * puis les envoie au serveur REST
	 */
	submit(event) {
		event.preventDefault(); // bloque le rechargement de la page
		// récupération des valeurs saisies
		const name = this.getInputValue('name'),
			image = this.getInputValue('image'),
			price_small = Number(this.getInputValue('price_small')),
			price_large = Number(this.getInputValue('price_large'));
		// si l'utilisateur n'a rien tapé dans le champ "Nom"
		// on affiche un message d'erreur
		if (name === '') {
			alert('Erreur : le champ "Nom" est obligatoire');
			return;
		}
		// création de l'objet à envoyer au serveur REST
		const pizza = {
			name,
			// `name,` est un raccourci pour `name: name`)
			// cf. https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Initialisateur_objet#nouvelles_notations_ecmascript_2015_es6
			image,
			price_small,
			price_large,
		};
		// envoi des données en POST au serveur REST
		fetch('http://localhost:8080/api/v1/pizzas', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(pizza), // sérialisation JS (objet) -> JSON (string)
		})
			.then(response => {
				if (!response.ok) {
					// en cas d'erreur serveur on averti l'utilisateur
					throw new Error(`Erreur : ${response.statusText}`);
				}
				return response.json();
			})
			.then(data => {
				// en cas de succès on lance une alerte et on redirige vers la liste
				alert(`La pizza ${name} a été ajoutée !`);
				Router.navigate('/');
			})
			.catch(error => alert(error.message));
	}
}
