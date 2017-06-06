import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GameService }  from '../game.service';
import { Game } from '../game';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  game: Game;
  constructor(private gameService: GameService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.gameService.getGame(params['id']))
    .subscribe(game => this.game = game);
  }

  start(): void {
    this.gameService.start(this.game.id);
  }

  play(): void {
    location.href = '/games/' + this.game.id;
  }

}
