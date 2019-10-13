import { Card } from './card';

export enum ColumnType {
  Column,
  Stock,
  Foundation
}

export class Column {
  constructor(public cards: Card[], private type: ColumnType) {
    if (this.type === ColumnType.Column) {
      this.frontCard.hidden = false;
    }
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
    if (this.type === ColumnType.Column && this.frontCard && this.frontCard.hidden) {
      this.frontCard.hidden = false;
    }
  }

  addCards(cards: Card[]): void {
    cards.forEach(card => this.cards.push(card));
  }
}
