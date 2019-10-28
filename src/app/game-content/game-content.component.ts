import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Column } from '../column';
import { Card } from '../card';

@Component({
  selector: 'app-game-content',
  templateUrl: './game-content.component.html',
  styleUrls: ['./game-content.component.css']
})
export class GameContentComponent {
  @Input() columns: Column[];
  @Output() cardSelected = new EventEmitter();
  @Output() cardClicked = new EventEmitter();

  constructor() { }

  onCardSelected(event: any, card: Card) {
    const column = this.columns.find(c => c.contains(card));
    event.cards = column.getCardsAbove(card);
    this.cardSelected.emit(event);
  }

  onCardClicked(card: Card) {
    const column = this.columns.find(c => c.contains(card));
    const event = { cards: column.getCardsAbove(card) };
    this.cardClicked.emit(event);
  }
}
