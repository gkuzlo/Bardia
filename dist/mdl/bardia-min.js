var bardia = {
	INVISIBLE: 0,
	READONLY: 1,
	VISIBLE: 2
};
bardia.oop = {
}
bardia.oop.Class = (function() {

    function create(body) {

        function klass(config) {
            this.initialize(config); 
        }

        for (fun in body) {
            klass.prototype[fun] = body[fun];
        }

        return klass;
    }

    function extend(target, source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }

        return target;
    }

    function inherit(_function, body) {
        var klass = function(config) {
            this.initialize(config); 
        }

    	var fun = null;
    	for (fun in _function.prototype) {
    		klass.prototype[fun] = _function.prototype[fun];
    	}
    	
        for (fun in body) {
            klass.prototype[fun] = body[fun];
        }

    	return klass;
    }

    return {
        create: create,
        extend: extend,
        inherit: inherit
    };
    
})();
/**
 *
 */
bardia.dom = {

};

/**
 * creates an element
 */
$_element = (function() {
    function create(jsonRoot) {
        return new bardia.dom.Element(jsonRoot);
    }
    return create;
})();
/**
 *
 */
bardia.dom.Element = bardia.oop.Class.create({

    initialize: function(jsonRoot) {
        this.children = [];

        if (jsonRoot instanceof HTMLElement) {
            this.wrapOnly(jsonRoot);
        } else if (jsonRoot) {
            this.createRoot(jsonRoot);
        }
    },

    wrapOnly: function(jsonRoot) {
        this.domNode = jsonRoot;
        jsonRoot.wrapper = this;
    },

    createRoot: function(jsonRoot) {
        var h = this;
        
        this.domNode = document.createElement(jsonRoot.$_tag);
        this.domNode.wrapper = this;

        for (attr in jsonRoot) {
            if (!attr.startsWith("$_")) {
                this.domNode.setAttribute(attr, jsonRoot[attr]);
            }
        }

        if (jsonRoot.$_append && jsonRoot.$_append.forEach) {		// kolekcja obiektow w JSON
            jsonRoot.$_append.forEach(function(child) {
                h.createSubElement(child);
            });
        } else if (jsonRoot.$_append && jsonRoot.$_append.$_tag) { // jeden obiekt w json
        	h.createSubElement(jsonRoot.$_append);
        } else if (jsonRoot.$_append) {
            this.domNode.innerHTML = jsonRoot.$_append;				// zwykly tekst
        }

        if (jsonRoot.$_props) {
        	this.$_props = jsonRoot.$_props
            for (prop in jsonRoot.$_props) {
            	this.domNode[prop] = jsonRoot.$_props[prop];
            }
        }
        
        if (jsonRoot.$_on) {
            for (eventName in jsonRoot.$_on) {
                this.domNode.addEventListener(eventName, jsonRoot.$_on[eventName]);
            }
        }
    },

    createSubElement: function(jsonSubElement) {
        var subElement = new bardia.dom.Element(jsonSubElement);
        this.insert(subElement);
    },

    insert: function(subElement) {
        try {
            if (subElement) {
            	if (subElement.dom) {
            		this.domNode.appendChild(subElement.dom());
            		this.children.push(subElement);
            	} else if ((typeof subElement) == 'string') {
            		var element = document.createTextNode(subElement);
            		this.domNode.appendChild(element);
            	} else if ((typeof subElement) == 'number') {
            		var element = document.createTextNode(subElement);
            		this.domNode.appendChild(element);
            	}                   
            }
        } catch (e) {
            alert("insert: subElement=" + subElement + " " + e);
        }
        
        return subElement;
    },

    update: function(element) {
    	var h = this;
    	
    	(this.children || []).forEach(function(child) {
    		try {
	    		delete child.dom().wrapper; 
	    		h.dom().removeChild(child.dom());
    		} catch (e) {
    			console.log("error removing child node");
    		}
    	});
    	
    	if (this.children) {
    		this.children.splice(0, this.children.length);
    	}
    	
        while (this.dom().firstChild) {
            this.dom().removeChild(this.dom().firstChild);
        }

        if (element) { 
        	this.insert(element);
        }
    },

    dom: function() {
        return this.domNode;
    },

    find: function(id) {
        var result = null;
        try {
        	//result = this.domNode.querySelector("#" + id);
        	result = this.domNode.querySelector("[id='" + id + "']");
        } catch (e) {
        	alert(e + "   " + id);
        }

        if (result !== null) {
            return result.wrapper;
        } else {
            return null;   
        }
    },
    
    findByClass: function(className) {
        var result = null;
        try {
        	result = this.domNode.querySelector(className);
        } catch (e) {
        	alert(e + "   " + className);
        }

        if (result != null && result.wrapper) {
        	return result.wrapper;
        } else if (result != null && !result.wrapper) {
        	return $_element(result);
        } else {
            return null;   
        }    	
    },

    addClassName: function(className) {
    	var classes = this.dom().classList;

    	if (!classes.contains(className)) {
    		classes.add(className);
    	}
    },

    removeClassName: function(className) {
    	var classes = this.dom().classList;

    	if (classes.contains(className)) {
    		classes.remove(className);
    	}
    },

    hasClassName: function(className) {
    	var classes = this.dom().classList;
    	return classes.contains(className);
    },
    
    clone: function() {
    	return new bardia.dom.Element(this.domNode.cloneNode(true));
    },
    
    setStyle: function(style) {
    	var s = null;
    	for (s in style) {
    		this.dom().style[s] = style[s];
    	}
    },    
});
/**
 *
 */
$_upgradeElement = (function() {
    
    function materialize(root) {
        componentHandler.upgradeElement(root.dom());
        (root.children || []).forEach(function(node) {
            $_upgradeElement(node);
        });
    }

    return materialize;
})();
bardia.utils = {
}

function $msg(message) {
    return message;
}

bardia.utils.DateUtils = bardia.oop.Class.create({

    initialize: function(config) {

    },

    formatDateYYYYMMDD: function(date) {
    	var result = "";
    	try {
    		result = date.getFullYear() + "-" + this.formatMM((date.getMonth() + 1)) + "-" + this.formatDD(date.getDate());
    	} catch (e) {
    		result = "";
    	}
    	return result;
    },
    
    formatDateHHmm: function(date) {
    	var result = "";
    	try {
    		result = this.formatMM((date.getHours())) + ":" + this.formatMM(date.getMinutes());
    	} catch (e) {
    		alert(e);
    		result = "";
    	}
    	return result;
    },
    
    /**
      var du = new bardia.utils.DateUtils();
      return du.formatDateHHmm() + " " + du.formatDateYYYYMMDDHHmm() 
     */
    formatDateYYYYMMDDHHmm: function(date) {
    	var result = "";
    	try {
    		result = date.getFullYear() + "-" + this.formatMM((date.getMonth() + 1)) + "-" + this.formatDD(date.getDate() + " " + (date.getHours())) + ":" + this.formatMM(date.getMinutes());
    	} catch (e) {
    		result = "";
    	}
    	return result;
    },
    
    formatDateHHmmSS: function(date) {
    	var result = "";
    	try {
    		result = this.formatMM(date.getHours()) + ":" + this.formatMM(date.getMinutes()) + ":" + this.formatMM(date.getSeconds());
    	} catch (e) {
    		alert(e);
    		result = "";
    	}
    	return result;
    },
    
    daySecondsToHHMM: function(daySeconds) {
    	var result = "";
    	
    		if (daySeconds) {
	    		var hours = (daySeconds - (daySeconds % 3600)) / 3600;
	    		
	    		var restSeconds = (daySeconds - hours * 3600);
	    		var minutes = (restSeconds - (restSeconds % 60)) / 60;
	    		
	    		result = this.formatHH(hours) + ":" + this.formatMM(minutes);
    		}
    		
    	return result;
    },
    
    parseDate: function(dateStr) {
        if (!dateStr) {
            return "";
        }

        var parser = new DateParser(bardia.utils.DATE_FORMAT);
            result = parser.parse(dateStr);

        return result;
    },
    
    formatMM: function(month) {
    	if (month <= 9) {
    		return "0" + month;
    	} else {
    		return "" + month;
    	}
    },
    
    formatDD: function(day) {
    	if (day <= 9) {
    		return "0" + day;
    	} else {
    		return "" + day;
    	}
    },
    
    formatHH: function(hour) {
    	if (hour <= 9) {
    		return "0" + hour;
    	} else {
    		return "" + hour;
    	}
    },
    
    createFormatYYYYMMDD: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateYYYYMMDD(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;
    },

    createFormatHHmm: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateHHmm(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;
    },
    
    createFormatHHmmSS: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateHHmmSS(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;
    },
    /**
     * new bardia.utils.DateUtils().createFormatDateYYYYMMDDHHmm()
     */
    createFormatDateYYYYMMDDHHmm: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateYYYYMMDDHHmm(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;    	
    },

    getLeftMinutesTo: function(dateMillis, nowMillis) {
    	var diff = dateMillis - nowMillis;
    	var diffSec = diff / 1000;
    	var diffMins = diffSec / 60;

    	return diffMins.toFixed(0);
    },
    
    convertIntToTime: function(intValue) {
 	   var result = "00:00";
 	       try {
 	    	   result = this.formatNumber(((intValue - intValue % 60) / 60), 2) + ":" + this.formatNumber((intValue % 60), 2)
 	       } catch (e) {
 	    	   console.log("ERROR: convertIntToTime");
 	       }
 	   return result;
    },
    
    convertDaySecondsToTime: function(daySeconds) {
  	   var result = "00:00:00";
  	       try {
  	    	   var hours = (daySeconds - (daySeconds % 3600)) / 3600;
  	    	   var minutes = ((daySeconds - (hours * 3600)) / 60).toFixed(0);
  	    	   var seconds = daySeconds % 60;
  	    	   
  	    	   result = this.formatNumber(hours, 2) + ":" + this.formatNumber(minutes, 2) + ":" + this.formatNumber(seconds, 2)
  	       } catch (e) {
  	    	   console.log("ERROR: convertDaySecondsToTime");
  	       }
  	   return result;
     },
    
    formatNumber: function(num, len) {
        var result = null;
        try {
            result = "" + parseInt(num);
            while (result.length < len) {
                result = "0" + result;
            }
        } catch (e) {
            alert("bardia.utils.DateUtils.formatNumber" + e);
        }

        if (isNaN(parseInt(num))) {
            result = "";
        }

        return result;
    },
    
    formatTimeSecNoZerosSec: function(date) {	
    	if (!date) {
    		return "";
    	}
    	var result = this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
		if (date.getSeconds() > 0) {
			result += ":" + this.formatNumber(date.getSeconds(), 2);
		}
		return result;
    },
    
    formatSeconds: function(daySeconds) {
    	var result = "";
    	return result;
    }
});

bardia.utils.DateUtils.pattern = "";
bardia.utils.DATE_FORMAT = "yyyy-MM-ddTHH:mm:ss.SSS+SSSS";

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

		xhttp.open("GET", url + "?" + new Date().getTime(), false);
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
				href: url + "?" + new Date().getTime()
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