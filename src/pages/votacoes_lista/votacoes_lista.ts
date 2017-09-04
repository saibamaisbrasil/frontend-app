import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { VotacoesResultadoPage } from '../votacoes_resultado/votacoes_resultado';

@Component({
    selector: 'page-votacoes_lista',
    templateUrl: 'votacoes_lista.html'
})
export class VotacoesListaPage {
    storage: Storage;
    deputados: any;
    proposicoes: any;
    temas: any;
    estados: any;
    partidos: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        storage: Storage) {
        this.storage = storage;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            this.deputados = deputados;
        });

        this.storage.get('proposicoes').then((proposicoes) => {
            let temp = proposicoes;

            let tema = this.navParams.get('tema');
            let estado = this.navParams.get('estado');
            let partido = this.navParams.get('partido');
            let deputado = this.navParams.get('deputado');

            if (tema && tema != 'ALL') {
                temp = temp.filter((elem) => elem.tema.includes(tema));
            }
            if (estado && estado != 'ALL') {
                temp = temp.filter((elem) => elem.autorUf == estado);
            }
            if (partido && partido != 'ALL') {
                temp = temp.filter((elem) => elem.autorPartido == partido);
            }
            if (deputado && deputado != 'ALL') {
                temp = temp.filter((elem) => elem.autorId == deputado);
            }

            this.proposicoes = temp;
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

    // direciona para a pagina de resultado da enquete
    toResultado() {
        this.navCtrl.push(VotacoesResultadoPage, {
            // id: id
        })
    }
}
