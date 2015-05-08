/*
 * Lookup
 */
UI.DateFormField = Class.create(UI.LookupFormField, {
	render: function() {
    	var h = this;
    	
		h.inside = new Element("DIV", {
			style: "position:relative; display:block; height:40px; width:100%; line-height:40px; background-color:transparent"
		});
		
		h.input = new Element("INPUT", {
			type: "text",
			readOnly: true,
			style: "position:absolute; top:20px; left:10px; border:0px; background-color:transparent; color:#000000; width:120px"
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
		
		h.label = new Element("DIV", {
			style: "position:absolute; top:10px; left:10px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
		});
		h.label.insert(h.config.label);

    	h.underline = new Element("DIV", {
    		style: "position:absolute; top:40px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:120px"
    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.label);
		h.inside.insert(h.input);
		
		h.fab = new UI.Fab({
			inside: h.inside,
			width: 20,
			height: 20,
			left: 120 + 20,
			fill: "green",
			icon: "calendar",
			bottom: 8,
			onClick: function() {
				h.showLookupCard();
			}
		});
	},
	/**
	 * 
	 */
    setInputValue: function(date) {
    	var h = this;
    	
    	var DU = new UI.DateUtils();

    	if (date !== undefined) {
    		h.animateLabel();
    		h.input.value = DU.formatDate(DU.parseDate(date));
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },
    /**
     * 
     */
    setBeanValue: function(date) {
    	var h = this;

    	eval("h.config.bean." + h.config.property + " = date;");

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
    	h.input.disabled = ro;
    },
    /**
     * 
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
		
		var calendarDiv = new Element("DIV", {
			style: "position:absolute; top:20px; left:50%; margin-left:-87px; width:175px; height:200px"
		});
		h.tmpFab.insert(calendarDiv);

		var fab = new UI.Fab({
			inside: h.tmpFab,
			bottom: 10,
			title: "Zamknij listę",
			fill: "red",
			icon: "cancel",
			onClick: function() {
				h.removeLookupCard();
			}
		});

		new UI.DatePicker({
			inside: calendarDiv,
			dateSelected: function(date) {
				h.setBeanValue(new UI.DateUtils().formatFullDate(date));
				h.setInputValue(new UI.DateUtils().formatFullDate(date));

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