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
 
 
     this.testGetMethods = function (){

        var o1  = { n2:2, b2:true, s2:"s2", f2:function() { return "a"; } };
        var methods = sys.getMethods(o1);
        this.Assert.AreEqual(1, methods.length);
        this.Assert.AreEqual("a", o1[methods[0]]());
    }
    this.testRemoveMethods = function (){

        var o1  = { n2:2, b2:true, s2:"s2", f2:function() { return "a"; }, f3 : function() { return "b"; } };
        this.Assert.AreEqual("a", o1["f2"]());
        this.Assert.AreEqual("b", o1["f3"]());
        sys.removeMethods(o1);
        this.Assert.AreEqual(undefined, o1["f2"]);
        this.Assert.AreEqual(undefined, o1["f3"]);
    }
    this.testExtend = function (){

        var o1  = { n2:2, b2:true, s2:"s2", f2:function() { return "a"; } };
        var o2 = sys.extend({ n1:1,  }, o1);

        this.Assert.AreEqual(1, o2["n1"]);
        this.Assert.AreEqual(2, o2["n2"]);
        this.Assert.AreEqual(true, o2["b2"]);
        this.Assert.AreEqual("s2", o2["s2"]);
        this.Assert.AreEqual("a", o2["f2"]());
    }
    this.testExtendMethods = function (){

        var o1  = { n2:2, b2:true, s2:"s2", f2:function() { return "a"; } };
        var o2 = sys.extendMethods({ n1:1,  }, o1);

        this.Assert.AreEqual(1, o2["n1"]);
        this.Assert.AreEqual(undefined, o2["n2"]);
        this.Assert.AreEqual(undefined, o2["b2"]);
        this.Assert.AreEqual(undefined, o2["s2"]);
        this.Assert.AreEqual("a", o2["f2"]());
    }
    this.testExtendProperties = function (){

        var o1  = { n2:2, b2:true, s2:"s2", f2:function() { return "a"; } };
        var o2 = sys.extendProperties({ n1:1,  }, o1);

        this.Assert.AreEqual(1, o2["n1"]);
        this.Assert.AreEqual(2, o2["n2"]);
        this.Assert.AreEqual(true, o2["b2"]);
        this.Assert.AreEqual("s2", o2["s2"]);
        this.Assert.AreEqual(undefined, o2["f2"]);
    }
   this.testDefaultValue = function (){
        var o = { };
        var n = null;
        var u = undefined;
        var a = "a";

        this.Assert.AreEqual(1, sys.defaultValue(u,1));
        this.Assert.AreEqual(null, sys.defaultValue(n,1));
        this.Assert.AreEqual(o, sys.defaultValue(o,1));
        this.Assert.AreEqual(a, sys.defaultValue(a,1));
        this.Assert.AreEqual(o, sys.defaultValue(o,1));
    }
   this.testGetType = function (){

        this.Assert.AreEqual("Array", sys.getType([1]));
        this.Assert.AreEqual("String", sys.getType("A"));
        this.Assert.AreEqual("Boolean", sys.getType(true));
        this.Assert.AreEqual("Number", sys.getType(1));
        this.Assert.AreEqual("Number", sys.getType(1.1));
        this.Assert.AreEqual("Date", sys.getType(new Date()));
        this.Assert.AreEqual("Function", sys.getType(function(){}));
        this.Assert.AreEqual("Object", sys.getType({}));
    }
     this.testIsNumber = function (){

        this.Assert.IsFalse(sys.isNumber(""));
        this.Assert.IsFalse(sys.isNumber(""+1));
        this.Assert.IsFalse(sys.isNumber(new String("1").toString()));
        this.Assert.IsFalse(sys.isNumber(new String("1")));
        this.Assert.IsTrue(sys.isNumber(1));
        this.Assert.IsTrue(sys.isNumber(1.2));
        this.Assert.IsFalse(sys.isNumber(true));
        this.Assert.IsFalse(sys.isNumber(new Date()));
    }
     this.testIsInteger = function (){

        this.Assert.IsFalse(sys.isInteger(""));
        this.Assert.IsFalse(sys.isInteger(""+1));
        this.Assert.IsFalse(sys.isInteger(new String("1").toString()));
        this.Assert.IsFalse(sys.isInteger(new String("1")));
        this.Assert.IsFalse(sys.isInteger(1.1));
        this.Assert.IsFalse(sys.isInteger(1.000000001));
        this.Assert.IsTrue(sys.isInteger(1));
        this.Assert.IsTrue(sys.isInteger(0));
        this.Assert.IsTrue(sys.isInteger(32768));
        this.Assert.IsTrue(sys.isInteger(Math.pow(2, 16))); // 65536
        this.Assert.IsTrue(sys.isInteger(Math.pow(2, 32))); // 4294967296
        this.Assert.IsFalse(sys.isInteger(1.2));
        this.Assert.IsFalse(sys.isInteger(true));
        this.Assert.IsFalse(sys.isInteger(new Date()));
    }
   this.testIsString = function (){

        this.Assert.IsTrue(sys.isString(""));
        this.Assert.IsTrue(sys.isString(""+1));
        this.Assert.IsTrue(sys.isString(new String("1").toString()));
        this.Assert.IsTrue(sys.isString(new String("1")));
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
