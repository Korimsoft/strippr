# Strippr
Comic strip compositor - take source images and composite them into a comic strip with an easy JSON configuration.

**Example usage**
```
$ strippr --in example/strip.json --out myoutputdirectory
```

## Building the Project

Gulp is used as a build automation tool.
For development, use `gulp dev` to build the source code with sourcemaps.

## Command Line Arguments
* `--in`: an input strip configuration file
* `--out`: an optional output directory for the strip and/or frames. 
If this argument is omitted, pictures are exported into the current working directory.

## Configuration

The comic strip is generated from a combination of 2 files: A global configuration file and a strip configuration file.
Options specified in the strip configuration file take precedence before the options stated in the global configuration file.

### Global Configuration

Located in resources/config/global-config.json

### Strip Configuration

Specified by the `--in` argument.

### Configuration Options

Configuration options are described by TypescriptFiles in the `src/config/model` location.
For paths, special shortcuts may be used to define program or strip config directory file. These are `{programdir}` and `{workingdir}`.

### Custom Fonts

To use custom fonts, put them into `resources/fonts` directory and then update your global config file.
Fonts are loaded by Jimp which, unfortunately supports only bitmap fonts (BMFont format) right now.
You can use for example https://snowb.org/ for transforming to .fnt.
