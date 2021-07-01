import { ExportConfig, ExporterType } from '../../config/model/strip-config';
import { Exporter } from './exporter';
import { SingleFrameExporter } from './single-frame-exporter';
import { StripExporter } from './strip-exporter';

export class ExporterFactory {
    public get(exportConfig: ExportConfig): Exporter {
        switch (exportConfig.type) {
            case ExporterType.whole:
                return new StripExporter(exportConfig);
            case ExporterType.frames:
                return new SingleFrameExporter(exportConfig);
            default:
                throw new Error(`Exporter not found for: ${exportConfig.type}`);
        }
    }
}
