#!/usr/bin/env node

const path = require('path');
const processArgv = require('./process-argv');
const fs = require('fs');
const strip = require('./strip/strip');

const argv = processArgv(process.argv);

const config =  JSON.parse(fs.readFileSync(argv.in));
const constants = JSON.parse(fs.readFileSync('constants.json'));

// Draw the strip
strip(config, constants, argv.out);