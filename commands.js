var cmd = require('commander');

cmd
    .version('0.0.1')
    .usage('[options]')
    .option('-c --currency <currency>','Set Currency',/^[A-Z]{3}$/i,'USD')
    .parse(process.argv);

console.log(cmd.currency);

module.exports = {
    cmd: cmd
}

/*
Sample of setting args as well as default values
cmd
    .version('0.0.1')
    .option('-s --size <size>','Pizza size',/^[A-Z]{3}$/i,'USD')
    .option('-d --drink [drink]','Drink',/^(coke|pepsi|izze)$/i)
    .parse(process.argv);

console.log('size %j',cmd.size);
console.log('drink: %j',cmd.drink);
*/
