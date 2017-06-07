import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
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
  constructor(private _sanitizer: DomSanitizer,
  private gameService: GameService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.gameService.getTiles(params['id']))
    .subscribe(tiles => this.tiles = tiles);
  }

  public getTileStyle(tile) {
    var style = {
      'left': tile.xPos + "em",
      'top': tile.yPos + "em",
      'z-index': tile.zPos
    }

    console.log(tile.tile.suit);

    return style;
  }

  public getTileUnicode(tile) {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.'.charAt(tile.tile.name);
  }

}
