import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    storage: Storage;
    user: any;
    faixas: any;
    faixa: string;
    sexos: any;
    sexo: string;
    escolaridades: any;
    escolaridade: string;
    ocupacoes: any;
    ocupacao: string;
    estados: any;
    estado: string;

    constructor(public navCtrl: NavController, storage: Storage) {
        this.storage = storage;
    }

    ngOnInit(): void {
        this.faixas = [
            { descricao: 'Até 15 anos', min: 0, max: 15 },
            { descricao: '16 a 17 anos', min: 16, max: 17 },
            { descricao: '18 a 24 anos', min: 18, max: 24 },
            { descricao: '25 a 39 anos', min: 25, max: 39 },
            { descricao: '40 a 59 anos', min: 40, max: 59 },
            { descricao: '60 anos ou mais', min: 60, max: 999 }
        ];

        this.sexos = [
            { descricao: 'Masculino', value: 'M' },
            { descricao: 'Feminino', value: 'F' }
        ];

        this.escolaridades = [
            { descricao: 'Nenhuma Formação', value: '0' },
            { descricao: 'Ensino Fundamental', value: 'Fundamental' },
            { descricao: 'Ensino Médio', value: 'Médio' },
            { descricao: 'Ensino Superior', value: 'Superior' },
            { descricao: 'Pós-graduação', value: 'Pós-graduação' },
            { descricao: 'Mestrado', value: 'Mestrado' },
            { descricao: 'Doutorado', value: 'Doutorado' }
        ];

        this.ocupacoes = [
            { descricao: 'Nenhuma ocupação política', value: '0' },
            { descricao: 'Político eleito e em exercício', value: '1' },
            { descricao: 'Político em atividade indireta', value: '2' }
        ];

        this.storage.get('estados').then((estados) => {
            this.estados = estados;
        });
    }

    toHome() {
        this.user = {
            faixa: this.faixa,
            sexo: this.sexo,
            escolaridade: this.escolaridade,
            ocupacao: this.ocupacao,
            estado: this.estado
        };

        this.storage.set('user', this.user);

        this.navCtrl.push(TabsPage);
    }
}
