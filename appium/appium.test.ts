//@ts-ignore
import wd from "wd";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const PORT = 4723;
const config = {
  platformName: "iOS",
  platformVersion: "14.5", // must correct the stimuator
  deviceName: "iPhone 12 Pro Max", // must correct the stimuator
};
const driver = wd.promiseChainRemote("localhost", PORT);

beforeAll(async () => {
  await driver.init(config);
  await driver.sleep(2000); // wait for app to load
});

test("appium renders", async () => {
  expect(await driver.hasElementByAccessibilityId("search")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("notthere")).toBe(false);
});
