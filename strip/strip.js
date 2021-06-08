const StripCompositor = require('./strip-compositor');

const strip = (config, constants) => {
    const strip = new StripCompositor(constants)
        .background(config)
        .header(config.header)
        .frames(config.frames)
        .footer(config.footer)
        .getResult();

    return {
        write: path => strip.write(path, (err) => { err && console.error(err)})
    }
}

module.exports=strip;