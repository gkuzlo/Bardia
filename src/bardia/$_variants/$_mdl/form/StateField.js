
bardia.form.StateField = bardia.oop.Class.inherit(bardia.form.TextField, {

    render: function() {
    	var h = this;

        h.root = $_element({
            $_tag: "div",
            class: "form-row",
        });

        h.stateBox = new bardia.controlls.StateBox({
        	readOnly: h.readOnly,
        	width: h.width || 50,
        	states: h.states,
        	onChange: function(value, name) {        		
        		h.updateBeanProperty(value);
        		h.label = name;
                h.applyAttributes();
        	}
        });

        h.root.insert(h.stateBox.getWrapper());
        
        h.root.insert($_element({
        	$_tag: "div",
        	id: h.id("label"),
        	style: "position:absolute; left:" + (h.width || 50 + 25) + "px; top:13px;",
        	$_append: h.label || "???" + h.property + "???"
        }));

        h.setReadOnly(h.readOnly);
    },

    updateInputValue: function(bean) {
        var h = this; 
        h.stateBox.setValue(eval("bean." + h.property) || false);
    },

    setReadOnly: function(trueOrFalse) {
    	var h = this;

    	h.readOnly = trueOrFalse;
    	h.stateBox.setReadOnly(trueOrFalse);
    },

});