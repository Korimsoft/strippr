#!/usr/bin/env node

import { processArgv } from './process-argv';
import * as fs from 'fs';
import { strip } from './strip/strip';

processArgv(process.argv).then(argv => {
    const configPath = argv.i as string;
    const configStr = fs.readFileSync(configPath).toString();
    const config =  JSON.parse(configStr);
    const constants = JSON.parse(fs.readFileSync('constants.json').toString());

    // Draw the strip
    strip(config, constants, argv.o as string);
});

