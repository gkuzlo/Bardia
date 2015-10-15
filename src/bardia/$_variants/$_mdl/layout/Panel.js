/**
 *
 */
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
        		class: "panel-top panel-bg"
        	}, {
        		$_tag: "div",
        		class: "panel-content",
        		id: h.id("contents")
        	}]
        });
    },
    
    id: function(name) {
    	return this.serial + name;
    }
});