const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testGoogle() {
    let options = new chrome.Options();
    options.addArguments('--headless'); // ESSENCIAL para o GitHub
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get('https://www.google.com');
    } finally {
        await driver.quit();
    }
}

test('Google', async () => {
    await testGoogle();
}, 30000);