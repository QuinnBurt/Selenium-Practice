Selenium Webdriver Sample Project

Author: Quinn Burt

Description: This project is a test suite using Selenium Webdriver and Mocha. The website
used for testing is https://the-internet.herokuapp.com/, which contains numerous pages designed 
to demonstrate basic functions of a webpage such as input fields and JavaScript alerts.

Setup: Install Node.js and NPM. If chromedriver is out of date, run 'npm install chromedriver' 
and that should install the latest version.

Configuration: This project is configured to run tests on Google Chrome in headless mode.

Running the Tests: From a terminal window, navigate to this directory and run the command
npm test 'tests/*.js'.