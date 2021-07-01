import Jimp from 'jimp/*';
import { Exporter } from './exporter';
import path from 'path';
import { Config } from '../../config/model/config';
import { ExportConfig, ImageFormat } from '../../config/model/strip-config';

export class SingleFrameExporter implements Exporter {

    constructor(private exportConfig: ExportConfig){}

    public async export(_header: Jimp, frames: Jimp[], _footer: Jimp, config: Config, outDir: string) {
        const pendingExports: Promise<void>[] = [];
        frames.forEach((frame, index) => {
            const exportPath = this.resolvePath(outDir, config.strip.name, index, this.exportConfig.format);
            pendingExports.push(this.exportFrame(frame, exportPath));
        });

        await Promise.all(pendingExports);
    }

    private resolvePath(outDir: string, name: string, frameOrder: number, fileExt: ImageFormat): string {
        const fileName = name || "frame";
        const newFileName = `${fileName}-${frameOrder}.${fileExt}`;

        return path.resolve(outDir, newFileName);
    }

    private async exportFrame(frame: Jimp, outPath: string): Promise<void> {
        await frame.writeAsync(outPath);
    }
}