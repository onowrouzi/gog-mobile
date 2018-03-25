import { Component, NgZone, Input, AfterViewInit } from '@angular/core';
import { Content } from 'ionic-angular';

@Component({
  selector: 'scroll-button',
  templateUrl: 'scroll-button.html'
})
export class ScrollButtonComponent implements AfterViewInit {

  @Input() content: Content;
  showScrollToTop: boolean;

  constructor(private _zone: NgZone) {}

  ngAfterViewInit() {
    this.content.ionScroll.subscribe((evt : Content) => {
      this._zone.run(() => {
        this.showScrollToTop = evt.scrollTop > 100;
      });
    });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

}
