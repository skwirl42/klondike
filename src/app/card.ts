const suits: Suit[] = [
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
  },
];

export class Suit {
  symbol: string;
  code: string;
  color: string;
}

export class Card {
  value = 0;
  hidden = true;
  dragging = false;
  x = 0;
  y = 0;

  public get cardValue(): string {
    const numericValue = this.value % 13;
    if (numericValue > 9) {
      return ['j', 'q', 'k'][numericValue - 10];
    }
    return (numericValue + 1).toString();
  }

  public get suit(): Suit {
    return suits[Math.floor(this.value / 13)];
  }
}
