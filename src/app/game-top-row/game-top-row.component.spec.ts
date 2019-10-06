import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTopRowComponent } from './game-top-row.component';

describe('GameTopRowComponent', () => {
  let component: GameTopRowComponent;
  let fixture: ComponentFixture<GameTopRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTopRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTopRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
