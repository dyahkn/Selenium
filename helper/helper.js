const { By, Key, Builder } = require("selenium-webdriver");
const assert = require("assert");
chrome = require("chromedriver");

module.exports = {
  openPage: async (url) => {
    const driver = await new Builder().forBrowser("chrome").build();
    driver.get(url);
    return driver;
  },

  clickElement: async (driver, selector) => {
    const elementToClick = driver.findElement(By.css(selector));
    assert.ok(elementToClick, "Element not found.");
    await elementToClick.click();
  },

  fillText: async (driver, selector, text) => {
    const elementToFill = driver.findElement(By.css(selector));
    assert.ok(elementToFill, "Element not found.");
    await elementToFill.sendKeys(text);
  },

  checkElementTextEquals: async (driver, selector, expectedText) => {
    const element = await driver.findElement(By.css(selector));
    assert.ok(element, "Element not found.");
    const actualText = await element.getText();
    assert.strictEqual(
      actualText,
      expectedText,
      `Text does not match: Expected "${expectedText}", Actual "${actualText}"`
    );
  },

  checkElementTextContains: async (driver, selector, expectedText) => {
    const element = await driver.findElement(By.css(selector));
    assert.ok(element, "Element not found.");
    const actualText = await element.getText();
    assert.ok(
      actualText.includes(expectedText),
      `Text does not contain: "${expectedText}", Actual text: "${actualText}"`
    );
  },

  deleteTextField: async (driver, selector) => {
    const element = await driver.findElement(By.css(selector));
    assert.ok(element, "Element not found.");
    await element.sendKeys(Key.chord(Key.CONTROL, "a"));
    await element.sendKeys(Key.BACK_SPACE);
  },

  checkJSAlertText: async (alert, expectedText) => {
    const actualText = await alert.getText();
    assert.ok(
      actualText.includes(expectedText),
      `Text does not contain: "${expectedText}", Actual text: "${actualText}"`
    );
  },

  inputTextJSAlert: async (alert, text) => {
    await alert.sendKeys(text);
  },

  confirmJSAlert: async (alert) => {
    await alert.accept();
  },

  dismissJSAlert: async (alert) => {
    await alert.dismiss();
  },
};
