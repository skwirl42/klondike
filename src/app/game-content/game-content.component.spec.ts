import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameContentComponent } from './game-content.component';
import { AppCardStubComponent } from '../card/card.component.stub';

describe('GameContentComponent', () => {
  let component: GameContentComponent;
  let fixture: ComponentFixture<GameContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameContentComponent,
        AppCardStubComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
