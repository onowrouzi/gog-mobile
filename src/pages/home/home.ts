import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  games: any[];
  constructor(public navCtrl: NavController, private _http: HttpClient) {
    _http.get('/gog/games/ajax/filtered', {
      params: {
        mediaType: 'game',
        sort: 'popularity'
      }
    }).subscribe((res:any) => this.games = res.products);
  }

}
