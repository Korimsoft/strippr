import { Config } from '../config/model/strip-config';
import { StripCompositor } from './compositors/strip-compositor';
import { Exporter } from './exporters/exporter';
import { SingleFrameExporter } from './exporters/single-frame-exporter';
import { StripExporter}  from './exporters/strip-exporter';

export const strip = async (config: Config, resultFilePath: string): Promise<void> => {
    let compositor = await new StripCompositor(config).composite();
        
    const stripExporter: Exporter = new StripExporter();
    const singleFrameExporter: Exporter = new SingleFrameExporter();

    await compositor.export(stripExporter, resultFilePath);
    await compositor.export(singleFrameExporter, resultFilePath);
}