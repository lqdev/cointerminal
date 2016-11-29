var clear = require('clear');
var term = require('terminal-kit').terminal;
var CDAPI = require('./coindesk-api');
var chart = require('./charting');
var config = require('./config');
var cmd  = require('./commands').cmd;

/**
 * Global value that determines whether it is the first time the application is being initialized. 
 */
var initialized = false; 
var currency = cmd.currency;

/**
 * Gets historical Bitcoin Price Index (BPI) data from Coindesk API and displays it out to the console
 */

function printHistorical(){ 
    CDAPI.getHistorical(currency,function(response){
        var data = response;
        var i = 5;
        term.moveTo(config.TERM_WIDTH/2+5,i);
        term.white("Historical Data - Past 31 Days (" + currency + ")");
        i++;
        for(var date in data.bpi){
            if(i < 38){
                term.moveTo(config.TERM_WIDTH/2+5,i);
                term.yellow(date + ' | ' + data.bpi[date]);
            }
            i++;
        }    
    });
}

/**
 * Charts last 31 days of historical Bitcoin Price Index (BPI) data from Coindesk API on the console.
 */
function chartHistorical(){
    term.moveTo(1,5);
    term.white("Chart of Historical Data - Past 31 Days (" + currency + ")")
    term.moveTo(1,7);
    CDAPI.getHistorical(currency,function(data){
        var prices = data;
        var historicalPrices = []
        for(var date in prices.bpi){
            historicalPrices.push(prices.bpi[date]);
        }
        chart.historicalChart(historicalPrices);
    }); 
    term.black;
}

/**
 * Displays real-time Bitcoin Price Index (BPI) data for USD,GBP, and EUR currencies on a bar at the top of the console window.
 */
function displayTopBar(){
    term.moveTo(1,1);
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
 * Update Top Bar Containing Real-Time Information 
 */
function updateTopBar(){
    displayTopBar();
}


/**
 * Render application on console.
 */
function render(){
    //Initialize Program 
    if(initialized == false){
        clear();
        displayTopBar();
        setTimeout(chartHistorical,500);
        setTimeout(printHistorical,700);
        initialized = true;
    }else{
        updateTopBar(); 
    }
    setTimeout(render,60000);
}

/**
 * Main process of the application that runs on initialization
 */
function main(){
    render();     
}

//Run application
main();


//Clear terminal and end process when CTRL/CMD + C (Interrupt) is captured
process.on('SIGINT',function(){
    clear();
    process.exit();
})
