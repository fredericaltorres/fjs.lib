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

  
Date.YYYYMMDD              = "YYYY/MM/DD";
Date.YYYYMMDD_HHMMSS       = "YYYY/MM/DD HH:MM:SS";
Date.MMDDYYYY              = "MM/DD/YYYY"; // Default USA Format
Date.MMDDYYYY_HHMMSS       = "MM/DD/YYYY HH:MM:SS"; // Default USA Format
Date.DDMMYYYY              = "DD/MM/YYYY"; // Euro Format
Date.DDMMYYYY_HHMMSS       = "DD/MM/YYYY HH:MM:SS"; // Euro Format
Date.ISO                   = "toISOString";

if (typeof Date.prototype.format !== 'function') {

    Date.prototype.format = function(formatString) {
        /// <summary>Format a date based on a format</summary>
        /// <param name="d" type="Date" optional="false">The date to format</param>
        /// <param name="formatString" type="String" optional="false">[OPTIONAL:JyOS.Date.MMDDYYYY]The format. See JyOS.Date.YYYYMMDD, JyOS.Date.MMDDYYYY, JyOS.Date.DDMMYYYY, JyOS.Date.ISO</param>
        /// <returns type="TYPE">No Description</returns>
        var 
            v;

        var d = this;

        if(formatString === Date.ISO) {
            return d.toISOString();
        }
        
        formatString = formatString || Date.MMDDYYYY;
         
        var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri", "Sat"]
     
        var
            YYYY        = d.getFullYear(),
            YY          = d.getFullYear()-2000,
            MM          = (""+(d.getMonth()+1)).leftPad("0", 2),
            dd          = (""+d.getDate()).leftPad("0", 2),
            hh          = (""+d.getHours()).leftPad("0", 2),
            mm          = (""+d.getMinutes()).leftPad("0", 2),
            ss          = (""+d.getSeconds()).leftPad("0", 2),
            milli       = (""+d.getMilliseconds()).leftPad("0", 3),
            day         = d.getDay(),
            DayOfWeek   = weekday[d.getDay()];
            
        v = formatString;
        v = v.replace(new RegExp('YYYY', 'gm'), YYYY);
        v = v.replace(new RegExp('YY'  , 'gm'), YY);
        v = v.replace(new RegExp('MM'  , 'gm'), MM);
        v = v.replace(new RegExp('DD'  , 'gm'), dd);         
        v = v.replace(new RegExp('HH'  , 'gm'), hh);
        v = v.replace(new RegExp('mm'  , 'gm'), mm);
        v = v.replace(new RegExp('SS'  , 'gm'), ss);
        v = v.replace(new RegExp('DAY' , 'gm'), DayOfWeek);
        v = v.replace(new RegExp('DAYN', 'gm'), day);
         
        return v;
    }
}