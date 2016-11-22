//Data Source: http://www.coindesk.com/api/

var request = require('request');

//Application Member Definitions
var apiURL = {
    list_currencies: 'https://api.coindesk.com/v1/bpi/supported-currencies.json',
    real_time: 'https://api.coindesk.com/v1/bpi/currentprice.json',
    quote: 'https://api.coindesk.com/v1/bpi/currentprice/<CODE>.json',
    historical: 'https://api.coindesk.com/v1/bpi/historical/close.json'   
}

//Optional Request Parameters for Historical Data
var requestParams = {
    index: "USD",//Defaults to USD
    currency: "",//Currency to default data in ISO4217
    start: "",//YYYY-MM-DD Date Format
    end: "",//YYYY-MM-DD Date Format
    for: "yesterday" //Overrides start/end parameter
}

//###########################
//Endpoint Wrappers
//###########################

var getCurrencies = function(res){
    request.get(apiURL.list_currencies,function(error,response,body){
        if(!error){
            currencies = JSON.parse(body);
            res(currencies);
        }
    });
}

var getRealTime = function(res){
    request.get(apiURL.real_time,function(error,response,body){
        if(!error){
            var data = JSON.parse(body);
            res(data);
        }
    });
}

var getQuote = function(symbol,res){
    request.get(apiURL.quote.replace('<CODE>',symbol),function(error,response,body){
        if(!error){
            var data = JSON.parse(body);
            res(data);
        }
    });
}

var getHistorical = function(res){
    request.get(apiURL.historical,function(error,response,body){
        var data = JSON.parse(body)
        res(data);
    });
}

module.exports = {
    /**
    *Gets a list of currencies  
    */    
    getCurrencies: getCurrencies,

    /**
     * Get Real Time Data
     */
    getRealTime: getRealTime,

    /**
     * Get Individual Currency
     */
    getQuote: getQuote,

    /**
     * Get Historical Data given some parameters. Defaults to past 31 days of data
     */
    getHistorical: getHistorical
};
