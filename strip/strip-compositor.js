const headerCompositor = require('./header-compositor');
const frameCompositor = require('./frame-compositor');
const path = require('path');

class StripCompositor {

    constructor(constants, tempDirPath) {
        this.constants = constants;
        this.offset = 0;
        this.tempDirPath = tempDirPath;
    }

    background(config) {

        
        
    }

    header(headerConfig) {

        
    }

    async frames(frameConfigs) {

        const promises = [];

        frameConfigs.forEach((f, i) => {
            promises.push(frameCompositor(f, path.resolve(this.tempDirPath, `${i}.png`), this.constants.frame));
        });

        await Promise.all(promises);

        return this;
    }
   

    /**
     * Compose the strip footer
     * @param {*} footerConfig 
     * @returns 
     */
    footer(footerConfig) {

        if (footerConfig) {
            this.offset += this.constants.footerHeight;
        }
        return this;
    }

    /**
     * 
     * @returns path to resulting image
     */
    finalize() {
        return '';
    }

}

module.exports = StripCompositor;