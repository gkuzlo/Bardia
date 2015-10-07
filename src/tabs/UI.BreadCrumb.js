UI.BreadCrumb = Class.create(UI.MaterialComponent, {

    initConfig: function(config) {
        this.config = Object.extend({
        }, config || {});
    },

    render: function() {
        var h = this;
        
    	h.content = new Element("DIV", {
    		style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:rgba(30, 29, 41, 1)"
    	});
    	h.getMaterial().update(h.content);
    	
    	h.forItems = new Element("DIV", {
    		style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:transparent"
    	});
    	h.getMaterial().insert(h.forItems);

    	h.addItem(h.config.firstItem);
    },

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
    		}
    	};

    	var h = this;
    		var item = new Element("DIV", {
    			style: "padding-left:35px; font-size:13px; padding-right:5px; display:inline-block; border:0px; line-height:59px; height:59px; color:#525160; overflow:hidden; cursor:pointer"
    		});
    		item.bean = nextItem;
    		nextItem.divItem = item;
    		item.onClick = nextItem.onClick;

    		item.update(nextItem.name);
    		item.title = nextItem.description || nextItem.name;

    		item.addEventListener("click", function(e) {
    			h.handleItemClick(e.target.bean);
			}, false);

    		h.forItems.insert(item);

    		if (h.lastItem === undefined) {
    			h.lastItem = nextItem;
    		} else {
    			nextItem.previousItem = h.lastItem;
    			h.lastItem.nextItem = nextItem;
    			h.lastItem = nextItem;
    		}
        item.click();
    },
    /**
     * 
     * @param item
     */
    handleItemClick: function(item) {
    	var h = this;
    	
		setTimeout(function() {
			h.displayMarker(item.divItem);	
		}, 0);
		
		if (h.activeItem) {
			h.activeItem.divItem.style.color = "#525160";
		}
		
		if (item.divItem.onClick !== undefined) {
			item.divItem.onClick(item.divItem.bean);
		}

    	h.displayMarker(item.divItem);
    	h.activeItem = item;
    	
    	item.divItem.bean.removeNextItem();
    	
    	h.lastItem = item;
    },
    /**
     * @metod removeLastItem
     */
    removeLastItem: function() {
    	var h = this;

    	try {
	    	if (h.lastItem && h.lastItem.previousItem) {
	    		h.handleItemClick(h.lastItem.previousItem);
	    	}
    	} catch (e) {
    		alert("Error removing " + e);
    	}
    },
    /**
     * @method displayMarker
     * @param html
     */
    displayMarker: function(html) {
    	var h = this;

    	html.style.color = "#70c6d9";
    	
    	var rightPosition = html.getBoundingClientRect().left - h.content.getBoundingClientRect().left;

    	if (h.marker === undefined) {
    		h.marker = new Element("DIV", {
    			style: "position:absolute; opacity:0.0; left:" + rightPosition + "px;" +
    				   "width:15px; top:20px; height:15px; background-color:transparent; " +
    				   "border:5px solid #70c6d9; border-width:5px 5px 0px 0px; transform:rotate(45deg)"
    		});
    		h.content.insert(h.marker);
    		    		
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
	  		       left: (h.marker.getBoundingClientRect().left - h.content.getBoundingClientRect().left) + "px"
	  		    },
	  		    {
	   		       left: (html.getBoundingClientRect().left - h.content.getBoundingClientRect().left) + "px"
	  		    },
	  		]);
    	}
    }
});