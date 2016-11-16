var terminal = require('terminal-kit').terminal;
var request = require('request');
var readline = require('readline');
var CDAPI = require('./coindesk-api');

//Read User Input Interface
var clEvent = readline.createInterface({
    input: process.stdin, //Take input from Standard Input
    output: process.stdout //Output to Standard Output
});

//Verbose Prompt
var help = [
    {
        command: '-h',
        description: 'Help Command' 
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

/**
 * Main process of the application that runs on initialization
 */
function main(){
    CDAPI.getCurrencies();
    looper();
}


/**
 * Loop process
 */
function looper(){
    clEvent.question('Please enter a command or -h for help:\n',function(answer){
        switch(answer){
            case '-h': printHelpPrompt();looper();break;
            case '-r': CDAPI.getRealTime();looper();break;
            case '-p': CDAPI.getQuote('USD');looper();break;
            case '-q': process.exit();
            default: looper();
        }
    });
}
//Run application
main();
