import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { VotacoesListaPage } from '../votacoes_lista/votacoes_lista'

@Component({
    selector: 'page-votacoes',
    templateUrl: 'votacoes.html'
})
export class VotacoesPage {
    storage: Storage;
    info: any;
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
        this.storage.get('info').then((info) => {
            this.info = info;
        });

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

    filterDeputados(value: any) {
        let temp = this.deputados;

        if (this.estado && this.estado != 'ALL') {
            temp = temp.filter((elem) => elem.siglaUf == this.estado);
        }
        if (this.partido && this.partido != 'ALL') {
            temp = temp.filter((elem) => elem.siglaPartido == this.partido);
        }

        this.deputados = temp;
    }

    toProposicoes() {
        // direciona para a pagina de proposicoes da enquete
        this.navCtrl.push(VotacoesListaPage, {
            tema: this.tema,
            estado: this.estado,
            partido: this.partido,
            deputado: this.deputado,
        });
    }
}
