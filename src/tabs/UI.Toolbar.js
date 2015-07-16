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

	    		if (t.title) {
	    			item.title = t.title;
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
	    		item.title = t.description;
	
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
    		item.title = h.config.items[i].description;

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