import { LoginSystemNgPage } from './app.po';

describe('login-system-ng App', function() {
  let page: LoginSystemNgPage;

  beforeEach(() => {
    page = new LoginSystemNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
