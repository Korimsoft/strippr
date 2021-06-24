#!/usr/bin/env node
System.register("src/process-argv", ["yargs"], function (exports_1, context_1) {
    "use strict";
    var yargs_1, processArgv;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (yargs_1_1) {
                yargs_1 = yargs_1_1;
            }
        ],
        execute: function () {
            /**
             * Parse the argv and return an object.
             * @param {*} argv
             * @returns an object representing the parsed argv.
             */
            exports_1("processArgv", processArgv = async (argv) => {
                return yargs_1.default(argv.slice(2))
                    .option('i', {
                    alias: 'in',
                    demandOption: true,
                    describe: 'Input configuration file'
                }).option('o', {
                    alias: 'out',
                    demandOption: true,
                    describe: 'Output directory'
                })
                    .argv;
            });
        }
    };
});
System.register("src/strip/header-compositor", ["jimp"], function (exports_2, context_2) {
    "use strict";
    var jimp_1, compose;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (jimp_1_1) {
                jimp_1 = jimp_1_1;
            }
        ],
        execute: function () {
            /* Header compositor */
            exports_2("compose", compose = async (config, path, constants) => {
                const font = await jimp_1.default.loadFont(constants.font);
                const title = config.title;
                const maxWidth = constants.width - 2 * constants.padding;
                const maxHeight = constants.height - 2 * constants.padding;
                const header = new jimp_1.default(constants.width, constants.height, constants.bgColor);
                await header.print(font, constants.padding, constants.padding, {
                    alignmentX: jimp_1.default.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: jimp_1.default.VERTICAL_ALIGN_MIDDLE,
                    text: title
                }, maxWidth, maxHeight).writeAsync(path);
                return path;
            });
        }
    };
});
System.register("src/strip/frame-compositor", ["jimp"], function (exports_3, context_3) {
    "use strict";
    var jimp_2, drawText, calculateAlignment, drawImage, prepareBackground, compose;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (jimp_2_1) {
                jimp_2 = jimp_2_1;
            }
        ],
        execute: function () {
            drawText = async (frameConfig, constants, frame) => {
                const font = await jimp_2.default.loadFont(constants.font);
                const x = constants.padding;
                const y = constants.padding;
                const maxWidth = constants.width - constants.padding;
                const maxHeight = constants.height - constants.padding;
                return frame.print(font, x, y, frameConfig.text, maxWidth, maxHeight);
            };
            calculateAlignment = (position, imageWidth, backgroundWidth) => {
                switch (position) {
                    case 'left':
                        return 0;
                    case 'center':
                        return (backgroundWidth - imageWidth) / 2;
                    case 'right':
                        return backgroundWidth - imageWidth;
                    default:
                        console.warn(`Unknown frame image position: '${position}'`);
                }
            };
            drawImage = async (frameImagePath, frameConfig, background) => {
                const image = await jimp_2.default.read(frameImagePath);
                const y = background.bitmap.height - image.bitmap.height;
                const x = calculateAlignment(frameConfig.position, image.bitmap.width, background.bitmap.width);
                return background.composite(image, x, y);
            };
            prepareBackground = (width, height, color) => {
                return new jimp_2.default(width, height, color);
            };
            /*
            *   Single frame compositor
            *   Write the frame as an image.
            */
            exports_3("compose", compose = async (frameConfig, framePath, constants) => {
                // todo: Move this one level up and merge it in the frame config 
                const imagePath = frameConfig.src.replace("{workingdir}", process.cwd());
                const background = prepareBackground(constants.width, constants.height, constants.bgColor);
                const frame = await drawImage(imagePath, frameConfig, background);
                const frameWithText = await drawText(frameConfig, constants, frame);
                await frameWithText.writeAsync(framePath);
                return framePath;
            });
        }
    };
});
System.register("src/strip/footer-compositor", ["jimp"], function (exports_4, context_4) {
    "use strict";
    var jimp_3, compose;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (jimp_3_1) {
                jimp_3 = jimp_3_1;
            }
        ],
        execute: function () {
            /*
                Footer compositor - export footer to the temporary path
            */
            exports_4("compose", compose = async (config, path, constants) => {
                const font = await jimp_3.default.loadFont(constants.font);
                await new jimp_3.default(constants.width, constants.height, constants.bgColor)
                    .print(font, constants.padding, 0, {
                    text: config.author,
                    alignmentX: jimp_3.default.HORIZONTAL_ALIGN_LEFT,
                    alignmentY: jimp_3.default.VERTICAL_ALIGN_MIDDLE,
                }, constants.width, constants.height)
                    .print(font, -constants.padding, 0, {
                    text: config.date,
                    alignmentX: jimp_3.default.HORIZONTAL_ALIGN_RIGHT,
                    alignmentY: jimp_3.default.VERTICAL_ALIGN_MIDDLE,
                }, constants.width, constants.height)
                    .writeAsync(path);
                return path;
            });
        }
    };
});
System.register("src/strip/strip-compositor", ["src/strip/header-compositor", "src/strip/frame-compositor", "src/strip/footer-compositor", "path"], function (exports_5, context_5) {
    "use strict";
    var header_compositor_1, frame_compositor_1, footer_compositor_1, path_1, StripCompositor;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (header_compositor_1_1) {
                header_compositor_1 = header_compositor_1_1;
            },
            function (frame_compositor_1_1) {
                frame_compositor_1 = frame_compositor_1_1;
            },
            function (footer_compositor_1_1) {
                footer_compositor_1 = footer_compositor_1_1;
            },
            function (path_1_1) {
                path_1 = path_1_1;
            }
        ],
        execute: function () {
            './header-compositor';
            StripCompositor = class StripCompositor {
                constructor(constants, tempDirPath) {
                    this.constants = constants;
                    this.tempDirPath = tempDirPath;
                    this.footerPath = '';
                    this.headerPath = '';
                    this.framePaths = [];
                }
                async header(headerConfig) {
                    const headerPath = path_1.default.resolve(this.tempDirPath, 'header.png');
                    this.headerPath = await header_compositor_1.compose(headerConfig, headerPath, this.constants.header);
                    return this;
                }
                async frames(frameConfigs) {
                    this.framePaths = [];
                    const runningFrameCompositions = [];
                    frameConfigs.forEach((f, i) => {
                        const framePath = path_1.default.resolve(this.tempDirPath, `${i}.png`);
                        this.framePaths.push(framePath);
                        runningFrameCompositions.push(frame_compositor_1.compose(f, framePath, this.constants.frame));
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
                    const footerPath = path_1.default.resolve(this.tempDirPath, 'footer.png');
                    this.footerPath = await footer_compositor_1.compose(footerConfig, footerPath, this.constants.footer);
                    return this;
                }
                /**
                 *
                 * @returns path to resulting image
                 */
                export(exporter, outputPath) {
                    return exporter(this.headerPath, this.framePaths, this.footerPath, this.constants, outputPath);
                }
            };
            exports_5("StripCompositor", StripCompositor);
        }
    };
});
System.register("src/strip/exporters/strip-exporter", ["jimp"], function (exports_6, context_6) {
    "use strict";
    var jimp_4, calculateWidth, calculateHeight, stripExporter;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (jimp_4_1) {
                jimp_4 = jimp_4_1;
            }
        ],
        execute: function () {
            calculateWidth = (constants) => {
                return constants.header.width + 2 * constants.strip.border;
            };
            calculateHeight = (constants, frameCount) => {
                return constants.header.height +
                    (3 + frameCount) * constants.strip.border +
                    frameCount * constants.frame.height +
                    constants.footer.height;
            };
            exports_6("stripExporter", stripExporter = async (headerPath, framePaths, footerPath, constants, output) => {
                const header = await jimp_4.default.read(headerPath);
                const frames = await Promise.all(framePaths.map(fp => jimp_4.default.read(fp)));
                const footer = await jimp_4.default.read(footerPath);
                const width = calculateWidth(constants);
                const height = calculateHeight(constants, framePaths.length);
                let result = new jimp_4.default(width, height, constants.strip.bgColor);
                const border = constants.strip.border;
                let x = border;
                let y = border;
                result = result.composite(header, x, y);
                y += (border + header.bitmap.height);
                frames.forEach(f => {
                    result = result.composite(f, x, y);
                    y += (border + f.bitmap.height);
                });
                result = result.composite(footer, x, y);
                await result.writeAsync(output);
            });
        }
    };
});
System.register("src/strip/strip", ["src/strip/strip-compositor", "src/strip/exporters/strip-exporter"], function (exports_7, context_7) {
    "use strict";
    var strip_compositor_1, strip_exporter_1, fs, path, tempDirPath, strip;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (strip_compositor_1_1) {
                strip_compositor_1 = strip_compositor_1_1;
            },
            function (strip_exporter_1_1) {
                strip_exporter_1 = strip_exporter_1_1;
            }
        ],
        execute: function () {
            fs = require('fs');
            path = require('path');
            tempDirPath = 'strip_tmp';
            exports_7("strip", strip = async (config, constants, resultFilePath) => {
                if (fs.existsSync(tempDirPath)) {
                    fs.rmdirSync(tempDirPath, { recursive: true });
                }
                fs.mkdirSync(tempDirPath);
                let compositor = new strip_compositor_1.StripCompositor(constants, tempDirPath);
                compositor = await compositor.frames(config.frames);
                compositor = await compositor.header(config.header);
                compositor = await compositor.footer(config.footer);
                await compositor.export(strip_exporter_1.stripExporter, resultFilePath);
                //await compositor.export(singleFrameExporter);
            });
        }
    };
});
System.register("src/main", ["src/process-argv", "fs", "src/strip/strip"], function (exports_8, context_8) {
    "use strict";
    var process_argv_1, fs, strip_1;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (process_argv_1_1) {
                process_argv_1 = process_argv_1_1;
            },
            function (fs_1) {
                fs = fs_1;
            },
            function (strip_1_1) {
                strip_1 = strip_1_1;
            }
        ],
        execute: function () {
            process_argv_1.processArgv(process.argv).then(argv => {
                const configPath = argv.i;
                const configStr = fs.readFileSync(configPath).toString();
                const config = JSON.parse(configStr);
                const constants = JSON.parse(fs.readFileSync('constants.json').toString());
                // Draw the strip
                strip_1.strip(config, constants, argv.o);
            });
        }
    };
});
