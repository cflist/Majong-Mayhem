import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GameService }  from '../game.service';
import { Game } from '../game';
import { Tile } from '../tile';
import { TileGroup } from '../tileGroup';
import { Player } from '../player';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  tiles: Tile[];
  matchedTileGroups: TileGroup[];
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
        this.matchedTileGroups = [];

        this.gameService.getPlayers(this.gameId).then(players => {
          this.players = players;

          var socket = io(this.gameService.getBaseUrl() + "?gameId=" + this.gameId);
          var that = this;

          socket.on('match', function(tiles) {
            var matchingPlayer = that.players.find(function (player) {
              return player._id == tiles[0].match.foundBy;
            });

            matchingPlayer.numberOfMatches++;

            var localTiles = [];

            for (var i = 0; i < 2; i++) {
              var localTile = that.tiles.find(function (tile) {
                return tile._id == tiles[i]._id;
              })

              localTile.match = tiles[i].match;
              localTiles.push(localTile);
            }

            var tileGroup = { player: matchingPlayer, tiles: localTiles } as TileGroup;
            that.matchedTileGroups.unshift(tileGroup);
          });

          socket.on('end', function() {
            alert("Game ended");
          });
        });
      });
    });
  }

  public weAreMember(): boolean {
    return this.players.find(player => player._id == localStorage.getItem("username")) != undefined;
  }

  public tileSelected(tile) {
    if (!this.weAreMember()) return;

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

    if (tiles[0].tile.suit == tiles[1].tile.suit) {
      if (tiles[0].matchesWholeSuit ||
          (tiles[0].tile.name == tiles[1].tile.name)) {
         this.gameService.postTileMatch(this.gameId, tiles).then(object => {
           if (object.message){
           alert(object.message.replace(/{{.*}} /g, ''));}
         });
         return;
      } else {
        alert("The chosen tiles are not a match");
      }
    } else {
      alert("The chosen tiles are not of the same suit");
    }
  }
}
