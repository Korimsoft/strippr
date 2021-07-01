import Jimp from 'jimp';
import { Config } from '../../config/model/config';

/**
 * Exports the strip
 */
export interface Exporter {
    export(header: Jimp, frames : Jimp[], footer: Jimp, config: Config, outDir: string);
}