/*
Stack.js
(c) 2011 TORRES Frederic
Freely distributable under the MIT license.

    - Works in a browser or in nodeJS

Class Stack a match for the C# .NET Stack<T>
based on Andrea Giammarchi's Stack
      http://webreflection.blogspot.com/2008/05/habemus-array-unlocked-length-in-ie8.html
*/
Stack = (function(){

    function Stack(length) {

        if(arguments.length === 1 && typeof length === "number")
            this.length = -1 < length && length === length << 1 >> 1 ? length : this.push(length);
        else if(arguments.length)
            this.push.apply(this, arguments);
            
       if(typeof(Object.defineProperty)==='function') {

          Object.defineProperty(this, "count", {
          
                get: function(){ return this.getCount(); },
          });
       }
    };

    function Array(){};
    Array.prototype = [];
    Stack.prototype = new Array;
    Stack.prototype.length = 0;
    Stack.prototype.toString = function(){
        return  this.slice(0).toString();
    };
     Stack.prototype.getCount = function (v) {

       return this.length;
    }
    Stack.prototype.clear = function (v) {

        this.length = 0;
    }
    Stack.prototype.isEmpty = function () {

        return this.length == 0;
    }
    Stack.prototype.peek = function () {

        return this[this.length-1];
    }
    Stack.prototype.constructor = Stack;
    return  Stack;
})();
