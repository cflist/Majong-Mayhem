import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameTemplate } from '../game-template';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  templates: GameTemplate[] = [];
  selectedTemplate: GameTemplate;
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
    this.gameService.getTemplates().then(templates => {
      this.templates = templates; console.log(templates);
    });    
  }

  getGames(): void {
    this.gameService.getGames().then(games => this.games = games);
  }

  add(templateName: string, minPlayers: number, maxPlayers: number): void {
      console.log(templateName);
      console.log(minPlayers);
      console.log(maxPlayers);
      this.gameService.create(templateName, minPlayers, maxPlayers).then(() => this.getGames()); 
  }

  start(gameId: string): void {
    this.gameService.start(gameId);
  }

  delete(gameId: string): void {
    this.gameService.delete(gameId);
  }

}
