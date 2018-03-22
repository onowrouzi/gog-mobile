import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { GameListQuery } from '../../models/GameListQuery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  gamesQuery: GameListQuery;

  constructor(public navCtrl: NavController) {
    this.gamesQuery = new GameListQuery();
    this.gamesQuery.page = 1;
    this.gamesQuery.sort = 'popularity';
  }

}
