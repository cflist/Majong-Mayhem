import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { GameService } from '../game.service';
import { GamesComponent } from './games.component';
import { Game } from '../game';
import { Player} from '../player';
import { GameTemplate } from  '../game-template';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  var today = new Date();
  var user: Player = { name: "a", _id: "1", numberOfMatches: 1};  
  var games: Game[] = [];
  

   let game: Game = {
        _id: "id",
        id: "id",
        gameTemplate: new GameTemplate(),
        createdOn: today,
        startedOn: today,
        endedOn: today,
        createdBy: user,
        minPlayers: 1,
        maxPlayers: 3,
        state: "playing",
        players: [],
    };
    games.push(game);
  let MockService = {
      that: this,
      getGames() { return new Promise<Game[]>(() => {}).then(() => games);},
      getTemplates() { return new Promise<Game[]>(() => {}).then(() => games);},
      getBaseUrl() { return "";},
      start(id: string) {}
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesComponent ],
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
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
