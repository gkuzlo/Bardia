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
            ]
        }, config || {});

        this.render();
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;

    	h.config.inside.setStyle({
    		position: "absolute",
    		left: "0px",
    		display: "flex",
    		flexDirection: (h.config.orientation=="right")?"row-reverse":"row",
    		backgroundColor: "transparent",
    		textAlign: "right",
    		border: "1px solid lightGrey",
    		borderWidth: "1px 0px 0px 0px"
    	});

    	h.setButtons(h.config.buttons);
    },
    /**
     * @method setButtons
     * @param buttons
     */
    setButtons: function(buttons) {
    	var h = this;
    	
    	h.config.inside.update();
    	
    	h.hashedFabs = new Hash();

    	var i=0;
    	for (i=0; i<buttons.length; i++) {

    		var button = buttons[i];
    		
    		var fab = new UI.Fab({
    			inside: h.config.inside,
    			icon: buttons[i].icon,
    			title: buttons[i].title,
    			text: buttons[i].text,
    			fill: buttons[i].fill,
    			onClick: function(fab) {
    				fab.onClick();
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