import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-game', template: '' })
class AppGameComponent { }

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AppGameComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
