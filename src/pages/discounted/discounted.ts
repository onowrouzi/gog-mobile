import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-discounted',
  templateUrl: 'discounted.html',
})
export class DiscountedPage {
  games: any[];
  constructor(public navCtrl: NavController, private _http: HttpClient) {
    _http.get('/gog/games/ajax/filtered', {
      params: {
        mediaType: 'game',
        sort: 'popularity',
        price: 'discounted'
      }
    }).subscribe((res:any) => this.games = res.products);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscountedPage');
  }

}
