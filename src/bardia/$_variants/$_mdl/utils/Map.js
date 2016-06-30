
bardia.utils.Map = bardia.oop.Class.create({

    initialize: function() {
    	this.dict = {};
    },
    
	size: function() {
		return Object.keys(this.dict).length;
	},

	isEmpty: function() {
		return Object.keys(this.dict).length == 0;
	},

	get: function(key){
		return this.dict[key];
	},

	containsKey: function(key){
		if( this.get(key) !== undefined) {
			return true;
		} else {
			return false;
		}
	},

	put: function(key, value) {
		this.dict[key] = value;
	},

	remove: function(key) {
		'use strict';
		delete this.dict[key];
	},

	clear: function(){
		this.dict = {};
	},

	forEach: function(callback) {
		var len = this.size();
		for (i = 0; i < len; i++) {
			var item = this.get( Object.keys(this.dict)[i] );
			callback(item);
		}
	}
});

bardia.utils.ScriptImporter = bardia.oop.Class.create({

	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
			importedScripts: new bardia.utils.Map()
		}, config));
	},

	js: function(url) {
		var h = this;

		if (h.importedScripts.containsKey(url)) {
			return;
		}

		var xhttp = new XMLHttpRequest();	

		xhttp.open("GET", url, false);
		xhttp.send(null);
		
		if (xhttp.readyState == 4 && (xhttp.status == 200 || xhttp.status == 0)) {
			try {
				h.importedScripts.put(url, {
					imported: true
				});
				globalEval(xhttp.responseText);
			} catch (e) {
				alert(""+ e + " Error importing script " + url);
			}
		}
	},
	
	css: function(url) {
		var h = this;

		if (h.importedScripts.containsKey(url)) {
			return;
		}

		try {
			var css = $_element({
				$_tag: "link",
				rel: "stylesheet",
				href: url
			});
			document.getElementsByTagName("head")[0].appendChild(css.dom());
			h.importedScripts.put(url, {
				imported: true
			});
		} catch (e) {
			alert(""+ e + " Error importing css " + url);
		}
	},
});

var globalEval = function globalEval(src) {
    if (window.execScript) {
        window.execScript(src);
        return;
    }
    var fn = function() {
        window.eval.call(window,src);
    };
    fn();
};

var IMPORTER = new bardia.utils.ScriptImporter({
	
});

function importScript(path) {
	IMPORTER.js(path);
};

function importCss(path) {
	IMPORTER.css(path);
};