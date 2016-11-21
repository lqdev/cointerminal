var chart = require('chart');
var clear = require('clear');
var CDAPI = require('./coindesk-api');




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
        clear();
        console.log(chart(prices),{
            height: 5,
            width: 5,
            pointChar: '\\',
            negativePointChar: '-'
        });
    }
}