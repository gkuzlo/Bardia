/**
 * 
 */
bardia.form.ActionField = bardia.oop.Class.inherit(bardia.form.TextField, {

    render: function() {
        var h = this;

        h.root = $_element({
            $_tag: "div",
            class: "form-row",
            $_append: [{
                $_tag: "input",
                class: "form-text-input",
                required: true,
                type: "text",
                id: h.id(h.property),
                $_on: {
                    change: function(e) {
                        h.updateBeanProperty(e.target.value);
                    },
                    keydown: function(e) {
                    	e.stopPropagation();
                    	e.preventDefault();
                    },
                    mousedown: function(e) {
                    	e.stopPropagation();
                    	e.preventDefault();
                    }
                }
            }, {
                $_tag: "label",
                class: "form-text-input-label",
                "for": h.property,
                id: h.id("label"),
                $_append: h.label
            }]
        });

        h.actionButton = h.displayButton();
        h.root.insert(h.actionButton);

        h.setReadOnly(h.readOnly);
        h.setVisible(h.visible);
        h.setRequired(h.required);
    },
    /**
     *  
     */
    displayButton: function() {
    	var h = this;

    	return $_element({
            $_tag: "button",
            class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
            $_on: {
                click: function(e) {
                    var element = h.form.openDetails("100%");
                    if (h.onExpand) {
                    	h.onExpand(element);
                    }
                }
            },
            $_append: [{
                $_tag: "i",
                class: "material-icons",
                $_append: "keyboard_arrow_down",
            }]
        });
    },
    
    id: function(name) {
    	return this.serial + name;
    },
    
    setReadOnly: function(trueOrFalse) {
    	var h = this;

    	h.readOnly = trueOrFalse;
    	if (true == trueOrFalse) {
    		h.root.find(h.id(h.property)).addClassName("form-text-input-readonly");
    		h.actionButton.addClassName("bardia-not-visible");
    	} else {
    		h.root.find(h.id(h.property)).removeClassName("form-text-input-readonly");
    		h.actionButton.removeClassName("bardia-not-visible");
    	}
    },
});