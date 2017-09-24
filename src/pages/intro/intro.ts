import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

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
                title: "Já sabe em quem votar na próxima eleição?",
                description: "O <b>Saiba mais Brasil</b> pode ajudar na escolha do seu representante legislativo.",
                image: "assets/img/slidebox-img-1.png",
                footer: "",
            },
            {
                title: "Seu deputado está te representando?",
                description: "Com o app do <b>Saiba mais Brasil</b> você pode comparar os votos dos deputados com as suas idéias e opiniões e saber se está sendo representado.",
                image: "assets/img/slidebox-img-2.png",
                footer: "",
            }
        ];
    }

    toHome() {
        this.navCtrl.push(TabsPage);
    }

    toLogin() {
        this.navCtrl.push(LoginPage);
    }
}
