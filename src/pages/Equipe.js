import Page from './Page.js';

export default class Equipe extends Page {
	render() {
		return /*html*/ `
            <div class="equipe">
                <div class="person">
                    <img src="../../ressources/Cyril.png">
                    <h1 class="title">Cyril DEMAND</h1>
                    <h4 class="personElement subtitle"><span class="aka">aka </span>Cyril</h4>
                    
                    <h3 class="personElement">Série préférée<br><a href="http://localhost:8000/serie-55138" class="serie">Arcane</a></h3>
                    <h2>Implication</h2>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="person">
                    <img src="../../ressources/Constant.png">
                    <h1 class="title">Constant VENNIN</h1>
                    <h4 class="personElement subtitle"><span class="aka">aka </span>Apolly</h4>

                    <h3 class="personElement">Série préférée<br><a href="http://localhost:8000/serie-112" class="serie">South Park</a></h3>
                    <h2>Implication</h2>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="person">
                    <img src="../../ressources/Noé.png">
                    <h1 class="title">Noé DELCROIX</h1>
                    <h4 class="personElement subtitle"><span class="aka">aka </span>Nøway</h4>
                    

                    <h3 class="personElement">Série préférée<br><a href="http://localhost:8000/serie-55138" class="serie">Arcane</a></h3>
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
