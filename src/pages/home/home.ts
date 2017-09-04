import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tabs } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    storage: Storage;
    deputados: any;
    proposicoes: any;
    partidos: any;

    constructor(public navCtrl: NavController, public tabs: Tabs, storage: Storage) {
        this.tabs = tabs;
        this.storage = storage;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            this.deputados = deputados;
        });

        this.storage.get('proposicoes').then((proposicoes) => {
            this.proposicoes = proposicoes;
        });

        this.storage.get('partidos').then((partidos) => {
            this.partidos = partidos;
        });
    }

    toVotacoes() {
        this.tabs.select(1);
    }

    toDeputados() {
        this.tabs.select(2);
    }
}
