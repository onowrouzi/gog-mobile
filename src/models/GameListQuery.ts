import { GameCategory } from "./GameCategory";
import { GamePriceCategory } from "./GamePriceCategory";
import { GameSortCategory } from "./GameSortCategory";

export class GameListQuery {
  category?: GameCategory;
  feature?: string;
  limit?: number;
  page?: number;
  price?: GamePriceCategory;
  release?: string;
  search?: string;
  sort?: GameSortCategory;
  system?: string;

  constructor () {
    this.page = 1;
  }
}
