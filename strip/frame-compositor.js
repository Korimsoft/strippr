const Jimp = require('jimp');

const drawText = async (frameConfig, constants, frame) => {
    
    const font = await Jimp.loadFont('resources/fonts/typewriter/typewriter-b-64.fnt');
    const x = constants.textPadding;
    const y = constants.textPadding;
    const maxWidth = constants.width - constants.textPadding;
    const maxHeight = constants.height - constants.textPadding;

    return frame.print(font, x, y, frameConfig.text, maxWidth, maxHeight);

};


const calculateAlignment = (position, imageWidth, backgroundWidth) => {
    switch(position) {
        case 'left':
            return 0;
        case 'center':
            return (backgroundWidth -imageWidth)/2;
        case 'right':
            return backgroundWidth - imageWidth;
        default:
            console.warn(`Unknown frame image position: '${position}'`);
    }
}

const drawImage = async (frameImagePath, frameConfig, background) => {
    
    const image = await Jimp.read(frameImagePath);

    const y = background.bitmap.height - image.bitmap.height;
    const x = calculateAlignment(frameConfig.position, image.bitmap.width, background.bitmap.width);

    return background.composite(image, x, y);
};

const prepareBackground = (width, height, color) => {
    return new Jimp(width, height, color);
};

/* 
*   Single frame compositor
*   Write the frame as an image.
*/
const frame = async (frameConfig, framePath, constants) => {

    // todo: Move this one level up and merge it in the frame config 
    const imagePath = frameConfig.src.replace("{workingdir}", process.cwd());

    const background  =  prepareBackground(constants.width, constants.height, constants.bgColor);
    const frame =  await drawImage(imagePath, frameConfig, background);
    const frameWithText = await drawText(frameConfig, constants, frame);

    await frameWithText.writeAsync(framePath);
}

module.exports = frame;