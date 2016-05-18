/// <reference path="../typings/index.d.ts" />

import * as fs from 'fs';
import * as path from 'path';
import View from './modules/View';
import Data from './modules/Data';

namespace Hologram {

    interface Options {
        root:string;
        dest:string;
        styles:any;
        ext?:any;
        title?:string;
        description?:string;
        colors?:string;
        webfonts?:string;
        scripts?:any;
        customStylesheet?:string;
        highlight?:boolean;
    }

    class Main implements Options {
        ext:any;
        data:any;
        styles:any;
        root:string;
        dest:string;
        title:string;
        description:string;
        colors:string;
        webfonts:string;
        scripts:any;
        customStylesheet:string;
        highlight:boolean;

        constructor(options:any) {
            this.reset(options);

            // Data to be passed to view
            this.data = {};
            this.data.title = this.title;
            this.data.description = this.description;
            this.data.colors = this.colors;
            this.data.webfonts = this.webfonts;
            this.data.script = this.scripts.files;
            this.data.stylesheet = this.styles.files;
            this.data.customStylesheet = this.customStylesheet;
            this.data.highlight = this.highlight;
            this.data.hologramStylesheet = fs.readFileSync(path.join(__dirname, '../styles/main.css'), 'utf8');
        }

        private reset(options:any):void {
            this.root = options.root;
            this.dest = options.dest;
            this.styles = options.styles;

            // optional
            this.ext = options.ext || {styles: 'scss', scripts: 'js'};
            this.title = options.title || '';
            this.description = options.description || '';
            this.colors = options.colors || '';
            this.webfonts = options.webfonts || '';
            this.scripts = options.scripts || '';
            this.customStylesheet = options.customStylesheet || '';
            this.highlight = options.highlight || true;
        }

        public init():void {
            const _data = new Data(this.root);
            const _view = new View(this.root + this.dest);

            let templatesDir:string = path.join(__dirname, '../templates/');
            const appLayout = fs.readFileSync(templatesDir + 'layout.hbs', 'utf8');
            const exampleLayout = fs.readFileSync(templatesDir + 'example.hbs', 'utf8');


            if (this.styles) {
                this.data.styles = _data.get(this.styles.dir, this.ext.styles);

                // Meta
                this.data.styles
                    .filter(x => x.meta)
                    .map(x => {
                        let meta = x.meta;
                        if (meta.colors) {
                            Object.keys(meta.colors).forEach(k => {
                                this.data.colors[k] = meta.colors[k];
                            });
                        }
                    });

                // Views
                this.data.styles
                    .filter(x => x.example.length > 1)
                    .map(x => _view.create(x.name, {app: this.data, data: x}, exampleLayout));
            }

            if (this.scripts) {
                this.data.scripts = _data.get(this.scripts.dir, this.ext.scripts);
                this.data.scripts
                    .filter(x => x.example.length > 1)
                    .map(x => _view.create(x.name, {app: this.data, data: x}, exampleLayout));
            }

            if (this.styles || this.scripts) {
                _view.create('index', this.data, appLayout);
            } else {
                console.error('Hologram failed.');
                console.error('Please check you have correctly configured your Hologram options.');
            }
        }
    }

    module.exports = _ => new Main(_);

}

