import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameListQuery } from '../../models/GameListQuery';
import { GameQueryProvider } from '../../providers/game-query/game-query';
import { GamesListPage } from '../games-list/games-list';
import { GamePriceCategory } from '../../models/GamePriceCategory';
import { GameFeatures } from '../../models/GameFeatures';
import { GameCategory } from '../../models/GameCategory';
import { GameReleaseSpan } from '../../models/GameReleaseSpan';
import { GamePlatform } from '../../models/GamePlatform';
import { GameSortCategory } from '../../models/GameSortCategory';

import { some } from 'lodash';

@Component({
  selector: 'page-custom-filter',
  templateUrl: 'custom-filter.html',
})
export class CustomFilterPage {

  query: GameListQuery;
  sorts: {text: string, value: GameSortCategory}[];
  priceRanges: {text: string, value: GamePriceCategory}[];
  categories: {text: string, value: GameCategory}[];
  features: {text: string, value: GameFeatures}[];
  releaseSpans: {text: string, value: GameReleaseSpan}[];
  platforms: {text: string, value: GamePlatform}[];
  selectedFeatures: GameFeatures[];
  selectedReleaseSpans: GameReleaseSpan[];
  selectedPlatforms: GamePlatform[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _gamesProvider: GameQueryProvider) {
    this.query = this._gamesProvider.getQuery() || new GameListQuery();

    this.sorts = [
      { text: 'Popularity', value: GameSortCategory.Popularity },
      { text: 'Title', value: GameSortCategory.Title },
      { text: 'User Rating', value: GameSortCategory.Rating },
      { text: 'Date Added', value: GameSortCategory.Date },
      { text: 'Best Selling', value: GameSortCategory.BestSelling },
      { text: 'Oldest First', value: GameSortCategory.Oldest },
      { text: 'Newest First', value: GameSortCategory.Newest }
    ];

    this.priceRanges = [
      { text: 'Free', value: GamePriceCategory.Free },
      { text: 'Discounted', value: GamePriceCategory.Discounted },
      { text: 'Under $5', value: GamePriceCategory.Under5 },
      { text: 'Under $10', value: GamePriceCategory.Under10 },
      { text: 'Under $15', value: GamePriceCategory.Under15 },
      { text: 'Under $25', value: GamePriceCategory.Under25 },
      { text: 'Over $25', value: GamePriceCategory.Above25 }
    ];

    this.categories = [
      { text: 'Action', value: GameCategory.Action },
      { text: 'Adventure', value: GameCategory.Adventure },
      { text: 'Indie', value: GameCategory.Indie },
      { text: 'Racing', value: GameCategory.Racing },
      { text: 'Role-Playing', value: GameCategory.RolePlaying },
      { text: 'Shooter', value: GameCategory.Shooter },
      { text: 'Simulation', value: GameCategory.Simulation },
      { text: 'Sports', value: GameCategory.Sports },
      { text: 'Strategy', value: GameCategory.Strategy }
    ];

    this.features = [
      { text: 'Achievements', value: GameFeatures.Achievements },
      { text: 'Cloud Saves', value: GameFeatures.CloudSaves },
      { text: 'Controller Support', value: GameFeatures.ControllerSupport },
      { text: 'Co-op', value: GameFeatures.Coop },
      { text: 'In Development', value: GameFeatures.InDev },
      { text: 'LeaderBoards', value: GameFeatures.LeaderBoards },
      { text: 'MultiPlayer', value: GameFeatures.MultiPlayer },
      { text: 'SinglePlayer', value: GameFeatures.SinglePlayer },
      { text: 'Overlay', value: GameFeatures.Overlay }
    ];

    this.releaseSpans = [
      { text: 'Before 2000', value: GameReleaseSpan.Y2000 },
      { text: '2000 - 2004', value: GameReleaseSpan.Y2004 },
      { text: '2005 - 2009', value: GameReleaseSpan.Y2009 },
      { text: '2010 - 2014', value: GameReleaseSpan.Y2014 },
      { text: 'After 2015', value: GameReleaseSpan.Y2015 }
    ];

    this.platforms = [
      { text: 'Windows 7', value: GamePlatform.Win7 },
      { text: 'Windows 8', value: GamePlatform.Win8 },
      { text: 'Windows 10', value: GamePlatform.Win10 },
      { text: 'Windows XP', value: GamePlatform.WinXp },
      { text: 'Windows Vista', value: GamePlatform.WinVista },
      { text: 'OSX 10.6+', value: GamePlatform.OSX10_6 },
      { text: 'OSX 10.7+', value: GamePlatform.OSX10_7 },
      { text: 'Ubuntu 14.04', value: GamePlatform.Ubuntu14 },
      { text: 'Ubuntu 16.04', value: GamePlatform.Ubuntu16 }
    ];

    this.selectedFeatures = (this.query.feature || '').split(',') as GameFeatures[];
    this.selectedReleaseSpans = (this.query.release || '').split(',') as GameReleaseSpan[];
    this.selectedPlatforms = (this.query.system || '').split(',') as GamePlatform[];
  }

  apply() {
    this.query.page = 1;
    this.query.feature = this.selectedFeatures && this.selectedFeatures.length > 0 ? this.selectedFeatures.join(',') : null;
    this.query.release = this.selectedReleaseSpans && this.selectedReleaseSpans.length > 0 ? this.selectedReleaseSpans.join(',') : null;
    this.query.system = this.selectedPlatforms && this.selectedPlatforms.length > 0 ? this.selectedPlatforms.join(',') : null;
    this._gamesProvider.setQuery(this.query, { title: 'Game Search', link: 'https://www.gog.com'});
    this.navCtrl.setRoot(GamesListPage);
  }

  clear() {
    this.query.sort = null;
    this.query.category = null;
    this.query.price = null;
    this.query.page = 1;
    this.selectedFeatures = [];
    this.selectedReleaseSpans = [];
    this.selectedPlatforms = [];
    this._gamesProvider.setQuery(this.query, { title: 'Game Search', link: 'https://www.gog.com'});
  }

  isSelected(list, val) {
    return some(list, {value: val});
  }
}
