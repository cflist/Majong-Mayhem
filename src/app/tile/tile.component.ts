import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tile } from '../tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})

export class TileComponent {
  @Input() tile: Tile;
  @Output() tileSelected: EventEmitter<any> = new EventEmitter();

  sendNotification() {
    this.tileSelected.emit(this.tile);
  }

  constructor() { }

  public getTileStyle() {
    var x = 57;
    var y = 79;
    var style = {
      //'left': ((this.tile.xPos * 30) + (this.tile.zPos * 5)) + "px",
      //'top': ((this.tile.yPos * 30) + (this.tile.zPos * 5)) + "px",
      'left': (this.tile.xPos * (x/2)) + (this.tile.zPos * 5) + "px",
      'top': (this.tile.yPos * (y/2)) - (this.tile.zPos * 5) + "px",
      'z-index': this.tile.zPos
    }

    return style;
  }

  public getTileUnicode() {
    switch(this.tile.tile.suit) {
      case "Bamboo":
        return 'zxcvbnm,.'.charAt(+this.tile.tile.name);
      case "Character":
        return 'qwertyuio'.charAt(+this.tile.tile.name);
      case "Circle":
        return 'asdfghjkl'.charAt(+this.tile.tile.name);
      case "Dragon":
        switch(this.tile.tile.name) {
          case "Red": return 7;
          case "Green": return 6;
          case "White": return 9;
        }
        break;
      case "Flower":
        switch(this.tile.tile.name) {
          case "Plum": return 1;
          case "Orchid": return 2;
          case "Chrysantememum": return 3;
          case "Bamboo": return 4;
        }
        break;
      case "Season":
        switch(this.tile.tile.name) {
          case "Summer": return 1;
          case "Spring": return 2;
          case "Winter": return 3;
          case "Fall":
          case "Autumn":
            return 4;
        }
        break;
      case "Wind":
        switch(this.tile.tile.name) {
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

//    public selectTile(tile) {
//      if (this.selectedTiles.length == 1) {
//        if (tile == this.selectedTiles[0]) {
//          tile.selected = false;
//          this.selectedTiles = [];
//          return;
//        }
//      }
//
//      this.selectedTiles.push(tile);
//      tile.selected = true;
//      if (this.selectedTiles.length == 2)
//        this.tileMatches();
//    }
//
//    public tileMatches() {
//      var tiles = this.selectedTiles;
//      this.selectedTiles = [];
//
//      tiles[0].selected = false;
//      tiles[1].selected = false;
//
//      console.log(tiles);
//
//      if (tiles[0].tile.suit == tiles[1].tile.suit) {
//        if (tiles[0].matchesWholeSuit ||
//            (tiles[0].tile.name == tiles[1].tile.name)) {
//              this.gameService.postTileMatch(this.gameId, tiles).then(object => {
//                if (object.message){
//                alert(object.message.replace(/{{.*}} /g, ''));}
//              });
//              return;
//        } else {
//          alert("The chosen tiles are not a match");
//        }
//      } else {
//        alert("The chosen tiles are not of the same suit");
//      }
//    }
}