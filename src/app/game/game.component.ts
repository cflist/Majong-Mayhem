import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GameService }  from '../game.service';
import { Game } from '../game';
import { Tile } from '../tile';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  tiles: Tile[];
  constructor(private gameService: GameService,
  private route: ActivatedRoute) { }

  private selectedTiles = [];

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.gameService.getTiles(params['id']))
    .subscribe(tiles => this.tiles = tiles);
  }

  public getTileStyle(tile) {
    var style = {
      'left': ((tile.xPos * 40) + (tile.zPos * 5)) + "px",
      'top': ((tile.yPos * 40) + (tile.zPos * 5)) + "px",
      'z-index': 100 - tile.zPos,
    }

    return style;
  }

  public getTileUnicode(tile) {
    //switch(tile.tile.suit) {
    //  case "Bamboo":
    //    switch(tile.tile.name) {
    //      case 1: return "z";
    //      case 2: return "x";
    //      case 3: return "c";
    //      case 4: return "v";
    //      case 5: return "b";
    //      case 6: return "n";
    //      case 7: return "m";
    //      case 8: return ",";
    //      case 9: return ".";
    //   }
    //  case "Character":
    //    switch(tile.tile.name) {
    //      case 1: return "q";
    //      case 2: return "w";
    //      case 3: return "e";
    //      case 4: return "r";
    //      case 5: return "t";
    //      case 6: return "y";
    //      case 7: return "u";
    //      case 8: return "i";
    //      case 9: return "o";
    //    }
    //  case "Circle":
    //    switch(tile.tile.name) {
    //      case 1: return "a";
    //      case 2: return "s";
    //      case 3: return "d";
    //      case 4: return "f";
    //      case 5: return "g";
    //      case 6: return "h";
    //      case 7: return "j";
    //      case 8: return "k";
    //      case 9: return "l";
    //    }
    //  case "Dragon":
    //    switch(tile.tile.name) {
    //      case 1: return 6;
    //      case 2: return 7;
    //    }
    //  case "Flower":
    //    switch(tile.tile.name) {
    //      case 1: return "A";
    //      case 2: return "B";
    //      case 3: return "C";
    //      case 4: return "D";
    //    }
    //  case "Wind":
    //    switch(tile.tile.name) {
    //      case 1: return 1;
    //      case 2: return 2;
    //      case 3: return 3;
    //      case 4: return 4;
    //    }
    //  }

    // Fallback
    return 'abcdefghijklmnopqrstuvwxyz0123456789,.ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(tile.tile.name);
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

    if (tiles[0].tile.suit == tiles[1].tile.suit) {
      if (tiles[0].matchesWholeSuit ||
          (tiles[0].tile.name == tiles[1].tile.name)) {
            console.log("Valid match!");
            this.route.params
            .switchMap((params: Params) => this.gameService.postTileMatch(params['id'], tiles))
            .subscribe(_ => location.reload());
            return;
      }
    }

    console.log("Not a match!");
  }
}
