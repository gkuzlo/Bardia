
bardia.form.BooleanField = bardia.oop.Class.inherit(bardia.form.TextField, {

    render: function() {
    	var h = this;
    	
        h.root = $_element({
            $_tag: "div",
            class: "form-row",
        });
        
        h.checkBox = new bardia.controlls.CheckBox({
        	onChange: function(value) {
        		h.updateBeanProperty(value);
        	}
        });
        
        h.root.insert(h.checkBox.getWrapper());
        h.root.insert($_element({
        	$_tag: "div",
        	id: h.id("label"),
        	style: "position:absolute; left:50px; top:13px;",
        	$_append: h.label || "???" + h.property + "???"
        }));
        
        h.setReadOnly(h.readOnly);
    },

    updateInputValue: function(bean) {
        var h = this; 
        h.checkBox.setValue(eval("bean." + h.property) || false);
    },

    setReadOnly: function(trueOrFalse) {
    	var h = this;

    	h.readOnly = trueOrFalse;
    	h.checkBox.setReadOnly(trueOrFalse);
    },

});