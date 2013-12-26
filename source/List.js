/*
List.js
(c) 2011 TORRES Frederic
Freely distributable under the MIT license.

    - Works in a browser or in nodeJS

Class List a match for the C# .NET List<T>- Frederic Torres 2011
based on
 - Andrea Giammarchi's Stack
      http://webreflection.blogspot.com/2008/05/habemus-array-unlocked-length-in-ie8.html
 - How ECMAScript 5 still does not allow to subclass an array
      http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/

*/
List = (function(){
    var
        MAX_SIGNED_INT_VALUE = Math.pow(2, 32) - 1;

    function __isFunction(f) {

        return typeof f === 'function';
    }
    function __toUint32(value) {

        return value >>> 0;
    }
    function __isInt(v){

        return String(__toUint32(v)) === v;
    }
    function __removeAt(that, index) { // http://ejohn.org/blog/javascript-array-remove

        //var rest = that.slice((to || from) + 1 || that.length);
        //that.length = from < 0 ? that.length + from : from;
        //return that.push.apply(that, rest);
        that.splice(index ,1);
    }
    function _list(length) {
        var
            i;
        for(i=0; i<arguments.length; i++) {
            if(Array.isArray(arguments[i])){
                this.push.apply(this, arguments[i]);
            }
            else{
                this.push.call(this, arguments[i]);
            }
        }
        if(__isFunction(Object.defineProperty)) {
            Object.defineProperty(this, "Count", {
    
                get: function(){ return this.length; },
            });
        }
    }
    function _array() { };
    _array.prototype           = [];

    _list.prototype            = new _array();
    _list.prototype.length     = 0;


    _list.prototype.first = function () {

        return this[0];
    }
    _list.prototype.last = function () {

        return this[this.length-1];
    }
    _list.prototype.getCount   = function () {

        return this.length;
    }
    _list.prototype.toString   = function () {

        return this.slice(0).toString();
    }
    _list.prototype.isEmpty = function () {

        return this.length == 0;
    }
    _list.prototype.add = function (v) {

        this.push(v);
    }
    _list.prototype.addRange = function () {
        var i;
        for(i=0; i < arguments.length; i++)
            this.add(arguments[i]);
    };
   _list.prototype.clear = function (v) {

        this.length = 0;
    }
   _list.prototype.removeAt = function (index) {
        if(this.getCount()===0)
            throw new Error("Cannot removeAt from empty List");

        if(index>=0 && index < this.getCount())
            __removeAt(this, index);
        else
            throw new Error("invalid index "+index+" for List");
    }
   _list.prototype.remove = function (val) {
        var
            elementRemoved = 0,
            index = this.indexOf(val);

        if(index===-1)
            return 0;

        while(index!==-1){
            __removeAt(this, index);
            elementRemoved++;
            index = this.indexOf(val);
        }
        return elementRemoved;
    }
    _list.prototype.contains = function (val) {

        if(Array.isArray(val)) {
            for(var i=0; i<val.length; i++) {
                if(this.contains(val[i])) {
                    return val[i];
                }
            }
            return undefined;
        }
        else {
            return this.indexOf(val) !== -1;
        }
    }
   _list.prototype.concat = function (l) { 
        var
            i;
        for(i in l)
            if(__isInt(i))
                this.add(l[i]);
    }
   _list.prototype.findIndex = function (lambda) {
        var
            i,
            r = new List();

        if(!__isFunction(lambda))
            throw new Error("exists() requires a function as parameter");

        for(i in this)
            if((__isInt(i))&&(lambda(this[i])))
                r.add(i);

        return r;
    }
   _list.prototype.exists = function (lambda) {
        var
            i,
            r = new List();

        if(!__isFunction(lambda))
            throw new Error("exists() requires a function as parameter");

        for(i in this)
            if((__isInt(i)) && (lambda(this[i])))
                return true;

        return false;
    }
   _list.prototype.removeAll = function (lambda) {
        var
            goOn = true,
            i;

        if(!__isFunction(lambda))
            throw new Error("exists() requires a function as parameter");

        while(goOn){
            goOn = false;
            for(i in this){
                if((__isInt(i)) && (lambda(this[i]))) {
                    __removeAt(this, i);
                    goOn = true;
                    break;
                }
            }
        }
    }
   _list.prototype.all = function (lambda) {
        var
            i,
            r = new List();

        if(!__isFunction(lambda))
            throw new Error("exists() requires a function as parameter");

        for(i in this)
            if((__isInt(i)) && (!lambda(this[i])))
                return false;
        return true;
    }
   _list.prototype.any = function (lambda) {
        var
            i,
            r = new List();

        if(!__isFunction(lambda))
            throw new Error("exists() requires a function as parameter");

        for(i in this)
            if((__isInt(i)) && (lambda(this[i])))
                    return true;
        return false;
    }
    _list.prototype.reverse = function () {
        var
            values = [],
            i;

        for(i in this)
            if(__isInt(i))
                values.unshift(this[i]);

        this.clear();

        this.push.apply(this, values);
    }
   _list.prototype.filter = function (lambda) {
        var
            i,
            r = new List();

        if(!__isFunction(lambda))
            throw new Error("filter() requires a function as parameter");

        for(i in this)
            if(__isInt(i))
                if(lambda(this[i]))
                    r.add(this[i]);
        return r;
    }
    _list.prototype.findAll = function (lambda) {
        // Just to have the same .net method
        return this.filter(lambda);
    }
   _list.prototype.map = function (lambda) {
        var
            i,
            r = new List();
            
        if(!__isFunction(lambda))
            throw new Error("map() requires a function as parameter");

        for(i in this)
            if(__isInt(i))
               r.add(lambda(this[i]));
        return r;
    }
    _list.prototype.constructor = _list;
    return _list;
})();
