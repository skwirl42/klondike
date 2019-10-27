import { Card } from './card';
import { CardContainer } from './card-container';

export class Column implements CardContainer {
  constructor(public cards: Card[]) {
    this.frontCard.hidden = false;
  }

  get frontCard(): Card {
    return this.cards[this.length - 1];
  }

  get length(): number {
    return this.cards.length;
  }

  contains(card: Card): boolean {
    return this.cards.indexOf(card) !== -1;
  }

  getCardsAbove(card: Card): Card[] {
    return this.cards.slice(this.cards.indexOf(card));
  }

  removeCards(cards: Card[]): void {
    this.cards.splice(this.cards.indexOf(cards[0]));
    if (this.frontCard && this.frontCard.hidden) {
      this.frontCard.hidden = false;
    }
  }

  addCards(cards: Card[]): void {
    cards.forEach(card => this.cards.push(card));
  }
}
