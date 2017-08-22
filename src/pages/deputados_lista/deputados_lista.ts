import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DeputadosDetalhesPage } from '../deputados_detalhes/deputados_detalhes';

@Component({
    selector: 'page-deputados_lista',
    templateUrl: 'deputados_lista.html'
})
export class DeputadosListaPage {
    storage: Storage;
    deputados: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        storage: Storage) {
        this.storage = storage;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            let temp = deputados;

            let nome = this.navParams.get('nome');
            let estado = this.navParams.get('estado');
            let partido = this.navParams.get('partido');

            if (nome && nome != '') {
                temp = temp.filter((elem) => elem.nome.includes(nome));
            }
            if (estado && estado != 'ALL') {
                temp = temp.filter((elem) => elem.siglaUf == estado);
            }
            if (partido && partido != 'ALL') {
                temp = temp.filter((elem) => elem.siglaPartido == partido);
            }

            this.deputados = temp;
        });
    }

    // direciona para a pagina de detalhes do deputado selecionado
    toDetalhes(id) {
        this.navCtrl.push(DeputadosDetalhesPage, {
            id: id
        })
    }
}
