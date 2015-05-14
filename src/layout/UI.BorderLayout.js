/**
 * @constructor UI.BorderLayout
 */
UI.BorderLayout = Class.create(UI.MaterialComponent, {
	/**
	 * @method initConfig
	 */
	initConfig: function(config) {
        this.config = Object.extend({
        	items: []
        }, config || {});
	},
	/**
	 * @method render
	 */
    render: function() {
        
        var centerTop = 0;
        var centerBottom = 0;
        var centerLeft = 0;
        var centerRight = 0;
    
        if (this.config.north !== undefined) {
            var height = 50;

                if (this.config.north.height) {
                    height = this.config.north.height;
                } else {
                    this.config.north.height = height;
                }
                
                centerTop = this.config.north.height;

                this.north = document.createElement("DIV");
                    this.north.style = "position:absolute; overflow:hidden; top:0px; left:0px; right:0px; height:" + height + "px;";

            this.config.inside.appendChild(this.north);
        }
        
        if (this.config.south !== undefined) {
            var height = 50;
            
                if (this.config.south.height) {
                    height = this.config.south.height;
                } else {
                    this.config.south.height = height;
                }
                
                centerBottom = height;

                this.south = document.createElement("DIV");
                    this.south.style = "position:absolute; overflow:hidden; height:" + height + "px; left:0px; right:0px; bottom:0px;";
            
            this.config.inside.appendChild(this.south);
        }
        
        if (this.config.west !== undefined) {
            var width = 50;
                        
            if (this.config.west.width) {
                width = this.config.west.width;
            } else {
                this.config.west.width = width;
            }
            
            centerLeft = width;
            
            this.west = document.createElement("DIV");
                this.west.style = "position:absolute; overflow:hidden; top:" + centerTop + "px; left:0px; width:" + width + "px; bottom:" + centerBottom + "px";

            this.config.inside.appendChild(this.west);
        }
        
        if (this.config.east !== undefined) {
            var width = 50;
                        
            if (this.config.east.width) {
                width = this.config.east.width;
            } else {
                this.config.east.width = width;
            }
            
            centerRight = width;
            
            this.east = document.createElement("DIV");
                this.east.style = "position:absolute; overflow:hidden; top:" + centerTop + "px; right:0px; width:" + width + "px; bottom:" + centerBottom + "px";

            this.config.inside.appendChild(this.east);
        }

        this.center = document.createElement("DIV");
            this.center.style = "position:absolute; overflow:hidden; top:" + centerTop + "px; left:" + centerLeft + "px; right:" + centerRight + "px; bottom:" + centerBottom + "px";

        this.config.inside.appendChild(this.center);
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