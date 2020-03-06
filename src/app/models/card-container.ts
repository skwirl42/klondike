import { Card } from './card';

export interface CardContainer {
  contains(card: Card): boolean;
  removeCards(cards: Card[]): void;
  addCards(cards: Card[]): void;
  canAcceptCards(cards: Card[]): boolean;
}
