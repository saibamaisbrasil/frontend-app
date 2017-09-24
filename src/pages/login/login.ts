import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    storage: Storage;
    slides: any;
    email: any;
    senha: any;
    mensagem: any;

    constructor(public navCtrl: NavController, private af: AngularFireAuth, storage: Storage) {
        this.storage = storage;
    }

    ngOnInit() {

    }

    doRegisterEmail(email, senha) {
        this.af.auth.createUserWithEmailAndPassword(email, senha)
        .then((res) => {
            this.toHome();
        }).catch((error) => {
            this.mensagem = error.message;
        });
    }

    doLoginEmail(email, senha) {
        this.af.auth.signInWithEmailAndPassword(email, senha)
        .then((res) => {
            this.toHome();
        }).catch((error) => {
            this.mensagem = error.message;
        });
    }

    doLoginFacebook() {
        this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res) => {
            this.toHome();
        }).catch((error) => {
            this.mensagem = error.message;
        });
    }

    toHome() {
        this.storage.set('user', firebase.auth().currentUser.providerData[0]);

        this.navCtrl.push(TabsPage);
    }
}
