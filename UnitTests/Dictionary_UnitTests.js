/*
    Dictionary unit tests
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
    var _ = require('../source/dictionary');
    var _ = require('../source/unittest');
}
///////////////////////////////////////////////////////////////////////////////
/// jsLib Unit Tests
///////////////////////////////////////////////////////////////////////////////
function Dictionary_UnitTests() {

    this.testConstructor = function (){
        var
            d = new Dictionary({ a:1, b:"2", c:true });
        this.Assert.AreEqual(d["a"],1);
        this.Assert.AreEqual(d.a,1);
        this.Assert.AreEqual(d["b"],"2");
        this.Assert.AreEqual(d.b,"2");
        this.Assert.AreEqual(d["c"],true);
        this.Assert.AreEqual(d.c,true);
    }
    this.testAdd = function (){
        var
            d = new Dictionary();

        d.add("a",1);
        d.add("b","2");
        d.add("c", true);

        this.Assert.AreEqual(d["a"],1);
        this.Assert.AreEqual(d.a,1);
        this.Assert.AreEqual(d["b"],"2");
        this.Assert.AreEqual(d.b,"2");
        this.Assert.AreEqual(d["c"],true);
        this.Assert.AreEqual(d.c,true);
    }
    this.testAddByBracket = function (){
        var
            d = new Dictionary();

        d["a"] = 1;
        d["b"] = "2";
        d["c"] = true;

        this.Assert.AreEqual(d["a"],1);
        this.Assert.AreEqual(d.a,1);
        this.Assert.AreEqual(d["b"],"2");
        this.Assert.AreEqual(d.b,"2");
        this.Assert.AreEqual(d["c"],true);
        this.Assert.AreEqual(d.c,true);
    }
    this.testKeys = function (){
        var
            d = new Dictionary({ a:1, b:"2", c:true });

        this.Assert.AreEqual(['a','b','c'], d.Keys);
    }
    this.testValues = function (){
        var
            d = new Dictionary({ a:1, b:"2", c:true });
        this.Assert.AreEqual([1,"2", true], d.Values);
    }
    this.testRemove = function (){
        var
            d = new Dictionary({ a:1, b:"2", c:true });
        d.remove("b");
        this.Assert.AreEqual([1, true], d.Values);
    }
    this.testContainsKey = function (){
        var
            d = new Dictionary({ a:1, b:"2", c:true });
        d.remove("b");
        this.Assert.IsTrue(d.containsKey("a"));
        this.Assert.IsFalse(d.containsKey("aa"));
    }
    this.testContainsValue = function (){
        var
            d = new Dictionary({ a:1, b:"2", c:true });

        this.Assert.IsTrue(d.containsValue(1));
        this.Assert.IsTrue(d.containsValue("2"));
        this.Assert.IsTrue(d.containsValue(true));
        this.Assert.IsFalse(d.containsValue("111"));
        this.Assert.IsFalse(d.containsValue("1"));
        this.Assert.IsFalse(d.containsValue(false));
    }
    this.testGet = function (){
        var
            d = new Dictionary({ a:1, b:"2", c:true });

        this.Assert.AreEqual(1, d.get("a",2));
        this.Assert.AreEqual("2", d.get("b",234342));
        this.Assert.AreEqual(5, d.get("d",5));
    }
    this.testToString = function (){
        var
            d = new Dictionary({ a:1, b:"2", c:true });

        this.Assert.AreEqual("a:1, b:2, c:true", d.toString());
    }
    this.testInstanceOf= function (){
        var
            d = new Dictionary({ a:1, b:"2", c:true });
            
        this.Assert.IsTrue(d instanceof Object);
        this.Assert.IsTrue(d instanceof Dictionary);
    }
    this.testFilter = function (){
        var
            d1 = new Dictionary({ a:1, b:2, c:3, d:4, e:5, f:6 }),
            d2 = new Dictionary({ b:2, d:4, f:6 });

        this.Assert.AreEqual(d2.toString(), d1.filter(function(k,v){ return v % 2 === 0; }).toString());
    }
    this.testMap = function (){
        var
            d1 = new Dictionary({ a:1, b:2, c:3, d:4, e:5, f:6 }),
            d2 = new Dictionary({ aa:10, bb:20, cc:30, dd:40, ee:50, ff:60 });

        this.Assert.AreEqual(d2.toString(), d1.map(function(k,v){ return { key:k+k, value:v*10 } }).toString());
    }
    this.testClear = function (){
        var
            d = new Dictionary({ a:1, b:"2", c:true });

        d["d"] = new Date();
        d["e"] = null;
        d["f"] = undefined;

        // Function will be ignored from the keys of the dictionary
        d.aDummyFunction = function(){ }

        this.Assert.AreEqual(6, d.Count);
        d.clear();
        this.Assert.AreEqual(0, d.Count);
    }
}
Dictionary_UnitTests.prototype = new UnitTests.UnitTestsBaseClass();

if(isNodeJs()){

    print("Dictionary Unit Tests");
    var ut = new Dictionary_UnitTests()
    ut.print = print;
    if(!ut.Run()) {
        print("FAILED");
        //process.exit(1);
    }
}
else{
    print("Unit tests can only run in NodeJS mode");
}
