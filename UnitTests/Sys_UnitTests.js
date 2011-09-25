/*
    Sys unit tests
    (c) 2011 TORRES Frederic
    freely distributable under the MIT license.
*/
///////////////////////////////////////////////////////////////////////////////
///
function print(s){
    if(console!==undefined)
        console.log(s);
}
function isNodeJs() {
    return (typeof require === "function" && typeof Buffer === "function" && typeof Buffer.byteLength === "function" && typeof Buffer.prototype !== "undefined" && typeof Buffer.prototype.write === "function");
}
if(isNodeJs()){
    var _ = require('../source/sys');
    var _ = require('../source/string');
    var _ = require('../source/unittest');
}
///////////////////////////////////////////////////////////////////////////////
/// Sys Unit Tests
///////////////////////////////////////////////////////////////////////////////
function Sys_UnitTests() {

   this.testIsString = function (){

        this.Assert.IsTrue(sys.isString(""));
        this.Assert.IsTrue(sys.isString(""));
        this.Assert.IsTrue(sys.isString(""+1));
        this.Assert.IsTrue(sys.isString(new String("1").toString())); // an object
        this.Assert.IsFalse(sys.isString(new String("1"))); // an object
        this.Assert.IsFalse(sys.isString(1));
        this.Assert.IsFalse(sys.isString(1.2));
        this.Assert.IsFalse(sys.isString(true));
        this.Assert.IsFalse(sys.isString(new Date()));
    }
    this.testIsFunction = function (){

        function f() {}
        var a=1;

        this.Assert.IsTrue(sys.isFunction(f));
        this.Assert.IsFalse(sys.isFunction(a));
    }
    this.testIsMethod = function (){

        function f() {}
        var a=1;

        this.Assert.IsTrue(sys.isMethod(f));
        this.Assert.IsFalse(sys.isMethod(a));
    }
    this.testIsTypeDate = function (){

        function f() {}
        var a=1;

        this.Assert.IsTrue(sys.isTypeDate(new Date()));
        this.Assert.IsFalse(sys.isTypeDate(a));
    }
    this.testHasMethod = function (){

        var a = { m:function(){} };

        this.Assert.IsTrue(sys.hasMethod(a,'m'));
        this.Assert.IsFalse(sys.hasMethod(a,'mmm'));
    }
    this.testIsNull = function (){

        var o = { };

        this.Assert.IsTrue(sys.isNull(null));
        this.Assert.IsTrue(!sys.isNull(o));
    }
    this.testIsNull = function (){

        var o = { };
        var n = null;
        var u = undefined;

        this.Assert.IsTrue(sys.isNull(null));
        this.Assert.IsTrue(sys.isNull(n));
        this.Assert.IsTrue(!sys.isNull(o));
        this.Assert.IsTrue(!sys.isNull(u));
    }
    this.testIsUndefined = function (){

        var o = { };
        var n = null;
        var u = undefined;

        this.Assert.IsTrue(sys.isUndefined(undefined));
        this.Assert.IsTrue(sys.isUndefined(u));
        this.Assert.IsTrue(!sys.isUndefined(o));
        this.Assert.IsTrue(!sys.isUndefined(n));
    }
   this.testIsNullOrUndefined = function (){

        var o = { };
        var n = null;
        var u = undefined;

        this.Assert.IsTrue(sys.isNullOrUndefined(undefined));
        this.Assert.IsTrue(sys.isNullOrUndefined(null));
        this.Assert.IsTrue(sys.isNullOrUndefined(n));
        this.Assert.IsTrue(sys.isNullOrUndefined(u));
        this.Assert.IsTrue(!sys.isNullOrUndefined(o));
        this.Assert.IsTrue(!sys.isNullOrUndefined(1));
    }
    this.testIfUndefined = function (){

        var o = { a:1 };
        var n = null;
        var u = undefined;

        this.Assert.AreEqual(1, sys.ifUndefined(undefined, 1));
        this.Assert.AreEqual('A', sys.ifUndefined(undefined, 'A'));
        this.Assert.AreEqual(o, sys.ifUndefined(undefined, o));
        this.Assert.AreEqual(null, sys.ifUndefined(null, 1)); // TODO:WEIRD call isTypeDate() for no reason
    }
}
Sys_UnitTests.prototype = new UnitTests.UnitTestsBaseClass();

if(isNodeJs()){
    print("Sys Unit Tests");
    var ut = new Sys_UnitTests()
    ut.print = print;
    if(!ut.Run())
        process.exit(1);
}
else{
    print("Unit tests can only run in NodeJS mode");
}

