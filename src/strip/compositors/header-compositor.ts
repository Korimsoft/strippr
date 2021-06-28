import Jimp from 'jimp';
import { HeaderConfig } from '../../config/model/header-config';

/* Header compositor */
export const composite = async (config: HeaderConfig): Promise<Jimp> => {
    const font = await Jimp.loadFont(config.font);
    const title = config.title;

    const maxWidth = config.width - 2*config.padding;
    const maxHeight = config.height - 2*config.padding;

    const header = new Jimp(config.width, config.height, config.bgColor);
    return await header.print(font, config.padding, config.padding, {
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
        text: title
    }, maxWidth, maxHeight);
};
