import {Given, Status, Then, When} from 'cucumber';

const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();


Given('is the URL {string}.', async function (string) {
  // Write code here that turns the phrase above into concrete actions
  await driver.get(string);
});


When('the URL is entered in the browser,', async function () {
  // Write code here that turns the phrase above into concrete actions
});



Then('the TaleTime startpage should appear.', async function () {
  // Write code here that turns the phrase above into concrete actions
  if(await driver.findElement(By.id("startPageHeading")).isDisplayed()){
    return Status.PASSED;
  }
  return Status.FAILED;
});
