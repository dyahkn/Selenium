const {
  openPage,
  clickElement,
  checkElementTextEquals,
  checkJSAlertText,
  confirmJSAlert,
  inputTextJSAlert,
} = require("../helper/helper");
const url = "https://the-internet.herokuapp.com/javascript_alerts";
let driver;

describe("Javascript", function () {
  before(async () => {
    driver = await openPage(url);
  });

  it("A3 Successfully click button 'Click for JS Confirm and A4 Ensure JS Confirm can be closed using OK button", async function () {
    await clickElement(driver, 'button[onclick="jsConfirm()"]');
    const JSConfirm = await driver.switchTo().alert();
    await checkJSAlertText(JSConfirm, "I am a JS Confirm");
    // Ensure JS Confirm can be closed using OK button
    await confirmJSAlert(JSConfirm);
    //Validate result section message equal 'You clicked: Ok'
    await checkElementTextEquals(driver, "#result", "You clicked: Ok");
  });

  it("A6 Successfully click button 'Click for JS Prompt and A8	Successfully accept text input from JS Prompt", async function () {
    const text = "JS Prompt Text";
    await clickElement(driver, 'button[onclick="jsPrompt()"]');
    const JSPrompt = await driver.switchTo().alert();
    await checkJSAlertText(JSPrompt, "I am a JS prompt");

    // Input text in JS Prompt
    await inputTextJSAlert(JSPrompt, text);
    await confirmJSAlert(JSPrompt);

    //Validate result section message equal 'You entered: [inputted text]'
    await checkElementTextEquals(driver, "#result", `You entered: ${text}`);
  });

  after(async () => {
    await driver.quit();
  });
});
