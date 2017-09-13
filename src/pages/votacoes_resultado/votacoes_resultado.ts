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
    deputado: any;
    quantidade: any;
    correspondencias: any;
    porcentagem: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage) {
        this.storage = storage;
        this.deputado = {};
        this.porcentagem = 0;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            let temp = this.navParams.get('deputado');

            this.deputados = deputados;

            this.deputado = this.deputados.filter((elem) => elem.id == temp)[0];
        });

        this.quantidade = this.navParams.get('quantidade');
        this.correspondencias = this.navParams.get('correspondencias');

        this.porcentagem = (this.correspondencias / this.quantidade * 100).toFixed(1);
    }
}
