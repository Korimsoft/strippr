import { assert } from 'chai';
import { ExporterType, ImageFormat, StripConfig } from '../../src/config/model/strip-config';
import { StripConfigValidator } from '../../src/config/validators/strip-config-validator';

describe('StripConfigValidator', () => {

    let validator: StripConfigValidator;
    const configTemplate: StripConfig = {
        name: 'Some Comics',
        border: 0,
        bgColor: '#ffffff',
        exports: [{
            type: ExporterType.whole,
            format: ImageFormat.jpg
        }]
    };

    beforeEach(() =>{
        validator = new StripConfigValidator();
    });

    it('Does Nothing on Valid Config', () => {
        validator.validate(configTemplate);
    });

    it('Throws Error on Null Config', () => {
        assert.throws(() => validator.validate(null));
    });

    it('Throws Error on Negative Border Size', () => {
        const config = {
            ...configTemplate,
            border: -1
        }
        assert.throws(() => validator.validate(config));
    });
});