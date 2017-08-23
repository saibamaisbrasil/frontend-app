import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-intro',
    templateUrl: 'intro.html'
})
export class IntroPage {
    slides: any;

    constructor(public navCtrl: NavController) {

    }

    ngOnInit() {
        this.slides = [
            {
                title: "Bem-vindo ao<br>Saiba mais Brasil!",
                description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
                image: "assets/img/slidebox-img-1.png",
            },
            {
                title: "Seu deputado está te representando?",
                description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
                image: "assets/img/slidebox-img-2.png",
            },
            {
                title: "Fique de olho!",
                description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
                image: "assets/img/slidebox-img-3.png",
            }
        ];
    }

    toHome() {
        this.navCtrl.push(TabsPage);
    }
}
