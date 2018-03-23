import { Component, Input, OnInit } from '@angular/core';
import { GameReview } from '../../models/GameReview';
import { HttpClient } from '@angular/common/http';
import { GameReviewsResult } from '../../models/GameReviewsResult';

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

  constructor(private _http: HttpClient) {
    this.page = 1;
    this.totalPages = 1;
  }

  ngOnInit() {
    this.getReviews();
  }

  getReviews(evt?) {
    if (this.page <= this.totalPages) {
      this._http.get('/gog/embed/reviews/product/' + this.gameId + '.json', {
        params: {
          page: this.page.toString()
        }
      }).subscribe((res: GameReviewsResult) => {
        this.reviews = (this.reviews || []).concat(res.reviews);
        this.page++;
        this.totalPages = res.totalPages;
        if (evt) {
          evt.complete();
        }
      });
    } else if (evt) {
      evt.complete();
    }
  }
}
