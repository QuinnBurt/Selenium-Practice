const { By } = require('selenium-webdriver');
const assert = require('assert');
const page = require('../page');

describe ('Login Page', async () => {

    it ('7A: Should successfully login and redirect to secure area', async () => {
        let driver = await page.startDriver(page.lpUrl);
        await driver.findElement(By.css(page.lpUsername)).sendKeys(page.lpCorrectUser);
        await driver.findElement(By.css(page.lpPassword)).sendKeys(page.lpCorrectPass);
        await driver.findElement(By.css(page.lpLoginButton)).click();
        let currentUrl = await driver.getCurrentUrl();
        await driver.quit();
        assert(currentUrl == 'https://the-internet.herokuapp.com/secure');
    });

    it ('7B: Should return correct error message with wrong username', async () => {
        let driver = await page.startDriver(page.lpUrl);
        await driver.findElement(By.css(page.lpUsername)).sendKeys('wrong');
        await driver.findElement(By.css(page.lpPassword)).sendKeys(page.lpCorrectPass);
        await driver.findElement(By.css(page.lpLoginButton)).click();
        let errorText = await driver.findElement(By.css(page.lpFlashError)).getText();
        await driver.quit();
        assert(errorText.substring(0, 13) == 'Your username');
    });

    it ('7C: Should return correct error message with wrong password', async () => {
        let driver = await page.startDriver(page.lpUrl);
        await driver.findElement(By.css(page.lpUsername)).sendKeys(page.lpCorrectUser);
        await driver.findElement(By.css(page.lpPassword)).sendKeys('wrong');
        await driver.findElement(By.css(page.lpLoginButton)).click();
        let errorText = await driver.findElement(By.css(page.lpFlashError)).getText();
        await driver.quit();
        assert(errorText.substring(0, 13) == 'Your password');
    });

    it ('7D: Should return correct error message with wrong username and password', async () => {
        let driver = await page.startDriver(page.lpUrl);
        await driver.findElement(By.css(page.lpUsername)).sendKeys('wrong');
        await driver.findElement(By.css(page.lpPassword)).sendKeys('wrong');
        await driver.findElement(By.css(page.lpLoginButton)).click();
        let errorText = await driver.findElement(By.css(page.lpFlashError)).getText();
        await driver.quit();
        assert(errorText.substring(0, 13) == 'Your username');
    });

    it ('7E: Should login and then logout from secure area, redirecting to login page', async () => {
        let driver = await page.startDriver(page.lpUrl);
        await driver.findElement(By.css(page.lpUsername)).sendKeys(page.lpCorrectUser);
        await driver.findElement(By.css(page.lpPassword)).sendKeys(page.lpCorrectPass);
        await driver.findElement(By.css(page.lpLoginButton)).click();
        let secureRedirect = await driver.getCurrentUrl() == page.lpSecureUrl;
        await driver.findElement(By.css(page.lpLogoutButton)).click();
        let loginRedirect = await driver.getCurrentUrl() == page.lpUrl;
        await driver.quit();
        assert(secureRedirect && loginRedirect);
    });

});