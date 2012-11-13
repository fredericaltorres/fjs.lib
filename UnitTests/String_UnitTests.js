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
    var _ = require('../source/unittest');
}
///////////////////////////////////////////////////////////////////////////////
/// String Unit Tests
///////////////////////////////////////////////////////////////////////////////
function String_UnitTests() {

    var FIRSTNAME = "Fred";
    var LASTNAME  = "TORRES";

    this.testDecapitalize = function (){

        this.Assert.AreEqual("Hello There Mister",                      "helloThereMister".decapitalize());
        this.Assert.AreEqual("Hello Theremister",                       "helloTheremister".decapitalize());
        this.Assert.AreEqual("This Is An ID",                           "ThisIsAnID".decapitalize());
        this.Assert.AreEqual("This Is An ID Really Good ID In The USA", "ThisIsAnIDReallyGoodIDInTheUSA".decapitalize());
        this.Assert.AreEqual("This Is An ID",                           "__ThisIsAn_ID".decapitalize());
        this.Assert.AreEqual("This Is An ID",                           "ThisIsAn_ID".decapitalize());
        this.Assert.AreEqual("This Is An ID",                           "ThisIsAn_____ID".decapitalize());

        this.Assert.AreEqual("This Is An ID",                           "this_Is_An_ID".decapitalize());
        this.Assert.AreEqual("This Is An ID",                           "this_is_an_ID".decapitalize());
        this.Assert.AreEqual("This Is A Really Good ID In The USA",     "This_Is_A_Really_Good_ID_In_The_USA".decapitalize());
        this.Assert.AreEqual("This Is A Really Good ID In The USA",     "this_is_a_really_good_ID_in_the_USA".decapitalize());
        this.Assert.AreEqual("This Is A Really Good Id In The USA",     "this_is_a_really_good_id_in_the_USA".decapitalize());
        this.Assert.AreEqual("This Is A Really Good Id In The Usa",     "this_is_a_really_good_id_in_the_usa".decapitalize());
        this.Assert.AreEqual("THIS IS AN REALLY GOOD ID IN THE USA",    "THIS_IS_AN_REALLY_GOOD_ID_IN_THE_USA".decapitalize());
        this.Assert.AreEqual("This Is A Really Good ID In The USA",     "This Is A Really Good ID In The USA".decapitalize());
    }
    this.testStringFormatStatic = function (){

        this.Assert.AreEqual("[1]", String.format("[{0}]", 1));
        this.Assert.AreEqual("[1]2,3,ok",String.format("[{0}]{1},{2},{3}", 1,2,3,'ok'));
    }
    this.testStringFormatMethod = function (){

        this.Assert.AreEqual("[1]","[{0}]".format(1));
        this.Assert.AreEqual("[1]2,3","[{0}]{1},{2}".format(1,2,3));
        this.Assert.AreEqual("[1]2,3,ok","[{0}]{1},{2},{3}".format(1,2,3,'ok'));
        this.Assert.AreEqual("[1]","[{a}]".format( { a:1 }));
        this.Assert.AreEqual("[1]2,3","[{a}]{b},{c}".format( { a:1, b:2, c:3 }));
        this.Assert.AreEqual("[1]2,3,ok","[{a}]{b},{c},{ok}".format( { a:1, b:2, c:3, ok:'ok' }));

        this.Assert.AreNotEqual("[1]2,3","[{0}]{1},{2},".format(1,2,3));
    }
    this.testStringStartsWith = function(){

        this.Assert.IsTrue("ABCD".startsWith("AB"));
        this.Assert.IsFalse("ABCD".startsWith("A~"));
    }
    this.testStringEndsWith = function(){

        this.Assert.IsTrue("ABCD".endsWith("CD"));
        this.Assert.IsFalse("ABCD".endsWith("DZ"));
    }
    this.testStringTrim = function(){

        this.Assert.AreEqual("ABCD", "  ABCD  ".trim());
        this.Assert.AreEqual("ABCD", "\nABCD\n".trim());
        this.Assert.AreEqual("ABCD", "\tABCD\t".trim());
        this.Assert.AreEqual("ABCD", "\rABCD\r".trim());
        this.Assert.AreEqual("ABCD", "\r\n\tABCD\r\n\t".trim());

        this.Assert.AreEqual("ABCD", "ABCD  ".rightTrim());
        this.Assert.AreEqual("ABCD", "ABCD\r\n\t ".rightTrim());
        this.Assert.AreEqual("ABCD", "  ABCD".leftTrim());
        this.Assert.AreEqual("ABCD", "\r\n\t ABCD".leftTrim());
    }
    this.testStringReplace = function(){

        this.Assert.AreEqual("aBCDa","ABCDa".replace(/A/,"a"));
    }
    this.testStringReplaceAll = function() {

        this.Assert.AreEqual("-ABCD-", "aABCDa".replaceAll("a", "-"));
        this.Assert.AreEqual("ABCD",   "aABCDa".replaceAll("a", ""));
        this.Assert.AreEqual("",       "aaaaaaaaaaaaa".replaceAll("a", ""));
        this.Assert.AreEqual("b",      "aaaaaabaaaaaaa".replaceAll("a", ""));
    }
    this.testRightPad = function(){

        this.Assert.AreEqual("100", "1".rightPad("0",3));
        this.Assert.AreEqual("100000", "1".rightPad("0",6));
        this.Assert.AreNotEqual("100000", "1".rightPad("0",7));
    }
    this.testLeftPad = function(){

        this.Assert.AreEqual("001", "1".leftPad("0",3));
        this.Assert.AreEqual("000001", "1".leftPad("0",6));
    }
}
String_UnitTests.prototype = new UnitTests.UnitTestsBaseClass();

if(isNodeJs()){
    print("String Unit Tests");
    var ut = new String_UnitTests()
    ut.print = print;
    if(!ut.Run())
        process.exit(1);
}
else{
    print("Unit tests can only run in NodeJS mode");
}

