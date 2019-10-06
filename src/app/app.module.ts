import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameInfosComponent } from './game-infos/game-infos.component';
import { GameTopRowComponent } from './game-top-row/game-top-row.component';
import { GameContentComponent } from './game-content/game-content.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameInfosComponent,
    GameTopRowComponent,
    GameContentComponent,
    CardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
