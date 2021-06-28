import Jimp from 'jimp';
import { FrameConfig, Position } from '../../config/model/frame-config';

const drawText = async (config: FrameConfig, frame: Jimp) => {  
    const font = await Jimp.loadFont(config.font);
    const x = config.padding;
    const y = config.padding;
    const maxWidth = config.width - config.padding;
    const maxHeight = config.height - config.padding;

    return frame.print(font, x, y, config.text, maxWidth, maxHeight);
};


const calculateAlignment = (position: Position, imageWidth: number, backgroundWidth: number) => {
    switch(position) {
        case Position.left:
            return 0;
        case Position.center:
            return (backgroundWidth -imageWidth)/2;
        case Position.right:
            return backgroundWidth - imageWidth;
        default:
            console.warn(`Unknown frame image position: '${position}'`);
    }
}

const drawImage = async (config: FrameConfig, background: Jimp) => {
    const image = await Jimp.read(config.src);

    const y = background.bitmap.height - image.bitmap.height;
    const x = calculateAlignment(config.position, image.bitmap.width, background.bitmap.width);

    return background.composite(image, x, y);
};

const prepareBackground = (width: number, height: number, color: string) => {
    return new Jimp(width, height, color);
};

/* 
*   Single frame compositor
*   Write the frame as an image.
*/
export const composite = async (config: FrameConfig) : Promise<Jimp> => {
    const background  =  prepareBackground(config.width, config.height, config.bgColor);
    const frame =  await drawImage(config, background);
    const frameWithText = await drawText(config, frame);

    return frameWithText;
}
