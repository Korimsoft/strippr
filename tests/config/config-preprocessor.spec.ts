import { expect } from 'chai';
import path from 'path';
import { ConfigPreprocessor } from '../../src/config/config-preprocessor';
import { ConfigValidator } from '../../src/config/config-validator';
import { Config } from '../../src/config/model/config';

describe('ConfigPreprocessor', ()=> {

    const falseGlobalFile = 'globalnot.json';
    const correctGlobalFile = path.resolve(__dirname, '..','data','global-config-empty.json');
    const falseStripFile = 'stripnot.json';

    const configValidatorMock: ConfigValidator = {
        validate: (config: Config) => {}
    }

    it('Should fail on not existing global config file', async ()=> {
        try {
            const cp = new ConfigPreprocessor(falseGlobalFile, configValidatorMock);
            await cp.preprocessConfig(falseStripFile);
        } catch (error) {
            expect(error.filePath).to.equal(falseGlobalFile);
        }
    });
    it('Should fail on not existing local config file', async ()=> {
        try {
            const cp = new ConfigPreprocessor(correctGlobalFile, configValidatorMock);
            await cp.preprocessConfig(falseStripFile);
        } catch (error) {
            expect(error.filePath).to.equal(falseStripFile);
        }
    });
});