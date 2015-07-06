/**
 * @class UI.Panel
 */
UI.Panel = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 * @param config
	 */
    initConfig: function(config) {
        this.config = Object.extend({
        }, config || {});
    },
    /**
     * 
     */
    render: function() {
        var h = this;

        if (h.config.title || h.config.buttons) {
			h.mainLayout = new UI.BorderLayout({
				inside: h.getMaterial(),
				north: {
					height: 59
				}
			});
			
			h.material = new Element("DIV", {
				style: "position:absolute; top:0px; right:0px; top:0px; bottom:0px; left:0px",
				class: "panel-header"
			});
			h.mainLayout.getNorth().insert(h.material);
			h.material.title = h.config.title;

			h.toolbarDiv = new Element("DIV", {
				style: "position:absolute; top:15px; height:30px; left:10px; background-color:transparent; width:100%;",
				class: "panel-toolbar"
			});
			h.material.insert(h.toolbarDiv);

			h.toolbar = new UI.PanelToolbar({
				inside: h.toolbarDiv,
				buttons: h.config.buttons || []
			});
        } else {
			h.mainLayout = new UI.BorderLayout({
				inside: h.getMaterial()
			});
        }
    },
    /**
     * 
     * @returns
     */
    getContent: function() {
    	var h = this;
    	return h.mainLayout.getDefault();
    },
    /**
     * 
     * @param title
     */
    setTitle: function(title) {
    	var h = this;
    		h.material.title = title;
    }
});
