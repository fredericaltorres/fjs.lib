/*
string.js

(c) 2011 TORRES Frederic
Freely distributable under the MIT license.
    - Works in a browser or in nodeJS
    - All the methods are extension method of the class string
*/
///////////////////////////////////////////////////////////////////////////////
/// String Extensions
///////////////////////////////////////////////////////////////////////////////
String.prototype.capitalize = function () {
    ///	<summary>
    /// Capitalize the string, 
    /// by removing the space and changing the first letter of each word to an uppercase
    ///	</summary>
    return this.replace(/(^|\s)([a-z])/g, function (m, p1, p2) { return p1 + p2.toUpperCase(); });
};
String.prototype.leftPad = function (padString, length) {
    ///	<summary>
    /// Pad the string on the left    
    ///	</summary>
    ///	<param name="padString" type="string">The character to use for the padding</param>
    ///	<param name="length" type="number">The max size of the string to reach</param>
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
String.prototype.rightPad = function (padString, length) {
    ///	<summary>
    /// Pad the string on the right
    ///	</summary>
    ///	<param name="padString" type="string">The character to use for the padding</param>
    ///	<param name="length" type="number">The max size of the string to reach</param>
    var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}
String.prototype.trim = function () {
    ///	<summary>
    /// Trim the string on the left and on the right
    ///	</summary>
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.leftTrim = function () {
    ///	<summary>
    /// Trim the string on the left
    ///	</summary>
    return this.replace(/^\s+/, "");
}
String.prototype.rightTrim = function () {
    ///	<summary>
    /// Trim the string on the right
    ///	</summary>
    return this.replace(/\s+$/, "");
}
String.prototype.contains = function (str) {
    ///	<summary>
    /// Return true if the string contains a specific sub string
    ///	</summary>
    ///	<param name="str" type="string">The string to search</param>
    var 
        pos = this.indexOf(str);
    return pos !== -1;
}
String.prototype.startsWith = function (str) { 
    ///	<summary>
    /// Return true if the string start with a specific string
    ///	</summary>
    ///	<param name="str" type="string">The string to start with</param>
    return (this.indexOf(str) === 0); 
}
String.prototype.endsWith = function (str) {
    ///	<summary>
    /// Return true if the string end with a specific string
    ///	</summary>
    ///	<param name="str" type="string">The string to end with</param>
    var lastIndex = this.lastIndexOf(str);
    return (lastIndex != -1) && (lastIndex + str.length == this.length);
}
///////////////////////////////////////////////////////////////////////////////
// format()
//
// Usage:
//      "LastName:{lastName}, Age:{Age}".format({ lastName:"TORRES", Age:45 });
//
//      "LastName:{0}, Age:{1}".format("TORRES", 45);
//
String.prototype.format = function () {
    ///	<summary>
    ///Format the string based on a list of argument referenced in the format template&#10;
    ///with the synatx {index} or format the string based on the format template referencing&#10;
    ///propertu name of the instance with the syntax {property-name}&#10;
    ///Sample:&#10;
    ///     var r = "LastName:{lastName}, Age:{Age}".format({ lastName:"TORRES", Age:45 });&#10;
    ///     var r = "LastName:{0}, Age:{1}".format("TORRES", 45);&#10;
    ///	</summary>
    ///	<param name="o" type="object">The object feeding the template via its properties</param>
    ///	<param name="p1" type="object">value</param>
    var
        stringValue = this;

    // Pass one instance
    if ((arguments.length === 1) && (typeof arguments[0] === "object") && (!Array.isArray(arguments[0]))) {

        for (var i = 0; i < arguments.length; i++) {
            var instance = arguments[i];
            for (var p in instance) {
                stringValue = stringValue.replace(new RegExp('{' + p + '}', 'g'), instance[p]);
            }
        }
    }
    else {
        if (stringValue.indexOf("{") == -1)
            throw new Error("format string '" + stringValue + "' should contains at least one parameters");

        for (var i = 0; i < arguments.length; i++) {

            var v = arguments[i];
            if (Array.isArray(v)) // format the array to a string
                if(v.format)
                    v = v.format();
            stringValue = stringValue.replace(new RegExp('\\{' + (i) + '\\}', 'gm'), v);
        }
    }
    return stringValue;
}
String.format = function () {
    ///	<summary>
    ///Format the string passed as first argument based on the list of following arguments referenced in the format template&#10;
    ///with the synatx {index} 
    ///Sample:&#10;
    ///     var r = "LastName:{0}, Age:{1}".format("TORRES", 45);&#10;
    ///	</summary>    
    ///	<param name="tpl" type="string">value</param>
    ///	<param name="p1" type="object">value</param>
    for (var i = 1; i < arguments.length; i++)
        arguments[0] = arguments[0].replace(new RegExp('\\{' + (i - 1) + '\\}', 'gm'), arguments[i]);
    return arguments[0];
}
