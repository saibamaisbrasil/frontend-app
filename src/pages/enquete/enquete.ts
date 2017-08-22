import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EnqueteProposicoesPage } from '../enquete_proposicoes/enquete_proposicoes'

@Component({
    selector: 'page-enquete',
    templateUrl: 'enquete.html'
})
export class EnquetePage {
    storage: Storage;
    deputados: any;
    proposicoes: any;
    temas: any;
    estados: any;
    partidos: any;

    tema: string;
    estado: any;
    partido: any;
    deputado: any;

    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        storage: Storage) {
        this.storage = storage;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            this.deputados = deputados;
        });

        this.storage.get('proposicoes').then((proposicoes) => {
            this.proposicoes = proposicoes;
        });

        this.storage.get('temas').then((temas) => {
            this.temas = temas;
        });

        this.storage.get('estados').then((estados) => {
            this.estados = estados;
        });

        this.storage.get('partidos').then((partidos) => {
            this.partidos = partidos;
        });
    }

    toProposicoes() {
        // direciona para a pagina de proposicoes da enquete
        this.navCtrl.push(EnqueteProposicoesPage, {
            tema: this.tema,
            estado: this.estado,
            partido: this.partido,
            deputado: this.deputado,
        });
    }
}
