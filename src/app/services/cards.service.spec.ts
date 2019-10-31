import { CardsService } from './cards.service';
import { suits } from '../models/card';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => { service = new CardsService(); });

  it('generateCards generate cards', () => {
    service.generateCards();
    expect(service.columns.length).toBe(service.COLUMNS_NUMBER);
    expect(service.foundations.length).toBe(suits.length);
    expect(service.stock.length).toBeGreaterThan(0);
  });
});
