import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { GameComponent } from './game.component';
import { CardsService } from '../services/cards.service';
import { Stock } from '../models/stock';
import { Foundation } from '../models/foundation';
import { Column } from '../models/column';

@Component({ selector: 'app-game-infos', template: '' })
class AppGameInfosComponent {
  @Input() score: number;
}

@Component({ selector: 'app-game-top-row', template: '' })
class AppGameTopRowComponent {
  @Input() stock: Stock;
  @Input() foundations: Foundation[];
}

@Component({ selector: 'app-game-content', template: '' })
class AppGameContentComponent {
  @Input() columns: Column[];
}

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let cardsServiceStub: Partial<CardsService>;

  beforeEach(async(() => {
    cardsServiceStub = {
      generateCards: () => { }
    };

    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        AppGameInfosComponent,
        AppGameTopRowComponent,
        AppGameContentComponent
      ],
      providers: [{ provide: CardsService, useValue: cardsServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
