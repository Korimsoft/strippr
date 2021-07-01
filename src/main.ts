#!/usr/bin/env node

import { processArgv } from './process-argv';
import { strip } from './strip/strip';
import { ConfigPreprocessor } from './config/config-preprocessor';
import path from 'path';

const GLOBAL_CONFIG_PATH = path.resolve(__dirname, 'resources', 'config', 'global-config.json');

processArgv(process.argv).then(async argv => {
    const stripConfigPath = argv.in as string;
    
    const configPreprocessor = new ConfigPreprocessor(GLOBAL_CONFIG_PATH);
    const stripConfig =  await configPreprocessor.preprocessConfig(stripConfigPath);    
    
    strip(stripConfig, argv.out as string);
});

