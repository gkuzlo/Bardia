/**
 * Formularz
 * 
 * @class UI.Form
 * @constructor
 */
UI.Form = Class.create(UI.MaterialComponent, {
    /**
     * 
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

		h.formContent = new Element("DIV", {
			class: "form"
		});
		h.config.inside.update(h.formContent);
		
		var top = 60;
		var bottom = 60;
		
		if (h.config.title == undefined) {
			top = 0;
		}
		
		if (h.config.buttons == undefined) {
			bottom = 0;
		}

		h.fieldsContent = new Element("DIV", {
			class: "form_fields_content",
			style: "top:" + top + "px; bottom:" + bottom + "px"
		});
		h.formContent.insert(h.fieldsContent);

		if (h.config.title !== undefined) {
			h.formHeader = new Element("DIV", {
				class: "form_header bg_main fg_white"
			});
			h.formHeader.insert(h.config.title);
			h.formContent.insert(h.formHeader);
		}
        
		if (h.config.buttons !== undefined) {
			h.formFooter = new Element("DIV", {
				class: "form_footer"
			});
			h.formContent.insert(h.formFooter);
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

    				h.fieldsContent.insert(field.getMaterial());
    		}
    	}

    	if (h.config.buttons !== undefined) {
	    	var i=0; 
	    	for (i=0; i<h.config.buttons.length; i++) {
	    		var fabConfig = h.config.buttons[i];
	    			fabConfig.inside = h.formContent;
	    			fabConfig.left = h.config.inside.getClientRects()[0].width - (60 * (i+1));
	    			fabConfig.top = h.config.inside.getClientRects()[0].height - 80;
	
	    		new UI.Fab(fabConfig);
	    	}
    	}
    },
    /**
     * 
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
    }
});