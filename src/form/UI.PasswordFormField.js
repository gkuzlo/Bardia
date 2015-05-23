UI.PasswordFormField = Class.create(UI.TextFormField, {
    /**
     * @method render
     */
    render: function() {
    	var h = this;
    	
    		h.inside = new Element("DIV", {
    			style: "position:relative; top:0px; height:40px; width:100%; line-height:20px;"
    		});

    		h.input = new Element("INPUT", {
    			type: "password",
    			style: "position:absolute; top:20px; left:10px; border:0px; background-color:transparent; color:#000000; width:" + h.config.width + "px"
    		});
    		h.input.on("focus", function() {
    			h.animateLabel();
    		});
    		    		
    		h.input.on("blur", function(e) {
    			if (h.isEmpty(h.input.value)) {
    				h.unanimateLabel()
    			}
    		});
    		h.input.on("change", function(e) {
    			if (h.config.onChange !== undefined) {
    				h.config.onChange(h.getBeanValue());
    			}
    		});
    		h.input.on("keyup", function(e) {
    			h.setBeanValue(h.getInputValue());
    			
    			if (h.config.onChanging !== undefined) {
    				h.config.onChanging(h.getBeanValue());
    			}
    		});
    		h.input.on("keydown", function(e) {
    			
    			if (13 == e.keyCode) {
    				if (h.config.onEnter) {
    					h.config.onEnter();
    				}
    			}
    			
    			e.cancelBubble = true;
    		});
    		
    		h.label = new Element("DIV", {
    			style: "position:absolute; top:20px; left:10px; border:0px; height:10px; color:#999999; font-weight:bold; font-size:14px;"
    		});
    		h.label.insert(h.config.label + " " + ((h.config.required)?"*":""));

	    	h.underline = new Element("DIV", {
	    		style: "position:absolute; top:40px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:" + h.config.width + "px"
	    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.label);
		h.inside.insert(h.input);

		if (h.config.disableTab == true) {
			var fakeInput = new Element("INPUT", {
				style: "width:0px; border:0px; visible:false"
			});

			fakeInput.on("focus", function(e) {
				h.input.focus();
			});
			h.inside.insert(fakeInput);
		}
    }
});