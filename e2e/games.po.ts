import { browser, element, by } from 'protractor';

export class MajongMayhemGames {
  navigateTo() {
    return browser.get('/games');
  }

  getParagraphText() {
    return element(by.css('h2')).getText();
  }
}
