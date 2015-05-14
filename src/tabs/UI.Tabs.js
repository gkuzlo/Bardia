UI.Tabs = Class.create(UI.MaterialComponent, {

    initConfig: function(config) {
        this.config = Object.extend({
        	type: "toolbar"
        }, config || {});
    },

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

    addTab: function(tab) {
    	var h = this;

	    	h.addCard(tab);
	    	h.toolbar.addItem(tab);
    }
});