bardia.form.LookupField = bardia.oop.Class.inherit(bardia.form.ActionField, {

    displayButton: function() {
    	var h = this;

//    	h.actionButton = $_element({
//            $_tag: "button",
//            class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
//            id: "btn",
//            $_on: {
//                click: function(e) {
//                    var element = h.form.openDetails(h.detailsWidth);
//                    if (h.onExpand) {
//                    	h.onExpand(element);
//                    }
//                }
//            },
//            $_append: [{
//                $_tag: "i",
//                class: "material-icons action-icon",
//                $_append: "keyboard_arrow_down",
//            }]
//        });
//    	return h.actionButton;
    	
    	return $_element({
    		$_tag: "div",
    		style: "position:absolute; bottom:0px; left:170px; display:" + ((h.readOnly==true)?"none":"flex") + "; flex-direction:row",
    		$_append: [{
                $_tag: "button",
                class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
                $_on: {
                    click: function(e) {
                        var element = h.form.openDetails(h.detailsWidth);
                        if (h.onExpand) {
                        	h.onExpand(element);
                        }
                    }
                },
                $_append: [{
                    $_tag: "i",
                    class: "material-icons action-icon",
                    $_append: "keyboard_arrow_down",
                }]
            }, {
                $_tag: "button",
                class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
                $_on: {
                    click: function(e) {
                    	h.updateBeanProperty(undefined);
                    	h.updateInputValue(h.form.getBean());
                    }
                },
                $_append: [{
                    $_tag: "i",
                    class: "material-icons action-delete-icon",
                    $_append: "cancel",
                }]
            }]
    	});
    },
    
    updateInputValue: function() {
        var h = this;

        var inputValue = eval("h.form.getBean()." + h.property + " || ''");
        
        if (h.formatLabel) {
        	try {
        		inputValue = h.formatLabel(h.form.getBean(), h.root.find(h.id(h.property)));
        	} catch (e) {
        		alert("updateInputValue(): " + e);
        	}
        }
        h.root.find(h.id(h.property)).dom().value = inputValue;
    },    

    setReadOnly: function(trueOrFalse) {
    	var h = this;

    	h.readOnly = trueOrFalse;
    	if (true == trueOrFalse) {
    		h.root.find(h.id(h.property)).readOnly = true;
    		h.actionButton.addClassName("bardia-not-visible");
    	} else {
    		h.root.find(h.id(h.property)).readOnly = false;
    		h.actionButton.removeClassName("bardia-not-visible");
    	}
    },
});