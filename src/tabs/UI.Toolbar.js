/**
 * 
 */
UI.Toolbar = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
    initConfig: function(config) {
        this.config = Object.extend({
        	orientation: "vertical"
        }, config || {});
    },
    /**
     * 
     */
    render: function() {
        var h = this;

    	h.content = new Element("DIV", {
    		style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px;",
    		class: "toolbar_bg"
    	});

    	h.getMaterial().update(h.content);

    	if (h.config.orientation == "vertical") {
    		h.renderItemsVertically();
    	} else {
    		h.renderItemsHorizontally();
    	}
    },
    /**
     * 
     */
    renderItemsVertically: function() {
    	var h = this;

    	var i=0;
    	for (i=0; i<h.config.items.length; i++) {
    		var t = h.config.items[i];
    		
        	if (t.access !== undefined && t.access != UI.VISIBLE) {
        		continue;
        	}
    		
    		var item = new Element("DIV", {
    			style: "padding-left:15px; font-size:14px; border-bottom: 1px solid #1E1D29; line-height:70px; height:70px; overflow:hidden",
    			class: "toolbar_bg"
    		});
    		item.onClick = h.config.items[i].onClick;

    		item.update(h.config.items[i].name);
    		item.title = h.config.items[i].description;

			item.on("click", function(e) {
				setTimeout(function() {
					h.displayMarkerVertically(e.target);	
				}, 0);
				if (e.target.onClick !== undefined) {
					e.target.onClick(t);
				}
			});

    		h.content.insert(item);
    		
    		if (i == 0) {
    			item.click();
    		}
    	}
    },
    /**
     * 
     */
    renderItemsHorizontally: function() {
    	var h = this;

    	var i=0;
    	for (i=0; i<h.config.items.length; i++) {
    		var t = h.config.items[i];
    		
        	if (t.access !== undefined && t.access != UI.VISIBLE) {
        		continue;
        	}
    		
    		var item = new Element("DIV", {
    			style: "padding-left:15px; font-size:14px; padding-right:15px; display:inline-block; border-right:1px solid #1E1D29; line-height:70px; height:70px; overflow:hidden",
    			class: "toolbar_bg"
    		});
    		item.bean = t;
    		item.onClick = h.config.items[i].onClick;

    		item.update(h.config.items[i].name);
    		item.title = h.config.items[i].description;

			item.on("click", function(e) {
				setTimeout(function() {
					h.displayMarkerHorizontally(e.target);	
				}, 0);
				if (e.target.onClick !== undefined) {
					e.target.onClick(e.target.bean);
				}
			});

    		h.content.insert(item);
    		
    		if (i == 0) {
    			item.click();
    		}
    	}
    },
    /**
     * 
     */
    displayMarkerVertically: function(html) {
    	var h = this;

    	var containerTop = h.content.getBoundingClientRect().top;

    	if (h.marker === undefined) {
    		h.marker = new Element("DIV", {
    			style: "position:absolute; opacity:0.0; width:5px; top: " + (html.getBoundingClientRect().top - containerTop) + "px; height:" + (html.getBoundingClientRect().height - 1) + "px;",
    			class: "toolbar_marker_bg"
    		});
    		h.content.insert(h.marker);
    		
    		var player = h.marker.animate([
	     		    {
	     		    	opacity: "0.0"
	     		    },
	     		    {
	     		    	opacity: "1.0"
	     		    },
	     		], {
	     			direction: 'normal',
	     		    duration: 1000,
	     		    easing: "ease",
	     			iterations: 1,
	     			fill: "both"
		   		});
    	} else {
			var player = h.marker.animate([
	  		    {
	  		       top: (h.marker.getBoundingClientRect().top - h.marker.getBoundingClientRect().height + 1) + "px"
	  		    },
	  		    {
	   		       top: (html.getBoundingClientRect().top - html.getBoundingClientRect().height + 1) + "px"
	  		    },
	  		], {
	  			direction: 'normal',
	  		    duration: 1000,
	  		    easing: "ease",
	  			iterations: 1,
	  			fill: "both"
			});
    	}
    },
    /**
     * 
     */
    displayMarkerHorizontally: function(html) {
    	var h = this;

    	var containerLeft = h.content.getBoundingClientRect().left;
    	
    	if (h.marker === undefined) {
    		
    		h.marker = new Element("DIV", {
    			style: "position:absolute; opacity:0.0; top:65px; left:" + (html.getBoundingClientRect().left - containerLeft) + "px; width:" + html.getBoundingClientRect().width + "px; height:5px",
    			class: "toolbar_marker_bg"
    		});
    		h.content.insert(h.marker);
    		
    		var player = h.marker.animate([
	     		    {
	     		    	opacity: "0.0"
	     		    },
	     		    {
	     		    	opacity: "1.0"
	     		    },
	     		], {
	     			direction: 'normal',
	     		    duration: 1000,
	     		    easing: "ease",
	     			iterations: 1,
	     			fill: "both"
		   		});
    	} else {
			var player = h.marker.animate([
	  		    {
	  		       left: (h.marker.getBoundingClientRect().left- containerLeft) + "px",
	  		       width: h.marker.getBoundingClientRect().width + "px"
	  		    },
	  		    {
	   		       left: (html.getBoundingClientRect().left - containerLeft) + "px",
	   		       width: (html.getBoundingClientRect().width - 1) + "px"
	  		    },
	  		], {
	  			direction: 'normal',
	  		    duration: 1000,
	  		    easing: "ease",
	  			iterations: 1,
	  			fill: "both"
			});
    	}
    }
});