import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';

import { API_URL } from '../../app/app.constants';
import { IntroPage } from '../intro/intro';

@Component({
    selector: 'page-ajustes',
    templateUrl: 'ajustes.html'
})
export class AjustesPage {
    storage: Storage;

    constructor(public navCtrl: NavController, public loadingController: LoadingController, private http: Http, storage: Storage, private af: AngularFireAuth) {
        this.storage = storage;
    }

    toIntro() {
        this.navCtrl.push(IntroPage);
    }

    doLogout() {
        this.storage.remove('user');

        this.af.auth.signOut();
        this.toIntro();
    }

    doRecarregarServidor() {
        // rebase...
        // this.http.get(API_URL + 'rebase/deputados');
        // this.http.get(API_URL + 'rebase/proposicoes');
        // this.http.get(API_URL + 'rebase/votacoes');
        // this.http.get(API_URL + 'rebase/partidos');
        // this.http.get(API_URL + 'rebase/estados');

        // this.doRecarregarLocal();
    }

    doRecarregarLocal() {
        // configura e mostra tela de loading
        let loader = this.loadingController.create({
            content: ''
        });
        loader.present();

        // limpa os dados locais
        this.storage.remove('deputados');
        this.storage.remove('estados');
        this.storage.remove('partidos');
        this.storage.remove('proposicoes');
        this.storage.remove('temas');
        this.storage.remove('votacoes');

        this.storage.remove('info');

        // carrega os dados do ip (http://ip-api.com)
        this.http.get('http://ip-api.com/json')
        .subscribe(res => {
            this.storage.set('info', res.json());
        },
        (err) => {

        });

        // carrega os deputados
        this.http.get(API_URL + 'deputados')
        .finally(() => { loader.dismiss(); })
        .subscribe(res => {
            this.storage.set('deputados', res.json());
        },
        (err) => {

        });

        // carrega as proposicoes
        this.http.get(API_URL + 'proposicoes')
        .subscribe(res => {
            this.storage.set('proposicoes', res.json());
        },
        (err) => {

        });

        // carrega os temas das proposicoes
        this.http.get(API_URL + 'proposicoes/temas')
        .subscribe(res => {
            this.storage.set('temas', res.json());
        },
        (err) => {

        });

        // carrega as votacoes
        this.http.get(API_URL + 'votacoes')
        .subscribe(res => {
            this.storage.set('votacoes', res.json());
        },
        (err) => {

        });

        // carrega os estados
        this.http.get(API_URL + 'estados')
        .subscribe(res => {
            this.storage.set('estados', res.json());
        },
        (err) => {

        });

        // carrega os partidos
        this.http.get(API_URL + 'partidos')
        .subscribe(res => {
            this.storage.set('partidos', res.json());
        },
        (err) => {

        });
    }
}
