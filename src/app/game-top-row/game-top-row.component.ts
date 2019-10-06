import { Component, OnInit } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-game-top-row',
  templateUrl: './game-top-row.component.html',
  styleUrls: ['./game-top-row.component.css']
})
export class GameTopRowComponent implements OnInit {
  card: Card = new Card();

  constructor() { }

  ngOnInit() {
  }

}
