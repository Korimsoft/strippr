import { composite as headerCompositor } from './header-compositor'; './header-compositor';
import { compose as frameCompositor } from './frame-compositor';
import { composite as footerCompositor } from './footer-compositor';
import Jimp from 'jimp/*';

export class StripCompositor {
    
    private header: Jimp;
    private frames: Jimp[] = [];
    private footer: Jimp;

    constructor(private constants: any) { }

    public async compositeHeader(headerConfig): Promise<StripCompositor> {
        this.header = await headerCompositor(headerConfig, this.constants.header);
        
        return this;
    }

    public async compositeFrames(frameConfigs) {
        const runningFrameCompositions: Promise<void>[] = [];

        frameConfigs.forEach((f, i: number) => {
            runningFrameCompositions.push((async () => {
                const frame = await frameCompositor(f, this.constants.frame);
                this.frames.push(frame);
            })());
        });

        await Promise.all(runningFrameCompositions);

        return this;
    }
 
    public async compositeFooter(footerConfig) {
        this.footer = await footerCompositor(footerConfig, this.constants.footer);

        return this;
    }

    public export(exporter, outputPath: string): string {
        return exporter(this.header, this.frames, this.footer, this.constants, outputPath);
    }
}