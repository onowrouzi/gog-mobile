import { Component, Input, OnInit, ViewChild, NgZone } from '@angular/core';
import { GameListQuery } from '../../models/GameListQuery';
import { HttpClient } from '@angular/common/http';

import { omitBy, isNil } from 'lodash';
import { GameListResult } from '../../models/GameListResult';
import { GameProduct } from '../../models/GameProduct';
import { Content, ModalController } from 'ionic-angular';
import { GameDetailPage } from '../../pages/game-detail/game-detail';

@Component({
  selector: 'games-list',
  templateUrl: 'games-list.html'
})
export class GamesListComponent implements OnInit {
  @ViewChild(Content) content: Content;
  @Input() query: GameListQuery;
  games: GameProduct[];
  search: string;
  totalPages: number;
  showScrollToTop: boolean;

  constructor(private _http: HttpClient, private _zone: NgZone, private _modalCtrl: ModalController) {
    this.totalPages = 1;
  }

  ngOnInit() {
    this.getGames();
  }

  getGames(evt?) {
    if (this.query.page <= this.totalPages) {
      this._http.get('/gog/embed/games/ajax/filtered', {
        params: omitBy(this.query, isNil)
      }).subscribe((res: GameListResult) => {
        this.games = res && res.products ? (this.games || []).concat(res.products) : this.games;
        this.query.page++;
        this.totalPages = res.totalPages;
        if (evt) {
          evt.complete();
        }
      });
    } else if (evt) {
      evt.complete();
    }
  }

  showGameDetail(gameId: number, price: string) {
    const gameDetailModal = this._modalCtrl.create(GameDetailPage, {gameId: gameId, price: price});
    gameDetailModal.present();
  }

  searchGames() {
    this.query.page = 1;
    this.totalPages = 1;
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
