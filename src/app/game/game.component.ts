import { Component, HostListener } from '@angular/core';

import { Card } from '../card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  CARD_COLORS = 4;
  COLUMNS_NUMBER = 7;
  FAMILIY_NUMBER = 13;

  score = 0;
  stock: Card[];
  columns: Card[][];

  dragging = false;
  draggingCards: Card[];
  baseX = 0;
  baseY = 0;

  constructor() {
    this.generateCards();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    this.onMove(event.clientX, event.clientY);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: any) {
    event.preventDefault();
    const touch = event.changedTouches[0];
    this.onMove(touch.clientX, touch.clientY);
  }

  onMove(xEvent: number, yEvent: number) {
    if (this.dragging) {
      const x = xEvent - this.baseX;
      const y = yEvent - this.baseY;
      this.draggingCards.forEach(card => {
        card.x = x;
        card.y = y;
      });
    }
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  onRelease(event: any) {
    this.dragging = false;
    this.draggingCards.forEach(card => {
      card.x = 0;
      card.y = 0;
      card.dragging = false;
    });
  }

  onCardSelected(event: any) {
    this.baseX = event.x;
    this.baseY = event.y;
    this.draggingCards = event.cards;
    this.draggingCards.forEach(card => {
      card.dragging = true;
    });
    this.dragging = true;
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
