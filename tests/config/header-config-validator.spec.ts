import { assert } from 'chai';
import { HeaderConfig } from '../../src/config/model/header-config';
import { HeaderConfigValidator } from '../../src/config/validators/header-config-validator';

describe('HeaderConfigValidator', () => {
    let validator: HeaderConfigValidator;

    let config: HeaderConfig;

    beforeEach(() => {
        validator = new HeaderConfigValidator();

        config = {
            title: 'Blalala',
            bgColor: '#fafafa',
            width: 500,
            height: 300,
            padding: 10,
            font: 'jisdowe'
        };
    })

    it('Does nothing on correct configuration', () => {
        validator.validate(config);
    });

    it('Throws error on null configuration', () => {
        assert.throws(() => validator.validate(null));
    });

    it('Throws Error on negative width', () => {
        config.width = -5;
        assert.throws(() => validator.validate(config));
    });

    it('Throws Error on negative height', () => {
        config.height = -5;
        assert.throws(() => validator.validate(config));
    });

    it('Throws Error on negative padding', () => {
        config.padding = -5;
        assert.throws(() => validator.validate(config));
    });

});