import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameService }  from '../game.service';
import { Game } from '../game';
import { Player } from '../player';
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
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.gameService.getGame(params['id']))
    .subscribe(game => {
      this.game = game;
      var that = this;

      var socket = io(this.gameService.getBaseUrl() + "?gameId=" + this.game.id);

      socket.on('start', function() {
        console.log("GAME STARTED");
        that.game.state == "playing";
      });

      socket.on('end', function() {
        console.log("GAME FINISHED");
        that.game.state == "finished";
      });

      socket.on('playerJoined', function(player) {
        delete player.token;
        var newPlayer: Player = player;
        console.log(player);
        console.log("PLAYER JOINED");
        that.game.players.push(newPlayer);
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

  canStart(): boolean {
    return this.game.createdBy._id == localStorage.getItem('username') && this.game.state == 'open';
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
    this.router.navigate(['/games', this.game.id]);
  }

}
