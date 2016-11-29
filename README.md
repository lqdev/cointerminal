#Coin Terminal

![AppCapture.JPG](https://github.com/lqventuresllc/cointerminal/blob/master/AppCapture.JPG)

##Description
Console application that displays real-time and historical Bitcoin Price Index (BPI) data powered by the [CoinDesk](http://www.coindesk.com/price) API. Real-Time information is automatically updated
every minute. Historical graph and table use the same historical data source, which by default displays the last 31 days of USD data points.

---

##Requirements
*Has only been tested on Windows CMD Shell and MacOS Sierra. May not work on Ubuntu 16.04

[Node](https://nodejs.org/en/)

---

##Install
`npm install`
`cd dist`
---

##Run
Works best when terminal is clear and in full screen.

`node index`

##Quit
Type `CTRL/CMD + C`

---

##Commands
To Display the help prompt, type:

`node index index -h`

Default currency for historical data is USD. In order to set the currency, type:

`node index -c <CODE>`

OR

`node index --currency <CODE>`

The argument to replace `<CODE>` is a three letter currency code. See below for a list of popular codes.

---

##Currency codes

*AUD: Australian Dollar  
*CNY: Chinese Yuan  
*EUR: Euro  
*GBP: British Pound Sterling  
*JPY: Japanese Yen  
*USD: United States Dollar  

##Known Issues
Sometimes the formatting may be off when the application is initialized. In the event this happens, do the following:

1. Exit the application
2. Clear console (Windows:CLS or Bash: CTRL + L)
2. Restart application


