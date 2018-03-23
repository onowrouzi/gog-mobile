import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Loading } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GameResult } from '../../models/GameResult';
import { DomSanitizer } from '@angular/platform-browser';
import { GamePrice } from '../../models/GamePrice';

@Component({
  selector: 'page-game-detail',
  templateUrl: 'game-detail.html',
})
export class GameDetailPage {

  game: GameResult;
  price: GamePrice;
  loaded: boolean;
  loadScreen: Loading;
  fullDescription: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private _viewCtrl: ViewController, private _http: HttpClient, private _sanitizer: DomSanitizer) {
    this.loadScreen = loadingCtrl.create({content: 'Retrieving Game Info...'});
    this.loadScreen.present();
    this.price = this.navParams.get('price');
    const gameId = this.navParams.get('gameId');
    this.getGameDetail(gameId);
  }

  getGameDetail(gameId) {
    this._http.get('/gog/api/products/' + gameId, {
      params: {
        expand: 'downloads,expanded_dlcs,description,screenshots,videos,related_products,changelog'
      }
    }).subscribe((res:GameResult) => {
      this.game = res;
      if (this.game.videos && this.game.videos.length > 0) {
        this.game.videos.forEach((v) => {
          v.video_url = this.trustSrc(v.video_url);
        });
      }
      if (this.game.screenshots && this.game.screenshots.length > 0) {
        this.game.screenshots.forEach((ss) => {
          ss.formatter_template_url = ss.formatter_template_url.replace('{formatter}', '200');
        });
      }
      this.loaded = true;
      this.loadScreen.dismiss();
    }, err => {
      this.loaded = true;
      this.loadScreen.dismiss();
    });
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

  trustSrc(src) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(src);
  }
}
