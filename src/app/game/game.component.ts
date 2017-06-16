import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GameService }  from '../game.service';
import { Game } from '../game';
import { Tile } from '../tile';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  tiles: Tile[];
  gameId: string;
  constructor(private gameService: GameService,
  private route: ActivatedRoute) { }

  private selectedTiles = [];

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.gameService.getTiles(params['id']))
    .subscribe(tiles => {
      this.tiles = tiles;

      this.route.params
      .switchMap((params: Params) => this.gameId = params['id'])
      .subscribe(_ => {
        var socket = io(this.gameService.getBaseUrl() + "?gameId=" + this.gameId);
        var that = this;

        socket.on('match', function(tiles) {
          console.log("MATCH RECEIVED");
          for (var i = 0; i < 2; i++) {
            var matchingTile = that.tiles.find(function (tile) {
              return tile._id == tiles[i]._id;
            });
            matchingTile.match = tiles[i].match;
          }
        });

        socket.on('end', function() {
          alert("Game ended");
        });
      });
    });
  }

  public getTileStyle(tile) {
    var x = 57;
    var y = 79;
    var style = {
      //'left': ((tile.xPos * 30) + (tile.zPos * 5)) + "px",
      //'top': ((tile.yPos * 30) + (tile.zPos * 5)) + "px",
      'left': (tile.xPos * (x/2)) + (tile.zPos * 5) + "px",
      'top': (tile.yPos * (y/2)) - (tile.zPos * 5) + "px",
      'z-index': tile.zPos
    }

    return style;
  }

  public getTileUnicode(tile) {
    switch(tile.tile.suit) {
      case "Bamboo":
        return 'zxcvbnm,.'.charAt(tile.tile.name);
      case "Character":
        return 'qwertyuio'.charAt(tile.tile.name);
      case "Circle":
        return 'asdfghjkl'.charAt(tile.tile.name);
      case "Dragon":
        switch(tile.tile.name) {
          case "Red": return 7;
          case "Green": return 6;
          case "White": return 9;
        }
        break;
      case "Flower":
        switch(tile.tile.name) {
          case "Plum": return 1;
          case "Orchid": return 2;
          case "Chrysantememum": return 3;
          case "Bamboo": return 4;
        }
        break;
      case "Season":
        switch(tile.tile.name) {
          case "Summer": return 1;
          case "Spring": return 2;
          case "Winter": return 3;
          case "Fall":
          case "Autumn":
            return 4;
        }
        break;
      case "Wind":
        switch(tile.tile.name) {
          case "East": return 1;
          case "South": return 2;
          case "West": return 3;
          case "North": return 4;
        }
        break;
      }

    // Error
    return 'A';
  }

  public selectTile(tile) {
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

    if (tiles[0].tile.suit == tiles[1].tile.suit) {
      if (tiles[0].matchesWholeSuit ||
          (tiles[0].tile.name == tiles[1].tile.name)) {
            console.log("Valid match!");
            this.gameService.postTileMatch(this.gameId, tiles);
            return;
      }
    }

    console.log("Not a match!");
  }
}
