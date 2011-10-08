/*
Trace.js
(c) 2011 TORRES Frederic
Freely distributable under the MIT license.

    - Works in a browser or in nodeJS
*/
TRACE = (function(){
    var
        _trace = {};

    _trace.TRACE_ON = false;
    
    ///////////////////////////////////////////////////////////////////////////////
    /// __isConsoleAvailable
    /// In IE9, the console is only avalaible is the Debugging window is open (F12).
    _trace.__isConsoleAvailable = function () {

        return typeof (console) !== 'undefined';
    }
    _trace.TRACE = function (s) {

        if (!this.TRACE_ON) return;
        if (this.__isConsoleAvailable())
            console.log(s);
    }
    _trace.SHOW_ERROR = function (ex, msg) {
    
        if(sys.isNullOrUndefined(ex)) 
            ex = { message:"no exception"};

        if(sys.isNullOrUndefined(msg)) { // Only the first parameter is defined

            this.TRACE_ERROR(ex);
            alert("Error:{0}".format(ex));
        }
        else {
            this.TRACE_ERROR(ex);
            alert("Error:{0}\n{1}".format(msg, ex.message));
        }
    }
    _trace.STACK_TRACE = function () {

        if (this.__isConsoleAvailable())
            if (!sys.isNullOrUndefined(console.trace))
                console.trace();
    }
    _trace.TRACE_ERROR = function (s) {

        if (this.__isConsoleAvailable()) {

            if (s instanceof Error){
                if(console.error)
                    console.error(s.message);
                else 
                    console.log("[ERROR]"+s.message);
            }
            else {
                if(console.error)
                    console.error(s);
                else 
                    console.log("[ERROR]"+s);
            }
            this.STACK_TRACE();
        }
    }
    _trace.TRACE_WARNING = function (s) {

        if (!this.TRACE_ON) 
            return;
        if (this.__isConsoleAvailable()) {
            if(console.warn)
                console.warn(s);
            else         
                console.log("[WARNING]"+s);
        }
    }
    _trace.TRACE_VALUE = function (v){
        var 
            t = sys.getType(v);
        if(v==="String" || v==="Date")
            return "'{0}'".format(v);
        return v;
    }
    _trace.TRACE_ARRAY = function (a){
        var 
            i, a2 = [];

        if(Array.isArray(a)){

            for(i=0; i < math.min(a.length, 10); i++)
                a2.push(this.TRACE_VALUE(a[i]));
            return "[ " + a2.join(", ") + " ]";
        }
        else return a;
    }
    _trace.TRACE_METHOD = function (o, m, args) {
        var 
            i, v, paramsArray = [];

        if (!this.TRACE_ON) 
            return;

        if(sys.isFunction(o))
            o = "function constructor";

        if (this.__isConsoleAvailable()){

            var argsArray = Array.prototype.slice.call(args);
            var argsCsv   = "";

            for(i=0; i<argsArray.length; i++){

                v = argsArray[i];

                if(sys.isFunction(v))
                    v = "function";
                else if(sys.isNull(v))
                    v = "null";
                else if(sys.isUndefined(v))
                    v = "undefined";
                else if(Array.isArray(v))
                    v = this.TRACE_ARRAY(v);
                else 
                    v = this.TRACE_VALUE(v);

                paramsArray.push(v);
            }
            var s = "{0}.{1}({2})".format(o.toString(), m, paramsArray.join(", "));
            console.log(s);
        }
    }
    _trace.ALERT = function (s) {

        TRACE.TRACE(s);
        if (isBrowser())
            alert(s);
    }
    return _trace;
})();

Sys = sys;