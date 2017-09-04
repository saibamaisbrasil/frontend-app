import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    slides: any;
    email: any;
    senha: any;
    mensagem: any;

    constructor(public navCtrl: NavController, private firebase: AngularFireAuth) {

    }

    ngOnInit() {

    }

    doLogin(email, senha) {
        this.firebase.auth.signInWithEmailAndPassword(email, senha)
        .then((data) => {
            this.toHome();
        }).catch((error) => {
            this.mensagem = error.message;
        });
    }

    doRegister(email, senha) {
        this.firebase.auth.createUserWithEmailAndPassword(email, senha)
        .then((data) => {
            this.toHome();
        }).catch((error) => {
            this.mensagem = error.message;
        });
    }

    toHome() {
        this.navCtrl.push(TabsPage);
    }
}
