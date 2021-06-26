import yargs from 'yargs';

/**
 * Parse the argv and return an object.
 * @param {*} argv 
 * @returns an object representing the parsed argv.
 */
export const processArgv = async (argv: string[]) => {

    return yargs(argv.slice(2))
    .option('in', {
        alias:'i',
        demandOption:true,
        describe: 'Input configuration file path'
    }).option('out', {
        alias:'o',
        demandOption: true,
        describe: 'Output file path.'
    })
    .argv;
}