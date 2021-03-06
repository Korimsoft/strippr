import fs from 'fs/promises';
import path from 'path';
import { Config } from './model/config';
import { HeaderConfig } from './model/header-config';
import { FooterConfig } from './model/footer-config';
import { FrameConfig } from './model/frame-config';
import { StripConfig } from './model/strip-config';
import { ConfigValidator } from './validators/config-validator';
import { FileNotFoundError } from '../errors/file-not-found';

export class ConfigPreprocessor {

    private globalConfig: Config = null;

    constructor(private globalConfigPath, private configValidator: ConfigValidator) {

    }

    public async preprocessConfig(stripConfigPath: string): Promise<Config> {
        if (!this.globalConfig) {
            this.globalConfig = await this.loadConfig(this.globalConfigPath);
        }

        const stripConfig = await this.loadConfig(stripConfigPath);

        let outConfig: Config = { ...this.globalConfig };
        outConfig.strip = this.preprocessStrip(stripConfig.strip);
        outConfig.header = this.preprocessHeader(stripConfig.header);
        outConfig.footer = this.preprocessFooter(stripConfig.footer);
        outConfig.frames = this.preprocessFrames(stripConfig.frames);

        this.configValidator.validate(outConfig);

        return outConfig;
    }
    

    private async loadConfig(configPath: string): Promise<Config> {
        try {
            const configJson: string = (await fs.readFile(configPath)).toString();
            return JSON.parse(configJson) as Config;
        } catch (error) {
            throw new FileNotFoundError(configPath);
        }
    }

    private preprocessStrip(stripConfig: StripConfig): StripConfig {
        return {
            ...this.globalConfig.strip,
            ...stripConfig
        };
    }

    private preprocessHeader(headerConfig: HeaderConfig): HeaderConfig {
        const outHeaderConfig = {
            ...this.globalConfig.header,
            ...headerConfig
        };

        outHeaderConfig.font = this.preprocessPath(outHeaderConfig.font);

        return outHeaderConfig;
    }

    private preprocessFooter(footerConfig: FooterConfig): FooterConfig {
        const outFooterConfig = {
            ...this.globalConfig.footer,
            ...footerConfig
        };
        outFooterConfig.font = this.preprocessPath(outFooterConfig.font);

        return outFooterConfig;
    }

    private preprocessFrames(framesConfig: FrameConfig[]): FrameConfig[] {
        return framesConfig.map(f => {
            return {
                ...this.globalConfig.frames[0],
                ...f
            }
        }).map(f => {
            const withUpdatedPaths = { ...f };
            withUpdatedPaths.src = this.preprocessPath(f.src);
            withUpdatedPaths.font = this.preprocessPath(f.font);
            return withUpdatedPaths;
        });
    }

    private preprocessPath(rawPath: string): string {
        return rawPath
            .replace('{workingdir}', process.cwd())
            .replace('{programdir}', path.resolve(__dirname, '..'));
    }
}
