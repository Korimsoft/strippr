const StripCompositor = require('./strip-compositor');

const fs = require('fs');
const path = require('path');

const tempDirPath = 'strip_tmp';

const strip = async (config, constants, resultFilePath) => {

    if(fs.existsSync(tempDirPath)){
        fs.rmdirSync(tempDirPath, {recursive: true});
    }
    fs.mkdirSync(tempDirPath);

    let compositor = new StripCompositor(constants, tempDirPath);
        compositor = await compositor.frames(config.frames);
        compositor = await compositor.header(config.header);
        compositor = await compositor.footer(config.footer);

}

module.exports=strip;