const gm = require('gm');

const handleWriteError = err => err && console.error(err);

const drawText = (gmStateIn, frameConfig, x, y, constants) => {
    const gmState = gmStateIn;
    return gmState;
};

const drawImage = (frameConfig, constants, tempFramePath) => {

    const cwd = process.cwd();

    // Do this in a preprocessor
    const imagePath = frameConfig.src.replace("{workingdir}", cwd);

    //Put the image to the bottom right corner
    const gmState = gm(tempFramePath).composite(imagePath);
    //.geometry(`+${x}+${y}`);

    return {
        drawText: (frameConfig, x, y) => drawText(gmState, frameConfig, x, y, constants)
    };
};

const drawBackground = (width, height, color, tempFramePath) => {
    gm(width, height, color).write(tempFramePath, handleWriteError);
    return {
        drawImage: drawImage
    };
};


/* Single frame compositor */
const frame = (frameConfig, tempFramePath, constants) => {

    drawBackground(constants.width, constants.height, constants.bgColor, tempFramePath)
        .drawImage(frameConfig, constants, tempFramePath)
        .drawText(frameConfig, constants)
        .write(tempFramePath, handleWriteError);
}

module.exports = frame;