var clear = require('clear');
var term = require('terminal-kit').terminal;
var request = require('request');
var CDAPI = require('./coindesk-api');
var chart = require('./charting');
var config = require('./config');
var cmd  = require('commander');

//Verbose Prompt
/*
var help = [
    {
        command: '-g',
        description: 'Chart Historical Data' 
    },
    {
        command: '-h',
        description: 'Help Command' 
    },
    {
        command: '-c',
        description: 'Get Historical Data' 
    },
    {
        command: '-r',
        description: 'Get Real Time Data'
    },
    {
        command: '-p',
        description: 'Get quotes for a symbol'
    },
    {
        command: '-q',
        description: 'Quit'
    }
]


function printHelpPrompt(){
    for(var i in help){
        console.log(help[i].command + ": " + help[i].description);
    }
}
*/

function printHistorical(){ 
    CDAPI.getHistorical(function(response){
        var data = response;
        var i = 5;
        for(var date in data.bpi){
            if(i < 37){
                term.moveTo(config.TERM_WIDTH/2+5,i);
                console.log(date + ':' + data.bpi[date]);
            }
            i++;
        }    
    });//TODO: Add option for currency
    term.moveTo(0,5);
}
/*
function printQuote(){
    CDAPI.getQuote('USD',function(data){
        console.log(data);
    });
}

function printRealTime(){
    CDAPI.getRealTime(function(response){
        var data = response;
        console.log(data);
    });
}

*/
/**
 * Chart last 31 days of historical data
 */
function chartHistorical(){
    term.moveTo(1,5);
    CDAPI.getHistorical(function(data){
        var prices = data;
        var historicalPrices = []
        for(var date in prices.bpi){
            historicalPrices.push(prices.bpi[date]);
        }
        chart.historicalChart(historicalPrices);
    }); //TODO: ADd Option for Currency
}

function displayTopBar(){
    CDAPI.getRealTime(function(response){
        var data = response.bpi
        var USD = data.USD;
        var GBP = data.GBP;
        var EUR = data.EUR;
        term.yellow(USD.code + ": " + USD.rate);
        term.right(config.TERM_WIDTH/3);
        term.yellow(GBP.code + ": " + GBP.rate);
        term.right(config.TERM_WIDTH/3);
        term.yellow(EUR.code + ": " + EUR.rate);
        term.black;
    });
}

/**
 * Main process of the application that runs on initialization
 */
function main(){
    displayTopBar();
    setTimeout(printHistorical,700);
    setTimeout(chartHistorical,500);
    //setTimeout(looper,1000);
    term.moveTo(1,1)
    setTimeout(main,60000);
}

/**
 * Render application on console.
 */

function render(){
    return;
}



/**
 * Loop process
 */
/*
function looper(){    
    cliEvent.question('Please enter a command or -h for help: ',function(answer){
        switch(answer){
            case '-c': printHistorical();looper();break;
            case '-g': chartHistorical();looper();break;
            case '-h': printHelpPrompt();looper();break;
            case '-r': printRealTime();looper();break;
            case '-p': printQuote();looper();break;
            case '-q': process.exit();
            case '-t': displayTopBar();looper();break;
            default: looper();
        }
    });
}
*/
//Run application
main();
