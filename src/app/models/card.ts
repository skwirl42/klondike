export const suits: Suit[] = [
  {
    symbol: '♠',
    code: 'spade',
    color: 'black'
  },
  {
    symbol: '♥',
    code: 'heart',
    color: 'red'
  },
  {
    symbol: '♦',
    code: 'diamond',
    color: 'red'
  },
  {
    symbol: '♣',
    code: 'club',
    color: 'black'
  }
];

export class Suit {
  symbol: string;
  code: string;
  color: string;
}

export class Card {
  hidden = true;
  dragging = false;
  x = 0;
  y = 0;

  constructor(private value: number) { }

  public get cardNumericValue(): number {
    const numericValue = this.value % 13;
    return numericValue;
  }

  public get cardValue(): string {
    const numericValue = this.value % 13;
    if (numericValue > 9) {
      return ['J', 'Q', 'K'][numericValue - 10];
    } else if (numericValue === 0) {
      return 'A';
    } else {
      return (numericValue + 1).toString();
    }
  }

  public get suit(): Suit {
    return suits[Math.floor(this.value / 13)];
  }
}
