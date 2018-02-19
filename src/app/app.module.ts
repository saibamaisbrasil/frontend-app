import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { ChartsModule } from 'ng2-charts/charts/charts';
import { TwitterService } from 'ng2-twitter';

import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { VotacoesPage } from '../pages/votacoes/votacoes';
import { VotacoesListaPage } from '../pages/votacoes_lista/votacoes_lista';
import { VotacoesResultadoPage } from '../pages/votacoes_resultado/votacoes_resultado';
import { DeputadosPage } from '../pages/deputados/deputados';
import { DeputadosListaPage } from '../pages/deputados_lista/deputados_lista';
import { DeputadosDetalhesPage } from '../pages/deputados_detalhes/deputados_detalhes';
import { NoticiasPage } from '../pages/noticias/noticias';
import { AjustesPage } from '../pages/ajustes/ajustes';

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        IntroPage,
        LoginPage,
        HomePage,
        VotacoesPage,
        VotacoesListaPage,
        VotacoesResultadoPage,
        DeputadosPage,
        DeputadosListaPage,
        DeputadosDetalhesPage,
        NoticiasPage,
        AjustesPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        ChartsModule
    ],
    bootstrap: [
        IonicApp
    ],
    entryComponents: [
        MyApp,
        TabsPage,
        IntroPage,
        LoginPage,
        HomePage,
        VotacoesPage,
        VotacoesListaPage,
        VotacoesResultadoPage,
        DeputadosPage,
        DeputadosListaPage,
        DeputadosDetalhesPage,
        NoticiasPage,
        AjustesPage,
    ],
    providers: [
        HttpModule,
        StatusBar,
        SplashScreen,
        TwitterService,
        Storage,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
