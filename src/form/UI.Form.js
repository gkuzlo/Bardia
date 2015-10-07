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
            bean: {},
            bgColor: "#ebf0ee"
        }, config || {});
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;
    	
    	h.panel = new UI.Panel({
    		inside: h.getMaterial(),
    		title: h.config.title,
    		buttons: h.config.buttons,
    		bgColor: h.config.bgColor
    	});

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

    				h.panel.getContent().insert(field.getMaterial());
    		}
    	}
    },
    /**
     * @method setTitle
     * @param title
     */
    setTitle: function(title) {
    	var h = this;
    		h.panel.setTitle(title);
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
    	
    	var h = this;
    	
    	var i=0;
    	for (i=0; i<h.config.fields.length; i++) {
    		try {
				var fieldControl = h.config.fieldControlls[i];

				if (fieldControl.getRequired() === true && (fieldControl.getBeanValue() === null || fieldControl.getBeanValue() === "" || fieldControl.getBeanValue() === undefined)) {
					fieldControl.markError();
					result = false;
				} else {
					fieldControl.unmarkError();
				}
    		} catch (e) {
    			alert("Couldn't validate: " + fieldControl.config.property);
    		}
    	}
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
    },
    /**
     * @resetBean
     */
    resetBean: function() {
    	var h = this;
    		h.setBean(h.config.bean);
    },
    /**
     * @method getContent
     * @returns
     */
    getContent: function() {
    	return this.panel.getContent();
    }
});