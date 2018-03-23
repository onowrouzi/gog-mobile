import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DiscountedPage } from '../pages/discounted/discounted';
import { ComponentsModule } from '../components/components.module';
import { NewReleasesPage } from '../pages/new-releases/new-releases';
import { GameDetailPage } from '../pages/game-detail/game-detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiscountedPage,
    NewReleasesPage,
    GameDetailPage
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
    HomePage,
    DiscountedPage,
    NewReleasesPage,
    GameDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
