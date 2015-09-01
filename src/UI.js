var UI = {
    version: "0.1.1",
    uploadAction: "http://localhost:8080/scheduler/file.upload",
    DATE_FORMAT: "yyyy-MM-ddTHH:mm:ss.SSSZ",
    DATE_YYYMMMDDD_FORMAT: "yyyy-MM-dd",
    VISIBLE: 1,
    READONLY: 2,
    HIDDEN: 4
}

UI.play = function(html, config, finishFun) {
	var player = html.animate(config, {
		direction: 'normal',
	    duration: 500,
	    easing: "ease",
		iterations: 1,
		fill: "both"
	});
	
	if (finishFun) {
		player.onfinish = finishFun;
	}
}

$PLAY = UI.play;

/**
 * 
 */
UI.Header = Class.create({
	/**
	 * 
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            title: "Insert title here ...",
            className: "bg_main fg_white"
        }, config || {});

        this.render();
    },
    /**
     * 
     */
    render: function() {
        var h = this;
            h.header = new Element("DIV", {
                className: "header " + h.config.className
            });
            h.header.insert(h.config.title);
            h.config.inside.insert(h.header);
    },
    /**
     * 
     */
    addHeaderElement: function(element) {
    	this.header.insert(element.getHTML());
    },
    /**
     * 
     */
    setTitle: function(title) {
    	var h = this;
    		h.header.update(title);
    }
});

UI.Content = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body
        }, config || {});

        this.render();
    },
    render: function() {
    	var h = this;
    	
    	h.content = new Element("DIV", {
        	class: "content bg_white fg_black"
        });
        
        h.config.inside.insert(h.content);
    },
    getMaterial: function() {
    	return this.content;
    }
});

UI.HeaderDialog = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            title: "Insert title here ...",
            icon: "icons/1/ic_view_headline_white_24dp.png",
            width: 400,
            height: 300,
        }, config || {});

        this.render();
    },
    render: function() {
    	var h = this;

		this.icon = new Element("IMG", {
        	src: h.config.icon,
        	title: h.config.title,
        	style: "vertical-align:middle; margin:0px 10px 0px 10px"
        });

        this.icon.on("click", "img", function(e) {
        	var menu = new UI.ContextMenu({
        		parent: e.element(),
        		width: h.config.width,
        		height: h.config.height,
        		onShow: function(inside, dialog) {
        			if (h.config.onShow !== undefined) {
        				h.config.onShow(inside, dialog);
        			}
        		}
        	});
        });
    },
    getHTML: function() {
    	return this.icon
    },
    close: function() {
    	alert("Closing .... ");
    }
});

UI.HeaderButton = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            title: "Insert title here ...",
            icon: "icons/1/ic_view_headline_white_24dp.png"
        }, config || {});

        this.render();
    },
    render: function() {
    	var h = this;

		this.icon = new Element("IMG", {
        	src: h.config.icon,
        	title: h.config.title,
        	style: "vertical-align:middle; margin:0px 10px 0px 10px"
        });
        
        if (h.config.onClick !== undefined) {
        	h.config.onClick();
        }
    },
    getHTML: function() {
    	return this.icon
    }
});

UI.HeaderLabel = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            title: "Insert title here ..."
        }, config || {});

        this.render();
    },
    render: function() {
		this.div = new Element("DIV", {
			style: "display:inline-block; color:white; margin:0px 10px 0px 10px"
        });
        this.div.update(this.config.title);
    },
    setTitle: function(title) {
    	this.div.update(title);
    	
		var player = this.div.animate([
   		    {opacity: 0.0, transform: "scale(1)", color: "#fbd86e"},
   		    {opacity: 1.0, transform: "scale(1)", color: "#ffffff"}
   		], {
   			direction: 'normal',
   		    duration: 500,
   		    easing: "ease-in-out",
   			iterations: 1
   		});
    },
    getHTML: function() {
    	return this.div;
    }
});

UI.ContextMenu = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
            width: 400,
            height: 300
        }, config || {});

        this.render();
    },
    render: function() {
    	var h = this;
    	
    	var box = this.config.parent.getBoundingClientRect();
    	
    	var dialog = new UI.Dialog({
    		top: box.top + box.height,
    		left: box.left,
    		width: h.config.width,
    		height: h.config.height,
    		onShow: function(inside, dlg) {
    			if (h.config.onShow !== undefined) {
    				h.config.onShow(inside, dlg);
    			}
    		}
    	});
    }
});

UI.Dialog = Class.create({
	initialize: function(config) {
        this.config = Object.extend({
        	top:100,
        	left:100,
            width: 300,
            height: 400
        }, config || {});
        
        this.render();
	},
	render: function() {
		var h = this;
		
		this.bg = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px"
		});
		
		this.bg1 = new Element("DIV", {
			class: "bg_main",
			style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; opacity:0.5;"
		});
		
		this.bg1.on("click", "div", function(e) {
			h.close();
		});
		
		this.bg.insert(this.bg1);
		document.body.insert(this.bg);
		
		this.dlg = new Element("DIV", {
			style: "background-color:white; position:absolute; top:" + h.config.top + "px; left:" + h.config.left + "px; width:" + h.config.width + "px; height:" + h.config.height + "px; z-index:1000000",
			class: "default_shadow"
		});
		
		this.bg.insert(this.dlg);
		
		if (this.config.onShow) {
			this.config.onShow(h.dlg, this);
		}
	},
	/*
	 *
	 */
	close: function() {
		delete this.dlg;
		delete this.bg1;
		
		this.bg.remove();
	}
});

UI.Toast = Class.create({
	initialize: function(config) {
        this.config = Object.extend({
        	title: "DEFAULT_TOAST",
        	description: "DEFAULT_TOAST_HTML"
        }, config || {});
	},
	show: function() {
		var h = this;
			this.div = new Element("DIV", {
				style: "opacity:1.0; position:relative; width:300px; height:100px; display:block; margin:2px; opacity:0.0",
				class: "default_shadow"
			});

			var toast = new Element("DIV", {
				class: "toast"
			});

			this.div.insert(toast);

			var t = new Element("DIV", {
				class: "toast_title"
			});
			t.update(h.config.title);
			toast.insert(t);

			var d = new Element("DIV", {
				class: "toast_description"
			});
			d.update(h.config.description);
			toast.insert(d);

		return h.div;
	},
	added: function() {
		var h = this;
		
		var player = this.div.animate([
		    {opacity: 0.0, transform: "scale(0)"},
		    {opacity: 1.0, transform: "scale(1)"}
		], {
			direction: 'normal',
			easing: "ease-in-out",
		    duration: 750,
			iterations: 1,
			fill: "both"
		});
		
		player.onfinish = function(e) {
			var f = function() {
				h.close();
			}
			setTimeout(f, 5000);
		}
	},
	close: function() {
		var h = this;
	
		var player = this.div.animate([
		    {opacity: 1.0, transform: "scale(1)"},
		    {opacity: 0.0, transform: "scale(0)"}
		], {
			direction: 'normal',
		    duration: 750,
		    easing: "ease-in-out",
			iterations: 1,
			fill: "both"
		});
		
		player.onfinish = function(e) {
			h.div.remove();
		}
	}
});

UI.ToastManager = Class.create({
	initialize: function(config) {
        this.config = Object.extend({
        }, config || {});
        
        this.render();
	},
	render: function() {
		var h = this;
		this.div = new Element("DIV", {
			style: "position:absolute; top:70px; right:400px; width:300px; z-index:2000000; background-color:transparent"
		});
		window.document.body.insert(this.div);
	},
	showToast: function(_title, _description, bean) {

		var title = _title;
		var description = _description;

		if (bean !== undefined) {
			title = title;
			description = description;
		}
		
		var toast = new UI.Toast({
			title: title,
			description: description,
			level: 0
		});
		
		this.div.insert(toast.show());
		
		toast.added();
		
		var closefun = function() {
			toast.close();
		}
		
		setTimeout(closefun, 5000);
	}
});

/*
 * Utilities
 */
/**
 * @class UI.StringUtils
 */
UI.StringUtils = Class.create({
	initialize: function(config) {
        this.config = Object.extend({
        }, config || {});
	},
	compile: function(str, bean) {
		var result = str;

		var found = [];
		var rxp = /{([^}]+)}/g;
		var curMatch;

			while(curMatch = rxp.exec( str ) ) {
			    found.push(curMatch[1]);
			}
			
			var i=0;
			for (i=0; i<found.length; i++) {
				try {
					var val = eval("bean." + found[i]);
					if (val !== undefined) {
						result = result.replace("{" + found[i] + "}", val)
					} else {
						result = result.replace("{" + found[i] + "}", "")
					}
				} catch (e) {
					result = result.replace("{" + found[i] + "}", "")
				}
			}
			
		return result;
	},
	unempty: function(v) {
		var result = "";
			if (v !== undefined) {
				result = v;
			}
		return result;
	}
});

var STRUTILS = new UI.StringUtils();

UI.CookieManager = Class.create({
    initialize: function(config) {
    },
    setCookie: function(name, value) {
        var days = 100;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    },
    getCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
});

UI.Resources = Class.create({
    initialize: function(path, appName) {
        this.path = path;

        this.postfix = "";

        var cookieManager = new UI.CookieManager();
            if(cookieManager.getCookie("lang_" + appName) != null) {
                var language = cookieManager.getCookie("lang_" + appName).evalJSON();
                this.postfix = language.fileExt;
            }
        this.properties = new Hash();
    },
    load: function() {
        var handler = this;

		try {
	        new Ajax.Request(this.path + this.postfix + ".properties?ts=" + new Date(), {
	            method: 'GET',
	            contentType: "text/plain",
	            onSuccess: function(transport) {
	                var response = transport.responseText || "no response text";

	                var list = response.split("\n");
	                var i=0;
	                for (i=0; i<list.length; i++) {
	                    try {
	                    	
	                        if (list[i].trim().indexOf("#") == 0) {
	                            continue;
	                        }
	
	                        var eqIndex = list[i].indexOf("=");
	                        
	                        var key = list[i].substr(0, eqIndex).trim();
	                        var value = list[i].substr(eqIndex + 1).trim();
	                        
	                        if ("" != key) {
	                        	handler.properties.set(key, value);
	                        }
	                    } catch (e) {
							alert(e);
	                    }
	                }

	                handler.onLoad();
	            },
	            onFailure: function(s) {  
					$SIGNAL("failure");
	            }
	        });
        } catch (e) {
        	alert(e);
        }
    },
    get: function(key, bean) {
        var result = "";
            if ((result = this.properties.get(key)) === undefined) {
                result = "???_" + key + "_???";
            }

            if (bean !== undefined) {
            	result = STRUTILS.compile(result, bean);
            }
            
        return result; 
    }
});

var UID = {
		_current: 0,
		getNew: function(){
			this._current++;
			return this._current;
		}
	};

	HTMLElement.prototype.pseudoStyle = function(element,prop,value){
		var _this = this;
		var _sheetId = "pseudoStyles";
		var _head = document.head || document.getElementsByTagName('head')[0];
		var _sheet = document.getElementById(_sheetId) || document.createElement('style');
		_sheet.id = _sheetId;
		var className = "pseudoStyle" + UID.getNew();
		
		_this.className +=  " "+className; 
		
		_sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
		_head.appendChild(_sheet);
		return this;
	};