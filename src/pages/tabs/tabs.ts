import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { IntroPage } from '../intro/intro';
import { HomePage } from '../home/home';
import { VotacoesPage } from '../votacoes/votacoes';
import { DeputadosPage } from '../deputados/deputados';
import { NoticiasPage } from '../noticias/noticias';
import { AjustesPage } from '../ajustes/ajustes';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = VotacoesPage;
    tab3Root = DeputadosPage;
    tab4Root = NoticiasPage;
    tab5Root = AjustesPage;

    constructor(public navCtrl: NavController) {

    }
}
