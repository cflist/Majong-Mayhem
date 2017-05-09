import { MajongMayhemPage } from './app.po';

describe('majong-mayhem App', () => {
  let page: MajongMayhemPage;

  beforeEach(() => {
    page = new MajongMayhemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
