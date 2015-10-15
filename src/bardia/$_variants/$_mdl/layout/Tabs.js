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

        h.tabs.forEach(function(tab) {
        	h.addItem(tab);
        });
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
    	
    	h.selectItem(headerLink);
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