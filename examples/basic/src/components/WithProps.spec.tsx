import { test, expect } from "playwright-ct-solidjs";
import { WithProps } from "./WithProps";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
  const component = await mount(<WithProps name="Test" />);
  const heading = component.locator("role=heading[level=1]");

  await expect(heading).toContainText("Hello Test!");
});
