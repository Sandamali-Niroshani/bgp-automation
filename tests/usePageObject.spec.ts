import { test } from '@playwright/test'
import { PageManager } from '../pages/PageManager'


test.beforeEach(async ({ page }) => {
    await page.goto('https://qa-internet.bgp.onl/')
})

test('Navigate to form page', async ({ page }) => {
    // const pm = new PageManager(page)
    // await pm.navigateTo().formLayoutsPage()
    // await pm.navigateTo().datePickerPage()
}
)