import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { API_URL } from '../../app/app.constants';
import { DeputadoDetalhesPage } from '../deputado_detalhes/deputado_detalhes';

@Component({
    selector: 'page-deputados',
    templateUrl: 'deputados.html'
})
export class DeputadosPage {
    deputados: any;
    estados: any;
    partidos: any;
    filtroDeputados: any[];
    filtroTitulo: string;

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingController: LoadingController,
        private http: Http) {
    }

    ngOnInit(): void {
        // configura e mostra tela de loading
        let loader = this.loadingController.create({
            content: ''
        });
        loader.present();

        // configura o alert mostrado em caso de erro
        let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Alguma coisa não saiu como o esperado. Tente novamente.',
            buttons: ['OK']
        });

        // carrega os deputados
        this.http.get(API_URL + 'deputados')
        .finally(() => { loader.dismiss(); })
        .subscribe(res => {
            this.deputados = res.json();
        },
        (err) => {
            alert.present();
        });

        // carrega os estados
        this.http.get(API_URL + 'estados')
        .subscribe(res => {
            this.estados = res.json();
        },
        (err) => {
            alert.present();
        });

        // carrega os partidos
        this.http.get(API_URL + 'partidos')
        .subscribe(res => {
            this.partidos = res.json();
        },
        (err) => {
            alert.present();
        });
    }

    // mostra um alert com os estados
    doRadioEstado() {
        let alert = this.alertCtrl.create().setTitle('Estado');

        for (let estado of this.estados) {
            alert.addInput({
                type: 'radio',
                label: estado.nome,
                value: estado,
            });
        }

        alert.addButton({
            text: 'OK',
            handler: data => {
                // filtra os deputados pelo estado selecionado
                this.filterDeputadosPorEstado(data);
            }
        });

        alert.present();
    }

    // mostra um alert com os partidos
    doRadioPartido() {
        let alert = this.alertCtrl.create().setTitle('Partido');

        for (let partido of this.partidos) {
            alert.addInput({
                type: 'radio',
                label: partido.sigla + ' - ' + partido.nome,
                value: partido,
            });
        }

        alert.addButton({
            text: 'OK',
            handler: data => {
                // filtra os deputados pelo partido selecionado
                this.filterDeputadosPorPartido(data);
            }
        });

        alert.present();
    }

    // filtra os deputados pelo estado selecionado
    filterDeputadosPorEstado(estado : any) {
        this.filtroTitulo = estado.nome;

        this.filtroDeputados = [];

        for (let deputado of this.deputados) {
            if(deputado.siglaUf == estado.sigla) this.filtroDeputados.push(deputado);
        }
    }

    // filtra os deputados pelo partido selecionado
    filterDeputadosPorPartido(partido : any) {
        this.filtroTitulo = partido.nome;

        this.filtroDeputados = [];

        for (let deputado of this.deputados) {
            if(deputado.siglaPartido == partido.sigla) this.filtroDeputados.push(deputado);
        }
    }

    // direciona para a pagina de detalhes do deputado selecionado
    toDetalhes(id) {
        this.navCtrl.push(DeputadoDetalhesPage, {
            id: id
        })
    }
}
