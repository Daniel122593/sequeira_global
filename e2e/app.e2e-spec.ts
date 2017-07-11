import { SequeiraGlobalPage } from './app.po';

describe('sequeira-global App', () => {
  let page: SequeiraGlobalPage;

  beforeEach(() => {
    page = new SequeiraGlobalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
