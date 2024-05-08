const { Builder, Browser, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

/*
The webpage used for testing is https://the-internet.herokuapp.com, a website designed
specifically for testing purposes. The describe blocks are broken up to cover tests for
each individual page.
*/

describe('Add/Remove Elements', async () => {

    it('1A: Should click the Add Element button', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
        await driver.findElement(By.css('[onclick="addElement()"]')).click();
        await driver.wait(until.elementLocated(By.css('.added-manually')), 2000);
        let deleteButton = await driver.findElement(By.css('.added-manually'));
        assert(deleteButton);
        await driver.quit();
    });

    it('1B: Should click the Delete button and element is deleted', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
        await driver.findElement(By.css('[onclick="addElement()"]')).click();
        await driver.wait(until.elementLocated(By.css('.added-manually')), 2000);
        await driver.findElement(By.css('.added-manually')).click();
        //Here I am using a try, catch block to determine if the element isn't found.
        //I'm sure there is a better method for validating the element DOESN'T exist but this works fine for now.
        try {
            await driver.findElement(By.css('.added-manually'));
            var buttonDeleted = false;
        }
        catch(err){
            var buttonDeleted = true;
        }
        assert(buttonDeleted);
        await driver.quit();
    });

});

describe('Basic Auth', async () => {

    it('2A: Should accept correct username and pass', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://admin:admin@the-internet.herokuapp.com/basic_auth');
        assert(await driver.findElement(By.css('.example')));
        await driver.quit();
    });

    it('2B: Should not accept incorrect username and pass', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://abc:abc@the-internet.herokuapp.com/basic_auth');
        try {
            await driver.findElement(By.css('.example'));
            var authDenied = false;
        }
        catch(err){
            var authDenied = true;
        }
        assert(authDenied);
        await driver.quit();
    });

});

describe('Checkboxes', async () => {

    it ('3A: Should check checkbox 1', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://the-internet.herokuapp.com/checkboxes');
        await driver.findElement(By.css('#checkboxes > input:nth-child(1)')).click();
        let checked = await driver.findElement(By.css('#checkboxes > input:nth-child(1)')).getAttribute('checked');
        assert(checked);
        await driver.quit();
    });

    it ('3B: Should uncheck checkbox 2', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://the-internet.herokuapp.com/checkboxes');
        await driver.findElement(By.css('#checkboxes > input:nth-child(3)')).click();
        let checked = await driver.findElement(By.css('#checkboxes > input:nth-child(3)')).getAttribute('checked');
        assert(!checked);
        await driver.quit();
    });

});

describe('Context Menu', async () => {
    async function rightClickContextBox(driver) {
        await driver.get('https://the-internet.herokuapp.com/context_menu');
        let contextBox = await driver.findElement(By.css('#hot-spot'));
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
        assert(alertExists);
        await driver.quit();
    });

    it ('4B: Should trigger an alert with correct text', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await rightClickContextBox(driver);
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        assert(alertText == 'You selected a context menu');
        await driver.quit();
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
        assert(!alertExists)
        await driver.quit();
    });
});