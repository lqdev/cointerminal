function printHistorical(){CDAPI.getHistorical(currency,function(a){var b=a,c=5;term.moveTo(config.TERM_WIDTH/2+5,c),term.white("Historical Data - Past 31 Days ("+currency+")"),c++;for(var d in b.bpi)c<38&&(term.moveTo(config.TERM_WIDTH/2+5,c),term.yellow(d+" | "+b.bpi[d])),c++})}function chartHistorical(){term.moveTo(1,5),term.white("Chart of Historical Data - Past 31 Days ("+currency+")"),term.moveTo(1,7),CDAPI.getHistorical(currency,function(a){var b=a,c=[];for(var d in b.bpi)c.push(b.bpi[d]);chart.historicalChart(c)}),term.black}function displayTopBar(){term.moveTo(1,1),CDAPI.getRealTime(function(a){var b=a.bpi,c=b.USD,d=b.GBP,e=b.EUR;term.yellow(c.code+": "+c.rate),term.right(config.TERM_WIDTH/3),term.yellow(d.code+": "+d.rate),term.right(config.TERM_WIDTH/3),term.yellow(e.code+": "+e.rate),term.black})}function updateTopBar(){displayTopBar()}function render(){0==initialized?(clear(),displayTopBar(),setTimeout(chartHistorical,500),setTimeout(printHistorical,700),initialized=!0):updateTopBar(),setTimeout(render,6e4)}function main(){render()}var clear=require("clear"),term=require("terminal-kit").terminal,CDAPI=require("./coindesk-api"),chart=require("./charting"),config=require("./config"),cmd=require("./commands").cmd,initialized=!1,currency=cmd.currency;main(),process.on("SIGINT",function(){clear(),process.exit()});