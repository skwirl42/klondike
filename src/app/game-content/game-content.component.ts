import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-game-content',
  templateUrl: './game-content.component.html',
  styleUrls: ['./game-content.component.css']
})
export class GameContentComponent {
  @Input() columns: Card[][];
  @Output() cardSelected = new EventEmitter();

  constructor() { }

  onCardSelected(event: any, card: Card) {
    event.cards = [card];
    this.cardSelected.emit(event);
  }

  onMouseUp() { }
}
