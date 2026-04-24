const { Builder, By, until } = require('selenium-webdriver');

async function testGoogle() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.google.com');
    
    let searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium WebDriver');
    await searchBox.submit();

    await driver.wait(until.titleContains('Selenium'), 5000);
  } finally {
    await driver.quit();
  }
};

test('Google', async () => {await testGoogle()});