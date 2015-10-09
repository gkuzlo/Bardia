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