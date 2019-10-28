import { Component, HostBinding, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card: Card = new Card(0);
  @Output() selected = new EventEmitter();
  @Output() clicked = new EventEmitter();

  @HostBinding('class.hidden') get hidden() { return this.card.hidden; }
  @HostBinding('class.dragging') get dragging() { return this.card.dragging; }
  @HostBinding('style.left.px') get left() { return this.card.x; }
  @HostBinding('style.top.px') get top() { return this.card.y; }
  @HostBinding('style.color') get color() { return this.card.suit.color; }

  @HostListener('click')
  onClick() {
    if (!this.card.hidden) {
      this.clicked.emit();
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    this.onDragStart(event.clientX, event.clientY);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: any) {
    const touch = event.changedTouches[0];
    this.onDragStart(touch.clientX, touch.clientY);
  }

  onDragStart(xEvent: number, yEvent: number) {
    if (!this.card.hidden) {
      this.selected.emit({ x: xEvent, y: yEvent });
    }
  }

  constructor() { }
}
