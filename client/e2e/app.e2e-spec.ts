import { ClickPage } from './app.po';

describe('click App', () => {
  let page: ClickPage;

  beforeEach(() => {
    page = new ClickPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
