import { MajongMayhemPage } from './app.po';
import { MajongMayhemGames } from "./games.po";

describe('majong-mayhem App', () => {
  let page: MajongMayhemPage;
  let games: MajongMayhemGames;

  beforeEach(() => {
    page = new MajongMayhemPage();
    games = new MajongMayhemGames();
  });

  it('should display message saying mahjong mayhem', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Mahjong MAYHEM');
  });

  it('should display message saying my games', () => {
    games.navigateTo();
    expect(games.getParagraphText()).toEqual('My games');
  });
});
