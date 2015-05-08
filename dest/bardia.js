/* --------------------------------------------------------------------------
 *  All rights reserved
 * -------------------------------------------------------------------------- */
var UI = {
    version: 1.0,
    uploadAction: "http://localhost:8080/scheduler/file.upload",
    DATE_FORMAT: "yyyy-MM-ddTHH:mm:ss.SSSZ",
    DATE_YYYMMMDDD_FORMAT: "yyyy-MM-dd",
    
    VISIBLE: 1,
    READONLY: 2,
    HIDDEN: 4
}

UI.play = function(html, config) {
	html.animate(config, {
		direction: 'normal',
	    duration: 1000,
	    easing: "ease",
		iterations: 1,
		fill: "both"
	});
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
	/**
	 * 
	 */
	initialize: function(config) {
        this.config = Object.extend({
        }, config || {});
	},
	/**
	 * 
	 */
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

/**
 * 
 */
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

/**
 * 
 */
UI.Resources = Class.create({
    /*
     * 
     */
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
    /*
     * 
     */
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
/**
 * @class UI.IconSet
 */
UI.IconSet = Class.create({
	/**
	 * 
	 */
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
    /**
     * 
     */
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
 * @class SPR.MaterialComponent
 */
UI.MaterialComponent = Class.create({
	/**
	 * 
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
    /**
     * 
     */
    initConfig: function(config) {
    	alert("initConfig() not implemeted");
    },
    /**
     * 
     */
    renderMaterial: function() {    	
    	var h = this;
    	
			h.material = new Element("DIV", {class: "inside"});
			h.config.inside.insert(h.material);
			
	    	h.material.on("mousedown", function(e) {
				//e.cancelBubble = true;
				e.returnValue = false;
			});
			
	    	h.material.on("click", function(e) {
				//e.cancelBubble = true;
				e.returnValue = false;
			});
    },
    /**
     * 
     */
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
 * @class UI.Panel
 */
UI.Panel = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
    initConfig: function(config) {
        this.config = Object.extend({
        	className: "bg_main fg_white"
        }, config || {});
    },
    /**
     * 
     */
    render: function() {
        var h = this;

    	this.content = new UI.Content({
    		inside: h.getMaterial()
    	});
        
    	this.header = new UI.Header({
    		inside: h.getMaterial(),
    		title: h.config.title,
    		className: h.config.className
    	});
    },
    /**
     * 
     */
    getContent: function() {
    	return this.content.getMaterial();
    }
});

/**
*
*/
UI.DateUtils = Class.create({
   /**
    *  
    */
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
   /**
    *
    */
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
   formatNumberToTime: function(num) {
       var hours = (num - (num % 60)) / 60;
       var minutes = num % 60;

       return this.formatNumber(hours, 2) + ":" + this.formatNumber(minutes, 2);
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
       if(date === undefined || date ==""){
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
   /**
    * 
    */
   convertIntToTime: function(intValue) {
	   var result = "00:00";
	       try {
	    	   this.formatNumber(((intValue - intValue % 60) / 60), 2) + ":" + this.formatNumber((intValue % 60), 2)
	       } catch (e) {
	    	   
	       }
	   return result;
   }
});
/**
 * 
 */
UI.Fab = Class.create({
	/*
	 *  
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            top: "",
            left: 10,
            right: "",
            width: 40,
            height: 40,
            bottom: "",
            fill: "orange",
            icon: "help",
            zHeight: 8,
            title: "Insert title here ..."
        }, config || {});

        this.render();
    },
    /*
     * 
     */
    render: function() {
    	var h = this;
    	
    	h.material = new Element("DIV", {
    		"style": "box-shadow: 3px 3px " + h.config.zHeight + "px #666666; position:absolute; padding:0px; font-size:" + h.config.height + "px; color:white; text-align:center; line-height:" + h.config.height + "px; border-radius:50%; position:absolute; top:" + h.config.top + "px; left:" + h.config.left + "px; right:" + h.config.right + "px; height:" + h.config.height + "px; width:" + h.config.width + "px; background-color:" + h.config.fill + "; bottom: " + h.config.bottom + "px; overflow:hidden",
    		"title": h.config.title
    	});
    	
    	h.material.on("mousedown", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
    	h.material.on("click", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});

    	if (h.config.icon !== undefined) {
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
 * 
 */
UI.FabProgress = Class.create({
	/**
	 * 
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            scale: 2
        }, config || {});

        this.render();
    },
    /**
     * 
     */
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
    /**
     * 
     */
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
 * @class UI.Material
 *  
 * Jest to kontener na różne moduły
 * Za pomocą metod show i hide animujemy pokazywanie i chowanie
 */
UI.Material = Class.create({
	/**
	 * 
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
				style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; opacity:0; display:none",
				class: "bg_main"
			});
			h.config.inside.insert(h.curtain);
    	}

    	h.material = new Element("DIV", {
    		style: "position:absolute; overflow:hidden; background-color:white; " + h.config.position,
    		"class": "default_shadow"
    	});
    	
    	h.material.on("mousedown", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
    	h.material.on("click", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
    	
    	h.material.on("dblclick", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});

    	h.config.inside.insert(h.material);
    	
    	h.width = h.material.getBoundingClientRect().width;
    	h.height = h.material.getBoundingClientRect().height;
    	h.left = h.material.getBoundingClientRect().left - h.config.inside.getBoundingClientRect().left;
    	h.right = h.material.getBoundingClientRect().right;
    	h.bottom = parseInt(h.material.style.bottom);
    	h.top = h.material.getBoundingClientRect().top;
    	    	
    	h.parentWidth = h.config.inside.getBoundingClientRect().width;
    	
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
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
    	h.material.on("click", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});

    	h.config.inside.insert(h.material);
    },
    show: function() {
    	var h = this;
    	
    	h.curtainOn();
    	
    	var translateX = 0;
    	var translateY = 0;

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
		}
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
		
		if (h.curtain === undefined) {
			return;
		}

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
        	buttons: [],
        	rows: []
        }, config || {});
	},
	/*
	 *
	 */
	render: function() {
		var h = this;

		h.config.inside.on("mousedown", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
		h.config.inside.on("click", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
		h.config.inside.on("DOMMouseScroll", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});

		h.panel = new UI.Panel({
			inside: h.getMaterial(),
			title: h.config.title,
			className: "list_header"
		});

		h.rowsContent = new Element("DIV", {
			class: "list_content"
		});
		
		h.rowsFooter = new Element("DIV", {
			class: "list_footer"
		});
		
		h.listContent = new Element("DIV", {
			class: "list"
		});
				
		new UI.Form({
			inside: h.rowsFooter,
			fields: [
		         {
		        	 property: "search",
		        	 label: "Szukaj",
		        	 disableTab: true,
		        	 onChanging: function(v) {
		        		 var f = function() {
		        			 h.filter(v);	 
		        		 }
		        		 setTimeout(f, 0);
		        	 }
		         }
			]
		});
		
		h.listContent.insert(h.rowsContent);
		h.listContent.insert(h.rowsFooter);

		h.panel.getContent().update(h.listContent);

		this.rowsContent.on("click", "div.row", function(e, element) {
			if (h.config.onClick) {
				h.config.onClick(element);
			}
		});
		
		var b = 0;
		for (b=0; b < h.config.buttons.length; b++) {
			h.config.buttons[b].inside = h.getMaterial(); 
			h.config.buttons[b].top = 35;
			h.config.buttons[b].left = 10 + 50 * (b);
			
			var fab = new UI.Fab(h.config.buttons[b]);
		}
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
		h.rowsContent.update("");

		var i=0;
		for (i=0; i<h.config.rows.length; i++) {

			var row = new Element("DIV", {
				style: "overflow:hidden",
				class: "row"				// row to jest klasa fake
			});
			row.bean = h.config.rows[i];
						
			if (h.config.header !== undefined) {
				var _header = new Element("DIV", {
					style: "font-weight:bold; overflow:hidden"
				});
				_header.update(STRUTILS.compile(h.config.header, h.config.rows[i]));
				row.insert(_header);
			} else if (h.config.headerRenderer !== undefined) {
				var _header = new Element("DIV", {
					style: "font-weight:bold; overflow:hidden"
				});
				_header.update(h.config.headerRenderer(row, _header));
				row.insert(_header);				
			}

			if (h.config.footer !== undefined) {
				var _footer = new Element("DIV", {
					style: "overflow:hidden"
				});
				_footer.insert(STRUTILS.compile(h.config.footer, h.config.rows[i]));
				row.insert(_footer);
			} else if (h.config.footerRenderer !== undefined) {
				var _footer = new Element("DIV", {
					style: "overflow:hidden"
				});
				_footer.update(h.config.footerRenderer(row, _footer));
				row.insert(_footer);				
			}

			h.rowsContent.insert(row);
			
			var rr = row;

			if (h.config.removable === true) {
				new UI.Fab({
					inside: row,
					text: "",
					fill: "#ffffff",
					targetFill: "red",
					width: 18,
					height: 18,
					left: 21,
					top: 12,
					title: "Usuń",
					icon: "close",
					zHeight: 3,
					onClick: function(fab) {
						if (h.config.onRemove) {
							h.config.onRemove(fab.config.inside);
						}
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
		for (i=0; i<h.rowsContent.childElements().length; i++) {
			var child = h.rowsContent.childElements()[i];
			if (child.innerHTML.toLowerCase().indexOf(v.toLowerCase()) >= 0) {
				child.show();
			} else {
				child.hide();
			}
		}
	}
});
/**
 * Formularz
 * 
 * @class UI.Form
 * @constructor
 */
UI.Form = Class.create(UI.MaterialComponent, {
    /**
     * 
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

		h.formContent = new Element("DIV", {
			class: "form"
		});
		h.config.inside.update(h.formContent);
		
		var top = 60;
		var bottom = 60;
		
		if (h.config.title == undefined) {
			top = 0;
		}
		
		if (h.config.buttons == undefined) {
			bottom = 0;
		}

		h.fieldsContent = new Element("DIV", {
			class: "form_fields_content",
			style: "top:" + top + "px; bottom:" + bottom + "px"
		});
		h.formContent.insert(h.fieldsContent);

		if (h.config.title !== undefined) {
			h.formHeader = new Element("DIV", {
				class: "form_header bg_main fg_white"
			});
			h.formHeader.insert(h.config.title);
			h.formContent.insert(h.formHeader);
		}
        
		if (h.config.buttons !== undefined) {
			h.formFooter = new Element("DIV", {
				class: "form_footer"
			});
			h.formContent.insert(h.formFooter);
		}

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

    				h.fieldsContent.insert(field.getMaterial());
    		}
    	}

    	if (h.config.buttons !== undefined) {
	    	var i=0; 
	    	for (i=0; i<h.config.buttons.length; i++) {
	    		var fabConfig = h.config.buttons[i];
	    			fabConfig.inside = h.formContent;
	    			fabConfig.left = h.config.inside.getClientRects()[0].width - (60 * (i+1));
	    			fabConfig.top = h.config.inside.getClientRects()[0].height - 80;
	
	    		new UI.Fab(fabConfig);
	    	}
    	}
    },
    /**
     * 
     */
    setTitle: function(title) {
    	var h = this;
    		h.formHeader.update(title);
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
    	return result;
    }
});
/**
 * 
 * 
 * @class UI.TextFormField
 */
UI.TextFormField = Class.create({
	/**
	 * 
	 */
    initialize: function() {    	
    },
    /**
     * @method setConfig
     */
    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	mask: new Input(null)
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
				style: "position:relative; display:block; height:40px; width:100%; line-height:40px; background-color:transparent"
			});
    		
    		h.input = new Element("INPUT", {
    			type: "text",
    			style: "position:absolute; top:20px; left:10px; border:0px; background-color:transparent; color:#000000; width:" + h.config.width + "px"
    		});
    		h.input.on("focus", function() {
    			h.animateLabel();
    		});
    		    		    		
    		if (h.config.mask) {
    			var mask = new InputMask(h.config.mask, h.input)
    				mask.blurFunction = function() {
    					if (h.config.onChange !== undefined) {
    						h.config.onChange(h.getBeanValue());
    					}
            			if (h.isEmpty(h.input.value)) {
            				h.unanimateLabel()
            			}
    				}
	    			mask.keyUpFunction = function() {
	        			h.setBeanValue();

	        			if (h.config.onChanging !== undefined) {
	        				h.config.onChanging(h.getBeanValue());
	        			}    				
	    			}
    		} else {
        		h.input.on("blur", function(e) {
        			if (h.isEmpty(h.input.value)) {
        				h.unanimateLabel()
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
        			e.cancelBubble = true;
        		});
    		}
    		    		
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
    },
    /**
     * @method animateLabel
     */
    animateLabel: function() {
    	var h = this;
    	
		var player = h.label.animate([
		    {opacity: 1.0, transform: "translate(0px, 0px)", color:"#cdcdcf", fontSize: "14px"},
		    {opacity: 1.0, transform: "translate(0px, -18px)", color:"#999999", fontSize: "11px"},
		], {
			direction: 'normal',
		    duration: 200,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
    },
    /**
     * @method unanimateLabel
     */
    unanimateLabel: function() {
    	var h = this;
    	
		var player = h.label.animate([
  		    {opacity: 1.0, transform: "translate(0px, -18px)", color:"#cdcdcf", fontSize: "11px"},
		    {opacity: 1.0, transform: "translate(0px, 0px)", color:"#cdcdcf", fontSize: "14px"},
		], {
			direction: 'normal',
		    duration: 200,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
    },
    /**
     * @method getMaterial
     */
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
    }
});
/**
 * @class UI.LookupFormField
 */
UI.LookupFormField = Class.create(UI.TextFormField, {
	render: function() {
    	var h = this;
    	
		h.inside = new Element("DIV", {
			style: "position:relative; top:0px; height:40px; width:100%; line-height:20px;"
		});
		
		h.input = new Element("INPUT", {
			type: "text",
			readOnly: true,
			style: "position:absolute; top:20px; left:10px; border:0px; background-color:transparent; color:#000000; width:" + h.config.width + "px"
		});
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
		h.input.disabled = true;

		h.label = new Element("DIV", {
			style: "position:absolute; top:20px; left:10px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
		});
		h.label.insert(h.config.label);

    	h.underline = new Element("DIV", {
    		style: "position:absolute; top:40px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:" + h.config.width + "px"
    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.label);
		h.inside.insert(h.input);
		
		h.fab = new UI.Fab({
			inside: h.inside,
			width: 20,
			height: 20,
			left: h.config.width + 20,
			fill: "green",
			icon: "download",
			bottom: 8,
			onClick: function() {
				h.showLookupCard();
			}
		});
	},
	/**
	 * @method setInputValue
	 */
    setInputValue: function(bean) {
    	var h = this;
    	
    	if (bean !== undefined) {
    		h.animateLabel();
    		if (h.config.pattern !== undefined) {
    			h.input.value = STRUTILS.compile(h.config.pattern, bean);
    		} else if (h.config.patternRenderer !== undefined) {
    			h.input.value = h.config.patternRenderer(bean);
    		}
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },
    /**
     * 
     */
    setBeanValue: function(bean) {
    	var h = this;

    	eval("h.config.bean." + h.config.property + " = bean;");

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
     * 
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
			header: h.config.pattern,
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
    /**
     * 
     */
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
    /**
     * 
     */
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
    /**
     * 
     */
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
	/**
	 * 
	 */
    initialize: function(config) {    
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {}        	
        }, config || {});
    },
    /**
     * 
     */
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
    /**
     * 
     */
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
			width: 20,
			height: 20,
			left: h.config.width + 20,
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
	/**
	 * 
	 */
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
    /**
     * 
     */
    setBeanValue: function(bean) {
    	var h = this;
    	eval("h.config.bean." + h.config.property + " = bean;");
    },
    /**
     * 
     */
    showUploadFile: function() {
    	var h = this;    		
    }
});
/*
 * Lookup
 */
UI.DateFormField = Class.create(UI.LookupFormField, {
	render: function() {
    	var h = this;
    	
		h.inside = new Element("DIV", {
			style: "position:relative; display:block; height:40px; width:100%; line-height:40px; background-color:transparent"
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
				h.unanimateLabel()
			}
		});
		h.input.on("change", function(e) {
			if (h.config.onChange !== undefined) {
				h.config.onChange(h.getBeanValue());
			}
		});
		
		h.label = new Element("DIV", {
			style: "position:absolute; top:10px; left:10px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
		});
		h.label.insert(h.config.label);

    	h.underline = new Element("DIV", {
    		style: "position:absolute; top:40px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:120px"
    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.label);
		h.inside.insert(h.input);
		
		h.fab = new UI.Fab({
			inside: h.inside,
			width: 20,
			height: 20,
			left: 120 + 20,
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
     * 
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
		
		var calendarDiv = new Element("DIV", {
			style: "position:absolute; top:20px; left:50%; margin-left:-87px; width:175px; height:200px"
		});
		h.tmpFab.insert(calendarDiv);

		var fab = new UI.Fab({
			inside: h.tmpFab,
			bottom: 10,
			title: "Zamknij listę",
			fill: "red",
			icon: "cancel",
			onClick: function() {
				h.removeLookupCard();
			}
		});

		new UI.DatePicker({
			inside: calendarDiv,
			dateSelected: function(date) {
				h.setBeanValue(new UI.DateUtils().formatFullDate(date));
				h.setInputValue(new UI.DateUtils().formatFullDate(date));

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
    /**
     * 
     */
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
/**
 * @class UI.BooleanFormField
 */
UI.BooleanFormField = Class.create({
	/**
	 * 
	 */
    initialize: function(config) {    	
        this.config = Object.extend({
        	property: "$",
        	readOnly: false,
        	width: 200,
        	value: false
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
        	bean: {}
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
    			style: "position:relative; top:0px; height:40px; width:100%; line-height:20px;"
    		});
    		h.label = new Element("DIV", {
    			style: "position:absolute; top:20px; left:50px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
    		});
    		h.label.insert(h.config.label);
    		
    		h.falseFab = new UI.Fab({
    			inside: h.inside,
    			width: 20,
    			height: 20,
    			top: 20,
    			left: 20,
    			fill: "grey",
    			icon: "done",
    			bottom: 8,
    			onClick: function() {
    				h.switchOn();
    				h.setBeanValue(true);
    			}
    		});

    		h.trueFab = new UI.Fab({
    			inside: h.inside,
    			width: 20,
    			height: 20,
    			top: 20,
    			left: 20,
    			fill: "green",
    			icon: "done",
    			bottom: 8,
    			onClick: function() {
    				h.switchOff();
    				h.setBeanValue(false);
    			}
    		});
    		
    		if (this.config.value == false) {
	    		h.trueFab.getMaterial().setStyle({
	    			transform: "scale(0)"
	    		});
    		}

		h.inside.insert(h.label);
    },
    /**
     * @method setReadOnly
     */
    setReadOnly: function(readOnly) {
    	var h = this;
    	var ro = readOnly || false;
    },
    /**
     * @method animateLabel
     */
    switchOn: function() {
    	var h = this;
    	
		h.trueFab.getMaterial().animate([
		    {opacity: 0.0, transform: "scale(0)"},
		    {opacity: 1.0, transform: "scale(1)"},
		], {
			direction: 'normal',
		    duration: 500,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
		
		h.label.animate([
  		    {color: "#cdcdcf"},
  		    {color: "#999999"},
  		], {
  			direction: 'normal',
  		    duration: 500,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
		
		if (h.config.onChange) {
			h.config.onChange(true);
			h.setBeanValue(true);
		}
    },
    /**
     * @method unanimateLabel
     */
    switchOff: function() {
    	var h = this;
    	
		h.trueFab.getMaterial().animate([
		    {opacity: 1.0, transform: "scale(1)"},
		    {opacity: 0.0, transform: "scale(0)"},
		], {
			direction: 'normal',
		    duration: 500,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
		
		h.label.animate([
   		    {color: "#999999"},
   		    {color: "#cdcdcf"},
   		], {
   			direction: 'normal',
   		    duration: 500,
   		    easing: "ease",
   			iterations: 1,
   			fill: "both"
   		});
		
		if (h.config.onChange) {
			h.config.onChange(false);
			h.setBeanValue(false);
		}
    },
    /**
     * @method getMaterial
     */
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
    setBean: function(bean) {
    	var h = this;
    	h.config.bean = bean;
		h.setInputValue(h.getBeanValue());
    },
    getBeanValue: function() {
    	var h = this;
    	return eval("h.config.bean." + h.config.property);
    },
    setBeanValue: function(v) {
    	var h = this;
    	eval("h.config.bean." + h.config.property + " = " + v + "");
    },
    /**
     * @method setInputValue
     */
    setInputValue: function(val) {
    	if (val == true) {
    		this.switchOn();
    	} else {
    		this.switchOff();
    	}
    },
    /**
     * @method getInputValue
     */
    getInputValue: function() {

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
    }
});
UI.PasswordFormField = Class.create(UI.TextFormField, {
    /**
     * @method render
     */
    render: function() {
    	var h = this;
    	
    		h.inside = new Element("DIV", {
    			style: "position:relative; top:0px; height:40px; width:100%; line-height:20px;"
    		});

    		h.input = new Element("INPUT", {
    			type: "password",
    			style: "position:absolute; top:20px; left:10px; border:0px; background-color:transparent; color:#000000; width:" + h.config.width + "px"
    		});
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
    		h.input.on("keydown", function(e) {
    			e.cancelBubble = true;
    		});
    		
    		h.label = new Element("DIV", {
    			style: "position:absolute; top:20px; left:10px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
    		});
    		h.label.insert(h.config.label);

	    	h.underline = new Element("DIV", {
	    		style: "position:absolute; top:40px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:" + h.config.width + "px"
	    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.label);
		h.inside.insert(h.input);

		if (h.config.disableTab == true) {
			var fakeInput = new Element("INPUT", {
				style: "width:0px; border:0px; visible:false"
			});

			fakeInput.on("focus", function(e) {
				h.input.focus();
			});
			h.inside.insert(fakeInput);
		}
    }
});
/**
 * @class UI.BorderLayout
 */
UI.BorderLayout = Class.create(UI.MaterialComponent, {
	/**
	 * @method
	 */
	initConfig: function(config) {
        this.config = Object.extend({
        	items: []
        }, config || {});
	},
	/**
	 * @method 
	 */
    render: function() {
        
        var centerTop = 0;
        var centerBottom = 0;
        var centerLeft = 0;
        var centerRight = 0;
    
        if (this.config.north !== undefined) {
            var height = 50;

                if (this.config.north.height) {
                    height = this.config.north.height;
                } else {
                    this.config.north.height = height;
                }
                
                centerTop = this.config.north.height;

                this.north = document.createElement("DIV");
                    this.north.style = "position:absolute; overflow:hidden; top:0px; left:0px; right:0px; height:" + height + "px;";

            this.config.inside.appendChild(this.north);
        }
        
        if (this.config.south !== undefined) {
            var height = 50;
            
                if (this.config.south.height) {
                    height = this.config.south.height;
                } else {
                    this.config.south.height = height;
                }
                
                centerBottom = height;

                this.south = document.createElement("DIV");
                    this.south.style = "position:absolute; overflow:hidden; height:" + height + "px; left:0px; right:0px; bottom:0px;";
            
            this.config.inside.appendChild(this.south);
        }
        
        if (this.config.west !== undefined) {
            var width = 50;
                        
            if (this.config.west.width) {
                width = this.config.west.width;
            } else {
                this.config.west.width = width;
            }
            
            centerLeft = width;
            
            this.west = document.createElement("DIV");
                this.west.style = "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + width + "px; bottom:" + centerBottom + "px";

            this.config.inside.appendChild(this.west);
        }
        
        if (this.config.east !== undefined) {
            var width = 50;
                        
            if (this.config.east.width) {
                width = this.config.east.width;
            } else {
                this.config.east.width = width;
            }
            
            centerRight = width;
            
            this.east = document.createElement("DIV");
                this.east.style = "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + width + "px; bottom:" + centerBottom + "px";

            this.config.inside.appendChild(this.east);
        }

        this.center = document.createElement("DIV");
            this.center.style = "position:absolute; overflow:hidden; top:" + centerTop + "px; left:" + centerLeft + "px; right:" + centerRight + "px; bottom:" + centerBottom + "px";

        this.config.inside.appendChild(this.center);
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
/**
* This is the description for my class.
*
* @class UI.Crud
* @constructor
*/
UI.Crud = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
	initConfig: function(config) {
        this.config = Object.extend({
        }, config || {});
	},
	/**
	 * 
	 */
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
/*
 *
 */
UI.Menu = Class.create(UI.MaterialComponent, {
	/**
	 *
	 */
	initConfig: function(config) {
        this.config = Object.extend({
        	items: []
        }, config || {});
	},
	/**
	 *
	 */
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
	/*
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
/**
 * 
 */
UI.ProgressBar = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
    initConfig: function(config) {
        this.config = Object.extend({
        	orientation: "horizontal",
        	totalColor: "black",
        	doneColor: "green"
        }, config || {});
    },
    /**
     * 
     */
    render: function() {
        var h = this;

    	h.percentageInfo = new Element("DIV", {
    		style: "font-size:12px; position:absolute; top:50%; margin-top:-35px; right:10px; height:15px; color:" + h.config.totalColor
    	});
    	
    	h.label = new Element("DIV", {
    		style: "font-size:12px; position:absolute; top:50%; margin-top:-35px; left:10px; height:15px; color:" + h.config.totalColor
    	});
        
    	h.total = new Element("DIV", {
    		style: "position:absolute; top:50%; left:10px; margin-top:-5px; right:10px; height:10px; background-color:" + h.config.totalColor
    	});
    	
    	h.done = new Element("DIV", {
    		style: "position:absolute; top:50%; left:10px; margin-top:-5px; width:0px; height:10px; background-color:" + h.config.doneColor
    	});

    	h.getMaterial().insert(h.label);
    	h.getMaterial().insert(h.percentageInfo);
    	h.getMaterial().insert(h.total);
    	h.getMaterial().insert(h.done);
    },
    /**
     * 
     */
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
    	
		var player = h.done.animate([
 		    {
 		       width: (h.done.getBoundingClientRect().right - h.done.getBoundingClientRect().left) + "px"
 		    },
 		    {
  		       width: newWidth + "px"
 		    },
 		], {
 			direction: 'normal',
 		    duration: 3000,
 		    easing: "ease",
 			iterations: 1,
 			fill: "both"
		});
    },
    /**
     * 
     */
    setLabel: function(label) {
    	var h = this;
    	
    	h.label.update(label);;
    },
    /**
     * 
     */
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
    /**
     * 
     */
    finish: function() {
    	var h = this;	
    		if (h.config.onFinish) {
    			h.config.onFinish();
    		}
    }
});
/**
 *
 */
UI.Grid = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
	initConfig: function(config) {
        this.config = Object.extend({
        }, config || {});
	},
	/**
	 * 
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            title: "Insert title here ...",
            columns: [
                {
                	name: "",
                	width: 100
                }
            ],
            rows: [
            ]
        }, config || {});

        this.render();
    },
    /**
     * 
     */
    render: function() {
    	var h = this;
    		h.material = new Element("DIV", {
    			style: "position: absolute; top:0px; right:0px; bottom:0px; left:0px"
    		});
    		h.config.inside.insert(h.material);

    		h.rowsHeader = new Element("DIV", {
    			class: "grid_header bg_main"
    		});
    		h.material.insert(h.rowsHeader);
    		h.rowsHeader.insert(h.config.title);

    		h.columnsContent = new Element("DIV", {
    			class: "list_content",
    			style: "height:50px; top:56px; left:5px"
    		});
    		h.material.insert(h.columnsContent);
    		
    		h.rowsContent = new Element("DIV", {
    			class: "list_content",
    			style: "bottom:0px; top:110px; left:5px"
    		});
    		h.rowsContent.on("scroll", function(e) {
    			if (h.config.onScrollTop) {
    				h.config.onScrollTop(e.target.scrollTop);
    			}
    		});
    		h.material.insert(h.rowsContent);
    		
    		this.rowsContent.on("click", "div.row", function(e, element) {
    			if (h.config.onClick) {
    				h.config.onClick(element);
    			}
    		});
    		
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
     * @method fetch
     * 
     * Załadowanie grida wierszami z danymi
     */
    fetch: function(model) {
    	var h = this;

    	var rows = model.rows;

    	h.columnsContent.update();
    	h.rowsContent.update();

		var head = new Element("DIV", {
			style: "background-color:white; position:absolute; top:0px; right:0px; left:0px; height:30px; overflow:hidden; margin:0px; height:49px; line-height:48px; padding:0px; border:1px solid lightRey; border-width:0px 0px 1px 0px;",			
		});

		var k=0;
		for (k=0; k<h.config.columns.length; k++) {
			if (h.config.columns[k].width === undefined) {
				h.config.columns[k].width = 100;
			}

			var div = new Element("P", {
				style: "display:inline-block; overflow:hidden; line-height:47px; height:47px; font-size:14px; margin:0px; padding:0px; padding-left:4px; border:0px solid black; border-width:0px 0px 0px 0px; width:" + (h.config.columns[k].width) + "px",
				class: "bg_white fg_main grid_column_head"
			});

			div.update(h.config.columns[k].name);

			head.insert(div);
		}

		h.columnsContent.insert(head);

    	var i = 0;
    	for (i=0; i<rows.length; i++) {
    		var row = new Element("DIV", {
    			style: "display:block; overflow:hidden; height:25px; margin:0px; padding:0px; border:0px solid lightGrey; background-color:white; border-width:0px 0px 1px 0px; color:grey",
    			class: "row"
    		});

    		row.bean = rows[i];

    		for (k=0; k<h.config.columns.length; k++) {
    			var config = h.config.columns[k];

    			var cell = new Element("P", {
    				style: "opacity:0.7; display:inline-block; overflow:hidden; line-height:27px; height:27px; font-size:14px; margin:0px; padding:0px; padding-left:4px; border:0px solid #fcfcfc; border-width:0px 0px 1px 0px; width:" + (config.width) + "px",
    				class: "fg_main"
    			});

    			row.insert(cell);

    			if (config.render !== undefined) {
    				cell.update(config.render(row, cell));
    			} else {
    				cell.update(eval("rows[i]." + config.property));
    			}
    		}

    		h.rowsContent.insert(row);
    	}
    }
});
UI.IconToolbar = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
	initConfig : function(config) {
		this.config = Object.extend({}, config || {});
	},
	/**
	 * 
	 */
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
	/**
	 * 
	 */
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
	/**
	 * 
	 */
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
	
/**
 * 
 */
UI.BreadCrumb = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
    initConfig: function(config) {
        this.config = Object.extend({
        	orientation: "vertical"
        }, config || {});
    },
    /**
     * 
     */
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
    /**
     * 
     */
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
    			style: "padding-left:15px; font-size:16px; padding-right:15px; display:inline-block; border-right:1px solid #1E1D29; line-height:70px; height:70px; color:#525160; overflow:hidden"
    		});
    		item.bean = nextItem;
    		nextItem.divItem = item;
    		item.onClick = nextItem.onClick;

    		item.update(nextItem.name);
    		item.title = nextItem.description;

    		item.addEventListener("click", function(e) {
				setTimeout(function() {
					h.displayMarker(e.target);	
				}, 0);
				
				if (e.target.onClick !== undefined) {
					e.target.onClick(e.target.bean);
				}

	        	h.displayMarker(e.target);
	        	
	        	e.target.bean.removeNextItem();
	        	
			}, false)

    		h.forItems.insert(item);
    		
    		if (h.lastItem === undefined) {
    			h.lastItem = nextItem;
    		} else {
    			h.lastItem.nextItem = nextItem;
    			h.lastItem = nextItem;
    		}

        item.click();
    },
    /**
     * 
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
 * 
 */
UI.Toolbar = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
    initConfig: function(config) {
        this.config = Object.extend({
        	orientation: "vertical"
        }, config || {});
    },
    /**
     * 
     */
    render: function() {
        var h = this;

    	h.content = new Element("DIV", {
    		style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px;",
    		class: "toolbar_bg"
    	});

    	h.getMaterial().update(h.content);

    	if (h.config.orientation == "vertical") {
    		h.renderItemsVertically();
    	} else {
    		h.renderItemsHorizontally();
    	}
    },
    /**
     * 
     */
    renderItemsVertically: function() {
    	var h = this;

    	var i=0;
    	for (i=0; i<h.config.items.length; i++) {
    		var t = h.config.items[i];
    		
        	if (t.access !== undefined && t.access != UI.VISIBLE) {
        		continue;
        	}
    		
    		var item = new Element("DIV", {
    			style: "padding-left:15px; font-size:14px; border-bottom: 1px solid #1E1D29; line-height:70px; height:70px; overflow:hidden",
    			class: "toolbar_bg"
    		});
    		item.onClick = h.config.items[i].onClick;

    		item.update(h.config.items[i].name);
    		item.title = h.config.items[i].description;

			item.on("click", function(e) {
				setTimeout(function() {
					h.displayMarkerVertically(e.target);	
				}, 0);
				if (e.target.onClick !== undefined) {
					e.target.onClick(t);
				}
			});

    		h.content.insert(item);
    		
    		if (i == 0) {
    			item.click();
    		}
    	}
    },
    /**
     * 
     */
    renderItemsHorizontally: function() {
    	var h = this;

    	var i=0;
    	for (i=0; i<h.config.items.length; i++) {
    		var t = h.config.items[i];
    		
        	if (t.access !== undefined && t.access != UI.VISIBLE) {
        		continue;
        	}
    		
    		var item = new Element("DIV", {
    			style: "padding-left:15px; font-size:14px; padding-right:15px; display:inline-block; border-right:1px solid #1E1D29; line-height:70px; height:70px; overflow:hidden",
    			class: "toolbar_bg"
    		});
    		item.bean = t;
    		item.onClick = h.config.items[i].onClick;

    		item.update(h.config.items[i].name);
    		item.title = h.config.items[i].description;

			item.on("click", function(e) {
				setTimeout(function() {
					h.displayMarkerHorizontally(e.target);	
				}, 0);
				if (e.target.onClick !== undefined) {
					e.target.onClick(e.target.bean);
				}
			});

    		h.content.insert(item);
    		
    		if (i == 0) {
    			item.click();
    		}
    	}
    },
    /**
     * 
     */
    displayMarkerVertically: function(html) {
    	var h = this;

    	var containerTop = h.content.getBoundingClientRect().top;

    	if (h.marker === undefined) {
    		h.marker = new Element("DIV", {
    			style: "position:absolute; opacity:0.0; width:5px; top: " + (html.getBoundingClientRect().top - containerTop) + "px; height:" + (html.getBoundingClientRect().height - 1) + "px;",
    			class: "toolbar_marker_bg"
    		});
    		h.content.insert(h.marker);
    		
    		var player = h.marker.animate([
	     		    {
	     		    	opacity: "0.0"
	     		    },
	     		    {
	     		    	opacity: "1.0"
	     		    },
	     		], {
	     			direction: 'normal',
	     		    duration: 1000,
	     		    easing: "ease",
	     			iterations: 1,
	     			fill: "both"
		   		});
    	} else {
			var player = h.marker.animate([
	  		    {
	  		       top: (h.marker.getBoundingClientRect().top - h.marker.getBoundingClientRect().height + 1) + "px"
	  		    },
	  		    {
	   		       top: (html.getBoundingClientRect().top - html.getBoundingClientRect().height + 1) + "px"
	  		    },
	  		], {
	  			direction: 'normal',
	  		    duration: 1000,
	  		    easing: "ease",
	  			iterations: 1,
	  			fill: "both"
			});
    	}
    },
    /**
     * 
     */
    displayMarkerHorizontally: function(html) {
    	var h = this;

    	var containerLeft = h.content.getBoundingClientRect().left;
    	
    	if (h.marker === undefined) {
    		
    		h.marker = new Element("DIV", {
    			style: "position:absolute; opacity:0.0; top:65px; left:" + (html.getBoundingClientRect().left - containerLeft) + "px; width:" + html.getBoundingClientRect().width + "px; height:5px",
    			class: "toolbar_marker_bg"
    		});
    		h.content.insert(h.marker);
    		
    		var player = h.marker.animate([
	     		    {
	     		    	opacity: "0.0"
	     		    },
	     		    {
	     		    	opacity: "1.0"
	     		    },
	     		], {
	     			direction: 'normal',
	     		    duration: 1000,
	     		    easing: "ease",
	     			iterations: 1,
	     			fill: "both"
		   		});
    	} else {
			var player = h.marker.animate([
	  		    {
	  		       left: (h.marker.getBoundingClientRect().left- containerLeft) + "px",
	  		       width: h.marker.getBoundingClientRect().width + "px"
	  		    },
	  		    {
	   		       left: (html.getBoundingClientRect().left - containerLeft) + "px",
	   		       width: (html.getBoundingClientRect().width - 1) + "px"
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
UI.Tabs = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
    initConfig: function(config) {
        this.config = Object.extend({
        	type: "toolbar"
        }, config || {});
    },
    /**
     * 
     */
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
    /**
     * 
     */
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
    /**
     * 
     */
    addTab: function(tab) {
    	var h = this;

	    	h.addCard(tab);
	    	h.toolbar.addItem(tab);
    }
});