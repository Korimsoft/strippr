

const drawText = (gmStateIn, frameConfig, x, y, constants) => {
    const gmState = gmStateIn;
    return gmState;
};

const drawImage = (gmStateIn, frameConfig, x, y, constants) => {
    const gmState = gmStateIn;


    //

    return {
        drawText: (frameConfig, x, y) => drawText(gmState, frameConfig, x, y, constants)
    };
};

const drawBackground = (gmStateIn, x, y, width, height, color) => {
    const gmState = gmStateIn.fill(color).drawRectangle(x, y, x+width, y+height);
    return  { 
        drawImage: (frameConfig, x, y, constants) => drawImage(gmState, frameConfig, x, y, constants)
    };
};




/* Single frame compositor */
const frame = (gmState, frameConfig, constants, offset) => {
    const x = constants.margin;
    const y = offset;

    return drawBackground(gmState, x, y, constants.width, constants.height)
        .drawImage(frameConfig, x, y, constants)
        .drawText(frameConfig, x, y, constants)
    
}

module.exports = frame;