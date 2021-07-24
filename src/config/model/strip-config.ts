 export interface StripConfig {
    name: string;
    bgColor: string;
    border: number;
    scaleTo?: number;
    exports: ExportConfig[];
}

export interface ExportConfig {
    type: ExporterType;
    format: ImageFormat
}

export enum ExporterType {
    whole='whole',
    frames='frames'
}

export enum ImageFormat {
    png='png',
    jpg='jpg'
}