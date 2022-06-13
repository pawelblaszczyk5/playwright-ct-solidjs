import { test, expect } from "playwright-ct-solidjs";
import { WithBasicHtmlChildren } from "./WithBasicHtmlChildren";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
  const component = await mount(
    <WithBasicHtmlChildren>
      <span>Test</span>
    </WithBasicHtmlChildren>
  );
  const heading = component.locator("role=heading[level=1]");

  await expect(heading).toContainText("Hello Test!");
});
