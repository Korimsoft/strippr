import Jimp from 'jimp';
import { Config } from '../../config/model/strip-config';

/**
 * Exports the strip
 */
export interface Exporter {
    export(header: Jimp, frames : Jimp[], footer: Jimp, config: Config, outPath: string);
}