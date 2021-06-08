const headerCompositor = require('./header-compositor');
const frameCompositor = require('./frame-compositor');
const gm = require('gm');


class StripCompositor {

    constructor(constants) {
        this.gmState = {};
        this.constants = constants;
        this.offset = 0;
    }

    background(config) {

        const width = this.constants.frame.width + (2 * this.constants.frame.margin);
        const headerHeight = config.header ? this.constants.header.height : 0;
        const footerHeight = config.footer ? this.constants.footer.height : 0;

        const frameCount = config.frames.length;
        const contentHeight = (frameCount * this.constants.frame.height) + (2 * frameCount + 1 * this.constants.frame.margin);
        const height = headerHeight + contentHeight + footerHeight;

        const color = this.constants.strip.bgColor || '#000';

        this.gmState = this.gmState = gm(width, height, color);

        return this;
    }

    header(headerConfig) {

        if (headerConfig) {
            this.gmState = headerCompositor(this.gmState, headerConfig, this.constants.header);
            this.offset += this.constants.header.height + this.constants.frame.margin;
        }

        return this;
    }

    frames(frameConfigs) {

        let builder = this;
        frameConfigs.forEach(f => builder = builder.frame(f));

        return builder;
    }

    frame(frameConfig) {

        // Draw the frame
        this.gmState = frameCompositor(this.gmState, frameConfig, this.constants.frame, this.offset);
        this.offset += this.constants.frame.height + this.constants.frame.margin;
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
     * @returns Initialized gm.State
     */
    getResult() {
        return this.gmState;
    }

}

module.exports = StripCompositor;