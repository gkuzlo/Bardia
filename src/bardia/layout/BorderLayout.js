
bardia.layout.BorderLayout = bardia.oop.Class.create({

	initialize: function(config) {
        this.config = config;
        
        this.render();
	},

    render: function() {
    	var h = this;
        
        var centerTop = 0;
        var centerBottom = 0;
        var centerLeft = 0;
        var centerRight = 0;

        if (this.config.north !== undefined) {
            centerTop = h.config.north.height || 50;

            var north = {
                $_tag: "div",
                class: "border-layout-north",
                style: "height:" + centerTop + "px; background-color:" + (h.config.north.fill || "transparent")
            }

            this.config.inside.insert($_element(north));
        }
        
        if (this.config.south !== undefined) {
            centerBottom = this.config.south.height || 50;

            var south = {
                $_tag: "div",
                class: "border-layout-south",
                style: "height:" + centerBottom + "px; background-color:" + (h.config.south.fill || "transparent")
            };
            
            this.config.inside.insert($_element(south));
        }
        
        if (this.config.west !== undefined) {
            centerLeft = this.config.west.width || 50;
            
            h.west = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + centerLeft + "px; bottom:" + centerBottom + "px; background-color:" + (h.config.west.fill || "transparent")
            });

            h.config.inside.insert(h.west);
        }
        
        if (this.config.east !== undefined) {
            centerRight = this.config.east.width || 50;

            h.east = $_element({
                $_tag: "div",
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.config.east.fill || "transparent")
            });

            this.config.inside.insert(h.east);
        }

        h.center = $_element({
            $_tag: "div",
            style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:" + centerLeft + "px; right:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + (h.config.fill || "transparent")
        });

        h.config.inside.insert(h.center);
    },
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