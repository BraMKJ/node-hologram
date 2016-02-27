# Node Hologram

A node clone of [Hologram](https://github.com/trulia/hologram).

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

```
/*doc

## Example

_I am some markdown_

Docs for the example component.

Code:

<h2>I will be rendered as HTML</h2>

```css
h2 {
    color: red;
}
` ``

*/
```

__NB__:
 - If the word `doc` is not present in the first line of the comment that file will be ignored.
 - Only the first correctly formatted comment will be used. Eg: One doc per file.


### Options

__root__ `required`

The root of your project. All paths provided should be relevant to this.
By default you should pass in `__dirname`, unless in a specific circumstance.

```javascript
root: __dirname
```

__dest__ `required`

The path to the folder where the styleguide generated by Hologram will be placed.

```javascript
dest: `/path/to/dest`
```

__styles__ `required`

Information on which folders your stylesheets are contained in (`dir`).
Hologram will scan these folders looking for files with the correct
extension (`scss` by default, can be changed using `ext` option).
as well the path to the compiled stylesheet (`main`).

```javascript
styles: {
    dir: ['path/to/dir', 'path/to/other'],
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

__scripts__ `optional`

Information on which folders your scripts are contained in (`dir`).
Hologram will scan these folders looking for files with the correct
extension (`js` by default, can be changed using `ext` option).
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
    dest: `/path/to/dest`,
    title: 'My awesome app',
    customStylesheet: '/path/to/customStylesheet.css',
    colors: {
        red: '#f00',
        green: '#0f0',
        blut: '#00f'
    },
    styles: {
        dir: ['path/to/dir', 'path/to/other'],
        main: '/path/to/mycompiledcss.css'
    },
    scripts: {
        dir: ['/path/to/dir', '/path/to/other'],
        main: '/path/to/myscript.js'
    }
};

// Require hologram passing in the desired options
const hologram = require('node-hologram')(options);

// Call hologram.init() to generate the styleguide
gulp.task('hologram', () => hologram.init());

```
