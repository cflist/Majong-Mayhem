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

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.gameService.getTiles(params['id']))
    .subscribe(tiles => this.tiles = tiles);
  }

}
