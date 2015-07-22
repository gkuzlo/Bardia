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
    			style: "position:absolute; top:20px; left:60px; border:0px; height:10px; color:grey; font-weight:bold; font-size:14px;"
    		});
    		h.label.insert(h.config.label);
    		
    		h.fab = new Element("DIV", {
    			class: "boolean-fab"
    		});
    		h.fab.on("click", function() {
				h.switchValue();
    		});
    		h.inside.insert(h.fab);

    		if (this.config.value == false) {
	    		//h.trueFab.hide();
    		}

    		h.switchValue();
    		h.switchValue();

		h.inside.insert(h.label);
    },
    switchValue: function() {
        var h = this;

    	var val = this.getBeanValue();
    	if (val == undefined || val == false) {
    	    h.setBeanValue(true);
            h.switchOn();
    	} else {
    	    h.setBeanValue(false);
    	    h.switchOff();
    	}
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

    	h.fab.pseudoStyle("after", "transform", "translateX(10px)");
    	h.fab.pseudoStyle("after", "background-color", "green");
    	h.fab.setStyle({
    	    backgroundColor: "#e0ffe0",
    	    "box-shadow": "3px 3px 8px green"
    	});

		if (h.config.onChange) {
			h.config.onChange(true);
		}
    },
    /**
     * @method unanimateLabel
     */
    switchOff: function() {
    	var h = this;

    	h.fab.pseudoStyle("after", "transform", "translateX(0px)");
    	h.fab.pseudoStyle("after", "background-color", "#aaaaaa");
    	h.fab.setStyle({
    	    backgroundColor: "#f0f0f0",
    	    "box-shadow": "3px 3px 8px #666666"
    	});

		if (h.config.onChange) {
			h.config.onChange(false);
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
    	var result = eval("h.config.bean." + h.config.property);
    	return result;
    },
    setBeanValue: function(v) {
    	var h = this;
    	eval("h.config.bean." + h.config.property + " = " + v);
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