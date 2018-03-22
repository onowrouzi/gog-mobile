import { NgModule } from '@angular/core';
import { GamesListComponent } from './games-list/games-list';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [GamesListComponent],
	imports: [IonicModule],
	exports: [GamesListComponent]
})
export class ComponentsModule {}
