/**
 *
 */
bardia.form.Form = bardia.oop.Class.create({

    detailsWidth: "400px",

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            title: "Insert title here ...",
            serial: "S_" + (Math.random() * 1000000).toFixed(0),
            buttons: []
        }, config));

        this.render();
    },

    render: function() {
        var h = this;

        h.prepareRoot();
        h.inside.update(h.root);
        
        h.setButtons(h.buttons || []);
    },

    setButtons: function(buttons) {
    	var h = this;
    	
    	h.buttons = buttons;

		h.root.find(h.id("toolbar")).update();
		h.buttons.forEach(function(button) {
			h.root.find(h.id("toolbar")).insert($_element({
				$_tag: "button",
				class: "mdl-button mdl-js-button mdl-button--icon",
				title: button.name,
				$_append: [{
					$_tag: "i",
					class: "material-icons form-icon",
					style: button.style || "",
					$_append: button.icon
				}],
				$_on: {
					"click": function(e) {
						if (button.onClick) {
							button.onClick();
						}
					}
				}
			}));
		});
		
		var el = $_element({
			$_tag: "div",
			class: "form-title",
			id: "form_title",
			$_append: h.title
		});

    	h.root.find(h.id("toolbar")).insert(el);
    },
    
    setTitle: function(title) {
    	var h = this;
    	
    	h.title = title;

    	h.setButtons(h.buttons);
    },

    prepareRoot: function() {
        var h = this;
        
        h.root = $_element({
        	$_tag: "div",
        	class: "form-container",
        	$_append: [{
        		$_tag: "div",
        		id: h.id("toolbar"),
        		class: "form-top form-bg"
        	}, {
        		$_tag: "div",
        		class: "form-content",
        		id: h.id("contents")
        	}]
        });

        h.formFields = [];
        h.fields.forEach(function(field) {
            var _field = bardia.oop.Class.extend({
                type: "Text"
            }, field);

            var formField = eval("new bardia.form." + _field.type + "Field(_field)");
            h.formFields.push(formField);

            formField.setForm(h);
            
            h.root.find(h.id("contents")).insert(formField.getElement());
        });

        h.root.insert($_element({
            $_tag: "div",
            class: "form-curtain",
            id: h.id("form-curtain"),
            style: "width:0px",
            $_on: {
                "click": function() {
                    //h.closeDetails();
                }
            },
            $_append: [{
                $_tag: "div",
                class: "form-details-right",
                id: h.id("form-details-right"),
                $_on: {
                    "click": function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                },
            }]
        }));

        h.root.insert($_element({
        	$_tag: "div",
        	class: "form-progress",
        	id: h.id("form-progress"),
        	$_append: [{
        		$_tag: "div",
        		id: h.id("progress"),
        		class: "mdl-spinner mdl-spinner--single-color mdl-js-spinner"
        	}, {
        		$_tag: "div",
        		id: h.id("form-progress-label"),
        		class: "form-progress-label form-bg"
        	}]
        }));
        
        $_upgradeElement(h.root.find(h.id("progress")));
    },
    
    validate: function() {
    	var h = this;
    	
    	var result = true;

    	h.formFields.forEach(function(formField) {
    		result = formField.validate() && result;
    	});

    	return result;
    },

    addBeanChangedListener: function(listener) {
        var h = this;
        h.beanListeners = h.beanListeners || [];
        h.beanListeners.push(listener);
    },

    setBean: function(bean) {
        this.bean = bean;

        (this.beanListeners || []).forEach(function(listener) {
            listener(bean);
        });
    },

    getBean: function() {
    	this.bean = this.bean || {};
        return this.bean || {};
    },

    openDetails: function(width) {
        var h = this;

        h.detailsWidth = width || h.detailsWidth;

        h.root.find(h.id("form-curtain")).dom().style.width = "100%";
        h.root.find(h.id("form-curtain")).dom().style.background = "rgba(0,0,0,0.7)";
        h.root.find(h.id("form-details-right")).dom().style.left = "0px";
        h.root.find(h.id("form-details-right")).dom().style.width = h.detailsWidth;
        
        var result = h.root.find(h.id("form-details-right"));
        	result.update();

        return result;
    },
    
    closeDetails: function() {
        var h = this;

        h.root.find(h.id("form-curtain")).dom().style.width = "0px";
        h.root.find(h.id("form-curtain")).dom().style.background = "rgba(0,0,0,0.0)";
        h.root.find(h.id("form-details-right")).dom().style.left = "-" + h.detailsWidth;
    },

    openProgress: function(message) {
    	var h = this;
    	h.root.find(h.id("form-progress")).addClassName("form-progress-is-active");
    	h.root.find(h.id("progress")).addClassName("is-active");
    	h.root.find(h.id("form-progress-label")).update((message || "..."));
    },

    closeProgress: function() {
    	var h = this;
    	h.root.find(h.id("form-progress")).removeClassName("form-progress-is-active");
    	h.root.find(h.id("progress")).removeClassName("is-active");
    },
    
    setProgressLabel: function(label) {
    	var h = this;
    	
    	h.root.find(h.id("form-progress-label")).update(label);
    },
    
    id: function(name) {
    	return this.serial + name;
    },
    
    findFieldByProperty: function(propertyName) {
    	var h = this;
    	var result = null;
    	h.formFields.forEach(function(fieldControl) {
    		if (fieldControl.property && propertyName == fieldControl.property) {
    			result = fieldControl;
    		}
    	});
    	return result;
    }
});