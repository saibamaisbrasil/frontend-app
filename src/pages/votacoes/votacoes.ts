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
    autores: any;

    tema: string;
    estado: any;
    partido: any;
    autor: any;
    deputado: any;

    alert: any = this.alertCtrl.create({
        title: 'Votações',
        subTitle: 'Selecione um deputado para continuar.',
        buttons: ['OK']
    });

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
            this.autores = deputados;
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

    filterAutores() {
        let temp = this.deputados;

        if (this.estado && this.estado != 'ALL') {
            temp = temp.filter((elem) => elem.siglaUf == this.estado);
        }
        if (this.partido && this.partido != 'ALL') {
            temp = temp.filter((elem) => elem.siglaPartido == this.partido);
        }

        this.autores = temp;
    }

    doContinuar() {
        if (this.deputado > 0) {
            this.toProposicoes();
        } else {
            this.alert.present();
        }
    }

    toProposicoes() {
        // direciona para a pagina de proposicoes da enquete
        this.navCtrl.push(VotacoesListaPage, {
            tema: this.tema,
            estado: this.estado,
            partido: this.partido,
            autor: this.autor,
            deputado: this.deputado,
        });
    }
}
