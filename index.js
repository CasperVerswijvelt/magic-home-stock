const {Control, Discovery} = require('magic-home');
const yf = require('yahoo-finance');

const DEVICE_SCAN_INTERVAL = 60000;
const PRICE_CHECK_INTERVAL = 30000;
const STOCK_SYMBOL = 'GME';

let devices = [];
let lastPercentage = -1

const scanDevices = async () => {
    devices = await Discovery.scan()
}

const checkStockPrice = async () => {

    const priceData = (await promiseQuote(STOCK_SYMBOL)).price
    const oldPercentage = lastPercentage;

    lastPercentage = priceData.regularMarketChangePercent;

    let isUp = false;
    let isDown = false;

    if (oldPercentage !== -1) {

        const diff = lastPercentage - oldPercentage;

        isUp = diff > 0;
        isDown = diff < 0;

    } else {

        isUp = lastPercentage > 0;
        isDown = lastPercentage < 0;
    }

    const redColor = '\x1b[31m';
    const greenColor = '\x1b[32m';

    console.log(`${isUp ? greenColor : isDown ? redColor : ''}${STOCK_SYMBOL} | ${(lastPercentage * 100).toFixed(2)}% | ${isUp ? '↑' : isDown ? '↓' : '→'}`)

    // Set all lights in network to stonk color
    for (let device of devices) {

        await new Control(device.address, {
            wait_for_reply: false
        }).setColorWithBrightness(isDown ? 255 : 0, isUp ? 255 : 0, 0, 100);
    }
}

const promiseQuote = (symbol) => {
    return new Promise((resolve, reject) => [
        yf.quote({
            symbol: symbol,
            modules: ['price']
        }, (err, quotes) => {
            if (err) reject(err)
            resolve(quotes)
        })
    ]);
}

const init = async () => {

    // Scan for devices every minute
    await scanDevices();
    setInterval(scanDevices, DEVICE_SCAN_INTERVAL);

    // Check stock price every 5 seconds
    await checkStockPrice();
    setInterval(checkStockPrice, PRICE_CHECK_INTERVAL);
}

init()