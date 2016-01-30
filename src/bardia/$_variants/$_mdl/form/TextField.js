bardia.form.TextField = bardia.oop.Class.create({

    initialize: function(config) {

        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ...",
            pattern: ".+",
            required: config.required || false,
            serial: "S_" + (Math.random()*1000000).toFixed(0),
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
                type: "text",
                pattern: h.pattern,
                required: false,
                id: h.id(h.property),
                $_on: {
                    change: function(e) {
                        h.updateBeanProperty(e.target.value);
                    }
                }
            }, {
                $_tag: "label",
                class: "form-text-input-label",
                style: "z-index:0",
                $_append: h.label
            }]
        });

        if (h.required===true) {
            h.root.insert($_element({
                $_tag: "label",
                class: "form-text-input-error",
                $_append: $msg("text")
            }));
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