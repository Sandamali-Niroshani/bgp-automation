import { Page } from "@playwright/test";

export class PageBase{

    readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
      }

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds*1000)
    }
    
}