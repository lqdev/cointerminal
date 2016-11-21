var terminal = require('terminal-kit').terminal;
var request = require('request');
var readline = require('readline');
var CDAPI = require('./coindesk-api');
var chart = require('./charting');

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
        var data = JSON.parse(response);
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

function chartHistorical(){
    CDAPI.getHistorical(function(data){
        var prices = JSON.parse(data);
        var historicalPrices = []
        for(var date in prices.bpi){
            historicalPrices.push(prices.bpi[date]);
        }
        chart.historicalChart(historicalPrices);
    })
}


/**
 * Main process of the application that runs on initialization
 */
function main(){
    looper();
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
            case '-r': CDAPI.getRealTime();looper();break;
            case '-p': printQuote();looper();break;
            case '-q': process.exit();
            default: looper();
        }
    });
}
//Run application
main();
