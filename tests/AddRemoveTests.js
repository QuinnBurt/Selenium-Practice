const { By, until,} = require('selenium-webdriver');
const assert = require('assert');
const page = require('../page');

describe ('Add/Remove Elements', async () => {

    it('1A: Should click the Add Element button', async () => {
        let driver = await page.startDriver(page.arUrl);
        await driver.findElement(By.css(page.arAddButton)).click();
        await driver.wait(until.elementLocated(By.css(page.arDeleteButton)), 2000);
        let deleteButton = await driver.findElement(By.css(page.arDeleteButton));
        assert(deleteButton);
        await driver.quit();
    });

    it('1B: Should click the Delete button and element is deleted', async () => {
        let driver = await page.startDriver(page.arUrl);
        await driver.findElement(By.css(page.arAddButton)).click();
        await driver.wait(until.elementLocated(By.css(page.arDeleteButton)), 2000);
        await driver.findElement(By.css(page.arDeleteButton)).click();
        //Here I am using a try, catch block to determine if the element isn't found.
        //I'm sure there is a better method for validating the element DOESN'T exist but this works fine for now.
        try {
            await driver.findElement(By.css(page.arDeleteButton));
            var buttonDeleted = false;
        }
        catch(err){
            var buttonDeleted = true;
        }
        assert(buttonDeleted);
        await driver.quit();
    });

});