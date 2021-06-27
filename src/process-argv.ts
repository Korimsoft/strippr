import yargs from 'yargs';

/**
 * Parse the argv and return an object.
 * @param {*} argv 
 * @returns an object representing the parsed argv.
 */
export const processArgv = async (argv: string[]) => {

    return yargs(argv.slice(2))
    .option('in', {
        alias:'in',
        type: 'string',
        describe: 'Input configuration file path'
    }).option('out', {
        alias:'out',
        type: 'string',
        describe: 'Output file path.'
    })
    .argv;
}