import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyApp } from './app.component';
import { GameDetailPage } from '../pages/game-detail/game-detail';
import { GamesListPage } from '../pages/games-list/games-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsModule } from '../components/components.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GameQueryProvider } from '../providers/game-query/game-query';
import { CustomFilterPage } from '../pages/custom-filter/custom-filter';

@NgModule({
  declarations: [
    MyApp,
    GamesListPage,
    GameDetailPage,
    CustomFilterPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamesListPage,
    GameDetailPage,
    CustomFilterPage
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GameQueryProvider
  ]
})
export class AppModule {}
