import { StripConfig } from '../model/strip-config';

export class StripConfigValidator {
    public validate(stripConfig: StripConfig): void {
        if(!stripConfig) {
            throw new Error('Strip config is null.');
        }

        if(stripConfig.border < 0) {
            throw new Error(`Border is smaller than 0: ${stripConfig.border}`);
        }
    }
}