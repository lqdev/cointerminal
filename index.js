var clear = require('clear');
var term = require('terminal-kit').terminal;
var request = require('request');
var CDAPI = require('./coindesk-api');
var chart = require('./charting');
var config = require('./config');
var cmd  = require('commander');

var running = false; //Check that application has already been initialized

function printHistorical(){ 
    CDAPI.getHistorical(function(response){
        var data = response;
        var i = 5;
        term.moveTo(config.TERM_WIDTH/2+5,i);
        term.white("Historical Data - Past 31 Days");
        i++;
        for(var date in data.bpi){
            if(i < 38){
                term.moveTo(config.TERM_WIDTH/2+5,i);
                term.yellow(date + ' | ' + data.bpi[date]);
            }
            i++;
        }    
    });//TODO: Add option for currency
}

/**
 * Chart last 31 days of historical data
 */
function chartHistorical(){
    term.moveTo(1,5);
    term.white("Chart of Historical Data - Past 31 Days")
    term.moveTo(1,7);
    CDAPI.getHistorical(function(data){
        var prices = data;
        var historicalPrices = []
        for(var date in prices.bpi){
            historicalPrices.push(prices.bpi[date]);
        }
        chart.historicalChart(historicalPrices);
    }); //TODO: ADd Option for Currency
    term.black;
}

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

function updateTopBar(){
    displayTopBar();
}


/**
 * Render application on console.
 */
function render(){
    //Initial Program 
    if(running == false){
        clear();
        displayTopBar();
        setTimeout(chartHistorical,500);
        setTimeout(printHistorical,700);
        running = true;
    }else{
        updateTopBar();
    }
    setTimeout(render,60000);
}

/**
 * Main process of the application that runs on initialization
 */
function main(){
    render(); //Render application onto console    
}

//Run application
main();

process.on('SIGINT',function(){
    clear();
    process.exit();
})
