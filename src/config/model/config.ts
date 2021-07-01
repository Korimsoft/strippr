import { FooterConfig } from './footer-config';
import { FrameConfig } from './frame-config';
import { HeaderConfig } from './header-config';
import { StripConfig } from './strip-config';



export interface Config {
    strip: StripConfig;
    header: HeaderConfig;
    frames: FrameConfig[];
    footer: FooterConfig;
}