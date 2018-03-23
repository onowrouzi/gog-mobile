import { GameOS } from "./GameOS";
import { GameLink } from "./GameLink";
import { GameResultImages } from "./GameResultImages";
import { GameDownloads } from "./GameDownloads";
import { GameDescription } from "./GameDescription";
import { GameScreenshot } from "./GameScreenshot";
import { GameVideo } from "./GameVideo";

export class GameResult {
    id: number;
    title: string;
    purchase_link: string;
    slug: string;
    content_system_compatibility: GameOS;
    languages: any;
    links: GameLink;
    in_development: {
      active: boolean;
      until: number;
    };
    is_secret: boolean;
    is_installable: boolean;
    game_type: string;
    is_pre_order: boolean;
    release_date: Date;
    images: GameResultImages;
    dlcs: any[];
    downloads: GameDownloads;
    expanded_dlcs: any[];
    description: GameDescription;
    screenshots: GameScreenshot[];
    videos: GameVideo[];
    related_products: any[];
    changelog: string;
}
