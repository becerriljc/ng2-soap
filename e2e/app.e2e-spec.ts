import { TestSoap2Page } from './app.po';

describe('test-soap2 App', () => {
  let page: TestSoap2Page;

  beforeEach(() => {
    page = new TestSoap2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
