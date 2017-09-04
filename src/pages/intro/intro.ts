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
                title: "Bem-vindo ao<br>Saiba mais Brasil!",
                description: "Já sabe em quem votar na próxima eleição? O <b>Saiba mais Brasil</b> pode ajudar na escolha do seu representante legislativo.",
                image: "assets/img/slidebox-img-1.png",
                footer: "",
            },
            {
                title: "Seu deputado está te representando?",
                description: "Do jeito que a política funciona hoje, é quase impossível saber se as decisões do seu candidato refletem as suas idéias e opiniões. E foi pensando nisso que o <b>Saiba mais Brasil<b> foi desenvolvido.",
                image: "assets/img/slidebox-img-2.png",
                footer: "",
            },
            {
                title: "Fique de olho!",
                description: "Em 2014, logo após as eleições, 40% dos eleitores não se lembravam mais de quem ajudaram a eleger¹. Por isso, ferramentas como esta, são importantes. Compartilhe!",
                image: "assets/img/slidebox-img-3.png",
                footer: "¹http://politica.estadao.com.br/blogs/legis-ativo/a-incrivel-capacidade-de-se-esquecer-do-voto/",
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
