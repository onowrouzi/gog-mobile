import { Component, Input, OnInit, ViewChild, NgZone } from '@angular/core';
import { GameListQuery } from '../../models/GameListQuery';
import { HttpClient } from '@angular/common/http';

import { omitBy, isNil } from 'lodash';
import { GameListResult } from '../../models/GameListResult';
import { GameProduct } from '../../models/GameProduct';
import { Content } from 'ionic-angular';

@Component({
  selector: 'games-list',
  templateUrl: 'games-list.html'
})
export class GamesListComponent implements OnInit {
  @ViewChild(Content) content: Content;
  @Input() query: GameListQuery;
  games: GameProduct[];
  search: string;
  showScrollToTop: boolean;

  constructor(private _http: HttpClient, private _zone: NgZone) {}

  ngOnInit() {
    this.getGames();
  }

  getGames(evt?) {
    console.log(this.query);
    this._http.get('/gog/games/ajax/filtered', {
      params: omitBy(this.query, isNil)
    }).subscribe((res: GameListResult) => {
      this.games = (this.games || []).concat(res.products);
      this.query.page++;
      if (evt) {
        evt.complete();
      }
    });
  }

  searchGames() {
    this.query.page = 1;
    this.games = [];
    this.getGames();
  }

  onScroll(evt : Content) {
    this._zone.run(() => {
      this.showScrollToTop = evt.scrollTop > 100;
    });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
