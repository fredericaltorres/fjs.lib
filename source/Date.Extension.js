/*
Date.Extension.js
(c) 2011 TORRES Frederic
Freely distributable under the MIT license.

    - Works in a browser or in nodeJS

*/


///////////////////////////////////////////////////////////////////////////////
///
if (typeof Date.prototype.diff !== 'function') {

    Date.prototype.diff = function (date2, /* string */unit /* = 's' */) {

        unit = unit || "s";

        var d = this.getTime() - date2.getTime();
        var r = d/1000;
        
        
        switch(unit){
            case "s" : break;
            case "m" : r =r/60; break;
            case "h" : r =r/60/60; break;            
        }
        return r;
    }
}