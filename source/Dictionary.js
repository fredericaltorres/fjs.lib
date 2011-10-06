/*
Dictionary.js
(c) 2011 TORRES Frederic
Freely distributable under the MIT license.

    - Works in a browser or in nodeJS

Class Dictionart a match for the C# .NET Dictionart<string,V>- Frederic Torres 2011
*/
Dictionary = (function(){
    
    function print(s){
        if(console!==undefined)
            console.log(s);
    }

    function _dictionary(values) {

        var
            k;

        for(k in values)
            this[k] = values[k];

        Object.defineProperty(this, "count" , { get: function(){ return this.length; } });
        Object.defineProperty(this, "keys"  , { get: function(){ return Object.keys(this); } });
        Object.defineProperty(this, "values", {

            get: function(){
                var
                    values = [],
                    k;
                for(k in this)
                    if(typeof this[k] !== 'function')
                        values.push(this[k]);
                return values;
            }
        });
    }

    function _array()                   {};
    _array.prototype        =           {};
    _dictionary.prototype   = new _array();

    _dictionary.prototype.add = function (name, value) {

        this[name] = value;
    }
    _dictionary.prototype.remove = function (name) {

        delete this[name];
    }
    _dictionary.prototype.containsKey = function (name) {
        var
            keys = this.keys,
            i;

        for(i=0; i<keys.length; i++)
            if(name===keys[i])
                return true;
        return false;
    }
    _dictionary.prototype.containsValue = function (value) {
        var
            k;
        for(k in this)
            if(typeof this[k] !== 'function')
                if(this[k]===value)
                    return true;
        return false;
    }
   _dictionary.prototype.get = function (name, defaultValue) {
       var
            v = this[name];
        return (typeof v==="undefined") ? defaultValue : v;
    }
    _dictionary.prototype.toString   = function () {
        var
            val = [],
            k;
        for(k in this)
            if(typeof this[k] !== "function")
                val.push("{0}:{1}".format(k, this[k]));
        return val.join(", ");
    }
    _dictionary.prototype.filter   = function (lambda) {
        var
            d = new Dictionary(),
            k;
        for(k in this)
            if(typeof this[k] !== "function")
                if(lambda(k, this[k]))
                    d.add(k, this[k]);
        return d;
    }
    _dictionary.prototype.map   = function (lambda) {
        var
            d = new Dictionary(),
            v,
            k;
        for(k in this)
            if(typeof this[k] !== "function") {
                v = lambda(k, this[k])
                d.add(v.key, v.value);
            }
        return d;
    }
    _dictionary.prototype.constructor = _dictionary;
    return _dictionary;
})();
