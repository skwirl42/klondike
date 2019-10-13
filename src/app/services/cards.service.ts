import { Injectable } from '@angular/core';

import { Card } from '../card';
import { Column, ColumnType } from '../column';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  CARD_COLORS = 4;
  COLUMNS_NUMBER = 7;
  FAMILIY_NUMBER = 13;

  columns: Column[];
  stock: Column;

  constructor() { }

  private canMove(movingCard: Card, target: Column): boolean {
    return (target.length &&
      movingCard.suit.color !== target.frontCard.suit.color &&
      (movingCard.cardNumericValue === target.frontCard.cardNumericValue - 1));
  }

  private findOriginalColumn(card: Card): Column {
    return this.columns.find(column => column.contains(card));
  }

  private moveCards(draggingCards: Card[], targetColumn: Column) {
    const originalColumn = this.findOriginalColumn(draggingCards[0]);
    originalColumn.removeCards(draggingCards);
    targetColumn.addCards(draggingCards);
  }

  tryToMove(draggingCards: Card[], target: Column) {
    if (this.canMove(draggingCards[0], target)) {
      this.moveCards(draggingCards, target);
    }
  }

  generateCards() {
    const cardsValues = Array.from(Array(this.CARD_COLORS * this.FAMILIY_NUMBER).keys());
    const cardsValuesShuffled = [];
    while (cardsValues.length) {
      const randomIndex = Math.floor(Math.random() * cardsValues.length);
      cardsValuesShuffled.push(cardsValues[randomIndex]);
      cardsValues.splice(randomIndex, 1);
    }
    this.columns = [];
    for (let i = 0; i < this.COLUMNS_NUMBER; i++) {
      const cards = [];
      for (let j = 0; j <= i; j++) {
        cards.push(new Card(cardsValuesShuffled.shift()));
      }
      this.columns.push(new Column(cards, ColumnType.Column));
    }
    this.stock = new Column(cardsValuesShuffled, ColumnType.Stock);
  }
}
