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
    		style: "position:absolute; top:0px; left:0px; right:0px; height:60px; display:flex; flex-direction:row-reverse; background-color:rgba(200, 200, 200,0.1); ",
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

    	h.fabs = [];

    	buttons
	    	.filter(function(button) {
	    		return !(button.access !== undefined && button.access != UI.VISIBLE)
	    	})
	    	.forEach(function(button) {
	        	var conf = Object.extend({}, button);
	        		conf.inside = h.material;
	        		conf.onClick = function() {
	        			button.onClick(fab);
	        			h.config.onClicked(fab);
	        		};

	    		var fab = new UI.Fab(conf);

	    		h.fabs.push(fab);
	    	});
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
    	var h = this;

    	h.fabs.forEach(function(fab) {
			if (!display) {
				fab.hide();
			} else {
				fab.show();
			}
    	});
    }
});
