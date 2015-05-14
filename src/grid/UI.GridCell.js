
UI.GridCell = Class.create({

    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            input: null,
            readOnly: true,
            width: 100,
            bean: {}
        }, config || {});

        this.render();
    },

    render: function() {
    	var h = this;

		h.material = new Element("DIV", {
			style: "position:relative; display:inline; overflow:hidden; font-size:14px; height:26px; margin:0px; padding:0px; border:0px solid grey; border-width:0px 0px 0px 0px; width:" + h.config.width + "px",
			class: "grid-cell"
		});
    	
		h.input = new Element("INPUT", {
			style: "font-size:14px; height:25px; margin:0px; padding:0px; padding-left:4px; border:0px solid grey; border-width:0px 1px 0px 0px; width:" + h.config.width + "px",
			class: "grid-cell"
		});
		
		h.material.update(h.input);
		
		h.input.on("keydown", function(e) {
			e.cancelBubble = true;
		});

		h.input.on("change", function(e) {
			h.updateValue();
		});

		h.setReadOnly(h.config.readOnly);

		h.setBean(h.config.bean);

		if (h.config.render !== undefined) {
			h.config.render(h);
		}
    },
    getMaterial: function() {
    	return this.material;
    },
    getInput: function() {
    	return this.input;
    },
    getBean: function() {
    	return this.config.bean;
    },
    setReadOnly: function(readOnly) {
    	var h = this;

    	var ro = readOnly;
    		if (ro === true) {
    			h.input.setStyle({
    				backgroundColor: "white"
    			});	
    		} else {
    			h.input.setStyle({
    				backgroundColor: "#f8f8ba"
    			});
    		}
    		h.input.readOnly = ro;
    },
    updateValue: function() {
    	var h = this;

    	eval("h.config.bean." + h.config.property + " = '" + h.input.value + "'");

    	if (h.config.onChange) {
    		h.config.onChange(h);
    	}
    },
    setBean: function(bean) {
    	var h = this;
    		var val = eval("bean." + h.config.property);
    		if (val !== undefined) {
    			h.input.value = val;
    		}
    }
});