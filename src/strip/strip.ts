import { StripCompositor } from './strip-compositor';
import { stripExporter}  from './exporters/strip-exporter';

export const strip = async (config, constants, resultFilePath: string): Promise<void> => {
    let compositor = new StripCompositor(constants);
        compositor = await compositor.compositeFrames(config.frames);
        compositor = await compositor.compositeHeader(config.header);
        compositor = await compositor.compositeFooter(config.footer);

    await compositor.export(stripExporter, resultFilePath);
}