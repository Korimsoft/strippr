const gm = require('gm');
const { background } = require('jimp');
const jimp = require('jimp');

/*
* Promisify the gmState.write method for more convenient handling.
*/
const writeAsync = (gmState, path) => {
    return new Promise((resolve, reject) => {
        gmState.write(path, (err) => {
            if(err) {
              reject(err);
              return;
            } 
            resolve();
        })
    });
}

const drawText = (frameConfig, constants, frame) => {
    return frame;
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
    
    const image = await jimp.read(frameImagePath);

    const y = background.bitmap.height - image.bitmap.height;
    const x = calculateAlignment(frameConfig.position, image.bitmap.width, background.bitmap.width);

    return background.composite(image, x, y);
};

const drawBackground = async (width, height, color) => {
    return await new jimp(width, height, color);
};

/* 
*   Single frame compositor
*   Write the frame as an image.
*/
const frame = async (frameConfig, framePath, constants) => {
    const imagePath = frameConfig.src.replace("{workingdir}", process.cwd());

    const background  = await drawBackground(constants.width, constants.height, constants.bgColor);
    const frame =  await drawImage(imagePath, frameConfig, background);
    const frameWithText = await drawText(frameConfig, constants, frame);

    await frameWithText.writeAsync(framePath);
}

module.exports = frame;