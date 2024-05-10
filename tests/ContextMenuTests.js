const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require('assert');
const page = require('../page');

describe ('Context Menu', async () => {
    async function rightClickContextBox(driver) {
        await driver.get(page.cmUrl);
        let contextBox = await driver.findElement(By.css(page.cmContextBox));
        const actions = driver.actions({async : true});
        await actions.contextClick(contextBox).perform();
    }

    it ('4A: Should trigger an alert when right clicked', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await rightClickContextBox(driver);
        try{
            await driver.switchTo().alert();
            var alertExists = true;
        }
        catch(err){
            var alertExists = false;
        }
        await driver.quit();
        assert(alertExists);
    });

    it ('4B: Should trigger an alert with correct text', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await rightClickContextBox(driver);
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        await driver.quit();
        assert(alertText == 'You selected a context menu');
    });
    
    it ('4C: Should close the alert', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await rightClickContextBox(driver);
        let alert = await driver.switchTo().alert();
        await alert.accept();
        try{
            await driver.switchTo().alert();
            var alertExists = true;
        }
        catch(err){
            var alertExists = false;
        }
        await driver.quit();
        assert(!alertExists);
    });
});