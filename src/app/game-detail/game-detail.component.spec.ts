import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { GameService } from '../game.service';
import { GameDetailComponent } from './game-detail.component';
import { Game } from '../game';
import { Player} from '../player';
import { GameTemplate } from  '../game-template';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
  var today = new Date();
  var user: Player = { name: "a", _id: "1", numberOfMatches: 1};
  var players: Player[] = [];
  players.push(user);
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
      getGame() { return games;},
      getBaseUrl() { return "";},
      start(id: string) {}
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [{ provide: GameService, useValue: MockService }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start', () => {
    component.start();
    expect(component).toBeTruthy();
  });
  
});
