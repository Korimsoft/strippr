import Jimp from 'jimp';
import { Config } from '../../config/model/strip-config';
import { Exporter } from './exporter';

export class StripExporter implements Exporter {


    private calculateWidth = (config: Config) => {
        return config.header.width + 2 * config.strip.border;
    }

    private calculateHeight = (config: Config, frameCount: number) => {
        return config.header.height +
            (3 + frameCount) * config.strip.border +
            frameCount * config.frames[0].height +
            config.footer.height;
    }

    public async export(header: Jimp, frames: Jimp[], footer: Jimp, config: Config, output: string) {

        const width = this.calculateWidth(config);
        const height = this.calculateHeight(config, frames.length);
        let result = new Jimp(width, height, config.strip.bgColor);

        const border = config.strip.border;
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