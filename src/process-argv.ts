import yargs from 'yargs';

/**
 * Parse the argv and return an object.
 * @param {*} argv 
 * @returns an object representing the parsed argv.
 */
export const processArgv = async (argv: string[]) => {

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