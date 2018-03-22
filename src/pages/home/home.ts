import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { sortBy } from 'lodash';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  games: any[];
  constructor(public navCtrl: NavController, private _http: HttpClient) {
    _http.get('/api/games/ajax/filtered', {
      params: {
        mediaType: 'game',
        sort: 'title'
      }
    }).subscribe((res:any) => this.games = res.products);
  }

}
