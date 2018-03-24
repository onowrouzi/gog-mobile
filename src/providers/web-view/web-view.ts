import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Injectable()
export class WebViewProvider {

  defaultOptions: string;
  constructor(private _iab: InAppBrowser) {
    this.defaultOptions = 'location=no,hardwareback=yes,toolbar=no';
  }

  show(link: string, options?: string | InAppBrowserOptions) {
    const webview = this._iab.create(link, '_self', options || this.defaultOptions);
    webview.show();
  }
}
