import { StripCompositor } from './strip-compositor';
import { stripExporter}  from './exporters/strip-exporter';

const fs = require('fs');
const path = require('path');

const tempDirPath = 'strip_tmp';

export const strip = async (config, constants, resultFilePath: string) => {

    if(fs.existsSync(tempDirPath)){
        fs.rmdirSync(tempDirPath, {recursive: true});
    }
    fs.mkdirSync(tempDirPath);

    let compositor = new StripCompositor(constants, tempDirPath);
        compositor = await compositor.frames(config.frames);
        compositor = await compositor.header(config.header);
        compositor = await compositor.footer(config.footer);


    await compositor.export(stripExporter, resultFilePath);
    //await compositor.export(singleFrameExporter);

}