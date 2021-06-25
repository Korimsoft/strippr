import { ComponentConfig } from './component-config';

export interface FrameConfig extends ComponentConfig {
    src: string;

    //TODO: Create an enum
    position: string;
    text: string;
}

