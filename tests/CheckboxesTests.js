const { By } = require('selenium-webdriver');
const assert = require('assert');
const page = require('../page');

describe ('Checkboxes', async () => {

    it ('3A: Should check checkbox 1', async () => {
        let driver = await page.startDriver(page.cbUrl);
        await driver.findElement(By.css(page.cbCheckboxOne)).click();
        let checked = await driver.findElement(By.css(page.cbCheckboxOne)).getAttribute('checked');
        assert(checked);
        await driver.quit();
    });

    it ('3B: Should uncheck checkbox 2', async () => {
        let driver = await page.startDriver(page.cbUrl);
        await driver.findElement(By.css(page.cbCheckboxTwo)).click();
        let checked = await driver.findElement(By.css(page.cbCheckboxTwo)).getAttribute('checked');
        assert(!checked);
        await driver.quit();
    });

});