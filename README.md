# Strippr
Comic strip compositor - take source images and composite them into a comic strip with an easy JSON configuration.

Example of usage

```
strippr --in example/strip.json --out example.png
```

## Building the Project

Gulp is used as a build automation tool.
For development, use `gulp dev` to build the source code with sourcemaps.

## Custom Fonts

To use custom fonts, put them into resources/fonts directory and then update your global config file.
Fonts are loaded by Jimp which, unfortunately supports only bitmap fonts (BMFont format) right now.
You can use for example https://snowb.org/ for transforming to .fnt.
