import { Component, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GameQueryProvider } from '../../providers/game-query/game-query';

@Component({
  selector: 'title-bar',
  templateUrl: 'title-bar.html'
})
export class TitleBarComponent {

  @Input() title: string;
  @Input() link?: string;

  constructor(private _iab: InAppBrowser, private _gamesProvider : GameQueryProvider) {}

  onLogoClick() {
    if (this.link) {
      const webview = this._iab.create(this.link, '_self', 'location=no,hardwareback=yes,toolbar=no');
      webview.show();
    }
  }

  onTitleChange() {
    this._gamesProvider.titleEmitter.subscribe((res: string) => {
      this.title = res;
      console.log(res);
    });
  }
}
