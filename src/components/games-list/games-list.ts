import { Component, Input } from '@angular/core';

@Component({
  selector: 'games-list',
  templateUrl: 'games-list.html'
})
export class GamesListComponent {

  @Input() games: any[];

  constructor() {
  }

}
