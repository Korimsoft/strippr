import { StripCompositor } from './compositors/strip-compositor';
import { Exporter } from './exporters/exporter';
import { StripExporter}  from './exporters/strip-exporter';

export const strip = async (config, constants, resultFilePath: string): Promise<void> => {
    let compositor = new StripCompositor(constants);
        compositor = await compositor.compositeFrames(config.frames);
        compositor = await compositor.compositeHeader(config.header);
        compositor = await compositor.compositeFooter(config.footer);


    const stripExporter: Exporter = new StripExporter();

    await compositor.export(stripExporter, resultFilePath);
}