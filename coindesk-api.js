//Data Source: http://www.coindesk.com/api/

var request = require('request');

//Application Member Definitions
var apiURL = {
    list_currencies: 'https://api.coindesk.com/v1/bpi/supported-currencies.json',
    real_time: 'https://api.coindesk.com/v1/bpi/currentprice.json',
    quote: 'https://api.coindesk.com/v1/bpi/currentprice/<CODE>.json'   
}

var currencies = [];
//###########################
//Endpoint Wrappers
//###########################
module.exports = {
    /**
    *Gets a list of currencies  
    */    
    getCurrencies: function(){
        request.get(apiURL.list_currencies,function(error,response,body){
            if(!error){
                currencies = JSON.parse(body);
                for(var item in currencies){
                    console.log(currencies[item].country + ": " + currencies[item].currency);
                }
            }
        });
    },

    /**
     * Get Real Time Data
     */
    getRealTime: function (){
        request.get(apiURL.real_time,function(error,response,body){
            if(!error){
                var res = JSON.parse(body);
                console.log(res);
            }
        });
    },

    /**
     * Get Individual Currency
     */
    getQuote: function (symbol){
        request.get(apiURL.quote.replace('<CODE>',symbol),function(error,response,body){
            if(!error){
                var res = JSON.parse(body);
                console.log(res);
            }
        });
    }
};
