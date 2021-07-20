import { Config } from '../model/config';
import { ConfigValidator } from './config-validator';
import { StripConfigValidator } from './strip-config-validator';

export class ConfigValidatorImpl  implements ConfigValidator {

    constructor(private stripConfigValidator: StripConfigValidator) {}

    public validate(config: Config): void {
        this.stripConfigValidator.validate(config.strip);
    }
}