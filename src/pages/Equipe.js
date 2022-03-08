import Page from './Page.js';

export default class Equipe extends Page {
	render() {
		return /*html*/ `
        <h5>(c'est la meilleure mais par souci de modestie je ne le dis pas, mais avec ce message je le dis quand même, c'est tout le principe de ma blague)</h5>
            <div class="equipe">
                <div class="person">
                    <img src="">
                    <h1 class="title">vennin constant</h1>
                    <h4 class="personElement subtitle"><span class="aka">aka </span>Apolly</h4>
                    <h3 class="personElement">Série préférée<br><span class="serie">South Park</span></h3>
                    <h2>Implication</h2>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="person">
                    <img src="">
                    <h1 class="title">delcroix noé</h1>
                    <h4 class="personElement subtitle"><span class="aka">aka </span>Nøway</h4>
                    <h3 class="personElement">Série préférée<br><span class="serie">Arcane</span></h3>
                    <h2>Implication</h2>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="person">
                    <img src="">
                    <h1 class="title">Demand Cyril</h1>
                    <h4 class="personElement subtitle"><span class="aka">aka </span>Cyril</h4>
                    <h3 class="personElement">Série préférée<br><span class="serie">Arcane</span></h3>
                    <h2>Implication</h2>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>`;
	}

	mount(element) {
		super.mount(element);
	}
}
