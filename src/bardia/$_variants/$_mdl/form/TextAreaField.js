


bardia.form.TextAreaField = bardia.oop.Class.inherit(bardia.form.TextField, {

    render: function() {
        var h = this;

        h.root = $_element({
            $_tag: "div",
            class: "form-row",
            $_append: [{
                $_tag: "textarea",
                class: "form-text-input form-textarea",
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
                id: h.id("label"),
                $_append: h.label,
                $_on: {
                	click: function() {
                		h.root.find(h.id(h.property)).dom().focus();
                	}
                }
            }]
        });
        
        h.setReadOnly(h.readOnly);
        h.setVisible(h.visible);
        h.setRequired(h.required);
        
        h.prepareMask();
    },
});