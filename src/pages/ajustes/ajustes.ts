import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';

import { IntroPage } from '../intro/intro';

@Component({
    selector: 'page-ajustes',
    templateUrl: 'ajustes.html'
})
export class AjustesPage {
    storage: Storage;

    constructor(public navCtrl: NavController, storage: Storage, private firebase: AngularFireAuth) {
        this.storage = storage;
    }

    doLimparDados() {
        this.storage.remove('deputados');
        this.storage.remove('estados');
        this.storage.remove('partidos');
        this.storage.remove('proposicoes');
        this.storage.remove('temas');
    }

    toIntro() {
        this.navCtrl.push(IntroPage);
    }

    doLogout() {
        this.firebase.auth.signOut();
        this.toIntro();
    }
}
