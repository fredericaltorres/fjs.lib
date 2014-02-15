/*
    Date extensions unit tests
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
    var _ = require('../source/date.extension');
    var _ = require('../source/unittest');
}
///////////////////////////////////////////////////////////////////////////////
/// DateExtension Unit Tests
///////////////////////////////////////////////////////////////////////////////
function DateExtension_UnitTests() {

   this.testDiffOneHour = function (){
        var
            d1 = new Date(2011, 1-1, 1, 0, 2, 1, 0),
            d2 = new Date(2011, 1-1, 1, 1, 2, 1, 0)

            /*
        print(d1.toLocaleString());
        print(d1.getHours());
        print(d2.toLocaleString());
        print(d2.diff(d1));
        */

        this.Assert.AreEqual(3600, d2.diff(d1));
        this.Assert.AreEqual(60  , d2.diff(d1,"m"));
        this.Assert.AreEqual(1   , d2.diff(d1,"h"));
    }
    this.testDiffOneHourAndHalf = function (){
        var
            d1 = new Date(2011, 1-1, 1, 0, 2, 1, 0),
            d2 = new Date(2011, 1-1, 1, 1, 32, 1, 0)

        this.Assert.AreEqual(5400, d2.diff(d1));
        this.Assert.AreEqual(90  , d2.diff(d1,"m"));
        this.Assert.AreEqual(1.5 , d2.diff(d1,"h"));
    }
    this.testAddMinutes = function (){
        var
            d1 = new Date(2011, 1-1, 1, 0, 0, 0, 0),
            d2 = new Date(2011, 1-1, 1, 0, 0, 0, 0);
        d1.addMinutes(10);
        this.Assert.AreEqual(10, d1.diff(d2,"m"));
        this.Assert.AreEqual(10, d1.getMinutes());
    }
    this.testAddSeconds = function (){
        var
            d1 = new Date(2011, 1-1, 1, 0, 0, 0, 0),
            d2 = new Date(2011, 1-1, 1, 0, 0, 0, 0);
        d1.addSeconds(10);
        this.Assert.AreEqual(10, d1.getSeconds());
        this.Assert.AreEqual(10, d1.diff(d2,"s"));
    }
/*     this.testAddDays = function (){
        var
            d1 = new Date(2011, 1-1, 0, 0, 0, 0, 0),
            d2 = new Date(2011, 1-1, 2, 0, 0, 0, 0);
        d1.addDays(2);
        this.Assert.AreEqual(2, d1.getDate());
        print(d1);
        print(d2);
        this.Assert.AreEqual(2, d1.diff(d2,"d"));
    } */
    this.testFormatIso = function (){
        var
            d1 = new Date(2011, 10-1, 10, 20, 13, 5, 123);

        print(d1);
        print(d1.formatIso());
    }

    this.testFormat = function (){
        var
            d1 = new Date(2011, 10-1, 11, 20, 13, 5, 123);

        print(d1.format(Date.YYYYMMDD_HHMMSS));
        this.Assert.AreEqual("10/11/2011", d1.format());        
        this.Assert.AreEqual("10/11/2011", d1.format(Date.MMDDYYYY));        
        this.Assert.AreEqual("2011/10/11", d1.format(Date.YYYYMMDD));
        this.Assert.AreEqual("2011/10/11 20:10:05", d1.format(Date.YYYYMMDD_HHMMSS));
        this.Assert.AreEqual("10/11/2011 20:10:05", d1.format(Date.MMDDYYYY_HHMMSS));
        this.Assert.AreEqual("2011-10-12T00:13:05.123Z", d1.format(Date.ISO));
    }
}
DateExtension_UnitTests.prototype = new UnitTests.UnitTestsBaseClass();

if(isNodeJs()){
    print("Date Extension Unit Tests");
    var ut = new DateExtension_UnitTests()
    ut.print = print;
    if(!ut.Run())
        process.exit(1);
}
else{
    print("Unit tests can only run in NodeJS mode");
}

