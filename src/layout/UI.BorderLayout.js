/**
 * @constructor UI.BorderLayout
 */
UI.BorderLayout = Class.create(UI.MaterialComponent, {
	/**
	 * @method initConfig
	 */
	initConfig: function(config) {
        this.config = Object.extend({
        	northHeight: 50
        }, config || {});
	},
	/**
	 * @method render
	 */
    render: function() {
    	var h = this;
        
        var centerTop = 0;
        var centerBottom = 0;
        var centerLeft = 0;
        var centerRight = 0;
    
        if (this.config.north !== undefined) {
            var height = (h.config.north.height || h.config.northHeight);
            h.config.north.height = height;

            centerTop = height;
            var fill = h.config.north.fill || "transparent";

            var north = {
                tag: "div",
                style: "position:absolute; overflow:hidden; top:0px; left:0px; right:0px; height:" + height + "px; background-color:" + fill
            }

            this.config.inside.insert(UI.toHTML(north));
        }
        
        if (this.config.south !== undefined) {
            var height = 50;
            
                if (this.config.south.height) {
                    height = this.config.south.height;
                } else {
                    this.config.south.height = height;
                }
                
                centerBottom = height;
                var fill = h.config.south.fill || "transparent";

                this.south = new Element("DIV", {
                    style: "position:absolute; overflow:hidden; height:" + height + "px; left:0px; right:0px; bottom:0px; background-color:" + fill
                });
            
            this.config.inside.insert(this.south);
        }
        
        if (this.config.west !== undefined) {
            var width = 50;
                        
            if (this.config.west.width) {
                width = this.config.west.width;
            } else {
                this.config.west.width = width;
            }
            
            centerLeft = width;
            var fill = h.config.west.fill || "transparent";
            
            this.west = new Element("DIV", {
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + width + "px; bottom:" + centerBottom + "px; background-color:" + fill
            });

            this.config.inside.insert(this.west);
        }
        
        if (this.config.east !== undefined) {
            var width = 50;
                        
            if (this.config.east.width) {
                width = this.config.east.width;
            } else {
                this.config.east.width = width;
            }
            
            centerRight = width;
            var fill = h.config.east.fill || "transparent";
            
            this.east = new Element("DIV", {
                style: "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + width + "px; bottom:" + centerBottom + "px; background-color:" + fill
            });

            this.config.inside.insert(this.east);
        }

        var fill = h.config.fill || "transparent";
        h.center = new Element("DIV", {
            style: "position:absolute; overflow:hidden; top:" + centerTop + "px; left:" + centerLeft + "px; right:" + centerRight + "px; bottom:" + centerBottom + "px; background-color:" + fill
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