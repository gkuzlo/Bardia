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
        
        this.render();
	},

    render: function() {
    	var h = this;
        
        var centerTop = 0;
        var centerBottom = 0;
        var centerLeft = 0;
        var centerRight = 0;

        if (this.north !== undefined) {
            centerTop = h.north.height || 50;

            var north = {
                $_tag: "div",
                class: "border-layout-north",
                style: "height:" + centerTop + "px; background-color:" + (h.north.fill || "transparent")
            }

            this.inside.insert($_element(north));
        }
        
        if (this.south !== undefined) {
            centerBottom = this.south.height || 50;

            var south = {
                $_tag: "div",
                class: "border-layout-south",
                style: "height:" + centerBottom + "px; background-color:" + (h.south.fill || "transparent")
            };
            
            this.inside.insert($_element(south));
        }
        
        if (this.west !== undefined) {
            centerLeft = this.west.width || 50;
            
            h.west = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + centerLeft + "px; bottom:" + centerBottom + "px; background-color:" + (h.west.fill || "transparent")
            });

            h.inside.insert(h.west);
        }
        
        if (this.east !== undefined) {
            centerRight = this.east.width || 50;

            h.east = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.east.fill || "transparent")
            });

            this.inside.insert(h.east);
        }

        h.center = $_element({
            $_tag: "div",
            style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:" + centerLeft + "px; right:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.fill || "transparent")
        });

        h.inside.insert(h.center);
    },
    /**
     * @method getNorth()
     * @return {bardia.dom.Element} instance of bradia dom element wrapper
     */
    getNorth: function() {
        return this.north;
    },
    getWest: function() {
        return this.west;
    },
    getEast: function() {
        return this.east;
    },
    getSouth: function() {
        return this.south;
    },
    getCenter: function() {
        return this.center;
    },
    getDefault: function() {
        return this.center;
    }
});