import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameService }  from '../game.service';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent {
  @Input() tiles: Tile[];
  @Output() tileSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public boardTileSelected(tile) {
    this.tileSelected.emit(tile);
  }
}
