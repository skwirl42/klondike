import { Injectable } from '@angular/core';

import { Card, suits } from '../card';
import { Column } from '../column';
import { Stock } from '../stock';
import { CardContainer } from '../card-container';
import { Foundation } from '../foundation';


@Injectable({
  providedIn: 'root',
})
export class CardsService {
  COLUMNS_NUMBER = 7;
  FAMILIY_NUMBER = 13;

  columns: Column[];
  foundations: Foundation[];
  stock: Stock;

  constructor() { }

  private canMove(movingCard: Card, target: Column): boolean {
    return ((!target.length && movingCard.cardNumericValue === this.FAMILIY_NUMBER - 1) || target.length &&
      movingCard.suit.color !== target.frontCard.suit.color &&
      (movingCard.cardNumericValue === target.frontCard.cardNumericValue - 1));
  }

  private findOriginalContainer(card: Card): CardContainer {
    if (this.stock.contains(card)) {
      return this.stock;
    }
    const foundation = this.foundations.find(f => f.contains(card));
    if (foundation) {
      return foundation;
    }
    return this.columns.find(c => c.contains(card));
  }

  private moveCards(draggingCards: Card[], targetColumn: CardContainer) {
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
    this.foundations = [];
    suits.map((familiy) => {
      this.foundations.push(new Foundation(familiy));
    });
  }

  tryToMoveFoundation(cards: Card[]): boolean {
    if (cards.length !== 1) {
      return false;
    }
    const card = cards[0];
    const foundation = this.foundations.find(f => f.suit === card.suit);
    if ((!foundation.frontCard && card.cardNumericValue === 0) ||
      (foundation.frontCard && foundation.frontCard.cardNumericValue + 1 === card.cardNumericValue)) {
      this.moveCards(cards, foundation);
      return true;
    }
    return false;
  }

  getFromStock() {
    this.stock.revealCards();
  }

  resetStock() {
    this.stock.reset();
  }
}
