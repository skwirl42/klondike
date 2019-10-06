import { Component, HostListener } from '@angular/core';

import { Card } from '../card';
import { EventListener } from '@angular/core/src/debug/debug_node';

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
  onMove(event: any) {
    if (this.dragging) {
      const x = event.clientX - this.baseX;
      const y = event.clientY - this.baseY;
      this.draggingCards.forEach(card => {
        card.x = x;
        card.y = y;
      });
    }
  }

  @HostListener('mouseup', ['$event'])
  onRelease(event: any) {
    console.log('parent');
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
