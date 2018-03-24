import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GamesListPage } from '../pages/games-list/games-list';
import { GameSortCategory } from '../models/GameSortCategory';
import { GamePriceCategory } from '../models/GamePriceCategory';
import { GameQueryProvider } from '../providers/game-query/game-query';
import { GameListQuery } from '../models/GameListQuery';
import { CustomFilterPage } from '../pages/custom-filter/custom-filter';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GamesListPage;
  pages: Array<{title: string, component: any, query?: GameListQuery}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private _gamesProvider: GameQueryProvider, private _iab: InAppBrowser) {
    this.initializeApp();

    this._gamesProvider.setQuery({ sort: GameSortCategory.Popularity, page: 1 });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Best Sellers', component: GamesListPage, query: { sort: GameSortCategory.Popularity } },
      { title: 'On Sale', component: GamesListPage, query: { price: GamePriceCategory.Discounted } },
      { title: 'New Releases', component: GamesListPage, query: { sort: GameSortCategory.Date } },
      { title: 'Custom Filter', component: CustomFilterPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.query) {
      page.query.page = 1;
      this._gamesProvider.setQuery(page.query);
    }
    this.nav.setRoot(page.component);
  }

  onLogoClick() {
    const webview = this._iab.create('https://www.gog.com', '_self', 'location=no,hardwareback=yes,toolbar=no');
    webview.show();
  }
}
