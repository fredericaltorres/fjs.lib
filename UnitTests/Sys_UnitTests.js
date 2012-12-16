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

    this._instruments = [    /*http://www.freebase.com/view/en/koto*/
        { "name": "Guitar", "category":"Strings", "image": "http://img.freebase.com/api/trans/raw/m/042392q"},
        { "name": "Banjo", "category":"Strings", "image": "http://img.freebase.com/api/trans/raw/m/052w_6d"},
        { "name": "Mandola", "category":"Strings", "image": "http://img.freebase.com/api/trans/raw/m/02f0bjz"},
        { "name": "Bouzouki", "category":"Strings", "image": "http://img.freebase.com/api/trans/raw/m/029gy47"},
        { "name": "Sitar", "category":"Strings", "image": "http://img.freebase.com/api/trans/raw/m/059yyyt"},
        { "name": "Koto", "category":"Strings", "image": "http://img.freebase.com/api/trans/raw/m/02bg10g"},
        { "name": "Pipa", "category":"Strings", "image": "http://img.freebase.com/api/trans/raw/m/02f1b99"},
        { "name": "Bandurria", "category":"Strings", "image": "http://img.freebase.com/api/trans/raw/m/04pm0zr"},
        { "name": "Bouzouki", "category":"Strings", "image": "http://img.freebase.com/api/trans/raw/m/029gy47"},
    
        { "name": "Piano", "category":"Percussion", "image":"http://img.freebase.com/api/trans/raw/m/03s9dxr" },
        { "name": "Rhodes_piano", "category":"Percussion", "image": "http://img.freebase.com/api/trans/raw/m/02923_q"},
        { "name": "Clavinet", "category":"Percussion", "image": "http://img.freebase.com/api/trans/raw/m/029s8y_"},
        { "name": "Clavichord", "category":"Percussion", "image": "http://img.freebase.com/api/trans/raw/m/05cd2x_"},
        { "name": "Santur", "category":"Percussion", "image": "http://img.freebase.com/api/trans/raw/m/02f61nd"},
    
        { "name": "Recorder", "category":"Wind", "image": "http://img.freebase.com/api/trans/raw/m/0291nst"},
        { "name": "Tuba", "category":"Wind", "image": "http://img.freebase.com/api/trans/raw/m/052qvch"},
        { "name": "Trombone", "category":"Wind", "image": "http://img.freebase.com/api/trans/raw/m/02bjmnh"},
        { "name": "Cornet", "category":"Wind", "image": "http://img.freebase.com/api/trans/raw/m/02910xc"},
        { "name": "Euphonium", "category":"Wind", "image": "http://img.freebase.com/api/trans/raw/m/03qx37q"}
    ];
    
    this.testTraversePath = function() {
      
        var ol = {
          p1 : [
            { p2:"tutu", p3:[{ p4:"toto"}]}
          ]
        };
        this.Assert.AreEqual("tutu", sys.traversePath(ol, ["p1", 0, "p2"]));
        this.Assert.AreEqual("toto", sys.traversePath(ol, ["p1", 0, "p3", 0, "p4"]));
        this.Assert.AreEqual("Guitar", sys.traversePath(this._instruments, [0, "name"]));
        this.Assert.AreEqual("Strings", sys.traversePath(this._instruments, [1, "category"]));
    }
    this.testGroupBy = function() {

        var aggregate = sys.groupBy(this._instruments, "category");
        
        this.Assert.IsTrue(Array.isArray(aggregate["Strings"]));
        this.Assert.IsTrue(Array.isArray(aggregate["Wind"]));
        this.Assert.IsTrue(Array.isArray(aggregate["Percussion"]));
        
        this.Assert.AreEqual(9, aggregate["Strings"].length);
        this.Assert.AreEqual(5, aggregate["Wind"].length);
        this.Assert.AreEqual(5, aggregate["Percussion"].length);

        //print(JSON.stringify(aggregate));
    }

    this.testDistinct = function() {

        var categories = sys.distinct(this._instruments, "category");
        this.Assert.AreEqual(3, categories.length);
        //print(JSON.stringify(categories));
    }

    this.testGetRidOfStarComment = function () {

        var I, E;
        I = "a/* */b";
        E = "ab";
        this.Assert.AreEqual(E, sys.getRidOfStarComment(I));
        
        I = "";
        E = "";
        this.Assert.AreEqual(E, sys.getRidOfStarComment(I));
        
        I = "aaa\n/* */\nbbb";
        E = "aaa\n\nbbb";
        this.Assert.AreEqual(E, sys.getRidOfStarComment(I));
        
        I = "aaa\n/* \n */\nbbb";
        E = "aaa\n\nbbb";
        this.Assert.AreEqual(E, sys.getRidOfStarComment(I));

        I = "a/* */b/* */";
        E = "ab";
        this.Assert.AreEqual(E, sys.getRidOfStarComment(I));
        
        I = "aaa\n/* \n */\nbbb/* zuzu */\nccc";
        E = "aaa\n\nbbb\nccc";
        this.Assert.AreEqual(E, sys.getRidOfStarComment(I));
        
         I = "aaa\n/* \n */\nbbb/* zuzu */\nccc/* panpan */\nddd";
        E = "aaa\n\nbbb\nccc\nddd";
        this.Assert.AreEqual(E, sys.getRidOfStarComment(I));
    }

    this.testIsNumeric = function (){

        this.Assert.IsTrue(sys.isNumeric(1));
        this.Assert.IsTrue(sys.isNumeric(1.1));
        this.Assert.IsTrue(sys.isNumeric("1"));
        this.Assert.IsTrue(sys.isNumeric("1.1"));

        this.Assert.IsFalse(sys.isNumeric(true));
        this.Assert.IsFalse(sys.isNumeric(false));
        this.Assert.IsFalse(sys.isNumeric(null));
        this.Assert.IsFalse(sys.isNumeric(undefined));
        this.Assert.IsFalse(sys.isNumeric("aaa"));
        this.Assert.IsFalse(sys.isNumeric(""));
        this.Assert.IsFalse(sys.isNumeric());
    }
 
    this.testDumpObject= function (){

        var o1  = { n2:2, b2:true, s2:"s2", f2:function() { return "a"; } };
        var so1 = sys.dumpObject(o1);
        //console.log(so1);
        this.Assert.AreEqual(72, so1.length);
    }

    this.testGetMethods = function (){

        var o1  = { n2:2, b2:true, s2:"s2", f2:function() { return "a"; } };
        var methods = sys.getMethods(o1);
        this.Assert.AreEqual(1, methods.length);
        this.Assert.AreEqual("a", o1[methods[0]]());
    }

    this.testGetObjects = function (){

        var o1  = { n2:2, b2:true, s2:"s2", f2:function() { return "a"; }, obj:{ Name:"a" } };
        var objs = sys.getObjects(o1);
        this.Assert.AreEqual(1, objs.length);
        this.Assert.AreEqual("a", o1[objs[0]].Name);
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
    this.testIsEmpty = function (){

        var o = { };
        var n = null;
        var u = undefined;

        this.Assert.IsTrue(sys.isEmpty(undefined));
        this.Assert.IsTrue(sys.isEmpty(null));
        this.Assert.IsTrue(sys.isEmpty(""));
        this.Assert.IsTrue(sys.isEmpty(n));
        this.Assert.IsTrue(sys.isEmpty(u));
        
        this.Assert.IsFalse(sys.isEmpty(o));
        this.Assert.IsFalse(sys.isEmpty(1));
        this.Assert.IsFalse(sys.isEmpty(" "));
        this.Assert.IsFalse(sys.isEmpty(true));
        this.Assert.IsFalse(sys.isEmpty(12.34));
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
