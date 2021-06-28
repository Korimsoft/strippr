import Jimp from 'jimp';
import { FooterConfig } from '../../config/model/footer-config';

/* 
    Footer compositor - export footer to the temporary path
*/
export const composite = async (config: FooterConfig) => {
    const font = await Jimp.loadFont(config.font);

    return await new Jimp(config.width, config.height, config.bgColor)
        .print(font, config.padding, 0,
            {
                text: config.author,
                alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            },
            config.width, config.height)
        .print(font, -config.padding, 0,
            {
                text: config.date,
                alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            },
            config.width, config.height);
}