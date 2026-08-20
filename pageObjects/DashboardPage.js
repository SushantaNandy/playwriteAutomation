class DashboardPage{
    constructor(page){
        this.page = page;
        this.products = page.locator(".card-body");
        this.cartBtn = page.locator("[routerlink*='cart']");

    }

    async searchProductAndAddToCart(productToSearch){
    await this.products.first().waitFor();

    const count = await this.products.count();

    for(let i =0;i<count; ++i){
        if(await this.products.nth(i).locator('b').textContent() === productToSearch){
            await this.products.nth(i).locator("text = Add To Cart").click();
            break;
        }

    }
    }

    async navigateToCart(){
        await this.cartBtn.click();
    }
}

module.exports = {DashboardPage};