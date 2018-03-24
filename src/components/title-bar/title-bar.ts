import { Component, Input } from '@angular/core';
import { GameQueryProvider } from '../../providers/game-query/game-query';
import { TitleBarSettings } from '../../models/TitleBarSettings';
import { WebViewProvider } from '../../providers/web-view/web-view';

@Component({
  selector: 'title-bar',
  templateUrl: 'title-bar.html'
})
export class TitleBarComponent {

  @Input() title: string;
  @Input() link?: string;

  constructor(private _webviewProvider: WebViewProvider, private _gamesProvider : GameQueryProvider) {
    this.setOnTitleChange();
  }

  onLogoClick() {
    if (this.link) {
      this._webviewProvider.show(this.link);
    }
  }

  setOnTitleChange() {
    this._gamesProvider.titleBarSettingsEmitter.subscribe((res: TitleBarSettings) => {
      this.title = res.title;
      this.link = res.link;
    });
  }
}
