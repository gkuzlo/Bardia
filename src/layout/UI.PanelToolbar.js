/**
 * @class UI.PanelToolbar
 */
UI.PanelToolbar = Class.create({
	/**
	 * 
	 * @param config
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            buttons: []
        }, config || {});

        this.render();
    },
    /**
     * @method render 
     */ 
    render: function() {
    	var h = this;

    	h.material = new Element("DIV", {
    		style: "position:absolute; display:flex; flex-direction:row; top:0px; left:0px; right:0px; bottom:0px"
    	});
    	h.config.inside.update(h.material);

    	h.setButtons(h.config.buttons);
    },
    /**
     * 
     * @param buttons
     */
    setButtons: function(buttons) {
    	var h = this;

    	var i = 0;
    	for (i=0; i<buttons.length; i++) {
    		var buttonConfig = buttons[i];
    			buttonConfig.inside = h.material; 

    		var button = new UI.PanelButton(buttonConfig);
    	}
    }
});