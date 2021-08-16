import Jimp from 'jimp';
import { FrameConfig, Position } from '../../config/model/frame-config';

const drawText = async (config: FrameConfig, frame: Jimp) => {
    const font = await Jimp.loadFont(config.font);
    const startX = config.padding;
    const startY = config.padding;
    const maxWidth = config.width - config.padding;
    const maxHeight = config.height - config.padding;
    let frameWithText = frame;

    if(typeof(config.text) === 'string'){
        frameWithText = frame.print(font, startX, startY, config.text, maxWidth, maxHeight);    
    } else {
        let nextLineOffset = 0;
        (config.text as string[]).forEach(line => {
            frameWithText = frameWithText.print(font, startX, startY + nextLineOffset, line, maxWidth, maxHeight - nextLineOffset);
            nextLineOffset += Jimp.measureTextHeight(font, line, maxWidth);
        });
    }

    return frameWithText;
};

const calculateAlignment = (position: Position, imageWidth: number, backgroundWidth: number) => {
    switch (position) {
        case Position.left:
            return 0;
        case Position.center:
            return (backgroundWidth - imageWidth) / 2;
        case Position.right:
            return backgroundWidth - imageWidth;
        default:
            console.warn(`Unknown frame image position: '${position}'`);
    }
}

const drawImage = async (config: FrameConfig, background: Jimp) => {
    try {
        const image = await Jimp.read(config.src);

        const y = background.bitmap.height - image.bitmap.height;
        const x = calculateAlignment(config.position, image.bitmap.width, background.bitmap.width);

        return background.composite(image, x, y);
    } catch (err) {
        console.error(`There was a problem compositing ${config.src}`);
        process.exit(1);
    }
};

const prepareBackground = (width: number, height: number, color: string) => {
    return new Jimp(width, height, color);
};

/* 
*   Single frame compositor
*   Write the frame as an image.
*/
export const composite = async (config: FrameConfig): Promise<Jimp> => {
    const background = prepareBackground(config.width, config.height, config.bgColor);
    const frame = await drawImage(config, background);
    const frameWithText = await drawText(config, frame);

    return frameWithText;
}
