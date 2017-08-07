import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { EnquetePage } from '../enquete/enquete';
import { DeputadosPage } from '../deputados/deputados';
import { NoticiasPage } from '../noticias/noticias';
import { AjustesPage } from '../ajustes/ajustes';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = EnquetePage;
    tab3Root = DeputadosPage;
    tab4Root = NoticiasPage;
    tab5Root = AjustesPage;

    constructor() {

    }
}
