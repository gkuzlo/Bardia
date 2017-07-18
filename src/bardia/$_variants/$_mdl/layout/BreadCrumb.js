bardia.layout.BreadCrumb = bardia.oop.Class.create({
    
    initialize: function(config) {
    	bardia.oop.Class.extend(this, bardia.oop.Class.extend({
    		tabs: [],
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
    		
        	wrappedElement.previousItem = h.lastItem; 
    	}

    	h.removeAllNextItems(wrappedElement);

    	h.lastItem = wrappedElement;

    	wrappedElement.addClassName("is-active");
    	wrappedElement.content.addClassName("is-active");

		if (wrappedElement.tab.onActivate && !wrappedElement.activated) {
			wrappedElement.activated = true;
			wrappedElement.tab.onActivate(wrappedElement.content, wrappedElement);
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
    
    removeLastItem: function() {
    	var h = this;
    	
    	if (h.lastItem && h.lastItem.previousItem) {
    		h.removeAllNextItems(h.lastItem.previousItem);
    	}
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