/**
 * 
 */
bardia.form.LookupField = bardia.oop.Class.inherit(bardia.form.ActionField, {

    /**
     *  
     */
    displayButton: function() {
    	var h = this;
    	
    	h.root.insert($_element({
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
        }));
    },
    
    updateInputValue: function() {
        var h = this;

        var inputValue = eval("h.form.getBean()." + h.property + " || ''");
        
        if (h.formatLabel) {
        	try {
        		inputValue = h.formatLabel(h.form.getBean());
        	} catch (e) {
        		alert("updateInputValue(): " + e);
        	}
        }
        h.root.find(h.id(h.property)).dom().value = inputValue;
    },
});