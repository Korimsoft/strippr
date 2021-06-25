import Jimp from 'jimp';

/**
 * Exports the strip
 */
export interface Exporter {
    export(header: Jimp, frames : Jimp[], footer: Jimp, constants, outPath: string);
}