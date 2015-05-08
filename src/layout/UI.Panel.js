/**
 * @class UI.Panel
 */
UI.Panel = Class.create(UI.MaterialComponent, {
	/**
	 * 
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

    	this.content = new UI.Content({
    		inside: h.getMaterial()
    	});
        
    	this.header = new UI.Header({
    		inside: h.getMaterial(),
    		title: h.config.title,
    		className: h.config.className
    	});
    },
    /**
     * 
     */
    getContent: function() {
    	return this.content.getMaterial();
    }
});
