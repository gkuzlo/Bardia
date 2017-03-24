
bardia.controlls.CheckBox = bardia.oop.Class.create({

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
        	value: false,
        	readOnly: false,
        	unselectedClass: "checkbox-unselected",
        	selectedClass: "checkbox-selected"
        }, config));

        this.render();
    },
    
    render: function() {
    	var h = this;

    	h.root = $_element({
    		$_tag: "div",
    		style: "position:relative; width:25px; height:8px; border:0px; background:lightGrey; margin:10px 0px 0px 10px; border-radius:4px; cursor:pointer",
    		class: "controlls-default",
			$_on: {
				"click": function(e) {
					if (h.readOnly == false) {
						h.change();
					}
				}
			},
    		$_append: [{
    			$_tag: "div",
    			id: "checkbox",
    			style: "position:absolute; top:-4px; width:16px; height:16px; border-radius:8px; cursor:pointer",
    			class: "controlls-default",
    		}]
    	});

    	h.setValue(h.value || false);
    },
    
    getWrapper: function() {
    	var h = this;
    	return h.root;
    },
    
    select: function() {
    	var h = this;

    	h.value = true;
    	h.root.find("checkbox").removeClassName(h.unselectedClass);
    	h.root.find("checkbox").addClassName(h.selectedClass);
    },

    unselect: function() {
    	var h = this;

    	h.value = false;    	
    	h.root.find("checkbox").removeClassName(h.selectedClass);
    	h.root.find("checkbox").addClassName(h.unselectedClass);
    },

    change: function() {
    	var h = this;
    	h.setValue(!h.value);
    	
    	if (h.onChange) {
    		h.onChange(h.getValue());
    	}
    },

    setValue: function(trueOrFalse) {
    	var h = this;
    	if (trueOrFalse == true) {
    		h.select();
    	} else {
    		h.unselect();
    	}
    },
    
    getValue: function() {
    	var h = this;
    	return h.value;
    },
    
    setReadOnly: function(trueFalse) {
    	var h = this;
    	
    	h.readOnly = trueFalse || false;
    },
    
    setVisible: function(isTrue) {
    	var h = this;

    	if (isTrue === undefined) {
    		isTrue = true;
    	}
    	
    	if (true == isTrue) {
    		h.root.setStyle({
    			display: "block"
    		});    		
    	} else {
    		h.root.setStyle({
    			display: "none"
    		});
    	}
    }
});