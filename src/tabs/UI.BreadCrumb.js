/**
 * 
 */
UI.BreadCrumb = Class.create(UI.MaterialComponent, {
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
    		style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:rgba(30, 29, 41, 0.9)"
    	});
    	h.getMaterial().update(h.content);
    	
    	h.forItems = new Element("DIV", {
    		style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:transparent"
    	});
    	h.getMaterial().insert(h.forItems);

    	h.addItem(h.config.firstItem);
    },
    /**
     * 
     */
    addItem: function(nextItem) {
    	
    	nextItem.removeNextItem = function() {
    		if (this.nextItem) {

	    		this.nextItem.removeNextItem();

	    		if (this.nextItem.card) {
	    			this.nextItem.card.remove();
	    			delete this.nextItem.card;
	    		}
	    		
	    		if (this.nextItem.divItem) {
	    			this.nextItem.divItem.remove();
	    			delete this.nextItem.divItem;
	    		}
	    		
	    		//delete this.nextItem;
    		}
    	};
    	
    	var h = this;
    		var item = new Element("DIV", {
    			style: "padding-left:15px; font-size:16px; padding-right:15px; display:inline-block; border-right:1px solid #1E1D29; line-height:70px; height:70px; color:#525160; overflow:hidden"
    		});
    		item.bean = nextItem;
    		nextItem.divItem = item;
    		item.onClick = nextItem.onClick;

    		item.update(nextItem.name);
    		item.title = nextItem.description;

    		item.addEventListener("click", function(e) {
				setTimeout(function() {
					h.displayMarker(e.target);	
				}, 0);
				
				if (e.target.onClick !== undefined) {
					e.target.onClick(e.target.bean);
				}

	        	h.displayMarker(e.target);
	        	
	        	e.target.bean.removeNextItem();
	        	
			}, false)

    		h.forItems.insert(item);
    		
    		if (h.lastItem === undefined) {
    			h.lastItem = nextItem;
    		} else {
    			h.lastItem.nextItem = nextItem;
    			h.lastItem = nextItem;
    		}

        item.click();
    },
    /**
     * 
     */
    displayMarker: function(html) {
    	var h = this;

    	var rightPosition = html.getBoundingClientRect().right - h.content.getBoundingClientRect().left - 6;

    	if (h.marker === undefined) {
    		h.marker = new Element("DIV", {
    			style: "position:absolute; opacity:0.0; top:10px; left:" + rightPosition + "px; width:5px; bottom:10px; background-color:#6dbbcf"
    		});
    		h.content.insert(h.marker);
    		
    		h.bgMarker = new Element("DIV", {
    			style: "position:absolute; opacity:0.05; top:10px; left:0px; width:" + (html.getBoundingClientRect().right - h.content.getBoundingClientRect().left) + "px; bottom:10px; background-color:#6dbbcf"
    		});
    		h.content.insert(h.bgMarker);
    		
    		$PLAY(h.marker, [
     		    {
     		    	opacity: "0.0"
     		    },
     		    {
     		    	opacity: "1.0"
     		    },
     		]);
    	} else {
			$PLAY(h.marker, [
	  		    {
	  		       left: (h.marker.getBoundingClientRect().right - h.content.getBoundingClientRect().left) + "px"
	  		    },
	  		    {
	   		       left: (html.getBoundingClientRect().right - h.content.getBoundingClientRect().left) + "px"
	  		    },
	  		]);
			
			$PLAY(h.bgMarker, [
 	  		    {
 	  		       width: h.bgMarker.getBoundingClientRect().width + "px"
 	  		    },
 	  		    {
 	   		       width: (html.getBoundingClientRect().right - h.content.getBoundingClientRect().left) + "px"
 	  		    },
 	  		]);
    	}
    }
});