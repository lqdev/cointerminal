var chart = require('chart');
var clear = require('clear');

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
            height: 50,
            width: 50,
            pointChar: '\\',
            negativePointChar: '-'
        });
    }
}