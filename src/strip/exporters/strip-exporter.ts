import Jimp from 'jimp';
import { Exporter } from './exporter';

export class StripExporter implements Exporter {


    private calculateWidth = (constants) => {
        return constants.header.width + 2 * constants.strip.border;
    }

    private calculateHeight = (constants, frameCount: number) => {
        return constants.header.height +
            (3 + frameCount) * constants.strip.border +
            frameCount * constants.frame.height +
            constants.footer.height;
    }

    public async export(header: Jimp,
        frames: Jimp[], footer: Jimp, constants, output: string) {

        const width = this.calculateWidth(constants);
        const height = this.calculateHeight(constants, frames.length);
        let result = new Jimp(width, height, constants.strip.bgColor);

        const border = constants.strip.border;
        let x = border;
        let y = border;

        result = result.composite(header, x, y);
        y += (border + header.bitmap.height);

        frames.forEach(f => {

            result = result.composite(f, x, y);
            y += (border + f.bitmap.height);
        });

        result = result.composite(footer, x, y)

        await result.writeAsync(output);
    }
}