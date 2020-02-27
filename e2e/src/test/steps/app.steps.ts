import { Before, Given, Then, When, AfterAll, After, Status } from 'cucumber';
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();


Given('is the URL {string}.', async function (string) {
  // Write code here that turns the phrase above into concrete actions
  await driver.get(string);
  return Status.PENDING;
});


When('the URL is entered in the browser,', function () {
  // Write code here that turns the phrase above into concrete actions
  return Status.PENDING;
});



Then('the TaleTime startpage should appear.', function () {
  // Write code here that turns the phrase above into concrete actions
  return Status.PENDING;
});
