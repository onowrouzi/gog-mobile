import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GamesListPage } from '../pages/games-list/games-list';
import { GameSortCategory } from '../models/GameSortCategory';
import { GamePriceCategory } from '../models/GamePriceCategory';
import { GameQueryProvider } from '../providers/game-query/game-query';
import { GameListQuery } from '../models/GameListQuery';
import { CustomFilterPage } from '../pages/custom-filter/custom-filter';
import { GameFeatures } from '../models/GameFeatures';
import { WebViewProvider } from '../providers/web-view/web-view';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GamesListPage;
  pages: Array<{title: string, component: any, link: string, query?: GameListQuery}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private _gamesProvider: GameQueryProvider, private _webviewProvider: WebViewProvider) {
    this.initializeApp();

    const home = { title: 'Popular', component: GamesListPage, query: { sort: GameSortCategory.Popularity }, link: 'https://www.gog.com/games?sort=' + GameSortCategory.Popularity };
    this._gamesProvider.setQuery({ sort: GameSortCategory.Popularity, page: 1 }, {title: home.title, link: home.link});

    this.pages = [
      home,
      { title: 'Best Sellers', component: GamesListPage, query: { sort: GameSortCategory.BestSelling }, link: 'https://www.gog.com/games?sort=' + GameSortCategory.BestSelling },
      { title: 'Free', component: GamesListPage, query: { price: GamePriceCategory.Free }, link: 'https://www.gog.com/games?price=' + GamePriceCategory.Free },
      { title: 'In Development', component: GamesListPage, query: { feature: GameFeatures.InDev }, link: 'https://www.gog.com/games?feature=' + GameFeatures.InDev },
      { title: 'New Releases', component: GamesListPage, query: { sort: GameSortCategory.Date }, link: 'https://www.gog.com/games?sort=' + GameSortCategory.Date },
      { title: 'On Sale', component: GamesListPage, query: { price: GamePriceCategory.Discounted }, link: 'https://www.gog.com/games?price=' + GamePriceCategory.Discounted },
      { title: 'Custom Filter', component: CustomFilterPage, link: 'https://www.gog.com/games' }
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
      this._gamesProvider.setQuery(page.query, { title: page.title, link: page.link });
    }
    this.nav.setRoot(page.component);
  }

  onLogoClick() {
    this._webviewProvider.show('https://www.gog.com');
  }
}
