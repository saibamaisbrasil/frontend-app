import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { API_URL } from './app.constants';

@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    rootPage: any = TabsPage;
    storage: Storage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
        public loadingController: LoadingController,
        private http: Http, storage: Storage) {

        this.storage = storage;

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    ngOnInit(): void {
        // configura e mostra tela de loading
        let loader = this.loadingController.create({
            content: ''
        });
        loader.present();

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
