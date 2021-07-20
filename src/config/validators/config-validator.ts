import { Config } from '../model/config';

export interface ConfigValidator {
    validate(config: Config): void;
}