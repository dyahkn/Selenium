const {
  openPage,
  clickElement,
  fillText,
  checkElementTextEquals,
  checkElementTextContains,
  deleteTextField,
} = require("../helper/helper");
const url = "http://computer-database.gatling.io/computers";
let driver;

describe("Computer Database", function () {
  before(async () => {
    driver = await openPage(url);
  });

  it("F2 Successfully search existing computer by clicking button", async function () {
    const computer = "Apple";

    //  	Fill input field by existing data
    await fillText(driver, "#searchbox", computer);
    // Click button Filter by name
    await clickElement(driver, "#searchsubmit");
    // Validate at least the first entity in list contains the inputted text
    await checkElementTextContains(
      driver,
      ".computers.zebra-striped tr:nth-child(1) td:nth-child(1) a",
      computer
    );
    // Validate Title Page
    await checkElementTextContains(driver, "#main h1", "computers found");
  });

  it("V7 Ensure field 'Computer name' is mandatory", async function () {
    // Click on the first computer entity
    await clickElement(
      driver,
      ".computers.zebra-striped tr:nth-child(1) td:nth-child(1) a"
    );

    // 		Delete value of 'Computer Name' then save
    await deleteTextField(driver, "#name");
    await clickElement(driver, ".btn.primary");

    // Validate error message
    await checkElementTextEquals(
      driver,
      ".clearfix:nth-child(1) .help-inline",
      "Failed to refine type : Predicate isEmpty() did not fail."
    );
  });

  it("A1 Successfully Add new computer with all fields filled", async function () {
    const newComputer = "New Computer";

    //click button add
    await clickElement(driver, "#add");

    //validate Page add computer loaded based on heading
    await checkElementTextEquals(driver, "#main h1", "Add a computer");

    //Fill all fields then save by click button create this computer
    await fillText(driver, "#name", newComputer);
    await fillText(driver, "#introduced", "1999-01-01");
    await fillText(driver, "#discontinued", "2000-01-01");
    await clickElement(driver, "#company");
    await clickElement(driver, "#company option[value='1']");
    await clickElement(driver, ".btn.primary");

    //validate Success Message
    await checkElementTextContains(
      driver,
      ".alert-message.warning",
      `Computer ${newComputer} has been created`
    );

    //validate new computer entity created by searching the name
    await fillText(driver, "#searchbox", newComputer);
    await clickElement(driver, "#searchsubmit");
    await checkElementTextContains(
      driver,
      ".computers.zebra-striped tr:nth-child(1) td:nth-child(1) a",
      newComputer
    );
  });

  afterEach(async () => {
    // Go to homepage after each test case
    await clickElement(driver, ".fill .fill");
  });

  after(async () => {
    await driver.quit();
  });
});
