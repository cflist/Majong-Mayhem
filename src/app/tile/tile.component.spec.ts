import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { GameService } from '../game.service';
import { TileComponent } from './tile.component';
import { Tile} from '../tile';

describe('TileComponent', () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;
  var tile: Tile = {
      xPos: 1,
    yPos: 1,
    zPos: 1,
    tile: {
        id: 1,
        suit: "",
        name: "",
        matchesWholeSuit: false,
    },
    _id: "",
    match: {
        foundBy: "",
        otherTileId: "",
        foundOn: new Date(),
    },
    // Custom properties
    selected: false};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileComponent],
      imports: [
        RouterTestingModule,
        HttpModule,
      ],
      providers: [GameService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;
    component.tile = tile;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a style', () =>{
      expect(component.getTileStyle()).toBeDefined();
  });

  it('should return the default unicode', () =>{
      expect(component.getTileUnicode()).toBe('A');
  });

  it('should return the right unicode', () =>{
      tile.tile.suit = "Bamboo";
      expect(component.getTileUnicode()).toBe('zxcvbnm,.'.charAt(+tile.tile.name -1));
      tile.tile.suit = "Character";
      expect(component.getTileUnicode()).toBe('qwertyuio'.charAt(+tile.tile.name -1));
      tile.tile.suit = "Circle";
      expect(component.getTileUnicode()).toBe('asdfghjkl'.charAt(+tile.tile.name -1));
      tile.tile.suit = "Character";
      expect(component.getTileUnicode()).toBe('qwertyuio'.charAt(+tile.tile.name -1));
      tile.tile.suit = "Dragon";
      tile.tile.name = "Red";
      expect(component.getTileUnicode()).toBe(7);
      tile.tile.suit = "Dragon";
      tile.tile.name = "White";
      expect(component.getTileUnicode()).toBe(9);
      tile.tile.suit = "Dragon";
      tile.tile.name = "Green";
      expect(component.getTileUnicode()).toBe(6);
      tile.tile.suit = "Flower";
      tile.tile.name = "Plum";
      expect(component.getTileUnicode()).toBe(1);
      tile.tile.suit = "Flower";
      tile.tile.name = "Orchid";
      expect(component.getTileUnicode()).toBe(2);
      tile.tile.suit = "Flower";
      tile.tile.name = "Chrysantememum";
      expect(component.getTileUnicode()).toBe(3);
      tile.tile.suit = "Flower";
      tile.tile.name = "Bamboo";
      expect(component.getTileUnicode()).toBe(4);
      tile.tile.suit = "Season";
      tile.tile.name = "Summer";
      expect(component.getTileUnicode()).toBe(1);
      tile.tile.suit = "Season";
      tile.tile.name = "Fall";
      expect(component.getTileUnicode()).toBe(4);
      tile.tile.suit = "Season";
      tile.tile.name = "Winter";
      expect(component.getTileUnicode()).toBe(3);
      tile.tile.suit = "Season";
      tile.tile.name = "Spring";
      expect(component.getTileUnicode()).toBe(2);
      tile.tile.suit = "Season";
      tile.tile.name = "Autumn";
      expect(component.getTileUnicode()).toBe(4);
      tile.tile.suit = "Wind";
      tile.tile.name = "North";
      expect(component.getTileUnicode()).toBe(4);
      tile.tile.suit = "Wind";
      tile.tile.name = "East";
      expect(component.getTileUnicode()).toBe(1);
      tile.tile.suit = "Wind";
      tile.tile.name = "South";
      expect(component.getTileUnicode()).toBe(2);
      tile.tile.suit = "Wind";
      tile.tile.name = "West";
      expect(component.getTileUnicode()).toBe(3);
  });
});
