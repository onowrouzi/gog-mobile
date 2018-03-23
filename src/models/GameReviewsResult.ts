import { GameReview } from "./GameReview";

export class GameReviewsResult {
  reviews: GameReview[];
  ts: any;
  page: number;
  totalPages: number;
  totalResults: number;
}
