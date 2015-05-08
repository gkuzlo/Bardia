/**
 * 
 */
UI.FabToolbar = Class.create({
	/**
	 * 
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            buttons: [
            ]
        }, config || {});

        this.render();
    },
    /**
     * 
     */
    render: function() {
    	var h = this;

    	h.hashedFabs = new Hash();

    	var i=0;
    	for (i=0; i<h.config.buttons.length; i++) {
    		var fab = new UI.Fab({
    			inside: h.config.inside,
    			right: 40,
    			left: "",
    			top: 50 + (i*60),
    			icon: h.config.buttons[i].icon,
    			title: h.config.buttons[i].title,
    			text: h.config.buttons[i].text,
    			fill: h.config.buttons[i].fill,
    			controller: h.config.buttons[i].controller,
    			onClick: function(fab) {
    				h.selectFab(fab);
    			}
    		});
    		
    		h.hashedFabs.set(h.config.buttons[i].id, fab);
    	}
    },
    selectFabById: function(id) {
    	var h = this;
    		h.selectFab(h.hashedFabs.get(id));
    },
    /**
     * 
     */
    selectFab: function(fab) {
    	var h = this;
    		if (h.selectedFab !== undefined) {
    			h.unselectFab(h.selectedFab);
    		}
    		
    		var player = fab.getMaterial().animate([
	  		    {
	  		     opacity: 1, 
	  		     transform: "scale(1)"
	  		    },
	  		    {
	  		     opacity: 0.8, 
	  		     transform: "scale(1.5)"
	  		    },
	  		], {
	  			direction: 'normal',
	  		    duration: 300,
	  		    easing: "ease",
	  			iterations: 1,
	  			fill: "both"
	  		});

    	h.selectedFab = fab;
    	
    	if (h.config.onSelect) {
    		h.config.onSelect(fab.config.controller);
    	}
    },
    /**
     * 
     */
    unselectFab: function(fab) {
		var player = fab.getMaterial().animate([
  		    {
  		     opacity: 0.8, 
  		     transform: "scale(1.5)"
  		    },
  		    {
  		     opacity: 1, 
  		     transform: "scale(1)"
  		    },
  		], {
  			direction: 'normal',
  		    duration: 300,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
    },
    hide: function() {
    	var h = this;
    		h.hideOrShow(false);
    },
    show: function() {
    	var h = this;
    		h.hideOrShow(true);
    },
    hideOrShow: function(display) {
    	var h = this;
    	var i=0;
    	for (i=0; i<this.hashedFabs.keys().length; i++) {
    		var fab = this.hashedFabs.get(this.hashedFabs.keys()[i]);
    			if (!display) {
    				fab.getMaterial().hide();
    			} else {
    				fab.getMaterial().show();
    			}
    	}
    }
});