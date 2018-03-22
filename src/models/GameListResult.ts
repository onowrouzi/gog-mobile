import { GameProduct } from "./GameProduct";

export class GameListResult {
  products: GameProduct[];
  page: number;
  totalPages: number;
  totalResults: number;
  totalGamesFound: number;
  totalMoviesFound: number;
}
