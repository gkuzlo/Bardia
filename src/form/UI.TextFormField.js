/**
 * 
 * 
 * @class UI.TextFormField
 */
UI.TextFormField = Class.create({
	/**
	 * 
	 */
    initialize: function() {    	
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
        	bean: {},
        	mask: new Input(null)
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
				style: "position:relative; display:block; height:40px; width:100%; line-height:40px; background-color:transparent"
			});
    		
    		h.input = new Element("INPUT", {
    			type: "text",
    			style: "position:absolute; top:20px; left:10px; border:0px; background-color:transparent; color:#000000; width:" + h.config.width + "px"
    		});
    		h.input.on("focus", function() {
    			h.animateLabel();
    		});
    		    		    		
    		if (h.config.mask) {
    			var mask = new InputMask(h.config.mask, h.input)
    				mask.blurFunction = function() {
    					if (h.config.onChange !== undefined) {
    						h.config.onChange(h.getBeanValue());
    					}
            			if (h.isEmpty(h.input.value)) {
            				h.unanimateLabel()
            			}
    				}
	    			mask.keyUpFunction = function() {
	        			h.setBeanValue();

	        			if (h.config.onChanging !== undefined) {
	        				h.config.onChanging(h.getBeanValue());
	        			}    				
	    			}
    		} else {
        		h.input.on("blur", function(e) {
        			if (h.isEmpty(h.input.value)) {
        				h.unanimateLabel()
        			}
        			if (h.config.onChange !== undefined) {
        				h.config.onChange(h.getBeanValue());
        			}
        		});
        		h.input.on("keyup", function(e) {
        			h.setBeanValue();
        			
        			if (h.config.onChanging !== undefined) {
        				h.config.onChanging(h.getBeanValue());
        			}
        		});
        		h.input.on("keydown", function(e) {
        			e.cancelBubble = true;
        		});
    		}
    		    		
    		h.label = new Element("DIV", {
    			style: "position:absolute; top:10px; left:10px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
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
    	h.input.disabled = ro;
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
    	
    	var v = h.getBeanValue();
    	if (h.config.render !== undefined) {
    		v = h.config.render(v);
    	}
		h.setInputValue(v);
    },
    getBeanValue: function() {
    	var h = this;
    	var r = undefined;
    		try {
    			r = eval("h.config.bean." + h.config.property);
    		} catch (e) {
    			
    		}
    	return r;
    },
    setBeanValue: function(v) {
    	var h = this;
    	
    	var v = h.getInputValue();
    	if (h.config.parse != undefined) {
    		v = h.config.parse(v);
    	}
    	
    	eval("h.config.bean." + h.config.property + " = v;");
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