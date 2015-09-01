
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

UI.toHTML = function(json, _root) {
    var result = null;
    var root = _root || {};
	if (json.tag) {
	    var innerText = null;
	    var attrs = {};
	    var attrName = null;
	    var subElements = null;

	    for (attrName in json) {
	        if ("$insert" !== attrName && "tag" !== attrName) {
	            attrs[attrName] = json[attrName];
	        } else if ("$insert" === attrName) {
	            if (json["$insert"] && !(json["$insert"] instanceof Array)) {
	                innerText = json["$insert"];
	            } else if (json["$insert"] && json["$insert"] instanceof Array) {
                    json["$insert"].forEach(function(element) {
                        subElements = subElements || [];
                        subElements.push(UI.toHTML(element, root));
                    });
                }
	        }
	    }
	    result = new Element(json.tag, attrs);

	    if (innerText !== null) {
	        result.update(innerText);
	    } else if (subElements !== null) {
	        subElements.forEach(function(element) {
	            result.insert(element);
	        });
	    }
	}
	return result;
}

UI.upgrade = function(root) {
    componentHandler.upgradeElement(root);
    for (var i=0; i<root.childNodes.length; i++) {
        try {
            if (root.childNodes[i] instanceof HTMLElement) {
                UI.upgrade(root.childNodes[i]);
            }
        } catch (e) {
            alert(e);
        }
    }
}

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
/**
 * @class UI.IconSet
 */
UI.IconSet = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
        	path: "",
        	hash: new Hash()
        }, config || {});

        this.config.hash.set("default", "/ic_stars_white_18dp.png");
        this.config.hash.set("menu", "/ic_stars_black_18dp.png");
        this.config.hash.set("done", "/ic_done_white_18dp.png");
        this.config.hash.set("menu", "/ic_reorder_white_18dp.png");
        this.config.hash.set("refresh", "/ic_cached_white_18dp.png");
        this.config.hash.set("help", "/ic_help_white_18dp.png");
        this.config.hash.set("download", "/ic_get_app_white_18dp.png");
        this.config.hash.set("calendar", "/ic_reorder_white_18dp.png");
        this.config.hash.set("cancel", "/ic_thumb_down_white_18dp.png");
        this.config.hash.set("add", "/ic_note_add_white_18dp.png");
        this.config.hash.set("close", "/ic_highlight_remove_white_18dp.png");
        this.config.hash.set("search", "/ic_pageview_white_18dp.png");
        this.config.hash.set("resize", "/ic_open_with_white_18dp.png");
        this.config.hash.set("login", "/ic_accessibility_white_18dp.png");
        this.config.hash.set("import", "/ic_input_white_18dp.png");
        this.config.hash.set("arrow_right", "/ic_trending_neutral_white_18dp.png");
    },
    getIcon: function(iconId) {
    	var h = this;
		
    	var result = "";
    	
    	var src = this.config.hash.get(iconId);
    		if (src === null || src === undefined) {
    			result = this.getIcon("help");
    		} else {
    			result = h.config.path + src;
    		}
    	return result;
    }
});
/**
 * @class UI.MaterialComponent
 */
UI.MaterialComponent = Class.create({
	/**
	 * @constructor
	 * @param config
	 */
    initialize: function(config) {
		try {
	        this.initConfig(config);
	        this.renderMaterial();
			this.render();
		} catch (e) {
			alert("--------" + e);
		}
    },
    initConfig: function(config) {
    	alert("initConfig() not implemeted");
    },
    renderMaterial: function() {    	
    	var h = this;
    	
			h.material = new Element("DIV", {});
			h.config.inside.insert(h.material);

	    	h.material.on("mousedown", function(e) {
				//e.cancelBubble = true;
				//e.returnValue = false;
			});
			
	    	h.material.on("click", function(e) {
				//e.cancelBubble = true;
				//e.returnValue = false;
			});
    },
    render: function() {
    	alert("render() not implemeted");
    },
    /**
     * @methid getMaterial
     * 
     * Pobranie materiału, na którym będzie wyeysowany komponent
     */
    getMaterial: function() {
    	return this.material;
    },
    /**
     * @method destroy
     */
    destroy: function() {
    	var h = this;
			h.material.remove();
			
			delete h.material;
    }
});
/**
 * @class UI.PanelButton
 */
UI.PanelButton = Class.create({
	/**
	 * 
	 * @param config
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            title: "...",
            icon: "done"
        }, config || {});

        this.render();
    },
    /**
     * @method render
     */ 
    render: function() {
    	var h = this;

    	h.buttonDiv = new Element("DIV", {
    		style: "border-radius:50%; width:26px; height:26px; line-height:26px; margin:2px; display:flex; justify-content:center; align-items:center",
    		class: "panel-button"
    	});
    	h.config.inside.insert(h.buttonDiv);

    	if (h.config.fill) {
	    	h.buttonDiv.setStyle({
	    		backgroundColor: h.config.fill 
	    	});
    	}

    	if (h.config.customIcon !== undefined) {
	    	h.img = new Element("IMG", {
	    		src: h.config.customIcon,
	    		title: h.config.title,
	    		style: "width:18px",
	    	});
	    	h.buttonDiv.insert(h.img);
    	} else if (h.config.icon) {
	    	h.img = new Element("IMG", {
	    		src: $ICON(h.config.icon),
	    		title: h.config.title
	    	});
	    	h.buttonDiv.insert(h.img);
    	}
    	
    	h.buttonDiv.on("click", function(e) {
    		if (h.config.onClick) {
    			h.config.onClick();
    		}
    	});
    }
});
/**
 * @class UI.PanelToolbar
 */
UI.PanelToolbar = Class.create({
	/**
	 * 
	 * @param config
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            buttons: []
        }, config || {});

        this.render();
    },
    /**
     * @method render 
     */ 
    render: function() {
    	var h = this;

    	h.material = new Element("DIV", {
    		style: "position:absolute; display:flex; flex-direction:row; top:0px; left:0px; right:0px; bottom:0px"
    	});
    	h.config.inside.update(h.material);

    	h.setButtons(h.config.buttons);
    },
    /**
     * 
     * @param buttons
     */
    setButtons: function(buttons) {
    	var h = this;

    	var i = 0;
    	for (i=0; i<buttons.length; i++) {
    		var buttonConfig = buttons[i];
    			buttonConfig.inside = h.material; 

    		var button = new UI.PanelButton(buttonConfig);
    	}
    }
});
UI.Panel = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body
        }, config || {});

        this.render();
    },
    render: function() {
        var h = this;

        h.root = h.prepareRoot();
        h.config.inside.update(h.root);

        h.setTabs(h.config.tabs);

        UI.upgrade(h.root);
    },
    getContent: function() {
    	return this.root.querySelector("#contents");
    },
    setTitle: function(title) {
    	this.root.querySelector("#title").update(title);
    },
    setTabs: function(tabs) {
        var h = this;

        if (!tabs) return;

        h.prepareHeaderTabs(tabs);
        h.prepareContentTabs(tabs);
    },
    prepareHeaderTabs: function(tabs) {
        var h = this;

        if (h.root.querySelector("#header-tabs")) {
            h.root.querySelector("#header-tabs").update();
        } else {
            h.root.querySelector("#header").insert(UI.toHTML({
                tag: "div", class: "mdl-layout__tab-bar mdl-js-ripple-effect", id: "header-tabs",
            }));
        }

        tabs.forEach(function(tab, index) {
            var tabHeader = UI.toHTML({
                tag: "a",
                href: "#tab_" + index,
                class: "mdl-layout__tab",
                $insert: tab.name
            });
            h.root.querySelector("#header-tabs").insert(tabHeader);

            tabHeader.on("click", function(e) {
                if (tab.onActivate) {
                    tab.onActivate(h.root.querySelector("#tab_" + index))
                }
            });
        });
    },
    prepareContentTabs: function(tabs) {
        var h = this;

        h.root.querySelector("#contents").update();

        tabs.forEach(function(tab, index) {
            var json = {
                tag: "section", class: "mdl-layout__tab-panel", id: "tab_" + index,
                $insert: [{
                    tag: "div", class: "page-content",
                }]
            }

            var tabContent = UI.toHTML(json);
            h.root.querySelector("#contents").insert(tabContent);
        });
    },
    prepareRoot: function() {
        var h = this;

        var json = {
            tag: "div", class: "mdl-layout mdl-js-layout mdl-layout--fixed-header",
            $insert: [{
                tag: "header", class: "mdl-layout__header", id: "header",
                $insert: [{
                    tag: "div", class: "mdl-layout__header-row",
                    $insert: [{
                        tag: "span", class: "mdl-layout-title", id: "title",
                        $insert: h.config.title
                    }]
                }]
            }, {
                tag: "div", class: "mdl-layout__drawer", style: "max-width:600px",
                $insert: [{
                    tag: "span", class: "mdl-layout-title",
                    $insert: h.config.title,
                }]
            }, {
                tag: "main", class: "mdl-layout__content", id: "contents",
            }]
        };

        return UI.toHTML(json);
    }
});


UI.DateUtils = Class.create({
   initialize: function() {
       this.months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
   },
   formatDate: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               result = this.formatNumber(date.getDate(), 2) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getFullYear(), 4);
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatDateYYYYMMDD: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               var parser = new DateParser(UI.DATE_YYYMMMDDD_FORMAT);
                   result = parser.format(date);
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatFullDate: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               var parser = new DateParser(UI.DATE_FORMAT);
                   result = parser.format(date);
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatDateTime: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               result = this.formatNumber(date.getFullYear(), 4) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2) + " " + this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2) + ":" + this.formatNumber(date.getSeconds(), 2);
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatDateTimeNoSec: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               result = this.formatNumber(date.getFullYear(), 4) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2) + " " + this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatDateMonthDayTimeNoSec: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               result = this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2) + " " + this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatTime: function(date) {
       var result = "";
           try {
               result = this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
           } catch (e) {
               result = "";
           }
       return result;
   },
   formatTimeSec: function(date) {
       return this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2) + ":" + this.formatNumber(date.getSeconds(), 2);
   },
   formatTimeSecNoZerosSec: function(date) {
	   var result = this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
	   	if (date.getSeconds() > 0) {
	   		result += ":" + this.formatNumber(date.getSeconds(), 2);
	   	}
       return result;
   },
   formatNumberToTime: function(num) {
       var hours = (num - (num % 60)) / 60;
       var minutes = num % 60;

       return this.formatNumber(hours, 2) + ":" + this.formatNumber(minutes, 2);
   },
   formatNumberToTimeSec: function(num) {
	  var hours   = Math.floor(num / 3600);
	  var minutes = Math.floor((num - (hours * 3600)) / 60);
	  var seconds = num - (hours * 3600) - (minutes * 60);

      return this.formatNumber(hours, 2) + ":" + this.formatNumber(minutes, 2) + ":" + this.formatNumber(seconds, 2);
   },
   formatNumber: function(num, len) {
       var result = null;
       try {
           result = "" + parseInt(num);
           while (result.length < len) {
               result = "0" + result;
           }
       } catch (e) {
           new UI.AlertDialog({message: e});
       }

       if (isNaN(parseInt(num))) {
           result = "";
       }

       return result;
   },
   parseNumber: function(number) {
   },
   parseDate: function(dateStr) {

       if (!dateStr) {
           return "";
       }

       var parser = new DateParser(UI.DATE_FORMAT);
           result = parser.parse(dateStr);

       return result;
   },
   getMonthName: function(zeroBasedNo) {
       return this.months[zeroBasedNo];
   },
   rollDays: function(pDate, pDays) {
       var result = pDate;
           result.setDate(result.getDate() + pDays);
       return result;
   },
   rollHours: function(pDate, pHours) {
       var result = new Date();
           result.setTime(pDate.getTime() + (pHours * 60 * 60 *1000));
       return result;
   },
   dayDiff: function(startDate, endDate) {
       var result = 0;
           var sDate = new Date();
               sDate.setFullYear(startDate.getFullYear());
               sDate.setMonth(startDate.getMonth());
               sDate.setDate(startDate.getDate());
               sDate.setHours(0);
               sDate.setMinutes(0);
               sDate.setSeconds(0);
               sDate.setMilliseconds(0);

           var eDate = new Date();
               eDate.setFullYear(endDate.getFullYear());
               eDate.setMonth(endDate.getMonth());
               eDate.setDate(endDate.getDate());
               eDate.setHours(0);
               eDate.setMinutes(0);
               eDate.setSeconds(0);
               eDate.setMilliseconds(0);

           result = (eDate.getTime() - sDate.getTime()) / 1000 / 60 / 60 / 24;

       return result;
   },
   hoursDiff: function(startDate, endDate) {
       var result = 0;
           var sDate = new Date();
               sDate.setFullYear(startDate.getFullYear());
               sDate.setMonth(startDate.getMonth());
               sDate.setDate(startDate.getDate());
               sDate.setHours(startDate.getHours());
               sDate.setMinutes(0);
               sDate.setSeconds(0);
               sDate.setMilliseconds(0);

           var eDate = new Date();
               eDate.setFullYear(endDate.getFullYear());
               eDate.setMonth(endDate.getMonth());
               eDate.setDate(endDate.getDate());
               eDate.setHours(endDate.getHours());
               eDate.setMinutes(0);
               eDate.setSeconds(0);
               eDate.setMilliseconds(0);

           result = (eDate.getTime() - sDate.getTime()) / 1000 / 60 / 60;

       return result;
   },
   minutesDiff: function(startDate, endDate) {
       var result = 0;

           result = ((endDate.getTime() - startDate.getTime()) / 1000 / 60).toFixed(0);

       return result;
   },
   yearDiff18: function(birthDate, currDate) {

       var result = false;

           var currDate = new Date (currDate);
           var birthDate = new Date (birthDate);

           var currYear = new Date(currDate);
           var currMonth = new Date(currDate);
           var currDay = new Date(currDate);

           var birthYear = new Date(birthDate);
           var birthMonth = new Date(birthDate);
           var birthDay = new Date(birthDate);

           currYear = currYear.getFullYear();
           currMonth = currMonth.getMonth() + 1;
           currDay = currDay.getDate();

           birthYear = birthYear.getFullYear(birthDate);
           birthMonth = birthMonth.getMonth(birthDate) + 1;
           birthDay = birthDay.getDate(birthDate);

           if ( (currYear - birthYear > 18)   || ((currYear - birthYear >= 18) && (currMonth - birthMonth >= 0) && (currDay - birthDay >= 0))) {
               result = true;
           } else {
               result = false;
           }
       return result;
   },
   roundToDay: function(date) {
       if(date === undefined || date ==+ ""){
           date = new Date();
       }
       var eDate = new Date();
           eDate.setFullYear(date.getFullYear());
           eDate.setMonth(date.getMonth());
           eDate.setDate(date.getDate());
           eDate.setHours(0);
           eDate.setMinutes(0);
           eDate.setSeconds(0);
           eDate.setMilliseconds(0);

       return eDate;
   },
   getNowMinutes: function() {
       var result = 0;
           var d = new Date();
           result = (d.getHours() * 60) + d.getMinutes();
       return result;
   },
   /**
    * na wejsciu czas w formacie HH:MM
    * na wyjściu liczba HH * 60 + MM
    */
   convertTimeToInt: function(time) {
	   var result = 0;
	       try {
	    	   var sub = time.split(":");
	    	   result = parseInt(sub[0]) * 60 + parseInt(sub[1]);
	       } catch (e) {
	           result = 0;
	       }
	   return result;
   },
   convertIntToTime: function(intValue) {
	   var result = "00:00";
	       try {
	    	   result = this.formatNumber(((intValue - intValue % 60) / 60), 2) + ":" + this.formatNumber((intValue % 60), 2)
	       } catch (e) {

	       }
	   return result;
   }
});

/**
 * @class UI.DatePicker
 */
UI.DatePicker = Class.create({
	initialize: function(config) {
		this.config = config;
		
		if (!this.config.date) {
			this.config.date = new Date();
		}
		
		this.config.date = new UI.DateUtils().roundToDay(this.config.date);

		this.display();
	},
	display: function() {
		var handler = this;

		if (this.config) {
			/*
			 * miesiac
			 */
			this.monthDescription = new Element("DIV", {
				class: "calendar_day",
				style: "text-align:center; width:90px; top:10px; left:35px; overflow:hidden"
			});
			this.config.inside.insert(this.monthDescription);
			this.monthDescription.observe("click", function(e) {
				e.cancelBubble = true;
				handler.showMonths();
			});
	
			/*
			 * rok
			 */
			this.yearDescription = new Element("DIV", {
				class: "calendar_day",
				style: "text-align:center; width:37px; top:10px; right:0px; overflow:hidden; padding:0px"
			});
			this.config.inside.insert(this.yearDescription);
			
			this.yearDescription.observe("click", function(e) {
				e.cancelBubble = true;
				handler.showYears();
			});
			
			/*
			 * dzien
			 */
			this.dateDescription = new Element("DIV", {
				class: "calendar_day",
				style: "text-align:center; width:17px; top:10px; left:11px; overflow:hidden; padding:0px"
			});
			this.config.inside.insert(this.dateDescription);

			this.dateDescription.observe("click", function(e) {
				e.cancelBubble = true;
			});
						 
			/*
			 * DNI
			 */
			this.days = new Element("DIV", {
				style: "position:absolute; top:30px; left:5px; width:175px; height:150px; border:1px solid transparent"
			});
			this.config.inside.insert(this.days);
			
			this.updateDateInfo();
		}
	},
	updateDateInfo: function() {
		var handler = this;
		
		var configDate = new Date();
		if(this.config.date !== undefined) {
			configDate = this.config.date;
		}
		
		var DU = new UI.DateUtils();
	
		this.dateDescription.update(configDate.getDate());
		this.monthDescription.update(DU.getMonthName(configDate.getMonth()));		
		this.yearDescription.update(configDate.getFullYear());
		
			this.days.update("");
		
			var currentMonth = configDate.getMonth();

			var d = DU.roundToDay(new Date());

				d.setTime(configDate.getTime());
				d.setDate(1);
				d.setMonth(configDate.getMonth());
				
				var dayOfWeek = d.getDay();

				d = DU.rollDays(d, -dayOfWeek);
				
				// stage: 0 - before, 1 - current month, 2 - after current month
				var stage = 0;
				
				if (currentMonth == d.getMonth()) {
					stage = 1;
				}
				
				var top = 5;
				var left = 5;

				while(stage <= 2) {
					var color = "#222222";
					
					if (d.getDay() == 0) {
						color = "red";
					}
					
					if (d.getDay() == 6) {
						color = "#9393b1";
					}
				
					var day = new Element("DIV", {
						class: "calendar_day",
						style: "width:14px; color:" + color + "; top:" + top + "px; left:" + left + "px;"
					});
					
					day.date = new Date();
						day.date.setTime(d.getTime());

					day.update(d.getDate());
					
					day.title = "" + d;
					
					if (d.getDate() == configDate.getDate() && d.getMonth() == configDate.getMonth() && d.getFullYear() == configDate.getFullYear()) {
						day.setStyle({
							border: "1px solid #99bbe8",
							backgroundColor: "white",
							color: "black"
						});
					}
					
					var nd = new Date();
					if (d.getDate() == nd.getDate() && d.getMonth() == nd.getMonth() && d.getFullYear() == nd.getFullYear()) {
						day.setStyle({
							border: "1px solid #99bbe8",
							backgroundColor: "#d2e1f4",
							color: "black"
						});
					}

					day.observe("click", function(event) {
						if (handler.config.dateSelected) {
							handler.config.dateSelected(event.element().date);
						}
					});

					this.days.insert(day);

					if (stage == 0) {
						if (currentMonth == d.getMonth()) {
							stage = 1;
						}
					} else if (stage == 1) {
						if (currentMonth != d.getMonth()) {
							stage = 2;
						}
					}

					d = DU.rollDays(d, 1);
					
					if (d.getDay() == 0) {
						left = 5;
						top += 20;
					} else {
						left += 24;
					}
					
					if (stage == 2 && d.getDay() == 0) {
						stage = 3;
					}
				}
	},
	showMonths: function() {
		var handler = this;
		
		var monthsCanvas = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:white"
		});
		
		monthsCanvas.observe("click", function(e) {
			e.cancelBubble = true;
		});
		
		handler.config.inside.insert(monthsCanvas);
		
		var DU = new UI.DateUtils();

		var top = 20;
		var left = 10;

		var i=0;
		for (i=0; i<DU.months.length; i++) {
		
			top = 20 + (i % 6) * 20;
			left = 10 + ((i - (i%6)) / 6) * 80;
		
			var color = "";
			if (i == handler.config.date.getMonth()) {
				color = "color:#99bbe8";
			}
		
			var m = new Element("DIV", {
				style: "position:absolute; text-align:center; width:80px; height:14px; top:" + top + "px; left:" + left + "px;" + color,
				class: "calendar_day"
			});
			m.month = i;
			m.update(DU.months[i]);
			
			m.observe("click", function(e) {
				handler.config.date.setDate(1);
				handler.config.date.setMonth(e.target.month);
				handler.updateDateInfo();
				monthsCanvas.remove();
			});
			
			monthsCanvas.insert(m);
		}
	},
	showYears: function() {
		var handler = this;
		
		var yearsCanvas = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:white"
		});
		
		yearsCanvas.observe("click", function(e) {
			e.cancelBubble = true;
		});
		
		handler.config.inside.insert(yearsCanvas);
		
		var DU = new UI.DateUtils();

		var top = 20;
		var left = 10;

		var startYear = handler.config.date.getFullYear() - 5;

		var i=0;
		for (i=0; i<DU.months.length; i++) {
		
			top = 20 + (i % 6) * 20;
			left = 10 + ((i - (i%6)) / 6) * 80;
		
			var color = "";
			if ((startYear + i) == handler.config.date.getFullYear()) {
				color = "color:#99bbe8";
			}
		
			var m = new Element("DIV", {
				style: "position:absolute; text-align:center; width:80px; height:14px; top:" + top + "px; left:" + left + "px;" + color,
				class: "calendar_day"
			});
			m.year = (startYear + i);
			m.update((startYear + i));
			
			m.observe("click", function(e) {
				handler.config.date.setFullYear(e.target.year);
				handler.updateDateInfo();
				yearsCanvas.remove();
			});
			
			yearsCanvas.insert(m);
		}
	}
});

UI.Fab = Class.create({

    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            width: 40,
            height: 40,
            fill: "orange",
            icon: "help",
            access: UI.VISIBLE,
            title: "",
            style: undefined
        }, config || {});

        this.render();
    },

    render: function() {
    	var h = this;
    	
    	h.material = new Element("DIV", {
    		"style": "margin:10px; box-shadow: 3px 3px 8px #666666; padding:0px; font-size:12px; color:white; text-align:center; line-height:40px; border-radius:50%; height:40px; width:40px; background-color:" + h.config.fill + "; overflow:hidden; opacity:1",
    		"title": h.config.title
    	});
    	
    	if (h.config.style) {
    		h.material.style = h.config.style;
    	}
    	
    	h.material.on("mousedown", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
    	h.material.on("click", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
    	
    	if (h.config.customIcon !== undefined) {
    		h.material.setStyle({
    			background: "url('" + h.config.customIcon + "') no-repeat center center " + h.config.fill
    		});
    	} else if (h.config.icon !== undefined) {
    		h.material.setStyle({
    			background: "url('" + $ICON(h.config.icon) + "') no-repeat center center " + h.config.fill
    		});
    	}

    	h.material.on("click", function() {
        	if (h.config.onClick !== undefined) {
        		h.config.onClick(h);
        	}
    	});

    	h.config.inside.insert(h.material);

    	if (h.config.targetFill !== undefined) {
    		h.material.on("mouseover", function() {
    			var player = h.material.animate([
         		    { 
         		    	backgroundColor: h.config.fill
         		    },
         		    { 
         		    	backgroundColor: h.config.targetFill
         		    },
         		], {
         			direction: 'normal',
         		    duration: 600,
         		    easing: "ease",
         			iterations: 1,
         			fill: "both"
         		});
    		});
    		
    		h.material.on("mouseout", function() {
    			var player = h.material.animate([
         		    { 
         		    	backgroundColor: h.config.targetFill
         		    },
         		    { 
         		    	backgroundColor: h.config.fill
         		    },
         		], {
         			direction: 'normal',
         		    duration: 600,
         		    easing: "ease",
         			iterations: 1,
         			fill: "both"
         		});
    		});
    	}
    },
    getMaterial: function() {
    	return this.material;
    },
    hide: function() {
    	var h = this;
    		h.material.hide();
    },
    disappear: function() {
    	var h = this;

		var player = h.material.animate([
  		    {
  		     opacity: 1, 
  		     transform: "scale(1)"
  		    },
  		    {
  		     opacity: 0.0, 
  		     transform: "scale(4)"
  		    },
  		], {
  			direction: 'normal',
  		    duration: 1000,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
    },
    appear: function() {
    	var h = this;

		var player = h.material.animate([
   		    {
 		     opacity: 0.0, 
 		     transform: "scale(4)"
 		    },
  		    {
  		     opacity: 1, 
  		     transform: "scale(1)"
  		    },
  		], {
  			direction: 'normal',
  		    duration: 1000,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
    },
    show: function() {
    	var h = this;
    		h.material.show();
    }
});
/**
 * @class UI.FabProgress
 */
UI.FabProgress = Class.create({

    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            scale: 2
        }, config || {});

        this.render();
    },

    render: function() {
    	var h = this;
    		
    	h.div = new Element("DIV", {
    		style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:black; opacity:0.5; z-index:100000"
    	});
    	h.config.inside.insert(h.div);

    	h.fab = h.config.fab.getMaterial().clone();
    	
    	h.fab.setStyle({
    		left: h.config.fab.getMaterial().getClientRects()[0].left + "px",
    		top: h.config.fab.getMaterial().getClientRects()[0].top + "px"
    	});

    	h.div.insert(h.fab);
    	h.animate(h.fab);
    },
    animate: function(fab) {
    	var h = this;
    	
    	if (h.closed) {
    		return;
    	}
    	
		var fa = fab.clone();
		fa.setStyle({ 
			zIndex: 100002
		});
		h.config.inside.insert(fa);
		var player = fa.animate([
 		    {
 		     opacity: 1, 
 		     transform: "scale(0.1)"
 		    },
 		    {
 		     opacity: 0.0, 
 		     transform: "scale(" + h.config.scale + ")"
 		    },
 		], {
 			direction: 'normal',
 		    duration: 1000,
 		    easing: "ease",
 			iterations: 1,
 			fill: "both"
 		});
		
   		player.onfinish = function() {
   			fa.remove();
   			h.animate(fab);
   		}
    },
    setPercentage: function(percentage) {
    	var h = this;
    	if (h.label == undefined) {
    		h.label = new Element("DIV");
        	h.label.setStyle({
        		width: 200 + "px",
        		height: 20 + "px",
        		border: "1px solid " + h.config.fab.config.fill,
        		color: h.config.fab.config.fill,
        		textAlign: "center",
        		backgroundColor: "transparent",
        		position: "absolute",
        		left: (h.config.fab.getMaterial().getClientRects()[0].left + 40) + "px",
        		top: h.config.fab.getMaterial().getClientRects()[0].top + "px"
        	});

        	h.div.insert(h.label);
        	
    		h.prog = new Element("DIV");
        	h.prog.setStyle({
        		width: 200 + "px",
        		height: 20 + "px",
        		border: "0px",
        		opacity: "0.2",
        		textAlign: "center",
        		backgroundColor: h.config.fab.config.fill,
        		position: "absolute",
        		left: (h.config.fab.getMaterial().getClientRects()[0].left + 40) + "px",
        		top: h.config.fab.getMaterial().getClientRects()[0].top + "px"
        	});

        	h.div.insert(h.prog);
    	}

    	h.prog.setStyle({
    		width: (2 * percentage) + "px"
    	});
    	h.label.update(percentage + "%");
    },

    close: function() {
    	var h = this;

    	h.closed = true;
    	
		h.div.remove();
		delete h.div;
		
		h.fab.remove();
		delete h.fab;
    }
});
/**
 * @class UI.FabToolbar
 */
UI.FabToolbar = Class.create({
	/**
	 * @constructor
	 * @param config
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            orientation: "right",
            buttons: [
            ],
            onClicked: function() {

            }
        }, config || {});

        this.render();
    },
    /**
     * @method render
     */
    render: function() { 
    	var h = this;

    	h.material = new Element("DIV", {
    		style: "position:absolute; top:0px; left:0px; right:0px; height:60px; display:flex; flex-direction:row-reverse; background-color:rgba(200, 200, 200,0.1); ",
    	});

    	h.config.inside.insert({
    		top: h.material
    	});

    	h.setButtons(h.config.buttons);
    },
    /**
     * @method setButtons
     * @param buttons
     */
    setButtons: function(buttons) {
    	var h = this;

    	h.material.update();

    	h.fabs = [];

    	buttons
	    	.filter(function(button) {
	    		return !(button.access !== undefined && button.access != UI.VISIBLE)
	    	})
	    	.forEach(function(button) {
	        	var conf = Object.extend({}, button);
	        		conf.inside = h.material;
	        		conf.onClick = function() {
	        			button.onClick(fab);
	        			h.config.onClicked(fab);
	        		};

	    		var fab = new UI.Fab(conf);

	    		h.fabs.push(fab);
	    	});
    },
    hide: function() {
    	var h = this;
    		h.hideOrShow(false);
    },
    show: function() {
    	var h = this;
    		h.hideOrShow(true);
    },
    /**
     * @param display
     */
    hideOrShow: function(display) {
    	var h = this;

    	h.fabs.forEach(function(fab) {
			if (!display) {
				fab.hide();
			} else {
				fab.show();
			}
    	});
    }
});

/** 
 * 
 */
UI.Material = Class.create({
	/**
	 * 
	 * @param config
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            effect: "from-left",
            position: "top:100px; left:100px; width:500px; height:500px",
            modal: false
        }, config || {});

        this.render();
    },
    /**
     * 
     */
    render: function() {
    	var h = this;
    	
    	if (h.config.modal == true) {
			h.curtain = new Element("DIV", {
				style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; border:0px solid transparent; display:none; backgroun:rgba(0,0,0,0.8)"
			});
			h.config.inside.insert(h.curtain);
    	}

    	h.material = new Element("DIV", {
    		style: "position:absolute; overflow:hidden; background-color:white; " + h.config.position,
    		"class": "default_shadow"
    	});
    	
//    	h.material.on("mousedown", function(e) {
//			e.cancelBubble = true;
//			e.returnValue = false;
//		});
//
//    	h.material.on("click", function(e) {
//			e.cancelBubble = true;
//			e.returnValue = false;
//		});
//
//    	h.material.on("dblclick", function(e) {
//			e.cancelBubble = true;
//			e.returnValue = false;
//		});

    	h.config.inside.insert(h.material);
    	
    	h.width = h.material.getBoundingClientRect().width;
    	h.height = h.material.getBoundingClientRect().height;
    	h.left = h.material.getBoundingClientRect().left - h.config.inside.getBoundingClientRect().left;
    	h.right = h.material.getBoundingClientRect().right;
    	h.bottom = parseInt(h.material.style.bottom);
    	h.top = h.material.getBoundingClientRect().top;

    	if (h.config.effect == "from-left") {
    		h.material.setStyle({
    			left: (-h.width) + "px"
    		});
    	} else if (h.config.effect == "from-right") {
    		h.material.setStyle({
    			right: (-h.width) + "px"
    		});
    	} else if (h.config.effect == "from-bottom") {
    		h.material.setStyle({
    			bottom: (-h.height) + "px"
    		});
    	} else if (h.config.effect == "from-top") {

    	}
    	
    	h.material.on("mousedown", function(e) {
    		if (e.cancelBubble) {
    			e.cancelBubble = true;
    		} else if (e.cancelPropagation) {
    			e.cancelPropagation();
    		}
		});

    	h.material.on("click", function(e) {
    		if (e.cancelBubble) {
    			e.cancelBubble = true;
    		} else if (e.cancelPropagation) {
    			e.cancelPropagation();
    		}
		});

    	h.config.inside.insert(h.material);
    },
    show: function() {
    	var h = this;
    	
    	h.curtainOn();

    	if (h.config.effect == "from-left") {
    		var player = h.material.animate([
    		    {transform: "translate(0px, 0px)"},
    		    {transform: "translate(" + (h.width + h.left) + "px, 0px)"},
    		], {
    			direction: 'normal',
    		    duration: 450,
    		    easing: "ease",
    			iterations: 1,
    			fill: "both"
    		});
    	} else if (h.config.effect == "from-right") {
    		var player = h.material.animate([
     		    {transform: "translate(0px, 0px)"},
     		    {transform: "translate(-" + h.width + "px, 0px)"},
     		], {
     			direction: 'normal',
     		    duration: 450,
     		    easing: "ease",
     			iterations: 1,
     			fill: "both"
     		});
    	} else if (h.config.effect == "from-bottom") {
    		var player = h.material.animate([
      		    {transform: "translate(0px, 0px)"},
      		    {transform: "translate(0px, -" + (h.bottom + h.height) + "px)"},
      		], {
      			direction: 'normal',
      		    duration: 450,
      		    easing: "ease",
      			iterations: 1,
      			fill: "both"
      		});
    	}

    	h.material.setStyle({
    		"z-index": 1000000
    	});
    },
    updateHeight: function(pixels) {
    	var h = this;
    	
		var player = h.material.animate([
		    {height: h.height + "px"},
		    {height: pixels + "px"}
		], {
			direction: 'normal',
		    duration: 750,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
		
		player.onfinish = function() {
	    	h.height = pixels;
	    	
	    	if (h.config.onHeightChanged) {
	    		h.config.onHeightChanged();
	    	}
		};
    },
    hide: function() {
    	var h = this;

    	if (h.config.effect == "from-left") {
    		var player = h.material.animate([
    		    {transform: "translate(" + (h.width + h.left) + "px, 0px)"},
    		    {transform: "translate(-" + (h.width + h.left) + "px, 0px)"},
    		], {
    			direction: 'normal',
    		    duration: 750,
    		    easing: "ease",
    			iterations: 1,
    			fill: "both"
    		});
    	} else if (h.config.effect == "from-right") {
    		var player = h.material.animate([
    		    {transform: "translate(-" + (h.width + h.right) + "px, 0px)"},
     		    {transform: "translate(0px, 0px)"}
     		], {
     			direction: 'normal',
     		    duration: 750,
     		    easing: "ease",
     			iterations: 1,
     			fill: "both"
     		});
    	} else if (h.config.from == "bottom") {
    		translateX = 0;
    		translateY = -h.config.height - h.config.bottom;
    	}
   		
    	h.curtainOff();
    },
	curtainOn: function() {
		var h = this;

		if (h.curtain === undefined) {
			return;
		}

		h.curtain.setStyle({
			display: "block",
			"z-index:": 10000000
		});

		var player = h.curtain.animate([
  		    {background: "rgba(0,0,0,0.0)"},
  		    {background: "rgba(0,0,0,0.8)"},
  		], {
  			direction: 'normal',
  		    duration: 200,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
	},
	curtainOff: function() {
		var h = this;
		
		if (h.curtain === undefined) {
			return;
		}

		var player = h.curtain.animate([
  		    {background: "rgba(0,0,0,0.8)"},
  		    {background: "rgba(0,0,0,0.0)"},
		], {
			direction: 'normal',
		    duration: 200,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
		
   		player.onfinish = function(e) {
   			h.curtain.setStyle({
   				display: "none"
   			});
		}
	},
	/**
	 * @method getMaterial
	 */
    getMaterial: function() {
    	return this.material;
    }
});
/*
 * @class UI.List
 */
UI.List = Class.create(UI.MaterialComponent, {
	/*
	 *
	 */
	initConfig: function(config) {            	
        this.config = Object.extend({
        	removable: false,
        	rows: []
        }, config || {});
	},
	/*
	 *
	 */
	render: function() {
		var h = this;

		h.getMaterial().on("mousedown", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
		h.getMaterial().on("click", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
		h.getMaterial().on("DOMMouseScroll", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});

		h.layout = new UI.BorderLayout({
			inside: h.getMaterial(),
			south: {
				height: 60
			}
		});
		
		h.panel = new UI.Panel({
			inside: h.layout.getDefault(),
			buttons: h.config.buttons,
			title: h.config.title
		});

		h.listContent = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; overflow:auto",
			class: "list_content"
		});
		h.panel.getContent().update(h.listContent);
				
		new UI.Form({
			inside: h.layout.getSouth(),
			fields: [
		         {
		        	 property: "search",
		        	 label: "Szukaj",
		        	 disableTab: true,
		        	 onChanging: function(v) {
		        		 var f = function() {
		        			 h.filter(v);	 
		        		 };
		        		 setTimeout(f, 0);
		        	 }
		         }
			]
		});
		
		h.listContent.on("click", "div.list-content-row", function(e, element) {
			if (h.config.onClick) {
				h.config.onClick(element);
			}
		});
		
		h.listContent.on("mouseover", "div.list-content-row", function(e, element) {
			if (h.config.onMouseOver) {
				h.config.onMouseOver(element);
			}
		});
		
		h.listContent.on("mouseout", "div.list-content-row", function(e, element) {
			if (h.config.onMouseOut) {
				h.config.onMouseOut(element);
			}
		});
	},
	/*
	 *  parametr data powinien zawsze zawierac kolekcję rows.
	 *  rows to sa obiekty JSON
	 * 
	 *  np:
	 * 
	 *  var elements = ["A", "B"];
	 *  
	 * 	list.fetch({
	 *     rows: elements
	 *  });
	 */
	fetch: function(data) {
		var h = this;

		h.config.rows = data.rows || [];
		h.listContent.update("");

		var i=0;
		for (i=0; i<h.config.rows.length; i++) {

			var row = new Element("DIV", {
				style: "position:relative; overflow:hidden",
				class: "list-content-row"				// row to jest klasa fake
			});
			row.bean = h.config.rows[i];

			if (h.config.render) {
				row.update(h.config.render(row));
			}

			h.listContent.insert(row);

			if (h.config.removable === true) {
				var removeFab = new Element("P", {
					style: "position:absolute; padding:0px; border-radius:50%; margin:0px; top:10px; right:10px; width:18px; height:18px; background-image:url('" + $ICON("close") + "'); overflow:hidden",
					className: "list-remove-button",
				});
				row.insert(removeFab);
				removeFab.row = row;
				
				removeFab.on("click", function(e) {
					if (h.config.onRemove) {
						h.config.onRemove(e.target.row);
					}
				});
			}
		}
	},
	/**
	 * odfiltrowanie wyświetlonych wierszy
	 */
	filter: function(v) {
		var h = this;

		var i=0;
		for (i=0; i<h.listContent.childElements().length; i++) {
			var child = h.listContent.childElements()[i];
			if (child.innerHTML.toLowerCase().indexOf(v.toLowerCase()) >= 0) {
				child.show();
			} else {
				child.hide();
			}
		}
	}
});
/**
 * @class UI.SortableList
 */
UI.SortableList = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 * @param config
	 */
	initConfig: function(config) {            	
        this.config = Object.extend({
        	title: "Insert title here ...",
        	renderer: function(row) {
        		return Object.toJSON(row.bean)
        	}
        }, config || {});
	},
	/**
	 * @method render
	 */
	render: function() {
		var h = this;

		var titleDiv = new Element("DIV", {
			class: "list_header"
		});
		h.getMaterial().insert(titleDiv);
		titleDiv.update(h.config.title);

		h.rowsContent = new Element("DIV", {
			style: "position:absolute; overflow:auto; top:60px; left:0px; right:0px; bottom:0px; display:flex; flex-flow:column; font-size:12px; line-height:20px; border:0px solid lightGrey;"
		});
		h.getMaterial().insert(h.rowsContent);
		
		var firstDiv = new Element("DIV", {
			style: "border:1px solid white; margin:2px 2px 0px 2px; padding:1px; border-radius:0px; border-width:0px 0px 3px 0px"
		});
		h.rowsContent.insert(firstDiv);

		firstDiv.on("dragover", function(e) {
			e.target.setStyle({
				borderBottomColor: "#525070"
			});
			e.preventDefault(); 
		});
		
		firstDiv.on("dragleave", function(e) {
			e.target.setStyle({
				borderBottomColor: "white"
			});
			e.preventDefault();
		});

		firstDiv.on("drop", function(e) {
			try {
				e.target.setStyle({
					borderBottomColor: "white"
				});

				var bean = null;
				eval("bean = " + e.dataTransfer.getData("text/html") + ";");

				var createdRow = h.createRow(bean);

				e.target.insert({
					after: createdRow
				});
			} catch (ex) {
				alert(ex);
			}
		});
	},
	/**
	 * @method fetch
	 * 
	 * @param model
	 */
	fetch: function(model) {
		var h = this;

		var i=0;
		for (i=0; i<model.rows.length; i++) {
			var row = model.rows[i];

			var rowDiv = h.createRow(row);

			h.rowsContent.insert(rowDiv);
		}
	},
	/**
	 * 
	 * @param row
	 * @returns {rowDiv0}
	 */
	createRow: function(row) {
		var h = this;
		
		var rowDiv = new Element("DIV", {
			style: "border:1px solid lightGrey; margin:0px 2px 0px 2px; padding:5px; border-radius:0px; border-width:1px 1px 3px 1px; border-bottom-color:white"
		});
		
		rowDiv.bean = row;

		rowDiv.update(h.config.renderer(rowDiv));
		rowDiv.draggable = true;

		rowDiv.on("click", function(e) {
			if (h.config.onClick) {
				h.config.onClick(e.target);
			}
		});
		
		rowDiv.on("dragover", function(e) {
			e.target.setStyle({
				borderBottomColor: "#525070"
			});

			e.preventDefault(); 
		});

		rowDiv.on("dragleave", function(e) {
			try {
				e.target.setStyle({
					borderBottomColor: "white"
				});

				e.preventDefault();
			} catch (ex) {
				//alert(ex);
			}
		});

		rowDiv.on("dragstart", function(e) {				
			e.target.setStyle({
				color: "#525070"
			});

			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData('text/html', ""+Object.toJSON(e.target.bean));
		});

		rowDiv.on("dragend", function(e) {
			e.target.remove();
		});
		
		rowDiv.on("drop", function(e) {
			try {
				e.target.setStyle({
					borderBottomColor: "white"
				});
				
				var bean = null;
				eval("bean = " + e.dataTransfer.getData("text/html") + ";");
				
				var createdRow = h.createRow(bean);

				e.target.insert({
					after: createdRow
				});
			} catch (ex) {
				alert(ex);
			}
		});
		
		return rowDiv;
	}
});
/** 
 * @class UI.Form
 */
UI.Form = Class.create(UI.MaterialComponent, {
	/** 
	 * @param config
	 */
    initConfig: function(config) {
        this.config = Object.extend({
            fields: [],
            fieldControlls: [],
            bean: {}
        }, config || {});
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;

    	h.panel = new UI.Panel({
    		inside: h.getMaterial(),
    		title: h.config.title,
    		buttons: h.config.buttons
    	});

    	var fields = new Element("DIV", {
    		style: "overflow:hidden; display:flex; flex-direction:column; align-content:flex-start; background:white"
    	});
    	h.panel.getContent().update(fields);

    	if (h.config.fields !== undefined) {
    		var i=0;
    		for (i=0; i<h.config.fields.length; i++) {		
    			var fieldConfig = h.config.fields[i];
    				if (fieldConfig.type === undefined) {
    					fieldConfig.type = "Text";
    				}

    				var field = eval("new UI." + fieldConfig.type + "FormField();");

    					if (field.initConfig === undefined) {
    						alert("Property: " + fieldConfig.property);
    					}
    				
    					field.initConfig(fieldConfig);
    					
    					field.form = this;

    					h.config.fieldControlls.push(field);

    				fields.insert(field.getMaterial());
    		}
    	}
    },
    /**
     * @method setTitle
     * @param title
     */
    setTitle: function(title) {
    	var h = this;
    		h.panel.setTitle(title);
    },
    propertyChanged: function(propertyName, propertyValue) {
    	var h = this;

    	if (h.config.onChange) {
    		h.config.onChange(propertyName, propertyValue);
    	}
    },
    /**
     * Metoda zwraca pole formularza dla zadanej właściwości
     * 
     * @method getField
     */
    getField: function(propertyName) {
    	var h = this;
    	var i=0;
    	for (i=0; i<h.config.fields.length; i++) {
    		if (h.config.fields[i].property == propertyName) {
    			return h.config.fieldControlls[i];
    		}
    	}
    	return null;
    },
    /**
     * @method setFields
     * 
     * Metoda dynamicznie tworzy atrybuty w formularzu
     */
    setFields: function(fields) {
    	var h = this;
    		h.config.fields = fields;
    		h.render();
    		h.setBean(h.getBean());
    },
    /**
     * @method setBean
     */
    setBean: function(bean) {
    	var h = this;
    	
    	h.config.bean = bean;
    	
    	var i=0;
    	for (i=0; i<h.config.fields.length; i++) {
    		h.config.fieldControlls[i].setBean(bean);
    	}
    },
    /**
     * @method getBean
     */
    getBean: function() {
    	return this.config.bean;
    },
    /**
     * Walidacja wymaganych pól formularza
     */
    validate: function() {
    	var result = true;
    	
    	var h = this;
    	
    	var i=0;
    	for (i=0; i<h.config.fields.length; i++) {
    		try {
				var fieldControl = h.config.fieldControlls[i];

				if (fieldControl.getRequired() === true && (fieldControl.getBeanValue() === null || fieldControl.getBeanValue() === "" || fieldControl.getBeanValue() === undefined)) {
					fieldControl.markError();
					result = false;
				} else {
					fieldControl.unmarkError();
				}
    		} catch (e) {
    			alert("Couldn't validate: " + fieldControl.config.property);
    		}
    	}
    	return result;
    },
    /**
     * 
     * @param trueOrFalse
     */
    setReadOnly: function(trueOrFalse) {
    	var h = this;

    	var i=0;
    	for (i=0; i<h.config.fields.length; i++) {
    		h.config.fieldControlls[i].setReadOnly(trueOrFalse);
    	}
    },
    /**
     * @resetBean
     */
    resetBean: function() {
    	var h = this;
    		h.setBean(h.config.bean);
    },
    /**
     * @method getContent
     * @returns
     */
    getContent: function() {
    	return this.panel.getContent();
    }
});
/**
 *
 */
UI.TextFormField = Class.create({
    initialize: function() {    	
    },
    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	required: false,
        	type: "text",
        	uniqueId: "" + Math.random(),
        	pattern: ".*"
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },
    setBean: function(bean) {
    	var h = this;
    	h.config.bean = bean;

    	h.displayProperty(h.getProperty());
    },
    setProperty: function(propertyValue) {
        var h = this;
        eval("h.config.bean." + h.config.property + " = propertyValue;");
    },
    getProperty: function() {
        var h = this;
        return eval("h.config.bean." + h.config.property + ";");
    },
    displayProperty: function(propertyValue) {
        var h = this;
        h.validateProperty(propertyValue);
        if (propertyValue !== undefined) {
            h.input.value = h.formatValue(propertyValue);
            h.insideDiv.addClassName("is-dirty");
        }
    },
    formatValue: function(propertyValue) {
        var h = this;
        if (h.config.render) {
            return h.config.render(propertyValue);
        }
        return propertyValue;
    },
    validateProperty: function(propertyValue) {
        var h = this;
        var result = true;
        return result;
    },
    changeProperty: function(propertyValue) {
        var h = this;
        if (true === h.validateProperty(propertyValue)) {
            h.setProperty(propertyValue);
            h.form.propertyChanged(h.config.property, propertyValue);
        }
    },
    changingProperty: function(propertyValue) {
        var h = this;
        if (true === h.validateProperty(propertyValue)) {

        }
    },
    render: function() {
    	var h = this;

    	h.inside = new Element("DIV", {
            style: "position:relative; background:white; margin:0px 10px -15px 10px; display:flex; flex-direction:row; align-items:center;"
    	});

        h.insideDiv = new Element("DIV", {
            class: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label",
        });
        h.input = new Element("INPUT", {
            class: "mdl-textfield__input",
            type: h.config.type,
            id: h.config.uniqueId,
            pattern: h.config.pattern
        });

        h.input.on("change", function(e) {
            h.changeProperty(h.input.value);
        });
        h.input.on("keyup", function(e) {
            h.changingProperty(h.input.value);
        });

        h.span = new Element("SPAN", {
            class: "mdl-textfield__error",
            style: "position:absolute; top:0px; right:0px"
        });
        h.span.update(h.config.pattern);

        h.label = new Element("LABEL", {
            class: "mdl-textfield__label",
            "for": h.config.uniqueId,
        });
        h.label.update(h.config.label + " " + ((h.config.required)?"*":""));

		h.insideDiv.insert(h.input);
		h.insideDiv.insert(h.label);
		h.insideDiv.insert(h.span);
		h.inside.insert(h.insideDiv);

		if (h.extendRender) {
		    h.extendRender();
		}

		componentHandler.upgradeElement(h.insideDiv);
		componentHandler.upgradeElement(h.input);
		componentHandler.upgradeElement(h.label);
		componentHandler.upgradeElement(h.span);
    },
    setReadOnly: function(readOnly) {
    	var h = this;
    	var ro = readOnly || false;

    	h.input.readOnly = ro;
    	h.input.disabled = ro;
    },
    getMaterial: function() {
    	return this.inside;
    },
    isEmpty: function(v) {
    	var result = false;
    		if (v === undefined || v.trim() == "") {
    			result = true;
    		}
    	return result;
    },
    getRequired: function() {
    	return this.config.required;
    },
});
/**
 * @class UI.LongTextFormField
 */
UI.LongTextFormField = Class.create({
	/**
	 * @constructor 
	 */
    initialize: function() {    	
    },
    /**
     * @method initConfig
     */
    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	mask: new Input(null),
        	required: false
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;

		h.inside = new Element("DIV", {
			style: "position:relative; display:block; height:140px; width:100%; line-height:40px; background-color:transparent"
		});
		h.input = new Element("TEXTAREA", {
			type: "text",
			style: "resize:none; position:absolute; top:20px; left:10px; height:98px; border:1px solid #f0f0f0; background-color:#fcfcfc; color:#000000; width:" + h.config.width + "px"
		});
		h.input.on("focus", function() {
			h.animateLabel();
		});

		h.input.on("blur", function(e) {
			if (h.isEmpty(h.input.value)) {
				h.unanimateLabel();
			}
			if (h.config.onChange !== undefined) {
				h.config.onChange(h.getBeanValue());
			}
		});
		h.input.on("keyup", function(e) {
			h.setBeanValue();
			
			if (h.config.onChanging !== undefined) {
				h.config.onChanging(h.getBeanValue());
			}
		});
		h.input.on("keydown", function(e) {
			
			if (13 == e.keyCode) {
				if (h.config.onEnter) {
					h.config.onEnter();
				}
			}
			
			e.cancelBubble = true;
		});
		    		
		h.label = new Element("DIV", {
			style: "position:absolute; top:10px; left:10px; border:0px; height:10px; color:#999999; font-weight:bold; font-size:14px;"
		});
		h.label.insert(h.config.label + " " + ((h.config.required)?"*":""));

    	h.underline = new Element("DIV", {
    		style: "position:absolute; top:120px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:" + h.config.width + "px"
    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.label);
		h.inside.insert(h.input);
		
		h.curtain = new Element("DIV", {
			style: "position:absolute; top:20px; left:10px; height:21px; background-color:grey; opacity:0.1; width:" + h.config.width + "px"
		});
		h.inside.insert(h.curtain);

		if (h.config.disableTab == true) {
			var fakeInput = new Element("INPUT", {
				style: "width:0px; border:0px; visible:false"
			});

			fakeInput.on("focus", function(e) {
				h.input.focus();
			});
			h.inside.insert(fakeInput);
		}
    },
    /**
     * @method setReadOnly
     */
    setReadOnly: function(readOnly) {
    	var h = this;
    	var ro = readOnly || false;

    	h.input.readOnly = ro;
    	h.input.disabled = ro;
    	
    	if (h.curtain) {
	    	if (ro === true) {
	    		h.curtain.show();
	    	} else {
	    		h.curtain.hide();
	    	}
    	}
    },
    /**
     * @method animateLabel
     */
    animateLabel: function() {
    	$PLAY(this.label, [
    	    {opacity: 1.0, transform: "translate(0px, 0px)", fontSize: "14px"},
    	    {opacity: 1.0, transform: "translate(0px, -18px)", fontSize: "11px"},
    	]);
    },
    /**
     * @method unanimateLabel
     */
    unanimateLabel: function() {
    	$PLAY(this.label, [
    	    {opacity: 1.0, transform: "translate(0px, -18px)", fontSize: "11px"},
    	    {opacity: 1.0, transform: "translate(0px, 0px)", fontSize: "14px"},
    	]);
    },
    /**
     * @method getMaterial
     */
    getMaterial: function() {
    	return this.inside;
    },
    /**
     * 
     * @param v
     * @returns {Boolean}
     */
    isEmpty: function(v) {
    	var result = false;
    		if (v === undefined || v.trim() == "") {
    			result = true;
    		}
    	return result;
    },
    setBean: function(bean) {
    	var h = this;
    	h.config.bean = bean;
    	
    	var v = h.getBeanValue();
    	if (h.config.render !== undefined) {
    		v = h.config.render(v);
    	}
		h.setInputValue(v);
    },
    getBeanValue: function() {
    	var h = this;
    	var r = undefined;
    		try {
    			r = eval("h.config.bean." + h.config.property);
    		} catch (e) {
    			
    		}
    	return r;
    },
    setBeanValue: function(v) {
    	var h = this;
    	
    	var v = h.getInputValue();
    	if (h.config.parse != undefined) {
    		v = h.config.parse(v);
    	}
    	
    	eval("h.config.bean." + h.config.property + " = v;");
    },
    /**
     * @method setInputValue
     */
    setInputValue: function(val) {
    	var h = this;
    	
    	if (val === undefined) {
    		val = "";
    	}
    	
    	var v = new String(val);

    	if (v !== undefined && v.trim() !== "" && v.trim() !== '') {
    		h.animateLabel();
    		h.input.value = v;
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },
    /**
     * @method getInputValue
     */
    getInputValue: function() {
    	var h = this;
    	var val = h.input.value;
    		val = h.validate(val);
    	return val;
    },
    /**
     * 
     * @returns
     */
    getRequired: function() {
    	return this.config.required;
    },
    /**
     * walidacja po wpisaniu (na onblur)
     * 
     * @method validate
     */
    validate: function(v) {
    	return v;
    },
    /**
     * walidacja podczas wpisywania
     * 
     * @method preValidate
     */
    preValidate: function() {
    },
    /**
     * 
     */
    markError: function() {
    	var h = this;

    	h.label.setStyle({
    		color: "#cf6d6d"
    	});
    },
    /**
     * 
     */
    unmarkError: function() {
    	var h = this;

    	h.label.setStyle({
    		color: "#cdcdcf"
    	});
    }
});
/**
 * @class UI.LookupFormField
 */
UI.LookupFormField = Class.create(UI.TextFormField, {
    /**
     *
     */
    extendRender: function() {
        var h = this;

        h.fab = new Element("BUTTON", {
            class: "mdl-button mdl-js-button mdl-button--icon",
        });
        h.icon = new Element("I", {
            class: "material-icons"
        });
        h.icon.update("search");
        h.fab.insert(h.icon);

        componentHandler.upgradeElement(h.fab);

        h.inside.insert(h.fab);

        h.fab.on("click", function(e) {
            h.showLookupCard();
        });
    },
    /**
     * @method showLookupCard
     */
    showLookupCard: function() {
    	var h = this;
    	
		var f = h.form.getMaterial();
		var formOffset = f.cumulativeOffset();
		var fieldOffset = h.fab.cumulativeOffset();

		h.tmpFab = new Element("DIV", {
		});

		h.tmpFab.setStyle({
			bottom: "",
			position: "absolute",
			backgroundColor: "grey",
			border: "border: 1px solid transparent;",
			top: (fieldOffset.top - formOffset.top) + "px",
			left: (fieldOffset.left - formOffset.left) + "px",
			width: h.fab.getWidth() + "px",
			height: h.fab.getHeight() + "px",
			overflow: "hidden",
			zIndex: 100000
		});

		f.insert(h.tmpFab);

		$PLAY(h.tmpFab, [
  		    {
  		     opacity: 0.5,
  		     height: h.fab.getHeight() + "px",
  		     top: (fieldOffset.top - formOffset.top) + "px",
  		     left: (fieldOffset.left - formOffset.left) + "px",
  		     width: h.fab.getWidth() + "px",
  		     backgroundColor: "grey",
  		    },
  		    {
  		     opacity: 1.0,
  		     height: f.getHeight() + "px",
  		     top:"0px",
  		     left:"0px",
  		     width: f.getWidth() + "px",
  		     backgroundColor: "white",
  		    },
  		], function() {

  		});

        if (h.config.onExpand) {
            h.config.onExpand(h, h.tmpFab);
        }
    },

    setProperty: function(propertyValue) {
        var h = this;

        eval("h.config.bean." + h.config.property + " = propertyValue;");
        h.displayProperty(propertyValue);
        h.removeLookupCard();
    },

    removeLookupCard: function() {
    	var h = this;
    	
		var f = h.form.getMaterial();
		var formOffset = f.cumulativeOffset();
		var fieldOffset = h.fab.cumulativeOffset();

		var player = h.tmpFab.animate([
		    {
	  		     opacity: 1.0, 
	  		     height: f.getHeight() + "px", 
	  		     borderRadius: "0%", 
	  		     top:"0px", 
	  		     left:"0px", 
	  		     width: f.getWidth() + "px", 
	  		     backgroundColor: "white"
	  		    },
	  		    {
	  		     opacity: 0.5, 
	  		     height: "0px", 
	  		     borderRadius: "0%", 
	  		     top: (fieldOffset.top - formOffset.top) + "px", 
	  		     left: (fieldOffset.left - formOffset.left) + "px", 
	  		     width: "0px", 
	  		     backgroundColor: "black"
	  		    },
	  		], {
	  			direction: 'normal',
	  		    duration: 450,
	  		    easing: "ease",
	  			iterations: 1,
	  			fill: "both"
	  		});
			
			player.onfinish = function() {
				h.tmpFab.remove();
			};
    },
    markError: function() {
    	var h = this;

        try {
		    h.inside.pseudoStyle("before", "color", "red");
		} catch (e) {
		    alert(e);
		}
    },
});
/**
 * @class UI.ListFormField
 */
UI.ListFormField = Class.create(UI.LookupFormField, {
	/**
	 * @method setInputValue
	 */
    setInputValue: function(str) {
    	var h = this;
    	
    	if (str !== undefined) {
    		h.animateLabel();
    		h.input.value = str;

    		if (h.config.patternRenderer !== undefined) {
    			h.input.value = h.config.patternRenderer(str);
    		} else if (h.config.pattern !== undefined) {
    			h.input.value = str;
    		} 
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },

    setBeanValue: function(str) {
    	var h = this;

    	eval("h.config.bean." + h.config.property + " = str;");

		if (h.config.onChange !== undefined) {
			h.config.onChange(h.getBeanValue());
		}
    },
    /**
     * @method setReadOnly
     */
    setReadOnly: function(readOnly) {
    	var h = this;

    	var ro = readOnly || false;

    	h.fab.getMaterial().setStyle({
    		display: (ro==true)?"none":"block"
    	});
    },
    /**
     * @method showLookupCard
     */
    showLookupCard: function() {
    	var h = this;
    	
		var f = h.form.formContent;
		var formOffset = f.cumulativeOffset();
		var fieldOffset = h.fab.material.cumulativeOffset(); 
						
		h.tmpFab = h.fab.material.clone();
		h.tmpFab.setStyle({
			bottom: "",
			top: (fieldOffset.top - formOffset.top) + "px",
			left: (fieldOffset.left - formOffset.left) + "px",
			overflow: "hidden"
		});
		h.form.formContent.insert(h.tmpFab);

		h.list = new UI.List({
			inside: h.tmpFab,
			title: h.config.label,
			headerRenderer: function(row) {
				return h.config.patternRenderer(row.bean);
			},
			onClick: function(row) {
				if (h.config.onChange) {
					h.setBeanValue(row.bean);
					h.setInputValue(row.bean);
					h.removeLookupCard();
				}
			}
		});

		var fab = new UI.Fab({
			inside: h.tmpFab,
			top: 80,
			title: "Zamknij listę",
			fill: "red",
			text: "<",
			onClick: function() {
				h.removeLookupCard();
			}
		});

		var player = h.tmpFab.animate([
  		    {
  		     opacity: 0.5, 
  		     height: h.fab.material.getHeight() + "px", 
  		     borderRadius: "0%", 
  		     top: (fieldOffset.top - formOffset.top) + "px", 
  		     left: (fieldOffset.left - formOffset.left) + "px", 
  		     width: h.fab.material.getWidth() + "px", 
  		     backgroundColor: h.fab.config.fill
  		    },
  		    {
  		     opacity: 1.0, 
  		     height: f.getHeight() + "px", 
  		     borderRadius: "0%", 
  		     top:"0px", 
  		     left:"0px", 
  		     width: f.getWidth() + "px", 
  		     backgroundColor: "white"
  		    },
  		], {
  			direction: 'normal',
  		    duration: 450,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});

		player.onfinish = function() {
			if (h.config.fetchList) {
				h.config.fetchList(h.list);
			}
		}
    },

    removeLookupCard: function() {
    	var h = this;
    	
		var f = h.form.formContent;
		var formOffset = f.cumulativeOffset();
		var fieldOffset = h.fab.material.cumulativeOffset(); 

		var player = h.tmpFab.animate([
		    {
		     opacity: 1.0, 
		     height: f.getHeight() + "px", 
		     borderRadius: "0%", 
		     top:"0px", 
		     left:"0px", 
		     width: f.getWidth() + "px", 
		     backgroundColor: "white"
		    },
		    {
		     opacity: 0.5, 
		     height: "0px", 
		     borderRadius: "0%", 
		     top: (fieldOffset.top - formOffset.top) + "px", 
		     left: (fieldOffset.left - formOffset.left) + "px", 
		     width: "0px", 
		     backgroundColor: h.fab.config.fill
		    },
		], {
			direction: 'normal',
		    duration: 450,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
			
		player.onfinish = function() {
			h.tmpFab.remove();
		}
    }
});
/*
 * File
 * 
 * Kontrolka File obsługuje atrybut beana formularza typu file, który ma loid i name
 * 
 * Przykład:
 * 
 * var bean = {
 * 		name: "Nazwa",
 *      age: 12,
 *      report: {
 *      	loid: 1234,
 *      	name: "raport.txt"
 *      }
 * }
 * 
 * var form = new UI.Form({
 * 		fields: [
 * 			{
 * 				property: "report",
 * 				type: "File"
 * 			}
 * 		]
 * 		....
 * });
 * 
 * form.setBean(bean);
 */
UI.FileFormField = Class.create(UI.TextFormField, {

    initialize: function(config) {    
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {}        	
        }, config || {});
    },

    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	uploadAction: UI.uploadAction,
        	jsonFileAttributeName: "name"
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },

	render: function() {
    	var h = this;
    	
		h.inside = new Element("DIV", {
			style: "position:relative; display:block; height:40px; width:100%; line-height:40px; background-color:transparent"
		});
		
		h.input = new Element("INPUT", {
			type: "text",
			style: "position:absolute; top:20px; left:10px; border:0px; background-color:transparent; color:#000000; width:" + h.config.width + "px"
		});
		h.input.disabled = true;
		h.input.on("focus", function() {
			h.animateLabel();
		});
		h.input.on("blur", function(e) {
			if (h.isEmpty(h.input.value)) {
				h.unanimateLabel()
			}
		});
		h.input.on("change", function(e) {
			if (h.config.onChange !== undefined) {
				h.config.onChange(h.getBeanValue());
			}
		});
		h.input.on("keyup", function(e) {
			h.setBeanValue(h.getInputValue());
			
			if (h.config.onChanging !== undefined) {
				h.config.onChanging(h.getBeanValue());
			}
		});
						
		h.label = new Element("DIV", {
			style: "position:absolute; top:10px; left:10px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
		});
		h.label.insert(h.config.label);

    	h.underline = new Element("DIV", {
    		style: "position:absolute; top:40px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:" + h.config.width + "px"
    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.label);
		h.inside.insert(h.input);
		
		h.frameid = "file_upload_frame_" + h.config.property + "_" + new Date().getTime();

		h.fab = new UI.Fab({
			inside: h.inside,
			style: "position:absolute; left:" + (h.config.width - 10) + "px; width:20px; height:20px; top:18px;",
			fill: "green",
			icon: "download",
			bottom: 8,
			onClick: function() {				
				h.fileInput.click();
			}
		});

		h.initFileUploader();
	},
	initFileUploader: function() {
		var h = this;

		h.fileInput = new Element("INPUT", {
			type: "file",
			name: "fileName_" + h.frameid,
			style: "display:none"
		});

		var form = new Element("FORM", {
		    action: h.config.uploadAction,
		    method: "POST",
		    enctype: "multipart/form-data",
		    target: h.frameid,
		    style: "display:none; width:0px; height:0px"
		});

		h.inside.insert(form);
		form.insert(h.fileInput);

		h.fileInput.on("change", function() {

	    	h.progress = new UI.FabProgress({
	    		fab: h.fab
	    	});

			var form = new FormData();
				form.append("file", h.fileInput.files[0]);

			// send via XHR - look ma, no headers being set!
			var xhr = new XMLHttpRequest();

			xhr.upload.addEventListener("progress", function(e) {
				var pc = parseInt(100 - (e.loaded / e.total * 100));
				h.progress.setPercentage(100 - pc);
			}, false);

			xhr.onreadystatechange = function (evt) {
				if (xhr.readyState == 4) {
					h.progress.close();

					var createdFile = xhr.responseText.evalJSON();						
                    	h.setBeanValue(createdFile);
                    	h.setInputValue(createdFile);
                    	
            		if (h.config.onChange !== undefined) {
            			h.config.onChange(h.getBeanValue());
            		}
				}
			}

			xhr.open("POST", h.config.uploadAction, true);
			xhr.send(form);
		});
	},

    setInputValue: function(bean) {
    	var h = this;
    	
    	if (bean === undefined) {
    		bean = {};
    	}
    	
    	if (bean !== undefined) {
    		if(undefined !== eval("h.config.bean." + h.config.property)) {
        		h.animateLabel();
    			h.input.value = eval("h.config.bean." + h.config.property + "." + h.config.jsonFileAttributeName)
    		} else {
    			h.unanimateLabel();
    		}
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },

    setBeanValue: function(bean) {
    	var h = this;
    	eval("h.config.bean." + h.config.property + " = bean;");
    },

    showUploadFile: function() {
    	var h = this;    		
    }
});
/**
 * @class UI.DateFormField
 */
UI.DateFormField = Class.create(UI.LookupFormField, {
	/**
	 * @method render
	 */
	render: function() {
    	var h = this;
    	
		h.inside = new Element("DIV", {
			style: "position:relative; display:block; height:40px; width:100%; line-height:40px; background-color:transparent",
			class: "text-form-field"
		});

		h.input = new Element("INPUT", {
			type: "text",
			readOnly: true,
			style: "position:absolute; top:20px; left:10px; border:0px; background-color:transparent; color:#000000; width:120px"
		});
		h.input.on("focus", function() {
			h.animateLabel();
		});
		h.input.on("blur", function(e) {
			if (h.isEmpty(h.input.value)) {
				h.unanimateLabel();
			}
		});
		h.input.on("change", function(e) {
			if (h.config.onChange !== undefined) {
				h.config.onChange(h.getBeanValue());
			}
		});

		h.inside.title = h.config.label + " " + ((h.config.required)?"*":"");

    	h.underline = new Element("DIV", {
    		style: "position:absolute; top:40px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:120px"
    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.input);
		
		h.fab = new UI.Fab({
			inside: h.inside,
			style: "position:absolute; left:120px; width:20px; height:20px; top:18px;",
			fill: "green",
			icon: "calendar",
			bottom: 8,
			onClick: function() {
				h.showLookupCard();
			}
		});
	},
	/**
	 * 
	 * @param date
	 */
    setInputValue: function(date) {
    	var h = this;
    	
    	var DU = new UI.DateUtils();

    	if (date !== undefined) {
    		h.animateLabel();
    		h.input.value = DU.formatDate(DU.parseDate(date));
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },
    /**
     * 
     * @param date
     */
    setBeanValue: function(date) {
    	var h = this;

    	eval("h.config.bean." + h.config.property + " = date;");

		if (h.config.onChange !== undefined) {
			h.config.onChange(h.getBeanValue());
		}
    },
    /**
     * @method setReadOnly
     */
    setReadOnly: function(readOnly) {
    	var h = this;

    	var ro = readOnly || false;

    	h.fab.getMaterial().setStyle({
    		display: (ro==true)?"none":"block"
    	});
    	h.input.disabled = ro;
    },
    /**
     * @method showLookupCard 
     */
    showLookupCard: function() {
    	var h = this;
	
		h.calendarDiv = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; opacity:0.0; background-color:white"
		});
		h.form.getContent().insert(h.calendarDiv);

		new UI.DatePicker({
			inside: h.calendarDiv,
			dateSelected: function(date) {
				h.setBeanValue(new UI.DateUtils().formatFullDate(date));
				h.setInputValue(new UI.DateUtils().formatFullDate(date));

				h.removeLookupCard();
			}
		});

		var player = h.calendarDiv.animate([
  		    {
  		     opacity: 0.0, 
  		    },
  		    {
  		     opacity: 1.0
  		    },
  		], {
  			direction: 'normal',
  		    duration: 750,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});

		player.onfinish = function() {
			if (h.config.fetchList) {
				h.config.fetchList(h.list);
			}
		};
    },

    removeLookupCard: function() {
    	var h = this;
   
    	$PLAY(h.calendarDiv, [
    	    { opacity: 1.0 },
    	    { opacity: 0.0 }
    	],
    	function() {
    		h.calendarDiv.remove();
    	});
    }
});
/**
 * @class UI.BooleanFormField
 */
UI.BooleanFormField = Class.create(UI.TextFormField, {

    initialize: function(config) {    	
        this.config = Object.extend({
        	property: "$",
        	readOnly: false,
        	width: 200,
        	value: false,
        	required: false
        }, config || {});
    },
    /**
     * @method
     */
    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	required: false,
        	uniqueId: "" + Math.random(),
        	type: "checkbox"
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;

    	h.inside = new Element("DIV", {
            style: "position:relative; height:30px; background:white; margin:0px 10px -10px 10px; display:flex; flex-direction:row; align-items:center;"
    	});

        h.label = new Element("LABEL", {
            class: "mdl-switch mdl-js-switch mdl-js-ripple-effect",
            "for": h.config.uniqueId,
        });
        h.input = new Element("INPUT", {
            class: "mdl-switch__input",
            type: "checkbox",
            id: h.config.uniqueId,
            checked: true
        });
        h.input.on("change", function(e) {
            h.changeProperty(e.target.checked);
        });
        h.span = new Element("SPAN", {
            class: "mdl-switch__label",
        });
        h.span.update(h.config.label + " " + ((h.config.required)?"*":""));

		h.label.insert(h.input);
		h.label.insert(h.span);
		h.inside.insert(h.label);

		if (h.extendRender) {
		    h.extendRender();
		}

		componentHandler.upgradeElement(h.label);
		componentHandler.upgradeElement(h.input);
		componentHandler.upgradeElement(h.span);
    },
});
UI.PasswordFormField = Class.create(UI.TextFormField, {
    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	required: false,
        	type: "password",
        	pattern: ".*"
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },
});

UI.IntegerFormField = Class.create(UI.TextFormField, {
    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	required: false,
        	type: "text",
        	uniqueId: "" + Math.random(),
        	pattern: "-?[0-9]*(\.[0-9]+)?"
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },
    validateProperty: function(propertyValue) {
        var h = this;
        var result = true;
            try {
                if (propertyValue !== "" && propertyValue !== undefined && isNaN(parseInt(propertyValue))) {
                    result = false;
                }
            } catch (e) {
                result = false;
            }
        return result;
    },
});
/**
 * 
 * 
 * @class UI.DecimalFormField
 */
UI.DecimalFormField = Class.create(UI.TextFormField, {
    /**
     * @method setConfig
     */
    initConfig: function(config) {
    	
    	var h = this;
    	
    	var numbers=new Input(JST_CHARS_NUMBERS);
    	var optionalNumbers=new Input(JST_CHARS_NUMBERS);
    	      optionalNumbers.optional=true;

    	var UI_DECIMAL_SEPARATOR=new Literal(".");
    	var UI_MASK_DECIMAL=[numbers, UI_DECIMAL_SEPARATOR, optionalNumbers];
    	    	
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	mask: UI_MASK_DECIMAL,
        	precision: 5
        }, config || {});

    	h.parser = new NumberParser();
	    	h.parser.decimalDigits = h.config.precision;
	    	h.parser.decimalSeparator = ".";
	    	h.parser.groupSeparator = " "; 
	    	h.parser.useGrouping = false; 

        this.render();
        this.setReadOnly(this.config.readOnly);
        
		h.input.on("paste", function(e) {
			var val = e.clipboardData.getData("text/plain");
				val = val.replace(",", ".");
				val = h.parser.parse(val);

			h.setInputValue(h.parser.format(val));
			e.preventDefault();
			e.returnValue = false;
			return false;
		});
		
		h.input.setStyle({
			textAlign: "right"
		});
    },
    setBeanValue: function(v) {
    	var h = this;
    	
    	var v = h.parser.parse(h.getInputValue());

    	eval("h.config.bean." + h.config.property + " = parseFloat(v);");
    },
    /**
     * @method setInputValue
     */
    setInputValue: function(val) {
    	var h = this;
    	
    	if (val === undefined) {
    		val = "";
    	}

    	var v = new String(val);

    	if (v !== undefined && v.trim() !== "" && v.trim() !== '') {
    		h.animateLabel();
    		h.input.value = v;
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },
});
/**
 * @constructor UI.BorderLayout
 */
UI.BorderLayout = Class.create(UI.MaterialComponent, {
	/**
	 * @method initConfig
	 */
	initConfig: function(config) {
        this.config = Object.extend({
        	items: []
        }, config || {});
	},
	/**
	 * @method render
	 */
    render: function() {
    	var h = this;
        
        var centerTop = 0;
        var centerBottom = 0;
        var centerLeft = 0;
        var centerRight = 0;
    
        if (this.config.north !== undefined) {
            var height = 50;

                if (h.config.north.height) {
                    height = h.config.north.height;
                } else {
                    h.config.north.height = height;
                }
                
                centerTop = h.config.north.height;
                var fill = h.config.north.fill || "transparent";

                h.north = new Element("DIV", {
                    style: "position:absolute; overflow:hidden; top:0px; left:0px; right:0px; height:" + height + "px; background-color:" + fill
                });

            this.config.inside.insert(this.north);
        }
        
        if (this.config.south !== undefined) {
            var height = 50;
            
                if (this.config.south.height) {
                    height = this.config.south.height;
                } else {
                    this.config.south.height = height;
                }
                
                centerBottom = height;
                var fill = h.config.south.fill || "transparent";

                this.south = new Element("DIV", {
                    style: "position:absolute; overflow:hidden; height:" + height + "px; left:0px; right:0px; bottom:0px; background-color:" + fill
                });
            
            this.config.inside.insert(this.south);
        }
        
        if (this.config.west !== undefined) {
            var width = 50;
                        
            if (this.config.west.width) {
                width = this.config.west.width;
            } else {
                this.config.west.width = width;
            }
            
            centerLeft = width;
            var fill = h.config.west.fill || "transparent";
            
            this.west = new Element("DIV", {
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + width + "px; bottom:" + centerBottom + "px; background-color:" + fill
            });

            this.config.inside.insert(this.west);
        }
        
        if (this.config.east !== undefined) {
            var width = 50;
                        
            if (this.config.east.width) {
                width = this.config.east.width;
            } else {
                this.config.east.width = width;
            }
            
            centerRight = width;
            var fill = h.config.east.fill || "transparent";
            
            this.east = new Element("DIV", {
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + width + "px; bottom:" + centerBottom + "px; background-color:" + fill
            });

            this.config.inside.insert(this.east);
        }

        var fill = h.config.fill || "transparent";
        h.center = new Element("DIV", {
            style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:" + centerLeft + "px; right:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + fill
        });

        h.config.inside.insert(h.center);
    },
    getNorth: function() {
        return this.north;
    },
    getWest: function() {
        return this.west;
    },
    getEast: function() {
        return this.east;
    },
    getSouth: function() {
        return this.south;
    },
    getCenter: function() {
        return this.center;
    },
    getDefault: function() {
        return this.center;
    }
});

UI.GridLayout = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body
        }, config || {});

        this.render();
    },
    render: function() {
        var h = this;

        h.prepareRoot();
        h.config.inside.update(h.root);

        UI.upgrade(h.root);
    },
    prepareRoot: function() {
        var h = this;

        var json = {
            tag: "div",
            class: "mdl-grid",
            $insert: [{
                tag: "div",
                class: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet",
                style: "background-color:grey; padding:10px; height:100%"
            }, {
                tag: "div",
                class: "mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet",
                style: "background-color:blue; padding:10px; height:100%"
            }, {
                tag: "div",
                class: "mdl-cell mdl-cell--2-col mdl-cell--4-col-phone",
                style: "background-color:red; padding:10px; height:100%"
            }]
        }

        h.root = UI.toHTML(json);
    }
});
/**
* This is the description for my class.
*
* @class UI.Crud
* @constructor
*/
UI.Crud = Class.create(UI.MaterialComponent, {

	initConfig: function(config) {
        this.config = Object.extend({
        }, config || {});
	},

	render: function() {
		var h = this;

		if (h.config.list !== undefined) {
			h.config.list.inside = h.getMaterial();
			h.list = new UI.List(h.config.list);
		}

		h.curtain = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; opacity:0.9; display:none",
			class: "bg_main"
		});
		h.getMaterial().insert(h.curtain);

		h.mat = new UI.Material({
			inside: h.getMaterial(),
			effect: "from-right",
			position: "top:0px; right:0px; bottom:0px; width:350px"
		});
		
		if (h.config.form !== undefined) {
			h.config.form.inside = h.mat.getMaterial();
			h.form = new UI.Form(h.config.form);
		}
	},
	/**
	 * @method openForm
	 */
	openForm: function(bean) {
		var h = this;
		if (bean !== undefined) {
			h.form.setBean(bean);
		}
		
		h.curtainOn();
		h.mat.show();
	},
	/**
	 * @method closeForm
	 */
	closeForm: function() {
		var h = this;

		h.curtainOff();
		h.mat.hide();
		
		if (h.config.onCloseForm) {
			h.config.onCloseForm();
		}
	},
	/**
	 * @method updateForm
	 */
	updateForm: function(bean) {
		var h = this;
		h.form.setBean(bean);
	},
	/**
	 * Pobranie formularza z komponentu CRUD
	 * 
	 * @method getForm
	 */
	getForm: function() {
		return this.form;
	},
	/**
	 * @method getBean
	 */
	getBean: function() {
		var h = this;
		return h.form.getBean();
	},
	curtainOn: function() {
		var h = this;
		
		h.curtain.setStyle({
			display: "block"
		});
		
		var player = h.curtain.animate([
  		    {opacity: 0},
  		    {opacity: 0.8},
  		], {
  			direction: 'normal',
  		    duration: 200,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
		
	},
	curtainOff: function() {
		var h = this;

		var player = h.curtain.animate([
		    {opacity: 0.8},
		    {opacity: 0},
		], {
			direction: 'normal',
		    duration: 200,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
		
   		player.onfinish = function(e) {
   			h.curtain.setStyle({
   				display: "none"
   			});
		}
	},
	/**
	 * @method fetchList
	 */
	fetchList: function(beans) {
		var h = this;
		
		h.list.fetch({
			rows: beans
		});
	}
});

UI.Menu = Class.create(UI.MaterialComponent, {

	initConfig: function(config) {
        this.config = Object.extend({
        	items: []
        }, config || {});
	},

	render: function() {
		var h = this;
		
		h.panel = new UI.Panel({
			inside: h.getMaterial(),
			title: h.config.title
		});

		h.rowsContent = new Element("DIV", {
			class: "list_content"
		});
				
		h.listContent = new Element("DIV", {
			class: "list"
		});

		h.listContent.insert(h.rowsContent);

		h.panel.getMaterial().update(h.listContent);
		
		this.rowsContent.on("click", "div.row", function(e, element) {
			if (element.bean.onClick) {
				element.bean.onClick(element);
			}
		});
		
		this.fetch();
	},
	/**
	 * parametr data powinien zawsze zawierac kolekcję rows.
	 * rows to sa obiekty JSON
	 */
	fetch: function() {
		var h = this;

		h.rowsContent.update("");

		var i=0;
		for (i=0; i<h.config.items.length; i++) {
			if (h.config.items[i].access == undefined || h.config.items[i].access == UI.HIDDEN) {
				continue;
			}

			var row = new Element("DIV", {
				class: "row"				// row to jest klasa fake
			});
			row.bean = h.config.items[i];
						
			if (h.config.header !== undefined) {
				var _header = new Element("DIV", {
					style: "font-weight:bold"
				});
				_header.update(STRUTILS.compile(h.config.header, row.bean));
				row.insert(_header);
			} else if (h.config.headerRenderer !== undefined) {
				var _header = new Element("DIV", {
					style: "font-weight:bold"
				});
				_header.update(h.config.headerRenderer(row));
				row.insert(_header);				
			}

			if (h.config.footer !== undefined) {
				var _footer = new Element("DIV", {
					
				});
				_footer.insert(STRUTILS.compile(h.config.footer, row.bean));
				row.insert(_footer);
			} else if (h.config.footerRenderer !== undefined) {
				var _footer = new Element("DIV", {
				});
				_footer.update(h.config.footerRenderer(row));
				row.insert(_footer);				
			}

			h.rowsContent.insert(row);
		}
	}
});

UI.ProgressBar = Class.create(UI.MaterialComponent, {

    initConfig: function(config) {
        this.config = Object.extend({
        	orientation: "horizontal",
        	totalColor: "black",
        	doneColor: "green"
        }, config || {});
    },
    render: function() {
        var h = this;

        h.getMaterial().setStyle({
        	position: "relative",
        	display: "flex",
        	flexDirection: "column",
        	overflow: "hidden"
        });
        
        h.info = new Element("DIV", {
        	style: "height:30px; line-height:30px; display:flex"
        });
        h.getMaterial().insert(h.info);

    	h.label = new Element("DIV", {
    		style: "font-size:12px; flex:1; height:15px; line-height:30px; padding-left:10px; color:" + h.config.totalColor
    	});
    	h.info.insert(h.label);
        
    	h.percentageInfo = new Element("DIV", {
    		style: "font-size:12px; flex:1; height:15px; line-height:30px; padding-right:10px; text-align:right; color:" + h.config.totalColor
    	});
    	h.info.insert(h.percentageInfo);

        h.progress = new Element("DIV", {
        	style: "position:relative; height:10px; line:height:10px; display:flex;"
        });
        h.getMaterial().insert(h.progress);

    	
    	h.total = new Element("DIV", {
    		style: "position:absolute; top:0px; left:10px; right:10px; height:10px; background-color:" + h.config.totalColor
    	});
    	
    	h.done = new Element("DIV", {
    		style: "position:absolute; top:0px; left:10px; width:0px; height:10px; background-color:" + h.config.doneColor
    	});

    	h.progress.insert(h.total);
    	h.progress.insert(h.done);
    },

    setProgress: function(p) {
    	var h = this;

    	var progress = 0;
    	try {
    		progress = Math.max(0, Math.min(100, parseInt(p)));
    	} catch (e) {
    		progress = 10;
    	}

    	var width = h.total.getBoundingClientRect().right - h.total.getBoundingClientRect().left;    	
    	var newWidth = ((width * progress) / 100).toFixed(0);
    	
		h.percentageInfo.update(progress + " %");

		$PLAY(h.done, [
 		    { width: (h.done.getBoundingClientRect().right - h.done.getBoundingClientRect().left) + "px" },
 		    { width: newWidth + "px" },
 		]);
    },

    setLabel: function(label) {
    	var h = this;
    	
    	h.label.update(label);;
    },

    failure: function() {
    	var h = this;
    		h.total.setStyle({
    			backgroundColor: "red"
    		});
    		h.done.setStyle({
    			backgroundColor: "red"
    		});

    		if (h.config.onFinish) {
    			h.config.onFinish();
    		}
    },

    finish: function() {
    	var h = this;	
    		if (h.config.onFinish) {
    			h.config.onFinish();
    		}
    }
});
/**
 * @class UI.Grid
 */
UI.Grid = Class.create(UI.MaterialComponent, {
	/**
	 * @param initConfig
	 */
    initConfig: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            columns: [
                {
                	name: "",
                	width: 100
                }
            ],
            rows: [
            ],
            quickSearch: true,
            detailsWidth: "90%",
            descriptor: {}
        }, config || {});
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;

    		h.panel = new UI.Panel({
    			inside: h.getMaterial(),
    			buttons: h.config.buttons,
    			title: h.config.title
    		});

    		h.columnsContent = new Element("DIV", {
    			class: "heads-content",
    			style: "height:50px; top:2px; left:5px; border:2px solid lightGrey; border-width:0px 0px 2px 0px; overflow:hidden"
    		});
    		h.panel.getContent().insert(h.columnsContent);

    		h.rowsContent = new Element("DIV", {
    			class: "grid_content",
    			style: "bottom:0px; top:70px; left:5px"
    		});
    		h.rowsContent.on("scroll", function(e) {
    			if (h.config.onScrollTop) {
    				h.config.onScrollTop(e.target.scrollTop);
    			}
    		});
    		h.panel.getContent().insert(h.rowsContent);

    		h.rowsContent.on("click", "div.grid-row", function(e, element) {
    			if (h.config.onClick) {
    				h.config.onClick(element);
    			}
    		});
    		
    		h.rowsContent.on("mouseover", "div.grid-row", function(e, element) {
    			element.addClassName("grid-row-selected");
    			if (h.config.onMouseOver) {
    				h.config.onMouseOver(element);
    			}
    		});
    		h.rowsContent.on("mouseout", "div.grid-row-selected", function(e, element) {
    			element.removeClassName("grid-row-selected");
    		});

    	h.panel.setTitle(h.config.title);

    	h.fetch({
    		rows: []
    	});
    },
    /**
     * @method setScrollTop
     */
    setScrollTop: function(pixels) {
    	var h = this;
    		h.rowsContent.scrollTop = pixels;
    },
    /**
     * @method setTitle
     */
    setTitle: function(title) {
    	var h = this;
    		h.panel.setTitle(title);
    },
    /**
     * @method fetch
     *
     * Załadowanie grida wierszami z danymi
     */
    fetch: function(model) {
    	var h = this;

    	h.columnsContent.update();
    	h.rowsContent.update();

		var head = new Element("DIV", {
			class: "grid-column-head",
		});

		h.config.columns.map(function(column) {
			column.width = column.width || 100;

			var div = new Element("P", {
				style: "width:" + (column.width) + "px; text-align:" + (column.align || "left"),
				class: "grid-column bg_white fg_main"
			});

			div.update(column.name);
			div.columnBean = column;

			return div;
		})
		.forEach(function(div) {
		    div.on("click", function(e) {
		        h.selectColumn(e.target);
		    });

			head.insert(div);
		});
		h.columnsContent.insert(head);

		h.rows = [];
		
		var i=0;
		for (i=0; i<model.rows.length; i++) {

			var bean = model.rows[i];
			
    		var row = new Element("DIV", {
    			class: "grid-row"
    		});
    		h.rows.push(row);

    		row.bean = bean;

    		h.config.columns.forEach(function(config) {
    			var cell = new Element("DIV", {
    				style: "width:" + (config.width) + "px; text-align:" + (config.align || "left"),
    				class: "grid-cell fg_main"
    			});

    			row.insert(cell);

    			if (config.render !== undefined) {
    				cell.update(config.render(row, cell));
    			} else {
    				cell.update(eval("bean." + config.property));
    			}
    		});

    		h.rowsContent.insert(row);
		};
    },
    selectRowByBean: function(bean) {
    	var h = this;
    	for(var i=0; i<h.rows.length; i++) {
    		if (h.rows[i].bean === bean) {
    			h.rows[i].click();
    		}
    	}
    },
    /**
     * @method filter
     * @param v
     */
	filter: function(v) {
		var h = this;

		var i=0;
		for (i=0; i<h.rowsContent.childElements().length; i++) {
			var child = h.rowsContent.childElements()[i];
			if (child.innerHTML.toLowerCase().indexOf(v.toLowerCase()) >= 0) {
				child.show();
			} else {
				child.hide();
			}
		}
	},
	/**
	 *
	 */
	selectColumn: function(columnDiv) {
		var h = this;

    	var containerLeft = h.columnsContent.getBoundingClientRect().left;

    	h.columnsContent.pseudoStyle("before", "width",  (columnDiv.getBoundingClientRect().width - 1) + "px");
    	h.columnsContent.pseudoStyle("before", "transform", "translateX(" + (columnDiv.getBoundingClientRect().left - containerLeft) + "px)");

    	h.selectByColumn(columnDiv);
	},
	/**
	 *
	 */
	selectByColumn: function(columnDiv) {
	    var h = this;

        var columnDefinition = columnDiv.columnBean;

        var compareFunction = null;

        if (!h.config.descriptor.sortByColumn || h.config.descriptor.sortByColumn !== columnDefinition) {
            h.config.descriptor.sortByColumn = columnDefinition;
            h.config.descriptor.asc = true;
        } else {
            h.config.descriptor.asc = !h.config.descriptor.asc;
        }

        var ascDesc = ">";
        if (h.config.descriptor.asc == false) {
            ascDesc = "<";
        }

        if (columnDefinition.property) {
            compareFunction = function(row1, row2) {
                var str1 = eval("row1.bean." + columnDefinition.property);
                var str2 = eval("row2.bean." + columnDefinition.property);

                return eval("str1" + ascDesc + "str2");
            }
        }

	    h.rows.sort(function(row1, row2) {
	        var result = compareFunction(row1, row2);
	        return result;
	    });

	    h.rowsContent.update();

	    h.rows.forEach(function(row) {
	        h.rowsContent.insert(row);
	    });
	},
    /**
     *
     */
    openDetails: function() {
        var h = this;

        if (h.detailsMaterial === undefined) {
            h.detailsMaterial = new UI.Material({
                inside: h.getMaterial(),
                modal: true,
                position: "top:0px; left:0px; width:" + h.config.detailsWidth + "; bottom:0px"
            });
        }

        h.detailsMaterial.show();

        return h.detailsMaterial;
    },
    closeDetails: function() {
        var h = this;

        if (h.detailsMaterial !== undefined) {
            h.detailsMaterial.hide();
        }
    },
    setButtons: function(buttons) {
    	var h = this;
    	h.panel.setButtons(buttons);
    }
});

UI.GridCell = Class.create({

    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            input: null,
            readOnly: true,
            width: 100,
            bean: {}
        }, config || {});

        this.render();
    },

    render: function() {
    	var h = this;

		h.material = new Element("DIV", {
			style: "position:relative; display:inline; overflow:hidden; font-size:14px; height:26px; margin:0px; padding:0px; border:0px solid grey; border-width:0px 0px 0px 0px; width:" + h.config.width + "px",
			class: "grid-cell"
		});
    	
		h.input = new Element("INPUT", {
			style: "font-size:14px; height:25px; margin:0px; padding:0px; padding-left:4px; border:0px solid grey; border-width:0px 1px 0px 0px; width:" + h.config.width + "px",
			class: "grid-cell"
		});
		
		h.material.update(h.input);
		
		h.input.on("keydown", function(e) {
			e.cancelBubble = true;
		});

		h.input.on("change", function(e) {
			h.updateValue();
		});

		h.setReadOnly(h.config.readOnly);

		h.setBean(h.config.bean);

		if (h.config.render !== undefined) {
			h.config.render(h);
		}
    },
    getMaterial: function() {
    	return this.material;
    },
    getInput: function() {
    	return this.input;
    },
    getBean: function() {
    	return this.config.bean;
    },
    setReadOnly: function(readOnly) {
    	var h = this;

    	var ro = readOnly;
    		if (ro === true) {
    			h.input.setStyle({
    				backgroundColor: "white"
    			});	
    		} else {
    			h.input.setStyle({
    				backgroundColor: "#f8f8ba"
    			});
    		}
    		h.input.readOnly = ro;
    },
    updateValue: function() {
    	var h = this;

    	eval("h.config.bean." + h.config.property + " = '" + h.input.value + "'");

    	if (h.config.onChange) {
    		h.config.onChange(h);
    	}
    },
    setBean: function(bean) {
    	var h = this;
    		var val = eval("bean." + h.config.property);
    		if (val !== undefined) {
    			h.input.value = val;
    		}
    }
});

UI.GridInputCell = Class.create({

    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            bean: {name:""},
            property: "name",
            mask: new Input(null),
            readOnly: false
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },

    render: function() {
    	var h = this;
    		h.input = new Element("INPUT", {
    			style: "background-color:transaprent; border:0px solid grey; border-width:0px 0px 2px 0px; margin:0px; position:relative; top:3px; left:-4px; width:100%; line-height:18px"
    		});
    		h.config.inside.insert(h.input);

    		if (h.config.mask) {
    			var mask = new InputMask(h.config.mask, h.input)
    				mask.blurFunction = function() {
    					eval("h.config.bean." + h.config.property + " = h.input.value");
    					if (h.config.onChange !== undefined) {
    						h.config.onChange(h.input.value);
    					}
    				}
    		}

    		try {
    			var value = eval("h.config.bean." + h.config.property);
    			if (value !== undefined) {
    				h.input.value = value;
    			}
    		} catch (e) {

    		}
    },
    setPropertyValue: function(value) {
    	var h = this;

    	h.input.value = value;
    	eval("h.config.bean." + h.config.property + " = value");
    },

    setReadOnly: function(readOnly) {
    	var h = this;
    	
    	if (readOnly == false) {
    		h.input.disabled = false;
    		h.input.setStyle({
    			backgroundColor: "#F1DECC"
    		});
    	} else {
    		h.input.disabled = true;
    		h.input.setStyle({
    			backgroundColor: "white"
    		});
    	}
    },

    getMaterial: function() {
    	return this.input;
    }
});
UI.IconToolbar = Class.create(UI.MaterialComponent, {

	initConfig : function(config) {
		this.config = Object.extend({}, config || {});
	},

	render : function() {
		var h = this;

    	h.content = new Element("DIV", {
    		style: "position:absolute; overflow:visible; top:0px; left:0px; bottom:0px; right:0px; background-color:#ebf0ee; display:flex; border:1px solid #c9cece; border-width:0px 0px 1px 0px"
    	});
    	
    	h.getMaterial().setStyle({
    		backgroundColor: "#ebf0ee",
    		overflow: "visible"
    	});
    	
    	h.getMaterial().parentElement.setStyle({
    		backgroundColor: "#ebf0ee",
    		overflow: "visible"
    	});

    	h.getMaterial().update(h.content);
    	h.renderItems();
	},

	renderItems: function() {
    	var h = this;

    	var i=0;
    	for (i=0; i<h.config.items.length; i++) {
    		var itemConfig = h.config.items[i];
    		var item = new Element("DIV", {
    			style: "overflow:hidden; flex:1; line-height:65px; text-align:center; border:0px solid #c9cece; border-width:0px 1px 0px 0px; background-image:url('" + itemConfig.icon + "'); background-repeat:no-repeat; background-position:center center; background-size:36px 36px;"
    		});
    		item.onClick = itemConfig.onClick;
    		item.config = itemConfig;
    		
    		item.title = itemConfig.name;

			item.on("click", function(e) {
				setTimeout(function() {
					h.displayMarker(e.target);	
				}, 0);
				if (e.target.onClick !== undefined) {
					e.target.onClick(e.target.config);
				}
			});

    		h.content.insert(item);
    		
    		if (i==0) {
    			item.click();
    		}
    	}
	},

	displayMarker: function(html) {
		var h = this;
		
		var left = html.getBoundingClientRect().left - h.content.getBoundingClientRect().left + html.getBoundingClientRect().width / 2 - 8; 
		
		if (h.marker === undefined) {
			h.marker = new Element("DIV", {
				style: "position:absolute; z-index:1000; overflow:visible; top:62px; left:" + left + "px; width:16px; height:16px; border:1px solid #c9cece; border-width:0px 1px 1px 0px; background-color:#ebf0ee; transform: rotate(45deg);"
			});
			h.content.insert(h.marker);
		} else {
			var currentLeft = h.marker.getBoundingClientRect().left - h.content.getBoundingClientRect().left;
			var player = h.marker.animate([
   	  		    {
   	  		       left: currentLeft + "px"
   	  		    },
   	  		    {
   	   		       left: left + "px"
   	  		    },
   	  		], {
   	  			direction: 'normal',
   	  		    duration: 1000,
   	  		    easing: "ease",
   	  			iterations: 1,
   	  			fill: "both"
   			});
		}
	}
});
	

UI.BreadCrumb = Class.create(UI.MaterialComponent, {

    initConfig: function(config) {
        this.config = Object.extend({
        }, config || {});
    },

    render: function() {
        var h = this;
        
    	h.content = new Element("DIV", {
    		style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:rgba(30, 29, 41, 0.9)"
    	});
    	h.getMaterial().update(h.content);
    	
    	h.forItems = new Element("DIV", {
    		style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:transparent"
    	});
    	h.getMaterial().insert(h.forItems);

    	h.addItem(h.config.firstItem);
    },

    addItem: function(nextItem) {
    	
    	nextItem.removeNextItem = function() {
    		if (this.nextItem) {

	    		this.nextItem.removeNextItem();

	    		if (this.nextItem.card) {
	    			this.nextItem.card.remove();
	    			delete this.nextItem.card;
	    		}
	    		
	    		if (this.nextItem.divItem) {
	    			this.nextItem.divItem.remove();
	    			delete this.nextItem.divItem;
	    		}

	    		//delete this.nextItem;
    		}
    	};

    	var h = this;
    		var item = new Element("DIV", {
    			style: "padding-left:15px; font-size:16px; padding-right:15px; display:inline-block; border-right:1px solid #1E1D29; line-height:70px; height:70px; color:#525160; overflow:hidden; cursor:pointer"
    		});
    		item.bean = nextItem;
    		nextItem.divItem = item;
    		item.onClick = nextItem.onClick;

    		item.update(nextItem.name);
    		item.title = nextItem.description || nextItem.name;

    		item.addEventListener("click", function(e) {
    			h.handleItemClick(e.target.bean);
			}, false);

    		h.forItems.insert(item);

    		if (h.lastItem === undefined) {
    			h.lastItem = nextItem;
    		} else {
    			nextItem.previousItem = h.lastItem;
    			h.lastItem.nextItem = nextItem;
    			h.lastItem = nextItem;
    		}
        item.click();
    },
    /**
     * 
     * @param item
     */
    handleItemClick: function(item) {
    	var h = this;
    	
		setTimeout(function() {
			h.displayMarker(item.divItem);	
		}, 0);
		
		if (item.divItem.onClick !== undefined) {
			item.divItem.onClick(item.divItem.bean);
		}

    	h.displayMarker(item.divItem);
    	
    	item.divItem.bean.removeNextItem();
    	
    	h.lastItem = item;
    },
    /**
     * @metod removeLastItem
     */
    removeLastItem: function() {
    	var h = this;

    	try {
	    	if (h.lastItem && h.lastItem.previousItem) {
	    		h.handleItemClick(h.lastItem.previousItem);
	    	}
    	} catch (e) {
    		alert("Error removing " + e);
    	}
    },
    /**
     * @method displayMarker
     * @param html
     */
    displayMarker: function(html) {
    	var h = this;

    	var rightPosition = html.getBoundingClientRect().right - h.content.getBoundingClientRect().left - 6;

    	if (h.marker === undefined) {
    		h.marker = new Element("DIV", {
    			style: "position:absolute; opacity:0.0; top:10px; left:" + rightPosition + "px; width:5px; bottom:10px; background-color:#6dbbcf"
    		});
    		h.content.insert(h.marker);
    		
    		h.bgMarker = new Element("DIV", {
    			style: "position:absolute; opacity:0.05; top:10px; left:0px; width:" + (html.getBoundingClientRect().right - h.content.getBoundingClientRect().left) + "px; bottom:10px; background-color:#6dbbcf"
    		});
    		h.content.insert(h.bgMarker);
    		
    		$PLAY(h.marker, [
     		    {
     		    	opacity: "0.0"
     		    },
     		    {
     		    	opacity: "1.0"
     		    },
     		]);
    	} else {
			$PLAY(h.marker, [
	  		    {
	  		       left: (h.marker.getBoundingClientRect().right - h.content.getBoundingClientRect().left) + "px"
	  		    },
	  		    {
	   		       left: (html.getBoundingClientRect().right - h.content.getBoundingClientRect().left) + "px"
	  		    },
	  		]);
			
			$PLAY(h.bgMarker, [
 	  		    {
 	  		       width: h.bgMarker.getBoundingClientRect().width + "px"
 	  		    },
 	  		    {
 	   		       width: (html.getBoundingClientRect().right - h.content.getBoundingClientRect().left) + "px"
 	  		    },
 	  		]);
    	}
    }
});
/**
 * @class UI.Toolbar
 */
UI.Toolbar = Class.create(UI.MaterialComponent, {

    initConfig: function(config) {
        this.config = Object.extend({
        	orientation: "vertical",
        	items: [],
        	autoclick: true
        }, config || {});
    },

    render: function() {
        var h = this;

    	if (h.config.orientation == "vertical") {
    		h.renderItemsVertically();
    	} else {
    		h.renderItemsHorizontally();
    	}
    },
 
    renderItemsVertically: function() {
    	var h = this;
    	
    	h.content = new Element("DIV", {
    		class: "toolbar-marker-v toolbar-bg-color"
    	});

    	h.getMaterial().update(h.content);
    	
    	h.items = [];
    	
    	h.config.items.
	    	filter(function(t) {
	    		return !(t.access !== undefined && t.access != UI.VISIBLE);
	    	}).
	    	map(function(t) {    		
	    		var item = new Element("DIV", {
	    			class: "toolbar-item-vertical toolbar-text-color"
	    		});
	    		item.bean = t;
	
	    		h.items.push(item);
	
	    		if (t.name) {
	    			item.update(t.name);
	    		}

	    		if (t.customIcon) {
	    		    if (t.name) {
                        item.setStyle({
                            backgroundImage: "url('" + t.customIcon + "')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right center"
                        });
	    			} else {
                        item.setStyle({
                            backgroundImage: "url('" + t.customIcon + "')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center"
                        });
	    			}
	    		}
	    		item.title = t.title || t.name;
	
				item.on("click", function(e) {
					h.displayMarkerVertically(e.target);	
	
					if (e.target.bean.onClick !== undefined) {
						e.target.bean.onClick(t);
					}
				});

	    		return item;
	    	}).
	    	forEach(function(item, index) {
	    		h.content.insert(item);
	    		if (index == 0 && h.config.autoclick) {
	    			item.click();
	    		}
	    	});
    },
    /**
     * @method renderItemsHorizontally
     */
    renderItemsHorizontally: function() {
    	var h = this;
    	
    	h.content = new Element("DIV", {
    		class: "toolbar-marker-h toolbar-bg-color"
    	});

    	h.getMaterial().update(h.content);
    	
    	h.items = [];

    	var i=0;
    	for (i=0; i<h.config.items.length; i++) {
    		var t = h.config.items[i];
    		
        	if (t.access !== undefined && t.access != UI.VISIBLE) {
        		continue;
        	}

    		var item = new Element("DIV", {
    			class: "toolbar-item-horizontal toolbar-text-color"
    		});
    		item.bean = t;
    		h.items.push(item);

    		item.onClick = h.config.items[i].onClick;

    		if (!t.customIcon) {
    			item.update(t.name);
    		} else {
    			item.setStyle({
    				backgroundImage: "url('" + t.customIcon + "')",
    				backgroundRepeat: "no-repeat",
    				backgroundPosition: "center center"
    			});
    		}
    		item.title = t.description || t.name;

			item.on("click", function(e) {
				h.displayMarkerHorizontally(e.target);	

				if (e.target.bean.onClick !== undefined) {
					e.target.bean.onClick(e.target.bean);
				}
			});

    		h.content.insert(item);
    		
    		if (i == 0) {
    			item.click();
    		}
    	}
    },

    displayMarkerHorizontally: function(html) {
    	var h = this;

    	var containerLeft = h.content.getBoundingClientRect().left;
    	
    	h.content.pseudoStyle("before", "width",  (html.getBoundingClientRect().width - 1) + "px");
    	h.content.pseudoStyle("before", "transform", "translateX(" + (html.getBoundingClientRect().left - containerLeft) + "px)");
    },
    
    displayMarkerVertically: function(html) {
    	var h = this;

    	var containerTop = h.content.getBoundingClientRect().top;

    	h.content.pseudoStyle("before", "height",  (html.getBoundingClientRect().height - 1) + "px");
    	h.content.pseudoStyle("before", "transform", "translateY(" + (html.getBoundingClientRect().top -containerTop) + "px)");
    },
    
    selectItemByName: function(name) {
    	var h = this;
    	
    	var item = h.findItemByName(name);
    	if (item && item != null) {
    		item.click();
    	}
    },
    
    findItemByName: function(name) {
    	var h = this;
    	
    	var result = null;
    	var i=0;
    	for (i=0; i<h.items.length; i++) {
    		if (h.items[i].bean.name == name) {
    			result = h.items[i];
    			break;
    		}
    	}
    	return result;
    },
});
UI.Tabs = Class.create(UI.MaterialComponent, {

    initConfig: function(config) {
        this.config = Object.extend({
        	type: "toolbar"
        }, config || {});
    },

    render: function() {
        var h = this;
        
        h.layout = new UI.BorderLayout({
        	inside: h.getMaterial(),
        	north: {
        		height:70
        	}
        });

        var i = 0;
        for (i=0; i<h.config.tabs.length; i++) { 
        	if (h.config.tabs[i].access !== undefined && h.config.tabs[i].access != UI.VISIBLE) {
        		continue;
        	}
        	h.addCard(h.config.tabs[i]);
        }
        
        if (h.config.type == "toolbar") {
	        h.toolbar = new UI.Toolbar({
	        	inside: h.layout.getNorth(),
	        	orientation: "horizontal",
	        	items: h.config.tabs
	        });
        } else if (h.config.type == "breadcrumb") {
	        h.toolbar = new UI.BreadCrumb({
	        	inside: h.layout.getNorth(),
	        	orientation: "horizontal",
	        	firstItem: h.config.tabs[0]
	        });
        } else if (h.config.type == "icon") {
	        h.toolbar = new UI.IconToolbar({
	        	inside: h.layout.getNorth(),
	        	orientation: "horizontal",
	        	items: h.config.tabs
	        });
        }
    },

    addCard: function(tabItem) {
    	var h = this;
    	
    	tabItem.onClick = function(tab) {
    		if (tab.onActivate !== undefined) {
    			if (h.activeCard !== undefined) {
    				h.activeCard.hide();
    			}

    			var card = tab.card; 

    			if (card === undefined) {
    				card = new Element("DIV", {
    					class: "inside"
    				});
    				h.layout.getDefault().insert(card);
    				tab.card = card;

    				tab.onActivate(card);
    			} else {
    				card.show();
    			}
    			h.activeCard = card;
    		}
    	}
    },

    addTab: function(tab) {
    	var h = this;

	    	h.addCard(tab);
	    	h.toolbar.addItem(tab);
    },
    
    removeLastItem: function() {
    	var h = this;
    	h.toolbar.removeLastItem();
    }
});
/**
 * material-design-lite - Material Design Components in CSS, JS and HTML
 * @version v1.0.3
 * @license Apache-2.0
 * @copyright 2015 Google, Inc.
 * @link https://github.com/google/material-design-lite
 */
!function(){"use strict";function e(e,s){if(e){if(s.element_.classList.contains(s.CssClasses_.MDL_JS_RIPPLE_EFFECT)){var t=document.createElement("span");t.classList.add(s.CssClasses_.MDL_RIPPLE_CONTAINER),t.classList.add(s.CssClasses_.MDL_JS_RIPPLE_EFFECT);var i=document.createElement("span");i.classList.add(s.CssClasses_.MDL_RIPPLE),t.appendChild(i),e.appendChild(t)}e.addEventListener("click",function(t){t.preventDefault();var i=e.href.split("#")[1],n=s.element_.querySelector("#"+i);s.resetTabState_(),s.resetPanelState_(),e.classList.add(s.CssClasses_.ACTIVE_CLASS),n.classList.add(s.CssClasses_.ACTIVE_CLASS)})}}function s(e,s,t,i){if(e){if(i.tabBar_.classList.contains(i.CssClasses_.JS_RIPPLE_EFFECT)){var n=document.createElement("span");n.classList.add(i.CssClasses_.RIPPLE_CONTAINER),n.classList.add(i.CssClasses_.JS_RIPPLE_EFFECT);var a=document.createElement("span");a.classList.add(i.CssClasses_.RIPPLE),n.appendChild(a),e.appendChild(n)}e.addEventListener("click",function(n){n.preventDefault();var a=e.href.split("#")[1],l=i.content_.querySelector("#"+a);i.resetTabState_(s),i.resetPanelState_(t),e.classList.add(i.CssClasses_.IS_ACTIVE),l.classList.add(i.CssClasses_.IS_ACTIVE)})}}window.componentHandler=function(){function e(e,s){for(var t=0;t<c.length;t++)if(c[t].className===e)return void 0!==s&&(c[t]=s),c[t];return!1}function s(e){var s=e.getAttribute("data-upgraded");return null===s?[""]:s.split(",")}function t(e,t){var i=s(e);return-1!==i.indexOf(t)}function i(s,t){if(void 0===s&&void 0===t)for(var a=0;a<c.length;a++)i(c[a].className,c[a].cssClass);else{var l=s;if(void 0===t){var o=e(l);o&&(t=o.cssClass)}for(var r=document.querySelectorAll("."+t),_=0;_<r.length;_++)n(r[_],l)}}function n(i,n){if(!("object"==typeof i&&i instanceof Element))throw new Error("Invalid argument provided to upgrade MDL element.");var a=s(i),l=[];if(n)t(i,n)||l.push(e(n));else{var o=i.classList;c.forEach(function(e){o.contains(e.cssClass)&&-1===l.indexOf(e)&&!t(i,e.className)&&l.push(e)})}for(var r,_=0,d=l.length;d>_;_++){if(r=l[_],!r)throw new Error("Unable to find a registered component for the given class.");a.push(r.className),i.setAttribute("data-upgraded",a.join(","));var h=new r.classConstructor(i);h[C]=r,p.push(h);for(var u=0,m=r.callbacks.length;m>u;u++)r.callbacks[u](i);r.widget&&(i[r.className]=h);var E=document.createEvent("Events");E.initEvent("mdl-componentupgraded",!0,!0),i.dispatchEvent(E)}}function a(e){Array.isArray(e)||(e="function"==typeof e.item?Array.prototype.slice.call(e):[e]);for(var s,t=0,i=e.length;i>t;t++)s=e[t],s instanceof HTMLElement&&(s.children.length>0&&a(s.children),n(s))}function l(s){var t={classConstructor:s.constructor,className:s.classAsString,cssClass:s.cssClass,widget:void 0===s.widget?!0:s.widget,callbacks:[]};if(c.forEach(function(e){if(e.cssClass===t.cssClass)throw new Error("The provided cssClass has already been registered.");if(e.className===t.className)throw new Error("The provided className has already been registered")}),s.constructor.prototype.hasOwnProperty(C))throw new Error("MDL component classes must not have "+C+" defined as a property.");var i=e(s.classAsString,t);i||c.push(t)}function o(s,t){var i=e(s);i&&i.callbacks.push(t)}function r(){for(var e=0;e<c.length;e++)i(c[e].className)}function _(e){for(var s=0;s<p.length;s++){var t=p[s];if(t.element_===e)return t}}function d(e){if(e&&e[C].classConstructor.prototype.hasOwnProperty(u)){e[u]();var s=p.indexOf(e);p.splice(s,1);var t=e.element_.getAttribute("data-upgraded").split(","),i=t.indexOf(e[C].classAsString);t.splice(i,1),e.element_.setAttribute("data-upgraded",t.join(","));var n=document.createEvent("Events");n.initEvent("mdl-componentdowngraded",!0,!0),e.element_.dispatchEvent(n)}}function h(e){var s=function(e){d(_(e))};if(e instanceof Array||e instanceof NodeList)for(var t=0;t<e.length;t++)s(e[t]);else{if(!(e instanceof Node))throw new Error("Invalid argument provided to downgrade MDL nodes.");s(e)}}var c=[],p=[],u="mdlDowngrade_",C="mdlComponentConfigInternal_";return{upgradeDom:i,upgradeElement:n,upgradeElements:a,upgradeAllRegistered:r,registerUpgradedCallback:o,register:l,downgradeElements:h}}(),window.addEventListener("load",function(){"classList"in document.createElement("div")&&"querySelector"in document&&"addEventListener"in window&&Array.prototype.forEach?(document.documentElement.classList.add("mdl-js"),componentHandler.upgradeAllRegistered()):componentHandler.upgradeElement=componentHandler.register=function(){}}),componentHandler.ComponentConfig,componentHandler.Component,Date.now||(Date.now=function(){return(new Date).getTime()});for(var t=["webkit","moz"],i=0;i<t.length&&!window.requestAnimationFrame;++i){var n=t[i];window.requestAnimationFrame=window[n+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var a=0;window.requestAnimationFrame=function(e){var s=Date.now(),t=Math.max(a+16,s);return setTimeout(function(){e(a=t)},t-s)},window.cancelAnimationFrame=clearTimeout}var l=function(e){this.element_=e,this.init()};window.MaterialButton=l,l.prototype.Constant_={},l.prototype.CssClasses_={RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_CONTAINER:"mdl-button__ripple-container",RIPPLE:"mdl-ripple"},l.prototype.blurHandler_=function(e){e&&this.element_.blur()},l.prototype.disable=function(){this.element_.disabled=!0},l.prototype.enable=function(){this.element_.disabled=!1},l.prototype.init=function(){if(this.element_){if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){var e=document.createElement("span");e.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleElement_=document.createElement("span"),this.rippleElement_.classList.add(this.CssClasses_.RIPPLE),e.appendChild(this.rippleElement_),this.boundRippleBlurHandler=this.blurHandler_.bind(this),this.rippleElement_.addEventListener("mouseup",this.boundRippleBlurHandler),this.element_.appendChild(e)}this.boundButtonBlurHandler=this.blurHandler_.bind(this),this.element_.addEventListener("mouseup",this.boundButtonBlurHandler),this.element_.addEventListener("mouseleave",this.boundButtonBlurHandler)}},l.prototype.mdlDowngrade_=function(){this.rippleElement_&&this.rippleElement_.removeEventListener("mouseup",this.boundRippleBlurHandler),this.element_.removeEventListener("mouseup",this.boundButtonBlurHandler),this.element_.removeEventListener("mouseleave",this.boundButtonBlurHandler)},componentHandler.register({constructor:l,classAsString:"MaterialButton",cssClass:"mdl-js-button",widget:!0});var o=function(e){this.element_=e,this.init()};window.MaterialCheckbox=o,o.prototype.Constant_={TINY_TIMEOUT:.001},o.prototype.CssClasses_={INPUT:"mdl-checkbox__input",BOX_OUTLINE:"mdl-checkbox__box-outline",FOCUS_HELPER:"mdl-checkbox__focus-helper",TICK_OUTLINE:"mdl-checkbox__tick-outline",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-checkbox__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked",IS_UPGRADED:"is-upgraded"},o.prototype.onChange_=function(e){this.updateClasses_()},o.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},o.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},o.prototype.onMouseUp_=function(e){this.blur_()},o.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},o.prototype.blur_=function(e){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},o.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},o.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},o.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},o.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},o.prototype.check=function(){this.inputElement_.checked=!0,this.updateClasses_()},o.prototype.uncheck=function(){this.inputElement_.checked=!1,this.updateClasses_()},o.prototype.init=function(){if(this.element_){this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT);var e=document.createElement("span");e.classList.add(this.CssClasses_.BOX_OUTLINE);var s=document.createElement("span");s.classList.add(this.CssClasses_.FOCUS_HELPER);var t=document.createElement("span");if(t.classList.add(this.CssClasses_.TICK_OUTLINE),e.appendChild(t),this.element_.appendChild(s),this.element_.appendChild(e),this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.boundRippleMouseUp=this.onMouseUp_.bind(this),this.rippleContainerElement_.addEventListener("mouseup",this.boundRippleMouseUp);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(i),this.element_.appendChild(this.rippleContainerElement_)}this.boundInputOnChange=this.onChange_.bind(this),this.boundInputOnFocus=this.onFocus_.bind(this),this.boundInputOnBlur=this.onBlur_.bind(this),this.boundElementMouseUp=this.onMouseUp_.bind(this),this.inputElement_.addEventListener("change",this.boundInputOnChange),this.inputElement_.addEventListener("focus",this.boundInputOnFocus),this.inputElement_.addEventListener("blur",this.boundInputOnBlur),this.element_.addEventListener("mouseup",this.boundElementMouseUp),this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},o.prototype.mdlDowngrade_=function(){this.rippleContainerElement_&&this.rippleContainerElement_.removeEventListener("mouseup",this.boundRippleMouseUp),this.inputElement_.removeEventListener("change",this.boundInputOnChange),this.inputElement_.removeEventListener("focus",this.boundInputOnFocus),this.inputElement_.removeEventListener("blur",this.boundInputOnBlur),this.element_.removeEventListener("mouseup",this.boundElementMouseUp)},componentHandler.register({constructor:o,classAsString:"MaterialCheckbox",cssClass:"mdl-js-checkbox",widget:!0});var r=function(e){this.element_=e,this.init()};window.MaterialIconToggle=r,r.prototype.Constant_={TINY_TIMEOUT:.001},r.prototype.CssClasses_={INPUT:"mdl-icon-toggle__input",JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-icon-toggle__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked"},r.prototype.onChange_=function(e){this.updateClasses_()},r.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},r.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},r.prototype.onMouseUp_=function(e){this.blur_()},r.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},r.prototype.blur_=function(e){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},r.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},r.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},r.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},r.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},r.prototype.check=function(){this.inputElement_.checked=!0,this.updateClasses_()},r.prototype.uncheck=function(){this.inputElement_.checked=!1,this.updateClasses_()},r.prototype.init=function(){if(this.element_){if(this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT),this.element_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.JS_RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.boundRippleMouseUp=this.onMouseUp_.bind(this),this.rippleContainerElement_.addEventListener("mouseup",this.boundRippleMouseUp);var e=document.createElement("span");e.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(e),this.element_.appendChild(this.rippleContainerElement_)}this.boundInputOnChange=this.onChange_.bind(this),this.boundInputOnFocus=this.onFocus_.bind(this),this.boundInputOnBlur=this.onBlur_.bind(this),this.boundElementOnMouseUp=this.onMouseUp_.bind(this),this.inputElement_.addEventListener("change",this.boundInputOnChange),this.inputElement_.addEventListener("focus",this.boundInputOnFocus),this.inputElement_.addEventListener("blur",this.boundInputOnBlur),this.element_.addEventListener("mouseup",this.boundElementOnMouseUp),this.updateClasses_(),this.element_.classList.add("is-upgraded")}},r.prototype.mdlDowngrade_=function(){this.rippleContainerElement_&&this.rippleContainerElement_.removeEventListener("mouseup",this.boundRippleMouseUp),this.inputElement_.removeEventListener("change",this.boundInputOnChange),this.inputElement_.removeEventListener("focus",this.boundInputOnFocus),this.inputElement_.removeEventListener("blur",this.boundInputOnBlur),this.element_.removeEventListener("mouseup",this.boundElementOnMouseUp)},componentHandler.register({constructor:r,classAsString:"MaterialIconToggle",cssClass:"mdl-js-icon-toggle",widget:!0});var _=function(e){this.element_=e,this.init()};window.MaterialMenu=_,_.prototype.Constant_={TRANSITION_DURATION_SECONDS:.3,TRANSITION_DURATION_FRACTION:.8,CLOSE_TIMEOUT:150},_.prototype.Keycodes_={ENTER:13,ESCAPE:27,SPACE:32,UP_ARROW:38,DOWN_ARROW:40},_.prototype.CssClasses_={CONTAINER:"mdl-menu__container",OUTLINE:"mdl-menu__outline",ITEM:"mdl-menu__item",ITEM_RIPPLE_CONTAINER:"mdl-menu__item-ripple-container",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE:"mdl-ripple",IS_UPGRADED:"is-upgraded",IS_VISIBLE:"is-visible",IS_ANIMATING:"is-animating",BOTTOM_LEFT:"mdl-menu--bottom-left",BOTTOM_RIGHT:"mdl-menu--bottom-right",TOP_LEFT:"mdl-menu--top-left",TOP_RIGHT:"mdl-menu--top-right",UNALIGNED:"mdl-menu--unaligned"},_.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.classList.add(this.CssClasses_.CONTAINER),this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_),this.container_=e;var s=document.createElement("div");s.classList.add(this.CssClasses_.OUTLINE),this.outline_=s,e.insertBefore(s,this.element_);var t=this.element_.getAttribute("for"),i=null;t&&(i=document.getElementById(t),i&&(this.forElement_=i,i.addEventListener("click",this.handleForClick_.bind(this)),i.addEventListener("keydown",this.handleForKeyboardEvent_.bind(this))));var n=this.element_.querySelectorAll("."+this.CssClasses_.ITEM);this.boundItemKeydown=this.handleItemKeyboardEvent_.bind(this),this.boundItemClick=this.handleItemClick_.bind(this);for(var a=0;a<n.length;a++)n[a].addEventListener("click",this.boundItemClick),n[a].tabIndex="-1",n[a].addEventListener("keydown",this.boundItemKeydown);if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT))for(this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),a=0;a<n.length;a++){var l=n[a],o=document.createElement("span");o.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);var r=document.createElement("span");r.classList.add(this.CssClasses_.RIPPLE),o.appendChild(r),l.appendChild(o),l.classList.add(this.CssClasses_.RIPPLE_EFFECT)}this.element_.classList.contains(this.CssClasses_.BOTTOM_LEFT)&&this.outline_.classList.add(this.CssClasses_.BOTTOM_LEFT),this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)&&this.outline_.classList.add(this.CssClasses_.BOTTOM_RIGHT),this.element_.classList.contains(this.CssClasses_.TOP_LEFT)&&this.outline_.classList.add(this.CssClasses_.TOP_LEFT),this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)&&this.outline_.classList.add(this.CssClasses_.TOP_RIGHT),this.element_.classList.contains(this.CssClasses_.UNALIGNED)&&this.outline_.classList.add(this.CssClasses_.UNALIGNED),e.classList.add(this.CssClasses_.IS_UPGRADED)}},_.prototype.handleForClick_=function(e){if(this.element_&&this.forElement_){var s=this.forElement_.getBoundingClientRect(),t=this.forElement_.parentElement.getBoundingClientRect();this.element_.classList.contains(this.CssClasses_.UNALIGNED)||(this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)?(this.container_.style.right=t.right-s.right+"px",this.container_.style.top=this.forElement_.offsetTop+this.forElement_.offsetHeight+"px"):this.element_.classList.contains(this.CssClasses_.TOP_LEFT)?(this.container_.style.left=this.forElement_.offsetLeft+"px",this.container_.style.bottom=t.bottom-s.top+"px"):this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?(this.container_.style.right=t.right-s.right+"px",this.container_.style.bottom=t.bottom-s.top+"px"):(this.container_.style.left=this.forElement_.offsetLeft+"px",this.container_.style.top=this.forElement_.offsetTop+this.forElement_.offsetHeight+"px"))}this.toggle(e)},_.prototype.handleForKeyboardEvent_=function(e){if(this.element_&&this.container_&&this.forElement_){var s=this.element_.querySelectorAll("."+this.CssClasses_.ITEM+":not([disabled])");s&&s.length>0&&this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)&&(e.keyCode===this.Keycodes_.UP_ARROW?(e.preventDefault(),s[s.length-1].focus()):e.keyCode===this.Keycodes_.DOWN_ARROW&&(e.preventDefault(),s[0].focus()))}},_.prototype.handleItemKeyboardEvent_=function(e){if(this.element_&&this.container_){var s=this.element_.querySelectorAll("."+this.CssClasses_.ITEM+":not([disabled])");if(s&&s.length>0&&this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)){var t=Array.prototype.slice.call(s).indexOf(e.target);if(e.keyCode===this.Keycodes_.UP_ARROW)e.preventDefault(),t>0?s[t-1].focus():s[s.length-1].focus();else if(e.keyCode===this.Keycodes_.DOWN_ARROW)e.preventDefault(),s.length>t+1?s[t+1].focus():s[0].focus();else if(e.keyCode===this.Keycodes_.SPACE||e.keyCode===this.Keycodes_.ENTER){e.preventDefault();var i=new MouseEvent("mousedown");e.target.dispatchEvent(i),i=new MouseEvent("mouseup"),e.target.dispatchEvent(i),e.target.click()}else e.keyCode===this.Keycodes_.ESCAPE&&(e.preventDefault(),this.hide())}}},_.prototype.handleItemClick_=function(e){null!==e.target.getAttribute("disabled")?e.stopPropagation():(this.closing_=!0,window.setTimeout(function(e){this.hide(),this.closing_=!1}.bind(this),this.Constant_.CLOSE_TIMEOUT))},_.prototype.applyClip_=function(e,s){this.element_.style.clip=this.element_.classList.contains(this.CssClasses_.UNALIGNED)?null:this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)?"rect(0 "+s+"px 0 "+s+"px)":this.element_.classList.contains(this.CssClasses_.TOP_LEFT)?"rect("+e+"px 0 "+e+"px 0)":this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?"rect("+e+"px "+s+"px "+e+"px "+s+"px)":null},_.prototype.addAnimationEndListener_=function(){var e=function(){this.element_.removeEventListener("transitionend",e),this.element_.removeEventListener("webkitTransitionEnd",e),this.element_.classList.remove(this.CssClasses_.IS_ANIMATING)}.bind(this);this.element_.addEventListener("transitionend",e),this.element_.addEventListener("webkitTransitionEnd",e)},_.prototype.show=function(e){if(this.element_&&this.container_&&this.outline_){var s=this.element_.getBoundingClientRect().height,t=this.element_.getBoundingClientRect().width;this.container_.style.width=t+"px",this.container_.style.height=s+"px",this.outline_.style.width=t+"px",this.outline_.style.height=s+"px";for(var i=this.Constant_.TRANSITION_DURATION_SECONDS*this.Constant_.TRANSITION_DURATION_FRACTION,n=this.element_.querySelectorAll("."+this.CssClasses_.ITEM),a=0;a<n.length;a++){var l=null;l=this.element_.classList.contains(this.CssClasses_.TOP_LEFT)||this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?(s-n[a].offsetTop-n[a].offsetHeight)/s*i+"s":n[a].offsetTop/s*i+"s",n[a].style.transitionDelay=l}this.applyClip_(s,t),window.requestAnimationFrame(function(){this.element_.classList.add(this.CssClasses_.IS_ANIMATING),this.element_.style.clip="rect(0 "+t+"px "+s+"px 0)",this.container_.classList.add(this.CssClasses_.IS_VISIBLE)}.bind(this)),this.addAnimationEndListener_();var o=function(s){s===e||this.closing_||(document.removeEventListener("click",o),this.hide())}.bind(this);document.addEventListener("click",o)}},_.prototype.hide=function(){if(this.element_&&this.container_&&this.outline_){for(var e=this.element_.querySelectorAll("."+this.CssClasses_.ITEM),s=0;s<e.length;s++)e[s].style.transitionDelay=null;var t=this.element_.getBoundingClientRect().height,i=this.element_.getBoundingClientRect().width;this.element_.classList.add(this.CssClasses_.IS_ANIMATING),this.applyClip_(t,i),this.container_.classList.remove(this.CssClasses_.IS_VISIBLE),this.addAnimationEndListener_()}},_.prototype.toggle=function(e){this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)?this.hide():this.show(e)},_.prototype.mdlDowngrade_=function(){for(var e=this.element_.querySelectorAll("."+this.CssClasses_.ITEM),s=0;s<e.length;s++)e[s].removeEventListener("click",this.boundItemClick),e[s].removeEventListener("keydown",this.boundItemKeydown)},componentHandler.register({constructor:_,classAsString:"MaterialMenu",cssClass:"mdl-js-menu",widget:!0});var d=function(e){this.element_=e,this.init()};window.MaterialProgress=d,d.prototype.Constant_={},d.prototype.CssClasses_={INDETERMINATE_CLASS:"mdl-progress__indeterminate"},d.prototype.setProgress=function(e){this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS)||(this.progressbar_.style.width=e+"%")},d.prototype.setBuffer=function(e){this.bufferbar_.style.width=e+"%",this.auxbar_.style.width=100-e+"%"},d.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.className="progressbar bar bar1",this.element_.appendChild(e),this.progressbar_=e,e=document.createElement("div"),e.className="bufferbar bar bar2",this.element_.appendChild(e),this.bufferbar_=e,e=document.createElement("div"),e.className="auxbar bar bar3",this.element_.appendChild(e),this.auxbar_=e,this.progressbar_.style.width="0%",this.bufferbar_.style.width="100%",this.auxbar_.style.width="0%",this.element_.classList.add("is-upgraded")}},d.prototype.mdlDowngrade_=function(){for(;this.element_.firstChild;)this.element_.removeChild(this.element_.firstChild)},componentHandler.register({constructor:d,classAsString:"MaterialProgress",cssClass:"mdl-js-progress",widget:!0});var h=function(e){this.element_=e,this.init()};window.MaterialRadio=h,h.prototype.Constant_={TINY_TIMEOUT:.001},h.prototype.CssClasses_={IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked",IS_UPGRADED:"is-upgraded",JS_RADIO:"mdl-js-radio",RADIO_BTN:"mdl-radio__button",RADIO_OUTER_CIRCLE:"mdl-radio__outer-circle",RADIO_INNER_CIRCLE:"mdl-radio__inner-circle",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-radio__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple"},h.prototype.onChange_=function(e){for(var s=document.getElementsByClassName(this.CssClasses_.JS_RADIO),t=0;t<s.length;t++){var i=s[t].querySelector("."+this.CssClasses_.RADIO_BTN);i.getAttribute("name")===this.btnElement_.getAttribute("name")&&s[t].MaterialRadio.updateClasses_()}},h.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},h.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},h.prototype.onMouseup_=function(e){this.blur_()},h.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},h.prototype.blur_=function(e){window.setTimeout(function(){this.btnElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},h.prototype.checkDisabled=function(){this.btnElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},h.prototype.checkToggleState=function(){this.btnElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},h.prototype.disable=function(){this.btnElement_.disabled=!0,this.updateClasses_()},h.prototype.enable=function(){this.btnElement_.disabled=!1,this.updateClasses_()},h.prototype.check=function(){this.btnElement_.checked=!0,this.updateClasses_()},h.prototype.uncheck=function(){this.btnElement_.checked=!1,this.updateClasses_()},h.prototype.init=function(){if(this.element_){this.btnElement_=this.element_.querySelector("."+this.CssClasses_.RADIO_BTN);var e=document.createElement("span");e.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);var s=document.createElement("span");s.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE),this.element_.appendChild(e),this.element_.appendChild(s);var t;if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),t=document.createElement("span"),t.classList.add(this.CssClasses_.RIPPLE_CONTAINER),t.classList.add(this.CssClasses_.RIPPLE_EFFECT),t.classList.add(this.CssClasses_.RIPPLE_CENTER),t.addEventListener("mouseup",this.onMouseup_.bind(this));var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),t.appendChild(i),this.element_.appendChild(t)}this.btnElement_.addEventListener("change",this.onChange_.bind(this)),this.btnElement_.addEventListener("focus",this.onFocus_.bind(this)),this.btnElement_.addEventListener("blur",this.onBlur_.bind(this)),this.element_.addEventListener("mouseup",this.onMouseup_.bind(this)),this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},componentHandler.register({constructor:h,classAsString:"MaterialRadio",cssClass:"mdl-js-radio",widget:!0});var c=function(e){this.element_=e,this.isIE_=window.navigator.msPointerEnabled,this.init()};window.MaterialSlider=c,c.prototype.Constant_={},c.prototype.CssClasses_={IE_CONTAINER:"mdl-slider__ie-container",SLIDER_CONTAINER:"mdl-slider__container",BACKGROUND_FLEX:"mdl-slider__background-flex",BACKGROUND_LOWER:"mdl-slider__background-lower",BACKGROUND_UPPER:"mdl-slider__background-upper",IS_LOWEST_VALUE:"is-lowest-value",IS_UPGRADED:"is-upgraded"},c.prototype.onInput_=function(e){this.updateValueStyles_()},c.prototype.onChange_=function(e){this.updateValueStyles_()},c.prototype.onMouseUp_=function(e){e.target.blur()},c.prototype.onContainerMouseDown_=function(e){if(e.target===this.element_.parentElement){e.preventDefault();var s=new MouseEvent("mousedown",{target:e.target,buttons:e.buttons,clientX:e.clientX,clientY:this.element_.getBoundingClientRect().y});this.element_.dispatchEvent(s)}},c.prototype.updateValueStyles_=function(e){var s=(this.element_.value-this.element_.min)/(this.element_.max-this.element_.min);0===s?this.element_.classList.add(this.CssClasses_.IS_LOWEST_VALUE):this.element_.classList.remove(this.CssClasses_.IS_LOWEST_VALUE),this.isIE_||(this.backgroundLower_.style.flex=s,this.backgroundLower_.style.webkitFlex=s,this.backgroundUpper_.style.flex=1-s,this.backgroundUpper_.style.webkitFlex=1-s)},c.prototype.disable=function(){this.element_.disabled=!0},c.prototype.enable=function(){this.element_.disabled=!1},c.prototype.change=function(e){"undefined"!=typeof e&&(this.element_.value=e),this.updateValueStyles_()},c.prototype.init=function(){if(this.element_){if(this.isIE_){var e=document.createElement("div");e.classList.add(this.CssClasses_.IE_CONTAINER),this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_)}else{var s=document.createElement("div");s.classList.add(this.CssClasses_.SLIDER_CONTAINER),this.element_.parentElement.insertBefore(s,this.element_),this.element_.parentElement.removeChild(this.element_),s.appendChild(this.element_);var t=document.createElement("div");t.classList.add(this.CssClasses_.BACKGROUND_FLEX),s.appendChild(t),this.backgroundLower_=document.createElement("div"),this.backgroundLower_.classList.add(this.CssClasses_.BACKGROUND_LOWER),t.appendChild(this.backgroundLower_),this.backgroundUpper_=document.createElement("div"),this.backgroundUpper_.classList.add(this.CssClasses_.BACKGROUND_UPPER),t.appendChild(this.backgroundUpper_)}this.boundInputHandler=this.onInput_.bind(this),this.boundChangeHandler=this.onChange_.bind(this),this.boundMouseUpHandler=this.onMouseUp_.bind(this),this.boundContainerMouseDownHandler=this.onContainerMouseDown_.bind(this),this.element_.addEventListener("input",this.boundInputHandler),this.element_.addEventListener("change",this.boundChangeHandler),this.element_.addEventListener("mouseup",this.boundMouseUpHandler),this.element_.parentElement.addEventListener("mousedown",this.boundContainerMouseDownHandler),this.updateValueStyles_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},c.prototype.mdlDowngrade_=function(){this.element_.removeEventListener("input",this.boundInputHandler),this.element_.removeEventListener("change",this.boundChangeHandler),this.element_.removeEventListener("mouseup",this.boundMouseUpHandler),this.element_.parentElement.removeEventListener("mousedown",this.boundContainerMouseDownHandler)},componentHandler.register({constructor:c,classAsString:"MaterialSlider",cssClass:"mdl-js-slider",widget:!0});var p=function(e){this.element_=e,this.init()};window.MaterialSpinner=p,p.prototype.Constant_={MDL_SPINNER_LAYER_COUNT:4},p.prototype.CssClasses_={MDL_SPINNER_LAYER:"mdl-spinner__layer",MDL_SPINNER_CIRCLE_CLIPPER:"mdl-spinner__circle-clipper",MDL_SPINNER_CIRCLE:"mdl-spinner__circle",MDL_SPINNER_GAP_PATCH:"mdl-spinner__gap-patch",MDL_SPINNER_LEFT:"mdl-spinner__left",MDL_SPINNER_RIGHT:"mdl-spinner__right"},p.prototype.createLayer=function(e){var s=document.createElement("div");s.classList.add(this.CssClasses_.MDL_SPINNER_LAYER),s.classList.add(this.CssClasses_.MDL_SPINNER_LAYER+"-"+e);var t=document.createElement("div");t.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),t.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);var i=document.createElement("div");i.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);var n=document.createElement("div");n.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),n.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);for(var a=[t,i,n],l=0;l<a.length;l++){var o=document.createElement("div");o.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE),a[l].appendChild(o)}s.appendChild(t),s.appendChild(i),s.appendChild(n),this.element_.appendChild(s)},p.prototype.stop=function(){this.element_.classList.remove("is-active")},p.prototype.start=function(){this.element_.classList.add("is-active")},p.prototype.init=function(){if(this.element_){for(var e=1;e<=this.Constant_.MDL_SPINNER_LAYER_COUNT;e++)this.createLayer(e);this.element_.classList.add("is-upgraded");

}},componentHandler.register({constructor:p,classAsString:"MaterialSpinner",cssClass:"mdl-js-spinner",widget:!0});var u=function(e){this.element_=e,this.init()};window.MaterialSwitch=u,u.prototype.Constant_={TINY_TIMEOUT:.001},u.prototype.CssClasses_={INPUT:"mdl-switch__input",TRACK:"mdl-switch__track",THUMB:"mdl-switch__thumb",FOCUS_HELPER:"mdl-switch__focus-helper",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-switch__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked"},u.prototype.onChange_=function(e){this.updateClasses_()},u.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},u.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},u.prototype.onMouseUp_=function(e){this.blur_()},u.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},u.prototype.blur_=function(e){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},u.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},u.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},u.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},u.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},u.prototype.on=function(){this.inputElement_.checked=!0,this.updateClasses_()},u.prototype.off=function(){this.inputElement_.checked=!1,this.updateClasses_()},u.prototype.init=function(){if(this.element_){this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT);var e=document.createElement("div");e.classList.add(this.CssClasses_.TRACK);var s=document.createElement("div");s.classList.add(this.CssClasses_.THUMB);var t=document.createElement("span");if(t.classList.add(this.CssClasses_.FOCUS_HELPER),s.appendChild(t),this.element_.appendChild(e),this.element_.appendChild(s),this.boundMouseUpHandler=this.onMouseUp_.bind(this),this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.rippleContainerElement_.addEventListener("mouseup",this.boundMouseUpHandler);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(i),this.element_.appendChild(this.rippleContainerElement_)}this.boundChangeHandler=this.onChange_.bind(this),this.boundFocusHandler=this.onFocus_.bind(this),this.boundBlurHandler=this.onBlur_.bind(this),this.inputElement_.addEventListener("change",this.boundChangeHandler),this.inputElement_.addEventListener("focus",this.boundFocusHandler),this.inputElement_.addEventListener("blur",this.boundBlurHandler),this.element_.addEventListener("mouseup",this.boundMouseUpHandler),this.updateClasses_(),this.element_.classList.add("is-upgraded")}},u.prototype.mdlDowngrade_=function(){this.rippleContainerElement_&&this.rippleContainerElement_.removeEventListener("mouseup",this.boundMouseUpHandler),this.inputElement_.removeEventListener("change",this.boundChangeHandler),this.inputElement_.removeEventListener("focus",this.boundFocusHandler),this.inputElement_.removeEventListener("blur",this.boundBlurHandler),this.element_.removeEventListener("mouseup",this.boundMouseUpHandler)},componentHandler.register({constructor:u,classAsString:"MaterialSwitch",cssClass:"mdl-js-switch",widget:!0});var C=function(e){this.element_=e,this.init()};window.MaterialTabs=C,C.prototype.Constant_={},C.prototype.CssClasses_={TAB_CLASS:"mdl-tabs__tab",PANEL_CLASS:"mdl-tabs__panel",ACTIVE_CLASS:"is-active",UPGRADED_CLASS:"is-upgraded",MDL_JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",MDL_RIPPLE_CONTAINER:"mdl-tabs__ripple-container",MDL_RIPPLE:"mdl-ripple",MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events"},C.prototype.initTabs_=function(){this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT)&&this.element_.classList.add(this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS),this.tabs_=this.element_.querySelectorAll("."+this.CssClasses_.TAB_CLASS),this.panels_=this.element_.querySelectorAll("."+this.CssClasses_.PANEL_CLASS);for(var s=0;s<this.tabs_.length;s++)new e(this.tabs_[s],this);this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS)},C.prototype.resetTabState_=function(){for(var e=0;e<this.tabs_.length;e++)this.tabs_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)},C.prototype.resetPanelState_=function(){for(var e=0;e<this.panels_.length;e++)this.panels_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)},C.prototype.init=function(){this.element_&&this.initTabs_()},componentHandler.register({constructor:C,classAsString:"MaterialTabs",cssClass:"mdl-js-tabs"});var m=function(e){this.element_=e,this.maxRows=this.Constant_.NO_MAX_ROWS,this.init()};window.MaterialTextfield=m,m.prototype.Constant_={NO_MAX_ROWS:-1,MAX_ROWS_ATTRIBUTE:"maxrows"},m.prototype.CssClasses_={LABEL:"mdl-textfield__label",INPUT:"mdl-textfield__input",IS_DIRTY:"is-dirty",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_INVALID:"is-invalid",IS_UPGRADED:"is-upgraded"},m.prototype.onKeyDown_=function(e){var s=e.target.value.split("\n").length;13===e.keyCode&&s>=this.maxRows&&e.preventDefault()},m.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},m.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},m.prototype.updateClasses_=function(){this.checkDisabled(),this.checkValidity(),this.checkDirty()},m.prototype.checkDisabled=function(){this.input_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},m.prototype.checkValidity=function(){this.input_.validity.valid?this.element_.classList.remove(this.CssClasses_.IS_INVALID):this.element_.classList.add(this.CssClasses_.IS_INVALID)},m.prototype.checkDirty=function(){this.input_.value&&this.input_.value.length>0?this.element_.classList.add(this.CssClasses_.IS_DIRTY):this.element_.classList.remove(this.CssClasses_.IS_DIRTY)},m.prototype.disable=function(){this.input_.disabled=!0,this.updateClasses_()},m.prototype.enable=function(){this.input_.disabled=!1,this.updateClasses_()},m.prototype.change=function(e){e&&(this.input_.value=e),this.updateClasses_()},m.prototype.init=function(){this.element_&&(this.label_=this.element_.querySelector("."+this.CssClasses_.LABEL),this.input_=this.element_.querySelector("."+this.CssClasses_.INPUT),this.input_&&(this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)&&(this.maxRows=parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE),10),isNaN(this.maxRows)&&(this.maxRows=this.Constant_.NO_MAX_ROWS)),this.boundUpdateClassesHandler=this.updateClasses_.bind(this),this.boundFocusHandler=this.onFocus_.bind(this),this.boundBlurHandler=this.onBlur_.bind(this),this.input_.addEventListener("input",this.boundUpdateClassesHandler),this.input_.addEventListener("focus",this.boundFocusHandler),this.input_.addEventListener("blur",this.boundBlurHandler),this.maxRows!==this.Constant_.NO_MAX_ROWS&&(this.boundKeyDownHandler=this.onKeyDown_.bind(this),this.input_.addEventListener("keydown",this.boundKeyDownHandler)),this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)))},m.prototype.mdlDowngrade_=function(){this.input_.removeEventListener("input",this.boundUpdateClassesHandler),this.input_.removeEventListener("focus",this.boundFocusHandler),this.input_.removeEventListener("blur",this.boundBlurHandler),this.boundKeyDownHandler&&this.input_.removeEventListener("keydown",this.boundKeyDownHandler)},componentHandler.register({constructor:m,classAsString:"MaterialTextfield",cssClass:"mdl-js-textfield",widget:!0});var E=function(e){this.element_=e,this.init()};window.MaterialTooltip=E,E.prototype.Constant_={},E.prototype.CssClasses_={IS_ACTIVE:"is-active"},E.prototype.handleMouseEnter_=function(e){e.stopPropagation();var s=e.target.getBoundingClientRect(),t=s.left+s.width/2,i=-1*(this.element_.offsetWidth/2);0>t+i?(this.element_.style.left=0,this.element_.style.marginLeft=0):(this.element_.style.left=t+"px",this.element_.style.marginLeft=i+"px"),this.element_.style.top=s.top+s.height+10+"px",this.element_.classList.add(this.CssClasses_.IS_ACTIVE),window.addEventListener("scroll",this.boundMouseLeaveHandler,!1),window.addEventListener("touchmove",this.boundMouseLeaveHandler,!1)},E.prototype.handleMouseLeave_=function(e){e.stopPropagation(),this.element_.classList.remove(this.CssClasses_.IS_ACTIVE),window.removeEventListener("scroll",this.boundMouseLeaveHandler),window.removeEventListener("touchmove",this.boundMouseLeaveHandler,!1)},E.prototype.init=function(){if(this.element_){var e=this.element_.getAttribute("for");e&&(this.forElement_=document.getElementById(e)),this.forElement_&&(this.forElement_.getAttribute("tabindex")||this.forElement_.setAttribute("tabindex","0"),this.boundMouseEnterHandler=this.handleMouseEnter_.bind(this),this.boundMouseLeaveHandler=this.handleMouseLeave_.bind(this),this.forElement_.addEventListener("mouseenter",this.boundMouseEnterHandler,!1),this.forElement_.addEventListener("click",this.boundMouseEnterHandler,!1),this.forElement_.addEventListener("blur",this.boundMouseLeaveHandler),this.forElement_.addEventListener("touchstart",this.boundMouseEnterHandler,!1),this.forElement_.addEventListener("mouseleave",this.boundMouseLeaveHandler))}},E.prototype.mdlDowngrade_=function(){this.forElement_&&(this.forElement_.removeEventListener("mouseenter",this.boundMouseEnterHandler,!1),this.forElement_.removeEventListener("click",this.boundMouseEnterHandler,!1),this.forElement_.removeEventListener("touchstart",this.boundMouseEnterHandler,!1),this.forElement_.removeEventListener("mouseleave",this.boundMouseLeaveHandler))},componentHandler.register({constructor:E,classAsString:"MaterialTooltip",cssClass:"mdl-tooltip"});var L=function(e){this.element_=e,this.init()};window.MaterialLayout=L,L.prototype.Constant_={MAX_WIDTH:"(max-width: 1024px)",TAB_SCROLL_PIXELS:100,MENU_ICON:"menu",CHEVRON_LEFT:"chevron_left",CHEVRON_RIGHT:"chevron_right"},L.prototype.Mode_={STANDARD:0,SEAMED:1,WATERFALL:2,SCROLL:3},L.prototype.CssClasses_={CONTAINER:"mdl-layout__container",HEADER:"mdl-layout__header",DRAWER:"mdl-layout__drawer",CONTENT:"mdl-layout__content",DRAWER_BTN:"mdl-layout__drawer-button",ICON:"material-icons",JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_CONTAINER:"mdl-layout__tab-ripple-container",RIPPLE:"mdl-ripple",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",HEADER_SEAMED:"mdl-layout__header--seamed",HEADER_WATERFALL:"mdl-layout__header--waterfall",HEADER_SCROLL:"mdl-layout__header--scroll",FIXED_HEADER:"mdl-layout--fixed-header",OBFUSCATOR:"mdl-layout__obfuscator",TAB_BAR:"mdl-layout__tab-bar",TAB_CONTAINER:"mdl-layout__tab-bar-container",TAB:"mdl-layout__tab",TAB_BAR_BUTTON:"mdl-layout__tab-bar-button",TAB_BAR_LEFT_BUTTON:"mdl-layout__tab-bar-left-button",TAB_BAR_RIGHT_BUTTON:"mdl-layout__tab-bar-right-button",PANEL:"mdl-layout__tab-panel",HAS_DRAWER:"has-drawer",HAS_TABS:"has-tabs",HAS_SCROLLING_HEADER:"has-scrolling-header",CASTING_SHADOW:"is-casting-shadow",IS_COMPACT:"is-compact",IS_SMALL_SCREEN:"is-small-screen",IS_DRAWER_OPEN:"is-visible",IS_ACTIVE:"is-active",IS_UPGRADED:"is-upgraded",IS_ANIMATING:"is-animating",ON_LARGE_SCREEN:"mdl-layout--large-screen-only",ON_SMALL_SCREEN:"mdl-layout--small-screen-only"},L.prototype.contentScrollHandler_=function(){this.header_.classList.contains(this.CssClasses_.IS_ANIMATING)||(this.content_.scrollTop>0&&!this.header_.classList.contains(this.CssClasses_.IS_COMPACT)?(this.header_.classList.add(this.CssClasses_.CASTING_SHADOW),this.header_.classList.add(this.CssClasses_.IS_COMPACT),this.header_.classList.add(this.CssClasses_.IS_ANIMATING)):this.content_.scrollTop<=0&&this.header_.classList.contains(this.CssClasses_.IS_COMPACT)&&(this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW),this.header_.classList.remove(this.CssClasses_.IS_COMPACT),this.header_.classList.add(this.CssClasses_.IS_ANIMATING)))},L.prototype.screenSizeHandler_=function(){this.screenSizeMediaQuery_.matches?this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN):(this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN),this.drawer_&&this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN))},L.prototype.drawerToggleHandler_=function(){this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN)},L.prototype.headerTransitionEndHandler_=function(){this.header_.classList.remove(this.CssClasses_.IS_ANIMATING)},L.prototype.headerClickHandler_=function(){this.header_.classList.contains(this.CssClasses_.IS_COMPACT)&&(this.header_.classList.remove(this.CssClasses_.IS_COMPACT),this.header_.classList.add(this.CssClasses_.IS_ANIMATING))},L.prototype.resetTabState_=function(e){for(var s=0;s<e.length;s++)e[s].classList.remove(this.CssClasses_.IS_ACTIVE)},L.prototype.resetPanelState_=function(e){for(var s=0;s<e.length;s++)e[s].classList.remove(this.CssClasses_.IS_ACTIVE)},L.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.classList.add(this.CssClasses_.CONTAINER),this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_);for(var t=this.element_.childNodes,i=0;i<t.length;i++){var n=t[i];n.classList&&n.classList.contains(this.CssClasses_.HEADER)&&(this.header_=n),n.classList&&n.classList.contains(this.CssClasses_.DRAWER)&&(this.drawer_=n),n.classList&&n.classList.contains(this.CssClasses_.CONTENT)&&(this.content_=n)}this.header_&&(this.tabBar_=this.header_.querySelector("."+this.CssClasses_.TAB_BAR));var a=this.Mode_.STANDARD;this.screenSizeMediaQuery_=window.matchMedia(this.Constant_.MAX_WIDTH),this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this)),this.screenSizeHandler_(),this.header_&&(this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED)?a=this.Mode_.SEAMED:this.header_.classList.contains(this.CssClasses_.HEADER_WATERFALL)?(a=this.Mode_.WATERFALL,this.header_.addEventListener("transitionend",this.headerTransitionEndHandler_.bind(this)),this.header_.addEventListener("click",this.headerClickHandler_.bind(this))):this.header_.classList.contains(this.CssClasses_.HEADER_SCROLL)&&(a=this.Mode_.SCROLL,e.classList.add(this.CssClasses_.HAS_SCROLLING_HEADER)),a===this.Mode_.STANDARD?(this.header_.classList.add(this.CssClasses_.CASTING_SHADOW),this.tabBar_&&this.tabBar_.classList.add(this.CssClasses_.CASTING_SHADOW)):a===this.Mode_.SEAMED||a===this.Mode_.SCROLL?(this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW),this.tabBar_&&this.tabBar_.classList.remove(this.CssClasses_.CASTING_SHADOW)):a===this.Mode_.WATERFALL&&(this.content_.addEventListener("scroll",this.contentScrollHandler_.bind(this)),this.contentScrollHandler_()));var l=function(e){e.preventDefault()};if(this.drawer_){var o=document.createElement("div");o.classList.add(this.CssClasses_.DRAWER_BTN),this.drawer_.classList.contains(this.CssClasses_.ON_LARGE_SCREEN)?o.classList.add(this.CssClasses_.ON_LARGE_SCREEN):this.drawer_.classList.contains(this.CssClasses_.ON_SMALL_SCREEN)&&o.classList.add(this.CssClasses_.ON_SMALL_SCREEN);var r=document.createElement("i");r.classList.add(this.CssClasses_.ICON),r.textContent=this.Constant_.MENU_ICON,o.appendChild(r),o.addEventListener("click",this.drawerToggleHandler_.bind(this)),this.element_.classList.add(this.CssClasses_.HAS_DRAWER),this.drawer_.addEventListener("mousewheel",l),this.element_.classList.contains(this.CssClasses_.FIXED_HEADER)?this.header_.insertBefore(o,this.header_.firstChild):this.element_.insertBefore(o,this.content_);var _=document.createElement("div");_.classList.add(this.CssClasses_.OBFUSCATOR),this.element_.appendChild(_),_.addEventListener("click",this.drawerToggleHandler_.bind(this)),_.addEventListener("mousewheel",l)}if(this.header_&&this.tabBar_){this.element_.classList.add(this.CssClasses_.HAS_TABS);var d=document.createElement("div");d.classList.add(this.CssClasses_.TAB_CONTAINER),this.header_.insertBefore(d,this.tabBar_),this.header_.removeChild(this.tabBar_);var h=document.createElement("div");h.classList.add(this.CssClasses_.TAB_BAR_BUTTON),h.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);var c=document.createElement("i");c.classList.add(this.CssClasses_.ICON),c.textContent=this.Constant_.CHEVRON_LEFT,h.appendChild(c),h.addEventListener("click",function(){this.tabBar_.scrollLeft-=this.Constant_.TAB_SCROLL_PIXELS}.bind(this));var p=document.createElement("div");p.classList.add(this.CssClasses_.TAB_BAR_BUTTON),p.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);var u=document.createElement("i");u.classList.add(this.CssClasses_.ICON),u.textContent=this.Constant_.CHEVRON_RIGHT,p.appendChild(u),p.addEventListener("click",function(){this.tabBar_.scrollLeft+=this.Constant_.TAB_SCROLL_PIXELS}.bind(this)),d.appendChild(h),d.appendChild(this.tabBar_),d.appendChild(p);var C=function(){this.tabBar_.scrollLeft>0?h.classList.add(this.CssClasses_.IS_ACTIVE):h.classList.remove(this.CssClasses_.IS_ACTIVE),this.tabBar_.scrollLeft<this.tabBar_.scrollWidth-this.tabBar_.offsetWidth?p.classList.add(this.CssClasses_.IS_ACTIVE):p.classList.remove(this.CssClasses_.IS_ACTIVE)}.bind(this);this.tabBar_.addEventListener("scroll",C),C(),this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)&&this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);for(var m=this.tabBar_.querySelectorAll("."+this.CssClasses_.TAB),E=this.content_.querySelectorAll("."+this.CssClasses_.PANEL),L=0;L<m.length;L++)new s(m[L],m,E,this)}this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},componentHandler.register({constructor:L,classAsString:"MaterialLayout",cssClass:"mdl-js-layout"});var I=function(e){this.element_=e,this.init()};window.MaterialDataTable=I,I.prototype.Constant_={},I.prototype.CssClasses_={DATA_TABLE:"mdl-data-table",SELECTABLE:"mdl-data-table--selectable",IS_SELECTED:"is-selected",IS_UPGRADED:"is-upgraded"},I.prototype.selectRow_=function(e,s,t){return s?function(){e.checked?s.classList.add(this.CssClasses_.IS_SELECTED):s.classList.remove(this.CssClasses_.IS_SELECTED)}.bind(this):t?function(){var s,i;if(e.checked)for(s=0;s<t.length;s++)i=t[s].querySelector("td").querySelector(".mdl-checkbox"),i.MaterialCheckbox.check(),t[s].classList.add(this.CssClasses_.IS_SELECTED);else for(s=0;s<t.length;s++)i=t[s].querySelector("td").querySelector(".mdl-checkbox"),i.MaterialCheckbox.uncheck(),t[s].classList.remove(this.CssClasses_.IS_SELECTED)}.bind(this):void 0},I.prototype.createCheckbox_=function(e,s){var t=document.createElement("label");t.classList.add("mdl-checkbox"),t.classList.add("mdl-js-checkbox"),t.classList.add("mdl-js-ripple-effect"),t.classList.add("mdl-data-table__select");var i=document.createElement("input");return i.type="checkbox",i.classList.add("mdl-checkbox__input"),e?i.addEventListener("change",this.selectRow_(i,e)):s&&i.addEventListener("change",this.selectRow_(i,null,s)),t.appendChild(i),componentHandler.upgradeElement(t,"MaterialCheckbox"),t},I.prototype.init=function(){if(this.element_){var e=this.element_.querySelector("th"),s=this.element_.querySelector("tbody").querySelectorAll("tr");if(this.element_.classList.contains(this.CssClasses_.SELECTABLE)){var t=document.createElement("th"),i=this.createCheckbox_(null,s);t.appendChild(i),e.parentElement.insertBefore(t,e);for(var n=0;n<s.length;n++){var a=s[n].querySelector("td");if(a){var l=document.createElement("td"),o=this.createCheckbox_(s[n]);l.appendChild(o),s[n].insertBefore(l,a)}}}this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},componentHandler.register({constructor:I,classAsString:"MaterialDataTable",cssClass:"mdl-js-data-table"});var f=function(e){this.element_=e,this.init()};window.MaterialRipple=f,f.prototype.Constant_={INITIAL_SCALE:"scale(0.0001, 0.0001)",INITIAL_SIZE:"1px",INITIAL_OPACITY:"0.4",FINAL_OPACITY:"0",FINAL_SCALE:""},f.prototype.CssClasses_={RIPPLE_CENTER:"mdl-ripple--center",RIPPLE_EFFECT_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE:"mdl-ripple",IS_ANIMATING:"is-animating",IS_VISIBLE:"is-visible"},f.prototype.downHandler_=function(e){if(!this.rippleElement_.style.width&&!this.rippleElement_.style.height){var s=this.element_.getBoundingClientRect();this.boundHeight=s.height,this.boundWidth=s.width,this.rippleSize_=2*Math.sqrt(s.width*s.width+s.height*s.height)+2,this.rippleElement_.style.width=this.rippleSize_+"px",this.rippleElement_.style.height=this.rippleSize_+"px"}if(this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE),"mousedown"===e.type&&this.ignoringMouseDown_)this.ignoringMouseDown_=!1;else{"touchstart"===e.type&&(this.ignoringMouseDown_=!0);var t=this.getFrameCount();if(t>0)return;this.setFrameCount(1);var i,n,a=e.currentTarget.getBoundingClientRect();if(0===e.clientX&&0===e.clientY)i=Math.round(a.width/2),n=Math.round(a.height/2);else{var l=e.clientX?e.clientX:e.touches[0].clientX,o=e.clientY?e.clientY:e.touches[0].clientY;i=Math.round(l-a.left),n=Math.round(o-a.top)}this.setRippleXY(i,n),this.setRippleStyles(!0),window.requestAnimationFrame(this.animFrameHandler.bind(this))}},f.prototype.upHandler_=function(e){e&&2!==e.detail&&this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE),window.setTimeout(function(){this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE)}.bind(this),0)},f.prototype.init=function(){if(this.element_){var e=this.element_.classList.contains(this.CssClasses_.RIPPLE_CENTER);this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS)||(this.rippleElement_=this.element_.querySelector("."+this.CssClasses_.RIPPLE),this.frameCount_=0,this.rippleSize_=0,this.x_=0,this.y_=0,this.ignoringMouseDown_=!1,this.boundDownHandler=this.downHandler_.bind(this),this.element_.addEventListener("mousedown",this.boundDownHandler),this.element_.addEventListener("touchstart",this.boundDownHandler),this.boundUpHandler=this.upHandler_.bind(this),this.element_.addEventListener("mouseup",this.boundUpHandler),this.element_.addEventListener("mouseleave",this.boundUpHandler),this.element_.addEventListener("touchend",this.boundUpHandler),this.element_.addEventListener("blur",this.boundUpHandler),this.getFrameCount=function(){return this.frameCount_},this.setFrameCount=function(e){this.frameCount_=e},this.getRippleElement=function(){return this.rippleElement_},this.setRippleXY=function(e,s){this.x_=e,this.y_=s},this.setRippleStyles=function(s){if(null!==this.rippleElement_){var t,i,n,a="translate("+this.x_+"px, "+this.y_+"px)";s?(i=this.Constant_.INITIAL_SCALE,n=this.Constant_.INITIAL_SIZE):(i=this.Constant_.FINAL_SCALE,n=this.rippleSize_+"px",e&&(a="translate("+this.boundWidth/2+"px, "+this.boundHeight/2+"px)")),t="translate(-50%, -50%) "+a+i,this.rippleElement_.style.webkitTransform=t,this.rippleElement_.style.msTransform=t,this.rippleElement_.style.transform=t,s?this.rippleElement_.classList.remove(this.CssClasses_.IS_ANIMATING):this.rippleElement_.classList.add(this.CssClasses_.IS_ANIMATING)}},this.animFrameHandler=function(){this.frameCount_-->0?window.requestAnimationFrame(this.animFrameHandler.bind(this)):this.setRippleStyles(!1)})}},f.prototype.mdlDowngrade_=function(){this.element_.removeEventListener("mousedown",this.boundDownHandler),this.element_.removeEventListener("touchstart",this.boundDownHandler),this.element_.removeEventListener("mouseup",this.boundUpHandler),this.element_.removeEventListener("mouseleave",this.boundUpHandler),this.element_.removeEventListener("touchend",this.boundUpHandler),this.element_.removeEventListener("blur",this.boundUpHandler)},componentHandler.register({constructor:f,classAsString:"MaterialRipple",cssClass:"mdl-js-ripple-effect",widget:!1})}();
//# sourceMappingURL=material.min.js.map