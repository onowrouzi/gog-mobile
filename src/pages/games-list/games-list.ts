import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Content, ModalController } from 'ionic-angular';

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
  totalPages: number;
  showScrollToTop: boolean;

  constructor(private _gamesProvider: GameQueryProvider, private _zone: NgZone, private _modalCtrl: ModalController) {
    this.query = this._gamesProvider.getQuery();
    this.totalPages = 1;
    this.title = 'Best Sellers';
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

  onTitleChange() {
    this._gamesProvider.titleEmitter.subscribe((res: string) => {
      console.log(res);
      this.title = res;
    });
  }

  async getGames(evt?) {
    this.query = this._gamesProvider.getQuery();
    if (this.query.page <= this.totalPages) {
      const res = (await this._gamesProvider.getGames()) as GameListResult;
      this.games = res && res.products ? (this.games || []).concat(res.products) : this.games;
      this._gamesProvider.setPage(this.query.page++);
      this.totalPages = res.totalPages;
      if (evt) {
        evt.complete();
      }
    }
  }

  showGameDetail(gameId: number, price: string) {
    const gameDetailModal = this._modalCtrl.create(GameDetailPage, {gameId: gameId, price: price});
    gameDetailModal.present();
  }

  searchGames() {
    this._gamesProvider.setPage(1);
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
