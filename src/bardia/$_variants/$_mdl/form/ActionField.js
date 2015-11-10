/**
 * 
 */
bardia.form.ActionField = bardia.oop.Class.inherit(bardia.form.TextField, {

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Title ... ",
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
                $_append: h.label
            }]
        });

        h.displayButton();
    },
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
    
    id: function(name) {
    	return this.serial + name;
    }
});