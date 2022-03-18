import Router from '../Router.js';
import Page from './Page.js';

export default class NotFound extends Page {
    render() {
		return /*html*/ `
        <h1>Vous vous êtes perdus sur le web !</h1>`;
	}

	mount(element) {
		super.mount(element);
        /*
		const serieLinks = document.querySelectorAll('.serie');
		serieLinks.forEach(a => {
			a.addEventListener('click', event => {
				event.preventDefault();
				Router.navigate('/' + a.getAttribute('href').split('/')[3]);
			});
		});*/
	}
}