import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';

import { DeputadosListaPage } from '../deputados_lista/deputados_lista';

@Component({
    selector: 'page-deputados',
    templateUrl: 'deputados.html'
})
export class DeputadosPage {
    storage: Storage;
    estados: any;
    partidos: any;
    nome: string;
    estado: string;
    partido : string;

    constructor(
        public navCtrl: NavController,
        storage: Storage) {
        this.storage = storage;
    }

    ngOnInit(): void {
        this.storage.get('estados').then((estados) => {
            this.estados = estados;
        });

        this.storage.get('partidos').then((partidos) => {
            this.partidos = partidos;
        });
    }

    toLista() {
        // direciona para a pagina de proposicoes da enquete
        this.navCtrl.push(DeputadosListaPage, {
            nome: this.nome.toUpperCase(),
            estado: this.estado,
            partido: this.partido,
        });
    }
}
