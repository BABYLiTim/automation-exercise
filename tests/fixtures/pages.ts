import { test as base, expect } from '@playwright/test'
import { PageManager } from '../../page-objects/pageManager'

type Pages = { pages: PageManager }

export const test = base.extend<Pages>({
  pages: async ({ page }, use) => {
    await page.goto('/')
    const pages = new PageManager(page)
    await use(pages)
  },
})

export { expect }