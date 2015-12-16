
bardia.form.BooleanField = bardia.oop.Class.inherit(bardia.form.TextField, {

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            serial: "S_" + (Math.random()*1000000).toFixed(0),
        }, config));
        
        this.render();
    },

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
        	style: "position:absolute; left:50px; top:13px;",
        	$_append: h.label || "???" + h.property + "???"
        }));
    },

    updateInputValue: function(bean) {
        var h = this;
        h.checkBox.setValue(eval("bean." + h.property) || false);
    },
});