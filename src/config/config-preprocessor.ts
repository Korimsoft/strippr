import { Config } from './model/strip-config';
import fs from 'fs/promises';
import { HeaderConfig } from './model/header-config';
import { FooterConfig } from './model/footer-config';
import { FrameConfig } from './model/frame-config';

export class ConfigPreprocessor {

    private globalConfig: Config = null;

    constructor(private globalConfigPath) {

    }

    public async preprocessConfig(stripConfigPath: string): Promise<Config> {
        if (!this.globalConfig) {
            this.globalConfig = await this.loadConfig(this.globalConfigPath);
        }

        const stripConfig = await this.loadConfig(stripConfigPath);

        let outConfig: Config = { ...this.globalConfig };
        outConfig.header = this.mergeHeader(stripConfig.header);
        outConfig.footer = this.mergeFooter(stripConfig.footer);
        outConfig.frames = this.mergeFrames(stripConfig.frames);

        return outConfig;
    }

    private async loadConfig(configPath: string): Promise<Config> {
        const configJson: string = (await fs.readFile(configPath)).toString();
        const config = JSON.parse(configJson) as Config;
        return config;
    }

    private mergeHeader(headerConfig: HeaderConfig): HeaderConfig {
        return {
            ...this.globalConfig.header,
            ...headerConfig
        };
    }

    private mergeFooter(footerConfig: FooterConfig): FooterConfig {
        return {
            ...this.globalConfig.footer,
            ...footerConfig
        }
    }

    mergeFrames(framesConfig: FrameConfig[]): FrameConfig[] {
        return framesConfig.map(f => {
            return {
                ...this.globalConfig.frames[0],
                ...f
            }
        }).map(f => {
            const withUpdatedSrc = { ...f };
            withUpdatedSrc.src = this.preprocessPath(f.src);
            return withUpdatedSrc;
        });
    }

    private preprocessPath(path: string): string {
        return path.replace('{workingdir}', process.cwd());
    }
}
