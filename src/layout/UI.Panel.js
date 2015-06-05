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
        	className: "bg_main fg_white"
        }, config || {});
    },
    /**
     * 
     */
    render: function() {
        var h = this;

    	h.content = new UI.Content({
    		inside: h.getMaterial()
    	});
        
    	h.header = new UI.Header({
    		inside: h.getMaterial(),
    		title: h.config.title,
    		className: h.config.className
    	});
    },
    /**
     * 
     * @returns
     */
    getContent: function() {
    	return this.content.getMaterial();
    },
    /**
     * 
     * @param title
     */
    setTitle: function(title) {
    	var h = this;
    		h.header.setTitle(title);
    }
});
