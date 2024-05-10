const { By } = require('selenium-webdriver');
const assert = require('assert');
const page = require('../page');

describe ('Basic Auth', async () => {

    it('2A: Should accept correct username and pass', async () => {
        let driver = await page.startDriver(page.baPositiveUrl);
        try{
            await driver.findElement(By.css(page.baAuthText))
            var authorized = true;
        }
        catch(err){
            var authorized = false;
        }
        await driver.quit();
        assert(authorized);
    });

    it('2B: Should not accept incorrect username and pass', async () => {
        let driver = await page.startDriver(page.baNegativeUrl);
        try {
            await driver.findElement(By.css(page.baAuthText));
            var authDenied = false;
        }
        catch(err){
            var authDenied = true;
        }
        await driver.quit();
        assert(authDenied);
    });

});