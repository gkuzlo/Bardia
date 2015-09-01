UI.PasswordFormField = Class.create(UI.TextFormField, {
    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	required: false,
        	type: "password",
        	pattern: ".*"
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },
});