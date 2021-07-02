import { ConfigPreprocessor } from '../src/config/config-preprocessor';

describe('ConfigPreprocessor', ()=> {
    it('Should fail on not existing global config file', async ()=> {
        const cp = new ConfigPreprocessor('globalnot.json', null);
        await cp.preprocessConfig('stripnot.json');

        
    });
});