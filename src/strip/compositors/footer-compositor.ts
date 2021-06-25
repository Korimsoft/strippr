import Jimp from 'jimp';

/* 
    Footer compositor - export footer to the temporary path
*/
export const composite = async (config, constants,) => {
    const font = await Jimp.loadFont(constants.font);

    return await new Jimp(constants.width, constants.height, constants.bgColor)
        .print(font, constants.padding, 0,
            {
                text: config.author,
                alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            },
            constants.width, constants.height)
        .print(font, -constants.padding, 0,
            {
                text: config.date,
                alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            },
            constants.width, constants.height);
}