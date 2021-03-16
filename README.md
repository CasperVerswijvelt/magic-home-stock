#  magic-home-stock

A simple NodeJS script that makes your magic home smart lights indicate the price movements in your favourite stock.
Perfect if you are too relaxed and you want to be more stressed.

Basically this changes your magic-home lights to either red or green, based on the latest 30 seconds of the stock price. If it went up, it will be green. If it went down, it will be red. If it stayed the same, it will be white.

Currently only works correctly for market open prices, since I'm lazy.

# How to use

## Using prebuilt executable file

If you use the prebuilt executable file, you will not be able to customize any settings. The default is to update the light color every 30 seconds, scan for magic home devices every 60 seconds, and the symbol GME (GameStop).

Just download the latest release and run the executable and it will start.

## Compile from source

Compiling from source will give you the ability to customize variables such as price check interval, scan interval and symbol.

## Prerequisites

You need to have [NodeJS](https://nodejs.org/) installed.

## Install and run

- Download this repository (either with `git clone` or by just clicking 'Download Zip' and extracting the contents)
- Navigate to inside of the repository directory
- Run `npm install` to install all dependencies
- Optionally change variables as desired by editing these lines in `index.js`
    ```
    const DEVICE_SCAN_INTERVAL = 60000;
    const PRICE_CHECK_INTERVAL = 30000;
    const STOCK_SYMBOL = 'GME';
    ```
- Run `npm start`

