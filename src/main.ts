#!/usr/bin/env node

import { processArgv } from './process-argv';
import * as fs from 'fs';
import { strip } from './strip/strip';
import { ConfigPreprocessor } from './config/config-preprocessor';
import path from 'path';

const GLOBAL_CONFIG_PATH = path.resolve(__dirname, 'resources', 'config', 'global-config.json');


processArgv(process.argv).then(async argv => {
    const stripConfigPath = argv.in as string;

    const configPreprocessor: ConfigPreprocessor = new ConfigPreprocessor(GLOBAL_CONFIG_PATH);
    const globalConfig =  await configPreprocessor.preprocessConfig(stripConfigPath);
    
    const stripConfig =  JSON.parse(fs.readFileSync(stripConfigPath).toString());
    //const config = JSON.parse(fs.readFileSync('config/global-config.json').toString());

    // Draw the strip
    strip(stripConfig, globalConfig, argv.out as string);
});

