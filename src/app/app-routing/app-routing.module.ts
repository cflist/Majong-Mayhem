import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GamesComponent } from '../games/games.component';
import { GameDetailComponent } from '../game-detail/game-detail.component';
import { AuthcallbackComponent } from '../authcallback/authcallback.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: GameDetailComponent },
  { path: 'games', component: GamesComponent },
  { path: 'authcallback', component: AuthcallbackComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
