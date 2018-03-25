import { Component, Input, OnInit } from '@angular/core';
import { GameReview } from '../../models/GameReview';
import { GameReviewsResult } from '../../models/GameReviewsResult';
import { GameQueryProvider } from '../../providers/game-query/game-query';

@Component({
  selector: 'game-review-list',
  templateUrl: 'game-review-list.html'
})
export class GameReviewListComponent implements OnInit {

  @Input() gameId: number;
  reviews: GameReview[];
  page: number;
  totalPages: number;
  fullReview: boolean;

  constructor(private _gamesProvider: GameQueryProvider) {
    this.page = 1;
    this.totalPages = 1;
  }

  ngOnInit() {
    this.getReviews();
  }

  async getReviews(evt?) {
    if (this.page <= this.totalPages) {
      const res = (await this._gamesProvider.getGameReview(this.gameId, this.page)) as GameReviewsResult;
      this.reviews = (this.reviews || []).concat(res.reviews);
      this.page++;
      this.totalPages = res.totalPages;
      this.reviews.forEach((r) => {
        const stars = r.rating / 10;
        const totalWhole = Math.floor(stars);
        r.stars = Array(totalWhole).fill(1);
        if (stars > totalWhole) {
          r.stars.push(0.5);
        }
      });

      if (evt) {
        evt.complete();
      }
    }
  }
}
