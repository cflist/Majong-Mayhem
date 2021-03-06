import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { Game } from "./game";
import { Tile } from "./tile";
import { TileMatchResponse } from "./tileMatchResponse";
import { Player } from "./player";
import { GameTemplate } from "./game-template";

@Injectable()
export class GameService {
  private url = 'https://mahjongmayhem.herokuapp.com/';
  private headers = new Headers({'Content-Type': 'application/json', 'x-username': localStorage.getItem('username'), 'x-token': localStorage.getItem('token')});

  constructor(private http: Http) { }

  getBaseUrl(): string {
    return this.url;
  }

  getTemplates(): Promise<GameTemplate[]> {
    return this.http.get(this.url + 'gameTemplates').toPromise().then(res => res.json() as GameTemplate[]).catch(this.handleError);
  }

  getGames(optionalPlayer: string): Promise<Game[]> {
    return this.http.get(this.url + 'games?player=' + optionalPlayer).toPromise().then(res => res.json() as Game[]).catch(this.handleError);
  }

  getGame(gameId: string): Promise<Game> {
    return this.http.get(this.url + "games/" + gameId).toPromise().then(res => res.json() as Game).catch(this.handleError);
  }

  create(templateName: string, minPlayers: number, maxPlayers: number): Promise<Game> {
    return this.http.post(this.url + 'games', JSON.stringify({templateName: templateName, minPlayers: minPlayers, maxPlayers: maxPlayers}), {headers: this.headers})
    .toPromise()
    .then(res => res.json() as Game)
    .catch(this.handleError);
  }

  join(gameId: string) {
    this.http.post(this.url + "games/" + gameId + "/players", JSON.stringify({gameId: gameId}), {headers: this.headers})
    .toPromise()
    .then(res => res.json() as Game)
    .catch(this.handleError);
  }

  leave(gameId: string) {
    this.http.delete(this.url + "games/" + gameId + "/players", { headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  start(gameId: string) {
    this.http.post(this.url + 'games/' + gameId + '/start', JSON.stringify({gameiId: gameId}), {headers: this.headers})
    .toPromise()
    .then()
    .catch(this.handleError);
  }

  delete(gameiId: string): Promise<void> {
        return this.http.delete(this.url + 'games/' + gameiId, { headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
  }

  getTiles(gameId: string): Promise<Tile[]> {
    return this.http.get(this.url + "games/" + gameId + "/tiles").toPromise().then(res => res.json() as Tile[]).catch(this.handleError);
  }

  getPlayers(gameId: string): Promise<Player[]> {
    return this.http.get(this.url + "games/" + gameId + "/players").toPromise().then(res => res.json() as Player[]).catch(this.handleError);
  }

  postTileMatch(gameId: string, tiles: Tile[]): Promise<TileMatchResponse> {
    var tileStatus = {
      "tile1Id": tiles[0]._id,
      "tile2Id": tiles[1]._id
    }

    return this.http.post(this.url + 'games/' + gameId + '/tiles/matches', JSON.stringify(tileStatus), {headers: this.headers}).toPromise().catch(res => res.json() as TileMatchResponse);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
