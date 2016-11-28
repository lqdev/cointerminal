var request = require('request');

//Application Member Definitions
var apiURL = {
    list_currencies: 'https://api.coindesk.com/v1/bpi/supported-currencies.json',
    real_time: 'https://api.coindesk.com/v1/bpi/currentprice.json',
    quote: 'https://api.coindesk.com/v1/bpi/currentprice/<CODE>.json',
    historical: 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=<currency>'   
}

//Optional Request Parameters for Historical Data
/*
var requestParams = {
    index: "USD",//Defaults to USD
    currency: "",//Currency to default data in ISO4217
    start: "",//YYYY-MM-DD Date Format
    end: "",//YYYY-MM-DD Date Format
    for: "yesterday" //Overrides start/end parameter
}
*/
//###########################
//Endpoint Methods
//###########################

/**
 * HTTP GET Request that returns a list of all supported currencies by API
 * 
 * @Param res - function that accepts one argument (Parsed JSON Response of HTTP GET Request)
 */

var getCurrencies = function(res){
    request.get(apiURL.list_currencies,function(error,response,body){
        if(!error){
            var currencies = JSON.parse(body);
            res(currencies);
        }
    });
}

/**
 * HTTP GET Request that retuns the real-time Bitcoin Price Index (BPI) for USD,GBP,and EUR (1 minute delay)
 * 
 * @Param res - function that accepts one argument (Parsed JSON Response of HTTP GET Request)
 */

var getRealTime = function(res){
    request.get(apiURL.real_time,function(error,response,body){
        if(!error){
            var bpi = JSON.parse(body);
            res(bpi);
        }
    });
}

/**
 * HTTP GET Request that returns the real-time Bitcoin Price Index (BPI) for the specified currency code (1 minute delay)
 * 
 * @Param symbol - 3 letter string that specifies three letter currency code to be used.
 * @Param res - function that accepts one argument (Parsed JSON Response of HTTP GET request)
 */

var getQuote = function(symbol,res){
    request.get(apiURL.quote.replace('<CODE>',symbol),function(error,response,body){
        if(!error){
            var bpi = JSON.parse(body);
            res(bpi);
        }
    });
}


/**
 * HTTP GET Request that returns the closing Bitcoin Price Index (BPI) for the last 31 days in USD.
 * 
 * @Param symbol - 3 letter string that specifies three letter currency code to be used.
 * @Param res - function that accepts one argument (Parsed JSON Response of HTTP GET request)
 * 
 * Query Parameters:
 * index: Index to return the data for.
 * currency: The currency to return the data in. 
 * start: YYYY-MM-DD format for date range to start historical data analysis
 * end: YYYY-MM-DD format for date range to end historical data analysis
 * for: specifying yesterday will override start and end parameteres. Will return data for previous day
 */
var getHistorical = function(symbol,res){
    request.get(apiURL.historical.replace('<currency>',symbol),function(error,response,body){
        var historicalData = JSON.parse(body)
        res(historicalData);
    });
}

module.exports = {
    getCurrencies: getCurrencies,
    getRealTime: getRealTime,
    getQuote: getQuote,
    getHistorical: getHistorical
};
