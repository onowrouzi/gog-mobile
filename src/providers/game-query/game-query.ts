import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { GameListQuery } from '../../models/GameListQuery';
import { GameListResult } from '../../models/GameListResult';

import { isNil, omitBy } from 'lodash';
import { GameSortCategory } from '../../models/GameSortCategory';
import { GamePriceCategory } from '../../models/GamePriceCategory';

@Injectable()
export class GameQueryProvider {

  @Output() queryEmitter: EventEmitter<GameListResult> = new EventEmitter();
  @Output() titleEmitter: EventEmitter<string> = new EventEmitter();

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
    let title = 'Games Search';
    if (this.query.sort == GameSortCategory.Popularity) {
      title = 'Best Sellers';
    } else if (this.query.sort == GameSortCategory.Date) {
      title = 'New Releases';
    } else if (this.query.price == GamePriceCategory.Discounted) {
      title = 'On Sale';
    }

    console.log(title);

    this.titleEmitter.emit(title);
  }

  getGames() {
    return this._http.get('/gog/embed/games/ajax/filtered', {
      params: omitBy(this.query, isNil)
    }).toPromise();
  }
}
