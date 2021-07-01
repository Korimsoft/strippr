import Jimp from 'jimp';
import path from 'path';
import { Config } from '../../config/model/config';
import { ExportConfig, ImageFormat } from '../../config/model/strip-config';
import { Exporter } from './exporter';

export class StripExporter implements Exporter {

    constructor(private exportConfig: ExportConfig){}

    private calculateWidth = (config: Config) => {
        return config.header.width + 2 * config.strip.border;
    }

    private calculateHeight = (config: Config, frameCount: number) => {
        return config.header.height +
            (3 + frameCount) * config.strip.border +
            frameCount * config.frames[0].height +
            config.footer.height;
    }

    public async export(header: Jimp, frames: Jimp[], footer: Jimp, config: Config, outDir: string) {

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
        const output: string = resolveOutputPath(outDir, config.strip.name, this.exportConfig.format);
        await result.writeAsync(output);
    }
}

function resolveOutputPath(outDir: string, name: string, format: ImageFormat): string {
    return path.resolve(outDir, `${name}.${format}`);
}
