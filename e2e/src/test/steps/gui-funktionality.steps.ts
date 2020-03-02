import {Given, Status, TableDefinition, Then, When} from 'cucumber';

const {Builder, By, Capabilities, Key} = require('selenium-webdriver');
const {expect} = require('chai');

require("chromedriver");

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', {"w3c": false});
const driver = new Builder().withCapabilities(capabilities).build();

var tableElements;


Given('are the following values:', async (table: TableDefinition) => {
  await table.rows().forEach(element => {
    tableElements += element;
  })

});


When('these data are entered', function () {

  openURL(driver, "create-user-account");

  if (driver.findElement(By.id("createUserButton")).isDisplayed()) {
    try {
      driver.findElement(By.css('ion-input[name="name"], input')).sendKeys("TEST");
      driver.findElement(By.css('ion-input[name="email"], input')).sendKeys(tableElements[2][2].toString());
      driver.findElement(By.css('ion-input[name="pin"], input')).sendKeys(tableElements[3][3].toString());
      return Status.PASSED;
    } catch {
      return Status.FAILED;
    }
  }
});


When('The button Create was clicked', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('a new user should exist.', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
  closeWebsite(driver);
});

Given('a logged-in user', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});


When('a new profile called {string} is created', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});


Then('a new profile should be available', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('is the URL {string}.', {timeout: 2 * 5000}, async function (string) {
  // Write code here that turns the phrase above into concrete actions
  await driver.get(string);
});

When('the URL is entered in the browser,', async function () {
  return Status.PASSED;
});

Then('the TaleTime startpage should appear.', async function () {
  // Write code here that turns the phrase above into concrete actions
  if (await driver.findElement(By.id("startPageHeading")).isDisplayed()) {
    return Status.PASSED;
    driver.close();
  }
  return Status.FAILED;
});


Given('the start page {string} is opened', function (string) {
  driver.get(string);
});

When('the user clicks on Registration-Button', function () {
  var button = driver.findElement(By.id("registrationButton"));
  button.click();
  return Status.PASSED;
});

Then('the Registration-Form should open', function () {
  if (driver.findElement(By.id("registrationPageHeading")).isDisplayed()) {
    return Status.PASSED;
    driver.quit();
  }
  return Status.FAILED;
});


Given('User is logged in and on the Settings-Page', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('User changes Font-Size to 14px', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Font size is 14px', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});


Given('a existing profile', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('a existing User in Database', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('User types in his credentials', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('he should logged in', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('User adds new Storie Titles', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the new Stories should be available in the {string} section', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('User changes the Language from {string} to {string}', function (string, string2) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the Application should be in English', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('user types in his pin under {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('clicks on Logout in the next page', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('user typed in hin pin under {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('clicks on delete account', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('he should not able to login again', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});


async function openURL(driver, url) {
  await driver.get("http://localhost:8100/" + url);
}

function closeWebsite(driver) {
  driver.close();
}
