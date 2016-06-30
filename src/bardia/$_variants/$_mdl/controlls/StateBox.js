
bardia.controlls.StateBox = bardia.oop.Class.create({

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
        	readOnly: false,
        	width: 50,
        	states: [{
        		name: "State A",
        		value: "A",
        		color: "grey"
        	}, {
        		name: "State B",
        		value: "B",
        		color: "red"
        	}, {
        		name: "State C",
        		value: "C",
        		color: "green"
        	}]
        }, config));
        
        var h = this;
        
        h.step = ((h.width) / (h.states.length - 1)).toFixed(0);
        h.currentState = 0;

        this.render();
    },
    
    render: function() {
    	var h = this;

    	h.root = $_element({
    		$_tag: "div",
    		style: "position:relative; width:" + h.width + "px; height:8px; border:0px; background:lightGrey; margin:10px 0px 0px 10px; border-radius:4px; cursor:pointer",
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
    			style: "position:absolute; top:-4px; width:16px; height:16px; border-radius:8px; cursor:pointer; background-color:" + (h.states[0].color || "black"),
    			class: "controlls-default",
    		}]
    	});

    	if (h.value) {
    		h.setValue(h.value || h.states[0].value);
    	}
    },
    
    setValue: function(value) {
    	var h = this;
    	
    	var index = h.getValueIndex(value);
    	h.setState(index);    	
    },
    
    getValueIndex: function(value) {
    	var h = this;
    	var i=0;
    	for (i=0; i<h.states.length; i++) {
    		if (value == h.states[i].value) {
    			return i;
    		}
    	}
    	return 0;
    },
    
    setState: function(index) {
    	var h = this;
    	
    	var oldValue = h.value;
    	
    	h.root.find("checkbox").setStyle({
    		left: (-8 + h.step*index) + "px",
    		backgroundColor: h.states[index].color
    	});
    	h.value = h.states[index].value;
    	h.currentIndex = index;
    	
    	if (h.onChange && h.value != oldValue) {
    		h.onChange(h.value,h.states[index].name);
    	}
    },

    getWrapper: function() {
    	var h = this;
    	return h.root;
    },
    
    change: function() {
    	var h = this;
    	
    	if (h.currentIndex < h.states.length - 1) {
    		h.setState(h.currentIndex + 1);
    	} else {
    		h.setState(0);
    	}
    },
    
    getValue: function() {
    	return this.value;
    },
    
    setReadOnly: function(trueOrFalse) {
    	var h = this;
    	h.readOnly = trueOrFalse || false;
    }
});