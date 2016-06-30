
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

    	h.root.find(h.id("toolbar")).update();

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

    	h.root.find(h.id("toolbar")).insert(h.title || "");
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
        		class: "panel-top panel-bg",
        		$_append: h.title
        	}, {
        		$_tag: "div",
        		class: "panel-content",
        		id: h.id("contents"),
        		$_append: []
        	}]
        });
        
        h.root.insert($_element({
            $_tag: "div",
            class: "panel-details-right",
            id: h.id("panel-details-right"),
            $_on: {
                "click": function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            },
        }));
    },
    
    id: function(name) {
    	return this.serial + name;
    },
    
    openDetails: function(width) {
        var h = this;

        h.detailsWidth = width || h.detailsWidth;
        
        h.root.find(h.id("panel-details-right")).addClassName("is-active");
        h.root.find(h.id("panel-details-right")).dom().style.left = "0px";
        h.root.find(h.id("panel-details-right")).dom().style.width = h.detailsWidth;
        
        var result = h.root.find(h.id("panel-details-right"));
        	result.update();

        return result;
    },
    
    closeDetails: function() {
        var h = this;
        
        h.root.find(h.id("panel-details-right")).removeClassName("is-active");
        h.root.find(h.id("panel-details-right")).dom().style.left = "-" + h.detailsWidth;
    },
    
    setTitle: function(title) {
    	var h = this;
    	h.title = title;

    	h.setButtons();
    }
});