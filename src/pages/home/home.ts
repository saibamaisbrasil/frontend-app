import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tabs } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public tabs: Tabs) {
        this.tabs = tabs;
    }

    toVotacoes() {
        this.tabs.select(1);
    }

    toDeputados() {
        this.tabs.select(2);
    }
}
