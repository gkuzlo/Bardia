
bardia.layout.Panel = bardia.oop.Class.create({

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            title: "Insert title here ...",
            serial: "S_" + (Math.random()*1000000).toFixed(0),
            color: "white"
        }, config));

        this.render();
    },

    render: function() {
        var h = this;

        h.prepareRoot();
        h.inside.update(h.root);

        h.setButtons(h.buttons);
    },

    setButtons: function(buttons) {
    	var h = this;

    	h.buttons = buttons;
    	h.btnElements = [];

    	h.root.find(h.id("toolbar")).update();

    	if (h.buttons) {
    		h.buttons.forEach(function(button, index) {    			    		
    			var btn = $_element({
    				$_tag: "button",
    				class: "mdl-button mdl-js-button mdl-button--icon",
					style: "margin-right:" + ((index == h.buttons.length-1)?10:0) + "px; color:" + (button.color || h.color),
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
    			});
    			
    			if (button.access != undefined && button.access != null && button.access != bardia.VISIBLE) {
    				btn.setStyle({
    					display: "none"
    				});
    			}
    			
    			h.root.find(h.id("toolbar")).insert(btn);
    			h.btnElements.push(btn);
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
        		id: h.id("contents")
        	}]
        });

        h.root.insert($_element({
            $_tag: "div",
            class: "panel-animated",
            style: "position:absolute; top:0px; left:0px; bottom:0px; width:0px; background-color:transparent",
            id: h.id("panel-details-curtain"),
            $_on: {
                "click": function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            },
        }));
        
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

        h.lock = $_element({
    		$_tag: "div",
    		id: "lock_sheet",
    		style: "position:absolute; top:47px; left:0px; right:16px; bottom:0px; display:none; background:transparent",
    		$_append: [{
    			$_tag: "div",
    			style: "position:absolute; top:50px; right:50px; line-height:30px; height:30px; display:flex; flex-direction:row-reverse",
    			$_append: [{
					$_tag: "i",
					class: "material-icons",
					style: "color:red; line-height:30px;",
					$_append: "lock"
				}, {
					$_tag: "div",
					style: "background:rgba(255,255,255,0.7); margin-right:10px; border-radius:10px; line-height:30px; border:1px solid grey; padding:0px 10px 0px 10px;",
					id: h.id("lock_description")
				}]
    		}]
    	});
        h.root.insert(h.lock);

        h.root.insert($_element({
        	$_tag: "div",
        	class: "bardia-progress",
        	id: h.id("panel-progress"),
        	$_append: [{
        		$_tag: "div",
        		class: "bardia-progress-label-container",
        		$_append: [{
            		$_tag: "div",
            		class: "material-icons bardia-progress-icon",
            		$_append: "replay"
            	}, {
            		$_tag: "div",
            		id: h.id("panel-progress-label"),
            		class: "bardia-progress-label"
            	}]
        	}]
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

        h.root.find(h.id("panel-details-curtain")).dom().style.width = "100%";
        h.root.find(h.id("panel-details-curtain")).dom().style.backgroundColor = "rgba(0,0,0,0.6)";

        var result = h.root.find(h.id("panel-details-right"));
        	result.update();

        return result;
    },
    
    closeDetails: function() {
        var h = this;

        h.root.find(h.id("panel-details-right")).removeClassName("is-active");
        h.root.find(h.id("panel-details-right")).dom().style.left = "-" + h.detailsWidth;
        
        h.root.find(h.id("panel-details-curtain")).dom().style.width = "0px";
        h.root.find(h.id("panel-details-curtain")).dom().style.backgroundColor = "transparent";
    },

    setTitle: function(title) {
    	var h = this;
    	h.title = title;

    	h.setButtons();
    },

    getButton: function(index) {
    	var h = this;

    	if (h.btnElements.length > index) {
    		return h.btnElements[index];	
    	}
    	return null;
    },

    blinkButton: function(index, color) {
    	var h = this;

    	var buttonElement = h.getButton(index);
    	if (null !== buttonElement) {
    		h.oldColor = buttonElement.dom().style.color; 
    		buttonElement.setStyle({
    			color: color
    		});
    		buttonElement.addClassName("panel-button-blinked");
    	}
    	return buttonElement;
    },
    
    unblinkButton: function(index) {
    	var h = this;

    	var buttonElement = h.getButton(index);
    	if (null !== buttonElement) {
    		buttonElement.setStyle({
    			color: h.oldColor
    		});
    		buttonElement.removeClassName("panel-button-blinked");
    	}
    	return buttonElement;
    },
    
    hideButton: function(index) {
    	var h = this;
    	var buttonElement = h.getButton(index);
    	if (null !== buttonElement) {
    		buttonElement.setStyle({
    			display: "none"
    		});
    	}
    	return buttonElement;
    },

    showButton: function(index) {
    	var h = this;
    	var buttonElement = h.getButton(index);
    	if (null !== buttonElement) {
    		buttonElement.setStyle({
    			display: "block"
    		});
    	}
    	return buttonElement;
    },

    lockPanel: function(icon, message) {
    	var h = this;

    	h.lock.setStyle({
    		display: "block",
    		background: "rgba(0,0,0,0.2)"
    	}); 
    	
    	h.lock.find(h.id("lock_description")).update((message || "no_lock_message"));
    },

    openProgress: function(message) {
    	var h = this;
    	h.root.find(h.id("panel-progress")).addClassName("bardia-progress-is-active");
    	h.root.find(h.id("panel-progress-label")).update((message || "..."));
    },

    closeProgress: function() {
    	var h = this;
    	h.root.find(h.id("panel-progress")).removeClassName("bardia-progress-is-active");
    },
    
    updateProgress: function(message) {
    	var h = this;
    	h.root.find(h.id("panel-progress-label")).update((message || "..."));
    }
});