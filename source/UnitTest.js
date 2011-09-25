/*
    Unit Test Framework
    (c) 2011 TORRES Frederic
    lib.js is freely distributable under the MIT license.

Global NameSpace
    - NameSpace:UnitTests
    - Classes:UnitTests.UnitTestsBaseClass
*/
UnitTests = (function(){

    var UnitTests = {

        UnitTestsBaseClass : function() {
        }
    };

    UnitTests.UnitTestsBaseClass.prototype._result = { };
    UnitTests.UnitTestsBaseClass.prototype.print = function (){
       if(console!==undefined)
            console.log(s);
    }
    UnitTests.UnitTestsBaseClass.prototype.Status  = { Running:1, Passed:2, Failed:3, Unknown:4 };
    UnitTests.UnitTestsBaseClass.prototype.Count   = function (){
        var count = 0;
        for (k in this._result)
            count++;
        return count;
    }
    UnitTests.UnitTestsBaseClass.prototype.CountStatus = function (status){
        var count = 0;
        for (k in this._result)
            if(this._result[k]==status)
                count++;
        return count;
    }
    UnitTests.UnitTestsBaseClass.prototype.Run = function(testName){
        this._result  = {};
        for(var t in this){
            if(t.toString().startsWith("test")){
                if((testName===undefined)||(testName.toString()===t.toString())){
                    this.RunTest(t);
                }
            }
        }
        this.print("{0} Test(s) Executed, {1} Passed, {2} Failed.".format(this.Count(), this.CountStatus(this.Status.Passed), this.CountStatus(this.Status.Failed)));
        return this.CountStatus(this.Status.Failed)==0;
    }
    UnitTests.UnitTestsBaseClass.prototype.RunTest = function(t){
        try{
            this._result[t] = this.Status.Running;
            this.print("Running {0}".format(t));
            this[t]();
            if(this[t].ExpectException===true){ // We were expecting an exception that did not occured
                //this.print("ExpectException on {0}".format(t));
                this.print("Expected exception did not occur for test:{0}".format(t));
                this._result[t] = this.Status.Failed;
            }
            else{ // nothing happens and we were not expecting anything we are ok
                //this.print("ExpectException off {0}".format(t));
                this._result[t] = this.Status.Passed;
            }
        }
        catch(ex){
            if(this[t].ExpectException===true){
                //this.print("ExpectException on {0}".format(t));
                // we got an expected exception
            }
            else{
                //this.print("ExpectException off {0}".format(t));
                // we got an un expected exception
                this.print("*** {0} failed - exception:{1}".format(t, ex));
                this._result[t] = this.Status.Failed;
            }
        }
    }    // Static Sub class Assert
    UnitTests.UnitTestsBaseClass.prototype.Assert = {

        __ArrayEqual : function(a1, a2){

            if(a1.length!=a2.length)  return false;

            for(var i=0; i<a1.length; i++)
                if(a1[i]!==a2[i])
                    return false;
            return true;
        },
        AreEqual: function(expected, actual, message, throwException){

            message         = sys.defaultValue(message, "Assert.AreEqual expected:{0}, actual:{1}".format(expected, actual));
            throwException  = sys.defaultValue(throwException, true);

            if(Array.isArray(expected) && Array.isArray(actual)) {

                if(!this.__ArrayEqual(expected, actual))
                    if(throwException) this.Fail(message); else return false;
            }
            else if(sys.isTypeDate(expected)) {

                if(expected!==actual)
                    if(throwException) this.Fail(message); else return false;
            }
            else if(typeof(expected)==='object') {

                /*print("compare objects:");
                print(JSON.stringify(expected));
                print(JSON.stringify(actual)); */
                if(JSON.stringify(expected)!==JSON.stringify(actual))
                    if(throwException) this.Fail(message); else return false;
            }
            else if(expected!==actual)
                if(throwException) this.Fail(message); else return false;

            return true;
        },
        AreNotEqual: function(expected, actual, message){

            message = sys.defaultValue(message, "Assert.AreNotEqual expected:{0}, actual:{1}".format(expected, actual));

            //print("AreNotEqual {0} \nex:{1},\n ac:{2}".format(r, JSON.stringify(expected), JSON.stringify(actual)));

            if(this.AreEqual(expected, actual, message, false))
                this.Fail(message);
        },
        IsTrue: function(exp, message){
            if(!exp)
                this.Fail(message);
        },
        IsFalse: function(exp, message){
            if(exp)
                this.Fail(message);
        },
        Fail: function(message){

            if (typeof message == "undefined")
                message = "Unit test failed";
            print("[FAILED]{0}".format(message));
            throw message;
        }
    }
    return UnitTests;
})();
