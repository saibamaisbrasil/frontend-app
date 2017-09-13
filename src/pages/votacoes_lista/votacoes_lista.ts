import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

    quantidade: number;
    correspondencias: number;

    alert: any = this.alertCtrl.create({
        title: 'Votações',
        subTitle: 'Não foi possível calcular o resultado. Nenhuma proposição foi votada.',
        buttons: ['OK']
    });

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        storage: Storage) {
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

        this.deputado = this.navParams.get('deputado');
    }

    // retorna a primeira votacao de uma proposicao
    getVotacao(proposicao) {
        return this.votacoes.filter((elem) => elem.idProposicao == proposicao)[0];
    }

    // retorna o voto de um deputado em uma proposicao
    getVotoDeputado(proposicao, deputado) {
        let votos = this.getVotacao(proposicao).votos;
        return votos.filter((elem) => elem.id == deputado)[0].voto;
    }

    // calcula o resultado e direciona para a pagina de resultado da enquete
    doConcluir() {
        this.quantidade = 0;
        this.correspondencias = 0;

        for (let proposicao of this.proposicoes) {
            // verifica se a proposicao foi votada pelo usuario
            if (proposicao.voto) {
                // compara o voto do usuario com o voto do deputado
                if (this.getVotoDeputado(proposicao.id, this.deputado).includes(proposicao.voto)) {
                    this.correspondencias++;
                }

                this.quantidade++;

                console.log('Proposicao: ' + proposicao.id + ' Usuario: ' + proposicao.voto);
                console.log('Proposicao: ' + proposicao.id + ' Deputado: ' + this.getVotoDeputado(proposicao.id, this.deputado));
            }
        }

        if (this.quantidade > 0) {
            this.toResultado();
        } else {
            this.alert.present();
        }
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
