import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameInfosComponent } from './game-infos/game-infos.component';
import { GameTopRowComponent } from './game-top-row/game-top-row.component';
import { GameContentComponent } from './game-content/game-content.component';
import { CardComponent } from './card/card.component';

import { CardsService } from './services/cards.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CardsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
