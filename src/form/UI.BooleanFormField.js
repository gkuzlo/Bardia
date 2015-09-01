/**
 * @class UI.BooleanFormField
 */
UI.BooleanFormField = Class.create(UI.TextFormField, {

    initialize: function(config) {    	
        this.config = Object.extend({
        	property: "$",
        	readOnly: false,
        	width: 200,
        	value: false,
        	required: false
        }, config || {});
    },
    /**
     * @method
     */
    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	required: false,
        	uniqueId: "" + Math.random(),
        	type: "checkbox"
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;

    	h.inside = new Element("DIV", {
            style: "position:relative; height:30px; background:white; margin:0px 10px -10px 10px; display:flex; flex-direction:row; align-items:center;"
    	});

        h.label = new Element("LABEL", {
            class: "mdl-switch mdl-js-switch mdl-js-ripple-effect",
            "for": h.config.uniqueId,
        });
        h.input = new Element("INPUT", {
            class: "mdl-switch__input",
            type: "checkbox",
            id: h.config.uniqueId,
            checked: true
        });
        h.input.on("change", function(e) {
            h.changeProperty(e.target.checked);
        });
        h.span = new Element("SPAN", {
            class: "mdl-switch__label",
        });
        h.span.update(h.config.label + " " + ((h.config.required)?"*":""));

		h.label.insert(h.input);
		h.label.insert(h.span);
		h.inside.insert(h.label);

		if (h.extendRender) {
		    h.extendRender();
		}

		componentHandler.upgradeElement(h.label);
		componentHandler.upgradeElement(h.input);
		componentHandler.upgradeElement(h.span);
    },
});