/** 
 * @class UI.Form
 */
UI.Form = Class.create(UI.MaterialComponent, {
	/** 
	 * @param config
	 */
    initConfig: function(config) {
        this.config = Object.extend({
            fields: [],
            fieldControlls: [],
            bean: {}
        }, config || {});
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;
	
    	var layoutConfig = {
    		inside: h.getMaterial()
    	};
    	
		if (h.config.title !== undefined) {
			layoutConfig.north = {
				height: 60
			};
		}

		if (h.config.buttons !== undefined) {
			layoutConfig.south = {
				height: 60
			};
		}

		var layout = new UI.BorderLayout(layoutConfig);
		
		if (h.config.title !== undefined) {
			var titleDiv = new Element("DIV", {
				class: "form_header"
			});

			layout.getNorth().update(titleDiv);
			titleDiv.update(h.config.title);
		}
        
    	if (h.config.fields !== undefined) {
    		var i=0;
    		for (i=0; i<h.config.fields.length; i++) {		
    			var fieldConfig = h.config.fields[i];
    				if (fieldConfig.type === undefined) {
    					fieldConfig.type = "Text";
    				}

    				var field = eval("new UI." + fieldConfig.type + "FormField();");

    					if (field.initConfig === undefined) {
    						alert("Property: " + fieldConfig.property);
    					}
    				
    					field.initConfig(fieldConfig);
    					
    					field.form = this;

    					h.config.fieldControlls.push(field);

    				layout.getDefault().insert(field.getMaterial());
    		}
    	}

    	if (h.config.buttons !== undefined) {
	    	new UI.FabToolbar({
	    		inside: layout.getSouth(),
	    		buttons: h.config.buttons
	    	});
    	}
    },
    /**
     * @method setTitle
     * @param title
     */
    setTitle: function(title) {
    	var h = this;
    		h.formHeader.update(title);
    },
    /**
     * Metoda zwraca pole formularza dla zadanej właściwości
     * 
     * @method getField
     */
    getField: function(propertyName) {
    	var h = this;
    	var i=0;
    	for (i=0; i<h.config.fields.length; i++) {
    		if (h.config.fields[i].property == propertyName) {
    			return h.config.fieldControlls[i];
    		}
    	}
    	return null;
    },
    /**
     * @method setFields
     * 
     * Metoda dynamicznie tworzy atrybuty w formularzu
     */
    setFields: function(fields) {
    	var h = this;
    		h.config.fields = fields;
    		h.render();
    		h.setBean(h.getBean());
    },
    /**
     * @method setBean
     */
    setBean: function(bean) {
    	var h = this;
    	
    	h.config.bean = bean;
    	
    	var i=0;
    	for (i=0; i<h.config.fields.length; i++) {
    		h.config.fieldControlls[i].setBean(bean);
    	}
    },
    /**
     * @method getBean
     */
    getBean: function() {
    	return this.config.bean;
    },
    /**
     * Walidacja wymaganych pól formularza
     */
    validate: function() {
    	var result = true;
    	return result;
    },
    /**
     * 
     * @param trueOrFalse
     */
    setReadOnly: function(trueOrFalse) {
    	var h = this;

    	var i=0;
    	for (i=0; i<h.config.fields.length; i++) {
    		h.config.fieldControlls[i].setReadOnly(trueOrFalse);
    	}
    }
});