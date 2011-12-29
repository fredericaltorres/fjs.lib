/*
    JSON Renderer
    (c) 2011 TORRES Frederic
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
}

function JSONRendererEngine(renderPlugIn, o){

	this.IndentSpaceSize = 3;

	this.__init__ = function(){

	    this._rootObject 	= o;
	    this._renderPlugIn 	= renderPlugIn;
    }

    this.getAllProperties = function(o){
		var
			k,
			l = [];

		for(k in o)
			if(!sys.isFunction(o[k])) // In JSON there is no function, but for future extensions
				l.push(k);

		return l;
    }
	// Render, render the object passed or the root
    this.render = function(o, indentCounter){
		var
			k, i, p, v, t, ii, rootMode = sys.isUndefined(o);

    	o 				= sys.ifUndefined(o, this._rootObject);
    	indentCounter 	= sys.ifUndefined(indentCounter, 1);

    	//print("indentCounter:"+indentCounter);

		if(rootMode){
			print("Rendering Root "+sys.getType(o));
		}

		var properties = this.getAllProperties(o);
		this._renderPlugIn.start();

		for(i=0; i<properties.length; i++){

	        p = properties[i]
	        v = o[properties[i]];
			t = sys.getType(v);

			//print("p:{0}, t:{1}".format(p, t));

			switch(t){

				case "Object":
					this._renderPlugIn.addItem(p, t, v);
                	this.render(v, indentCounter+this.IndentSpaceSize);
				break;
				case "String":
					this._renderPlugIn.addItem(p, t, v, indentCounter);
				break;
				case "Boolean":
					this._renderPlugIn.addItem(p, t, v, indentCounter);
				break;
				case "Number":
					this._renderPlugIn.addItem(p, t, v, indentCounter);
				break;
				case "Array":
					this._renderPlugIn.addItem(p, t, v, indentCounter);
                	for(ii=0; ii<v.length; v++){
	                	this.render(v[ii], indentCounter+this.IndentSpaceSize);
                	}
				break;
            }
        }
        this._renderPlugIn.end();
	}
	this.__init__(o);
}

var o1 = {
	"menu": {
  		"id"	: "4686850",
  		"value"	: "Bla bla",
  		"Debug"	: true,
  		"Amount": 123.45,
  		"popup"	: {
		    "menuitem": [
		      {"value": "New", "onclick": "CreateNewDoc()"},
		      {"value": "Open", "onclick": "OpenDoc()"},
		      {"value": "Close", "onclick": "CloseDoc()"}
		    ]
		}
	}
};

function JSONConsoleRenderer(){

	this.__init__ = function(){

    }
    this.newInstance = function(){

		return new JSONConsoleRenderer();
    }
	this.addItem = function (p, t, v, indentCounter) {
	    var
			s = t.charAt(0)+"~".rightPad(" ",indentCounter)+p;

		print(s);
    }
	this.end = function () {

        //print("end ----------");
    }
	this.start = function () {

		//print("start ----------");
    }
	this.__init__();
}

var o1 = {
	"P1": 1,
	"P2": "A",
	"P3": true,
	"P4": {
		a : 1, 
		b : 2, 
		c : [ 1, 2, 3
		]
    }
};

var jr = new JSONRendererEngine(new JSONConsoleRenderer(), o1);
jr.render();