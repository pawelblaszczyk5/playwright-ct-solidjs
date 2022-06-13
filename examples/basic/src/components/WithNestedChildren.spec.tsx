import { test, expect } from "playwright-ct-solidjs";
import { WithNestedChildren } from "./WithNestedChildren";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
  const component = await mount(
    <WithNestedChildren>
      <WithNestedChildren>
        <WithNestedChildren>
          <WithNestedChildren>
            <h1>Hello Test!</h1>
          </WithNestedChildren>
        </WithNestedChildren>
      </WithNestedChildren>
    </WithNestedChildren>
  );

  await expect(component.locator("role=heading[level=1]")).toContainText(
    "Hello Test!"
  );
});
