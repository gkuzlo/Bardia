UI.IconToolbar = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
	initConfig : function(config) {
		this.config = Object.extend({}, config || {});
	},
	/**
	 * 
	 */
	render : function() {
		var h = this;

    	h.content = new Element("DIV", {
    		style: "position:absolute; overflow:visible; top:0px; left:0px; bottom:0px; right:0px; background-color:#ebf0ee; display:flex; border:1px solid #c9cece; border-width:0px 0px 1px 0px"
    	});
    	
    	h.getMaterial().setStyle({
    		backgroundColor: "#ebf0ee",
    		overflow: "visible"
    	});
    	
    	h.getMaterial().parentElement.setStyle({
    		backgroundColor: "#ebf0ee",
    		overflow: "visible"
    	});

    	h.getMaterial().update(h.content);
    	h.renderItems();
	},
	/**
	 * 
	 */
	renderItems: function() {
    	var h = this;

    	var i=0;
    	for (i=0; i<h.config.items.length; i++) {
    		var itemConfig = h.config.items[i];
    		var item = new Element("DIV", {
    			style: "overflow:hidden; flex:1; line-height:65px; text-align:center; border:0px solid #c9cece; border-width:0px 1px 0px 0px; background-image:url('" + itemConfig.icon + "'); background-repeat:no-repeat; background-position:center center; background-size:36px 36px;"
    		});
    		item.onClick = itemConfig.onClick;
    		item.config = itemConfig;
    		
    		item.title = itemConfig.name;

			item.on("click", function(e) {
				setTimeout(function() {
					h.displayMarker(e.target);	
				}, 0);
				if (e.target.onClick !== undefined) {
					e.target.onClick(e.target.config);
				}
			});

    		h.content.insert(item);
    		
    		if (i==0) {
    			item.click();
    		}
    	}
	},
	/**
	 * 
	 */
	displayMarker: function(html) {
		var h = this;
		
		var left = html.getBoundingClientRect().left - h.content.getBoundingClientRect().left + html.getBoundingClientRect().width / 2 - 8; 
		
		if (h.marker === undefined) {
			h.marker = new Element("DIV", {
				style: "position:absolute; z-index:1000; overflow:visible; top:62px; left:" + left + "px; width:16px; height:16px; border:1px solid #c9cece; border-width:0px 1px 1px 0px; background-color:#ebf0ee; transform: rotate(45deg);"
			});
			h.content.insert(h.marker);
		} else {
			var currentLeft = h.marker.getBoundingClientRect().left - h.content.getBoundingClientRect().left;
			var player = h.marker.animate([
   	  		    {
   	  		       left: currentLeft + "px"
   	  		    },
   	  		    {
   	   		       left: left + "px"
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
	