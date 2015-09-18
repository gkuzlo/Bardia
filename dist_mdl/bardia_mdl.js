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
        
        this.domNode = document.createElement(jsonRoot.$tag);
        this.domNode.wrapper = this;

        for (attr in jsonRoot) {
            if (!attr.startsWith("$")) {
                this.domNode.setAttribute(attr, jsonRoot[attr]);
            }
        }

        if (jsonRoot.$children && jsonRoot.$children.forEach) {
            jsonRoot.$children.forEach(function(child) {
                h.createSubElement(child);
            });
        } else if (jsonRoot.$children) {
            this.domNode.innerHTML = jsonRoot.$children;
        }
        
        if (jsonRoot.$on) {
            for (eventName in jsonRoot.$on) {
                this.domNode.addEventListener(eventName, jsonRoot.$on[eventName]);
            }
        }
    },

    createSubElement: function(jsonSubElement) {
        var subElement = new bardia.dom.Element(jsonSubElement);
        alert(subElement);
        this.insert(subElement);
    },
    
    insert: function(subElement) {
        try {
            this.domNode.appendChild(subElement.getDomNode());
            this.children.push(subElement);
        } catch (e) {
            alert("insert: subElement=" + subElement);
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
$element = (function() {

    function create(jsonRoot) {
        return new bardia.dom.Element(jsonRoot);
    }

    return create;
    
})();

$materialize = (function() {
    function materialize(root) {
        componentHandler.upgradeElement(root);
        (root.children || []).forEach(function(node) {
            $materialize(node.getDomNode());
        });
    }
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
                $tag: "div",
                class: "border-layout-north",
                style: "height:" + centerTop + "px; background-color:" + (h.config.north.fill || "transparent")
            }

            this.config.inside.insert($element(north));
        }
        
        if (this.config.south !== undefined) {
            centerBottom = this.config.south.height || 50;

            var south = {
                $tag: "div",
                class: "border-layout-south",
                style: "height:" + centerBottom + "px; background-color:" + (h.config.south.fill || "transparent")
            };
            
            this.config.inside.insert($element(south));
        }
        
        if (this.config.west !== undefined) {
            centerLeft = this.config.west.width || 50;
            
            h.west = $element({
                $tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + centerLeft + "px; bottom:" + centerBottom + "px; background-color:" + (h.config.west.fill || "transparent")
            });

            h.config.inside.insert(h.west);
        }
        
        if (this.config.east !== undefined) {
            centerRight = this.config.east.width || 50;

            h.east = $element({
                $tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.config.east.fill || "transparent")
            });

            this.config.inside.insert(h.east);
        }

        h.center = $element({
            $tag: "div",
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

        $materialize(h.root);
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
            header.insert($element({
                $tag: "div", 
                class: "mdl-layout__tab-bar mdl-js-ripple-effect", 
                id: "header-tabs",
            }));
        }

        tabs.forEach(function(tab, index) {
            var tabHeader = $element({
                $tag: "a",
                $children: tab.name,
                $on: {
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

//            tabHeader.on("click", function(e) {
//                if (tab.onActivate) {
//                    tab.onActivate(h.root.findById("tab_" + index));
//                }
//            });
        });
    },
    
    prepareContentTabs: function(tabs) {
        var h = this;

        h.root.findById("contents").update();

        tabs.forEach(function(tab, index) {
            var json = {
                $tag: "section", class: "mdl-layout__tab-panel", id: "tab_" + index,
                style: "position:absolute; height:100%; width:100%;"
            }
            var tabContent = $element(json);
            h.root.findById("contents").insert(tabContent);
        });
    },
    
    prepareRoot: function() {
        var h = this;

        var json = {
            $tag: "div", class: "mdl-layout mdl-js-layout mdl-layout--fixed-header",
            $children: [{
                tag: "header", class: "mdl-layout__header", id: "header",
                $children: [{
                    $tag: "div", class: "mdl-layout__header-row",
                    $children: [{
                        $tag: "span", class: "mdl-layout-title", id: "title",
                        $children: h.config.title
                    }]
                }]
            }, {
                $tag: "div", class: "mdl-layout__drawer",
                $children: [{
                    tag: "span", class: "mdl-layout-title",
                    $children: h.config.title,
                }]
            }, {
                $tag: "main", class: "mdl-layout__content", id: "contents",
                style: "position:relative"
            }]
        };

        return $element(json);
    }
});
