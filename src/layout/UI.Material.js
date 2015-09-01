/** 
 * 
 */
UI.Material = Class.create({
	/**
	 * 
	 * @param config
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            effect: "from-left",
            position: "top:100px; left:100px; width:500px; height:500px",
            modal: false
        }, config || {});

        this.render();
    },
    /**
     * 
     */
    render: function() {
    	var h = this;
    	
    	if (h.config.modal == true) {
			h.curtain = new Element("DIV", {
				style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; border:0px solid transparent; display:none; backgroun:rgba(0,0,0,0.8)"
			});
			h.config.inside.insert(h.curtain);
    	}

    	h.material = new Element("DIV", {
    		style: "position:absolute; overflow:hidden; background-color:white; " + h.config.position,
    		"class": "default_shadow"
    	});
    	
//    	h.material.on("mousedown", function(e) {
//			e.cancelBubble = true;
//			e.returnValue = false;
//		});
//
//    	h.material.on("click", function(e) {
//			e.cancelBubble = true;
//			e.returnValue = false;
//		});
//
//    	h.material.on("dblclick", function(e) {
//			e.cancelBubble = true;
//			e.returnValue = false;
//		});

    	h.config.inside.insert(h.material);
    	
    	h.width = h.material.getBoundingClientRect().width;
    	h.height = h.material.getBoundingClientRect().height;
    	h.left = h.material.getBoundingClientRect().left - h.config.inside.getBoundingClientRect().left;
    	h.right = h.material.getBoundingClientRect().right;
    	h.bottom = parseInt(h.material.style.bottom);
    	h.top = h.material.getBoundingClientRect().top;

    	if (h.config.effect == "from-left") {
    		h.material.setStyle({
    			left: (-h.width) + "px"
    		});
    	} else if (h.config.effect == "from-right") {
    		h.material.setStyle({
    			right: (-h.width) + "px"
    		});
    	} else if (h.config.effect == "from-bottom") {
    		h.material.setStyle({
    			bottom: (-h.height) + "px"
    		});
    	} else if (h.config.effect == "from-top") {

    	}
    	
    	h.material.on("mousedown", function(e) {
    		if (e.cancelBubble) {
    			e.cancelBubble = true;
    		} else if (e.cancelPropagation) {
    			e.cancelPropagation();
    		}
		});

    	h.material.on("click", function(e) {
    		if (e.cancelBubble) {
    			e.cancelBubble = true;
    		} else if (e.cancelPropagation) {
    			e.cancelPropagation();
    		}
		});

    	h.config.inside.insert(h.material);
    },
    show: function() {
    	var h = this;
    	
    	h.curtainOn();

    	if (h.config.effect == "from-left") {
    		var player = h.material.animate([
    		    {transform: "translate(0px, 0px)"},
    		    {transform: "translate(" + (h.width + h.left) + "px, 0px)"},
    		], {
    			direction: 'normal',
    		    duration: 450,
    		    easing: "ease",
    			iterations: 1,
    			fill: "both"
    		});
    	} else if (h.config.effect == "from-right") {
    		var player = h.material.animate([
     		    {transform: "translate(0px, 0px)"},
     		    {transform: "translate(-" + h.width + "px, 0px)"},
     		], {
     			direction: 'normal',
     		    duration: 450,
     		    easing: "ease",
     			iterations: 1,
     			fill: "both"
     		});
    	} else if (h.config.effect == "from-bottom") {
    		var player = h.material.animate([
      		    {transform: "translate(0px, 0px)"},
      		    {transform: "translate(0px, -" + (h.bottom + h.height) + "px)"},
      		], {
      			direction: 'normal',
      		    duration: 450,
      		    easing: "ease",
      			iterations: 1,
      			fill: "both"
      		});
    	}

    	h.material.setStyle({
    		"z-index": 1000000
    	});
    },
    updateHeight: function(pixels) {
    	var h = this;
    	
		var player = h.material.animate([
		    {height: h.height + "px"},
		    {height: pixels + "px"}
		], {
			direction: 'normal',
		    duration: 750,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
		
		player.onfinish = function() {
	    	h.height = pixels;
	    	
	    	if (h.config.onHeightChanged) {
	    		h.config.onHeightChanged();
	    	}
		};
    },
    hide: function() {
    	var h = this;

    	if (h.config.effect == "from-left") {
    		var player = h.material.animate([
    		    {transform: "translate(" + (h.width + h.left) + "px, 0px)"},
    		    {transform: "translate(-" + (h.width + h.left) + "px, 0px)"},
    		], {
    			direction: 'normal',
    		    duration: 750,
    		    easing: "ease",
    			iterations: 1,
    			fill: "both"
    		});
    	} else if (h.config.effect == "from-right") {
    		var player = h.material.animate([
    		    {transform: "translate(-" + (h.width + h.right) + "px, 0px)"},
     		    {transform: "translate(0px, 0px)"}
     		], {
     			direction: 'normal',
     		    duration: 750,
     		    easing: "ease",
     			iterations: 1,
     			fill: "both"
     		});
    	} else if (h.config.from == "bottom") {
    		translateX = 0;
    		translateY = -h.config.height - h.config.bottom;
    	}
   		
    	h.curtainOff();
    },
	curtainOn: function() {
		var h = this;

		if (h.curtain === undefined) {
			return;
		}

		h.curtain.setStyle({
			display: "block",
			"z-index:": 10000000
		});

		var player = h.curtain.animate([
  		    {background: "rgba(0,0,0,0.0)"},
  		    {background: "rgba(0,0,0,0.8)"},
  		], {
  			direction: 'normal',
  		    duration: 200,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
	},
	curtainOff: function() {
		var h = this;
		
		if (h.curtain === undefined) {
			return;
		}

		var player = h.curtain.animate([
  		    {background: "rgba(0,0,0,0.8)"},
  		    {background: "rgba(0,0,0,0.0)"},
		], {
			direction: 'normal',
		    duration: 200,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
		
   		player.onfinish = function(e) {
   			h.curtain.setStyle({
   				display: "none"
   			});
		}
	},
	/**
	 * @method getMaterial
	 */
    getMaterial: function() {
    	return this.material;
    }
});