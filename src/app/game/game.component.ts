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
        return '67'.charAt(tile.tile.name);
      case "Flower":
      case "Season":
      case "Wind":
        return '1234'.charAt(tile.tile.name);
      }

    // Error
    return 'A';

    // Fallback
    //return 'abcdefghijklmnopqrstuvwxyz0123456789,.ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(tile.tile.name);
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
