/**
 * @class UI.LookupFormField
 */
UI.LookupFormField = Class.create(UI.TextFormField, {
	render: function() {
    	var h = this;
    	
		h.inside = new Element("DIV", {
			style: "position:relative; top:0px; height:40px; width:100%; line-height:20px;"
		});
		
		h.input = new Element("INPUT", {
			type: "text",
			readOnly: true,
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
		h.input.disabled = true;

		h.label = new Element("DIV", {
			style: "position:absolute; top:20px; left:10px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
		});
		h.label.insert(h.config.label);

    	h.underline = new Element("DIV", {
    		style: "position:absolute; top:40px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:" + h.config.width + "px"
    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.label);
		h.inside.insert(h.input);

		h.fab = new UI.Fab({
			inside: h.inside,
			style: "position:absolute; left:" + h.config.width + "px; width:20px; height:20px; top:18px;",
			fill: "green",
			icon: "download",
			bottom: 8,
			onClick: function() {
				h.showLookupCard();
			}
		});
	},
	/**
	 * @method setInputValue
	 */
    setInputValue: function(bean) {
    	var h = this;
    	
    	if (bean !== undefined) {
    		h.animateLabel();
    		if (h.config.pattern !== undefined) {
    			h.input.value = STRUTILS.compile(h.config.pattern, bean);
    		} else if (h.config.patternRenderer !== undefined) {
    			h.input.value = h.config.patternRenderer(bean);
    		}
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },

    setBeanValue: function(bean) {
    	var h = this;

    	eval("h.config.bean." + h.config.property + " = bean;");

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
    	
		var f = h.form.getMaterial();
		var formOffset = f.cumulativeOffset();
		var fieldOffset = h.fab.material.cumulativeOffset(); 
						
		h.tmpFab = h.fab.material.clone();
		h.tmpFab.setStyle({
			bottom: "",
			top: (fieldOffset.top - formOffset.top) + "px",
			left: (fieldOffset.left - formOffset.left) + "px",
			overflow: "hidden"
		});
		f.insert(h.tmpFab);

		h.list = new UI.List({
			inside: h.tmpFab,
			title: h.config.label,
			header: h.config.pattern,
			headerRenderer: function(row) {
				return h.config.patternRenderer(row.bean);
			},
			onClick: function(row) {
				h.setBeanValue(row.bean);
				h.setInputValue(row.bean);
				h.removeLookupCard();
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
		};
    },
    
    getList: function() {
    	return this.list;
    },

    removeLookupCard: function() {
    	var h = this;
    	
		var f = h.form.getMaterial();
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