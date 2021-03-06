import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GamesComponent } from '../games/games.component';
import { GameDetailComponent } from '../game-detail/game-detail.component';
import { GameComponent } from '../game/game.component';
import { AuthcallbackComponent } from '../authcallback/authcallback.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'authcallback', component: AuthcallbackComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'deletegame/:id', component: GamesComponent },
  { path: 'detail/:id', component: GameDetailComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/:id', component: GameComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
