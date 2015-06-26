/**
 * @class UI.PanelButton
 */
UI.PanelButton = Class.create({
	/**
	 * 
	 * @param config
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            title: "...",
            icon: "done"
        }, config || {});

        this.render();
    },
    /**
     * @method render
     */ 
    render: function() {
    	var h = this;

    	h.buttonDiv = new Element("DIV", {
    		style: "border-radius:50%; width:26px; height:26px; line-height:26px; margin:2px; display:flex; justify-content:center; align-items:center",
    		class: "panel-button"
    	});
    	h.config.inside.insert(h.buttonDiv);

    	if (h.config.fill) {
	    	h.buttonDiv.setStyle({
	    		backgroundColor: h.config.fill 
	    	});
    	}

    	if (h.config.customIcon !== undefined) {
	    	h.img = new Element("IMG", {
	    		src: h.config.customIcon,
	    		title: h.config.title,
	    		style: "width:18px",
	    	});
	    	h.buttonDiv.insert(h.img);
    	} else if (h.config.icon) {
	    	h.img = new Element("IMG", {
	    		src: $ICON(h.config.icon),
	    		title: h.config.title
	    	});
	    	h.buttonDiv.insert(h.img);
    	}
    	
    	h.buttonDiv.on("click", function(e) {
    		if (h.config.onClick) {
    			h.config.onClick();
    		}
    	});
    }
});