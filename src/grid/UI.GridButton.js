/**
 * @class UI.GridButton
 */
UI.GridButton = Class.create({
	/**
	 * 
	 * @param config
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            title: "..."
        }, config || {});

        this.render();
    },
    /**
     * @method render
     */ 
    render: function() {
    	var h = this;
    	
    	h.buttonDiv = new Element("DIV", {
    		style: "border-radius:50%; width:26px; height:26px; line-height:26px; background-color:#525070; margin:2px; display:flex; justify-content:center; align-items:center",
    		class: "hvr-radial-out"
    	});
    	h.config.inside.insert(h.buttonDiv);
    	
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