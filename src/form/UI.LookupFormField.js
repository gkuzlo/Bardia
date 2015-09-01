/**
 * @class UI.LookupFormField
 */
UI.LookupFormField = Class.create(UI.TextFormField, {
    /**
     *
     */
    extendRender: function() {
        var h = this;

        h.fab = new Element("BUTTON", {
            class: "mdl-button mdl-js-button mdl-button--icon",
        });
        h.icon = new Element("I", {
            class: "material-icons"
        });
        h.icon.update("search");
        h.fab.insert(h.icon);

        componentHandler.upgradeElement(h.fab);

        h.inside.insert(h.fab);

        h.fab.on("click", function(e) {
            h.showLookupCard();
        });
    },
    /**
     * @method showLookupCard
     */
    showLookupCard: function() {
    	var h = this;
    	
		var f = h.form.getMaterial();
		var formOffset = f.cumulativeOffset();
		var fieldOffset = h.fab.cumulativeOffset();

		h.tmpFab = new Element("DIV", {
		});

		h.tmpFab.setStyle({
			bottom: "",
			position: "absolute",
			backgroundColor: "grey",
			border: "border: 1px solid transparent;",
			top: (fieldOffset.top - formOffset.top) + "px",
			left: (fieldOffset.left - formOffset.left) + "px",
			width: h.fab.getWidth() + "px",
			height: h.fab.getHeight() + "px",
			overflow: "hidden",
			zIndex: 100000
		});

		f.insert(h.tmpFab);

		$PLAY(h.tmpFab, [
  		    {
  		     opacity: 0.5,
  		     height: h.fab.getHeight() + "px",
  		     top: (fieldOffset.top - formOffset.top) + "px",
  		     left: (fieldOffset.left - formOffset.left) + "px",
  		     width: h.fab.getWidth() + "px",
  		     backgroundColor: "grey",
  		    },
  		    {
  		     opacity: 1.0,
  		     height: f.getHeight() + "px",
  		     top:"0px",
  		     left:"0px",
  		     width: f.getWidth() + "px",
  		     backgroundColor: "white",
  		    },
  		], function() {

  		});

        if (h.config.onExpand) {
            h.config.onExpand(h, h.tmpFab);
        }
    },

    setProperty: function(propertyValue) {
        var h = this;

        eval("h.config.bean." + h.config.property + " = propertyValue;");
        h.displayProperty(propertyValue);
        h.removeLookupCard();
    },

    removeLookupCard: function() {
    	var h = this;
    	
		var f = h.form.getMaterial();
		var formOffset = f.cumulativeOffset();
		var fieldOffset = h.fab.cumulativeOffset();

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
	  		     backgroundColor: "black"
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
			};
    },
    markError: function() {
    	var h = this;

        try {
		    h.inside.pseudoStyle("before", "color", "red");
		} catch (e) {
		    alert(e);
		}
    },
});