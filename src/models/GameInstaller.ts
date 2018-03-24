import { GameFile } from "./GameFile";

export class GameInstaller {
  id: string;
  name: string;
  os: string;
  language: string;
  language_full: string;
  version: string;
  total_size: number;
  files: GameFile[];
}
