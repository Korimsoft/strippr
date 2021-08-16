# Strippr
Comic strip compositor - take source images and composite them into a comic strip with an easy JSON configuration.

**Example usage**
```
$ strippr --in example/strip.json --out myoutputdirectory
```

## Building the Project

Gulp is used as a build automation tool.
Use `gulp build` to build the source code with sourcemaps.

## Command Line Arguments
* `--in`: an input strip configuration file
* `--out`: an optional output directory for the strip and/or frames. 
If this argument is omitted, pictures are exported into the current working directory.

## Configuration

Comic strips are generated from a combination of 2 files: A global configuration file and a strip configuration file.
Options specified in the strip configuration file take precedence before the options stated in the global configuration file.

### Global Configuration

Located in resources/config/global-config.json, the global configuration file contains default values for the generator, e.g. frame background color, frame border, etc.

### Strip Configuration

Specified by the `--in` argument.

### Configuration Options

Configuration options are described by TypeScript files in the `src/config/model` location.
For paths, special shortcuts may be used to define program or strip config directory file. These are `{programdir}` that results to the program root directory and `{workingdir}` which results to the current working directory (_process.cwd()_).

### Custom Fonts

To use custom fonts, put them into `resources/fonts` directory and then update your global config file.
Fonts are loaded by Jimp which, unfortunately supports only bitmap fonts (BMFont format) right now.
You can use for example https://snowb.org/ for transforming to .fnt.
