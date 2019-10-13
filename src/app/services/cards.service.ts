import { Injectable } from '@angular/core';

import { Card } from '../card';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  CARD_COLORS = 4;
  COLUMNS_NUMBER = 7;
  FAMILIY_NUMBER = 13;

  columns: Card[][];
  stock: Card[];

  constructor() { }

  private canMove(movingCard: Card, targetCard: Card): boolean {
    return ((movingCard.suit.color !== targetCard.suit.color) && (movingCard.cardNumericValue === targetCard.cardNumericValue - 1));
  }

  private moveCards(draggingCards: Card[], targetColumn: Card[]) {
    let originColumn: Card[];
    let originIndex = 0;
    this.columns.map((column) => {
      column.forEach((card, index) => {
        if (card === draggingCards[0]) {
          originColumn = column;
          originIndex = index;
        }
      });
    });
    if (originColumn) {
      originColumn.splice(originIndex, draggingCards.length);
      if (originColumn.length && originColumn[originColumn.length - 1].hidden) {
        originColumn[originColumn.length - 1].hidden = false;
      }
    }
    draggingCards.forEach(card => targetColumn.push(card));
  }

  tryToMove(draggingCards: Card[], columnIndex: number) {
    const column = this.columns[columnIndex];
    const target = column[column.length - 1];
    if (this.canMove(draggingCards[0], target)) {
      this.moveCards(draggingCards, column);
    }
  }

  generateCards() {
    const cardsValues = [];
    for (let i = 0; i < this.CARD_COLORS * this.FAMILIY_NUMBER; i++) {
      cardsValues.push(i);
    }
    const cardsValuesShuffled = [];
    while (cardsValues.length) {
      const randomIndex = Math.floor(Math.random() * cardsValues.length);
      cardsValuesShuffled.push(cardsValues[randomIndex]);
      cardsValues.splice(randomIndex, 1);
    }
    this.columns = [];
    for (let i = 0; i < this.COLUMNS_NUMBER; i++) {
      this.columns[i] = [];
      for (let j = 0; j <= i; j++) {
        const card = new Card();
        if (j === i) {
          card.hidden = false;
        }
        card.value = cardsValuesShuffled.shift();
        this.columns[i].push(card);
      }
    }
    this.stock = cardsValuesShuffled;
  }
}
