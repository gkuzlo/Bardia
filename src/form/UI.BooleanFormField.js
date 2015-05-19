/**
 * @class UI.BooleanFormField
 */
UI.BooleanFormField = Class.create({

    initialize: function(config) {    	
        this.config = Object.extend({
        	property: "$",
        	readOnly: false,
        	width: 200,
        	value: false,
        	required: false
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
        	bean: {},
        	required: false
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
    		
    		h.falseFab = new Element("DIV", {
    			style: "box-shadow: 3px 3px 8px #666666; position:absolute; border-radius:50%; top:20px; left:20px; width:20px; height:20px; background-color:grey; background-image:url('" + $ICON("done") + "')"
    		});
    		h.falseFab.on("click", function() {
				h.switchOn();
				h.setBeanValue(true);
    		});
    		h.inside.insert(h.falseFab);
    		
    		h.trueFab = new Element("DIV", {
    			style: "position:absolute; border-radius:50%; top:20px; left:20px; width:20px; height:20px; background-color:green; background-image:url('" + $ICON("done") + "')"
    		});
    		h.trueFab.on("click", function() {
				h.switchOff();
				h.setBeanValue(false);
    		});
    		h.inside.insert(h.trueFab);
    		
    		if (this.config.value == false) {
	    		h.trueFab.hide();
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
    	
		h.trueFab.animate([
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
    	
		h.trueFab.animate([
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
    },
    /**
     * 
     * @returns
     */
    getRequired: function() {
    	return this.config.required;
    },
    /**
     * 
     */
    markError: function() {
    	var h = this;

    	h.label.setStyle({
    		color: "#cf6d6d"
    	});
    },
    /**
     * 
     */
    unmarkError: function() {
    	var h = this;

    	h.label.setStyle({
    		color: "#cdcdcf"
    	});
    }
});