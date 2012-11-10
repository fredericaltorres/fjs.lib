/*
    List unit tests
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
    var _ = require('../source/list');
    var _ = require('../source/unittest');
}
///////////////////////////////////////////////////////////////////////////////
/// jsLib Unit Tests
///////////////////////////////////////////////////////////////////////////////
function List_UnitTests() {

    this.testConstructorWithNoArgument = function (){

        var l = new List();
        this.Assert.AreEqual(0, l.Count);
        this.Assert.AreEqual("", l.toString());
    }
    this.testConstructorWithMultipleArguments = function (){

        var l = new List(1, 2, 3);
        this.Assert.AreEqual(3, l.Count);
        this.Assert.AreEqual("1,2,3", l.toString());
    }
    this.testConstructorWithArgumentInArray = function (){

        var l = new List([1, 2, 3]);
        this.Assert.AreEqual(3, l.Count);
        this.Assert.AreEqual("1,2,3", l.toString());
    }
    this.testAdd = function (){

        var l = new List();
        this.Assert.AreEqual(0, l.Count);
        l.add(1);
        l.add(2);
        l.add(3);
        this.Assert.AreEqual("1,2,3", l.toString());
        this.Assert.AreEqual(3, l.Count);
    }
    this.testRemoveAt = function (){

        var l = new List(1, 2, 3);
        l.removeAt(1);
        this.Assert.AreEqual(2, l.Count);
        this.Assert.AreEqual("1,3", l.toString());
    }
    this.testRemove = function (){

        var l = new List(1, 2, 3);
        this.Assert.AreEqual(1,l.remove(2));
        this.Assert.AreEqual(2, l.Count);
        this.Assert.AreEqual("1,3", l.toString());
    }
    this.testRemoveMultipleElement = function (){

        var l = new List(1, 2, 3, 1, 1);
        this.Assert.AreEqual(3,l.remove(1));
        this.Assert.AreEqual(2, l.Count);
        this.Assert.AreEqual("2,3", l.toString());
    }
    this.testConcat = function (){

        var l1 = new List(1, 2, 3);
        var l2 = new List(4, 5, 6);
        l1.concat(l2);
        print(l1.toString());
        this.Assert.AreEqual("1,2,3,4,5,6", l1.toString());
    }
    this.testInstanceOf = function (){

        var l = new List(1, 2, 3);
        this.Assert.IsTrue(l instanceof List);
        this.Assert.IsTrue(l instanceof Array);
    }
    this.testFilter = function (){

        var l = new List(1, 2, 3, 4);
        var ll = l.filter(function(v){ return v % 2 == 0; });
        this.Assert.AreEqual("2,4", ll.toString());
    }
    this.testMap = function (){

        var l = new List(1, 2, 3, 4);
        var ll = l.map(function(v){ return v*v; });
        this.Assert.AreEqual("1,4,9,16", ll.toString());
    }
    this.testAddRange = function (){

        var l = new List();
        l.addRange(1, 2, 3);
        this.Assert.AreEqual("1,2,3", l.toString());
    }
    this.testCount = function (){

        var l = new List(1, 2, 3);
        l.clear();
        this.Assert.AreEqual(0, l.Count);
        this.Assert.AreEqual("", l.toString());
        l.add(1);
        this.Assert.AreEqual("1", l.toString());
        this.Assert.AreEqual(1, l.Count);
        l.addRange(2, 3, 4);
        this.Assert.AreEqual("1,2,3,4", l.toString());
    }
    this.testContains = function (){

        var l = new List(1, 2, 3);
        this.Assert.IsTrue(l.contains(2));
        this.Assert.IsFalse(l.contains(12));
    }
    this.testContainsMutiElement = function (){

        var l = new List(1, 2, 3, 4, 5, 6);
        this.Assert.IsTrue(l.contains([1.1, 1, 1,2]));
        this.Assert.IsFalse(l.contains([8, 9, 0]));
        
        var l = new List("a", "b", "c", "d");
        this.Assert.IsTrue(l.contains(["aa","aaa","a"]));
        this.Assert.AreEqual("a", l.contains(["aa","aaa","a"]));
        this.Assert.AreEqual("d", l.contains(["aa","d","aaa","a"]))
        this.Assert.IsTrue(l.contains([undefined, null, 1, /aa/, new Date(), "aaa","a"]));
        this.Assert.IsFalse(l.contains([undefined, null, 1, /aa/, new Date(), "aaa"]));
        
        this.Assert.IsTrue(l.contains(new List("aa","aaa","a")));

        var l = new List({a:1}, {a:2}, {a:3});
        this.Assert.IsFalse(l.contains({a:1}));
        this.Assert.IsFalse(l.contains({a:1}, function(e){ return e.a === 1; }));

    }
    this.testExists = function (){

        var l = new List(1, 2, 3);
        this.Assert.IsTrue( l.exists(function(v){ return v == 2;  }));
        this.Assert.IsFalse(l.exists(function(v){ return v == 12; }));
    }
    this.testAll = function (){

        var l = new List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        l.name='fred';
        this.Assert.IsTrue ( l.all(function(v){ return v > 0;  }));
        this.Assert.IsFalse( l.all(function(v){ return v > 5;  }));
    }
    this.testAny = function (){

        var l = new List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        l.name='fred';
        this.Assert.IsTrue ( l.any(function(v){ return v > 0;  }));
        this.Assert.IsFalse( l.any(function(v){ return v > 15;  }));
    }
    this.testFindIndex = function (){

        var l = new List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        this.Assert.AreEqual( "1,3,5,7,9", l.findIndex(function(v){ return v % 2 == 0; }).toString() );
    }
    this.testRemoveAll = function (){

        var l = new List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        l.removeAll(function(v){ return v % 2 == 0; });
        this.Assert.AreEqual( "1,3,5,7,9", l.toString() );
    }
    this.testReverse = function (){

        var l = new List(1, 2, 3, 4, 5);
        l.reverse();
        this.Assert.AreEqual( "5,4,3,2,1", l.toString() );
    }
    this.testIsEmpty = function (){

        var l = new List(1, 2, 3, 4, 5);
        this.Assert.IsFalse(l.isEmpty());
        l.clear();
        this.Assert.IsTrue(l.isEmpty());

        var l = new List();
        this.Assert.IsTrue(l.isEmpty());
        
        var l = new List(1,2,3);
        l.removeAt(0);
        l.remove(2);
        l.remove(3);
        this.Assert.IsTrue(l.isEmpty());
    }
    this.testFirst = function (){

        var l = new List(1, 2, 3, 4, 5);
        this.Assert.AreEqual( 1, l.first() );
        this.Assert.AreEqual( 1, l.shift() );
        this.Assert.AreEqual( 2, l.first() );
    }
    this.testLast = function (){

        var l = new List(1, 2, 3, 4, 5);
        this.Assert.AreEqual( 5, l.last() );
        l.removeAt(4);
        this.Assert.AreEqual( 4, l.last() );
    }
}
List_UnitTests.prototype = new UnitTests.UnitTestsBaseClass();

if(isNodeJs()){
    print("List Unit Tests");
    var ut = new List_UnitTests()
    ut.print = print;
    if(!ut.Run())
        process.exit(1);
}
else{
    print("Unit tests can only run in NodeJS mode");
}


