import { Card } from './card';
import { CardContainer } from './card-container';

export class Stock implements CardContainer {
  public revealedCards: Card[] = [];

  constructor(public cards: Card[]) { }

  get length(): number {
    return this.cards.length + this.revealedCards.length;
  }

  revealCards() {
    const card = this.cards.pop();
    card.hidden = false;
    this.revealedCards.push(card);
  }

  contains(card: Card): boolean {
    return this.revealedCards.indexOf(card) !== -1 || this.cards.indexOf(card) !== -1;
  }

  removeCards(cards: Card[]): void {
    this.revealedCards.splice(this.revealedCards.indexOf(cards[0]));
  }

  reset() {
    if (!this.cards.length) {
      while (this.revealedCards.length) {
        const card = this.revealedCards.pop();
        card.hidden = true;
        this.cards.push(card);
      }
    }
  }

  addCards(cards: Card[]): void {
    throw new Error('Method not implemented.');
  }
}
