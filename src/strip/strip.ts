import { Config } from '../config/model/config';
import { ExportConfig } from '../config/model/strip-config';
import { StripCompositor } from './compositors/strip-compositor';
import { ExporterFactory } from './exporters/exporter-factory';
import { Exporter } from './exporters/exporter';

const exporterFactory = new ExporterFactory();

export const strip = async (config: Config, outDir: string): Promise<void> => {
    let compositor = await new StripCompositor(config).composite();

    const exporters: Exporter[] = config.strip.exports.map(e => exporterFactory.get(e));
    const exports: Promise<string>[] = exporters.map(e => compositor.export(e, outDir));

    await Promise.all(exports);
}
