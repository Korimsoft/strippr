import { compose as headerCompositor } from './header-compositor'; './header-compositor';
import { compose as frameCompositor } from './frame-compositor';
import { compose as footerCompositor } from './footer-compositor';
import path from 'path';

export class StripCompositor {

    private footerPath = '';
    private headerPath = '';
    private framePaths: string[] = [];

    constructor(private constants: any, private tempDirPath: string) { }

    public async header(headerConfig) {
        const headerPath = path.resolve(this.tempDirPath, 'header.png');
        this.headerPath = await headerCompositor(headerConfig, headerPath, this.constants.header);

        return this;
    }

    public async frames(frameConfigs) {
        this.framePaths = [];
        const runningFrameCompositions: Promise<any>[] = [];

        frameConfigs.forEach((f, i: number) => {
            const framePath = path.resolve(this.tempDirPath, `${i}.png`)
            this.framePaths.push(framePath);
            runningFrameCompositions.push(frameCompositor(f, framePath, this.constants.frame));
        });

        await Promise.all(runningFrameCompositions);

        return this;
    }
   

    /**
     * Compose the strip footer
     * @param {*} footerConfig 
     * @returns 
     */
    public async footer(footerConfig) {
        const footerPath = path.resolve(this.tempDirPath, 'footer.png');
        this.footerPath = await footerCompositor(footerConfig, footerPath, this.constants.footer);

        return this;
    }

    /**
     * 
     * @returns path to resulting image
     */
    public export(exporter, outputPath: string): string {
        return exporter(this.headerPath, this.framePaths, this.footerPath, this.constants, outputPath);
    }
}