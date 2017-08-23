import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DeputadosListaPage } from '../deputados_lista/deputados_lista';

@Component({
    selector: 'page-deputados',
    templateUrl: 'deputados.html'
})
export class DeputadosPage {
    storage: Storage;
    info: any;
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
        this.storage.get('info').then((info) => {
            this.info = info;
        });

        this.storage.get('estados').then((estados) => {
            this.estados = estados;
        });

        this.storage.get('partidos').then((partidos) => {
            this.partidos = partidos;
        });
    }

    toLista() {
        // direciona para a pagina de resultados da busca
        this.navCtrl.push(DeputadosListaPage, {
            nome: this.nome ? this.nome.toUpperCase() : '',
            estado: this.estado,
            partido: this.partido,
        });
    }
}
