/**
 *
 */
UI.TextFormField = Class.create({
    initialize: function() {    	
    },
    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	required: false,
        	type: "text",
        	uniqueId: "" + Math.random(),
        	pattern: ".*"
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },
    setBean: function(bean) {
    	var h = this;
    	h.config.bean = bean;

    	h.displayProperty(h.getProperty());
    },
    setProperty: function(propertyValue) {
        var h = this;
        eval("h.config.bean." + h.config.property + " = propertyValue;");
    },
    getProperty: function() {
        var h = this;
        return eval("h.config.bean." + h.config.property + ";");
    },
    displayProperty: function(propertyValue) {
        var h = this;
        h.validateProperty(propertyValue);
        if (propertyValue !== undefined) {
            h.input.value = h.formatValue(propertyValue);
            h.insideDiv.addClassName("is-dirty");
        }
    },
    formatValue: function(propertyValue) {
        var h = this;
        if (h.config.render) {
            return h.config.render(propertyValue);
        }
        return propertyValue;
    },
    validateProperty: function(propertyValue) {
        var h = this;
        var result = true;
        return result;
    },
    changeProperty: function(propertyValue) {
        var h = this;
        if (true === h.validateProperty(propertyValue)) {
            h.setProperty(propertyValue);
            h.form.propertyChanged(h.config.property, propertyValue);
        }
    },
    changingProperty: function(propertyValue) {
        var h = this;
        if (true === h.validateProperty(propertyValue)) {

        }
    },
    render: function() {
    	var h = this;

    	h.inside = new Element("DIV", {
            style: "position:relative; background:white; margin:0px 10px -15px 10px; display:flex; flex-direction:row; align-items:center;"
    	});

        h.insideDiv = new Element("DIV", {
            class: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label",
        });
        h.input = new Element("INPUT", {
            class: "mdl-textfield__input",
            type: h.config.type,
            id: h.config.uniqueId,
            pattern: h.config.pattern
        });

        h.input.on("change", function(e) {
            h.changeProperty(h.input.value);
        });
        h.input.on("keyup", function(e) {
            h.changingProperty(h.input.value);
        });

        h.span = new Element("SPAN", {
            class: "mdl-textfield__error",
            style: "position:absolute; top:0px; right:0px"
        });
        h.span.update(h.config.pattern);

        h.label = new Element("LABEL", {
            class: "mdl-textfield__label",
            "for": h.config.uniqueId,
        });
        h.label.update(h.config.label + " " + ((h.config.required)?"*":""));

		h.insideDiv.insert(h.input);
		h.insideDiv.insert(h.label);
		h.insideDiv.insert(h.span);
		h.inside.insert(h.insideDiv);

		if (h.extendRender) {
		    h.extendRender();
		}

		componentHandler.upgradeElement(h.insideDiv);
		componentHandler.upgradeElement(h.input);
		componentHandler.upgradeElement(h.label);
		componentHandler.upgradeElement(h.span);
    },
    setReadOnly: function(readOnly) {
    	var h = this;
    	var ro = readOnly || false;

    	h.input.readOnly = ro;
    	h.input.disabled = ro;
    },
    getMaterial: function() {
    	return this.inside;
    },
    isEmpty: function(v) {
    	var result = false;
    		if (v === undefined || v.trim() == "") {
    			result = true;
    		}
    	return result;
    },
    getRequired: function() {
    	return this.config.required;
    },
});