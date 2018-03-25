import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { GameListQuery } from '../../models/GameListQuery';
import { GameListResult } from '../../models/GameListResult';

import { isNil, omitBy } from 'lodash';
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

  async setQuery(query: GameListQuery, tbs: TitleBarSettings) {
    this.query = query;
    const res = await this.getGames();

    this.titleBarSettingsEmitter.emit(tbs);
    this.queryEmitter.emit(res as GameListResult);
  }

  setPage(page: number) {
    this.query.page = page;
  }

  getGames() {
    return this._http.get('/gog/embed/games/ajax/filtered', {
      params: omitBy(this.query, isNil)
    }).toPromise();
  }

  getGameDetail(gameId) {
    return this._http.get('/gog/api/products/' + gameId, {
      params: {
        expand: 'downloads,expanded_dlcs,description,screenshots,videos,related_products,changelog'
      }
    }).toPromise();
  }

  getGameReview(gameId, page) {
    return this._http.get('/gog/embed/reviews/product/' + gameId + '.json', {
      params: {
        page: page.toString()
      }
    }).toPromise();
  }
}
