import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Stock } from '../stock';
import { Card } from '../card';

@Component({
  selector: 'app-game-top-row',
  templateUrl: './game-top-row.component.html',
  styleUrls: ['./game-top-row.component.css']
})
export class GameTopRowComponent {
  @Input() stock: Stock;
  @Output() stockClicked = new EventEmitter();
  @Output() resetStock = new EventEmitter();
  @Output() cardSelected = new EventEmitter();

  constructor() { }

  public onStockClicked(event: any) {
    event.stopPropagation();
    this.stockClicked.emit();
  }

  public onResetStock() {
    this.resetStock.emit();
  }

  public lastThreeOf(array: Card[]) {
    return array.slice(Math.max(array.length - 3, 0));
  }

  onCardSelected(event: any, card: Card) {
    event.cards = [card];
    this.cardSelected.emit(event);
  }
}
