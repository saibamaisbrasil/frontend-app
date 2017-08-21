import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';

import { DeputadoDetalhesPage } from '../deputado_detalhes/deputado_detalhes';

@Component({
    selector: 'page-deputados',
    templateUrl: 'deputados.html'
})
export class DeputadosPage {
    storage: Storage;
    deputados: any;
    estados: any;
    partidos: any;
    filtroDeputados: any[];
    filtroTitulo: string;

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        storage: Storage) {
        this.storage = storage;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            this.deputados = deputados;
        });

        this.storage.get('estados').then((estados) => {
            this.estados = estados;
        });

        this.storage.get('partidos').then((partidos) => {
            this.partidos = partidos;
        });
    }

    // mostra um alert com os estados
    doRadioEstado() {
        let alert = this.alertCtrl.create().setTitle('Estado');

        for (let estado of this.estados) {
            alert.addInput({
                type: 'radio',
                label: estado.nome,
                value: estado,
            });
        }

        alert.addButton({
            text: 'OK',
            handler: data => {
                // filtra os deputados pelo estado selecionado
                this.filterDeputadosPorEstado(data);
            }
        });

        alert.present();
    }

    // mostra um alert com os partidos
    doRadioPartido() {
        let alert = this.alertCtrl.create().setTitle('Partido');

        for (let partido of this.partidos) {
            alert.addInput({
                type: 'radio',
                label: partido.sigla + ' - ' + partido.nome,
                value: partido,
            });
        }

        alert.addButton({
            text: 'OK',
            handler: data => {
                // filtra os deputados pelo partido selecionado
                this.filterDeputadosPorPartido(data);
            }
        });

        alert.present();
    }

    // filtra os deputados pelo estado selecionado
    filterDeputadosPorEstado(estado : any) {
        this.filtroTitulo = estado.nome;

        this.filtroDeputados = this.deputados.filter((elem) => elem.siglaUf == estado.sigla);
    }

    // filtra os deputados pelo partido selecionado
    filterDeputadosPorPartido(partido : any) {
        this.filtroTitulo = partido.nome;

        this.filtroDeputados = this.deputados.filter((elem) => elem.siglaPartido == partido.sigla);
    }

    // direciona para a pagina de detalhes do deputado selecionado
    toDetalhes(id) {
        this.navCtrl.push(DeputadoDetalhesPage, {
            id: id
        })
    }
}
