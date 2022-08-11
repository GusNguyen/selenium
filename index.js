const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require('fs');

const webdriver_path = `${__dirname}\\chromedriver.exe`;

const input_field_tags = ["input", "select", "textarea", "button"];

(async function openChromeTest() {
    const urls = await fs.readFileSync('./output.txt');

    const url_array = urls.toString().split('\n');
    for (let url of url_array) {
        console.log(url);

        try {
            let options = new chrome.Options();
            const service = new chrome.ServiceBuilder(webdriver_path);
            let driver = await new Builder()
                .setChromeOptions(options)
                .forBrowser("chrome")
                .setChromeService(service)
                .build();

            await driver.get(url);
            await driver.sleep(3000);

            const gg_signup = await driver.findElements(By.xpath('//span[contains(text(), " Google")] | //input[contains(text(), " Google")] | //div[contains(text(), " Google")] | //a[contains(text(), " Google")] | //button//*[contains(text(), " Google")]'));
            const fb_signup = await driver.findElements(By.xpath('//span[contains(text(), " Facebook")] | //input[contains(text(), " Facebook")] | //div[contains(text(), " Facebook")] | //a[contains(text(), " Facebook")] | //button//*[contains(text(), " Facebook"'));

            if (gg_signup.length > 0 || fb_signup.length > 0) {
                console.log('Signup with GG or FB');
            } else {
                for (let input_field_tag of input_field_tags) {
                    const elements = await driver.findElements(By.tagName(input_field_tag));
    
                    for (let element of elements) {
                        const type = await element.getAttribute('type');
                        const placeholder = await element.getAttribute('placeholder');
                        const id = await element.getAttribute('id');
    
                        if (type !== 'hidden') {
                            console.log('type', type);
                            console.log('placeholder', placeholder);
                            console.log('id', id);
                        }
                    }
                }
            }
        
            await driver.sleep(3000);
            await driver.quit();
        } catch (error) {
            console.log(error);
        }

        console.log('**********\n');
    }
    // try {
    //     let options = new chrome.Options();
    //     const service = new chrome.ServiceBuilder(webdriver_path);
    //     let driver = await new Builder()
    //         .setChromeOptions(options)
    //         .forBrowser("chrome")
    //         .setChromeService(service)
    //         .build();
    //     await driver.get("https://identity.flickr.com/sign-up");
    //     const inputs = await driver.findElements(By.tagName('input'));
    //     for (let input of inputs) {
    //         const type = await input.getAttribute('type');
    //         const id = await input.getAttribute('id');

    //         if (type === 'text') {
    //             if (id.includes('name')) {
    //                 input.sendKeys('Converter');
    //             } else if (id.includes('age')) {
    //                 input.sendKeys('18');
    //             } else if (id.includes('address')) {
    //                 input.sendKeys('123 King Street');
    //             } else if (id.includes('state')) {
    //                 input.sendKeys('Kansas');
    //             } else if (id.includes('country')) {
    //                 input.sendKeys('United State');
    //             }
    //         } else if (type === 'email') {
    //             input.sendKeys('seoautomation22@gmail.com');
    //         } else if (type === 'number') {
    //             input.sendKeys('0981232180');
    //         } else if (type === 'password') {
    //             input.sendKeys('Converter123@');
    //         }
    //     }
    //     await driver.sleep(5000);
    //     await driver.quit();
    // } catch (error) {
    //     console.log(error);
    // }
})();
