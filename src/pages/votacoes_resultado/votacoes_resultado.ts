import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { API_URL } from '../../app/app.constants';

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
    btnShareDisabled: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage, private http: Http, public loadingController: LoadingController) {
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

    doShare() {
        // configura e mostra tela de loading
        let loader = this.loadingController.create({
            content: ''
        });
        loader.present();

        var params = {
            deputado: this.deputado,
            resultado: {
                quantidade: this.quantidade,
                correspondencias: this.correspondencias,
                porcentagem: this.porcentagem,
            }
        };

        this.http.post(API_URL + 'twitter', params)
        .finally(() => { loader.dismiss(); })
        .map(res => res.json())
        .subscribe(data => {
            // console.log(data);
            this.btnShareDisabled = true;
         },
        (err) => { });
    }
}
