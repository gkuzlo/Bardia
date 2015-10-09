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
                    var element = h.form.openDetails("300px");
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
    }
});