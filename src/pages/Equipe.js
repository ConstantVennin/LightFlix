import Page from './Page.js';

export default class Equipe extends Page {
    render() {
		return /*html*/ `
            <div class="equipe">
                <div class="person">
                    <img src="">
                    <h1>Nom<br>Prénom</h1>
                    <h2><span>aka </span>Surnom</h2>
                    <p>Série préférée : ouais</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="person">
                    <img src="">
                    <h1>Nom<br>Prénom</h1>
                    <h2><span>aka </span>Surnom</h2>
                    <p>Série préférée : ouais</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="person">
                    <img src="">
                    <h1>Nom<br>Prénom</h1>
                    <h2><span>aka </span>Surnom</h2>
                    <p>Série préférée : ouais</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>`;
	}
}