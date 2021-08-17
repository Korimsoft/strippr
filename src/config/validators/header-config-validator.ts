import { HeaderConfig } from '../model/header-config';

export class HeaderConfigValidator {
    public validate(config: HeaderConfig) :void {
        if(!config) {
            throw new Error('Header config is null');
        }

        if(config.width < 0) {
            throw new Error('Header width < 0');
        }

        if(config.height < 0) {
            throw new Error('Header width < 0');
        }
        
        if(config.padding < 0) {
            throw new Error('Header width < 0');
        }
    }
}