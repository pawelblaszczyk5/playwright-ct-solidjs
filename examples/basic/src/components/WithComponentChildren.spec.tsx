import { test, expect } from "playwright-ct-solidjs";
import { Basic } from "./Basic";
import { WithComponentChildren } from "./WithComponentChildren";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
  const component = await mount(
    <WithComponentChildren>
      <Basic />
    </WithComponentChildren>
  );
  const button = component.locator('role=button[name="Increase count"]');
  const heading = component.locator("role=heading[level=1]");

  await expect(heading).toContainText("Count: 0");
  await button.click();
  await expect(heading).toContainText("Count: 1");
});
