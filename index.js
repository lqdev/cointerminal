var clear = require('clear');
var term = require('terminal-kit').terminal;
var request = require('request');
var readline = require('readline');
var CDAPI = require('./coindesk-api');
var chart = require('./charting');
var config = require('./config');

//Read User Input Interface
var cliEvent = readline.createInterface({
    input: process.stdin, //Take input from Standard Input
    output: process.stdout //Output to Standard Output
});

//Verbose Prompt
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

function printHistorical(){
    CDAPI.getHistorical(function(response){
        var data = response;
        for(var date in data.bpi){
            console.log(date + ':' + data.bpi[date]);
        }    
    });
}

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

function chartHistorical(){
    term.moveTo(0,5);
    CDAPI.getHistorical(function(data){
        var prices = data;
        var historicalPrices = []
        for(var date in prices.bpi){
            historicalPrices.push(prices.bpi[date]);
        }
        chart.historicalChart(historicalPrices);
    })
}

function displayTopBar(){
    CDAPI.getRealTime(function(response){
        var data = response.bpi
        var USD = data.USD;
        var GBP = data.GBP;
        var EUR = data.EUR;
        term.red(USD.code + ": " + USD.rate);
        term.right(config.TERM_WIDTH/3);
        term.red(GBP.code + ": " + GBP.rate);
        term.right(config.TERM_WIDTH/3);
        term.red(EUR.code + ": " + EUR.rate);
        term.black;
        term.moveTo(1,2);
    });
}

function displayCurrency(){
    term.moveTo(config.TERM_WIDTH/2,2);
    CDAPI.getCurrencies(function(response){
        var data = response;
        term(data);
    });
}

/**
 * Main process of the application that runs on initialization
 */
function main(){
    displayTopBar();
    setTimeout(chartHistorical,500);
    term.down(1);
    setTimeout(looper,1000);    
}

/**
 * Loop process
 */
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
//Run application
main();
