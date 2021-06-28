import { FooterConfig } from './footer-config';
import { FrameConfig } from './frame-config';
import { HeaderConfig } from './header-config';

/**
 * Strip border and dimension config
 */
export interface StripConfig {
    bgColor: string;
    border: number;
    scaleTo?: number;
}

export interface Config {
    strip: StripConfig;
    header: HeaderConfig;
    frames: FrameConfig[];
    footer: FooterConfig;
}