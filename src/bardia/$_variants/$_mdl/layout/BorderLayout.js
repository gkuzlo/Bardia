/**
 * @class bardia.layout.BorderLayout
 * @constructor
 *
@example
~~~
var layout = new bardia.layout.BorderLayout({
   inside: $_element(document.body),
   north: {
        height: 20
   }
});
~~~
 */
bardia.layout.BorderLayout = bardia.oop.Class.create({

	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({}, config));
        
		try {
			this.render();
		} catch (e) {
			alert("BorderLayout.render: " + e);
		}
	},

    render: function() {
    	var h = this;
        
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

            this.inside.insert(h.northElement);
        }
        
        if (this.south !== undefined) {
            centerBottom = this.south.height || 50;

            h.southElement = $_element({
                $_tag: "div",
                class: "border-layout-south",
                style: "height:" + centerBottom + "px; background-color:" + (h.south.fill || "transparent")
            });
            
            this.inside.insert(h.southElement);
        }
        
        if (this.west !== undefined) {
            centerLeft = this.west.width || 50;
            
            h.westElement = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + centerLeft + "px; bottom:" + centerBottom + "px; background-color:" + (h.west.fill || "transparent")
            });

            h.inside.insert(h.westElement);
        }
        
        if (this.east !== undefined) {
            centerRight = this.east.width || 50;

            h.eastElement = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.east.fill || "transparent")
            });

            this.inside.insert(h.eastElement);
        }

        h.centerElement = $_element({
            $_tag: "div",
            style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:" + centerLeft + "px; right:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.fill || "transparent")
        });

        h.inside.insert(h.centerElement);
    },
    /**
     * @method getNorth()
     * @return {bardia.dom.Element} instance of bradia dom element wrapper
     */
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
});