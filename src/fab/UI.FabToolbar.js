/**
 * @class UI.FabToolbar
 */
UI.FabToolbar = Class.create({
	/**
	 * @constructor
	 * @param config
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            orientation: "right",
            buttons: [
            ],
            onClicked: function() {
            	
            }
        }, config || {});

        this.render();
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;
    	
    	h.material = new Element("DIV", {
    	});

    	h.material.setStyle({
    		display: "flex",
    		flexDirection: (h.config.orientation=="right")?"row-reverse":"row",
    		textAlign: "right",
    		border: "1px solid lightGrey",
    		borderWidth: "1px 0px 0px 0px"
    	});

    	h.config.inside.insert({
    		top: h.material
    	});

    	h.setButtons(h.config.buttons);
    },
    /**
     * @method setButtons
     * @param buttons
     */
    setButtons: function(buttons) {
    	var h = this;
    	
    	h.material.update();
    	
    	h.hashedFabs = new Hash();

    	var i=0;
    	for (i=0; i<buttons.length; i++) {

    		var button = buttons[i];
    		
        	if (button.access !== undefined && button.access != UI.VISIBLE) {
        		continue;
        	}

    		var fab = new UI.Fab({
    			inside: h.material,
    			icon: buttons[i].icon,
    			title: buttons[i].title,
    			text: buttons[i].text,
    			fill: buttons[i].fill,
    			access: button.access,
    			onClick: function(fab) {
    				fab.onClick();
    				h.config.onClicked();
    			}
    		});
    		fab.onClick = button.onClick;

    		h.hashedFabs.set(buttons[i].id, fab);
    	}    	
    },
    hide: function() {
    	var h = this;
    		h.hideOrShow(false);
    },
    show: function() {
    	var h = this;
    		h.hideOrShow(true);
    },
    /** 
     * @param display
     */
    hideOrShow: function(display) {
    	var i=0;
    	for (i=0; i<this.hashedFabs.keys().length; i++) {
    		var fab = this.hashedFabs.get(this.hashedFabs.keys()[i]);
    			if (!display) {
    				fab.getMaterial().hide();
    			} else {
    				fab.getMaterial().show();
    			}
    	}
    }
});