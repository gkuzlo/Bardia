
UI.FabProgress = Class.create({

    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            scale: 2
        }, config || {});

        this.render();
    },

    render: function() {
    	var h = this;
    		
    	h.div = new Element("DIV", {
    		style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:black; opacity:0.5; z-index:100000"
    	});
    	h.config.inside.insert(h.div);

    	h.fab = h.config.fab.getMaterial().clone();
    	
    	h.fab.setStyle({
    		left: h.config.fab.getMaterial().getClientRects()[0].left + "px",
    		top: h.config.fab.getMaterial().getClientRects()[0].top + "px"
    	});

    	h.div.insert(h.fab);
    	h.animate(h.fab);
    },
    animate: function(fab) {
    	var h = this;
    	
    	if (h.closed) {
    		return;
    	}
    	
		var fa = fab.clone();
		fa.setStyle({ 
			zIndex: 100002
		});
		h.config.inside.insert(fa);
		var player = fa.animate([
 		    {
 		     opacity: 1, 
 		     transform: "scale(0.1)"
 		    },
 		    {
 		     opacity: 0.0, 
 		     transform: "scale(" + h.config.scale + ")"
 		    },
 		], {
 			direction: 'normal',
 		    duration: 1000,
 		    easing: "ease",
 			iterations: 1,
 			fill: "both"
 		});
		
   		player.onfinish = function() {
   			fa.remove();
   			h.animate(fab);
   		}
    },
    setPercentage: function(percentage) {
    	var h = this;
    	if (h.label == undefined) {
    		h.label = new Element("DIV");
        	h.label.setStyle({
        		width: 200 + "px",
        		height: 20 + "px",
        		border: "1px solid " + h.config.fab.config.fill,
        		color: h.config.fab.config.fill,
        		textAlign: "center",
        		backgroundColor: "transparent",
        		position: "absolute",
        		left: (h.config.fab.getMaterial().getClientRects()[0].left + 40) + "px",
        		top: h.config.fab.getMaterial().getClientRects()[0].top + "px"
        	});

        	h.div.insert(h.label);
        	
    		h.prog = new Element("DIV");
        	h.prog.setStyle({
        		width: 200 + "px",
        		height: 20 + "px",
        		border: "0px",
        		opacity: "0.2",
        		textAlign: "center",
        		backgroundColor: h.config.fab.config.fill,
        		position: "absolute",
        		left: (h.config.fab.getMaterial().getClientRects()[0].left + 40) + "px",
        		top: h.config.fab.getMaterial().getClientRects()[0].top + "px"
        	});

        	h.div.insert(h.prog);
    	}

    	h.prog.setStyle({
    		width: (2 * percentage) + "px"
    	});
    	h.label.update(percentage + "%");
    },

    close: function() {
    	var h = this;

    	h.closed = true;
    	
		h.div.remove();
		delete h.div;
		
		h.fab.remove();
		delete h.fab;
    }
});