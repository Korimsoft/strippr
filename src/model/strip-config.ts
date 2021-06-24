import { FooterConfig } from './footer-config';
import { FrameConfig } from './frame-config';
import { HeaderConfig } from './header-config';

export interface StripBorderConfig {
    bgColor: string;
    border: string;
}

export interface StripConfig {
    strip: StripBorderConfig;
    header: HeaderConfig;
    frame: FrameConfig[];
    footer: FooterConfig;
}