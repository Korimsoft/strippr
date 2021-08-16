import { ComponentConfig } from './component-config';


export enum Position {
    left = 'left',
    center = 'center',
    right = 'right'
}

export interface FrameConfig extends ComponentConfig {
    src: string;
    position: Position;
    text: string | string[];
    width: number,
    height: number,
    padding: number,
    bgColor: string,
    font: string
}

