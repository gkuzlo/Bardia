/**
 * @class bardia.layout.BorderLayout
 * @constructor
 *
@example
~~~
var layout = new bardia.layout.BorderLayout({
   root: $_element(document.body),
   north: {
        height: 20
   }
});
~~~
 */
bardia.layout.BorderLayout = bardia.oop.Class.create({

	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
			serial: "BL_" + (Math.random()*1000000).toFixed(0),
		}, config));
        
		try {
			this.render();
		} catch (e) {
			alert("BorderLayout.render: " + e);
		}
	},

    render: function() {
    	var h = this;
    	
    	h.root = $_element({
    		$_tag: "div",
    		style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; overflow:hidden;"
    	});
    	
    	h.inside.update(h.root);
        
        var centerTop = 0;
        var centerBottom = 0;
        var centerLeft = 0;
        var centerRight = 0;

        if (h.north !== undefined) {
            centerTop = h.north.height || 50;
            
            h.northElement = $_element({
                $_tag: "div",
                class: "border-layout-north",
                style: "height:" + centerTop + "px; background-color:" + (h.north.fill || "transparent")
            });

            h.root.insert(h.northElement);
        }
        
        if (h.south !== undefined) {
            centerBottom = h.south.height || 50;

            h.southElement = $_element({
                $_tag: "div",
                class: "border-layout-south",
                style: "height:" + centerBottom + "px; background-color:" + (h.south.fill || "transparent")
            });
            
            h.root.insert(h.southElement);
        }
        
        if (h.west !== undefined) {
            centerLeft = h.west.width || 50;
            
            h.westElement = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + centerLeft + "px; bottom:" + centerBottom + "px; background-color:" + (h.west.fill || "transparent")
            });

            h.root.insert(h.westElement);
        }
        
        if (h.east !== undefined) {
            centerRight = h.east.width || 50;

            h.eastElement = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.east.fill || "transparent")
            });

            h.root.insert(h.eastElement);
        }

        h.centerElement = $_element({
            $_tag: "div",
            style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:" + centerLeft + "px; right:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.fill || "transparent")
        });

        h.root.insert(h.centerElement);
    },
    id: function(name) {
    	return this.serial + name;
    },
    getNorth: function() {
        return this.northElement;
    },
    getWest: function() {
        return this.westElement;
    },
    getEast: function() {
        return this.eastElement;
    },
    getSouth: function() {
        return this.southElement;
    },
    getCenter: function() {
        return this.centerElement;
    },
    getDefault: function() {
        return this.centerElement;
    },
    openDetails: function(width) {
        var h = this;

        h.root.insert($_element({
            $_tag: "div",
            class: "panel-animated",
            style: "position:absolute; top:0px; left:0px; bottom:0px; width:0px; background-color:transparent",
            id: h.id("panel-details-curtain"),
            $_on: {
                "click": function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            },
        }));
        
        h.root.insert($_element({
            $_tag: "div",
            class: "panel-details-right",
            id: h.id("panel-details-right"),
            $_on: {
                "click": function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            },
        }));

        var result = h.root.find(h.id("panel-details-right"));
        h.detailsWidth = width || h.detailsWidth;

        setTimeout(function() {
            h.root.find(h.id("panel-details-right")).addClassName("is-active");
            h.root.find(h.id("panel-details-right")).dom().style.left = "0px";
            h.root.find(h.id("panel-details-right")).dom().style.width = h.detailsWidth;

            h.root.find(h.id("panel-details-curtain")).dom().style.width = "100%";
            h.root.find(h.id("panel-details-curtain")).dom().style.backgroundColor = "rgba(0,0,0,0.6)";

            //result.update(); 	
        }, 50);
       
        return result;
    },
    
    closeDetails: function() {
        var h = this;

        if (h.root.find(h.id("panel-details-right")) != null) {
		    h.root.find(h.id("panel-details-right")).removeClassName("is-active");
		    h.root.find(h.id("panel-details-right")).dom().style.left = "-" + h.detailsWidth;
		    
		    h.root.find(h.id("panel-details-curtain")).dom().style.width = "0px";
		    h.root.find(h.id("panel-details-curtain")).dom().style.backgroundColor = "transparent";
		    
		    setTimeout(function() {
		    	h.root.find(h.id("panel-details-right")).dom().remove();
		    	h.root.find(h.id("panel-details-curtain")).dom().remove();
		    }, 1000);
        }
    },
});