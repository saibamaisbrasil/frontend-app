import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-votacoes_resultado',
    templateUrl: 'votacoes_resultado.html'
})
export class VotacoesResultadoPage {
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
        }
    }
