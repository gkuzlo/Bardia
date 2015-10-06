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

        if (jsonRoot.$_append && jsonRoot.$_append.forEach) {
            jsonRoot.$_append.forEach(function(child) {
                h.createSubElement(child);
            });
        } else if (jsonRoot.$_append) {
            this.domNode.innerHTML = jsonRoot.$_append;
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
                this.domNode.appendChild(subElement.dom());
                this.children.push(subElement);
            }
        } catch (e) {
            alert("insert: subElement=" + subElement + " " + e);
        }
    },

    update: function(element) {
        (this.children || []).splice(0, this.children.length);

        while (this.domNode.childNodes.length > 0) {
            this.domNode.removeChild(this.domNode.childNodes[0]);
        }

        if (element)
        this.insert(element);
    },

    dom: function() {
        return this.domNode;
    },

    find: function(id) {
        var result = null;
        result = this.domNode.querySelector("#" + id);
        if (result !== null) {
            return result.wrapper;
        } else {
            return null;   
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
bardia.layout = {
}
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
        this.config = config;
        
        this.render();
	},

    render: function() {
    	var h = this;
        
        var centerTop = 0;
        var centerBottom = 0;
        var centerLeft = 0;
        var centerRight = 0;

        if (this.config.north !== undefined) {
            centerTop = h.config.north.height || 50;

            var north = {
                $_tag: "div",
                class: "border-layout-north",
                style: "height:" + centerTop + "px; background-color:" + (h.config.north.fill || "transparent")
            }

            this.config.inside.insert($_element(north));
        }
        
        if (this.config.south !== undefined) {
            centerBottom = this.config.south.height || 50;

            var south = {
                $_tag: "div",
                class: "border-layout-south",
                style: "height:" + centerBottom + "px; background-color:" + (h.config.south.fill || "transparent")
            };
            
            this.config.inside.insert($_element(south));
        }
        
        if (this.config.west !== undefined) {
            centerLeft = this.config.west.width || 50;
            
            h.west = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + centerLeft + "px; bottom:" + centerBottom + "px; background-color:" + (h.config.west.fill || "transparent")
            });

            h.config.inside.insert(h.west);
        }
        
        if (this.config.east !== undefined) {
            centerRight = this.config.east.width || 50;

            h.east = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.config.east.fill || "transparent")
            });

            this.config.inside.insert(h.east);
        }

        h.center = $_element({
            $_tag: "div",
            style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:" + centerLeft + "px; right:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.config.fill || "transparent")
        });

        h.config.inside.insert(h.center);
    },
    /**
     * @method getNorth()
     * @return {bardia.dom.Element} instance of bradia dom element wrapper
     */
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
bardia.layout.Panel = bardia.oop.Class.create({
    
    initialize: function(config) {
    	bardia.oop.Class.extend(this, config || {});
        this.render();
    },
    
    render: function() {
        var h = this;

        h.root = h.prepareRoot();
        h.inside.update(h.root);

        h.setTabs(h.tabs);
        h.setButtons((h.buttons || []));

        $_upgradeElement(h.root);
    },
    
    getContent: function() {
    	return this.root.find("contents");
    },
    
    setTitle: function(title) {
    	this.root.find("title").update(title);
    },
    
    setTabs: function(tabs) {
        var h = this;

        if (!tabs) return;

        h.prepareHeaderTabs(tabs);
        h.prepareContentTabs(tabs);
    },
    
    prepareHeaderTabs: function(tabs) {
        var h = this;
        
        if (h.root.find("header-tabs") !== null) {
            h.root.find("header-tabs").update();
        } else {
            var header = h.root.find("header")
            header.insert($_element({
                $_tag: "div", 
                class: "mdl-layout__tab-bar mdl-js-ripple-effect", 
                id: "header-tabs",
            }));
        }

        tabs.forEach(function(tab, index) {
            var tabHeader = $_element({
                $_tag: "a",
                $_append: tab.name,
                $_on: {
                    "click": function(e) {
                        if (tab.onActivate && !tab.activated) {
                            setTimeout(function() {
                                tab.onActivate(h.root.find("tab_" + index));
                                tab.activated = true;
                            }, 500);
                        }
                    }
                },
                href: "#tab_" + index,
                class: "mdl-layout__tab",
            });
            h.root.find("header-tabs").insert(tabHeader);
        });
    },

    prepareContentTabs: function(tabs) {
        var h = this;

        h.root.find("contents").update();

        tabs.forEach(function(tab, index) {
            var tabContent = $_element({
                $_tag: "section", class: "mdl-layout__tab-panel", id: "tab_" + index,
                style: "position:absolute; height:100%; width:100%;"
            });
            h.root.find("contents").insert(tabContent);
        });
    },

    prepareRoot: function() {
        var h = this;

        var json = {
            $_tag: "div", 
            class: "mdl-layout mdl-js-layout mdl-layout--fixed-header",
            $_append: [{
                $_tag: "header", class: "mdl-layout__header", id: "header",
                $_append: [{
                    $_tag: "div", class: "mdl-layout__header-row",
                    $_append: [{
                        $_tag: "span", class: "mdl-layout-title", id: "title",
                        $_append: h.title
                    }, {
                        $_tag: "div",
                        class: "mdl-layout-spacer",
                    }, {
                        $_tag: "nav",
                        id: "buttons",
                        class: "mdl-navigation mdl-layout--large-screen-only",
                    }]
                }]
            }, {
                $_tag: "main", class: "mdl-layout__content", 
                id: "contents",
                style: "position:relative"
            }]
        };

        return $_element(json);
    },
    
    setButtons: function(buttons) {
    	var h = this;

    	buttons.forEach(function(button) {
	    	h.root.find("buttons").insert($_element({
	            $_tag: "button",
	            class: "mdl-button mdl-js-button mdl-button--icon",
	            $_on: {
	            	"click": function(e) {
	            		alert(e);
	            	}
	            },
	            $_append: [{
	                $_tag: "a",
	                class: "mdl-navigation__link",
	                href: "",
	                $_append: [{
	                    $_tag: "i",
	                    class: "material-icons",
	                    $_append: button.icon
	                }]
	            }]
	        }));
    	});
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
        bardia.oop.Class.extend(this, config || {});
        
        this.render();
    },
    /**
     *
     */
    render: function() {
        var h = this;
        
        h.inside.update();
        
        h.panel = new bardia.layout.Panel({
            inside: h.inside,
            title: "Grid"
        });

        h.root = $_element({
            $_tag: "div",
            class: "grid-content",
            $_append: [{
                $_tag: "div",
                class: "grid-headers",
                id: "grid-headers",
                $_append: h.columns.map(function(column) {
                    return {
                        $_tag: "div",
                        class: "grid-header",
                        $_append: column.name
                    }
                })
            }, {
                $_tag: "div",
                class: "grid-rows",
                id: "grid-rows"
            }, {
                $_tag: "div",
                class: "grid-curtain",
                id: "grid-curtain",
                $_on: {
                    "click": function() {
                        h.closeDetails();
                    }
                },
                $_append: [{
                    $_tag: "div",
                    class: "grid-details-right",
                    id: "grid-details-right"
                }]
            }]
        });

        h.panel.getContent().insert(h.root);

        $_upgradeElement(h.root);
    },

    fetch(model) {
        var h = this;
        
        var rowsDiv = h.root.find("grid-rows");
        rowsDiv.update();

        (model.rows || []).forEach(function(row) {
            var rowDiv = $_element({
                $_tag: "div",
                class: "grid-row",
                $_on: {
                    "click": function(e) {
                        h.openDetails();
                    }
                }
            });
            rowsDiv.insert(rowDiv);
            
            $_upgradeElement(rowDiv);

            h.columns.forEach(function(column) {
                rowDiv.insert($_element({
                    $_tag: "td",
                    class: "grid-cell",
                    $_append: row[column.property]
                }));
            });
        });
    },
    
    openDetails: function() {
        var h = this;

        h.root.find("grid-curtain").dom().style.width = "100%";
        h.root.find("grid-details-right").dom().style.width = h.detailsWidth;
    },
    
    closeDetails: function() {
        var h = this;

        h.root.find("grid-curtain").dom().style.width = "0px";
        h.root.find("grid-details-right").dom().style.width = "0px";
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
            title: "Insert title here ..."
        }, config));

        this.render();
    },

    render: function() {
        var h = this;

        h.inside.update();

        h.panel = new bardia.layout.Panel({
            inside: h.inside,
            title: h.title
        });

        h.prepareRoot();
    },

    prepareRoot: function() {
        var h = this;

        h.root = $_element({
            $_tag: "div",
            class: "form-content",
        });

        h.fields.forEach(function(field) {
            var _field = bardia.oop.Class.extend({
                type: "Text"
            }, field);

            var formField = eval("new bardia.form." + _field.type + "Field(_field)");

            formField.setForm(h);
            
            h.root.insert(formField.getElement());
        });
        
        var curtain = $_element({
            $_tag: "div",
            class: "form-curtain",
            id: "form-curtain",
            $_on: {
                "click": function() {
                    h.closeDetails();
                }
            },
            $_append: [{
                $_tag: "div",
                class: "form-details-right",
                id: "form-details-right"
            }]
        });

        h.root.insert(curtain);
        $_upgradeElement(h.root);

        h.panel.getContent().insert(h.root);
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
        return this.bean;
    },
    
    openDetails: function(width) {
        var h = this;

        h.root.find("form-curtain").dom().style.width = "100%";
        h.root.find("form-details-right").dom().style.width = width || h.detailsWidth;

        return h.root.find("form-details-right");
    },
    
    closeDetails: function() {
        var h = this;

        h.root.find("form-curtain").dom().style.width = "0px";
        h.root.find("form-details-right").dom().style.width = "0px";
    }
});
bardia.form.TextField = bardia.oop.Class.create({

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ...",
            pattern: ".+",
            required: config.required || false
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
                id: h.property,
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
        var bean = h.form.getBean();
        
        eval("bean." + h.property + " = value");
    },

    updateInputValue: function(bean) {
        var h = this;
        h.root.find(h.property).dom().value = eval("bean." + h.property + " || ''");
    },

    setForm: function(form) {
        var h = this;
        h.form = form;
        h.form.addBeanChangedListener(function(bean) {
            h.updateInputValue(bean);
        });
    }
});
bardia.form.DateField = bardia.oop.Class.create({

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ..."
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
                id: h.property,
                $_on: {
                    change: function(e) {
                        h.updateBeanProperty(e.target.value);
                    }
                }
            }, {
                $_tag: "label",
                class: "form-text-input-label",
                "for": h.property,
                $_append: "Data"
            }, {
                $_tag: "button",
                class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
                $_on: {
                    click: function(e) {
                        h.form.openDetails("300px");
                    }
                },
                $_append: [{
                    $_tag: "i",
                    class: "material-icons",
                    $_append: "reorder",
                }]
            }]
        });
    },
    
    getElement: function() {
        var h = this;
        return h.root;
    },
    
    updateBeanProperty: function(value) {
        var h = this;
        var bean = h.form.getBean();
        
        eval("bean." + h.property + " = value");
    },
    
    updateInputValue: function(bean) {
        var h = this;
        h.root.find(h.property).dom().value = eval("bean." + h.property + " || ''");
    },
    
    setForm: function(form) {
        var h = this;
        h.form = form;
        h.form.addBeanChangedListener(function(bean) {
            h.updateInputValue(bean);
        });
    }
});
/**
 * 
 */
bardia.form.LookupField = bardia.oop.Class.inherit(bardia.form.TextField, {

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ... 2"
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
                id: h.property,
                $_on: {
                    change: function(e) {
                        h.updateBeanProperty(e.target.value);
                    }
                }
            }, {
                $_tag: "label",
                class: "form-text-input-label",
                "for": h.property,
                $_append: "Lookup"
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
                    var element = h.form.openDetails("300px");
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
    }
});