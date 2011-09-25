/*
System.IO.File
(c) 2011 TORRES Frederic
Freely distributable under the MIT license.

For node.js only
*/

var fs = require('fs');

if(typeof System === 'undefined')
    System = {};

System.IO       = System.IO         || {};
System.IO.File  = System.IO.File    || {};

if(!System.IO.File.readAllText){
    System.IO.File.readAllText = function(fileName){
        return fs.readFileSync(fileName).toString();
    }
}
