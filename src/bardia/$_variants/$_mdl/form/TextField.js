bardia.form.TextField = bardia.oop.Class.create({

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ...",
            pattern: ".+",
            required: config.required || false
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
                required: true,
                id: h.property,
                $_on: {
                    change: function(e) {
                        h.updateBeanProperty(e.target.value);
                    }
                }
            }, {
                $_tag: "label",
                class: "form-text-input-label",
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

    /**  
     * z inputa do beana
     */
    updateBeanProperty: function(value) {
        var h = this;
        var bean = h.form.getBean();
        
        eval("bean." + h.property + " = value");
    },

    updateInputValue: function(bean) {
        var h = this;
        h.root.find(h.property).dom().value = eval("bean." + h.property + " || ''");
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
    }
});