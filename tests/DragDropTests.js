const { By } = require('selenium-webdriver');
const assert = require('assert');
const page = require('../page');

describe ('Drag and Drop', async () => {

    it ('5A: Should drag the A block onto the B block', async () => {
        let driver = await page.startDriver(page.ddUrl);
        let boxA = driver.findElement(By.css(page.ddBoxA));
        let boxB = driver.findElement(By.css(page.ddBoxB));
        const actions = await driver.actions({ async: true });
        await actions
            .move({ origin: boxA })
            .pause(500)
            .press()
            .pause(500)
            .move({ origin: boxB })
            .click()
            .perform();
        let boxAText = await driver.findElement(By.css(page.ddBoxAText)).getText();
        await driver.quit();
        assert(boxAText == 'B');
    });

    it ('5B: Should drag the B block onto the A block', async () => {
        let driver = await page.startDriver(page.ddUrl);
        let boxA = driver.findElement(By.css(page.ddBoxA));
        let boxB = driver.findElement(By.css(page.ddBoxB));
        const actions = await driver.actions({ async: true });
        await actions
            .move({ origin: boxB })
            .pause(500)
            .press()
            .pause(500)
            .move({ origin: boxA })
            .click()
            .perform();
        let boxBText = await driver.findElement(By.css(page.ddBoxBText)).getText();
        await driver.quit();
        assert(boxBText == 'A');
    });

    it ('5C: Should drag repeatedly', async () => {
        let driver = await page.startDriver(page.ddUrl);
        let boxA = driver.findElement(By.css(page.ddBoxA));
        let boxB = driver.findElement(By.css(page.ddBoxB));
        const actions = await driver.actions({ async: true });
        await actions
            .move({ origin: boxA })
            .pause(500)
            .press()
            .pause(500)
            .move({ origin: boxB })
            .click()
            .perform();
        let boxAText = await driver.findElement(By.css(page.ddBoxAText)).getText();
        await actions.clear();
        await actions
            .move({ origin: boxA })
            .pause(500)
            .press()
            .pause(500)
            .move({ origin: boxB })
            .click()
            .perform();
        let boxBText = await driver.findElement(By.css(page.ddBoxBText)).getText();
        await driver.quit();
        assert(boxAText && boxBText == 'B');
    });
});