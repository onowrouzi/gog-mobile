import { GameFeatures } from "./GameFeatures";
import { GameReleaseSpan } from "./GameReleaseSpan";
import { GameCategory } from "./GameCategory";
import { GamePriceCategory } from "./GamePriceCategory";
import { GameSortCategory } from "./GameSortCategory";

export class GameListQuery {
  category?: GameCategory;
  feature?: GameFeatures[];
  limit?: number;
  page?: number;
  price?: GamePriceCategory;
  release?: GameReleaseSpan[];
  search?: string;
  sort?: GameSortCategory;
  system?: string;

  constructor () {
    this.page = 1;
  }
}
