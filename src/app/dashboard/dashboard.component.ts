import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Tile } from '../tile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  games: Game[] = [];
  tiles: Tile[] = [];
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGames().then(games => this.games = games);
  }

}
