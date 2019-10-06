import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-infos',
  templateUrl: './game-infos.component.html',
  styleUrls: ['./game-infos.component.css']
})
export class GameInfosComponent implements OnInit {
  @Input() score: number;

  constructor() { }

  ngOnInit() {
  }

}
