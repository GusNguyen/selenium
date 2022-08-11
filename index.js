const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const webdriver_path = `${__dirname}\\chromedriver.exe`;

(async function openChromeTest() {
    try {
        let options = new chrome.Options();
        const service = new chrome.ServiceBuilder(webdriver_path);
        let driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser("chrome")
            .setChromeService(service)
            .build();
        await driver.get("https://identity.flickr.com/sign-up");
        const inputs = await driver.findElements(By.tagName('input'));
        for (let input of inputs) {
            const type = await input.getAttribute('type');
            const id = await input.getAttribute('id');

            if (type === 'text') {
                if (id.includes('name')) {
                    input.sendKeys('Converter');
                } else if (id.includes('age')) {
                    input.sendKeys('18');
                } else if (id.includes('address')) {
                    input.sendKeys('123 King Street');
                } else if (id.includes('state')) {
                    input.sendKeys('Kansas');
                } else if (id.includes('country')) {
                    input.sendKeys('United State');
                }
            } else if (type === 'email') {
                input.sendKeys('seoautomation22@gmail.com');
            } else if (type === 'number') {
                input.sendKeys('0981232180');
            } else if (type === 'password') {
                input.sendKeys('Converter123@');
            }
        }
        await driver.sleep(5000);
        await driver.quit();
    } catch (error) {
        console.log(error);
    }
})();
