import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { GameService }  from '../game.service';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  @Input() tiles: Tile[];
  @Output() tileSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.tiles);
  }

  public boardTileSelected(tile) {
    this.tileSelected.emit(tile);
  }
}
