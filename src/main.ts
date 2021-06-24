#!/usr/bin/env node

import { processArgv } from './process-argv';
import * as fs from 'fs';
import { strip } from './strip/strip';

processArgv(process.argv).then(argv => {
    const stripScriptPath = argv.i as string;
    
    const stripScript =  JSON.parse(fs.readFileSync(stripScriptPath).toString());
    const config = JSON.parse(fs.readFileSync('global-config.json').toString());

    // Draw the strip
    strip(stripScript, config, argv.o as string);
});

