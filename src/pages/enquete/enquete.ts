import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-enquete',
    templateUrl: 'enquete.html'
})
export class EnquetePage {
    storage: Storage;
    deputados: any;
    proposicoes: any;
    temas: any;
    estados: any;
    partidos: any;

    enqueteComecar: boolean = false;
    enqueteTema: string;
    enqueteProposicoes: any;

    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        storage: Storage) {
        this.storage = storage;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            this.deputados = deputados;
        });

        this.storage.get('proposicoes').then((proposicoes) => {
            this.proposicoes = proposicoes;
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

            }
        });

        alert.present();
    }

    toProposicoes() {
        this.enqueteProposicoes = this.enqueteTema ? this.proposicoes.filter((elem) => elem.tema.includes()) : this.proposicoes;

        this.enqueteComecar = true;
    }
}
