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
			
			h.mainLayout.getNorth().addClassName("panel-header");
			
			h.material = new Element("DIV", {
				style: "position: absolute; top:0px; right:0px; bottom:0px; left:0px"
			});
			h.mainLayout.getDefault().insert(h.material);

			h.titleDiv = new Element("DIV", {
				style: "transform:scale(1.5); position:absolute; top:5px; left:10px; height:20px; width:300px; -moz-transform-origin: 0 0; font-size:12px",
				class: "panel-title"
			});
			h.mainLayout.getNorth().insert(h.titleDiv);

			h.toolbarDiv = new Element("DIV", {
				style: "transform:scale(0.5); position:absolute; top:25px; height:30px; left:10px; background-color:transparent; width:100%; -moz-transform-origin: 0 0;",
				class: "panel-toolbar"
			});
			h.mainLayout.getNorth().insert(h.toolbarDiv);
			
			h.toolbarDiv.on("mouseover", function(e) {
				h.expandToolbar();
				e.cancelBubble = true;
				e.returnValue = false;
				return false;
			});

			h.mainLayout.getNorth().on("mouseover", function(e) {
				h.expandTitle();
			});

			h.toolbar = new UI.PanelToolbar({
				inside: h.toolbarDiv,
				buttons: h.config.buttons || []
			});

			h.setTitle(h.config.title);
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
    		h.titleDiv.update(title);
    },
    /**
     * @method: expandToolbar
     */
    expandToolbar: function() {
    	var h = this;
    	
    	if (!h.toolbarExpanded && !h.inProgress) {
    		
    		h.inProgress = true;
	    	
    		$PLAY(h.toolbarDiv, [
	    	    {transform: "scale(0.5)"},
	    	    {transform: "scale(1)"}
	    	], function() {
    			delete h.inProgress;
    		});
	    	
	    	$PLAY(h.titleDiv, [
	     	    {transform: "scale(1.5)"},
	     	    {transform: "scale(1)"}
	     	], function() {
    			delete h.inProgress;
    		});
	    	
	    	h.toolbarExpanded = true;
    	}
    },
    /**
     * @method expandTitle 
     */
    expandTitle: function() {
    	var h = this;

    	if (h.toolbarExpanded && !h.inProgress) {

    		h.inProgress = true;

    		$PLAY(h.toolbarDiv, [
	    	    {transform: "scale(1)"},
	    	    {transform: "scale(0.5)"}
	    	], function() {
    			delete h.inProgress;
    		});
	    	
	    	$PLAY(h.titleDiv, [
	     	    {transform: "scale(1)"},
	     	    {transform: "scale(1.5)"}
	     	], function() {
    			delete h.inProgress;
    		});
	    	
	    	delete h.toolbarExpanded;
    	}
    },
});
