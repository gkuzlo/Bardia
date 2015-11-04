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
            	name: "Typy dni",
            	onActivate: function(html) {
            		new cesip.configuration.DayTypes({
            			inside: html
            		});
            	}
            }, {
            	name: "Kalendarz",
            	onActivate: function(html) {
            		new cesip.configuration.Calendar({
            			inside: html
            		});
            	}
            }, {
            	name: "Przystanki",
            	onActivate: function(html) {
            		new cesip.configuration.StopPoints({
            			inside: html
            		});
            	}
            }, {
            	name: "Połączenia",
            	onActivate: function(html) {
            		new cesip.configuration.ShapesList({
            			inside: html
            		});
            	}
            }, {
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