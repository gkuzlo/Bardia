/**
 * @class UI.BooleanFormField
 */
UI.BooleanFormField = Class.create({
	/**
	 * 
	 */
    initialize: function(config) {    	
        this.config = Object.extend({
        	property: "$",
        	readOnly: false,
        	width: 200,
        	value: false
        }, config || {});
    },
    /**
     * @method
     */
    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {}
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;
    		h.inside = new Element("DIV", {
    			style: "position:relative; top:0px; height:40px; width:100%; line-height:20px;"
    		});
    		h.label = new Element("DIV", {
    			style: "position:absolute; top:20px; left:50px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
    		});
    		h.label.insert(h.config.label);
    		
    		h.falseFab = new UI.Fab({
    			inside: h.inside,
    			width: 20,
    			height: 20,
    			top: 20,
    			left: 20,
    			fill: "grey",
    			icon: "done",
    			bottom: 8,
    			onClick: function() {
    				h.switchOn();
    				h.setBeanValue(true);
    			}
    		});

    		h.trueFab = new UI.Fab({
    			inside: h.inside,
    			width: 20,
    			height: 20,
    			top: 20,
    			left: 20,
    			fill: "green",
    			icon: "done",
    			bottom: 8,
    			onClick: function() {
    				h.switchOff();
    				h.setBeanValue(false);
    			}
    		});
    		
    		if (this.config.value == false) {
	    		h.trueFab.getMaterial().setStyle({
	    			transform: "scale(0)"
	    		});
    		}

		h.inside.insert(h.label);
    },
    /**
     * @method setReadOnly
     */
    setReadOnly: function(readOnly) {
    	var h = this;
    	var ro = readOnly || false;
    },
    /**
     * @method animateLabel
     */
    switchOn: function() {
    	var h = this;
    	
		h.trueFab.getMaterial().animate([
		    {opacity: 0.0, transform: "scale(0)"},
		    {opacity: 1.0, transform: "scale(1)"},
		], {
			direction: 'normal',
		    duration: 500,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
		
		h.label.animate([
  		    {color: "#cdcdcf"},
  		    {color: "#999999"},
  		], {
  			direction: 'normal',
  		    duration: 500,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
		
		if (h.config.onChange) {
			h.config.onChange(true);
			h.setBeanValue(true);
		}
    },
    /**
     * @method unanimateLabel
     */
    switchOff: function() {
    	var h = this;
    	
		h.trueFab.getMaterial().animate([
		    {opacity: 1.0, transform: "scale(1)"},
		    {opacity: 0.0, transform: "scale(0)"},
		], {
			direction: 'normal',
		    duration: 500,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
		
		h.label.animate([
   		    {color: "#999999"},
   		    {color: "#cdcdcf"},
   		], {
   			direction: 'normal',
   		    duration: 500,
   		    easing: "ease",
   			iterations: 1,
   			fill: "both"
   		});
		
		if (h.config.onChange) {
			h.config.onChange(false);
			h.setBeanValue(false);
		}
    },
    /**
     * @method getMaterial
     */
    getMaterial: function() {
    	return this.inside;
    },
    isEmpty: function(v) {
    	var result = false;
    		if (v === undefined || v.trim() == "") {
    			result = true;
    		}
    	return result;
    },
    setBean: function(bean) {
    	var h = this;
    	h.config.bean = bean;
		h.setInputValue(h.getBeanValue());
    },
    getBeanValue: function() {
    	var h = this;
    	return eval("h.config.bean." + h.config.property);
    },
    setBeanValue: function(v) {
    	var h = this;
    	eval("h.config.bean." + h.config.property + " = " + v + "");
    },
    /**
     * @method setInputValue
     */
    setInputValue: function(val) {
    	if (val == true) {
    		this.switchOn();
    	} else {
    		this.switchOff();
    	}
    },
    /**
     * @method getInputValue
     */
    getInputValue: function() {

    },
    /**
     * walidacja po wpisaniu (na onblur)
     * 
     * @method validate
     */
    validate: function(v) {
    	return v;
    },
    /**
     * walidacja podczas wpisywania
     * 
     * @method preValidate
     */
    preValidate: function() {
    }
});