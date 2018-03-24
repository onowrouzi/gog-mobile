import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { GameListQuery } from '../../models/GameListQuery';
import { GameListResult } from '../../models/GameListResult';

import { isNil, omitBy } from 'lodash';
import { GameSortCategory } from '../../models/GameSortCategory';
import { GamePriceCategory } from '../../models/GamePriceCategory';
import { TitleBarSettings } from '../../models/TitleBarSettings';

@Injectable()
export class GameQueryProvider {

  @Output() queryEmitter: EventEmitter<GameListResult> = new EventEmitter();
  @Output() titleBarSettingsEmitter: EventEmitter<TitleBarSettings> = new EventEmitter();

  private query: GameListQuery;

  constructor(private _http: HttpClient) {
    this.query = new GameListQuery();
  }

  getQuery() {
    return this.query;
  }

  async setQuery(query: GameListQuery) {
    this.query = query;
    const res = await this.getGames();

    this.setTitle();
    this.queryEmitter.emit(res as GameListResult);
  }

  setPage(page: number) {
    this.query.page = page;
  }

  setTitle() {
    let tbs = new TitleBarSettings();
    tbs.title = 'Games Search';
    tbs.link = 'https://www.gog.com';
    if (this.query.sort && this.query.sort == GameSortCategory.Popularity) {
      tbs.title = 'Best Sellers';
      tbs.link += '/games?sort=popularity';
    } else if (this.query.sort && this.query.sort == GameSortCategory.Date) {
      tbs.title = 'New Releases';
      tbs.link += '/games?sort=date';
    } else if (this.query.price && this.query.price == GamePriceCategory.Discounted) {
      tbs.title = 'On Sale';
      tbs.link += '/games?price=discounted';
    }

    this.titleBarSettingsEmitter.emit(tbs);
  }

  getGames() {
    return this._http.get('/gog/embed/games/ajax/filtered', {
      params: omitBy(this.query, isNil)
    }).toPromise();
  }
}
