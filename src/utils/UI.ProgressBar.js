/**
 * 
 */
UI.ProgressBar = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
    initConfig: function(config) {
        this.config = Object.extend({
        	orientation: "horizontal",
        	totalColor: "black",
        	doneColor: "green"
        }, config || {});
    },
    /**
     * 
     */
    render: function() {
        var h = this;

    	h.percentageInfo = new Element("DIV", {
    		style: "font-size:12px; position:absolute; top:50%; margin-top:-35px; right:10px; height:15px; color:" + h.config.totalColor
    	});
    	
    	h.label = new Element("DIV", {
    		style: "font-size:12px; position:absolute; top:50%; margin-top:-35px; left:10px; height:15px; color:" + h.config.totalColor
    	});
        
    	h.total = new Element("DIV", {
    		style: "position:absolute; top:50%; left:10px; margin-top:-5px; right:10px; height:10px; background-color:" + h.config.totalColor
    	});
    	
    	h.done = new Element("DIV", {
    		style: "position:absolute; top:50%; left:10px; margin-top:-5px; width:0px; height:10px; background-color:" + h.config.doneColor
    	});

    	h.getMaterial().insert(h.label);
    	h.getMaterial().insert(h.percentageInfo);
    	h.getMaterial().insert(h.total);
    	h.getMaterial().insert(h.done);
    },
    /**
     * 
     */
    setProgress: function(p) {
    	var h = this;

    	var progress = 0;
    	try {
    		progress = Math.max(0, Math.min(100, parseInt(p)));
    	} catch (e) {
    		progress = 10;
    	}

    	var width = h.total.getBoundingClientRect().right - h.total.getBoundingClientRect().left;    	
    	var newWidth = ((width * progress) / 100).toFixed(0);
    	
		h.percentageInfo.update(progress + " %");
    	
		var player = h.done.animate([
 		    {
 		       width: (h.done.getBoundingClientRect().right - h.done.getBoundingClientRect().left) + "px"
 		    },
 		    {
  		       width: newWidth + "px"
 		    },
 		], {
 			direction: 'normal',
 		    duration: 3000,
 		    easing: "ease",
 			iterations: 1,
 			fill: "both"
		});
    },
    /**
     * 
     */
    setLabel: function(label) {
    	var h = this;
    	
    	h.label.update(label);;
    },
    /**
     * 
     */
    failure: function() {
    	var h = this;
    		h.total.setStyle({
    			backgroundColor: "red"
    		});
    		h.done.setStyle({
    			backgroundColor: "red"
    		});

    		if (h.config.onFinish) {
    			h.config.onFinish();
    		}
    },
    /**
     * 
     */
    finish: function() {
    	var h = this;	
    		if (h.config.onFinish) {
    			h.config.onFinish();
    		}
    }
});