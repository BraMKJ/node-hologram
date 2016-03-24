/// <reference path="../libs/node.d.ts" />
"use strict";
var fs = require('fs');
var View_1 = require('./modules/View');
var Data_1 = require('./modules/Data');
var Main = (function () {
    function Main(options) {
        this.reset(options);
        // Data to be passed to view
        this.data = {};
        this.data.title = this.title;
        this.data.colors = this.colors;
        this.data.script = this.scripts.main;
        this.data.stylesheet = this.styles.main;
        this.data.customStylesheet = this.customStylesheet;
        this.data.hologramStylesheet = fs.readFileSync(__dirname + "/styles/main.css", 'utf8');
    }
    Main.prototype.reset = function (options) {
        this.root = options.root;
        this.dest = options.dest;
        this.styles = options.styles;
        // optional
        this.ext = options.ext || {
            styles: 'scss',
            scripts: 'js'
        };
        this.title = options.title || '';
        this.colors = options.colors || '';
        this.scripts = options.scripts || '';
        this.customStylesheet = options.customStylesheet || '';
    };
    Main.prototype.init = function () {
        var _this = this;
        var _data = new Data_1.Data(this.root);
        var _view = new View_1.View(this.root + this.dest);
        var appLayout = fs.readFileSync(__dirname + "/templates/layout.hbs", 'utf8');
        var exampleLayout = fs.readFileSync(__dirname + "/templates/example.hbs", 'utf8');
        if (this.styles) {
            this.data.styles = _data.get(this.styles.dir, this.ext.styles);
            this.data.styles
                .filter(function (x) { return x.example; })
                .map(function (x) { return _view.create(x.name, { app: _this.data, data: x }, exampleLayout); });
        }
        if (this.scripts) {
            this.data.scripts = _data.get(this.scripts.dir, this.ext.scripts);
            this.data.scripts
                .filter(function (x) { return x.example; })
                .map(function (x) { return _view.create(x.name, { app: _this.data, data: x }, exampleLayout); });
        }
        if (this.styles || this.scripts) {
            _view.create('index', this.data, appLayout);
        }
        else {
            console.error('Hologram failed.');
            console.error('Please check you have correctly configured your Hologram options.');
        }
    };
    return Main;
}());
module.exports = function (_) { return new Main(_); };
//# sourceMappingURL=Main.js.map