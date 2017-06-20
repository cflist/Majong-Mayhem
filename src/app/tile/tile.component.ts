import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tile } from '../tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.sass']
})

export class TileComponent {
  @Input() tile: Tile;
  @Output() tileSelected: EventEmitter<any> = new EventEmitter();

  sendNotification() {
    this.tileSelected.emit(this.tile);
  }

  constructor() { }

  public getTileStyle() {
    var width = 60;
    var height = 82.5;
    var style = {
      //'left': ((this.tile.xPos * 30) + (this.tile.zPos * 5)) + "px",
      //'top': ((this.tile.yPos * 30) + (this.tile.zPos * 5)) + "px",
      'top': (this.tile.yPos * (height/2)) - (this.tile.zPos * 5) + "px",
      'left': (this.tile.xPos * (width/2)) + (this.tile.zPos * 5) + "px",
      'z-index': this.tile.zPos
    }

    return style;
  }

  public getTileUnicode() {
    switch(this.tile.tile.suit) {
      case "Bamboo":
        if (+this.tile.tile.name > 9) break;
        return 'zxcvbnm,.'.charAt(+this.tile.tile.name - 1);
      case "Character":
        if (+this.tile.tile.name > 9) break;
        return 'qwertyuio'.charAt(+this.tile.tile.name - 1);
      case "Circle":
        if (+this.tile.tile.name > 9) break;
        return 'asdfghjkl'.charAt(+this.tile.tile.name - 1);
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
}
