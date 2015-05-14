/**
 * 
 * 
 * @class UI.IntegerFormField
 */
UI.IntegerFormField = Class.create(UI.TextFormField, {
    /**
     * @method setConfig
     */
    initConfig: function(config) {
    	
    	var h = this;
    	
    	var numbers=new Input(JST_CHARS_NUMBERS);

    	var UI_MASK_INTEGER=[numbers];
    	    	
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	mask: UI_MASK_INTEGER
        }, config || {}); 

        this.render();
        this.setReadOnly(this.config.readOnly);
        
		h.input.on("paste", function(e) {
			var val = e.clipboardData.getData("text/plain");
				val = val.parseInt(val);

			h.setInputValue(val);
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
    	
    	var v = h.getInputValue();

    	eval("h.config.bean." + h.config.property + " = parseInt(v);");
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