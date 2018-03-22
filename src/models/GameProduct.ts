import { GameAvailability } from "./GameAvailability";
import { GameSalesVisibility } from "./GameSalesVisibility";
import { GamePrice } from "./GamePrice";
import { GameOS } from "./GameOS";

export class GameProduct {
  availability: GameAvailability;
  buyable: boolean;
  category: string;
  customAttributes: string[];
  forumUrl: string;
  id: number;
  image: string;
  isComingSoon: boolean;
  isDiscounted: boolean;
  isGame: boolean;
  isInDevelopment: boolean;
  isMovie: boolean;
  isPriceVisible: boolean;
  originalCategory: string;
  price: GamePrice;
  rating: number;
  releaseDate: number;
  salesVisibility: GameSalesVisibility;
  slug: string;
  supportUrl: string;
  title: string;
  type: number;
  url: string;
  worksOn: GameOS;
}
