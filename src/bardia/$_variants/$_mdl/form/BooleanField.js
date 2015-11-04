
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
            $_append: [{
            	$_tag: "input",
            	type: "checkbox",
            	id: h.property,
            	$_on: {
            		"change": function(e) {
            			h.updateBeanProperty(e.target.checked);
            		}
            	}
            }, {
            	$_tag: "span",
            	class: "mdl-checkbox__label",
            	$_append: h.label || "???" + h.property + "???"
            }]
        });
    },

    updateInputValue: function(bean) {
        var h = this;
        h.root.find(h.property).dom().checked = eval("bean." + h.property) || false;
    },
});