import Jimp from 'jimp';

/* Header compositor */
export const composite = async (config, constants): Promise<Jimp> => {
    const font = await Jimp.loadFont(constants.font);
    const title = config.title;

    const maxWidth = constants.width - 2*constants.padding;
    const maxHeight = constants.height - 2*constants.padding;

    const header = new Jimp(constants.width, constants.height, constants.bgColor);
    return await header.print(font, constants.padding, constants.padding, {
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
        text: title
    }, maxWidth, maxHeight);
};
