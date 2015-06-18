/**
 * @class UI.DateFormField
 */
UI.DateFormField = Class.create(UI.LookupFormField, {
	/**
	 * @method render
	 */
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
				h.unanimateLabel();
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
			style: "position:absolute; left:120px; width:20px; height:20px; top:18px;",
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
	 * @param date
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
     * @param date
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
     * @method showLookupCard 
     */
    showLookupCard: function() {
    	var h = this;
	
		h.calendarDiv = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; opacity:0.0; background-color:white"
		});
		h.form.getContent().insert(h.calendarDiv);

		new UI.DatePicker({
			inside: h.calendarDiv,
			dateSelected: function(date) {
				h.setBeanValue(new UI.DateUtils().formatFullDate(date));
				h.setInputValue(new UI.DateUtils().formatFullDate(date));

				h.removeLookupCard();
			}
		});

		var player = h.calendarDiv.animate([
  		    {
  		     opacity: 0.0, 
  		    },
  		    {
  		     opacity: 1.0
  		    },
  		], {
  			direction: 'normal',
  		    duration: 750,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});

		player.onfinish = function() {
			if (h.config.fetchList) {
				h.config.fetchList(h.list);
			}
		};
    },

    removeLookupCard: function() {
    	var h = this;
   
    	$PLAY(h.calendarDiv, [
    	    { opacity: 1.0 },
    	    { opacity: 0.0 }
    	],
    	function() {
    		h.calendarDiv.remove();
    	});
    }
});