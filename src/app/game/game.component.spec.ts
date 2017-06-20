import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { GameService } from '../game.service';
import { GameComponent } from './game.component';
import { Tile } from '../tile';
import { TileMatchResponse } from "../tileMatchResponse";
import { Player } from "../player";

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  var player: Player = { name: "", numberOfMatches: 0, _id: ""};
  var tiles: Tile[] = [];
  var tile: Tile = { xPos: 1, yPos: 1, zPos: 1, 
    tile: { id: 1, suit: "", name: "", matchesWholeSuit: false, },
    _id: "",
    match: { foundBy: "", otherTileId: "", foundOn: new Date(),}, selected: false};
    var tile2: Tile = { xPos: 1, yPos: 1, zPos: 1, 
    tile: { id: 2, suit: "", name: "", matchesWholeSuit: false, },
    _id: "",
    match: { foundBy: "", otherTileId: "", foundOn: new Date(),}, selected: false};
  tiles.push(tile);
  tiles.push(tile2);
  let MockService = {
      that: this,
      getTiles() { return new Promise<Tile[]>(() => {}).then(()=> tiles);},
      postTileMatch() { return new Promise<TileMatchResponse>(() =>{}).then(() => new TileMatchResponse());}
    };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [{ provide: GameService, useValue: MockService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    component.players = [player];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a tile', () => {
    component.tileSelected(tile);
    component.tileSelected(tile2);
    //component.tileMatches();
    return true;
  });  
});
