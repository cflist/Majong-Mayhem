import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideRoutes} from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameService} from './game.service';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GamesComponent } from './games/games.component';
import { AuthcallbackComponent } from './authcallback/authcallback.component';
import { GameComponent } from './game/game.component';
import { TileComponent } from './tile/tile.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GameDetailComponent,
    GamesComponent,
    AuthcallbackComponent,
    GameComponent,
    TileComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
