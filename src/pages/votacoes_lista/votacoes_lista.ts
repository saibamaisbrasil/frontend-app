import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { API_URL } from '../../app/app.constants';
import { VotacoesResultadoPage } from '../votacoes_resultado/votacoes_resultado';

@Component({
    selector: 'page-votacoes_lista',
    templateUrl: 'votacoes_lista.html'
})
export class VotacoesListaPage {
    storage: Storage;
    deputados: any;
    proposicoes: any;
    votacoes: any;
    deputado: any;
    user: any;
    // info: any;
    rdf: any = [];

    quantidade: number;
    correspondencias: number;

    alert: any = this.alertCtrl.create({
        title: 'Votações',
        subTitle: 'Não foi possível calcular o resultado. Nenhuma proposição foi votada.',
        buttons: ['OK']
    });

    constructor(public navCtrl: NavController,
        public loadingController: LoadingController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private http: Http, storage: Storage) {
        this.storage = storage;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            this.deputados = deputados;
        });

        this.storage.get('proposicoes').then((proposicoes) => {
            let temp = proposicoes;

            let tema = this.navParams.get('tema');
            let estado = this.navParams.get('estado');
            let partido = this.navParams.get('partido');
            let autor = this.navParams.get('autor');

            if (tema && tema != 'ALL') {
                temp = temp.filter((elem) => elem.tema.includes(tema));
            }
            if (estado && estado != 'ALL') {
                temp = temp.filter((elem) => elem.autorUf == estado);
            }
            if (partido && partido != 'ALL') {
                temp = temp.filter((elem) => elem.autorPartido == partido);
            }
            if (autor && autor != 'ALL') {
                temp = temp.filter((elem) => elem.autorId == autor);
            }

            this.proposicoes = temp;
        });

        this.storage.get('votacoes').then((votacoes) => {
            this.votacoes = votacoes;
        });

        this.storage.get('user').then((user) => {
            this.user = user;
        });

        // this.storage.get('info').then((info) => {
        //     this.info = info;
        // });

        this.deputado = this.navParams.get('deputado');
    }

    // retorna o deputado
    getDeputado(id) {
        return this.deputados.filter((elem) => elem.id == id)[0];
    }

    // retorna a primeira votacao de uma proposicao
    getVotacao(proposicao) {
        return this.votacoes.filter((elem) => elem.idProposicao == proposicao)[0];
    }

    // retorna o voto de um deputado em uma proposicao
    getVotoDeputado(proposicao, deputado) {
        let votos = this.getVotacao(proposicao).votos;
        return votos.filter((elem) => elem.id == deputado)[0].voto.replace(/\s/g,'');
    }

    // calcula o resultado e direciona para a pagina de resultado da enquete
    doConcluir() {
        this.rdf = [];
        this.quantidade = 0;
        this.correspondencias = 0;

        // configura e mostra tela de loading
        let loader = this.loadingController.create({
            content: ''
        });
        loader.present();

        for (let value of this.proposicoes) {
            // verifica se a proposicao foi votada pelo usuario
            if (value.votoEleitor) {
                let proposicao = value;
                proposicao.votoDeputado = this.getVotoDeputado(proposicao.id, this.deputado);
                delete(proposicao._id);

                let eleitor = this.user;
                // eleitor.info = this.info;

                let deputado = this.getDeputado(this.deputado);

                let temp = { proposicao: proposicao, eleitor: eleitor, deputado: deputado};

                // compara o voto do usuario com o voto do deputado
                if (temp.proposicao.votoDeputado.includes(proposicao.votoEleitor)) {
                    this.correspondencias++;
                }

                this.quantidade++;

                this.rdf.push(temp);

                // console.log('Proposicao: ' + proposicao.id + ' Usuario: ' + proposicao.votoEleitor);
                // console.log('Proposicao: ' + proposicao.id + ' Deputado: ' + proposicao.votoDeputado);
            }
        }

        this.http.post(API_URL + 'rdf', this.rdf)
        .finally(() => {
            loader.dismiss();

            if (this.quantidade > 0) {
                this.toResultado();
            } else {
                this.alert.present();
            }
        })
        .subscribe(res => {
            // console.log(res.json());
        },
        (err) => {
            console.log(err.json());
        });
    }

    // direciona para a pagina de resultado da enquete
    toResultado() {
        this.navCtrl.push(VotacoesResultadoPage, {
            deputado: this.deputado,
            quantidade: this.quantidade,
            correspondencias: this.correspondencias
        })
    }
}
