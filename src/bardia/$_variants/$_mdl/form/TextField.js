bardia.form.TextField = bardia.oop.Class.create({

    initialize: function(config) {

        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ...",
            serial: "S_" + (Math.random()*1000000).toFixed(0),
            readOnly: false,
            visible: true,
            required: false,
            detailsWidth: "90%"
        }, config));

        this.render();
    },

    render: function() {
        var h = this;

        h.root = $_element({
            $_tag: "div",
            class: "form-row",
            $_append: [{
                $_tag: "input",
                class: "form-text-input",
                required: false,
                id: h.id(h.property),
                $_on: {
                    change: function(e) {
                        h.updateBeanProperty(e.target.value);
                    },
                    focus: function(e) {
                    	if (h.readOnly == true) {
                    		e.stopPropagation();
                    		e.target.blur();
                    	}
                    },
                    keyup: function(e) {
                    	if (h.onKeyUp) {
                    		h.onKeyUp(e.target.value);
                    	}
                    }
                }
            }, {
                $_tag: "label",
                class: "form-text-input-label",
                id: h.id("label"),
                $_append: h.label,
                $_on: {
                	click: function() {
                		h.root.find(h.id(h.property)).dom().focus();
                	}
                }
            }]
        });
        
        h.applyAttributes();
        
        h.prepareMask();
    },
    
    applyAttributes: function() {
    	var h = this;
    	
        h.setReadOnly(h.readOnly);
        h.setVisible(h.visible);
        h.setRequired(h.required);
    },
    
	prepareMask: function() {
		var h = this;
		
		// do nothing for simple text
	},

    setReadOnly: function(trueOrFalse) {
    	var h = this;

    	h.readOnly = trueOrFalse;
    	if (true == trueOrFalse) {
    		h.root.find(h.id(h.property)).addClassName("form-text-input-readonly");
    	} else {
    		h.root.find(h.id(h.property)).removeClassName("form-text-input-readonly");
    	}
    },
    
    setRequired: function(trueOrFalse) {
    	var h = this;

    	h.required = trueOrFalse;
        if (trueOrFalse == true) {
            h.root.find(h.id("label")).update("* " + h.label);
        } else {
        	h.root.find(h.id("label")).update(h.label);
        }
    },

    getElement: function() {
        var h = this;
        return h.root;
    },

    updateBeanProperty: function(value) {
        var h = this;        
        eval("h.form.getBean()." + h.property + " = value;");
        //
		if (h.onChange) {
			h.onChange(value);
		}
    },

    updateInputValue: function() {
        var h = this;
        var val = eval("h.form.getBean()." + h.property);
        if (val === undefined) {
        	val = "";
        }
        h.root.find(h.id(h.property)).dom().value = val;
    },
    
    validate: function() {
    	var h = this;
    	
    	if (true === h.required && (!h.root.find(h.id(h.property)).dom().value || h.root.find(h.id(h.property)).dom().value.trim() == "")) {
    		h.markError();
    		return false;
    	} else {
    		h.unmarkError();
    		return true;
    	}
    	
    	return true;
    },
    
    markError: function() {
    	var h = this;
    	h.root.find(h.id("label")).addClassName("form-text-input-label-error");
    },
    
    unmarkError: function() {
    	var h = this;
    	h.root.find(h.id("label")).removeClassName("form-text-input-label-error");
    },

    setForm: function(form) {
    	try {
	        var h = this;
	        h.form = form;
	        h.form.addBeanChangedListener(function(bean) {
	            h.updateInputValue(bean);
	        });
    	} catch (e) {
    		alert("" + e);
    	}
    },
    
    id: function(name) {
    	return this.serial + name;
    },
    
    setVisible: function(trueOrFalse) {
    	var h = this;
    	
    	h.visible = trueOrFalse;
    	if (true == trueOrFalse) {
    		h.root.removeClassName("bardia-not-visible");
    	} else {
    		h.root.addClassName("bardia-not-visible");
    	}
    }
});