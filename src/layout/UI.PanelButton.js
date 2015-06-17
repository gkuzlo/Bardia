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
            fill: "black",
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
    	
    	h.buttonDiv.setStyle({
    		backgroundColor: h.config.fill 
    	});
    	
    	h.img = new Element("IMG", {
    		src: $ICON(h.config.icon),
    		title: h.config.title
    	});
    	h.buttonDiv.insert(h.img);
    	
    	h.buttonDiv.on("click", function(e) {
    		if (h.config.onClick) {
    			h.config.onClick();
    		}
    	});
    }
});