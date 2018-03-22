import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GameListQuery } from '../../models/GameListQuery';

@Component({
  selector: 'page-discounted',
  templateUrl: 'discounted.html',
})
export class DiscountedPage {

  gamesQuery: GameListQuery;

  constructor(public navCtrl: NavController) {
    this.gamesQuery = new GameListQuery();
    this.gamesQuery.page = 1;
    this.gamesQuery.price = 'discounted';
  }

}
