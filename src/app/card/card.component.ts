import { Component, HostBinding, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card: Card = new Card();
  @Output() selected = new EventEmitter();

  @HostBinding('class.hidden') get hidden() { return this.card.hidden; }
  @HostBinding('class.dragging') get dragging() { return this.card.dragging; }
  @HostBinding('style.left.px') get left() { return this.card.x; }
  @HostBinding('style.top.px') get top() { return this.card.y; }

  @HostListener('mousedown', ['$event'])
  onTouch(event: any) {
    if (!this.card.hidden) {
      this.selected.emit({ x: event.clientX, y: event.clientY });
    }
  }

  constructor() { }
}
