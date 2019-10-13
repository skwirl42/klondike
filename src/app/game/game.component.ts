import { Component, HostListener, OnInit } from '@angular/core';

import { Card } from '../card';
import { Column } from '../column';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  dragging = false;
  draggingCards: Card[] = [];
  baseX = 0;
  baseY = 0;

  columns: Column[];
  score = 0;

  innerHeight: number;
  innerWidth: number;

  constructor(private cardsService: CardsService) {
    this.cardsService.generateCards();
    this.columns = this.cardsService.columns;
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
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

  private onMove(xEvent: number, yEvent: number) {
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
  onTouchEnd(event: any) {
    const touch = event.changedTouches[0];
    this.onRelease(touch.clientX, touch.clientY);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any) {
    this.onRelease(event.clientX, event.clientY);
  }

  private onRelease(xEvent: number, yEvent: number) {
    this.dragging = false;
    if (yEvent > this.innerHeight / 100 * 23) {
      const selectedColumn = this.columns[Math.floor(xEvent / (this.innerWidth / 7))];
      this.cardsService.tryToMove(this.draggingCards, selectedColumn);
    }
    this.resetDragginCards();
  }

  private resetDragginCards() {
    this.draggingCards.forEach(card => {
      card.x = 0;
      card.y = 0;
      card.dragging = false;
    });
  }

  public onCardSelected(event: any) {
    this.baseX = event.x;
    this.baseY = event.y;
    this.draggingCards = event.cards;
    this.draggingCards.forEach(card => {
      card.dragging = true;
    });
    this.dragging = true;
  }
}
