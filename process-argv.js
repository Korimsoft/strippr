const yargs = require('yargs');

/**
 * Parse the argv and return an object.
 * @param {*} argv 
 * @returns an object representing the parsed argv.
 */
const processArgv = (argv) => {

    return yargs(argv.slice(2))
    .option('i', {
        alias:'in',
        demandOption:true,
        describe: 'Input configuration file'
    }).option('o', {
        alias:'out',
        demandOption: true,
        describe: 'Output directory'
    })
    .argv;
}

module.exports = processArgv;