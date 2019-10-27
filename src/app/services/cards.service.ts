import { Injectable } from '@angular/core';

import { Card, suits } from '../card';
import { Column } from '../column';
import { Stock } from '../stock';
import { CardContainer } from '../card-container';


@Injectable({
  providedIn: 'root',
})
export class CardsService {
  COLUMNS_NUMBER = 7;
  FAMILIY_NUMBER = 13;

  columns: Column[];
  stock: Stock;

  constructor() { }

  private canMove(movingCard: Card, target: Column): boolean {
    return (target.length &&
      movingCard.suit.color !== target.frontCard.suit.color &&
      (movingCard.cardNumericValue === target.frontCard.cardNumericValue - 1));
  }

  private findOriginalContainer(card: Card): CardContainer {
    if (this.stock.contains(card)) {
      return this.stock;
    }
    return this.columns.find(column => column.contains(card));
  }

  private moveCards(draggingCards: Card[], targetColumn: Column) {
    const originalContainer = this.findOriginalContainer(draggingCards[0]);
    originalContainer.removeCards(draggingCards);
    targetColumn.addCards(draggingCards);
  }

  tryToMove(draggingCards: Card[], target: Column) {
    if (this.canMove(draggingCards[0], target)) {
      this.moveCards(draggingCards, target);
    }
  }

  generateCards() {
    const cardsValues = Array.from(Array(suits.length * this.FAMILIY_NUMBER).keys());
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
      this.columns.push(new Column(cards));
    }
    this.stock = new Stock(cardsValuesShuffled.map(value => new Card(value)));
  }

  getFromStock() {
    this.stock.revealCards();
  }

  resetStock() {
    this.stock.reset();
  }
}
