# Node Hologram

Inspired by [Hologram](https://github.com/trulia/hologram).

Allows for the easy generation of styleguides from markdown documentation.

## Usage

__Ensuring you have a version of node >= 4 installed.__

```
npm install --save-dev node-hologram
```

Then require in your script file:

```javascript
const hologram = require('node-hologram')(options);
hologram.init();
```

Hologram will then scan the directories specified in the options parameter,
accessing any file ending in the correct file extension (see options `ext`).
If the file's first comment is suffixed with the word `doc` hologram will
then take the contents of this comment and attempt to convert it to markdown
which will then be used to create a styleguide.

__Example Doc__

```markdown
/*doc

## Example

_I am some markdown_

Docs for the example component.

Put example html inside the <example> tag. This will be extracted and
placed in an iframe.

`` `
<h2>Code snippet inside the doc</h2>
`` `

<example>
    <h2>I will be rendered as HTML</h2>
<example>


*/
```

__Components in Docs__

Example components can be placed inside the markdown docs.
They should be placed inside an `<example>` tag, like so:

```html
<example>
    <h2>I will be extracted and placed in an iframe.</h2>
</example>
```

The content inside the `example` tag will be extracted and placed in it's own html page.
It will then be iframed into the styleguide. The reason for this is to prevent styleguide specific
styles from affecting the example content.

__NB__:

 - If the word `doc` is not present in the first line of the comment that file will be ignored.
 - Only the first correctly formatted comment will be used. Eg: One doc per file.
 - Only the first `<example>` of each doc will be extracted, Eg: One example per file.


## Options

__root__ `required`

The root of your project. All paths provided should be relevant to this.
By default you should pass in `__dirname`, unless in a specific circumstance.

```javascript
root: __dirname
```

__dest__ `required`

The path to the folder where the styleguide generated by Hologram will be placed.

```javascript
dest: '/path/to/dest'
```

__styles__ `required`

Information on which folders your stylesheets are contained in (`dir`).
Hologram will scan these folders looking for files with the correct
extension (`scss` by default, can be changed using `ext` option),
as well the path to the compiled stylesheet (`main`).

```javascript
styles: {
    dir: ['/path/to/dir', '/path/to/other'],
    main: '/path/to/mycompiledcss.css'
}
```

__ext__ `optional`

The file extensions which will be used by Hologram, defaults to `scss` and `js`.
Compatible with `less`, `css`, `ts`, `jsx`.

```javascript
ext: {
    styles: 'scss',
    scripts: 'js'
}
```

__title__ `optional`

The title of your styleguide. Will be displayed above documentation list.

```javascript
title: 'My awesome app'
```

__colors__ `optional`

The styleguide's color pallette, will be displayed at the top of
the documentation list and below the title.

```javascript
colors: {
    red: '#f00',
    green: '#0f0',
    blur: '#00f'
}
```

__webfonts__ `optional`

The styleguide's webfonts, will be displayed at the top of
the documentation list and below the title.

```javascript
webfonts: {
    'Roboto': 'https://fonts.googleapis.com/css?family=Roboto',
    'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans'
}
```

__scripts__ `optional`

Information on which folders your scripts are contained in (`dir`).
Hologram will scan these folders looking for files with the correct
extension (`js` by default, can be changed using `ext` option),
as well the path to the compiled script file (`main`).

```javascript
scripts: {
    dir: ['/path/to/dir', '/path/to/other'],
    main: '/path/to/myscript.js'
}
```

__customStylesheet__ `optional`

Add a custom stylesheet to the style guide.
This approach is recommended as it will allow you to *brand* the styleguide.
A template stylesheet is provided [here](https://github.com/BrianDGLS/node-hologram/blob/develop/hologram/styles/template.css).

```javascript
customStylesheet: '/path/to/customStylesheet.css'
```

__highlight__ `optional`

Add [highlight.js](https://highlightjs.org/) to the style guide.
This option is enabled by default.


```javascript
hightlightjs: true
```

__idelink__ `optional`

Add support for IDE protocols to open files containing hologram docs.

The generated link will have the following format: 
`%protocol%://open/?url=file://%file%&line=1`

A general icon is provided for any IDE.

Following IDE are provided with a custom icon

- [Sublime Text](https://www.sublimetext.com/) `sublime : '...'`
- [Phpstorm](https://www.jetbrains.com/phpstorm/) `phpstorm : '...'`
- [Textmate](https://macromates.com/) `textmate : '...'` 

You may need to download a plugin for your IDE.

i.e.

- [SublimeText](https://github.com/dhoulb/subl),
- [PhpStorm](https://github.com/aik099/PhpStormProtocol)

This option is disabled by default.

```javascript
idelink: {
    idename : 'protocol',
    otheridename : 'otherprotocol'
}
```

## Examples

__Gulp__

```javascript

// Require gulp
const gulp = require('gulp');

// Define options that will be passed to hologram
const options = {
    root: __dirname,
    ext: {
        styles: 'scss',
        scripts: 'js'
    },
    dest: '/path/to/dest',
    title: 'My awesome app',
    customStylesheet: '/path/to/customStylesheet.css',
    colors: {
        red: '#f00',
        green: '#0f0',
        blut: '#00f'
    },
    webfonts: {
        'Roboto': 'https://fonts.googleapis.com/css?family=Roboto',
        'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans',
    }
    styles: {
        dir: ['/path/to/dir', '/path/to/other'],
        main: '/path/to/mycompiledcss.css'
    },
    scripts: {
        dir: ['/path/to/dir', '/path/to/other'],
        main: '/path/to/myscript.js'
    },
    hightlight : false,
    idelink : {
        phpstorm : 'phpstorm',
        sublime : 'subl'
        textmate : 'txmt'
    }
};

// Require hologram passing in the desired options
const hologram = require('node-hologram')(options);

// Call hologram.init() to generate the styleguide
gulp.task('hologram', () => hologram.init());

```
