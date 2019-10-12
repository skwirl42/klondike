import { Component, HostListener } from '@angular/core';

import { Card } from '../card';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  dragging = false;
  draggingCards: Card[] = [];
  baseX = 0;
  baseY = 0;

  columns: Card[][];
  score = 0;

  constructor(private cardsService: CardsService) {
    this.cardsService.generateCards();
    this.columns = this.cardsService.columns;
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
}
