import { Component, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GameQueryProvider } from '../../providers/game-query/game-query';
import { TitleBarSettings } from '../../models/TitleBarSettings';

@Component({
  selector: 'title-bar',
  templateUrl: 'title-bar.html'
})
export class TitleBarComponent {

  @Input() title: string;
  @Input() link?: string;

  constructor(private _iab: InAppBrowser, private _gamesProvider : GameQueryProvider) {
    this.setOnTitleChange();
  }

  onLogoClick() {
    if (this.link) {
      const webview = this._iab.create(this.link, '_self', 'location=no,hardwareback=yes,toolbar=no');
      webview.show();
    }
  }

  setOnTitleChange() {
    this._gamesProvider.titleBarSettingsEmitter.subscribe((res: TitleBarSettings) => {
      this.title = res.title;
      this.link = res.link;
    });
  }
}
