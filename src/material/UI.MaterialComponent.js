/**
 * @class UI.MaterialComponent
 */
UI.MaterialComponent = Class.create({
	/**
	 * @constructor
	 * @param config
	 */
    initialize: function(config) {
		try {
	        this.initConfig(config);
	        this.renderMaterial();
			this.render();
		} catch (e) {
			alert("--------" + e);
		}
    },
    initConfig: function(config) {
    	alert("initConfig() not implemeted");
    },
    renderMaterial: function() {    	
    	var h = this;
    	
			h.material = new Element("DIV", {class: "inside"});
			h.config.inside.insert(h.material);
			
	    	h.material.on("mousedown", function(e) {
				//e.cancelBubble = true;
				e.returnValue = false;
			});
			
	    	h.material.on("click", function(e) {
				//e.cancelBubble = true;
				e.returnValue = false;
			});
    },
    render: function() {
    	alert("render() not implemeted");
    },
    /**
     * @methid getMaterial
     * 
     * Pobranie materiału, na którym będzie wyeysowany komponent
     */
    getMaterial: function() {
    	return this.material;
    },
    /**
     * @method destroy
     */
    destroy: function() {
    	var h = this;
			h.material.remove();
			
			delete h.material;
    }
});