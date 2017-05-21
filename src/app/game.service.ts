import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { Game } from "./game";
import { GameTemplate } from "./game-template";

@Injectable()
export class GameService {
  private url = 'https://mahjongmayhem.herokuapp.com/';
  private headers = new Headers({'Content-Type': 'application/json', 'x-username': 'your.name@student.avans.nl', 'x-token': 'efgyarbvizhvbebfhulvuib'});

  constructor(private http: Http) { }

  getTemplates(): Promise<GameTemplate[]> {
    return this.http.get(this.url + 'gameTemplates').toPromise().then(res => res.json() as GameTemplate[]).catch(this.handleError);
  }

  getGames(): Promise<Game[]> {
    return this.http.get(this.url + 'games').toPromise().then(res => res.json() as Game[]).catch(this.handleError);
  }

  create(templateName: string, minPlayers: number, maxPlayers: number): Promise<Game> {
    return this.http.post(this.url + 'games', JSON.stringify({templateName: templateName, minPlayers: minPlayers, maxPlayers: maxPlayers}), {headers: this.headers})
    .toPromise()
    .then(res => res.json() as Game)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
