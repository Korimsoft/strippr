import Jimp from 'jimp';


const calculateWidth = (constants) => {
    return constants.header.width + 2*constants.strip.border;
}

const calculateHeight = (constants, frameCount: number) => {
    return constants.header.height + 
        (3+frameCount)*constants.strip.border + 
        frameCount*constants.frame.height +
        constants.footer.height;
}

export const stripExporter = async (headerPath : string, 
        framePaths : string[], footerPath: string, constants, output) => {
    const header = await Jimp.read(headerPath);
    const frames = await Promise.all(framePaths.map(fp => Jimp.read(fp)));
    const footer = await Jimp.read(footerPath);

    const width = calculateWidth(constants);
    const height = calculateHeight(constants, framePaths.length);
    let result = new Jimp(width, height, constants.strip.bgColor);

    const border = constants.strip.border;
    let x = border;
    let y = border;

    result = result.composite(header, x, y);
    y += (border + header.bitmap.height);
    
    frames.forEach(f => {
        
        result = result.composite(f, x, y);
        y +=(border + f.bitmap.height);
    });

    result = result.composite(footer, x, y)

    await result.writeAsync(output);
}