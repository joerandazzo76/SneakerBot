const { promises } = require('nodemailer/lib/xoauth2');
const puppeteer = require('puppeteer-extra')
const checkOutButton = "a[class='button expanded mb-2 js-cart-proceed-btn']"
const billingCardNumber = "#billingCardNumber"
const billingContinueButton = "#billingContinueButton"
const StelthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StelthPlugin())

const finishline = async function(){
    const browser = await puppeteer.launch({headless: false, slowMo: 50});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36')
    await page.goto('https://www.finishline.com/store/_/N-/store/product/mens-nike-air-force-1-low-casual-shoes/prod795980?styleId=CW2288&colorId=111')
    //await page.waitForNavigation({waitUntil: 'networkidle2'})
    page.on('dialog', async dialog => {
        await dialog.dismiss();
    });
    await page.waitFor(2000);
    //await page.click('button[data-click="close"]', btn => btn.click());

    await page.click("button[data-size='8.0']", btn => btn.click());
    await page.waitFor(2000);
    await page.click("button[data-size='8.0']", btn => btn.click());
        
    await page.waitFor(2000);
    await page.click('#buttonAddToCart', btn => btn.click());
    await page.waitFor(7000);


    await page.waitForSelector(checkOutButton);
    const checkout = await page.$(checkOutButton);
    await checkout.click();


    await page.waitFor(3000);

    await page.type("input[id='firstName']", "Joe");
    await page.type('#shippingLastName', "Randazzo");
    await page.type('#shippingAddress1', "8805 New River Falls Road");
    await page.type('#shippingCity', "Boca Raton");
    await page.type('#shippingZip', "33496");
    await page.type('#shippingPhone', "9172384016");
    await page.type('#email', "joerandazzo76@gmail.com");
    await page.select('#shippingState', "FL");

    await page.waitFor(3000);
    await page.click('#shippingContinueButton', btn => btn.click());

    await page.waitForSelector(billingContinueButton);
    const billContinue = await page.$(billingContinueButton);

    await page.type('#billingCardNumber', "4242424242424242");
    await page.waitFor(300);

    await page.select('#billingExpirationMonth', '06');
    await page.waitFor(300);
    await page.select('#billingExpirationYear', '2033');
    await page.type('#billingSecurityCode', "173");
       
    await billContinue.click();

    await page.waitFor(300);
    
}
finishline();

