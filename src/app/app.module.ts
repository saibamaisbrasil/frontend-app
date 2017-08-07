import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { EnquetePage } from '../pages/enquete/enquete';
import { DeputadosPage } from '../pages/deputados/deputados';
import { DeputadoDetalhesPage } from '../pages/deputado_detalhes/deputado_detalhes';
import { NoticiasPage } from '../pages/noticias/noticias';
import { AjustesPage } from '../pages/ajustes/ajustes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        IntroPage,
        HomePage,
        EnquetePage,
        DeputadosPage,
        DeputadoDetalhesPage,
        NoticiasPage,
        AjustesPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        IntroPage,
        HomePage,
        EnquetePage,
        DeputadosPage,
        DeputadoDetalhesPage,
        NoticiasPage,
        AjustesPage,
    ],
    providers: [
        HttpModule,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
