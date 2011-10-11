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
            case "d" : r =r/60/60/24; break;
        }
        return r;
    }
}
///////////////////////////////////////////////////////////////////////////////
///
if (typeof Date.prototype.addMinutes !== 'function') {

    Date.prototype.addMinutes = function (minutes) {

        this.setMinutes( this.getMinutes() + minutes);
    }
}
///////////////////////////////////////////////////////////////////////////////
///
if (typeof Date.prototype.addSeconds !== 'function') {

    Date.prototype.addSeconds = function (seconds) {

        this.setSeconds(this.getSeconds() + seconds);
    }
}
///////////////////////////////////////////////////////////////////////////////
///
/* if (typeof Date.prototype.addDays !== 'function') {

    Date.prototype.addDays = function (days) {

        this.setDate(this.getDate() + days);
    }
} */
if (typeof Date.prototype.formatIso !== 'function') {

    Date.prototype.formatIso = function () {
        var
            d = this,
            YYYY = d.getFullYear(),
            MM=(""+(d.getMonth()+1)).leftPad("0", 2),
            dd=(""+d.getDate()).leftPad("0", 2),
            hh=(""+d.getHours()).leftPad("0", 2),
            mm=(""+d.getMinutes()).leftPad("0", 2),
            ss=(""+d.getSeconds()).leftPad("0", 2),
            milli=(""+d.getMilliseconds()).leftPad("0", 3);

        return "{0}-{1}-{2} {3}:{4}:{5}:{6}".format(YYYY, MM, dd, hh, mm, ss, milli);
    }
}


