const { Builder, Browser } = require('selenium-webdriver');
require('chromedriver');
const Chrome = require('selenium-webdriver/chrome');
const options = new Chrome.Options();

module.exports = {
    //urls
    arUrl : 'https://the-internet.herokuapp.com/add_remove_elements/',
    baPositiveUrl: 'https://admin:admin@the-internet.herokuapp.com/basic_auth',
    baNegativeUrl: 'https://abc:abc@the-internet.herokuapp.com/basic_auth',
    cbUrl: 'https://the-internet.herokuapp.com/checkboxes',
    cmUrl: 'https://the-internet.herokuapp.com/context_menu',
    ddUrl: 'https://the-internet.herokuapp.com/drag_and_drop',
    eaUrl: 'https://the-internet.herokuapp.com/entry_ad',
    lpUrl: 'https://the-internet.herokuapp.com/login',
    lpSecureUrl: 'https://the-internet.herokuapp.com/secure',

    //locators by page
    //add/remove locators
    arAddButton: '[onclick="addElement()"]',
    arDeleteButton: '.added-manually',

    //basic auth locators
    baAuthText: '.example',

    //checkboxes locators
    cbCheckboxOne: '#checkboxes > input:nth-child(1)',
    cbCheckboxTwo: '#checkboxes > input:nth-child(3)',

    //context menu locators
    cmContextBox: '#hot-spot',

    //drag and drop locators
    ddBoxA: '#column-a',
    ddBoxB: '#column-b',
    ddBoxAText: '#column-a > header:nth-child(1)',
    ddBoxBText: '#column-b > header:nth-child(1)',

    //entry ad locators
    eaModal: '.modal',
    eaModalClose: '.modal-footer > p:nth-child(1)',

    //login page locators/etc
    lpUsername: '#username',
    lpPassword: '#password',
    lpLoginButton: '.radius',
    lpLogoutButton: '.button.secondary.radius',
    lpFlashError: '#flash',
    lpCorrectUser: 'tomsmith',
    lpCorrectPass: 'SuperSecretPassword!',

    //functions
    startDriver : async function(url) {
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(options.addArguments('--headless=new')).build();
        await driver.get(url);
        return driver;
    }

}
