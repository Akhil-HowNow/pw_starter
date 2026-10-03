import { expect, test } from '../../fixtures';
import { PRODUCTS } from '../../data/products';

test.describe('Cart Static Checks Demo', () => {
  test('C99 static check demo test @regression', async ({ page }) => {
    const quantity: any = 5;

    const myMessage = 'Checking quantity';
    console.log(myMessage);

    await page.waitForTimeout(1000);

    expect(myMessage, 'message should be correct').toBe('Checking quantity');
    expect(quantity, 'quantity should be 5').toBe(5);
  });
});
