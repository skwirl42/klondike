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
