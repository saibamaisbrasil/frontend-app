import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { API_URL } from '../../app/app.constants';

@Component({
    selector: 'page-deputado_detalhes',
    templateUrl: 'deputado_detalhes.html'
})
export class DeputadoDetalhesPage {
    deputado: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public loadingController: LoadingController,
        private http: Http) {
    }

    ngOnInit(): void {
        // configura e mostra tela de loading
        let loader = this.loadingController.create({
            content: ''
        });
        loader.present();

        // configura o alert mostrado em caso de erro
        let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Alguma coisa não saiu como o esperado. Tente novamente.',
            buttons: ['OK']
        });

        // recebe o id do deputado passado como parametro
        let id = this.navParams.get('id');

        // carrega os detalhes do deputado selecionado
        this.http.get(API_URL + 'deputados/' + id)
        .finally(() => { loader.dismiss(); })
        .subscribe(
            res => {
                this.deputado = res.json();
            },
            (err) => {
                alert.present();
            }
        );
    }
}
