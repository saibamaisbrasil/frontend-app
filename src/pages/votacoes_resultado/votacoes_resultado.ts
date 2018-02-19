import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TwitterService } from 'ng2-twitter';

@Component({
    selector: 'page-votacoes_resultado',
    templateUrl: 'votacoes_resultado.html'
})
export class VotacoesResultadoPage {
    storage: Storage;
    deputados: any;
    deputado: any;
    quantidade: any;
    correspondencias: any;
    porcentagem: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage, private twitter: TwitterService) {
        this.storage = storage;
        this.twitter = twitter;
        this.deputado = {};
        this.porcentagem = 0;
    }

    ngOnInit(): void {
        this.storage.get('deputados').then((deputados) => {
            let temp = this.navParams.get('deputado');

            this.deputados = deputados;

            this.deputado = this.deputados.filter((elem) => elem.id == temp)[0];
        });

        this.quantidade = this.navParams.get('quantidade');
        this.correspondencias = this.navParams.get('correspondencias');

        this.porcentagem = (this.correspondencias / this.quantidade * 100).toFixed(1);
    }

    doShare() {
        console.log('teste2');

        return this.twitter.post(
            'https://api.twitter.com/1.1/statuses/update.json',
            {
                status: 'teste'
            },
            {
                consumerKey: 'j2N9QGbTWhs7GHUnxXHjl2P8Y',
                consumerSecret: 'JG48xVVOL7TT4DS1e85uxlsw7nVlmViZa4Uo0BXMf9nmPXWxxi'
            },
            {
                token: '964581524489175040-5bpLA9NL3Q2lVBeTrGXYPbNPRu10ZXq',
                tokenSecret: 'lgQ6XkndsqPcjhPJGG3h2cjuEIwxGSFDmYTJ5UwOdmcxw'
            }
        ).subscribe((res) => {
            console.log(res.json().map(tweet => tweet.text));
        });
    }

    doShare2() {
        console.log('aqui');
        this.twitter.get(
            'https://api.twitter.com/1.1/search/tweets.json?q=brasil',
            {
                count: 5
            },
            {
                consumerKey: 'j2N9QGbTWhs7GHUnxXHjl2P8Y',
                consumerSecret: 'JG48xVVOL7TT4DS1e85uxlsw7nVlmViZa4Uo0BXMf9nmPXWxxi'
            },
            {
                token: '964581524489175040-5bpLA9NL3Q2lVBeTrGXYPbNPRu10ZXq',
                tokenSecret: 'lgQ6XkndsqPcjhPJGG3h2cjuEIwxGSFDmYTJ5UwOdmcxw'
            }
        ).subscribe((res) => {
            console.log(res.json().map(tweet => tweet.text));
        });
    }
}
