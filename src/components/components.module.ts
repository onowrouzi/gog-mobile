import { NgModule } from '@angular/core';
import { GamesListComponent } from './games-list/games-list';
import { IonicModule } from 'ionic-angular';
import { GameReviewListComponent } from './game-review-list/game-review-list';
@NgModule({
	declarations: [GamesListComponent,
    GameReviewListComponent],
	imports: [IonicModule],
	exports: [GamesListComponent,
    GameReviewListComponent]
})
export class ComponentsModule {}
