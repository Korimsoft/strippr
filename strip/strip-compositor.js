const headerCompositor = require('./header-compositor');
const frameCompositor = require('./frame-compositor');
const footerCompositor = require('./footer-compositor');
const path = require('path');

class StripCompositor {

    constructor(constants, tempDirPath) {
        this.constants = constants;
        this.offset = 0;
        this.tempDirPath = tempDirPath;
    }

    background(config) {
        
    }

    async header(headerConfig) {
        const headerPath = path.resolve(this.tempDirPath, 'header.png');
        await headerCompositor(headerConfig, headerPath, this.constants.header);

        return this;
    }

    async frames(frameConfigs) {

        const promises = [];

        frameConfigs.forEach((f, i) => {
            const framePath = path.resolve(this.tempDirPath, `${i}.png`)
            promises.push(frameCompositor(f, framePath, this.constants.frame));
        });

        await Promise.all(promises);

        return this;
    }
   

    /**
     * Compose the strip footer
     * @param {*} footerConfig 
     * @returns 
     */
    async footer(footerConfig) {
        const footerPath = path.resolve(this.tempDirPath, 'footer.png');
        await footerCompositor(footerConfig, footerPath, this.constants.footer);
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