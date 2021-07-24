import { Config } from '../model/config';
import { ConfigValidator } from './config-validator';
import { StripConfigValidator } from './strip-config-validator';
import { HeaderConfigValidator } from './header-config-validator';

export class ConfigValidatorImpl  implements ConfigValidator {

    constructor(private stripConfigValidator: StripConfigValidator, 
        private headerConfigValidator: HeaderConfigValidator) {}

    public validate(config: Config): void {
        this.stripConfigValidator.validate(config.strip);
        this.headerConfigValidator.validate(config.header);
    }
}