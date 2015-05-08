/**
 * 
 * 
 * @class UI.IntegerFormField
 */
UI.IntegerFormField = Class.create({
	/**
	 * 
	 */
    initialize: function(config) {    	
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {}
        }, config || {});
    },
    /**
     * @method setConfig
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
    		
    		h.input = new Element("INPUT", {
    			type: "text",
    			style: "position:absolute; top:20px; left:10px; border:0px; background-color:transparent; color:#000000; width:" + h.config.width + "px"
    		});
    		h.input.on("focus", function() {
    			h.animateLabel();
    		});
    		    		
    		h.input.on("blur", function(e) {
    			if (h.isEmpty(h.input.value)) {
    				h.unanimateLabel()
    			}
    		});
    		h.input.on("change", function(e) {
    			if (h.config.onChange !== undefined) {
    				h.config.onChange(h.getBeanValue());
    			}
    		});
    		h.input.on("keyup", function(e) {
    			h.setBeanValue(h.getInputValue());
    			
    			if (h.config.onChanging !== undefined) {
    				h.config.onChanging(h.getBeanValue());
    			}
    		});
    		h.input.on("keydown", function(e) {
    			e.cancelBubble = true;
    		});
    		
    		h.label = new Element("DIV", {
    			style: "position:absolute; top:20px; left:10px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
    		});
    		h.label.insert(h.config.label);

	    	h.underline = new Element("DIV", {
	    		style: "position:absolute; top:40px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:" + h.config.width + "px"
	    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.label);
		h.inside.insert(h.input);

		if (h.config.disableTab == true) {
			var fakeInput = new Element("INPUT", {
				style: "width:0px; border:0px; visible:false"
			});

			fakeInput.on("focus", function(e) {
				h.input.focus();
			});
			h.inside.insert(fakeInput);
		}
    },
    /**
     * @method setReadOnly
     */
    setReadOnly: function(readOnly) {
    	var h = this;
    	var ro = readOnly || false;
    	h.input.readOnly = ro;
    },
    /**
     * @method animateLabel
     */
    animateLabel: function() {
    	var h = this;
    	
		var player = h.label.animate([
		    {opacity: 1.0, transform: "translate(0px, 0px)", color:"#cdcdcf", fontSize: "14px"},
		    {opacity: 1.0, transform: "translate(0px, -18px)", color:"#999999", fontSize: "11px"},
		], {
			direction: 'normal',
		    duration: 200,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
    },
    /**
     * @method unanimateLabel
     */
    unanimateLabel: function() {
    	var h = this;
    	
		var player = h.label.animate([
  		    {opacity: 1.0, transform: "translate(0px, -18px)", color:"#cdcdcf", fontSize: "11px"},
		    {opacity: 1.0, transform: "translate(0px, 0px)", color:"#cdcdcf", fontSize: "14px"},
		], {
			direction: 'normal',
		    duration: 200,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
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
    	eval("h.config.bean." + h.config.property + " = '" + v + "'");
    },
    /**
     * @method setInputValue
     */
    setInputValue: function(val) {
    	var h = this;
    	
    	if (val === undefined) {
    		val = "";
    	}
    	
    	var v = new String(val);

    	if (v !== undefined && v.trim() !== "" && v.trim() !== '') {
    		h.animateLabel();
    		h.input.value = v;
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },
    /**
     * @method getInputValue
     */
    getInputValue: function() {
    	var h = this;
    	var val = h.input.value;
    		val = h.validate(val);
    	return val;
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