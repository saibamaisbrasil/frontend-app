import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';

@Component({
    selector: 'page-deputado_detalhes',
    templateUrl: 'deputado_detalhes.html'
})
export class DeputadoDetalhesPage {
    storage: Storage;
    deputados: any;
    deputado: any;

    constructor( public navCtrl: NavController, public navParams: NavParams, storage: Storage) {
        this.storage = storage;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            this.deputado = deputados.filter((elem, i, array) => {
                return elem.id == this.navParams.get('id');
            })[0];
        });
    }
}
