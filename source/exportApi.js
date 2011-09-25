/*
    List unit tests
    (c) 2011 TORRES Frederic
    freely distributable under the MIT license.
*/
///////////////////////////////////////////////////////////////////////////////
///
function print(s){
    if(console!==undefined)
        console.log(s);
}
function isNodeJs() {
    return (typeof require === "function" && typeof Buffer === "function" && typeof Buffer.byteLength === "function" && typeof Buffer.prototype !== "undefined" && typeof Buffer.prototype.write === "function");
}
if(isNodeJs()){
    var fs = require('fs');
    var _  = require('../source/sys');
    var _  = require('../source/String');
    var _  = require('../source/List');
    var _  = require('../source/File');
}

function ApiExporter(){
    var
        _functionsToIgnore  = new List("constructor","length");

    this.export = function(className){
        var
            _functions      = new List(),
            _properties     = new List(),
            functionName    = null,
            line            = null,
            lines           = new List(System.IO.File.readAllText(className+".js").split('\r\n'));

        print("\n\n  ***{0}***".format(className));
        print("===============");

        for(i=0; i<lines.count; i++){

            line = lines[i];

            if(line.contains(".prototype.")) {
                line.match(/.*\.prototype\.([A-Z,a-z,0-9,_,\$]*)(.*)/);
                functionName = RegExp.$1;
                if(!_functionsToIgnore.contains(functionName))
                    if((sys.hasValue(functionName))&&(!_functions.contains(functionName))&&(!functionName.startsWith("__")))
                        _functions.add(functionName);
            }
            if(line.contains("function")) {
                line.match(/.*\.([A-Z,a-z,0-9,_,\$]*)\s+=\s+function/);
                functionName = RegExp.$1;
                if(!_functionsToIgnore.contains(functionName))
                    if((sys.hasValue(functionName))&&(!_functions.contains(functionName))&&(!functionName.startsWith("__")))
                        _functions.add(functionName);
            }

            //_sys.isTypeDate = function(d) {

            if(line.contains("defineProperty")) {
                line.match(/.*defineProperty.*"([A-Z,a-z,0-9,_,\$]*)".*/);
                functionName = RegExp.$1;
                if(!_functionsToIgnore.contains(functionName))
                    if((sys.hasValue(functionName))&&(!_functions.contains(functionName))&&(!functionName.startsWith("__")))
                        _properties.add(functionName);
            }
        }
        _properties.sort();
        _functions.sort();
        if(_properties.count>0){
            print("\n    Properties");
            for(i=0; i<_properties.count; i++)
                print("      {0}".format(_properties[i]));
        }

        print("\n    Methods");
        for(i=0; i<_functions.count; i++)
            print("      {0}()".format(_functions[i]));
    }
}

print("js.lib");
print("======");

print("My attempt to a re-usable JavaScript standard library inspired by the .NET library");
print("\nTORRES Frederic 2011");
print("\nMit Style License");
print("\n");

var ae = new ApiExporter();
ae.export("List");
ae.export("String");
ae.export("Stack");
ae.export("Sys");

