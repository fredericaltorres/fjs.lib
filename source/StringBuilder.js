/*
StringBuilder.js
(c) 2012 TORRES Frederic
Freely distributable under the MIT license.

Inspired from the .NET StringBuilder

*/

StringBuilder = function () {

    this.__init__ = function(){

        this.clear();
        return this;
    }
    this.append = function(s) {

        this._strings.push(s.toString());
        return this;
    }
    this.appendFormat = function(format) {

        var args        = Array.prototype.slice.call(arguments);
        var template    = args.shift();
        this.append(template.format.apply(template, args));
        return this;
    }
    this.appendLine = function(s) {

        this.append("\n");
        return this;
    }
    this.insert = function(index, s) {

        var r = this.toString();
        this.clear();
        this.append(r.insert(index, s));
        return this;
    }
    this.remove = function(index, count){

        var r = this.toString();
        this.clear();
        this.append(r.remove(index, count));
        return this;
    }
    this.replace = function(s){

        return this;
    }
    this.clear = function(){

        this._strings = [];
        return this;
    }
    this.getLength = function() {

        return this.toString().length;
    }
    this.toString = function() {

        return this._strings.join("");
    }
    this.__init__();
}

