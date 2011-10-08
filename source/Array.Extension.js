/*
Array.Extension.js
(c) 2011 TORRES Frederic
Freely distributable under the MIT license.

    - Works in a browser or in nodeJS

Extend the Array object
*/
Array.range = function (max, inc) {
    ///	<summary>
    /// Return an array filled with numbers from 0 to max
    ///	</summary>
    ///	<param name="max" type="number"></param>
    ///	<param name="inc" type="number"></param>
    var 
        a = [];

    inc = inc || 1;
    for (i = 0; i < max; i += inc)
        a.push(i);
    return a;
}
///////////////////////////////////////////////////////////////////////////////
///
if (typeof Array.prototype.contains !== 'function') {

    Array.prototype.contains = function (v) {
        ///	<summary>
        /// Return true the value v in part of the array
        ///	</summary>
        ///	<param name="v" type="JavascriptType"></param>
        for (i = 0; i < this.length; i++)
            if (this[i] === v)
                return true;

        return false;
    }
}
///////////////////////////////////////////////////////////////////////////////
///
if (typeof Array.prototype.add !== 'function') {

    Array.prototype.add = function (v) {
        ///	<summary>
        /// Add the value v to the end of the array
        ///	</summary>
        ///	<param name="v" type="JavascriptType"></param>
        this.push(v);
    }
}
///////////////////////////////////////////////////////////////////////////////
if (typeof Array.prototype.format !== 'function') {

    Array.prototype.format = function (fmt, separator) {
        ///	<summary>
        /// Format the values of the array and return a string
        ///	</summary>
        ///	<param name="fmt" type="string">The template to format the string. The value is referenced by {0}</param>
        ///	<param name="separator" type="string">The separator</param>

        fmt       = fmt || "{0}";
        separator = separator || ",";
        var s    = "";
        for (var i = 0; i < this.length; i++) {
            s += fmt.format(this[i]);
            if (i < this.length - 1)
                s += separator;
        }
        return s;        
    }
}
