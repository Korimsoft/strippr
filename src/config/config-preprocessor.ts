import { Config } from './model/strip-config';
import fs from 'fs/promises';

export class ConfigPreprocessor {
    

    private config: Config = null;
    
    constructor(private globalConfigPath) {

    }


    public async preprocessConfig(stripConfig: any): Promise<Config> {
        if(!this.config) {
            this.config = await this.loadConfig(this.globalConfigPath);
        }

        return this.config;
    }

    private async loadConfig(globalConfigPath: string): Promise<Config> {
        const configJson: string = (await fs.readFile(globalConfigPath)).toString();
        const config = JSON.parse(configJson) as Config;

        return config;
    }

    private preprocessPath(path: string) :string {
        return path;
    }
}


