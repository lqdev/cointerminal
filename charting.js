var chart = require('chart');
var clear = require('clear');
var CDAPI = require('./coindesk-api');
var term = require('terminal-kit').terminal;



module.exports = {
    sampleChart: function(){
        var data = [1,2,3,4,5];
        clear();
        console.log(chart(data,{
            width: 20,
            height: 20,
            pointChar: '\\',
            negativePointChar: '-'
        }))
    },
    historicalChart: function(prices){
        term.yellow(chart(prices,{
            height: 35,
            width: 50
        }));
    }
}