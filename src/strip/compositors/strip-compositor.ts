import { composite as compositeHeader } from './header-compositor'; './header-compositor';
import { composite as compositeFrame } from './frame-compositor';
import { composite as compositeFooter } from './footer-compositor';
import Jimp from 'jimp/*';
import { Exporter } from '../exporters/exporter';
import { Config } from '../../config/model/config';
import { FrameConfig } from '../../config/model/frame-config';

export class StripCompositor {
        
    private header: Jimp;
    private frames: Jimp[] = [];
    private footer: Jimp;

    constructor(private config: Config) { }

    public async composite(): Promise<StripCompositor> {
        this.header = await compositeHeader(this.config.header);
        this.frames = await this.compositeFrames(this.config.frames);
        this.footer = await compositeFooter(this.config.footer);

        return this;
    }

    private async compositeFrames(frameConfigs: FrameConfig[]): Promise<Jimp[]> {
        const runningFrameCompositions: Promise<Jimp>[] = frameConfigs.map(f  => compositeFrame(f));
            
        return await Promise.all(runningFrameCompositions);
    }
 
    public export(exporter: Exporter, outDir: string): Promise<string> {
        return exporter.export(this.header, this.frames, this.footer, this.config, outDir);
    }
}