const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const page = require('../page');

describe ('Entry Ad', async () => {

    it ('6A: Should open a modal window on load', async () => {
        let driver = await page.startDriver(page.eaUrl);
        await driver.wait(until.elementLocated(By.css(page.eaModal)), 5000);
        try{
            await driver.findElement(By.css(page.eaModal));
            var modalPresent = true;
        }
        catch(err){
            var modalPresent = false;
        }
        assert(modalPresent);
        await driver.quit();
    });

    it ('6B: Should close the modal window', async () => {
        let driver = await page.startDriver(page.eaUrl);
        await driver.wait(until.elementLocated(By.css(page.eaModal)), 5000);
        let modal = await driver.findElement(By.css(page.eaModal));
        let modalClose = await driver.findElement(By.css(page.eaModalClose));
        const actions = await driver.actions({ async: true });
        await actions
            .pause(1000)
            .move({ origin: modalClose })
            .pause(500)
            .click()
            .pause(200)
            .perform()
        let modalDisplayed = await modal.isDisplayed();
        assert(!modalDisplayed);
        await driver.quit();
    });

    it ('6C: Should not open the modal window on refresh if closed previously', async () => {
        let driver = await page.startDriver(page.eaUrl);
        await driver.wait(until.elementLocated(By.css(page.eaModal)), 5000);
        let modalClose = await driver.findElement(By.css(page.eaModalClose));
        const actions = await driver.actions({ async: true });
        await actions
            .pause(1000)
            .move({ origin: modalClose })
            .pause(500)
            .click()
            .perform()
        await driver.navigate().refresh();
        let modal = await driver.findElement(By.css(page.eaModal));
        let modalDisplayed = await modal.isDisplayed();
        assert(!modalDisplayed);
        await driver.quit();
    });
});