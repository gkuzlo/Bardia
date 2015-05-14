
UI.GridInputCell = Class.create({

    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            bean: {name:""},
            property: "name",
            mask: new Input(null),
            readOnly: false
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },

    render: function() {
    	var h = this;
    		h.input = new Element("INPUT", {
    			style: "background-color:transaprent; border:0px solid grey; border-width:0px 0px 2px 0px; margin:0px; position:relative; top:3px; left:-4px; width:100%; line-height:18px"
    		});
    		h.config.inside.insert(h.input);

    		if (h.config.mask) {
    			var mask = new InputMask(h.config.mask, h.input)
    				mask.blurFunction = function() {
    					eval("h.config.bean." + h.config.property + " = h.input.value");
    					if (h.config.onChange !== undefined) {
    						h.config.onChange(h.input.value);
    					}
    				}
    		}

    		try {
    			var value = eval("h.config.bean." + h.config.property);
    			if (value !== undefined) {
    				h.input.value = value;
    			}
    		} catch (e) {

    		}
    },
    setPropertyValue: function(value) {
    	var h = this;

    	h.input.value = value;
    	eval("h.config.bean." + h.config.property + " = value");
    },

    setReadOnly: function(readOnly) {
    	var h = this;
    	
    	if (readOnly == false) {
    		h.input.disabled = false;
    		h.input.setStyle({
    			backgroundColor: "#F1DECC"
    		});
    	} else {
    		h.input.disabled = true;
    		h.input.setStyle({
    			backgroundColor: "white"
    		});
    	}
    },

    getMaterial: function() {
    	return this.input;
    }
});