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
            if (attr.indexOf("$_") != 0) {
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