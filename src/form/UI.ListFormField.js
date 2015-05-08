/**
 * @class UI.ListFormField
 */
UI.ListFormField = Class.create(UI.LookupFormField, {
	/**
	 * @method setInputValue
	 */
    setInputValue: function(str) {
    	var h = this;
    	
    	if (str !== undefined) {
    		h.animateLabel();
    		h.input.value = str;

    		if (h.config.patternRenderer !== undefined) {
    			h.input.value = h.config.patternRenderer(str);
    		} else if (h.config.pattern !== undefined) {
    			h.input.value = str;
    		} 
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },
    /**
     * 
     */
    setBeanValue: function(str) {
    	var h = this;

    	eval("h.config.bean." + h.config.property + " = str;");

		if (h.config.onChange !== undefined) {
			h.config.onChange(h.getBeanValue());
		}
    },
    /**
     * @method setReadOnly
     */
    setReadOnly: function(readOnly) {
    	var h = this;

    	var ro = readOnly || false;

    	h.fab.getMaterial().setStyle({
    		display: (ro==true)?"none":"block"
    	});
    },
    /**
     * @method showLookupCard
     */
    showLookupCard: function() {
    	var h = this;
    	
		var f = h.form.formContent;
		var formOffset = f.cumulativeOffset();
		var fieldOffset = h.fab.material.cumulativeOffset(); 
						
		h.tmpFab = h.fab.material.clone();
		h.tmpFab.setStyle({
			bottom: "",
			top: (fieldOffset.top - formOffset.top) + "px",
			left: (fieldOffset.left - formOffset.left) + "px",
			overflow: "hidden"
		});
		h.form.formContent.insert(h.tmpFab);

		h.list = new UI.List({
			inside: h.tmpFab,
			title: h.config.label,
			headerRenderer: function(row) {
				return h.config.patternRenderer(row.bean);
			},
			onClick: function(row) {
				if (h.config.onChange) {
					h.setBeanValue(row.bean);
					h.setInputValue(row.bean);
					h.removeLookupCard();
				}
			}
		});

		var fab = new UI.Fab({
			inside: h.tmpFab,
			top: 80,
			title: "Zamknij listę",
			fill: "red",
			text: "<",
			onClick: function() {
				h.removeLookupCard();
			}
		});

		var player = h.tmpFab.animate([
  		    {
  		     opacity: 0.5, 
  		     height: h.fab.material.getHeight() + "px", 
  		     borderRadius: "0%", 
  		     top: (fieldOffset.top - formOffset.top) + "px", 
  		     left: (fieldOffset.left - formOffset.left) + "px", 
  		     width: h.fab.material.getWidth() + "px", 
  		     backgroundColor: h.fab.config.fill
  		    },
  		    {
  		     opacity: 1.0, 
  		     height: f.getHeight() + "px", 
  		     borderRadius: "0%", 
  		     top:"0px", 
  		     left:"0px", 
  		     width: f.getWidth() + "px", 
  		     backgroundColor: "white"
  		    },
  		], {
  			direction: 'normal',
  		    duration: 450,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});

		player.onfinish = function() {
			if (h.config.fetchList) {
				h.config.fetchList(h.list);
			}
		}
    },
    /**
     * 
     */
    removeLookupCard: function() {
    	var h = this;
    	
		var f = h.form.formContent;
		var formOffset = f.cumulativeOffset();
		var fieldOffset = h.fab.material.cumulativeOffset(); 

		var player = h.tmpFab.animate([
		    {
		     opacity: 1.0, 
		     height: f.getHeight() + "px", 
		     borderRadius: "0%", 
		     top:"0px", 
		     left:"0px", 
		     width: f.getWidth() + "px", 
		     backgroundColor: "white"
		    },
		    {
		     opacity: 0.5, 
		     height: "0px", 
		     borderRadius: "0%", 
		     top: (fieldOffset.top - formOffset.top) + "px", 
		     left: (fieldOffset.left - formOffset.left) + "px", 
		     width: "0px", 
		     backgroundColor: h.fab.config.fill
		    },
		], {
			direction: 'normal',
		    duration: 450,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
			
		player.onfinish = function() {
			h.tmpFab.remove();
		}
    }
});