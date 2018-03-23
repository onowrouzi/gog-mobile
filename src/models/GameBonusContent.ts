import { GameFile } from "./GameFile";

export class GameBonusContent {
  id: number;
  name: string;
  type: string;
  count: number;
  total_size: number;
  files: GameFile[];
}
