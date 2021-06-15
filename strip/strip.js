const StripCompositor = require('./strip-compositor');

const fs = require('fs');
const path = require('path');

const tempDirPath = 'strip_tmp';

const strip = (config, constants, resultFilePath) => {

    if(fs.existsSync(tempDirPath)){
        fs.rmdirSync(tempDirPath, {recursive: true});
    }
    fs.mkdirSync(tempDirPath);

    new StripCompositor(constants, tempDirPath).frames(config.frames);

}

module.exports=strip;