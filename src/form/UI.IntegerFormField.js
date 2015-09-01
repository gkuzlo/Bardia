
UI.IntegerFormField = Class.create(UI.TextFormField, {
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
        	pattern: "-?[0-9]*(\.[0-9]+)?"
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },
    validateProperty: function(propertyValue) {
        var h = this;
        var result = true;
            try {
                if (propertyValue !== "" && propertyValue !== undefined && isNaN(parseInt(propertyValue))) {
                    result = false;
                }
            } catch (e) {
                result = false;
            }
        return result;
    },
});