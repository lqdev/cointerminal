var chart = require('chart');
var term = require('terminal-kit').terminal;

/**
 * Output chart of BPI historical prices.
 * 
 * @Param prices - Historical prices for the last 31 days returned by Coindesk API Historical Data endpoint
 */

var historicalChart = function(prices){
        term.yellow(chart(prices,{
            height: 35,
            width: 80
        }));
}

module.exports = {
    
    
    historicalChart: historicalChart
}