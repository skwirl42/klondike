import { CardsService } from './cards.service';
import { suits } from '../models/card';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => { service = new CardsService(); });

  it('generateCards generate cards', () => {
    service.generateCards();
    expect(service.generateCards.length).toBe(suits.length * this.FAMILIY_NUMBER);
  });
});
