import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameListQuery } from '../../models/GameListQuery';

@Component({
  selector: 'page-new-releases',
  templateUrl: 'new-releases.html',
})
export class NewReleasesPage {

  gamesQuery: GameListQuery;

  constructor(public navCtrl: NavController) {
    this.gamesQuery = new GameListQuery();
    this.gamesQuery.page = 1;
    this.gamesQuery.sort = 'date';
  }

}
