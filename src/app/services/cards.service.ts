import { Injectable } from '@angular/core';

import { Card, suits } from '../models/card';
import { Column } from '../models/column';
import { Stock } from '../models/stock';
import { CardContainer } from '../models/card-container';
import { Foundation } from '../models/foundation';


@Injectable({
  providedIn: 'root',
})
export class CardsService {
  COLUMNS_NUMBER = 7;
  CARDS_PER_SUIT = 13;

  columns: Column[];
  foundations: Foundation[];
  stock: Stock;

  constructor() { }

  private canMove(movingCard: Card, target: Column): boolean {
    return ((!target.length && movingCard.cardNumericValue === this.CARDS_PER_SUIT - 1) || target.length &&
      movingCard.suit.color !== target.frontCard.suit.color &&
      (movingCard.cardNumericValue === target.frontCard.cardNumericValue - 1));
  }

  private canMoveFoundation(movingCard: Card, foundation: Foundation): boolean {
    return (movingCard.suit === foundation.suit &&
      foundation.nextNumericValue === movingCard.cardNumericValue);
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
    if (targetColumn.canAcceptCards(draggingCards)) {
      const originalContainer = this.findOriginalContainer(draggingCards[0]);
      originalContainer.removeCards(draggingCards);
      targetColumn.addCards(draggingCards);
    }
  }

  public tryToMove(draggingCards: Card[], target: Column) {
    if (this.canMove(draggingCards[0], target)) {
      this.moveCards(draggingCards, target);
    }
  }

  public generateCards() {
    const cardsValues = Array.from(Array(suits.length * this.CARDS_PER_SUIT).keys());
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
    suits.map((family) => {
      this.foundations.push(new Foundation(family));
    });
  }

  public tryToMoveFoundation(cards: Card[]): boolean {
    if (cards.length !== 1) {
      return false;
    }
    const card = cards[0];
    const foundation = this.foundations.find(f => this.canMoveFoundation(card, f));
    if (foundation) {
      this.moveCards(cards, foundation);
      return true;
    }
    return false;
  }

  public tryToGuessMove(cards: Card[]) {
    const card = cards[0];
    const foundation = this.foundations.find(f => this.canMoveFoundation(card, f));
    if (foundation) {
      return this.moveCards(cards, foundation);
    }
    const column = this.columns.find(c => this.canMove(card, c));
    if (column) {
      this.moveCards(cards, column);
    }
  }

  public getFromStock() {
    this.stock.revealCards();
  }

  public resetStock() {
    this.stock.reset();
  }
}
