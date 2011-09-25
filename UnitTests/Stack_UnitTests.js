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
    var _ = require('../source/stack');
    var _ = require('../source/unittest');
}
///////////////////////////////////////////////////////////////////////////////
/// Stack Unit Tests
///////////////////////////////////////////////////////////////////////////////
function Stack_UnitTests() {

    this.testIsEmpty = function (){

        var l = new Stack(1, 2, 3, 4, 5);
        this.Assert.IsFalse(l.isEmpty());
        l.clear();
        this.Assert.IsTrue(l.isEmpty());

        var l = new Stack();
        this.Assert.IsTrue(l.isEmpty());
    }
    this.testStackConstructor = function (){

        var s = new Stack(1, 2, 3);
        this.Assert.AreEqual(3, s.pop());
        this.Assert.AreEqual(2, s.pop());
        this.Assert.AreEqual(1, s.pop());
    }
    this.testStackPeek = function (){

        var s = new Stack(1, 2, 3);
        this.Assert.AreEqual(3, s.peek());
        this.Assert.AreEqual(3, s.peek());
        this.Assert.AreEqual(3, s.pop());
        this.Assert.AreEqual(2, s.peek());
        this.Assert.AreEqual(2, s.pop());
        this.Assert.AreEqual(1, s.pop());
    }
    this.testStackPushPop = function (){
        var
            i = 0,
            s = new Stack();

        for(i=0; i<5; i++)
            s.push(i);

        for(i=5-1; i>=0; i--)
            this.Assert.AreEqual(i, s.pop());
    }
    this.testStackCount = function (){

        var s = new Stack(1, 2, 3);
        this.Assert.AreEqual(3, s.count);
        this.Assert.AreEqual(3, s.pop());
        this.Assert.AreEqual(2, s.count);
        this.Assert.AreEqual(2, s.pop());
        this.Assert.AreEqual(1, s.count);
        this.Assert.AreEqual(1, s.pop());
        this.Assert.AreEqual(0, s.count);
        
        var s = new Stack();
        this.Assert.AreEqual(0, s.count);
        s.push(1);
        this.Assert.AreEqual(1, s.count);
        s.push(2);
        this.Assert.AreEqual(2, s.count);
    }
}
Stack_UnitTests.prototype = new UnitTests.UnitTestsBaseClass();

if(isNodeJs()){
    print("Stack Unit Tests");
    var ut = new Stack_UnitTests();
    ut.print = print;
    if(!ut.Run())
        process.exit(1);
}
else{
    print("Unit tests can only run in NodeJS mode");
}
