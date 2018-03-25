import { Component, OnInit, ViewChild } from '@angular/core';
import { Content, ModalController, LoadingController, Loading } from 'ionic-angular';

import { GameListQuery } from '../../models/GameListQuery';
import { GameListResult } from '../../models/GameListResult';
import { GameProduct } from '../../models/GameProduct';
import { GameDetailPage } from '../../pages/game-detail/game-detail';
import { GameQueryProvider } from '../../providers/game-query/game-query';

@Component({
  selector: 'games-list',
  templateUrl: 'games-list.html'
})
export class GamesListPage implements OnInit {
  @ViewChild(Content) content: Content;
  title: string;
  games: GameProduct[];
  query: GameListQuery;
  search: string;
  searching: boolean;
  totalPages: number;
  showScrollToTop: boolean;
  loadScreen: Loading;

  constructor(private _gamesProvider: GameQueryProvider, private _modalCtrl: ModalController, private _loadingCtrl: LoadingController) {
    this.loadScreen = _loadingCtrl.create({content: 'Retrieving Games List...'});
    this.query = this._gamesProvider.getQuery();
    this.totalPages = 2;
  }

  ngOnInit() {
    this.getGames();
  }

  onQueryChange() {
    this._gamesProvider.queryEmitter.subscribe((res: GameListResult) => {
      this.games = res && res.products ? res.products : [];
      this._gamesProvider.setPage(this.query.page++);
      this.totalPages = res.totalPages;
    });
  }

  async getGames(evt?) {
    if (!evt) {
      this.loadScreen.present();
    }

    this.searching = true;
    this.query = this._gamesProvider.getQuery();
    if (this.query.page < this.totalPages) {
      const res = (await this._gamesProvider.getGames()) as GameListResult;
      this.games = res && res.products ? (this.games || []).concat(res.products) : this.games;
      this._gamesProvider.setPage(++this.query.page);
      this.totalPages = res.totalPages;
    }

    if (evt) {
      evt.complete();
    } else {
      this.loadScreen.dismiss();
    }

    this.searching = false;
  }

  showGameDetail(gameId: number, price: string) {
    const gameDetailModal = this._modalCtrl.create(GameDetailPage, {gameId: gameId, price: price});
    gameDetailModal.present();
  }

  searchGames() {
    this.totalPages = 2;
    this._gamesProvider.setPage(1);
    this.games = [];
    this.getGames();
  }
}
