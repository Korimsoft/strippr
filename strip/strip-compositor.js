const headerCompositor = require('./header-compositor');
const frameCompositor = require('./frame-compositor');
const footerCompositor = require('./footer-compositor');
const path = require('path');

class StripCompositor {

    constructor(constants, tempDirPath) {
        this.constants = constants;
        this.tempDirPath = tempDirPath;
    }

    async header(headerConfig) {
        const headerPath = path.resolve(this.tempDirPath, 'header.png');
        this.headerPath = await headerCompositor(headerConfig, headerPath, this.constants.header);

        return this;
    }

    async frames(frameConfigs) {
        this.framePaths = [];
        const runningFrameCompositions = [];

        frameConfigs.forEach((f, i) => {
            const framePath = path.resolve(this.tempDirPath, `${i}.png`)
            this.framePaths.push(framePath);
            runningFrameCompositions.push(frameCompositor(f, framePath, this.constants.frame));
        });

        await Promise.all(runningFrameCompositions);

        return this;
    }
   

    /**
     * Compose the strip footer
     * @param {*} footerConfig 
     * @returns 
     */
    async footer(footerConfig) {
        const footerPath = path.resolve(this.tempDirPath, 'footer.png');
        this.footerPath = await footerCompositor(footerConfig, footerPath, this.constants.footer);

        return this;
    }

    /**
     * 
     * @returns path to resulting image
     */
    export(exporter, outputPath) {
        return exporter(this.headerPath, this.framePaths, this.footerPath, this.constants, outputPath);
    }

}

module.exports = StripCompositor;