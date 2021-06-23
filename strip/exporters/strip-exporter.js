const Jimp = require('jimp');


const calculateWidth = (constants) => {
    return constants.header.width + 2*constants.strip.border;
}

const calculateHeight = (constants, frameCount) => {
    return constants.header.height + 
        (2+frameCount)*constants.strip.border + 
        frameCount*constants.frame.height +
        constants.footer.height;
}

const stripExporter = async (headerPath, framePaths, footerPath, constants, output) => {
    const header = await Jimp.read(headerPath);
    const frames = await Promise.all(framePaths.map(fp => Jimp.read(fp)));
    const footer = await Jimp.read(footerPath);

    const width = calculateWidth(constants);
    const height = calculateHeight(constants, framePaths.length);
    const result = new Jimp(width, height, constants.strip.bgcolor);

    await result.writeAsync(output);
}

module.exports = stripExporter;