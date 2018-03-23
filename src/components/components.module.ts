import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GameReviewListComponent } from './game-review-list/game-review-list';
import { TitleBarComponent } from './title-bar/title-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GameQueryProvider } from '../providers/game-query/game-query';
@NgModule({
	declarations: [
    GameReviewListComponent,
    TitleBarComponent
  ],
	imports: [IonicModule],
	exports: [
    GameReviewListComponent,
    TitleBarComponent
  ],
  providers: [
    InAppBrowser,
    GameQueryProvider
  ]
})
export class ComponentsModule {}
