import { GameTemplate } from "./game-template";
import { Player } from "./player";

export class Game {
    _id: string;
    id: string;
    gameTemplate: GameTemplate;
    createdOn: Date;
    startedOn: Date;
    endedOn: Date;
    createdBy: {
      _id: string;
      name: string
    };
    minPlayers: number;
    maxPlayers: number;
    players: Player
    state: string;
}
