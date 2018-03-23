import { GameBonusContent } from "./GameBonusContent";
import { GameInstaller } from "./GameInstaller";

export class GameDownloads {
  installers: GameInstaller[];
  patches: any[];
  language_packs: any[];
  bonus_content: GameBonusContent[];
}
