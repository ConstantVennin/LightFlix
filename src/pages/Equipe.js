import Page from './Page.js';

export default class Equipe extends Page {
	render() {
		return /*html*/ `
            <div class="equipe">
                <div class="person">
                    <img src="../../ressources/Cyril.png">
                    <a href="https://www.linkedin.com/in/cyril-demand-0a30a918b/" class="title">Cyril DEMAND</a>
                    <h4 class="personElement subtitle"><span class="aka">aka </span>Cyril</h4>
                    
                    <h3 class="personElement">Série préférée<br><a href="http://localhost:8000/serie-55138" class="serie">Arcane</a></h3>
                    <h2>Implication</h2>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="person">
                    <img src="../../ressources/Constant.png">
                    <a href="https://www.linkedin.com/in/constant-vennin-0979721b7/" class="title">constant vennin</a>
                    <h4 class="personElement subtitle"><span class="aka">aka </span>Apolly</h4>

                    <h3 class="personElement">Série préférée<br><a href="http://localhost:8000/serie-112" class="serie">South Park</a></h3>
                    <h2>Implication</h2>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="person">
                    <img src="../../ressources/Noé.png">
                    <a href="https://www.linkedin.com/in/no%C3%A9-delcroix-0ab6411b8/" class="title">noé delcroix</a>
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
