/**
 *
 */
UI.IncrementFormField = Class.create(UI.TextFormField, {
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
        	width: 80,
        	bean: {},
        	mask: UI_MASK_INTEGER,
        	max: 25,
        	min: 1
        }, config || {});

		for (property in this.config) {
			if (this.config[property].bind) {
				this[property] = this.config[property].bind(this);
			}
		}

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

		h.input.on("change", function(e) {
			if (h.config.onChange !== undefined) {
//				if (h.input.value > h.config.max) {
//				    h.input.value = h.config.max;
//				} else if (h.input.value < h.config.min) {
//				    h.input.value = h.config.min;
//				}
				h.setBeanValue();

				h.onChange(h.getBeanValue(), h);
			}
		});

		h.input.type = "number";
		h.input.step = 1;
		h.input.value = 1;
		h.input.max = h.config.max;
		h.input.min = h.config.min;
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