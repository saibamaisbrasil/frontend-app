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
    nome: string;
    estado: string;
    partido: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        storage: Storage) {
        this.storage = storage;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            let temp = deputados;

            this.nome = this.navParams.get('nome');
            this.estado = this.navParams.get('estado');
            this.partido = this.navParams.get('partido');

            if (this.nome && this.nome != '') {
                temp = temp.filter((elem) => elem.nome.includes(this.nome));
            }
            if (this.estado && this.estado != 'ALL') {
                temp = temp.filter((elem) => elem.siglaUf == this.estado);
            }
            if (this.partido && this.partido != 'ALL') {
                temp = temp.filter((elem) => elem.siglaPartido == this.partido);
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
