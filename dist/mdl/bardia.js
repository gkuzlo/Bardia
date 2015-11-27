var bardia = {
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
    	function klass(config) {
    		this.initialize(config);
    	}

    	var attribute = null;
    	for (attribute in _function.prototype) {
    		klass.prototype[attribute] = _function.prototype[attribute];
    	}
    	for (attribute in body) {
    		klass.prototype[attribute] = body[attribute];
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
    		delete child.dom().wrapper;
    		h.dom().removeChild(child.dom());
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
        	result = this.domNode.querySelector("#" + id);
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
    	this.dom().className = this.dom().className + " " + className;
    },
    
    removeClassName: function(className) {
    	this.dom().className = this.dom().className.replace(className, "");
    },
    
    hasClassName: function(className) {
    	return this.dom().className.indexOf(className) > -1;
    },
    
    setStyle: function(style) {
    	var s = null;
    	for (s in style) {
    		this.dom().style[s] = style[s];
    	}
    }
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
    
    parseDate: function() {
    	
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
    }
});

bardia.utils.DateUtils.pattern = "";
bardia.layout = {
};
/**
 * @class bardia.layout.BorderLayout
 * @constructor
 *
@example
~~~
var layout = new bardia.layout.BorderLayout({
   inside: $_element(document.body),
   north: {
        height: 20
   }
});
~~~
 */
bardia.layout.BorderLayout = bardia.oop.Class.create({

	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({}, config));
        
		try {
			this.render();
		} catch (e) {
			alert("BorderLayout.render: " + e);
		}
	},

    render: function() {
    	var h = this;
        
        var centerTop = 0;
        var centerBottom = 0;
        var centerLeft = 0;
        var centerRight = 0;

        if (h.north !== undefined) {
            centerTop = h.north.height || 50;
            
            h.northElement = $_element({
                $_tag: "div",
                class: "border-layout-north",
                style: "height:" + centerTop + "px; background-color:" + (h.north.fill || "transparent")
            });

            this.inside.insert(h.northElement);
        }
        
        if (this.south !== undefined) {
            centerBottom = this.south.height || 50;

            h.southElement = $_element({
                $_tag: "div",
                class: "border-layout-south",
                style: "height:" + centerBottom + "px; background-color:" + (h.south.fill || "transparent")
            });
            
            this.inside.insert(h.southElement);
        }
        
        if (this.west !== undefined) {
            centerLeft = this.west.width || 50;
            
            h.westElement = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + centerLeft + "px; bottom:" + centerBottom + "px; background-color:" + (h.west.fill || "transparent")
            });

            h.inside.insert(h.westElement);
        }
        
        if (this.east !== undefined) {
            centerRight = this.east.width || 50;

            h.eastElement = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.east.fill || "transparent")
            });

            this.inside.insert(h.eastElement);
        }

        h.centerElement = $_element({
            $_tag: "div",
            style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:" + centerLeft + "px; right:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.fill || "transparent")
        });

        h.inside.insert(h.centerElement);
    },
    /**
     * @method getNorth()
     * @return {bardia.dom.Element} instance of bradia dom element wrapper
     */
    getNorth: function() {
        return this.northElement;
    },
    getWest: function() {
        return this.westElement;
    },
    getEast: function() {
        return this.eastElement;
    },
    getSouth: function() {
        return this.southElement;
    },
    getCenter: function() {
        return this.centerElement;
    },
    getDefault: function() {
        return this.centerElement;
    },
});
/**

Materiał, który wysuwa się po wywołaniu metody show().
Po wywołaniu metody hide() - ucieka.
Może się wysuwać z róznych stron: left, right, top, button.
Jeżeli jest modalny to podczas wysuwania pojawia sie pod nim półprzeźroczysta kurtyna, która sprawia,
że kontet parenta jest lekko zasłonięty.

Animacja odbywa się w ten sposób, że materiał się wysuwa z jednej ze stron parenta (na przykład na gridzie, parenta podajemy w inside) a w tym czasie kurtyna zasłania obaszar grida.
Komponent jest appendowany do inside'a - czyli nie podmienia jego zawartości.

@class bardia.layout.Material
@constructor new bardia.lazout.Material();
@param config {JSONObject}
@param config.inside {bardia.dom.Element}
@param config.size=30 {Integer}
@param config.unit='%' {String -> 'px'|'%'}
@param config.edge='left' {String -> 'top'|'right'|'bottom'|'left'}
@param config.modal=false {Boolean -> true|false}
 
@example
~~~
var material = new bardia.layout.Material({
   inside: $_element(document.body),
   size: 90,
   unit: "%",
   edge: "left"
});

material.show();

material.getContent().insert($_element({
    $_tag: "DIV",
    $_append: "this is div content"
}));

~~~
 */
bardia.layout.Material = (function() {

    var h = this;

    function Material(config) {
    }

    /**
     * @method show()
     */
    Material.prototype.show = function() {
        
    }
    
    /**
     * @method hide()
     */
    Material.prototype.hide = function() {

    }
    
    /**
     * @method getContent()
     * @return {bardia.dom.Element}
     */
    Material.prototype.getContent = function() {

    }
    
    return Material;
})();
/**
 *
 */
bardia.layout.Panel = bardia.oop.Class.create({

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            title: "Insert title here ...",
            serial: "S_" + (Math.random()*1000000).toFixed(0),
        }, config));

        this.render();
    },

    render: function() {
        var h = this;

        h.prepareRoot();
        h.inside.update(h.root);
        
        h.setButtons();
    },
    
    setButtons: function() {
    	var h = this;
    	if (h.buttons) {
    		h.buttons.forEach(function(button) {
    			h.root.find(h.id("toolbar")).insert($_element({
    				$_tag: "button",
    				class: "mdl-button mdl-js-button mdl-button--icon",
    				title: button.name,
    				$_append: [{
    					$_tag: "i",
    					class: "material-icons",
    					$_append: button.icon
    				}],
    				$_on: {
    					"click": function(e) {
    						button.onClick();
    					}
    				}
    			}));
    		});
    	}
    },
    
    getContent: function() {
    	return this.root.find(this.id("contents"));
    },

    prepareRoot: function() {
        var h = this;
        
        h.root = $_element({
        	$_tag: "div",
        	class: "panel-container",
        	$_append: [{
        		$_tag: "div",
        		id: h.id("toolbar"),
        		class: "panel-top panel-bg"
        	}, {
        		$_tag: "div",
        		class: "panel-content",
        		id: h.id("contents")
        	}]
        });
    },
    
    id: function(name) {
    	return this.serial + name;
    }
});
bardia.layout.BreadCrumb = bardia.oop.Class.create({
    
    initialize: function(config) {
    	bardia.oop.Class.extend(this, bardia.oop.Class.extend({
    		tabs: [],
    		addedTabs: [],
    		serial: "S_" + (Math.random()*1000000).toFixed(0),
    	}, config));
    	
    	this.render();
    },
    
    render: function() {
        var h = this;

        h.root = h.prepareRoot();
        h.inside.update(h.root);
    },

    addItem: function(tab) {
    	var h = this;

    	var headerLink = $_element({
    		$_tag: "div",
    		class: "breadcrumb-link",
    		$_append: tab.name,
    		$_on: {
    			"click": function(e) {
    				h.selectItem(e.target.wrapper);
    			}
    		}
    	});
    	headerLink.tab = tab;
    	
    	h.root.find(h.id("header")).insert(headerLink);
    	
    	var content = $_element({
    		$_tag: "div",
    		class: "breadcrumb-content"
    	});
    	h.root.find(h.id("contents")).insert(content);
    	
    	headerLink.content = content;
    	
    	if (h.lastItem) {
			h.lastItem.nextItem = headerLink;
    	} 
    	
    	h.selectItem(headerLink);
    },
    
    selectItem: function(wrappedElement) {
    	var h = this;

    	if (h.lastItem) {		
    		h.lastItem.removeClassName("is-active");
    		h.lastItem.content.removeClassName("is-active");
    	}

    	h.removeAllNextItems(wrappedElement);

    	h.lastItem = wrappedElement;

    	wrappedElement.addClassName("is-active");
    	wrappedElement.content.addClassName("is-active");

		if (wrappedElement.tab.onActivate && !wrappedElement.activated) {
			wrappedElement.activated = true;
			wrappedElement.tab.onActivate(wrappedElement.content);
		}
    },

    removeAllNextItems: function(headerLink) {    	
    	var selectedLink = headerLink;
    	
    	var toBeRemoved = [];
    	while (selectedLink.nextItem) {
    		toBeRemoved.push(selectedLink.nextItem);
    		selectedLink = selectedLink.nextItem;
    	}

    	headerLink.nextItem = null;
    	delete headerLink.nextItem;
    	
    	toBeRemoved.forEach(function(header) {
    		header.dom().remove();
    		header.content.dom().remove();
    		
    		if (header.nextItem) {
    			delete header.nextItem;
    		}
    	});
    },

    prepareRoot: function() {
    	var h = this;
    	
        var json = {
            $_tag: "div", 
            class: "breadcrumb-container",
            $_append: [{
                $_tag: "main", 
                class: "breadcrumb-contents", 
                id: h.id("contents"),
            }, {
                $_tag: "div", 
                class: "breadcrumb-header breadcrumb-bg", 
                id: h.id("header"),
            }]
        };

        return $_element(json);
    },
    
    id: function(name) {
    	return this.serial + name;
    }
});
bardia.layout.Tabs = bardia.oop.Class.create({
    
    initialize: function(config) {
    	bardia.oop.Class.extend(this, bardia.oop.Class.extend({
    		tabs: [],
    		addedTabs: [],
    		serial: "S_" + (Math.random()*1000000).toFixed(0),
    	}, config));
    	
    	this.render();
    },
    
    render: function() {
        var h = this;

        h.root = h.prepareRoot();
        h.inside.update(h.root);

        var headerLink = null;
        h.tabs.forEach(function(tab) {
        	headerLink = h.addItem(tab);
        });
        
        if (headerLink != null) {
        	h.selectItem(headerLink);
        }
    },

    addItem: function(tab) {
    	var h = this;

    	var headerLink = $_element({
    		$_tag: "div",
    		class: "tabs-link",
    		$_append: tab.name,
    		$_on: {
    			"click": function(e) {
    				h.selectItem(e.target.wrapper);
    			}
    		}
    	});
    	headerLink.tab = tab;
    	
    	h.root.find(h.id("header")).insert(headerLink);
    	
    	var content = $_element({
    		$_tag: "div",
    		class: "tabs-content"
    	});
    	h.root.find(h.id("contents")).insert(content);
    	
    	headerLink.content = content;

    	return headerLink;
    },
    
    selectItem: function(wrappedElement) {
    	var h = this;

    	if (h.selectedItem) {		
    		h.selectedItem.removeClassName("is-active");
    		h.selectedItem.content.removeClassName("is-active");
    	}
    	
    	h.selectedItem = wrappedElement;

    	wrappedElement.addClassName("is-active");
    	wrappedElement.content.addClassName("is-active");

		if (wrappedElement.tab.onActivate && !wrappedElement.activated) {
			wrappedElement.activated = true;
			wrappedElement.tab.onActivate(wrappedElement.content);
		} 

		if (wrappedElement.tab.onSelect) {
			wrappedElement.tab.onSelect(wrappedElement.content);
		}

    },

    prepareRoot: function() {
    	var h = this;
    	
        var json = {
            $_tag: "div", 
            class: "tabs-container",
            $_append: [{
                $_tag: "main", 
                class: "tabs-contents", 
                id: h.id("contents"),
            }, {
                $_tag: "div", 
                class: "tabs-header tabs-bg", 
                id: h.id("header"),
            }]
        };

        return $_element(json);
    },
    
    id: function(name) {
    	return this.serial + name;
    }
});
bardia.list = {

};
/**
 *
 */
bardia.list.List = bardia.oop.Class.create({
    /**
     *
     */
    initialize: function(config) {
        this.config = config;
        
        this.render();
    },
    /**
     *
     */
    render: function() {
        var h = this;
        
        h.config.inside.update();

        h.root = $_element({
            $_tag: "table",
            class: "mdl-data-table mdl-js-data-table mdl-shadow--2dp",
            $_append: [{
                $_tag: "thead",
                $_append: [{
                    $_tag: "tr",
                    $_append: [{
                        $_tag: "th",
                        class: "mdl-data-table__cell--non-numeric",
                        style: "background-color:yellow",
                        $_append: "A"
                    }, {
                        $_tag: "th",
                        $_append: "B"
                    }, {
                        $_tag: "th",
                        $_append: "C"
                    }]
                }]
            }, {
                $_tag: "tbody",
                $_append: [{
                    $_tag: "tr",
                    $_append: [{
                        $_tag: "td",
                        class: "mdl-data-table__cell--non-numeric",
                        $_append: "Grzegorz"
                    }, {
                        $_tag: "td",
                        $_append: [{
                            $_tag: "INPUT",
                            type: "number"
                        }]
                    }, {
                        $_tag: "td",
                        $_append: "Julia"
                    }]
                }, {
                    $_tag: "tr",
                    $_append: [{
                        $_tag: "td",
                        class: "mdl-data-table__cell--non-numeric",
                        $_append: "Agnieszka"
                    }, {
                        $_tag: "td",
                        $_append: "BBB"
                    }, {
                        $_tag: "td",
                        $_append: "CCC"
                    }]
                }]
            }]
        });
        
        h.config.inside.insert(h.root);
        
        $_upgradeElement(h.root);
    }
});
/**
 *
 */
bardia.list.MobileList = (function() {
    
    var h = this;
    
    function prepareRoot() {
        var result = $_element({
            $_tag: "ul",
            class: "collection with-header",
            $_append: [{
                $_tag: "li",
                class: "collection-header",
                $_append: "<h4>First Names</h4>"
            }, {
                $_tag: "li",
                class: "collection-item",
                $_append: "Wojtek"
            }, {
                $_tag: "li",
                class: "collection-item",
                $_append: "Ela"
            }, {
                $_tag: "li",
                class: "collection-item",
                $_append: "Piotr",
                $_on: {
                    "click": function(e) {
                        alert(e);
                    }
                }
            }]
        });

        return result;
    }

    function _mobileList(config) {
        var root = prepareRoot();
        config.inside.insert(root);
    };

    return _mobileList;
})();

/*
      <ul class="collection with-header">
        <li class="collection-header"><h4>First Names</h4></li>
        <li class="collection-item">Alvin</li>
        <li class="collection-item">Alvin</li>
        <li class="collection-item">Alvin</li>
        <li class="collection-item">Alvin</li>
      </ul>
 */
bardia.grid = {

};

bardia.grid.Grid = bardia.oop.Class.create({
	
    detailsWidth: "400px",

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
        	title: "Insert tile here. . .",
        	clickAfterFetch: false,
        	serial: "S_" + (Math.random()*1000000).toFixed(0),
        }, config));
        
        this.render();
    },

    render: function() {
        var h = this;

        h.root = $_element({
        	$_tag: "div",
        	class: "grid-container",
        	$_append:[{
        		$_tag: "div",
        		id: h.id("toolbar"),
        		class: "grid-top grid-bg",
        	}, {
	            $_tag: "div",
	            class: "grid-content",
	            $_append: [{
	                $_tag: "div",
	                class: "grid-headers",
	                id: h.id("grid-headers"),
	                $_append: h.columns.map(function(column) {
	                    return {
	                        $_tag: "div",
	                        class: "grid-header",
	                        style: "width:" + (column.width || 150) + "px",
	                        $_append: column.name
	                    };
	                })
	            }, {
	                $_tag: "div",
	                class: "grid-rows",
	                id: h.id("grid-rows"),
	                $_on: {
	                    "click": function(e) {
	                    	var element = e.target; 
	                    	while(element.className && element.className !== "grid-row") {
	                    		element = element.parentElement;
	                    	}
	                    	if (element.wrapper && element.className && element.className == "grid-row") {
	                    		h.onClick(element.wrapper);
	                    	}
	                    }
	                }
	            }]
        	}, {
                $_tag: "div",
                class: "grid-curtain",
                id: h.id("grid-curtain"),
                $_on: {
                    "click": function() {
                        h.closeDetails();
                    }
                },
                $_append: [{
                    $_tag: "div",
                    class: "grid-details-right",
                    id: h.id("grid-details-right"),
                    style: "width:" + h.detailsWidth + "; left:-" + h.detailsWidth, 
                    $_on: {
                    	"click": function(e) {
                    		e.stopPropagation();
                    	}
                    }
                }]
            }]
        });

        h.inside.update(h.root);
        
        h.setButtons();
        h.setTitle(h.title);
        h.createSearchField();
    },
    
    setButtons: function() {
    	var h = this;
    	if (h.buttons) {
    		h.buttons.forEach(function(button, index) {
    			
    			var el = $_element({
    				$_tag: "button",
    				class: "mdl-button mdl-js-button mdl-button--icon",
    				$_append: [{
    					$_tag: "div",
    					class: "icon material-icons",
    					$_append: button.icon,
    				}],
    				$_on: {
    					"click": function(e) {
    						button.onClick();
    					}
    				}
    			});
    			
    			h.root.find(h.id("toolbar")).insert(el);
    		});
    	}
    },

    setTitle: function(title) {
    	var h = this;

		var el = $_element({
			$_tag: "div",
			class: "grid-title",
			$_append: title
		});
    			
    	h.root.find(h.id("toolbar")).insert(el);
    },
    
    createSearchField: function() {
    	var h = this;
    	
    	var textSearch = $_element({
    		$_tag: "div",
    		class: "mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right",
    		style: "position:absolute; right:10px; margin-top:-8px",
    		$_append: [{
    			$_tag: "label",
    			class: "mdl-button mdl-js-button mdl-button--icon",
    			"for": h.id("search_input"),
    			$_append: [{
    				$_tag: "i",
    				class: "material-icons",
    				$_append: "search"
    			}]
    		}, {
    			$_tag: "div",
    			class: "mdl-textfield__expandable-holder",
    			$_append: [{
    				$_tag: "input",
    				class: "mdl-textfield__input",
    				style: "background-color:transparent; font-size:14px; font-family:Arial; margin-bottom:4px",
    				type: "text",
    				name: "sample",
    			    id: h.id("search_input"),
    			    $_on: {
    			    	keyup: function(e) {
    			    		h.filterRows(e.target.value);
    			    	}
    			    }
    			}]
    		}]
    	});
    	
    	h.root.find(h.id("toolbar")).insert(textSearch);
    	
    	$_upgradeElement(textSearch);
    },

    fetch: function(model) {
        var h = this;

        var rowsDiv = h.root.find(h.id("grid-rows"));
        rowsDiv.update();

        h.firstRow = null;
        
        (model.rows || []).forEach(function(row) {
            var rowDiv = $_element({
                $_tag: "div",
                class: "grid-row",
            });
            rowsDiv.insert(rowDiv);
        	rowDiv.bean = row;
        	
        	h.firstRow = h.firstRow || rowDiv;

            h.columns.forEach(function(column) {            	
            	var cell = $_element({
                    $_tag: "div",
                    class: "grid-cell",
                    style: "width:" + (column.width || 150) + "px",
                });
            	
            	if (column.render) {
            		var rendered = column.render(rowDiv, cell);	
            		if (rendered && rendered != null && rendered.$_tag && rendered.$_tag != null) {
            			cell.insert($_element(rendered));
            		} else {
            			cell.insert(rendered);
            		}
            	} else {
                	cell.insert("" + eval("rowDiv.bean." + column.property));
            	}

                rowDiv.insert(cell);
            });
        });
        
        if (h.clickAfterFetch == true) {
        	if (h.firstRow) {
        		h.firstRow.dom().click();
        	}
        }
        
    },

    filterRows: function(value) {
    	var h = this;

    	var rowsDiv = h.root.find(h.id("grid-rows"));

    	for (var i=0; i<rowsDiv.dom().childNodes.length; i++) {
    		if (rowsDiv.dom().childNodes[i].innerHTML.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
    			rowsDiv.dom().childNodes[i].style.display = "flex"
    		} else {
    			rowsDiv.dom().childNodes[i].style.display = "none"
    		}
    	}
    },

    openDetails: function() {
        var h = this;

        h.root.find(h.id("grid-curtain")).dom().style.width = "100%";
        h.root.find(h.id("grid-curtain")).dom().style.background = "rgba(0,0,0,0.5)";
        h.root.find(h.id("grid-details-right")).dom().style.left = "0px";
        
        return h.root.find(h.id("grid-details-right"));
    },
    
    closeDetails: function() {
        var h = this;

        h.root.find(h.id("grid-curtain")).dom().style.width = "0px";
        h.root.find(h.id("grid-curtain")).dom().style.background = "rgba(0,0,0,0.0)";
        h.root.find(h.id("grid-details-right")).dom().style.left = "-" + h.detailsWidth;
    },
    
    id: function(name) {
    	return this.serial + name;
    }
});
bardia.form = {

};
/**
 *
 */
bardia.form.Form = bardia.oop.Class.create({

    detailsWidth: "400px",

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            title: "Insert title here ...",
            serial: "S_" + (Math.random()*1000000).toFixed(0),
        }, config));

        this.render();
    },

    render: function() {
        var h = this;

        h.prepareRoot();
        h.inside.update(h.root);
        
        h.setButtons();
    },
    
    setButtons: function() {
    	var h = this;
    	if (h.buttons) {
    		h.buttons.forEach(function(button) {
    			h.root.find(h.id("toolbar")).insert($_element({
    				$_tag: "button",
    				class: "mdl-button mdl-js-button mdl-button--icon",
    				title: button.name,
    				$_append: [{
    					$_tag: "i",
    					class: "material-icons",
    					$_append: button.icon
    				}],
    				$_on: {
    					"click": function(e) {
    						if (button.onClick) {
    							button.onClick();
    						}
    					}
    				}
    			}));
    		});
    	}
    },

    prepareRoot: function() {
        var h = this;
        
        h.root = $_element({
        	$_tag: "div",
        	class: "form-container",
        	$_append: [{
        		$_tag: "div",
        		id: h.id("toolbar"),
        		class: "form-top form-bg"
        	}, {
        		$_tag: "div",
        		class: "form-content",
        		id: h.id("contents")
        	}]
        });

        h.fields.forEach(function(field) {
            var _field = bardia.oop.Class.extend({
                type: "Text"
            }, field);

            var formField = eval("new bardia.form." + _field.type + "Field(_field)");

            formField.setForm(h);
            
            h.root.find(h.id("contents")).insert(formField.getElement());
        });

        h.root.insert($_element({
            $_tag: "div",
            class: "form-curtain",
            id: "form-curtain",
            style: "width:0px",
            $_on: {
                "click": function() {
                    h.closeDetails();
                }
            },
            $_append: [{
                $_tag: "div",
                class: "form-details-right",
                id: "form-details-right",
                $_on: {
                    "click": function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                },
            }]
        }));

        h.root.insert($_element({
        	$_tag: "div",
        	class: "form-progress",
        	id: h.id("form-progress"),
        	$_append: [{
        		$_tag: "div",
        		id: h.id("progress"),
        		class: "mdl-spinner mdl-spinner--single-color mdl-js-spinner"
        	}, {
        		$_tag: "div",
        		id: h.id("form-progress-label"),
        		class: "form-progress-label form-bg"
        	}]
        }));
        
        $_upgradeElement(h.root.find(h.id("progress")));
    },

    addBeanChangedListener: function(listener) {
        var h = this;
        h.beanListeners = h.beanListeners || [];
        h.beanListeners.push(listener);
    },

    setBean: function(bean) {
        this.bean = bean;

        (this.beanListeners || []).forEach(function(listener) {
            listener(bean);
        });
    },

    getBean: function() {
    	this.bean = this.bean || {};
        return this.bean || {};
    },

    openDetails: function(width) {
        var h = this;

        h.root.find("form-curtain").dom().style.width = "100%";
        h.root.find("form-details-right").dom().style.width = width || h.detailsWidth;

        var result = h.root.find("form-details-right");
        result.update();

        return result;
    },

    closeDetails: function() {
        var h = this;

        h.root.find("form-curtain").dom().style.width = "0px";
    },

    openProgress: function() {
    	var h = this;
    	h.root.find(h.id("form-progress")).addClassName("form-progress-is-active");
    	h.root.find(h.id("progress")).addClassName("is-active");
    },

    closeProgress: function() {
    	var h = this;
    	h.root.find(h.id("form-progress")).removeClassName("form-progress-is-active");
    	h.root.find(h.id("progress")).removeClassName("is-active");
    },
    
    setProgressLabel: function(label) {
    	var h = this;
    	
    	h.root.find(h.id("form-progress-label")).update(label);
    },
    
    id: function(name) {
    	return this.serial + name;
    }
});
bardia.form.TextField = bardia.oop.Class.create({

    initialize: function(config) {

        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ...",
            pattern: ".+",
            required: config.required || false,
            serial: "S_" + (Math.random()*1000000).toFixed(0),
        }, config));

        this.render();
    },

    render: function() {
        var h = this;

        h.root = $_element({
            $_tag: "div",
            class: "form-row",
            $_append: [{
                $_tag: "input",
                class: "form-text-input",
                type: "text",
                pattern: h.pattern,
                required: true,
                id: h.id(h.property),
                $_on: {
                    change: function(e) {
                        h.updateBeanProperty(e.target.value);
                    }
                }
            }, {
                $_tag: "label",
                class: "form-text-input-label",
                $_append: h.label
            }]
        });
        
        if (h.required===true) {
            h.root.insert($_element({
                $_tag: "label",
                class: "form-text-input-error",
                $_append: $msg("text")
            }));
        }
    },

    getElement: function() {
        var h = this;
        return h.root;
    },

    updateBeanProperty: function(value) {
        var h = this;        
        eval("h.form.getBean()." + h.property + " = value;");
    },

    updateInputValue: function() {
        var h = this;
        h.root.find(h.id(h.property)).dom().value = eval("h.form.getBean()." + h.property + " || ''");
    },

    setForm: function(form) {
    	try {
	        var h = this;
	        h.form = form;
	        h.form.addBeanChangedListener(function(bean) {
	            h.updateInputValue(bean);
	        });
    	} catch (e) {
    		alert("" + e);
    	}
    },
    
    id: function(name) {
    	return this.serial + name;
    }
});
/**
 * 
 */
bardia.form.ActionField = bardia.oop.Class.inherit(bardia.form.TextField, {

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Title ... ",
            serial: "S_" + (Math.random()*1000000).toFixed(0),
        }, config));
        this.render();
    },

    render: function() {
        var h = this;

        h.root = $_element({
            $_tag: "div",
            class: "form-row",
            $_append: [{
                $_tag: "input",
                class: "form-text-input",
                required: true,
                type: "text",
                id: h.id(h.property),
                $_on: {
                    change: function(e) {
                        h.updateBeanProperty(e.target.value);
                    },
                    keydown: function(e) {
                    	e.stopPropagation();
                    	e.preventDefault();
                    },
                    mousedown: function(e) {
                    	e.stopPropagation();
                    	e.preventDefault();
                    }
                }
            }, {
                $_tag: "label",
                class: "form-text-input-label",
                "for": h.property,
                $_append: h.label
            }]
        });

        h.displayButton();
    },
    /**
     *  
     */
    displayButton: function() {
    	var h = this;
    	
    	h.root.insert($_element({
            $_tag: "button",
            class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
            $_on: {
                click: function(e) {
                    var element = h.form.openDetails("100%");
                    if (h.onExpand) {
                    	h.onExpand(element);
                    }
                }
            },
            $_append: [{
                $_tag: "i",
                class: "material-icons",
                $_append: "keyboard_arrow_down",
            }]
        }));
    },
    
    id: function(name) {
    	return this.serial + name;
    }
});
/**
 * 
 */
bardia.form.DateField = bardia.oop.Class.inherit(bardia.form.ActionField, {

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ... 2",
            date: new Date()
        }, config));

        this.render();
    },
    
    displayButton: function() {
    	var h = this;

    	h.root.insert($_element({
            $_tag: "button",
            class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
            $_on: {
                click: function(e) {
                    var element = h.form.openDetails("295px");
                    try {
                    	h.displayCalendar(element);
                    } catch (e) {
                    	alert(e);
                    }
                }
            },
            $_append: [{
                $_tag: "i",
                class: "material-icons",
                $_append: "today",
            }]
        }));
    },
    /**
     * 
     */
    displayCalendar: function(html) {    	
    	var h = this;

    	h.calendarRoot = $_element({
    		$_tag: "div",
    		class: "calendar-container",
    		$_append: [{
    			$_tag: "div",
    			class: "calendar-weekday",
    			id: "weekday"
    		}, {
    			$_tag: "div",
    			class: "calendar-month",
    			id: "month"
    		}, {
    			$_tag: "div",
    			class: "calendar-month-day",
    			id: "month-day"
    		}, {
    			$_tag: "div",
    			class: "calendar-year",
    			id: "year"
    		}, {
    			$_tag: "div",
    			class: "calendar-navigation",
    			id: "month-navigation",
    			$_append: [{
    	            $_tag: "button",
    	            class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
    	            $_on: {
    	                click: function(e) {
    	                	h.minusMonth();
    	                }
    	            },
    	            $_append: [{
    	                $_tag: "i",
    	                class: "material-icons",
    	                $_append: "keyboard_arrow_left",
    	            }]
    	        }, {
    	        	$_tag: "div",
    	        	id: "month-full-name"
    	        }, {
    	            $_tag: "button",
    	            class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
    	            $_on: {
    	                click: function(e) {
    	                	h.plusMonth();
    	                }
    	            },
    	            $_append: [{
    	                $_tag: "i",
    	                class: "material-icons",
    	                $_append: "keyboard_arrow_right",
    	            }]
    	        }]
    		}, {
    			$_tag: "div",
    			class: "calendar-days",
    			id: "month-days",
    		}, {
    			$_tag: "div",
    			class: "calendar-buttons",
    			id: "month-buttons"
    		}],
    	});

    	html.insert(h.calendarRoot);
    	    	
    	h.updateDaysView();
    },
    
    plusMonth: function() {
    	var h = this;
    	h.date.setMonth(h.date.getMonth() + 1);
    	h.updateDaysView();
    },
    
    minusMonth: function() {
    	var h = this;
    	h.date.setMonth(h.date.getMonth() - 1);
    	h.updateDaysView();
    },
    
    updateDaysView: function() {
    	var h = this;
    	
    	h.date = h.date || eval("h.form.getBean()." + h.property) || new Date();    	
    	
    	h.calendarRoot.find("month-days").update();
    	var days = h.prepareDaysRows();
    	days.forEach(function(_day) {
    		h.calendarRoot.find("month-days").insert($_element(_day));
    	});

    	h.setWeekday();
    	h.setMonth();
    	h.setMonthFullName();
    	h.setMonthDay();
    	h.setYear();
    },

    prepareDaysRows: function() {
    	var h = this;
    	
    	var result = [];

    	var clonedDate = new Date(h.date.getTime());
    	clonedDate.setDate(1);
    	clonedDate.setHours(12);
    	clonedDate.setMinutes(0);
    	clonedDate.setSeconds(0);
    	clonedDate.setMilliseconds(0);

    	var currentMonth = clonedDate.getMonth();

    	clonedDate.setTime(clonedDate.getTime() - (clonedDate.getDay()*24*60*60*1000));

    	var i = 0;
    	for (i=0; i<=41; i++) {
    		var aDate = new Date(clonedDate.getTime() + (i * 24 * 60 * 60 * 1000));

    		var bgColor = "transparent";
    		var color = "white";
    		if (aDate.getMonth() == currentMonth) {
    			color = "black";

    			if (aDate.getDay() == 0) {
    				color = "red";
    			}

    			if (aDate.getDate() == h.date.getDate()) {
    				bgColor = "#3f51b5";
    				color = "white";
    			}
    		}

    		result.push({
    			$_tag: "div",
    			class: "calendar-single-day mdl-js-ripple-effect",
    			style: "color:" + color + "; background-color:" + bgColor,
    			$_props: {
    				date: aDate
    			},
    			$_on: {
    				click: function(e) {
    					h.updateBeanProperty(e.target.date.getTime());
    					h.updateInputValue(h.form.getBean());
    					h.form.closeDetails();
    				}
    			},
    			$_append: "" + aDate.getDate()
    		});
    	}

    	return result;
    },

    updateInputValue: function(bean) {
        var h = this;

        h.root.find(h.property).dom().value = bardia.form.DateField.DU.createFormatYYYYMMDD(eval("bean." + h.property));
    },

    setWeekday: function() {
    	this.calendarRoot.find("weekday").update(bardia.form.DateField.WEEKDAYS[this.date.getDay()]);
    },
    
    setMonth: function() {
    	this.calendarRoot.find("month").update(bardia.form.DateField.SHORT_MONTHS[this.date.getMonth()]);
    },
    
    setMonthFullName: function() {
    	this.calendarRoot.find("month-full-name").update(bardia.form.DateField.MONTHS[this.date.getMonth()]);
    },
    
    setMonthDay: function() {
    	this.calendarRoot.find("month-day").update("" + this.date.getDate());
    },

    setYear: function() {
    	this.calendarRoot.find("year").update("" + this.date.getFullYear());
    },
});

bardia.form.DateField.WEEKDAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
bardia.form.DateField.MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
bardia.form.DateField.SHORT_MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
bardia.form.DateField.DU = new bardia.utils.DateUtils();

/**
 * 
 */
bardia.form.LookupField = bardia.oop.Class.inherit(bardia.form.ActionField, {

    /**
     *  
     */
    displayButton: function() {
    	var h = this;
    	
    	h.root.insert($_element({
            $_tag: "button",
            class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
            $_on: {
                click: function(e) {
                    var element = h.form.openDetails("100%");
                    if (h.onExpand) {
                    	h.onExpand(element);
                    }
                }
            },
            $_append: [{
                $_tag: "i",
                class: "material-icons",
                $_append: "keyboard_arrow_down",
            }]
        }));
    },
    
    updateInputValue: function() {
        var h = this;

        var inputValue = eval("h.form.getBean()." + h.property + " || ''");
        
        if (h.formatLabel) {
        	try {
        		inputValue = h.formatLabel(h.form.getBean());
        	} catch (e) {
        		alert("updateInputValue(): " + e);
        	}
        }
        h.root.find(h.id(h.property)).dom().value = inputValue;
    },
});

bardia.form.BooleanField = bardia.oop.Class.inherit(bardia.form.TextField, {

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            serial: "S_" + (Math.random()*1000000).toFixed(0),
        }, config));
        
        this.render();
    },

    render: function() {
    	var h = this;
    	
        h.root = $_element({
            $_tag: "div",
            class: "form-row",
            $_append: [{
            	$_tag: "input",
            	type: "checkbox",
            	id: h.property,
            	$_on: {
            		"change": function(e) {
            			h.updateBeanProperty(e.target.checked);
            		}
            	}
            }, {
            	$_tag: "span",
            	class: "mdl-checkbox__label",
            	$_append: h.label || "???" + h.property + "???"
            }]
        });
    },

    updateInputValue: function(bean) {
        var h = this;
        h.root.find(h.property).dom().checked = eval("bean." + h.property) || false;
    },
});

bardia.form.IntegerField = bardia.oop.Class.inherit(bardia.form.TextField, {

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Boolean value ..."
        }, config));
        
        this.render();
    },
});
bardia.form.FileField = bardia.oop.Class.inherit(bardia.form.ActionField, {

    /**
     *  
     */
    displayButton: function() {
    	var h = this;

    	h.serial = "upload_" + (Math.random()*1000000).toFixed(0);
    	
    	h.root.insert($_element({
            $_tag: "button",
            class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
            $_on: {
                click: function(e) {
                	h.root.find(h.serial).dom().click();
                }
            },
            $_append: [{
                $_tag: "i",
                class: "material-icons",
                $_append: "file_upload",
            }, {
    			$_tag: "form",
    		    action: bardia.uploadAction,
    		    method: "POST",
    		    enctype: "multipart/form-data",
    		    target: h.serial,
    		    style: "display:none; width:0px; height:0px",
    		    $_append: [{
    				$_tag: "input",
    				type: "file",
    				name: "fileName_" + h.serial,
    				id: h.serial,
    				style: "display:none",
    				$_on: {
    					"change": function() {
    						h.form.openProgress();
    						
    						var form = new FormData();
    							form.append("file", h.root.find(h.serial).dom().files[0]);

    						var xhr = new XMLHttpRequest();

    						xhr.upload.addEventListener("progress", function(e) {
    							var pc = parseInt(100 - (e.loaded / e.total * 100));
    							h.form.setProgressLabel("" + (100 - pc) + " %");
    						}, false);

    						xhr.onreadystatechange = function (evt) {
    							if (xhr.readyState == 4) {
    								h.form.closeProgress();

    								var createdFile = JSON.parse(xhr.responseText);						
    			                    	h.updateBeanProperty(createdFile);
    			                    	h.updateInputValue(h.form.getBean());
    			                    	
    			            		if (h.onChange !== undefined) {
    			            			h.onChange(createdFile);
    			            		}
    							}
    						};

    						xhr.open("POST", bardia.uploadAction, true);
    						xhr.send(form);
    					}
    				}
    			}]
    		}]
        }));
    },
    
    updateInputValue: function(bean) {
        var h = this;
        var file = eval("bean." + h.property + " || {name:''}");
        h.root.find(h.property).dom().value = file.name;
    },
});