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
        
    return {
        create: create,
    };
    
})();

bardia.dom = {

};
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
                this.domNode.appendChild(subElement.getDomNode());
                this.children.push(subElement);
            }
        } catch (e) {
            alert("insert: subElement=" + subElement + " " + e);
        }
    },

    update: function(element) {
        this.children.splice(0, this.children.length);

        while (this.domNode.childNodes.length > 0) {
            this.domNode.removeChild(this.domNode.childNodes[0]);
        }

        this.insert(element);
    },

    getDomNode: function() {
        return this.domNode;
    },

    findById: function(id) {
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
$_element = (function() {

    function create(jsonRoot) {
        return new bardia.dom.Element(jsonRoot);
    }

    return create;
    
})();

/**
 *
 */
$_materialize = (function() {
    
    function materialize(root) {
        componentHandler.upgradeElement(root.getDomNode());
        (root.children || []).forEach(function(node) {
            $_materialize(node);
        });
    }

    return materialize;
})();
bardia.layout = {
}

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
bardia.layout.Panel = bardia.oop.Class.create({
    
    initialize: function(config) {
        this.config = config;
        this.render();
    },
    
    render: function() {
        var h = this;

        h.root = h.prepareRoot();
        h.config.inside.update(h.root);

        h.setTabs(h.config.tabs);

        $_materialize(h.root);
    },
    
    getContent: function() {
    	return this.root.findById("contents");
    },
    
    setTitle: function(title) {
    	this.root.findById("title").update(title);
    },
    
    setTabs: function(tabs) {
        var h = this;

        if (!tabs) return;

        h.prepareHeaderTabs(tabs);
        h.prepareContentTabs(tabs);
    },
    
    prepareHeaderTabs: function(tabs) {
        var h = this;
        
        if (h.root.findById("header-tabs") !== null) {
            h.root.findById("header-tabs").update();
        } else {
            var header = h.root.findById("header")
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
                        if (tab.onActivate) {
                            tab.onActivate(h.root.findById("tab_" + index));
                        }
                    }
                },
                href: "#tab_" + index,
                class: "mdl-layout__tab",
            });
            h.root.findById("header-tabs").insert(tabHeader);
        });
    },

    prepareContentTabs: function(tabs) {
        var h = this;

        h.root.findById("contents").update();

        tabs.forEach(function(tab, index) {
            var tabContent = $_element({
                $_tag: "section", class: "mdl-layout__tab-panel", id: "tab_" + index,
                style: "position:absolute; height:100%; width:100%;"
            });
            h.root.findById("contents").insert(tabContent);
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
                        $_append: h.config.title
                    }]
                }]
            }, {
                $_tag: "div", class: "mdl-layout__drawer",
                $_append: [{
                    $_tag: "span", class: "mdl-layout-title",
                    $_append: h.config.title,
                }]
            }, {
                $_tag: "main", class: "mdl-layout__content", 
                id: "contents",
                style: "position:relative"
            }]
        };

        return $_element(json);
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

        h.root = $_element({
            $_tag: "table",
            class: "mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp",
            $_append: [{
                $_tag: "thead",
                $_append: [{
                    $_tag: "tr",
                    $_append: [{
                        $_tag: "th",
                        class: "mdl-data-table__cell--non-numeric",
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
                        $_append: "Ania"
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
        
        $_materialize(h.root);        

        /*
<ul class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect"
    for="demo-menu-top-left">
  <li class="mdl-menu__item">Some Action</li>
  <li class="mdl-menu__item">Another Action</li>
  <li disabled class="mdl-menu__item">Disabled Action</li>
  <li class="mdl-menu__item">Yet Another Action</li>
</ul>
*/
    }
});