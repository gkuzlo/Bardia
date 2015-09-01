/** 
 * @class UI.Form
 */
UI.Form = Class.create({
	/** 
	 * @param config
	 */
    initialize: function(config) {
        this.config = Object.extend({
            fields: [],
            fieldControlls: [],
            bean: {}
        }, config || {});

        this.render();
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;

    	h.prepareRoot();

    	var fields = new Element("DIV", {
    		style: "overflow:hidden; display:flex; flex-direction:column; align-content:flex-start; background:white"
    	});
    	h.root.querySelector("#fields").update(fields);

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

    				fields.insert(field.getMaterial());
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
    propertyChanged: function(propertyName, propertyValue) {
    	var h = this;

    	if (h.config.onChange) {
    		h.config.onChange(propertyName, propertyValue);
    	}
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
    },
    prepareRoot: function() {
    	var h = this;

    	var json = {
    		tag: "div",
    		class: "demo-card-wide mdl-card mdl-shadow--2dp",
    		style: "width:100%",
    		$insert: [{
    			tag: "div",
    			class: "mdl-card__title",
    			style: "background-color:#f0f0f0",
    			$insert: [{
    				tag: "h2",
    				class: "mdl-card__title-text",
    				$insert: "Welcome"
    			}]
    		}, {
    			tag: "div",
    			id: "fields",
    			class: "mdl-card__supporting-text",
    			$insert: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...",
    		}, {
    		    tag: "div",
    		    class: "mdl-card__menu",
    		    $insert: [{
    		        tag: "button",
    		        class: "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect",
    		        $insert: [{
    		            tag: "i",
    		            class: "material-icons",
    		            $insert: "share"
    		        }]
    		    }]
    		}]
    	};

		h.root = UI.toHTML(json);
		h.config.inside.update(h.root);

		UI.upgrade(h.root);
    }
});