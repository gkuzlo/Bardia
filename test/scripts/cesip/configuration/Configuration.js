cesip.configuration.Configuration = bardia.oop.Class.create({

	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
			tabs: []
		}, config));

        this.render();
	},
	
	render: function() {
		var h = this;

        h.tabs = new bardia.layout.Tabs({
            inside: h.inside,
            tabs: [{
            	name: "Importy OSM",
            	onActivate: function(html) {
            		new cesip.configuration.ShapesImports({
            			inside: html
            		});
            	}
            }]
        });
	},
});