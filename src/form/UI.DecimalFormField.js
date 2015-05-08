/**
 * 
 * 
 * @class UI.DecimalFormField
 */
UI.DecimalFormField = Class.create(UI.TextFormField, {
    /**
     * @method setConfig
     */
    initConfig: function(config) {
    	
    	var h = this;
    	
    	var numbers=new Input(JST_CHARS_NUMBERS);
    	var optionalNumbers=new Input(JST_CHARS_NUMBERS);
    	      optionalNumbers.optional=true;

    	var UI_DECIMAL_SEPARATOR=new Literal(".");
    	var UI_MASK_DECIMAL=[numbers, UI_DECIMAL_SEPARATOR, optionalNumbers];
    	    	
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	mask: UI_MASK_DECIMAL,
        	precision: 5
        }, config || {});

    	h.parser = new NumberParser();
	    	h.parser.decimalDigits = h.config.precision;
	    	h.parser.decimalSeparator = ".";
	    	h.parser.groupSeparator = " "; 
	    	h.parser.useGrouping = false; 

        this.render();
        this.setReadOnly(this.config.readOnly);
        
		h.input.on("paste", function(e) {
			var val = e.clipboardData.getData("text/plain");
				val = val.replace(",", ".");
				val = h.parser.parse(val);

			h.setInputValue(h.parser.format(val));
			e.preventDefault();
			e.returnValue = false;
			return false;
		});
		
		h.input.setStyle({
			textAlign: "right"
		});
    },
    setBeanValue: function(v) {
    	var h = this;
    	
    	var v = h.parser.parse(h.getInputValue());

    	eval("h.config.bean." + h.config.property + " = parseFloat(v);");
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
});