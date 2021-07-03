#!/usr/bin/env node

import { processArgv } from './process-argv';
import { strip } from './strip/strip';
import { ConfigPreprocessor } from './config/config-preprocessor';
import path from 'path';
import { ConfigValidator } from './config/config-validator';
import { FileNotFoundError } from './errors/file-not-found';

const GLOBAL_CONFIG_PATH = path.resolve(__dirname, 'resources', 'config', 'global-config.json');

processArgv(process.argv).then(async argv => {
    
    try {
        const stripConfigPath = argv.in as string;
        const configValidator = new ConfigValidator();
        const configPreprocessor = new ConfigPreprocessor(GLOBAL_CONFIG_PATH, configValidator);
        const stripConfig =  await configPreprocessor.preprocessConfig(stripConfigPath);    
        strip(stripConfig, argv.out as string);
    } catch (err) {
        handleError(err);
        process.exitCode = 1;
    }
});

function handleError(error) {
    if(error instanceof FileNotFoundError) {
        console.error(`Could not load ${error.filePath}, make sure the file exists.`);
    } else {
        console.error(`Unknown error: ${error}`);
    }

    process.exitCode = 1;
}

