import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTopRowComponent } from './game-top-row.component';
import { AppCardStubComponent } from '../card/card.component.stub';
import { Stock } from '../stock';

describe('GameTopRowComponent', () => {
  let component: GameTopRowComponent;
  let fixture: ComponentFixture<GameTopRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameTopRowComponent,
        AppCardStubComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTopRowComponent);
    component = fixture.componentInstance;

    component.stock = new Stock([]);
    component.foundations = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
