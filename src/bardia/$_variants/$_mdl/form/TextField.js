bardia.form.TextField = bardia.oop.Class.create({

    initialize: function(config) {

        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ...",
            required: false,
            serial: "S_" + (Math.random()*1000000).toFixed(0),
            readOnly: false
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
                    }
                }
            }, {
                $_tag: "label",
                class: "form-text-input-label",
                style: "z-index:0",
                id: h.id("label"),
                $_append: h.label
            }]
        });

        if (h.required == true) {
            h.root.find(h.id("label")).update("* " + h.label);
        }
        
        h.setReadOnly(h.readOnly);
        h.prepareMask();
    },
    
	prepareMask: function() {
		var h = this;
		
		// do nothing for simple text
	},
    
    setReadOnly: function(trueOrFalse) {
    	var h = this;
    	
    	if (true == trueOrFalse) {
    		h.root.find(h.id(h.property)).addClassName("form-text-input-readonly");
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
        h.root.find(h.id(h.property)).dom().value = eval("h.form.getBean()." + h.property + " || ''");
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
    }
});