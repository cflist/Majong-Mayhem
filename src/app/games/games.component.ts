import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Game } from '../game';
import { GameTemplate } from '../game-template';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.sass']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  mygames: Game[] = [];
  templates: GameTemplate[] = [];
  selectedTemplate: GameTemplate;
  constructor(private gameService: GameService,
              private router: Router) { }

  ngOnInit() {
    this.getGames();
    this.getMyGames();
    this.gameService.getTemplates().then(templates => {
      this.templates = templates; console.log(templates);
      this.onChange(this.templates[0].id);
    });
  }

  getMyGames(): void {
    this.gameService.getGames(localStorage.getItem('username')).then(games => this.mygames = games);
  }

  getGames(): void {
    this.gameService.getGames("").then(games => {
      this.games = games
      this.loadMyGames();
    });
  }

  onChange(templateName: string) {
    this.selectedTemplate = this.templates.find(template => template.id == templateName);
  }

  add(templateName: string, minPlayers: number, maxPlayers: number): void {
    if (!minPlayers || !maxPlayers) { return;}
    if (minPlayers > maxPlayers) {alert("Minimal amount of players can not be higher than the maximum amount of players"); return;}
      this.gameService.create(templateName, minPlayers, maxPlayers).then(() => this.getGames());
  }

  view(game: Game): void {
    this.router.navigate(['/detail', game.id]);
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
