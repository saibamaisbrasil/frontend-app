import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-ajustes',
    templateUrl: 'ajustes.html'
})
export class AjustesPage {
    storage: Storage;

    constructor(public navCtrl: NavController, storage: Storage) {
        this.storage = storage;
    }

    doLimparDados() {
        this.storage.remove('deputados');
        this.storage.remove('estados');
        this.storage.remove('partidos');
    }
}
