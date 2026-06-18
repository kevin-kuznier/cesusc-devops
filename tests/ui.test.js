const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const app = require('../src/server');

// Teste de interface (UI) usando Selenium - requisito da N3.
// Sobe o servidor localmente, abre o navegador headless e verifica a pagina.
describe('Teste de interface - Selenium', () => {
  let server;
  let driver;
  const PORT = 3001;

  beforeAll(async () => {
    server = app.listen(PORT);
    const options = new chrome.Options().addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  }, 30000);

  afterAll(async () => {
    if (driver) await driver.quit();
    if (server) server.close();
  });

  test('Pagina inicial exibe o titulo correto', async () => {
    await driver.get(`http://localhost:${PORT}`);
    const titulo = await driver.findElement(By.id('titulo')).getText();
    expect(titulo).toContain('Aplicacao N3');
  }, 30000);
});
