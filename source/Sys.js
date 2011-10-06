/*
Sys.js
(c) 2011 TORRES Frederic
Freely distributable under the MIT license.

    - Works in a browser or in nodeJS
*/
sys = (function(){
    var
        _sys = {};

    _sys.getType = function(v) {

        var type;
        if (v === null)
            return "null";
        if (typeof v === 'undefined')
            return "undefined";
        if (typeof v === 'undefined')
            return "undefined";

        type = Object.prototype.toString.call(v);
        type = type.replace("[object ", "");
        type = type.replace("]", "");
        return type;
    }
    _sys.isString = function(s) {
        ///	<summary>
        /// return true if variable s if of type string
        ///	</summary>
        ///	<param name="s" type="string">A variable</param>
        return typeof (s) === "string";
    }
    _sys.isFunction = function(m) {
        ///	<summary>
        /// return true if m is of type method/function
        ///	</summary>
        ///	<param name="m" type="Function">A variable</param>
        return typeof(m) === 'function';
    }
    _sys.isMethod = function(m) {
        ///	<summary>
        /// return true if m is of type method/function
        ///	</summary>
        ///	<param name="m" type="Function">A variable</param>
        return this.isFunction(m);
    }
    _sys.isTypeDate = function(d) {
        ///	<summary>
        /// Returns true if d is of type date
        ///	</summary>
        ///	<param name="d" type="Date"></param>
        if(this.isNullOrUndefined(d)){
            //console.log("isTypeDate called");
            return false;
        }
        return this.isMethod(d.getMonth) && this.isMethod(d.getFullYear);
    }
    _sys.hasMethod = function(o, m) {
        ///	<summary>
        /// Returns true if object o has a method m
        ///	</summary>
        ///	<param name="o" type="object">The object</param>
        ///	<param name="m" type="string">The method name as a string</param>
        return typeof (o[m]) === 'function';
    }
    _sys.isNull = function(v) {
        ///	<summary>
        /// Returns true if v is null
        ///	</summary>
        ///	<param name="v" type=""></param>
        return (v === null);
    }
    _sys.isUndefined = function(v) {
        ///	<summary>
        /// Returns true if v is undefined
        ///	</summary>
        ///	<param name="v" type=""></param>
        return (typeof v == "undefined");
    }
    _sys.isNullOrUndefined = function(v) {
        ///	<summary>
        /// Returns true if v is null or undefined
        ///	</summary>
        ///	<param name="v" type=""></param>
        return (v === null) || (typeof v == "undefined");
    }
    _sys.ifUndefined = function(v, defaultVal) {
        ///	<summary>
        /// Returns v if v is defined. if v is undefined returns defaultVal
        ///	</summary>
        ///	<param name="v" type=""></param>
        ///	<param name="defaultVal" type="">The default value</param>
        return this.isUndefined(v) ? defaultVal : v;
    }
    _sys.ifNullOrUndefined = function(v, defaultVal) {
        ///	<summary>
        /// Returns v if v is defined. if v is undefined returns defaultVal
        ///	</summary>
        ///	<param name="v" type=""></param>
        ///	<param name="defaultVal" type="">The default value</param>
        var vv = isNullOrUndefined(v) ? defaultVal : v;
        return vv;
    }
    _sys.ifDefined = function(v, defaultVal) {
        ///	<summary>
        /// Returns v if v is defined. if v is undefined returns defaultVal
        ///	</summary>
        ///	<param name="v" type=""></param>
        ///	<param name="defaultVal" type="">The default value</param>
        return (this.ifUndefined(v, defaultVal))
    }
    _sys.defaultValue = function(v, defaultVal) {
        ///	<summary>
        /// Returns v if v is defined. if v is undefined returns defaultVal
        ///	</summary>
        ///	<param name="v" type=""></param>
        ///	<param name="defaultVal" type="">The default value</param>
        return (this.ifUndefined(v, defaultVal))
    }
    _sys.isDefined = function(v) {
        ///	<summary>
        /// Returns true if v is defined
        ///	</summary>
        ///	<param name="" type="string"></param>
        return !this.isUndefined(v);
    }
    _sys.hasValue = function(v) {
        ///	<summary>
        /// Returns true if v not undefined, not null and not an empty string
        ///	</summary>
        ///	<param name="" type="string"></param>
        var
            s = "" + v;

        if (this.isNullOrUndefined(v)) return false;
        return s.length > 0;
    }
    _sys.Inherit = function(Super, Class) {
        ///	<summary>
        /// Make instance Class inherits from the Super
        ///	</summary>
        ///	<param name="Super" type="object">The base class</param>
        ///	<param name="Class" type="object">The instance</param>
        var
            method = null;
    
        if (!isNullOrUndefined(Super)) {
    
            if (!isNullOrUndefined(Super.prototype)) {
    
                for (var method in Super.prototype)
                    Class.prototype[method] = Super.prototype[method];
            }
            for (var method in Super)
                Class.prototype[method] = Super.prototype[method];
        }
    }
    ///////////////////////////////////////////////////////////////////////////////
    /// print
    ///////////////////////////////////////////////////////////////////////////////
    _sys.__consoleExists = function() {
        ///	<summary>
        /// Returns true if the console object is available, in IE and FireFox the console
        /// object is not always available
        ///	</summary>
        ///	<param name="" type="string"></param>
        var
            c;
        try {
            c = console;
            return true;
        }
        catch (ex) {
        }
        return false;
    }
    _sys.__print = function() {
        ///	<summary>
        /// bla bla
        ///	</summary>
        ///	<param name="" type="string"></param>
        var
            i = 0,
            r = null,
            values = [];
    
        for (i = 0; i < arguments.length; i++)
            values.push(arguments[i])

        r = values.join();
    
        if (__consoleExists())
            console.log(r);
    
        return r;
    }
    if (typeof (print) === undefined) { // Print is defined in IE
        print = __print;
    }
    _sys.isNodeJs = function() {
        ///	<summary>
        /// bla bla
        ///	</summary>
        ///	<param name="" type="string"></param>
        return (typeof require === "function" && typeof Buffer === "function" && typeof Buffer.byteLength === "function" && typeof Buffer.prototype !== "undefined" && typeof Buffer.prototype.write === "function");
    }
    _sys.isBrowser = function() {
        ///	<summary>
        /// bla bla
        ///	</summary>
        ///	<param name="" type="string"></param>
        return (typeof window !== undefined);
    }
    return _sys;
})();

Sys = sys;