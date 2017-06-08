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
  mygames: Game[] = [];
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
    this.gameService.getGames().then(games => {
      this.games = games
      this.loadMyGames();
    });
  }

  add(templateName: string, minPlayers: number, maxPlayers: number): void {
      console.log(templateName);
      console.log(minPlayers);
      console.log(maxPlayers);
      this.gameService.create(templateName, minPlayers, maxPlayers).then(() => this.getGames()); 
  }

  view(game: Game): void {
    location.href = '/detail/' + game.id;
  }

  canDelete(game: Game): boolean {
    if (game.state == "playing"){ return false;}
    if (game.createdBy._id != localStorage.getItem('username')) {return false; }
    return true;
  }

  delete(game: Game): void {
    this.gameService.delete(game.id);
  }

  loadMyGames(){
    this.games.forEach(game => {
      if (game.players.find(p => p._id == localStorage.getItem('username'))) { this.mygames.push(game);}
    })
  }

}
