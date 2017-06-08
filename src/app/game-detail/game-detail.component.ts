import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GameService }  from '../game.service';
import { Game } from '../game';
import * as io from 'socket.io-client';

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
    .subscribe(game => {
      this.game = game;

      var socket = io(this.gameService.getBaseUrl() + "?gameId=" + this.game.id);

      socket.on('start', function() {
        console.log("GAME STARTED");
        this.game.state == "playing";
      });

      socket.on('end', function() {
        console.log("GAME FINISHED");
        this.game.state == "finished";
      });

      socket.on('playerJoined', function(player) {
        console.log("PLAYER JOINED");
        this.game.players.push(player);
      });
    });
  }

  start(): void {
    this.gameService.start(this.game.id);
  }

  join(): void {
    this.gameService.join(this.game.id);
  }

  leave(): void {
    this.gameService.leave(this.game.id);
  }

  canJoin(): boolean {
    if (this.game.players.length >= this.game.maxPlayers) { return false;}
    if (this.game.players.find(w => w._id == localStorage.getItem('username'))) { return false; }
    if (this.game.state != "open") { return false; }
    return true;
  }

  canLeave(): boolean {
    if (this.game.state != "open") { return false;}
    if (this.game.createdBy._id == localStorage.getItem('username')) { return false;}
    if (this.game.players.find(w => w._id != localStorage.getItem('username'))) { return false; }
    return true;
  }

  play(): void {
    location.href = '/games/' + this.game.id;
  }

}
