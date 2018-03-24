import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameListQuery } from '../../models/GameListQuery';
import { GameQueryProvider } from '../../providers/game-query/game-query';
import { GamesListPage } from '../games-list/games-list';
import { GamePriceCategory } from '../../models/GamePriceCategory';

@Component({
  selector: 'page-custom-filter',
  templateUrl: 'custom-filter.html',
})
export class CustomFilterPage {

  query: GameListQuery;
  priceRanges: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _gamesProvider: GameQueryProvider) {
    this.query = this._gamesProvider.getQuery();

    this.priceRanges = [
      { text: 'Unspecified', value: null },
      { text: 'Free', value: GamePriceCategory.Free },
      { text: 'Discounted', value: GamePriceCategory.Discounted }
    ]
  }

  apply() {
    this.query.page = 1;
    this._gamesProvider.setQuery(this.query);
    this.navCtrl.setRoot(GamesListPage);
  }
}
