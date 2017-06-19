import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GameService }  from '../game.service';
import { Game } from '../game';
import { Tile } from '../tile';
import { Player } from '../player';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  tiles: Tile[];
  players: Player[];
  gameId: string;
  constructor(private gameService: GameService,
  private route: ActivatedRoute) { }

  private selectedTiles = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];

      this.gameService.getTiles(this.gameId).then(tiles => {
        this.tiles = tiles;

        this.gameService.getPlayers(this.gameId).then(players => {
          this.players = players;

          var socket = io(this.gameService.getBaseUrl() + "?gameId=" + this.gameId);
          var that = this;

          socket.on('match', function(tiles) {
            that.players.find(function (player) {
              return player._id == tiles[0].match.foundBy;
            }).numberOfMatches++;

            for (var i = 0; i < 2; i++) {
              that.tiles.find(function (tile) {
                return tile._id == tiles[i]._id;
              }).match = tiles[i].match;
            }
          });

          socket.on('end', function() {
            alert("Game ended");
          });
        });
      });
    });
  }

  public tileSelected(tile) {
    if (this.selectedTiles.length == 1) {
      if (tile == this.selectedTiles[0]) {
        tile.selected = false;
        this.selectedTiles = [];
        return;
      }
    }

    this.selectedTiles.push(tile);
    tile.selected = true;
    if (this.selectedTiles.length == 2)
      this.tileMatches();
  }

  public tileMatches() {
    var tiles = this.selectedTiles;
    this.selectedTiles = [];

    tiles[0].selected = false;
    tiles[1].selected = false;

    console.log(tiles);

    // if (tiles[0].tile.suit == tiles[1].tile.suit) {
    //   if (tiles[0].matchesWholeSuit ||
    //       (tiles[0].tile.name == tiles[1].tile.name)) {
            this.gameService.postTileMatch(this.gameId, tiles).then(object => {
              if (object.message){
              alert(object.message.replace(/{{.*}} /g, ''));}
            });
            return;
    //   } else {
    //     alert("The chosen tiles are not a match");
    //   }
    // } else {
    //   alert("The chosen tiles are not of the same suit");
    // }
  }
}
