import Jimp from 'jimp/*';
import { Exporter } from './exporter';
import path from 'path';
import { Config } from '../../config/model/strip-config';

export class SingleFrameExporter implements Exporter {

    public async export(_header: Jimp, frames: Jimp[], _footer: Jimp, _config: Config, outPath: string) {
        const pendingExports: Promise<void>[] = [];
        frames.forEach((frame, index) => {
            const exportPath = this.transformPath(outPath, index);
            pendingExports.push(this.exportFrame(frame, exportPath));
        });

        await Promise.all(pendingExports);
    }

/**
 * Transforms the output path of a frame so that there are no name conflicts,
 * for example /my/output/file.png => /my/ouput/file-1.png
 * @param outPath 
 * @param frameOrder 
 * @returns Transformed path
 */
    private transformPath(outPath: string, frameOrder: number): string {
        const dir: string = path.dirname(outPath)
        const fileName = path.basename(outPath).split('.')[0];
        const ext = path.extname(outPath);
        const newFileName = `${fileName}-${frameOrder}${ext}`;

        return path.resolve(dir, newFileName);
    }

    private async exportFrame(frame: Jimp, outPath: string): Promise<void> {
        await frame.writeAsync(outPath);
    }
}