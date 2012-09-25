/*
    String unit tests
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
    var _ = require('../source/stringbuilder');
    var _ = require('../source/unittest');
}
///////////////////////////////////////////////////////////////////////////////
/// String Unit Tests
///////////////////////////////////////////////////////////////////////////////
function StringBuilder_UnitTests() {

    this.testClear = function (){

        var sb = new StringBuilder();
        this.Assert.AreEqual(0, sb.getLength());

        sb.append("1234");
        this.Assert.AreEqual(4, sb.getLength());

        sb.clear();
        this.Assert.AreEqual(0, sb.getLength());
    }
    this.testAppend = function (){

        var sb = new StringBuilder();
        this.Assert.AreEqual(4, sb.append("1234").getLength());
        this.Assert.AreEqual(8, sb.append(1234).getLength());
        this.Assert.AreEqual("12341234[object Object]", sb.append({}).toString());
    }
    this.testAppendFormat = function (){

        var sb = new StringBuilder();
        this.Assert.AreEqual("[1]", sb.appendFormat("[{0}]",1).toString());
        this.Assert.AreEqual("[1][true][1.234]", sb.clear().appendFormat("[{0}][{1}][{2}]", 1, true, 1.234).toString());
        this.Assert.AreEqual("[1][true][1.234][[object Object]]", sb.clear().appendFormat("[{0}][{1}][{2}][{3}]", 1, true, 1.234, {}).toString());
    }
    this.testInsert = function (){

        var sb = new StringBuilder();
        this.Assert.AreEqual("1234", sb.append("1234").toString());
        this.Assert.AreEqual("1~234", sb.clear().append("1234").insert(1,"~").toString());
        this.Assert.AreEqual("12~34", sb.clear().append("1234").insert(2,"~").toString());
        this.Assert.AreEqual("123~4", sb.clear().append("1234").insert(3,"~").toString());
        this.Assert.AreEqual("~1234", sb.clear().append("1234").insert(0,"~").toString());
        this.Assert.AreEqual("1234~", sb.clear().append("1234").insert(4,"~").toString());
    }
    this.testInsert = function (){

        var sb = new StringBuilder();
        this.Assert.AreEqual("1234", sb.append("1234").toString());
        this.Assert.AreEqual("1~234", sb.clear().append("1234").insert(1,"~").toString());
        this.Assert.AreEqual("12~34", sb.clear().append("1234").insert(2,"~").toString());
        this.Assert.AreEqual("123~4", sb.clear().append("1234").insert(3,"~").toString());
        this.Assert.AreEqual("~1234", sb.clear().append("1234").insert(0,"~").toString());
        this.Assert.AreEqual("1234~", sb.clear().append("1234").insert(4,"~").toString());
    }
    this.testRemove = function (){

        var sb = new StringBuilder();
        sb.clear();
        sb.append("1~~~234");
        sb.remove(2, 1);
        this.Assert.AreEqual("1~~234", sb.toString());
    }
}
StringBuilder_UnitTests.prototype = new UnitTests.UnitTestsBaseClass();

if(isNodeJs()){
    print("StringBuilder Unit Tests");
    var ut = new StringBuilder_UnitTests()
    ut.print = print;
    if(!ut.Run()) {
        //process.exit(0);
    }
}
else{
    print("Unit tests can only run in NodeJS mode");
}

