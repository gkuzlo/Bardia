UI.Fab = Class.create({

    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            width: 40,
            height: 40,
            fill: "orange",
            icon: "help",
            access: UI.VISIBLE,
            title: "",
            style: undefined
        }, config || {});

        this.render();
    },

    render: function() {
    	var h = this;
    	
    	h.material = new Element("DIV", {
    		"style": "margin:10px; box-shadow: 3px 3px 8px #666666; padding:0px; font-size:12px; color:white; text-align:center; line-height:40px; border-radius:50%; height:40px; width:40px; background-color:" + h.config.fill + "; overflow:hidden; opacity:1",
    		"title": h.config.title
    	});
    	
    	if (h.config.style) {
    		h.material.style = h.config.style;
    	}
    	
    	h.material.on("mousedown", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
    	h.material.on("click", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
    	
    	if (h.config.customIcon !== undefined) {
    		h.material.setStyle({
    			background: "url('" + h.config.customIcon + "') no-repeat center center " + h.config.fill
    		});
    	} else if (h.config.icon !== undefined) {
    		h.material.setStyle({
    			background: "url('" + $ICON(h.config.icon) + "') no-repeat center center " + h.config.fill
    		});
    	}

    	h.material.on("click", function() {
        	if (h.config.onClick !== undefined) {
        		h.config.onClick(h);
        	}
    	});

    	h.config.inside.insert(h.material);

    	if (h.config.targetFill !== undefined) {
    		h.material.on("mouseover", function() {
    			var player = h.material.animate([
         		    { 
         		    	backgroundColor: h.config.fill
         		    },
         		    { 
         		    	backgroundColor: h.config.targetFill
         		    },
         		], {
         			direction: 'normal',
         		    duration: 600,
         		    easing: "ease",
         			iterations: 1,
         			fill: "both"
         		});
    		});
    		
    		h.material.on("mouseout", function() {
    			var player = h.material.animate([
         		    { 
         		    	backgroundColor: h.config.targetFill
         		    },
         		    { 
         		    	backgroundColor: h.config.fill
         		    },
         		], {
         			direction: 'normal',
         		    duration: 600,
         		    easing: "ease",
         			iterations: 1,
         			fill: "both"
         		});
    		});
    	}
    },
    getMaterial: function() {
    	return this.material;
    },
    hide: function() {
    	var h = this;
    		h.material.hide();
    },
    disappear: function() {
    	var h = this;

		var player = h.material.animate([
  		    {
  		     opacity: 1, 
  		     transform: "scale(1)"
  		    },
  		    {
  		     opacity: 0.0, 
  		     transform: "scale(4)"
  		    },
  		], {
  			direction: 'normal',
  		    duration: 1000,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
    },
    appear: function() {
    	var h = this;

		var player = h.material.animate([
   		    {
 		     opacity: 0.0, 
 		     transform: "scale(4)"
 		    },
  		    {
  		     opacity: 1, 
  		     transform: "scale(1)"
  		    },
  		], {
  			direction: 'normal',
  		    duration: 1000,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
    },
    show: function() {
    	var h = this;
    		h.material.show();
    }
});