import { HeaderConfig } from '../model/header-config';

export class HeaderConfigValidator {
    public validate(config: HeaderConfig) :void {
        if(!config) {
            throw new Error('Header config is null');
        }
    }
}